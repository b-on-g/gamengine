"use strict";
function require( path ){ return $node[ path ] };
"use strict";

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
(function ($_1) {
    function $mol_test(set) {
        for (let name in set) {
            const code = set[name];
            const test = (typeof code === 'string') ? new Function('', code) : code;
            $_1.$mol_test_all.push(test);
        }
        $mol_test_schedule();
    }
    $_1.$mol_test = $mol_test;
    $_1.$mol_test_mocks = [];
    $_1.$mol_test_all = [];
    async function $mol_test_run() {
        for (var test of $_1.$mol_test_all) {
            let context = Object.create($$);
            for (let mock of $_1.$mol_test_mocks)
                await mock(context);
            const res = test(context);
            if ($mol_promise_like(res)) {
                await new Promise((done, fail) => {
                    res.then(done, fail);
                    setTimeout(() => fail(new Error('Test timeout: ' + test.name)), 1000);
                });
            }
        }
        $$.$mol_log3_done({
            place: '$mol_test',
            message: 'All tests passed',
            count: $_1.$mol_test_all.length,
        });
    }
    $_1.$mol_test_run = $mol_test_run;
    let scheduled = false;
    function $mol_test_schedule() {
        if (scheduled)
            return;
        scheduled = true;
        setTimeout(async () => {
            scheduled = false;
            await $mol_test_run();
            $$.$mol_test_complete();
        }, 1000);
    }
    $_1.$mol_test_schedule = $mol_test_schedule;
    $_1.$mol_test_mocks.push(context => {
        let seed = 0;
        context.Math = Object.create(Math);
        context.Math.random = () => Math.sin(seed++);
        const forbidden = ['XMLHttpRequest', 'fetch'];
        for (let api of forbidden) {
            context[api] = new Proxy(function () { }, {
                get() {
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
                apply() {
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
            });
        }
    });
    $mol_test({
        'mocked Math.random'($) {
            console.assert($.Math.random() === 0);
            console.assert($.Math.random() === Math.sin(1));
        },
        'forbidden XMLHttpRequest'($) {
            try {
                console.assert(void new $.XMLHttpRequest);
            }
            catch (error) {
                console.assert(error.message === 'XMLHttpRequest is forbidden in tests');
            }
        },
        'forbidden fetch'($) {
            try {
                console.assert(void $.fetch(''));
            }
            catch (error) {
                console.assert(error.message === 'fetch is forbidden in tests');
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_test_complete() {
    }
    $.$mol_test_complete = $mol_test_complete;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Argument must be Truthy
     * @deprecated use $mol_assert_equal instead
     */
    function $mol_assert_ok(value) {
        if (value)
            return;
        $mol_fail(new Error(`${value} ≠ true`));
    }
    $.$mol_assert_ok = $mol_assert_ok;
    /**
     * Argument must be Falsy
     * @deprecated use $mol_assert_equal instead
     */
    function $mol_assert_not(value) {
        if (!value)
            return;
        $mol_fail(new Error(`${value} ≠ false`));
    }
    $.$mol_assert_not = $mol_assert_not;
    /**
     * Handler must throw an error.
     * @example
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } ) // Passes because throws error
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } , 'Parse error' ) // Passes because throws right message
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } , Error ) // Passes because throws right class
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_fail(handler, ErrorRight) {
        const fail = $.$mol_fail;
        try {
            $.$mol_fail = $.$mol_fail_hidden;
            handler();
        }
        catch (error) {
            $.$mol_fail = fail;
            if (typeof ErrorRight === 'string') {
                $mol_assert_equal(error.message ?? error, ErrorRight);
            }
            else {
                $mol_assert_equal(error instanceof ErrorRight, true);
            }
            return error;
        }
        finally {
            $.$mol_fail = fail;
        }
        $mol_fail(new Error('Not failed', { cause: { expect: ErrorRight } }));
    }
    $.$mol_assert_fail = $mol_assert_fail;
    /** @deprecated Use $mol_assert_equal */
    function $mol_assert_like(...args) {
        $mol_assert_equal(...args);
    }
    $.$mol_assert_like = $mol_assert_like;
    /**
     * All arguments must not be structural equal to each other.
     * @example
     * $mol_assert_unique( 1 , 2 , 3 ) // Passes
     * $mol_assert_unique( 1 , 1 , 2 ) // Fails because 1 === 1
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_unique(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (!$mol_compare_deep(args[i], args[j]))
                    continue;
                return $mol_fail(new Error(`Uniquesess assertion failure`, { cause: { [i]: args[i], [i]: args[i] } }));
            }
        }
    }
    $.$mol_assert_unique = $mol_assert_unique;
    /**
     * All arguments must be structural equal each other.
     * @example
     * $mol_assert_like( [1] , [1] , [1] ) // Passes
     * $mol_assert_like( [1] , [1] , [2] ) // Fails because 1 !== 2
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_equal(...args) {
        for (let i = 1; i < args.length; ++i) {
            if ($mol_compare_deep(args[0], args[i]))
                continue;
            return $mol_fail(new Error(`Equality assertion failure`, { cause: { 0: args[0], [i]: args[i] } }));
        }
    }
    $.$mol_assert_equal = $mol_assert_equal;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'must be false'() {
            $mol_assert_not(0);
        },
        'must be true'() {
            $mol_assert_ok(1);
        },
        'two must be equal'() {
            $mol_assert_equal(2, 2);
        },
        'three must be equal'() {
            $mol_assert_equal(2, 2, 2);
        },
        'two must be unique'() {
            $mol_assert_unique([2], [3]);
        },
        'three must be unique'() {
            $mol_assert_unique([1], [2], [3]);
        },
        'two must be alike'() {
            $mol_assert_equal([3], [3]);
        },
        'three must be alike'() {
            $mol_assert_equal([3], [3], [3]);
        },
        'two object must be alike'() {
            $mol_assert_equal({ a: 1 }, { a: 1 });
        },
        'three object must be alike'() {
            $mol_assert_equal({ a: 1 }, { a: 1 }, { a: 1 });
        },
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
var $;
(function ($) {
    $mol_test({
        'Make empty div'() {
            $mol_assert_equal(($mol_jsx("div", null)).outerHTML, '<div></div>');
        },
        'Define native field'() {
            const dom = $mol_jsx("input", { value: '123' });
            $mol_assert_equal(dom.outerHTML, '<input value="123">');
            $mol_assert_equal(dom.value, '123');
        },
        'Define classes'() {
            const dom = $mol_jsx("div", { class: 'foo bar' });
            $mol_assert_equal(dom.outerHTML, '<div class="foo bar"></div>');
        },
        'Define styles'() {
            const dom = $mol_jsx("div", { style: { color: 'red' } });
            $mol_assert_equal(dom.outerHTML, '<div style="color: red;"></div>');
        },
        'Define dataset'() {
            const dom = $mol_jsx("div", { dataset: { foo: 'bar' } });
            $mol_assert_equal(dom.outerHTML, '<div data-foo="bar"></div>');
        },
        'Define attributes'() {
            const dom = $mol_jsx("div", { lang: "ru", hidden: true });
            $mol_assert_equal(dom.outerHTML, '<div lang="ru" hidden=""></div>');
        },
        'Define child nodes'() {
            const dom = $mol_jsx("div", null,
                "hello",
                $mol_jsx("strong", null, "world"),
                "!");
            $mol_assert_equal(dom.outerHTML, '<div>hello<strong>world</strong>!</div>');
        },
        'Make fragment'() {
            const dom = $mol_jsx($mol_jsx_frag, null,
                $mol_jsx("br", null),
                $mol_jsx("hr", null));
            $mol_assert_equal($mol_dom_serialize(dom), '<br xmlns="http://www.w3.org/1999/xhtml" /><hr xmlns="http://www.w3.org/1999/xhtml" />');
        },
        'Spread fragment'() {
            const dom = $mol_jsx("div", null,
                $mol_jsx($mol_jsx_frag, null,
                    $mol_jsx("br", null),
                    $mol_jsx("hr", null)));
            $mol_assert_equal(dom.outerHTML, '<div><br><hr></div>');
        },
        'Function as component'() {
            const Button = (props, target) => {
                return $mol_jsx("button", { title: props.hint }, target());
            };
            const dom = $mol_jsx(Button, { id: "foo", hint: "click me" }, () => 'hey!');
            $mol_assert_equal(dom.outerHTML, '<button id="foo" title="click me" class="Button">hey!</button>');
        },
        'Nested guid generation'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "bar" },
                        $mol_jsx("img", { id: "icon" })));
            };
            const Bar = (props, icon) => {
                return $mol_jsx("span", null,
                    icon,
                    $mol_jsx("i", { id: "label" }));
            };
            const dom = $mol_jsx(Foo, { id: "foo" });
            $mol_assert_equal(dom.outerHTML, '<div id="foo" class="Foo"><span id="foo/bar" class="Foo_bar Bar"><img id="foo/icon" class="Foo_icon"><i id="foo/bar/label" class="Foo_bar_label Bar_label"></i></span></div>');
        },
        'Fail on non unique ids'() {
            const App = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("span", { id: "bar" }),
                    $mol_jsx("span", { id: "bar" }));
            };
            $mol_assert_fail(() => $mol_jsx(App, { id: "foo" }), 'JSX already has tag with id "foo/bar"');
        },
        'Owner based guid generationn'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "middle", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            const dom = $mol_jsx(Foo, { id: "app" });
            $mol_assert_equal(dom.outerHTML, '<div id="app" class="Foo"><span id="app/middle" class="Foo_middle Bar"><img id="app/icon" class="Foo_icon"></span></div>');
        },
        'Fail on same ids from different caller'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("img", { id: "icon" }),
                    $mol_jsx(Bar, { id: "bar", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            $mol_assert_fail(() => $mol_jsx(Foo, { id: "foo" }), 'JSX already has tag with id "foo/icon"');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'get'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal(proxy.foo, 777);
        },
        'has'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal('foo' in proxy, true);
        },
        'set'() {
            const target = { foo: 777 };
            const proxy = $mol_delegate({}, () => target);
            proxy.foo = 123;
            $mol_assert_equal(target.foo, 123);
        },
        'getOwnPropertyDescriptor'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_like(Object.getOwnPropertyDescriptor(proxy, 'foo'), {
                value: 777,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        },
        'ownKeys'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777, [Symbol.toStringTag]: 'bar' }));
            $mol_assert_like(Reflect.ownKeys(proxy), ['foo', Symbol.toStringTag]);
        },
        'getPrototypeOf'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_equal(Object.getPrototypeOf(proxy), Foo.prototype);
        },
        'setPrototypeOf'() {
            class Foo {
            }
            const target = {};
            const proxy = $mol_delegate({}, () => target);
            Object.setPrototypeOf(proxy, Foo.prototype);
            $mol_assert_equal(Object.getPrototypeOf(target), Foo.prototype);
        },
        'instanceof'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
        'autobind'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_log3_come = () => { };
        $.$mol_log3_done = () => { };
        $.$mol_log3_fail = () => { };
        $.$mol_log3_warn = () => { };
        $.$mol_log3_rise = () => { };
        $.$mol_log3_area = () => () => { };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'FQN of anon function'($) {
            const $$ = Object.assign($, { $mol_func_name_test: (() => () => { })() });
            $mol_assert_equal($$.$mol_func_name_test.name, '');
            $mol_assert_equal($$.$mol_func_name($$.$mol_func_name_test), '$mol_func_name_test');
            $mol_assert_equal($$.$mol_func_name_test.name, '$mol_func_name_test');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'init with overload'() {
            class X extends $mol_object {
                foo() {
                    return 1;
                }
            }
            var x = X.make({
                foo: () => 2,
            });
            $mol_assert_equal(x.foo(), 2);
        },
        'Context in instance inherits from class'($) {
            const custom = $.$mol_ambient({});
            class X extends $.$mol_object {
                static $ = custom;
            }
            $mol_assert_equal(new X().$, custom);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Collect deps'() {
            const pub1 = new $mol_wire_pub;
            const pub2 = new $mol_wire_pub;
            const sub = new $mol_wire_pub_sub;
            const bu1 = sub.track_on();
            try {
                pub1.promote();
                pub2.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu1);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub2, pub2]);
            const bu2 = sub.track_on();
            try {
                pub1.promote();
                pub1.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu2);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub1, pub2]);
        },
        'cyclic detection'($) {
            const sub1 = new $mol_wire_pub_sub;
            const sub2 = new $mol_wire_pub_sub;
            const bu1 = sub1.track_on();
            try {
                const bu2 = sub2.track_on();
                try {
                    $mol_assert_fail(() => sub1.promote(), 'Circular subscription');
                }
                finally {
                    sub2.track_cut();
                    sub2.track_off(bu2);
                }
            }
            finally {
                sub1.track_cut();
                sub1.track_off(bu1);
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /// @todo right orderinng
    $.$mol_after_mock_queue = [];
    function $mol_after_mock_warp() {
        const queue = $.$mol_after_mock_queue.splice(0);
        for (const task of queue)
            task();
    }
    $.$mol_after_mock_warp = $mol_after_mock_warp;
    class $mol_after_mock_commmon extends $mol_object2 {
        task;
        promise = Promise.resolve();
        cancelled = false;
        id;
        constructor(task) {
            super();
            this.task = task;
            $.$mol_after_mock_queue.push(task);
        }
        destructor() {
            const index = $.$mol_after_mock_queue.indexOf(this.task);
            if (index >= 0)
                $.$mol_after_mock_queue.splice(index, 1);
        }
    }
    $.$mol_after_mock_commmon = $mol_after_mock_commmon;
    class $mol_after_mock_timeout extends $mol_after_mock_commmon {
        delay;
        constructor(delay, task) {
            super(task);
            this.delay = delay;
        }
    }
    $.$mol_after_mock_timeout = $mol_after_mock_timeout;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_tick = $mol_after_mock_commmon;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Sync execution'() {
            class Sync extends $mol_object2 {
                static calc(a, b) {
                    return a + b;
                }
            }
            __decorate([
                $mol_wire_method
            ], Sync, "calc", null);
            $mol_assert_equal(Sync.calc(1, 2), 3);
        },
        async 'async <=> sync'() {
            class SyncAsync extends $mol_object2 {
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            $mol_assert_equal(await SyncAsync.calc(1, 2), 8);
        },
        async 'Idempotence control'() {
            class Idempotence extends $mol_object2 {
                static logs_idemp = 0;
                static logs_unidemp = 0;
                static log_idemp() {
                    this.logs_idemp += 1;
                }
                static log_unidemp() {
                    this.logs_unidemp += 1;
                }
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    this.log_idemp();
                    this.log_unidemp();
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            __decorate([
                $mol_wire_method
            ], Idempotence, "log_idemp", null);
            $mol_assert_equal(await Idempotence.calc(1, 2), 8);
            $mol_assert_equal(Idempotence.logs_idemp, 1);
            $mol_assert_equal(Idempotence.logs_unidemp, 3);
        },
        async 'Error handling'() {
            class Handle extends $mol_object2 {
                static async sum(a, b) {
                    $mol_fail(new Error('test error ' + (a + b)));
                }
                static check() {
                    try {
                        return $mol_wire_sync(Handle).sum(1, 2);
                    }
                    catch (error) {
                        if ($mol_promise_like(error))
                            $mol_fail_hidden(error);
                        $mol_assert_equal(error.message, 'test error 3');
                    }
                }
            }
            await $mol_wire_async(Handle).check();
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Lazy computed lists with native Array interface. $mol_range2_array is mutable but all derived ranges are immutable. */
    function $mol_range2(item = index => index, size = () => Number.POSITIVE_INFINITY) {
        const source = typeof item === 'function' ? new $mol_range2_array() : item;
        if (typeof item !== 'function') {
            item = index => source[index];
            size = () => source.length;
        }
        return new Proxy(source, {
            get(target, field) {
                if (typeof field === 'string') {
                    if (field === 'length')
                        return size();
                    const index = Number(field);
                    if (index < 0)
                        return undefined;
                    if (index >= size())
                        return undefined;
                    if (index === Math.trunc(index))
                        return item(index);
                }
                return $mol_range2_array.prototype[field];
            },
            set(target, field) {
                return $mol_fail(new TypeError(`Lazy range is read only (trying to set field ${JSON.stringify(field)})`));
            },
            ownKeys(target) {
                return [...Array(size())].map((v, i) => String(i)).concat('length');
            },
            getOwnPropertyDescriptor(target, field) {
                if (field === "length")
                    return {
                        value: size(),
                        writable: true,
                        enumerable: false,
                        configurable: false,
                    };
                const index = Number(field);
                if (index === Math.trunc(index))
                    return {
                        get: () => this.get(target, field, this),
                        enumerable: true,
                        configurable: true,
                    };
                return Object.getOwnPropertyDescriptor(target, field);
            }
        });
    }
    $.$mol_range2 = $mol_range2;
    class $mol_range2_array extends Array {
        // Lazy
        concat(...tail) {
            if (tail.length === 0)
                return this;
            if (tail.length > 1) {
                let list = this;
                for (let item of tail)
                    list = list.concat(item);
                return list;
            }
            return $mol_range2(index => index < this.length ? this[index] : tail[0][index - this.length], () => this.length + tail[0].length);
        }
        // Lazy
        filter(check, context) {
            const filtered = [];
            let cursor = -1;
            return $mol_range2(index => {
                while (cursor < this.length && index >= filtered.length - 1) {
                    const val = this[++cursor];
                    if (check(val, cursor, this))
                        filtered.push(val);
                }
                return filtered[index];
            }, () => cursor < this.length ? Number.POSITIVE_INFINITY : filtered.length);
        }
        // Diligent
        forEach(proceed, context) {
            for (let [key, value] of this.entries())
                proceed.call(context, value, key, this);
        }
        // Lazy
        map(proceed, context) {
            return $mol_range2(index => proceed.call(context, this[index], index, this), () => this.length);
        }
        // Diligent
        reduce(merge, result) {
            let index = 0;
            if (arguments.length === 1) {
                result = this[index++];
            }
            for (; index < this.length; ++index) {
                result = merge(result, this[index], index, this);
            }
            return result;
        }
        // Lazy
        toReversed() {
            return $mol_range2(index => this[this.length - 1 - index], () => this.length);
        }
        // Lazy
        slice(from = 0, to = this.length) {
            return $mol_range2(index => this[from + index], () => Math.min(to, this.length) - from);
        }
        // Lazy
        some(check, context) {
            for (let index = 0; index < this.length; ++index) {
                if (check.call(context, this[index], index, this))
                    return true;
            }
            return false;
        }
        every(check, context) {
            for (let index = 0; index < this.length; ++index) {
                if (!check.call(context, this[index], index, this))
                    return false;
            }
            return true;
        }
        reverse() {
            return $mol_fail(new TypeError(`Mutable reverse is forbidden. Use toReversed instead.`));
        }
        sort() {
            return $mol_fail(new TypeError(`Mutable sort is forbidden. Use toSorted instead.`));
        }
        indexOf(needle) {
            return this.findIndex(item => item === needle);
        }
        [Symbol.toPrimitive]() {
            return $mol_guid();
        }
    }
    $.$mol_range2_array = $mol_range2_array;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'lazy calls'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 10);
            $mol_assert_equal(list[-1], undefined);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[9], 9);
            $mol_assert_equal(list[9.5], undefined);
            $mol_assert_equal(list[10], undefined);
            $mol_assert_equal(calls, 2);
        },
        'infinity list'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index));
            $mol_assert_equal(list.length, Number.POSITIVE_INFINITY);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[4], 4);
            $mol_assert_equal(list[Number.MAX_SAFE_INTEGER], Number.MAX_SAFE_INTEGER);
            $mol_assert_equal(list[Number.POSITIVE_INFINITY], undefined);
            $mol_assert_equal(calls, 3);
        },
        'stringify'() {
            const list = $mol_range2(i => i, () => 5);
            $mol_assert_equal(list.toString(), '0,1,2,3,4');
            $mol_assert_equal(list.join(';'), '0;1;2;3;4');
        },
        'for-of'() {
            let log = '';
            for (let i of $mol_range2(i => i + 1, () => 5)) {
                log += i;
            }
            $mol_assert_equal(log, '12345');
        },
        'for-in'() {
            let log = '';
            for (let i in $mol_range2(i => i, () => 5)) {
                log += i;
            }
            $mol_assert_equal(log, '01234');
        },
        'forEach'() {
            let log = '';
            $mol_range2(i => i, () => 5).forEach(i => log += i);
            $mol_assert_equal(log, '01234');
        },
        'reduce'() {
            let calls = 0;
            const list = $mol_range2().slice(1, 6);
            $mol_assert_equal(list.reduce((s, v) => s + v), 15);
            $mol_assert_equal(list.reduce((s, v) => s + v, 5), 20);
        },
        'lazy concat'() {
            let calls1 = 0;
            let calls2 = 0;
            const list = $mol_range2(index => (++calls1, index), () => 5).concat([0, 1, 2, 3, 4], $mol_range2(index => (++calls2, index), () => 5));
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 15);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[4], 4);
            $mol_assert_equal(list[5], 0);
            $mol_assert_equal(list[9], 4);
            $mol_assert_equal(list[10], 0);
            $mol_assert_equal(list[14], 4);
            $mol_assert_equal(list[15], undefined);
            $mol_assert_equal(calls1, 2);
            $mol_assert_equal(calls2, 2);
        },
        'lazy filter'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 15).filter(v => v % 2).slice(0, 3);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 3);
            $mol_assert_equal(list[0], 1);
            $mol_assert_equal(list[2], 5);
            $mol_assert_equal(list[3], undefined);
            $mol_assert_equal(calls, 8);
        },
        'lazy reverse'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10).toReversed().slice(0, 3);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 3);
            $mol_assert_equal(list[0], 9);
            $mol_assert_equal(list[2], 7);
            $mol_assert_equal(list[3], undefined);
            $mol_assert_equal(calls, 2);
        },
        'lazy map'() {
            let calls1 = 0;
            let calls2 = 0;
            const source = $mol_range2(index => (++calls1, index), () => 5);
            const target = source.map((item, index, self) => {
                ++calls2;
                $mol_assert_equal(source, self);
                return index + 10;
            }, () => 5);
            $mol_assert_equal(true, target instanceof Array);
            $mol_assert_equal(target.length, 5);
            $mol_assert_equal(target[0], 10);
            $mol_assert_equal(target[4], 14);
            $mol_assert_equal(target[5], undefined);
            $mol_assert_equal(calls1, 2);
            $mol_assert_equal(calls2, 2);
        },
        'lazy slice'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10).slice(3, 7);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 4);
            $mol_assert_equal(list[0], 3);
            $mol_assert_equal(list[3], 6);
            $mol_assert_equal(list[4], undefined);
            $mol_assert_equal(calls, 2);
        },
        'lazy some'() {
            let calls = 0;
            $mol_assert_equal(true, $mol_range2(index => (++calls, index), () => 5).some(v => v >= 2));
            $mol_assert_equal(calls, 3);
            $mol_assert_equal(false, $mol_range2(i => i, () => 0).some(v => true));
            $mol_assert_equal(true, $mol_range2(i => i).some(v => v > 5));
        },
        'lazy every'() {
            let calls = 0;
            $mol_assert_equal(false, $mol_range2(index => (++calls, index), () => 5).every(v => v < 2));
            $mol_assert_equal(calls, 3);
            $mol_assert_equal(true, $mol_range2(i => i, () => 0).every(v => false));
            $mol_assert_equal(false, $mol_range2(i => i).every(v => v < 5));
        },
        'lazyfy'() {
            let calls = 0;
            const list = $mol_range2([0, 1, 2, 3, 4, 5]).map(i => (++calls, i + 10)).slice(2);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 4);
            $mol_assert_equal(calls, 0);
            $mol_assert_equal(list[0], 12);
            $mol_assert_equal(list[3], 15);
            $mol_assert_equal(list[4], undefined);
            $mol_assert_equal(calls, 2);
        },
        'prevent modification'() {
            const list = $mol_range2(i => i, () => 5);
            $mol_assert_fail(() => list.push(4), TypeError);
            $mol_assert_fail(() => list.pop(), TypeError);
            $mol_assert_fail(() => list.unshift(4), TypeError);
            $mol_assert_fail(() => list.shift(), TypeError);
            $mol_assert_fail(() => list.splice(1, 2), TypeError);
            $mol_assert_fail(() => list[1] = 2, TypeError);
            $mol_assert_fail(() => list.reverse(), TypeError);
            $mol_assert_fail(() => list.sort(), TypeError);
            $mol_assert_equal(list.toString(), '0,1,2,3,4');
        }
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    $mol_test({
        'nulls & undefineds'() {
            $mol_assert_ok($mol_compare_deep(null, null));
            $mol_assert_ok($mol_compare_deep(undefined, undefined));
            $mol_assert_not($mol_compare_deep(undefined, null));
            $mol_assert_not($mol_compare_deep({}, null));
        },
        'number'() {
            $mol_assert_ok($mol_compare_deep(1, 1));
            $mol_assert_ok($mol_compare_deep(Number.NaN, Number.NaN));
            $mol_assert_not($mol_compare_deep(1, 2));
            $mol_assert_ok($mol_compare_deep(Object(1), Object(1)));
            $mol_assert_not($mol_compare_deep(Object(1), Object(2)));
        },
        'POJO'() {
            $mol_assert_ok($mol_compare_deep({}, {}));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { b: 2 }));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { a: 2 }));
            $mol_assert_not($mol_compare_deep({}, { a: undefined }));
            $mol_assert_not($mol_compare_deep({ a: 1, b: 2 }, { b: 2, a: 1 }));
            $mol_assert_ok($mol_compare_deep({ a: { b: 1 } }, { a: { b: 1 } }));
            $mol_assert_ok($mol_compare_deep(Object.create(null), Object.create(null)));
        },
        'Array'() {
            $mol_assert_ok($mol_compare_deep([], []));
            $mol_assert_ok($mol_compare_deep([1, [2]], [1, [2]]));
            $mol_assert_not($mol_compare_deep([1, 2], [1, 3]));
            $mol_assert_not($mol_compare_deep([1, 2,], [1, 3, undefined]));
            $mol_assert_not($mol_compare_deep($mol_range2().slice(0, 0), new Array()));
            $mol_assert_not($mol_compare_deep($mol_range2(), $mol_range2()));
        },
        'Non POJO are different'() {
            class Thing extends Object {
            }
            $mol_assert_not($mol_compare_deep(new Thing, new Thing));
            $mol_assert_not($mol_compare_deep(() => 1, () => 1));
            $mol_assert_not($mol_compare_deep(new RangeError('Test error'), new RangeError('Test error')));
        },
        'POJO with symbols'() {
            const sym = Symbol();
            $mol_assert_ok($mol_compare_deep({ [sym]: true }, { [sym]: true }));
            $mol_assert_not($mol_compare_deep({ [Symbol()]: true }, { [Symbol()]: true }));
        },
        'same POJOs with cyclic reference'() {
            const a = { foo: {} };
            a['self'] = a;
            const b = { foo: {} };
            b['self'] = b;
            $mol_assert_ok($mol_compare_deep(a, b));
        },
        'same POJOs with cyclic reference with cache warmup'() {
            const obj1 = { test: 1, obj3: null };
            const obj1_copy = { test: 1, obj3: null };
            const obj2 = { test: 2, obj1 };
            const obj2_copy = { test: 2, obj1: obj1_copy };
            const obj3 = { test: 3, obj2 };
            const obj3_copy = { test: 3, obj2: obj2_copy };
            obj1.obj3 = obj3;
            obj1_copy.obj3 = obj3_copy;
            // warmup cache
            $mol_assert_not($mol_compare_deep(obj1, {}));
            $mol_assert_not($mol_compare_deep(obj2, {}));
            $mol_assert_not($mol_compare_deep(obj3, {}));
            $mol_assert_ok($mol_compare_deep(obj3, obj3_copy));
        },
        'Date'() {
            $mol_assert_ok($mol_compare_deep(new Date(12345), new Date(12345)));
            $mol_assert_not($mol_compare_deep(new Date(12345), new Date(12346)));
        },
        'RegExp'() {
            $mol_assert_ok($mol_compare_deep(/\x22/mig, /\x22/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x21/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x22/mg));
        },
        'Error'() {
            $mol_assert_not($mol_compare_deep(new Error('xxx'), new Error('xxx')));
            const fail = (message) => new Error(message);
            $mol_assert_ok($mol_compare_deep(...['xxx', 'xxx'].map(msg => new Error(msg))));
            $mol_assert_not($mol_compare_deep(...['xxx', 'yyy'].map(msg => new Error(msg))));
        },
        'Map'() {
            $mol_assert_ok($mol_compare_deep(new Map, new Map));
            $mol_assert_ok($mol_compare_deep(new Map([[1, [2]]]), new Map([[1, [2]]])));
            $mol_assert_ok($mol_compare_deep(new Map([[[1], 2]]), new Map([[[1], 2]])));
            $mol_assert_not($mol_compare_deep(new Map([[1, 2]]), new Map([[1, 3]])));
            $mol_assert_not($mol_compare_deep(new Map([[[1], 2]]), new Map([[[3], 2]])));
        },
        'Set'() {
            $mol_assert_ok($mol_compare_deep(new Set, new Set));
            $mol_assert_ok($mol_compare_deep(new Set([1, [2]]), new Set([1, [2]])));
            $mol_assert_not($mol_compare_deep(new Set([1]), new Set([2])));
        },
        'Uint8Array'() {
            $mol_assert_ok($mol_compare_deep(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_deep(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_deep(new Uint8Array([0]), new Uint8Array([1])));
        },
        'DataView'() {
            $mol_assert_ok($mol_compare_deep(new DataView(new Uint8Array().buffer), new DataView(new Uint8Array().buffer)));
            $mol_assert_ok($mol_compare_deep(new DataView(new Uint8Array([0]).buffer), new DataView(new Uint8Array([0]).buffer)));
            $mol_assert_not($mol_compare_deep(new DataView(new Uint8Array([0]).buffer), new DataView(new Uint8Array([1]).buffer)));
        },
        'Serializale'() {
            class User {
                name;
                rand;
                constructor(name, rand = Math.random()) {
                    this.name = name;
                    this.rand = rand;
                }
                [Symbol.toPrimitive](mode) {
                    return this.name;
                }
            }
            $mol_assert_ok($mol_compare_deep(new User('Jin'), new User('Jin')));
            $mol_assert_not($mol_compare_deep(new User('Jin'), new User('John')));
        },
        'Iterable'() {
            $mol_assert_ok($mol_compare_deep(new URLSearchParams({ foo: 'bar' }), new URLSearchParams({ foo: 'bar' })));
            $mol_assert_not($mol_compare_deep(new URLSearchParams({ foo: 'xxx' }), new URLSearchParams({ foo: 'yyy' })));
            $mol_assert_not($mol_compare_deep(new URLSearchParams({ foo: 'xxx', bar: 'yyy' }), new URLSearchParams({ bar: 'yyy', foo: 'xxx' })));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_timeout = $mol_after_mock_timeout;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'test types'($) {
            class A {
                static a() {
                    return '';
                }
                static b() {
                    return $mol_wire_async(this).a();
                }
            }
        },
        async 'Latest method calls wins'($) {
            class NameLogger extends $mol_object2 {
                static $ = $;
                static first = [];
                static last = [];
                static send(next) {
                    $mol_wire_sync(this.first).push(next);
                    $$.$mol_wait_timeout(0);
                    this.last.push(next);
                }
            }
            const name = $mol_wire_async(NameLogger).send;
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_equal(NameLogger.first, ['john', 'jin']);
            $mol_assert_equal(NameLogger.last, ['jin']);
        },
        async 'Latest function calls wins'($) {
            const first = [];
            const last = [];
            function send_name(next) {
                $mol_wire_sync(first).push(next);
                $$.$mol_wait_timeout(0);
                last.push(next);
            }
            const name = $mol_wire_async(send_name);
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_equal(first, ['john', 'jin']);
            $mol_assert_equal(last, ['jin']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'test types'($) {
            class A {
                static a() {
                    return Promise.resolve('');
                }
                static b() {
                    return $mol_wire_sync(this).a();
                }
            }
        },
        async 'test method from host'($) {
            let count = 0;
            class A {
                static a() {
                    return $mol_wire_sync(this).b();
                }
                static b() { return Promise.resolve(++count); }
            }
            $mol_assert_equal(await $mol_wire_async(A).a(), 1, count);
        },
        async 'test function'($) {
            let count = 0;
            class A {
                static a() {
                    return $mol_wire_sync(this.b)();
                }
                static b() { return Promise.resolve(++count); }
            }
            $mol_assert_equal(await $mol_wire_async(A).a(), 1, count);
        },
        async 'test construct itself'($) {
            class A {
                static instances = [];
                static a() {
                    const a = new ($mol_wire_sync(A))();
                    this.instances.push(a);
                    $mol_wire_sync(this).b();
                }
                static b() { return Promise.resolve(); }
            }
            await $mol_wire_async(A).a();
            $mol_assert_equal(A.instances.length, 2);
            $mol_assert_equal(A.instances[0] instanceof A, true);
            $mol_assert_equal(A.instances[0], A.instances[1]);
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_work = $mol_after_mock_timeout;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test_mocks.push($ => {
            $.$mol_wait_timeout = function $mol_wait_timeout_mock(timeout) { };
            $.$mol_wait_timeout_async = async function $mol_wait_timeout_async_mock(timeout) { };
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test_mocks.push($ => {
            $.$mol_wait_rest = function $mol_wait_rest_mock() { };
            $.$mol_wait_rest_async = async function $mol_wait_rest_async_mock() { };
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        // https://github.com/nin-jin/slides/tree/master/reactivity#component-states
        'Cached channel'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 2);
            App.value(2);
            $mol_assert_equal(App.value(), 3);
        },
        'Read Pushed'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 0) {
                    return next;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(1), 1);
            $mol_assert_equal(App.value(), 1);
        },
        'Mem overrides mem'($) {
            class Base extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Base, "value", null);
            class Middle extends Base {
                static value(next) {
                    return super.value(next) + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Middle, "value", null);
            class App extends Middle {
                static value(next) {
                    return super.value(next) * 3;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 9);
            $mol_assert_equal(App.value(5), 21);
            $mol_assert_equal(App.value(), 21);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-consistency
        'Auto recalculation of cached values'($) {
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    return next || 1;
                }
                static yyy() {
                    return this.xxx() + 1;
                }
                static zzz() {
                    return this.yyy() + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            $mol_assert_equal(App.yyy(), 2);
            $mol_assert_equal(App.zzz(), 3);
            App.xxx(5);
            $mol_assert_equal(App.zzz(), 7);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-reasonability
        'Skip recalculation when actually no dependency changes'($) {
            const log = [];
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    log.push('xxx');
                    return next || 1;
                }
                static yyy() {
                    log.push('yyy');
                    return [Math.sign(this.xxx())];
                }
                static zzz() {
                    log.push('zzz');
                    return this.yyy()[0] + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx']);
            App.xxx(5);
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx']);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx', 'yyy']);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#flow-auto
        'Flow: Auto'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static source(next = 1) { return next; }
                static condition(next = true) { return next; }
                static counter = 0;
                static result() {
                    const res = this.condition() ? this.source() : 0;
                    return res + this.counter++;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "source", null);
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            $mol_assert_equal(App.counter, 1);
            App.source(10);
            $mol_assert_equal(App.result(), 11);
            $mol_assert_equal(App.counter, 2);
            App.condition(false);
            $mol_assert_equal(App.result(), 2);
            $mol_assert_equal(App.counter, 3);
            $mol_wire_fiber.sync();
            $mol_assert_equal(App.source(), 1);
            App.source(20);
            $mol_assert_equal(App.result(), 2);
            $mol_assert_equal(App.counter, 3);
            App.condition(true);
            $mol_assert_equal(App.result(), 23);
            $mol_assert_equal(App.counter, 4);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#dupes-equality
        'Dupes: Equality'($) {
            let counter = 0;
            class App extends $mol_object2 {
                static $ = $;
                static foo(next) {
                    return next ?? { numbs: [1] };
                }
                static bar() {
                    return { ...this.foo(), count: ++counter };
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [1] });
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [2] });
            $mol_assert_like(App.bar(), { numbs: [2], count: 2 });
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#cycle-fail
        'Cycle: Fail'($) {
            class App extends $mol_object2 {
                static $ = $;
                static foo() {
                    return this.bar() + 1;
                }
                static bar() {
                    return this.foo() + 1;
                }
                static test() {
                    $mol_assert_fail(() => App.foo(), 'Circular subscription');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            App.test();
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        // 'Update deps on push'( $ ) {
        // 	class App extends $mol_object2 {
        // 		static $ = $
        // 		@ $mol_wire_solo
        // 		static left( next = false ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static right( next = false ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static res( next?: boolean ) {
        // 			return this.left( next ) && this.right()
        // 		}
        // 	}
        // 	$mol_assert_equal( App.res(), false )
        // 	$mol_assert_equal( App.res( true ), false )
        // 	$mol_assert_equal( App.right( true ), true )
        // 	$mol_assert_equal( App.res(), true )
        // } ,
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        'Different order of pull and push'($) {
            class App extends $mol_object2 {
                static $ = $;
                static store(next = 0) {
                    return next;
                }
                static fast(next) {
                    return this.store(next);
                }
                static slow(next) {
                    if (next !== undefined)
                        this.slow(); // enforce pull before push
                    return this.store(next);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "store", null);
            __decorate([
                $mol_wire_solo
            ], App, "fast", null);
            __decorate([
                $mol_wire_solo
            ], App, "slow", null);
            App.fast();
            $mol_assert_equal(App.slow(666), 666);
            $mol_assert_equal(App.fast(), App.slow(), 666);
            App.store(777);
            $mol_assert_equal(App.fast(), App.slow(), 777);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        'Actions inside invariant'($) {
            class App extends $mol_object2 {
                static $ = $;
                static count(next = 0) {
                    return next;
                }
                static count2() {
                    return this.count();
                }
                static res() {
                    const count = this.count2();
                    if (!count)
                        this.count(count + 1);
                    return count + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "count", null);
            __decorate([
                $mol_wire_solo
            ], App, "count2", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            $mol_assert_like(App.res(), 1);
            App.count(5);
            $mol_assert_like(App.res(), 6);
        },
        async 'Toggle with async'($) {
            class App extends $mol_object2 {
                static $ = $;
                static checked(next = false) {
                    $$.$mol_wait_timeout(0);
                    return next;
                }
                static toggle() {
                    const prev = this.checked();
                    $mol_assert_unique(this.checked(!prev), prev);
                    // $mol_assert_equal( this.checked() , prev )
                }
                static res() {
                    return this.checked();
                }
                static test() {
                    $mol_assert_equal(App.res(), false);
                    App.toggle();
                    $mol_assert_equal(App.res(), true);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "checked", null);
            __decorate([
                $mol_wire_method
            ], App, "toggle", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        // // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        // 'Stable order of multiple root'( $ ) {
        // 	class App extends $mol_object2 {
        // 		static $ = $
        // 		static counter = 0
        // 		@ $mol_wire_solo
        // 		static left_trigger( next = 0 ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static left_root() {
        // 			this.left_trigger()
        // 			return ++ this.counter
        // 		}
        // 		@ $mol_wire_solo
        // 		static right_trigger( next = 0 ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static right_root() {
        // 			this.right_trigger()
        // 			return ++ this.counter
        // 		}
        // 	}
        // 	$mol_assert_equal( App.left_root(), 1 )
        // 	$mol_assert_equal( App.right_root(), 2 )
        // 	App.right_trigger( 1 )
        // 	App.left_trigger( 1 )
        // 	$mol_wire_fiber.sync()
        // 	$mol_assert_equal( App.right_root(), 4 )
        // 	$mol_assert_equal( App.left_root(), 3 )
        // } ,
        // https://github.com/nin-jin/slides/tree/master/reactivity#error-store
        'Restore after error'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static condition(next = false) { return next; }
                static broken() {
                    if (this.condition()) {
                        $mol_fail(new Error('test error'));
                    }
                    return 1;
                }
                static result() {
                    return this.broken();
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "broken", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            App.condition(true);
            $mol_assert_fail(() => App.result(), 'test error');
            App.condition(false);
            $mol_assert_equal(App.result(), 1);
        },
        async 'Wait for data'($) {
            class App extends $mol_object2 {
                static $ = $;
                static async source() {
                    return 'Jin';
                }
                static middle() {
                    return $mol_wire_sync(this).source();
                }
                static target() {
                    return this.middle();
                }
                static test() {
                    $mol_assert_equal(App.target(), 'Jin');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "middle", null);
            __decorate([
                $mol_wire_solo
            ], App, "target", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        'Auto destroy on long alone'($) {
            let destroyed = false;
            class App extends $mol_object2 {
                static $ = $;
                static showing(next = true) {
                    return next;
                }
                static details() {
                    return {
                        destructor() {
                            destroyed = true;
                        }
                    };
                }
                static render() {
                    return this.showing() ? this.details() : null;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "showing", null);
            __decorate([
                $mol_wire_solo
            ], App, "details", null);
            __decorate([
                $mol_wire_solo
            ], App, "render", null);
            const details = App.render();
            $mol_assert_ok(details);
            App.showing(false);
            $mol_assert_not(App.render());
            App.showing(true);
            $mol_assert_equal(App.render(), details);
            $mol_wire_fiber.sync();
            $mol_assert_not(destroyed);
            App.showing(false);
            $mol_wire_fiber.sync();
            $mol_assert_ok(destroyed);
            App.showing(true);
            $mol_assert_unique(App.render(), details);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        async 'Hold pubs while wait async task'($) {
            class App extends $mol_object2 {
                static $ = $;
                static counter = 0;
                static resets(next) {
                    return ($mol_wire_probe(() => this.resets()) ?? -1) + 1;
                }
                static async wait() { }
                static value() {
                    return ++this.counter;
                }
                static result() {
                    if (this.resets())
                        $mol_wire_sync(this).wait();
                    return this.value();
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "resets", null);
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            App.resets(null);
            $mol_wire_fiber.sync();
            $mol_assert_equal(await $mol_wire_async(App).result(), 1);
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static title() {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "title", null);
            $mol_assert_equal(`${App.title()}`, 'App.title<>');
        },
        'Unsubscribe from temp pubs on complete'($) {
            class Random extends $mol_object2 {
                static $ = $;
                static seed() {
                    return Math.random();
                }
                static resets(next) {
                    return Math.random();
                }
                static value() {
                    this.resets();
                    return this.seed();
                }
            }
            __decorate([
                $mol_wire_method
            ], Random, "seed", null);
            __decorate([
                $mol_wire_solo
            ], Random, "resets", null);
            __decorate([
                $mol_wire_solo
            ], Random, "value", null);
            const first = Random.value();
            Random.resets(null);
            $mol_assert_unique(Random.value(), first);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        async 'Error caching'($) {
            const next_cached = 123;
            class Some extends $mol_object2 {
                static $ = $;
                static data(id, next) {
                    if (next)
                        return next;
                    setTimeout(() => {
                        $mol_wire_async(this).data(id, next_cached);
                    }, 10);
                    $mol_fail_hidden(new Promise(() => { }));
                }
                static run() {
                    return this.data('1');
                }
            }
            __decorate([
                $mol_wire_plex
            ], Some, "data", null);
            __decorate([
                $mol_wire_method
            ], Some, "run", null);
            const val = await $mol_wire_async(Some).run();
            $mol_assert_equal(val, next_cached);
        },
        'Memoize by single simple key'($) {
            class Team extends $mol_object2 {
                static $ = $;
                static user_name(user, next) {
                    return next ?? user;
                }
                static user_names() {
                    return [
                        this.user_name('jin'),
                        this.user_name('john'),
                    ];
                }
            }
            __decorate([
                $mol_wire_plex
            ], Team, "user_name", null);
            __decorate([
                $mol_wire_solo
            ], Team, "user_names", null);
            $mol_assert_like(Team.user_names(), ['jin', 'john']);
            Team.user_name('jin', 'JIN');
            $mol_assert_like(Team.user_names(), ['JIN', 'john']);
        },
        'Memoize by single complex key'($) {
            class Map extends $mol_object2 {
                static $ = $;
                static tile(pos) {
                    return new String(`/tile=${pos}`);
                }
                static test() {
                    $mol_assert_like(this.tile([0, 1]), new String('/tile=0,1'));
                    $mol_assert_equal(this.tile([0, 1]), this.tile([0, 1]));
                }
            }
            __decorate([
                $mol_wire_plex
            ], Map, "tile", null);
            __decorate([
                $mol_wire_method
            ], Map, "test", null);
            Map.test();
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static like(friend) {
                    return new $mol_object2;
                }
                static relation([friend, props]) {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_plex
            ], App, "like", null);
            __decorate([
                $mol_wire_plex
            ], App, "relation", null);
            $mol_assert_equal(`${App.like(123)}`, 'App.like<123>');
            $mol_assert_equal(`${App.relation([123, [456]])}`, 'App.relation<[123,[456]]>');
        },
        'Deep deps'($) {
            class Fib extends $mol_object2 {
                static $ = $;
                static sums = 0;
                static value(index, next) {
                    if (next)
                        return next;
                    if (index < 2)
                        return 1;
                    ++this.sums;
                    return this.value(index - 1) + this.value(index - 2);
                }
            }
            __decorate([
                $mol_wire_plex
            ], Fib, "value", null);
            $mol_assert_equal(Fib.value(4), 5);
            $mol_assert_equal(Fib.sums, 3);
            Fib.value(1, 2);
            $mol_assert_equal(Fib.value(4), 8);
            $mol_assert_equal(Fib.sums, 6);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Previous value'() {
            class Cache extends $mol_object2 {
                static store(next) {
                    if (!next)
                        return {};
                    return {
                        ...$mol_wire_probe(() => this.store()) ?? {},
                        ...next,
                    };
                }
            }
            __decorate([
                $mol_wire_solo
            ], Cache, "store", null);
            $mol_assert_like(Cache.store(), {});
            $mol_assert_like(Cache.store({ foo: 666 }), { foo: 666 });
            $mol_assert_like(Cache.store({ bar: 777 }), { foo: 666, bar: 777 });
        },
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    $mol_test({
        'Primitives'() {
            $mol_assert_equal($mol_key(null), 'null');
            $mol_assert_equal($mol_key(false), 'false');
            $mol_assert_equal($mol_key(true), 'true');
            $mol_assert_equal($mol_key(0), '0');
            $mol_assert_equal($mol_key(1n << 64n), '18446744073709551616n');
            $mol_assert_equal($mol_key(''), '""');
        },
        'Array & POJO'() {
            $mol_assert_equal($mol_key([null]), '[null]');
            $mol_assert_equal($mol_key({ foo: 0 }), '{"foo":0}');
            $mol_assert_equal($mol_key({ foo: [false] }), '{"foo":[false]}');
        },
        'Uint8Array'() {
            $mol_assert_equal($mol_key(new Uint8Array([1, 2])), 'Uint8Array([1,2])');
            $mol_assert_equal($mol_key([new Uint8Array([1, 2])]), '[Uint8Array([1,2])]');
            $mol_assert_equal($mol_key({ foo: new Uint8Array([1, 2]) }), '{"foo":Uint8Array([1,2])}');
        },
        'Function'() {
            const func = () => { };
            $mol_assert_equal($mol_key(func), $mol_key(func));
            $mol_assert_unique($mol_key(func), $mol_key(() => { }));
        },
        'Objects'() {
            class User {
            }
            const jin = new User();
            $mol_assert_equal($mol_key(jin), $mol_key(jin));
            $mol_assert_unique($mol_key(jin), $mol_key(new User()));
        },
        'Elements'() {
            const foo = $mol_jsx("div", null, "bar");
            $mol_assert_equal($mol_key(foo), $mol_key(foo));
            $mol_assert_unique($mol_key(foo), $mol_key($mol_jsx("div", null, "bar")));
        },
        'Custom JSON representation'() {
            class User {
                toJSON() { return 'jin'; }
            }
            $mol_assert_unique([$mol_key(new User)], [$mol_key(new User)]);
        },
        'Custom key handler'() {
            class User {
                name;
                age;
                constructor(name, age) {
                    this.name = name;
                    this.age = age;
                }
                [$mol_key_handle]() { return `User(${JSON.stringify(this.name)})`; }
            }
            $mol_assert_equal($mol_key([new User('jin', 16)]), $mol_key([new User('jin', 18)]), '[User("jin")]');
        },
        'Special native classes'() {
            $mol_assert_equal($mol_key(new Date('xyz')), 'Date(NaN)');
            $mol_assert_equal($mol_key(new Date(12345)), 'Date(12345)');
            $mol_assert_equal($mol_key(/./), '/./');
            $mol_assert_equal($mol_key(/\./gimsu), '/\\./gimsu');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_frame = $mol_after_mock_commmon;
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'return result without errors'() {
            $mol_assert_equal($mol_try(() => false), false);
        },
        //'return error if thrown'() {
        //	
        //	const error = new Error( '$mol_try test error' )
        //	$mol_assert_equal( $mol_try( ()=> { throw error } ) , error )
        //	
        //} ,
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => $.$mol_fail_log = () => false);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Watch and logs reactive states. Logger automatically added to test bundle which is adding to `test.html`. */
    class $mol_wire_log extends $mol_object2 {
        static watch(task) {
            return task;
        }
        static track(fiber) {
            const prev = $mol_wire_probe(() => this.track(fiber));
            let next;
            try {
                next = fiber.sync();
            }
            finally {
                for (const pub of fiber.pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
            if (fiber.host === this)
                return next;
            if ($mol_compare_deep(prev, next)) {
                this.$.$mol_log3_rise({
                    message: '💧 Same',
                    place: fiber,
                });
            }
            else if (prev !== undefined) {
                this.$.$mol_log3_rise({
                    message: '🔥 Next',
                    place: fiber,
                    prev,
                });
            }
            return next;
        }
        static active() {
            try {
                this.watch()?.();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            finally {
                for (const pub of $mol_wire_auto().pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_wire_log, "watch", null);
    __decorate([
        $mol_mem_key
    ], $mol_wire_log, "track", null);
    __decorate([
        $mol_mem
    ], $mol_wire_log, "active", null);
    $.$mol_wire_log = $mol_wire_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_wire_log.active();
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'all cases of using maybe'() {
            $mol_assert_equal($mol_maybe(0)[0], 0);
            $mol_assert_equal($mol_maybe(false)[0], false);
            $mol_assert_equal($mol_maybe(null)[0], void 0);
            $mol_assert_equal($mol_maybe(void 0)[0], void 0);
            $mol_assert_equal($mol_maybe(void 0).map(v => v.toString())[0], void 0);
            $mol_assert_equal($mol_maybe(0).map(v => v.toString())[0], '0');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'run callback'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            $mol_assert_equal(Plus1.run(() => 2), 3);
        },
        'wrap function'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            const obj = {
                level: 2,
                pow: Plus1.func(function (a) {
                    return a ** this.level;
                })
            };
            $mol_assert_equal(obj.pow(2), 5);
        },
        'decorate field getter'() {
            class Plus1 extends $mol_wrapper {
                static last = 0;
                static wrap(task) {
                    return function (...args) {
                        return Plus1.last = (task.call(this, ...args) || 0) + 1;
                    };
                }
            }
            class Foo {
                static get two() {
                    return 1;
                }
                static set two(next) { }
            }
            __decorate([
                Plus1.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Plus1.last, 2);
            $mol_assert_equal(Foo.two, 2);
        },
        'decorate instance method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo1 {
                level = 2;
                pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo1.prototype, "pow", null);
            const Foo2 = Foo1;
            const foo = new Foo2;
            $mol_assert_equal(foo.pow(2), 5);
        },
        'decorate static method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo {
                static level = 2;
                static pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo, "pow", null);
            $mol_assert_equal(Foo.pow(2), 5);
        },
        'decorate class'() {
            class BarInc extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        const foo = task.call(this, ...args);
                        foo.bar++;
                        return foo;
                    };
                }
            }
            let Foo = class Foo {
                bar;
                constructor(bar) {
                    this.bar = bar;
                }
            };
            Foo = __decorate([
                BarInc.class
            ], Foo);
            $mol_assert_equal(new Foo(2).bar, 3);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'memoize field'() {
            class Foo {
                static one = 1;
                static get two() {
                    return ++this.one;
                }
                static set two(next) { }
            }
            __decorate([
                $mol_memo.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Foo.two, 3);
            $mol_assert_equal(Foo.two, 3);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'const returns stored value'() {
            const foo = { bar: $mol_const(Math.random()) };
            $mol_assert_equal(foo.bar(), foo.bar());
            $mol_assert_equal(foo.bar(), foo.bar['()']);
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'id auto generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                static $ = $;
                element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "element", null);
            var x = $mol_view_test_block.Root(0);
            $mol_assert_equal(x.dom_node().id, '$mol_view_test_block.Root(0)');
            $mol_assert_equal(x.element(0).dom_node().id, '$mol_view_test_block.Root(0).element(0)');
        },
        'caching ref to dom node'($) {
            var x = new class extends $mol_view {
            };
            x.$ = $;
            $mol_assert_equal(x.dom_node(), x.dom_node());
        },
        'content render'($) {
            class $mol_view_test extends $mol_view {
                sub() {
                    return ['lol', 5];
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.innerHTML, 'lol5');
        },
        'bem attributes generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                Element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "Element", null);
            var x = new $mol_view_test_block();
            x.$ = $;
            $mol_assert_equal(x.dom_node().getAttribute('mol_view_test_block'), '');
            $mol_assert_equal(x.dom_node().getAttribute('mol_view'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_block_element'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_item'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view'), '');
        },
        'render custom attributes'($) {
            class $mol_view_test extends $mol_view {
                attr() {
                    return {
                        'href': '#haha',
                        'required': true,
                        'hidden': false,
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.getAttribute('href'), '#haha');
            $mol_assert_equal(node.getAttribute('required'), 'true');
            $mol_assert_equal(node.getAttribute('hidden'), null);
        },
        'render custom fields'($) {
            class $mol_view_test extends $mol_view {
                field() {
                    return {
                        'hidden': true
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.hidden, true);
        },
        'attach event handlers'($) {
            var clicked = false;
            class $mol_view_test extends $mol_view {
                event() {
                    return {
                        'click': (next) => this.event_click(next)
                    };
                }
                event_click(next) {
                    clicked = true;
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_node();
            node.click();
            $mol_assert_ok(clicked);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_style_sheet_test1 extends $mol_view {
        Item() { return new $mol_view; }
    }
    $.$mol_style_sheet_test1 = $mol_style_sheet_test1;
    class $mol_style_sheet_test2 extends $mol_view {
        List() { return new $mol_style_sheet_test1; }
    }
    $.$mol_style_sheet_test2 = $mol_style_sheet_test2;
    $mol_test({
        'component block styles'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                display: 'block',
                zIndex: 1,
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tdisplay: block;\n\tz-index: 1;\n}\n');
        },
        'various units'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                width: '50%',
                height: '50px',
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\twidth: 50%;\n\theight: 50px;\n}\n');
        },
        'various functions'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { calc } = $mol_style_func;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                width: calc(`100% - 1px`),
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\twidth: calc(100% - 1px);\n}\n');
        },
        'property groups'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                flex: {
                    grow: 5,
                    shrink: 10,
                }
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tflex-grow: 5;\n\tflex-shrink: 10;\n}\n');
        },
        'custom properties'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '--isVariable': 'yes',
                '--is_variable': 'no',
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\t--is-variable: yes;\n\t--is_variable: no;\n}\n');
        },
        'custom property groups'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '--variable': {
                    test1: '5px',
                    test2: '10px',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\t--variable-test1: 5px;\n\t--variable-test2: 10px;\n}\n');
        },
        'property shorthand'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                padding: ['5px', 'auto'],
                margin: ['10px', 'auto'],
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tpadding: 5px auto;\n\tmargin: 10px auto;\n}\n');
        },
        'sequenced values'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { url } = $mol_style_func;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                background: {
                    image: [[url('foo')], [url('bar')]],
                    size: [['cover'], ['contain']],
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tbackground-image: url("foo"),url("bar");\n\tbackground-size: cover,contain;\n}\n');
        },
        'sequenced structs'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                box: {
                    shadow: [
                        {
                            inset: true,
                            x: 0,
                            y: 0,
                            blur: '0.5rem',
                            spread: 0,
                            color: 'red',
                        },
                        {
                            inset: false,
                            x: 0,
                            y: 0,
                            blur: '0.5rem',
                            spread: 0,
                            color: 'blue',
                        },
                    ],
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tbox-shadow: inset 0 0 0.5rem 0 red,0 0 0.5rem 0 blue;\n}\n');
        },
        'component block styles with pseudo class'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                ':focus': {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:focus {\n\tdisplay: block;\n}\n');
        },
        'component block styles with pseudo element'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '::first-line': {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]::first-line {\n\tdisplay: block;\n}\n');
        },
        'component block styles with media query'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '@media': {
                    'print': {
                        display: 'block',
                    },
                    '(max-width: 640px)': {
                        display: 'inline',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n@media print {\n[mol_style_sheet_test] {\n\tdisplay: block;\n}\n}\n@media (max-width: 640px) {\n[mol_style_sheet_test] {\n\tdisplay: inline;\n}\n}\n');
        },
        'component block styles with attribute value'() {
            class $mol_style_sheet_test extends $mol_view {
                attr() {
                    return {
                        mol_theme: '$mol_theme_dark'
                    };
                }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '@': {
                    mol_theme: {
                        '$mol_theme_dark': {
                            display: 'block',
                        },
                    },
                    disabled: {
                        'true': {
                            width: '100%',
                        },
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test]:where([disabled="true"]) {\n\twidth: 100%;\n}\n');
        },
        'component block styles with attribute value (short syntax)'() {
            class $mol_style_sheet_test extends $mol_view {
                attr() {
                    return {
                        mol_theme: '$mol_theme_dark'
                    };
                }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '[mol_theme]': {
                    '$mol_theme_dark': {
                        display: 'block',
                    },
                },
                '[disabled]': {
                    'true': {
                        width: '100%',
                    },
                    'false': {
                        width: '50%',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test]:where([disabled="true"]) {\n\twidth: 100%;\n}\n[mol_style_sheet_test]:where([disabled="false"]) {\n\twidth: 50%;\n}\n');
        },
        'component element styles'() {
            class $mol_style_sheet_test extends $mol_view {
                Item() { return new $mol_view; }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                Item: {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test_item] {\n\tdisplay: block;\n}\n');
        },
        'component element of element styles'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                width: '100%',
                List: {
                    color: 'red',
                    Item: {
                        display: 'block',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2] {\n\twidth: 100%;\n}\n[mol_style_sheet_test2_list] {\n\tcolor: red;\n}\n[mol_style_sheet_test2_list_item] {\n\tdisplay: block;\n}\n');
        },
        'component element styles with block attribute value'() {
            class $mol_style_sheet_test extends $mol_view {
                Item() { return new $mol_view; }
                attr() {
                    return {
                        mol_theme: '$mol_theme_dark',
                        disabled: true,
                    };
                }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '@': {
                    mol_theme: {
                        '$mol_theme_dark': {
                            Item: {
                                color: 'red',
                            },
                        },
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) :where([mol_style_sheet_test_item]) {\n\tcolor: red;\n}\n');
        },
        'inner component styles by class'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                color: 'red',
                $mol_style_sheet_test1: {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2] {\n\tcolor: red;\n}\n[mol_style_sheet_test2] :where([mol_style_sheet_test1]) {\n\tdisplay: block;\n}\n');
        },
        'child component styles by class'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                color: 'red',
                '>': {
                    $mol_style_sheet_test1: {
                        display: 'block',
                    },
                    $mol_style_sheet_test2: {
                        display: 'inline',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2] {\n\tcolor: red;\n}\n[mol_style_sheet_test2] > :where([mol_style_sheet_test1]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test2] > :where([mol_style_sheet_test2]) {\n\tdisplay: inline;\n}\n');
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'local get set delete'() {
            var key = '$mol_state_local_test:' + Math.random();
            $mol_assert_equal($mol_state_local.value(key), null);
            $mol_state_local.value(key, 123);
            $mol_assert_equal($mol_state_local.value(key), 123);
            $mol_state_local.value(key, null);
            $mol_assert_equal($mol_state_local.value(key), null);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test_mocks.push(context => {
        class $mol_state_local_mock extends $mol_state_local {
            static state = {};
            static value(key, next = this.state[key]) {
                return this.state[key] = (next || null);
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_state_local_mock, "value", null);
        context.$mol_state_local = $mol_state_local_mock;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class TestClass extends Uint8Array {
    }
    $mol_test({
        'Uint8Array vs itself'() {
            $mol_assert_ok($mol_compare_array(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_array(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_array(new Uint8Array([0]), new Uint8Array([1])));
        },
        'Uint8Array vs subclassed array'() {
            $mol_assert_not($mol_compare_array(new Uint8Array, new TestClass));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'decode utf8 string'() {
            const str = 'Hello, ΧΨΩЫ';
            const encoded = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 206, 167, 206, 168, 206, 169, 208, 171]);
            $mol_assert_equal($mol_charset_decode(encoded), str);
            $mol_assert_equal($mol_charset_decode(encoded, 'utf8'), str);
        },
        'decode empty string'() {
            const encoded = new Uint8Array([]);
            $mol_assert_equal($mol_charset_decode(encoded), '');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'encode empty'() {
            $mol_assert_equal($mol_charset_encode(''), new Uint8Array([]));
        },
        'encode 1 octet'() {
            $mol_assert_equal($mol_charset_encode('F'), new Uint8Array([0x46]));
        },
        'encode 2 octet'() {
            $mol_assert_equal($mol_charset_encode('Б'), new Uint8Array([0xd0, 0x91]));
        },
        'encode 3 octet'() {
            $mol_assert_equal($mol_charset_encode('ह'), new Uint8Array([0xe0, 0xa4, 0xb9]));
        },
        'encode 4 octet'() {
            $mol_assert_equal($mol_charset_encode('𐍈'), new Uint8Array([0xf0, 0x90, 0x8d, 0x88]));
        },
        'encode surrogate pair'() {
            $mol_assert_equal($mol_charset_encode('😀'), new Uint8Array([0xf0, 0x9f, 0x98, 0x80]));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'auto name'() {
            class Invalid extends $mol_error_mix {
            }
            const mix = new Invalid('foo');
            $mol_assert_equal(mix.name, 'Invalid_Error');
        },
        'simpe mix'() {
            const mix = new $mol_error_mix('foo', {}, new Error('bar'), new Error('lol'));
            $mol_assert_equal(mix.message, 'foo');
            $mol_assert_equal(mix.errors.map(e => e.message), ['bar', 'lol']);
        },
        'provide additional info'() {
            class Invalid extends $mol_error_mix {
            }
            const mix = new $mol_error_mix('Wrong password', {}, new Invalid('Too short', { value: 'p@ssw0rd', hint: '> 8 letters' }), new Invalid('Too simple', { value: 'p@ssw0rd', hint: 'need capital letter' }));
            const hints = [];
            if (mix instanceof $mol_error_mix) {
                for (const er of mix.errors) {
                    if (er instanceof Invalid) {
                        hints.push(er.cause?.hint ?? '');
                    }
                }
            }
            $mol_assert_equal(hints, ['> 8 letters', 'need capital letter']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            async "Get and parse"($) {
                $mol_assert_equal(await $mol_wire_async($mol_fetch).text('data:text/plain,foo'), 'foo');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $mol_locale_mock extends $mol_locale {
            lang(next = 'en') { return next; }
            static source(lang) {
                return {};
            }
        }
        __decorate([
            $mol_mem
        ], $mol_locale_mock.prototype, "lang", null);
        __decorate([
            $mol_mem_key
        ], $mol_locale_mock, "source", null);
        $.$mol_locale = $mol_locale_mock;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            'handle clicks by default'($) {
                let clicked = false;
                const clicker = $mol_button.make({
                    $,
                    click: (event) => { clicked = true; },
                });
                const element = clicker.dom_tree();
                const event = $mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $mol_assert_ok(clicked);
            },
            'no handle clicks if disabled'($) {
                let clicked = false;
                const clicker = $mol_button.make({
                    $,
                    click: (event) => { clicked = true; },
                    enabled: () => false,
                });
                const element = clicker.dom_tree();
                const event = $mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $mol_assert_not(clicked);
            },
            async 'Store error'($) {
                const clicker = $mol_button.make({
                    $,
                    click: (event) => $.$mol_fail(new Error('Test error')),
                });
                const event = $mol_dom_context.document.createEvent('mouseevent');
                $mol_assert_fail(() => clicker.event_activate(event), 'Test error');
                await Promise.resolve();
                $mol_assert_equal(clicker.status()[0].message, 'Test error');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'escape'() {
            const specials = $mol_regexp.from('.*+?^${}()|[]\\');
            $mol_assert_equal(specials.source, '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
        },
        'char code'() {
            const space = $mol_regexp.from(32);
            $mol_assert_like(' '.match(space), [' ']);
        },
        'repeat fixed'() {
            const { repeat, decimal_only: digit } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            $mol_assert_like('#2020#'.match(year), ['2020']);
        },
        'greedy repeat'() {
            const { repeat, repeat_greedy, latin_only: letter } = $mol_regexp;
            $mol_assert_like('abc'.match(repeat(letter, 1, 2)), ['a', 'b', 'c']);
            $mol_assert_like('abc'.match(repeat_greedy(letter, 1, 2)), ['ab', 'c']);
        },
        'repeat range'() {
            const { repeat_greedy, decimal_only: digit } = $mol_regexp;
            const year = repeat_greedy(digit, 2, 4);
            $mol_assert_like('#2#'.match(year), null);
            $mol_assert_like('#20#'.match(year), ['20']);
            $mol_assert_like('#2020#'.match(year), ['2020']);
            $mol_assert_like('#20201#'.match(year), ['2020']);
        },
        'repeat from'() {
            const { repeat_greedy, latin_only: letter } = $mol_regexp;
            const name = repeat_greedy(letter, 2);
            $mol_assert_like('##'.match(name), null);
            $mol_assert_like('#a#'.match(name), null);
            $mol_assert_like('#ab#'.match(name), ['ab']);
            $mol_assert_like('#abc#'.match(name), ['abc']);
        },
        'from string'() {
            const regexp = $mol_regexp.from('[\\d]');
            $mol_assert_equal(regexp.source, '\\[\\\\d\\]');
            $mol_assert_equal(regexp.flags, 'gsu');
        },
        'from regexp'() {
            const regexp = $mol_regexp.from(/[\d]/i);
            $mol_assert_equal(regexp.source, '[\\d]');
            $mol_assert_equal(regexp.flags, 'i');
        },
        'split'() {
            const regexp = $mol_regexp.from(';');
            $mol_assert_like('aaa;bbb;ccc'.split(regexp), ['aaa', ';', 'bbb', ';', 'ccc']);
            $mol_assert_like('aaa;;ccc'.split(regexp), ['aaa', ';', '', ';', 'ccc']);
            $mol_assert_like('aaa'.split(regexp), ['aaa']);
            $mol_assert_like(''.split(regexp), ['']);
        },
        'test for matching'() {
            const regexp = $mol_regexp.from('foo');
            $mol_assert_like(regexp.test(''), false);
            $mol_assert_like(regexp.test('fo'), false);
            $mol_assert_like(regexp.test('foo'), true);
            $mol_assert_like(regexp.test('foobar'), true);
            $mol_assert_like(regexp.test('barfoo'), true);
        },
        'case ignoring'() {
            const xxx = $mol_regexp.from('x', { ignoreCase: true });
            $mol_assert_like(xxx.flags, 'gisu');
            $mol_assert_like(xxx.exec('xx')[0], 'x');
            $mol_assert_like(xxx.exec('XX')[0], 'X');
        },
        'multiline mode'() {
            const { end, from } = $mol_regexp;
            const xxx = from(['x', end], { multiline: true });
            $mol_assert_like(xxx.exec('x\ny')[0], 'x');
            $mol_assert_like(xxx.flags, 'gmsu');
        },
        'flags override'() {
            const triplet = $mol_regexp.from($mol_regexp.from(/.../, { ignoreCase: true }), { multiline: true });
            $mol_assert_like(triplet.toString(), '/.../gmsu');
        },
        'sequence'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const date = from([begin, year, dash, month, dash, day, end]);
            $mol_assert_like(date.exec('2020-01-02')[0], '2020-01-02');
        },
        'optional'() {
            const name = $mol_regexp.from(['A', ['4']]);
            $mol_assert_equal('AB'.match(name)[0], 'A');
            $mol_assert_equal('A4'.match(name)[0], 'A4');
        },
        'anon variants'() {
            const name = $mol_regexp.from(['A', $mol_regexp.vary(['4', '5'])]);
            $mol_assert_equal('AB'.match(name), null);
            $mol_assert_equal('A4'.match(name)[0], 'A4');
            $mol_assert_equal('A5'.match(name)[0], 'A5');
        },
        'only groups'() {
            const regexp = $mol_regexp.from({ dog: '@' });
            $mol_assert_like([...'#'.matchAll(regexp)][0].groups, undefined);
            $mol_assert_like([...'@'.matchAll(regexp)][0].groups, { dog: '@' });
        },
        'catch skipped'() {
            const regexp = $mol_regexp.from(/(@)(\d?)/g);
            $mol_assert_like([...'[[@]]'.matchAll(regexp)].map(f => [...f]), [
                ['[['],
                ['@', '@', ''],
                [']]'],
            ]);
        },
        'enum variants'() {
            let Sex;
            (function (Sex) {
                Sex["male"] = "male";
                Sex["female"] = "female";
            })(Sex || (Sex = {}));
            const sexism = $mol_regexp.from(Sex);
            $mol_assert_like([...''.matchAll(sexism)].length, 0);
            $mol_assert_like([...'trans'.matchAll(sexism)][0].groups, undefined);
            $mol_assert_like([...'male'.matchAll(sexism)][0].groups, { male: 'male', female: '' });
            $mol_assert_like([...'female'.matchAll(sexism)][0].groups, { male: '', female: 'female' });
        },
        'recursive only groups'() {
            let Sex;
            (function (Sex) {
                Sex["male"] = "male";
                Sex["female"] = "female";
            })(Sex || (Sex = {}));
            const sexism = $mol_regexp.from({ Sex });
            $mol_assert_like([...''.matchAll(sexism)].length, 0);
            $mol_assert_like([...'male'.matchAll(sexism)][0].groups, { Sex: 'male', male: 'male', female: '' });
            $mol_assert_like([...'female'.matchAll(sexism)][0].groups, { Sex: 'female', male: '', female: 'female' });
        },
        'sequence with groups'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const regexp = from([begin, { year }, dash, { month }, dash, { day }, end]);
            const found = [...'2020-01-02'.matchAll(regexp)];
            $mol_assert_like(found[0].groups, {
                year: '2020',
                month: '01',
                day: '02',
            });
        },
        'sequence with groups of mixed type'() {
            const prefix = '/';
            const postfix = '/';
            const regexp = $mol_regexp.from([{ prefix }, /(\w+)/, { postfix }, /([gumi]*)/]);
            $mol_assert_like([...'/foo/mi'.matchAll(regexp)], [
                Object.assign(["/foo/mi", "/", "foo", "/", "mi"], {
                    groups: {
                        prefix: '/',
                        postfix: '/',
                    },
                    index: 0,
                    input: "/",
                }),
            ]);
        },
        'recursive sequence with groups'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const regexp = from([
                begin, { date: [{ year }, dash, { month }] }, dash, { day }, end
            ]);
            const found = [...'2020-01-02'.matchAll(regexp)];
            $mol_assert_like(found[0].groups, {
                date: '2020-01',
                year: '2020',
                month: '01',
                day: '02',
            });
        },
        'parse multiple'() {
            const { decimal_only: digit, from } = $mol_regexp;
            const regexp = from({ digit });
            $mol_assert_like([...'123'.matchAll(regexp)].map(f => f.groups), [
                { digit: '1' },
                { digit: '2' },
                { digit: '3' },
            ]);
        },
        'named variants'() {
            const { begin, or, end, from } = $mol_regexp;
            const sexism = from([
                begin, 'sex = ', { sex: ['male', or, 'female'] }, end
            ]);
            $mol_assert_like([...'sex = male'.matchAll(sexism)][0].groups, { sex: 'male' });
            $mol_assert_like([...'sex = female'.matchAll(sexism)][0].groups, { sex: 'female' });
            $mol_assert_like([...'sex = malefemale'.matchAll(sexism)][0].groups, undefined);
        },
        'force after'() {
            const { latin_only: letter, force_after, from } = $mol_regexp;
            const regexp = from([letter, force_after('.')]);
            $mol_assert_like('x.'.match(regexp), ['x']);
            $mol_assert_like('x,'.match(regexp), null);
        },
        'forbid after'() {
            const { latin_only: letter, forbid_after, from } = $mol_regexp;
            const regexp = from([letter, forbid_after('.')]);
            $mol_assert_like('x.'.match(regexp), null);
            $mol_assert_like('x,'.match(regexp), ['x']);
        },
        'char except'() {
            const { char_except, latin_only, tab } = $mol_regexp;
            const name = char_except(latin_only, tab);
            $mol_assert_like('a'.match(name), null);
            $mol_assert_like('\t'.match(name), null);
            $mol_assert_like('('.match(name), ['(']);
        },
        'unicode only'() {
            const { unicode_only, from } = $mol_regexp;
            const name = from([
                unicode_only('Script', 'Cyrillic'),
                unicode_only('Hex_Digit'),
            ]);
            $mol_assert_like('FF'.match(name), null);
            $mol_assert_like('ФG'.match(name), null);
            $mol_assert_like('ФF'.match(name), ['ФF']);
        },
        'generate by optional with inner group'() {
            const { begin, end, from } = $mol_regexp;
            const animals = from([begin, '#', ['^', { dog: '@' }], end]);
            $mol_assert_equal(animals.generate({}), '#');
            $mol_assert_equal(animals.generate({ dog: false }), '#');
            $mol_assert_equal(animals.generate({ dog: true }), '#^@');
            $mol_assert_fail(() => animals.generate({ dog: '$' }), 'Wrong param: dog=$');
        },
        'generate by optional with inner group with variants'() {
            const { begin, end, from } = $mol_regexp;
            const animals = from([begin, '#', ['^', { animal: { dog: '@', fox: '&' } }], end]);
            $mol_assert_equal(animals.generate({}), '#');
            $mol_assert_equal(animals.generate({ dog: true }), '#^@');
            $mol_assert_equal(animals.generate({ fox: true }), '#^&');
            $mol_assert_fail(() => animals.generate({ dog: '$' }), 'Wrong param: dog=$');
        },
        'complex example'() {
            const { begin, end, char_only, char_range, latin_only, slash_back, repeat_greedy, from, } = $mol_regexp;
            const atom_char = char_only(latin_only, "!#$%&'*+/=?^`{|}~-");
            const atom = repeat_greedy(atom_char, 1);
            const dot_atom = from([atom, repeat_greedy(['.', atom])]);
            const name_letter = char_only(char_range(0x01, 0x08), 0x0b, 0x0c, char_range(0x0e, 0x1f), 0x21, char_range(0x23, 0x5b), char_range(0x5d, 0x7f));
            const quoted_pair = from([
                slash_back,
                char_only(char_range(0x01, 0x09), 0x0b, 0x0c, char_range(0x0e, 0x7f))
            ]);
            const name = repeat_greedy({ name_letter, quoted_pair });
            const quoted_name = from(['"', { name }, '"']);
            const local_part = from({ dot_atom, quoted_name });
            const domain = dot_atom;
            const mail = from([begin, local_part, '@', { domain }, end]);
            $mol_assert_equal('foo..bar@example.org'.match(mail), null);
            $mol_assert_equal('foo..bar"@example.org'.match(mail), null);
            $mol_assert_like([...'foo.bar@example.org'.matchAll(mail)][0].groups, {
                dot_atom: "foo.bar",
                quoted_name: "",
                name: "",
                name_letter: "",
                quoted_pair: "",
                domain: "example.org",
            });
            $mol_assert_like([...'"foo..bar"@example.org'.matchAll(mail)][0].groups, {
                dot_atom: "",
                quoted_name: '"foo..bar"',
                name: "foo..bar",
                name_letter: "r",
                quoted_pair: "",
                domain: "example.org",
            });
            $mol_assert_equal(mail.generate({ dot_atom: 'foo.bar', domain: 'example.org' }), 'foo.bar@example.org');
            $mol_assert_equal(mail.generate({ name: 'foo..bar', domain: 'example.org' }), '"foo..bar"@example.org');
            $mol_assert_fail(() => mail.generate({ dot_atom: 'foo..bar', domain: 'example.org' }), 'Wrong param: dot_atom=foo..bar');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_test({
            'Empty needle'() {
                const app = new $mol_dimmer;
                app.needle = () => '  ';
                app.haystack = () => 'foo  bar';
                $mol_assert_like(app.strings(), ['foo  bar']);
            },
            'Empty haystack'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo  bar';
                app.haystack = () => '';
                $mol_assert_like(app.strings(), ['']);
            },
            'Not found'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo';
                app.haystack = () => ' bar ';
                $mol_assert_like(app.strings(), [' bar ']);
            },
            'One found'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo';
                app.haystack = () => ' barfoo ';
                $mol_assert_like(app.strings(), [' bar', 'foo', ' ']);
            },
            'Multiple found'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo';
                app.haystack = () => ' foobarfoo foo';
                $mol_assert_like(app.strings(), [' ', 'foo', 'bar', 'foo', ' ', 'foo']);
            },
            'Fuzzy search'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo bar';
                app.haystack = () => ' barfoo ';
                $mol_assert_like(app.strings(), [' ', 'bar', '', 'foo', ' ']);
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push(context => {
        class $mol_state_arg_mock extends $mol_state_arg {
            static $ = context;
            static href(next) { return next || ''; }
            static go(next) {
                this.href(this.link(next));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_state_arg_mock, "href", null);
        __decorate([
            $mol_action
        ], $mol_state_arg_mock, "go", null);
        context.$mol_state_arg = $mol_state_arg_mock;
    });
    $mol_test({
        'args as dictionary'($) {
            $.$mol_state_arg.href('#!foo=bar/xxx');
            $mol_assert_equal($.$mol_state_arg.dict(), { foo: 'bar', xxx: '' });
            $.$mol_state_arg.dict({ foo: null, yyy: '', lol: '123' });
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!yyy/lol=123');
        },
        'one value from args'($) {
            $.$mol_state_arg.href('#!foo=bar/xxx');
            $mol_assert_equal($.$mol_state_arg.value('foo'), 'bar');
            $mol_assert_equal($.$mol_state_arg.value('xxx'), '');
            $.$mol_state_arg.value('foo', 'lol');
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!foo=lol/xxx');
            $.$mol_state_arg.value('foo', '');
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!foo/xxx');
            $.$mol_state_arg.value('foo', null);
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!xxx');
        },
        'nested args'($) {
            const base = new $.$mol_state_arg('nested.');
            class Nested extends $mol_state_arg {
                constructor(prefix) {
                    super(base.prefix + prefix);
                }
                static value = (key, next) => base.value(key, next);
            }
            $.$mol_state_arg.href('#!foo=bar/nested.xxx=123');
            $mol_assert_equal(Nested.value('foo'), null);
            $mol_assert_equal(Nested.value('xxx'), '123');
            Nested.value('foo', 'lol');
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!foo=bar/nested.xxx=123/nested.foo=lol');
        },
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
var $;
(function ($) {
    $mol_test({
        'safe tag'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("div", null, "foo")])[0]), $mol_dom_serialize($mol_jsx("div", null, "foo")));
        },
        'bad tag'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("script", null, "alert('ahtung!')")])[0]), $mol_dom_serialize($mol_jsx($mol_jsx_frag, null, "alert('ahtung!')")));
        },
        'common attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { id: "foo" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", { id: "foo" }, "foo")));
        },
        'safe attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { href: "https://example.org/" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", { href: "https://example.org/" }, "foo")));
        },
        'bad attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { onclick: "alert('ahtung!')" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", null, "foo")));
        },
        'danger attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { href: "javascript:alert('ahtung!')" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", { href: "about:blank#javascript:alert('ahtung!')" }, "foo")));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'null by default'() {
            const key = String(Math.random());
            $mol_assert_equal($mol_state_session.value(key), null);
        },
        'storing'() {
            const key = String(Math.random());
            $mol_state_session.value(key, '$mol_state_session_test');
            $mol_assert_equal($mol_state_session.value(key), '$mol_state_session_test');
            $mol_state_session.value(key, null);
            $mol_assert_equal($mol_state_session.value(key), null);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'source starts with version line'($) {
            const source = $bog_gamengine_gl_source({}, 'void main() {}', 'void main() {}');
            $mol_assert_ok(source.vert.startsWith('#version 300 es\n'));
            $mol_assert_ok(source.frag.startsWith('#version 300 es\n'));
        },
        'glob goes to both shaders as uniform'($) {
            const source = $bog_gamengine_gl_source({ glob: { proj: 'mat4' } }, '', '');
            $mol_assert_ok(source.vert.includes('uniform mat4 proj;\n'));
            $mol_assert_ok(source.frag.includes('uniform mat4 proj;\n'));
        },
        'input goes to vert only as in'($) {
            const source = $bog_gamengine_gl_source({ input: { vertex: 'vec3' } }, '', '');
            $mol_assert_ok(source.vert.includes('in vec3 vertex;\n'));
            $mol_assert_not(source.frag.includes('vertex'));
        },
        'sampler2DShadow glob is declared as uniform in frag'($) {
            const source = $bog_gamengine_gl_source({ glob: { shadow_map: 'sampler2DShadow' } }, '', '');
            $mol_assert_ok(source.frag.includes('uniform sampler2DShadow shadow_map;\n'));
            $mol_assert_ok(source.frag.includes('precision highp sampler2DShadow;'));
        },
        'inputs get layout locations in face order, mat4 takes four'($) {
            const source = $bog_gamengine_gl_source({ input: { vertex: 'vec3', inst_trans: 'mat4', inst_tint: 'vec4' } }, '', '');
            $mol_assert_ok(source.vert.includes('layout( location = 0 ) in vec3 vertex;\n'));
            $mol_assert_ok(source.vert.includes('layout( location = 1 ) in mat4 inst_trans;\n'));
            $mol_assert_ok(source.vert.includes('layout( location = 5 ) in vec4 inst_tint;\n'));
        },
        'pipe is out in vert and in in frag'($) {
            const source = $bog_gamengine_gl_source({ pipe: { pipe_tint: 'vec4' } }, '', '');
            $mol_assert_ok(source.vert.includes('out vec4 pipe_tint;\n'));
            $mol_assert_ok(source.frag.includes('in vec4 pipe_tint;\n'));
        },
        'output goes to frag only as out'($) {
            const source = $bog_gamengine_gl_source({ output: { color: 'vec4' } }, '', '');
            $mol_assert_ok(source.frag.includes('out vec4 color;\n'));
            $mol_assert_not(source.vert.includes('color'));
        },
        'entry text ends the source'($) {
            const source = $bog_gamengine_gl_source({}, 'void main() { v }', 'void main() { f }');
            $mol_assert_ok(source.vert.endsWith('void main() { v }'));
            $mol_assert_ok(source.frag.endsWith('void main() { f }'));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function key_jump() {
        const key = new $bog_gamengine_key;
        key.bind({ jump: ['space', 'W'] });
        return key;
    }
    function key_axis() {
        const key = new $bog_gamengine_key;
        key.bind({ left: ['A'], right: ['D'] });
        return key;
    }
    $mol_test({
        'action is false before any key'() {
            const key = key_jump();
            $mol_assert_equal(key.action('jump'), false);
        },
        'pressed key turns action on'() {
            const key = key_jump();
            key.keys().space(true);
            $mol_assert_equal(key.action('jump'), true);
        },
        'second key keeps action while first released'() {
            const key = key_jump();
            key.keys().space(true);
            key.keys().W(true);
            key.keys().space(false);
            $mol_assert_equal(key.action('jump'), true);
        },
        'both keys released turn action off'() {
            const key = key_jump();
            key.keys().space(true);
            key.keys().W(true);
            key.keys().space(false);
            key.keys().W(false);
            $mol_assert_equal(key.action('jump'), false);
        },
        'axis is zero without keys'() {
            const key = key_axis();
            $mol_assert_equal(key.axis('left', 'right'), 0);
        },
        'axis is minus one on left'() {
            const key = key_axis();
            key.keys().A(true);
            $mol_assert_equal(key.axis('left', 'right'), -1);
        },
        'axis is one on right'() {
            const key = key_axis();
            key.keys().D(true);
            $mol_assert_equal(key.axis('left', 'right'), 1);
        },
        'unknown action is false'() {
            const key = key_jump();
            $mol_assert_equal(key.action('fly'), false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_pad_mock extends $bog_gamengine_pad {
        state = null;
        pads() {
            return [this.state];
        }
    }
    function pad_state(pressed, axes) {
        const buttons = [];
        for (let i = 0; i < 16; ++i)
            buttons.push({ pressed: pressed.includes(i) });
        return { buttons, axes };
    }
    function pad_move() {
        const pad = new $bog_gamengine_pad_mock;
        pad.bind({ jump: ['a'], left: ['lx-'], right: ['right', 'lx+'] });
        return pad;
    }
    $mol_test({
        'action is false without gamepad'() {
            const pad = pad_move();
            pad.poll();
            $mol_assert_equal(pad.action('jump'), false);
        },
        'pressed button turns action on'() {
            const pad = pad_move();
            pad.state = pad_state([0], [0, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.action('jump'), true);
        },
        'released button turns action off'() {
            const pad = pad_move();
            pad.state = pad_state([0], [0, 0, 0, 0]);
            pad.poll();
            pad.state = pad_state([], [0, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.action('jump'), false);
        },
        'stick inside dead zone gives zero axis'() {
            const pad = pad_move();
            pad.state = pad_state([], [0.1, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.axis('left', 'right'), 0);
        },
        'stick right gives positive axis'() {
            const pad = pad_move();
            pad.state = pad_state([], [0.6, 0, 0, 0]);
            pad.poll();
            $mol_assert_ok(Math.abs(pad.axis('left', 'right') - 0.6) < 1e-6);
        },
        'stick left gives negative axis'() {
            const pad = pad_move();
            pad.state = pad_state([], [-0.6, 0, 0, 0]);
            pad.poll();
            $mol_assert_ok(Math.abs(pad.axis('left', 'right') + 0.6) < 1e-6);
        },
        'dpad button bound with stick turns action on'() {
            const pad = pad_move();
            pad.state = pad_state([15], [0, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.action('right'), true);
        },
        'stick bound with dpad button turns action on'() {
            const pad = pad_move();
            pad.state = pad_state([], [0.5, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.action('right'), true);
        },
        'unknown action is false'() {
            const pad = pad_move();
            pad.state = pad_state([0], [0, 0, 0, 0]);
            pad.poll();
            $mol_assert_equal(pad.action('fly'), false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'stick at seven tenths of radius gives seven tenths axis'() {
            const screen = new $bog_gamengine_input_screen;
            screen.move(0.7 * screen.radius(), 0);
            $mol_assert_ok(Math.abs(screen.axis('left', 'right') - 0.7) < 1e-6);
        },
        'stick pulled up gives positive vertical axis'() {
            const screen = new $bog_gamengine_input_screen;
            screen.move(0, -0.5 * screen.radius());
            $mol_assert_ok(Math.abs(screen.axis('down', 'up') - 0.5) < 1e-6);
        },
        'stick inside dead zone gives zero axis'() {
            const screen = new $bog_gamengine_input_screen;
            screen.move(0.1 * screen.radius(), 0);
            $mol_assert_equal(screen.axis('left', 'right'), 0);
        },
        'stick beyond radius is clamped to one'() {
            const screen = new $bog_gamengine_input_screen;
            screen.move(3 * screen.radius(), 0);
            $mol_assert_ok(Math.abs(screen.axis('left', 'right') - 1) < 1e-6);
        },
        'stick returned to center gives zero axis'() {
            const screen = new $bog_gamengine_input_screen;
            screen.move(screen.radius(), 0);
            screen.move(0, 0);
            $mol_assert_equal(screen.axis('left', 'right'), 0);
        },
        'pressed button holds action'() {
            const screen = new $bog_gamengine_input_screen;
            screen.press('jump');
            $mol_assert_equal(screen.action('jump'), true);
        },
        'released button drops action'() {
            const screen = new $bog_gamengine_input_screen;
            screen.press('jump');
            screen.release('jump');
            $mol_assert_equal(screen.action('jump'), false);
        },
        'hidden screen has no widgets'() {
            const screen = new $bog_gamengine_input_screen;
            $mol_assert_equal(screen.sub().length, 0);
        },
        'shown screen has stick and buttons'() {
            const screen = new $bog_gamengine_input_screen;
            screen.shown(true);
            $mol_assert_equal(screen.sub().length, 2);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_input_pad_mock extends $bog_gamengine_pad {
        state = null;
        pads() {
            return [this.state];
        }
    }
    function input_move() {
        const key = new $bog_gamengine_key;
        key.bind({ left: ['A'], right: ['D'] });
        const pad = new $bog_gamengine_input_pad_mock;
        pad.bind({ left: ['lx-'], right: ['lx+'] });
        const input = new $bog_gamengine_input;
        input.key(key);
        input.pad(pad);
        return { input, key, pad };
    }
    $mol_test({
        'key held gives action while pad is silent'() {
            const { input, key } = input_move();
            key.keys().D(true);
            input.poll();
            $mol_assert_equal(input.action('right'), true);
        },
        'key held gives full axis while pad is silent'() {
            const { input, key } = input_move();
            key.keys().D(true);
            input.poll();
            $mol_assert_equal(input.axis('left', 'right'), 1);
        },
        'pad stick gives its axis while keys are silent'() {
            const { input, pad } = input_move();
            pad.state = { buttons: [], axes: [0.5, 0, 0, 0] };
            input.poll();
            $mol_assert_ok(Math.abs(input.axis('left', 'right') - 0.5) < 1e-6);
        },
        'key overrides pad stick'() {
            const { input, key, pad } = input_move();
            key.keys().A(true);
            pad.state = { buttons: [], axes: [0.5, 0, 0, 0] };
            input.poll();
            $mol_assert_equal(input.axis('left', 'right'), -1);
        },
        'both silent give zero axis'() {
            const { input } = input_move();
            input.poll();
            $mol_assert_equal(input.axis('left', 'right'), 0);
        },
        'both silent give false action'() {
            const { input } = input_move();
            input.poll();
            $mol_assert_equal(input.action('right'), false);
        },
        'screen stick gives its axis while keys and pad are silent'() {
            const { input } = input_move();
            const screen = new $bog_gamengine_input_screen;
            input.screen(screen);
            screen.move(0.5 * screen.radius(), 0);
            input.poll();
            $mol_assert_ok(Math.abs(input.axis('left', 'right') - 0.5) < 1e-6);
        },
        'screen button gives action while keys and pad are silent'() {
            const { input } = input_move();
            const screen = new $bog_gamengine_input_screen;
            input.screen(screen);
            screen.press('right');
            input.poll();
            $mol_assert_equal(input.action('right'), true);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_clock_time_mock extends $mol_state_time {
        static stamp(next = 0) {
            return next;
        }
        static now(precision) {
            return this.stamp();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock_time_mock, "stamp", null);
    function clock_mock($) {
        $.$mol_state_time = $bog_gamengine_clock_time_mock;
        const clock = new $bog_gamengine_clock;
        clock.$ = $;
        return clock;
    }
    $mol_test({
        'three ticks give frame 3'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.frame();
            $bog_gamengine_clock_time_mock.stamp(16);
            clock.frame();
            $bog_gamengine_clock_time_mock.stamp(32);
            $mol_assert_equal(clock.frame(), 3);
        },
        'dt is seconds since previous frame'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.frame();
            $bog_gamengine_clock_time_mock.stamp(16);
            $mol_assert_equal(clock.dt(), 0.016);
        },
        'paused gives dt 0'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.frame();
            clock.paused(true);
            $bog_gamengine_clock_time_mock.stamp(16);
            $mol_assert_equal(clock.dt(), 0);
        },
        'jump of 5 seconds gives dt 0.1'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.frame();
            $bog_gamengine_clock_time_mock.stamp(5000);
            $mol_assert_equal(clock.dt(), 0.1);
        },
        'speed scales dt'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.frame();
            clock.speed(0.5);
            $bog_gamengine_clock_time_mock.stamp(20);
            $mol_assert_equal(clock.dt(), 0.01);
        },
        'time accumulates dt'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.time();
            $bog_gamengine_clock_time_mock.stamp(10);
            clock.time();
            $bog_gamengine_clock_time_mock.stamp(30);
            $mol_assert_equal(clock.time(), 0.03);
        },
        'time set to 5 keeps accumulating dt from 5'($) {
            const clock = clock_mock($);
            $bog_gamengine_clock_time_mock.stamp(0);
            clock.time();
            $bog_gamengine_clock_time_mock.stamp(10);
            clock.time();
            clock.time(5);
            $mol_assert_equal(clock.time(), 5);
            $bog_gamengine_clock_time_mock.stamp(30);
            $mol_assert_equal(clock.time(), 5.02);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_node_test_hero extends $bog_gamengine_node {
    }
    function node_test_prop(node, name) {
        return node.props().find(prop => prop.name === name);
    }
    $mol_test({
        'child shifted by 1 under parent rotated by half pi lands at (0, 1, 0)'() {
            const parent = new $bog_gamengine_node;
            parent.rot(new Float32Array([0, 0, Math.PI / 2]));
            const child = new $bog_gamengine_node;
            child.parent(parent);
            child.pos(new Float32Array([1, 0, 0]));
            const world = child.world();
            $mol_assert_ok(Math.abs(world[12] - 0) < 1e-6);
            $mol_assert_ok(Math.abs(world[13] - 1) < 1e-6);
            $mol_assert_ok(Math.abs(world[14] - 0) < 1e-6);
        },
        'title without name is class name without prefix'() {
            $mol_assert_equal(new $bog_gamengine_node_test_hero().title(), 'node_test_hero');
        },
        'title with name is name'() {
            const node = new $bog_gamengine_node_test_hero;
            node.name('Hero');
            $mol_assert_equal(node.title(), 'Hero');
        },
        'base props name their kinds'() {
            const props = new $bog_gamengine_node().props();
            const kind = (name) => props.find(prop => prop.name === name)?.kind ?? 'нет такого';
            $mol_assert_equal(kind('pos'), 'vec3');
            $mol_assert_equal(kind('rot'), 'euler');
            $mol_assert_equal(kind('scale'), 'vec3');
            $mol_assert_equal(kind('tint'), 'vec4');
            $mol_assert_equal(kind('role'), 'text');
        },
        'set through props changes pos'() {
            const node = new $bog_gamengine_node;
            node_test_prop(node, 'pos').set(new Float32Array([1, 2, 3]));
            $mol_assert_equal([...node.pos()], [1, 2, 3]);
        },
        'pos from plain array is typed array with same numbers'() {
            const node = new $bog_gamengine_node;
            node.pos([1, 2, 3]);
            $mol_assert_ok(node.pos() instanceof Float32Array);
            $mol_assert_equal([...node.pos()], [1, 2, 3]);
        },
        'pos from typed array keeps the same reference'() {
            const node = new $bog_gamengine_node;
            const typed = new Float32Array([1, 2, 3]);
            node.pos(typed);
            $mol_assert_equal(node.pos(), typed);
        },
        'kids setter stores nodes'() {
            const a = new $bog_gamengine_node;
            const b = new $bog_gamengine_node;
            const parent = new $bog_gamengine_node;
            parent.kids([a, b]);
            $mol_assert_equal(parent.kids(), [a, b]);
        },
        'kids setter sets parent of kids'() {
            const a = new $bog_gamengine_node;
            const parent = new $bog_gamengine_node;
            parent.kids([a]);
            $mol_assert_equal(a.parent(), parent);
        },
        'kids setter keeps parent already set'() {
            const a = new $bog_gamengine_node;
            const own = new $bog_gamengine_node;
            a.parent(own);
            new $bog_gamengine_node().kids([a]);
            $mol_assert_equal(a.parent(), own);
        },
        'root of a bare node is itself and scene is null'() {
            const node = new $bog_gamengine_node;
            $mol_assert_equal(node.root(), node);
            $mol_assert_equal(node.scene(), null);
            $mol_assert_equal(node.input(), null);
            $mol_assert_equal(node.clock(), null);
        },
        'billboard normal looks at the camera turned by half pi'() {
            const scene = new $bog_gamengine_scene;
            const cam = new $bog_gamengine_cam;
            cam.rot(new Float32Array([0, Math.PI / 2, 0]));
            scene.cam(cam);
            const node = new $bog_gamengine_node;
            node.billboard(true);
            scene.kids([node]);
            const trans = node.trans();
            const to_cam = [-Math.sin(Math.PI / 2), 0, -Math.cos(Math.PI / 2)];
            const normal = [trans[8], trans[9], trans[10]];
            const dot = -(normal[0] * to_cam[0] + normal[1] * to_cam[1] + normal[2] * to_cam[2]);
            $mol_assert_ok(Math.abs(dot - 1) < 1e-6);
        },
        'node without billboard keeps its own yaw'() {
            const scene = new $bog_gamengine_scene;
            const cam = new $bog_gamengine_cam;
            cam.rot(new Float32Array([0, Math.PI / 2, 0]));
            scene.cam(cam);
            const node = new $bog_gamengine_node;
            scene.kids([node]);
            $mol_assert_ok(Math.abs(node.trans()[10] - 1) < 1e-6);
        },
        'tint of bare node defaults to opaque white through props'() {
            const node = new $bog_gamengine_node;
            $mol_assert_equal([...node_test_prop(node, 'tint').get()], [1, 1, 1, 1]);
            node_test_prop(node, 'tint').set([1, 0, 0, 0.5]);
            $mol_assert_equal([...node.tint()], [1, 0, 0, 0.5]);
        },
        'attached part takes the node as its owner'() {
            const node = new $bog_gamengine_node;
            const part = new $bog_gamengine_combat;
            $mol_assert_equal(part.owner(), null);
            node.parts([part]);
            $mol_assert_equal(part.owner(), node);
            $mol_assert_equal(node.parts().length, 1);
        },
        'own owner of a part is not taken away'() {
            const first = new $bog_gamengine_node;
            const second = new $bog_gamengine_node;
            const part = new $bog_gamengine_combat;
            part.owner(first);
            second.parts([part]);
            $mol_assert_equal(part.owner(), first);
        },
        'part keeps its own props and the node does not borrow them'() {
            const node = new $bog_gamengine_node;
            const part = new $bog_gamengine_combat;
            part.health_max(40);
            node.parts([part]);
            const names = node.props().map(prop => prop.name);
            $mol_assert_equal(names.filter(name => /health|rate|\./.test(name)), []);
            $mol_assert_equal(part.props().find(prop => prop.name === 'health_max').get(), 40);
        },
        'node without parts keeps its props to itself'() {
            const names = new $bog_gamengine_node().props().map(prop => prop.name);
            $mol_assert_equal(names.filter(name => name.includes('.')), []);
            $mol_assert_ok(names.indexOf('pos') >= 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function owned() {
        const owner = new class extends $bog_gamengine_node {
            deaths = 0;
            die() {
                ++this.deaths;
            }
        };
        const fight = new $bog_gamengine_combat;
        fight.owner(owner);
        return { owner, fight };
    }
    $mol_test({
        'hurt cuts health by the damage left after armor'() {
            const fight = new $bog_gamengine_combat;
            fight.health_max(40);
            fight.armor(3);
            fight.hurt(10);
            $mol_assert_equal(fight.health(), 33);
            $mol_assert_equal(fight.dead(), false);
        },
        'hurt down to zero kills and calls die of the owner once'() {
            const { owner, fight } = owned();
            fight.health_max(10);
            fight.hurt(4);
            $mol_assert_equal(owner.deaths, 0);
            fight.hurt(90);
            $mol_assert_equal(fight.health(), 0);
            $mol_assert_equal(fight.dead(), true);
            $mol_assert_equal(owner.deaths, 1);
            fight.hurt(5);
            $mol_assert_equal(owner.deaths, 1);
        },
        'death of an owner without die changes nothing but the health'() {
            const fight = new $bog_gamengine_combat;
            fight.owner(new $bog_gamengine_node);
            fight.health_max(5);
            fight.hurt(5);
            $mol_assert_equal(fight.dead(), true);
        },
        'heal never goes above the maximum and revive brings the full health back'() {
            const fight = new $bog_gamengine_combat;
            fight.health_max(10);
            fight.hurt(6);
            fight.heal(100);
            $mol_assert_equal(fight.health(), 10);
            fight.hurt(10);
            fight.revive();
            $mol_assert_equal(fight.dead(), false);
            $mol_assert_equal(fight.health(), 10);
        },
        'timer holds the next shot until one rate has passed'() {
            const fight = new $bog_gamengine_combat;
            fight.rate(2);
            $mol_assert_equal(fight.ready(0), true);
            fight.fire(0);
            $mol_assert_equal(fight.ready(0.4), false);
            $mol_assert_equal(fight.ready(0.5), true);
        },
        'timer takes the time of the scene clock of the owner'() {
            const scene = new $bog_gamengine_scene;
            const clock = new $bog_gamengine_clock;
            scene.clock(clock);
            const owner = new $bog_gamengine_node;
            scene.kids([owner]);
            const fight = new $bog_gamengine_combat;
            fight.owner(owner);
            fight.rate(1);
            clock.time(10);
            fight.fire();
            clock.time(10.5);
            $mol_assert_equal(fight.ready(), false);
            clock.time(11);
            $mol_assert_equal(fight.ready(), true);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_cam_test_deep extends $bog_gamengine_cam {
        proj(aspect) {
            return $mol_3d_mat4.perspective(Math.PI / 3, aspect, 0.1, 100);
        }
    }
    function $bog_gamengine_cam_test_frustum() {
        return new $bog_gamengine_cam_test_deep().frustum(1, new Float32Array(24));
    }
    $mol_test({
        'sphere in front of camera is inside frustum'() {
            $mol_assert_ok($bog_gamengine_cam_frustum_sphere($bog_gamengine_cam_test_frustum(), 0, 0, -5, 1));
        },
        'sphere behind camera is outside frustum'() {
            $mol_assert_not($bog_gamengine_cam_frustum_sphere($bog_gamengine_cam_test_frustum(), 0, 0, 5, 1));
        },
        'sphere aside beyond fov is outside frustum'() {
            $mol_assert_not($bog_gamengine_cam_frustum_sphere($bog_gamengine_cam_test_frustum(), 10, 0, -5, 1));
        },
        'sphere crossing near plane from behind is inside frustum'() {
            $mol_assert_ok($bog_gamengine_cam_frustum_sphere($bog_gamengine_cam_test_frustum(), 0, 0, 0.5, 1));
        },
        'aabb behind camera is outside, aabb in front is inside'() {
            const frustum = $bog_gamengine_cam_test_frustum();
            const aabb = new Float32Array([-1, -1, 4, 1, 1, 6, -1, -1, -6, 1, 1, -4]);
            $mol_assert_not($bog_gamengine_cam_frustum_aabb(frustum, aabb, 0));
            $mol_assert_ok($bog_gamengine_cam_frustum_aabb(frustum, aabb, 6));
        },
        'frustum follows camera turned around'() {
            const cam = new $bog_gamengine_cam_test_deep;
            cam.rot(new Float32Array([0, Math.PI, 0]));
            const frustum = cam.frustum(1, new Float32Array(24));
            $mol_assert_ok($bog_gamengine_cam_frustum_sphere(frustum, 0, 0, 5, 1));
            $mol_assert_not($bog_gamengine_cam_frustum_sphere(frustum, 0, 0, -5, 1));
        },
        'view of camera shifted by (0, 0, 5) moves (0, 0, 5) to origin'() {
            const cam = new $bog_gamengine_cam;
            cam.pos(new Float32Array([0, 0, 5]));
            const view = cam.view();
            const point = [0, 0, 5, 1];
            const out = new Float32Array(4);
            for (let i = 0; i < 4; ++i) {
                out[i] = view[i] * point[0] + view[4 + i] * point[1] + view[8 + i] * point[2] + view[12 + i] * point[3];
            }
            $mol_assert_ok(Math.abs(out[0]) < 1e-6);
            $mol_assert_ok(Math.abs(out[1]) < 1e-6);
            $mol_assert_ok(Math.abs(out[2]) < 1e-6);
            $mol_assert_ok(Math.abs(out[3] - 1) < 1e-6);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'props contain kind, color and power'() {
            const names = new $bog_gamengine_light().props().map(prop => prop.name);
            $mol_assert_ok(names.includes('kind'));
            $mol_assert_ok(names.includes('color'));
            $mol_assert_ok(names.includes('power'));
        },
        'defaults are white sun of power 1'() {
            const light = new $bog_gamengine_light;
            $mol_assert_equal(light.kind(), 'sun');
            $mol_assert_equal([...light.color()], [1, 1, 1]);
            $mol_assert_equal(light.power(), 1);
        },
        'spot rotated around Y by half pi shines to minus X'() {
            const light = new $bog_gamengine_light;
            light.kind('spot');
            light.rot(new Float32Array([0, Math.PI / 2, 0]));
            const dir = light.dir();
            $mol_assert_ok(Math.abs(dir[0] + 1) < 1e-6);
            $mol_assert_ok(Math.abs(dir[1]) < 1e-6);
            $mol_assert_ok(Math.abs(dir[2]) < 1e-6);
        },
        'direction follows parent rotation'() {
            const parent = new $bog_gamengine_node;
            parent.rot(new Float32Array([0, Math.PI / 2, 0]));
            const light = new $bog_gamengine_light;
            light.parent(parent);
            const dir = light.dir();
            $mol_assert_ok(Math.abs(dir[0] + 1) < 1e-6);
            $mol_assert_ok(Math.abs(dir[2]) < 1e-6);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'vert and frag have main'($) {
            const shader = new $bog_gamengine_shader_sprite;
            $mol_assert_ok(shader.vert().includes('main'));
            $mol_assert_ok(shader.frag().includes('main'));
        },
        'every input name is used in vert'($) {
            const shader = new $bog_gamengine_shader_sprite;
            const vert = shader.sources().vert;
            const face = shader.face();
            for (const name in face.input)
                $mol_assert_ok(vert.includes(name));
        },
        'every glob name is used in vert or frag'($) {
            const shader = new $bog_gamengine_shader_sprite;
            const both = shader.sources().vert + shader.sources().frag;
            const face = shader.face();
            for (const name in face.glob)
                $mol_assert_ok(both.includes(name));
        },
        'sources mix only glsl both'($) {
            const shader = new $bog_gamengine_shader_sprite;
            $mol_assert_equal(shader.sources().vert, $mol_3d_glsl_both + shader.vert());
            $mol_assert_equal(shader.sources().frag, $mol_3d_glsl_both + shader.frag());
        },
        'every pipe name is in both vert and frag'($) {
            const shader = new $bog_gamengine_shader_sprite;
            const face = shader.face();
            for (const name in face.pipe) {
                $mol_assert_ok(shader.vert().includes(name));
                $mol_assert_ok(shader.frag().includes(name));
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'vert and frag have main'($) {
            const shader = new $bog_gamengine_shader_flat;
            $mol_assert_ok(shader.vert().includes('main'));
            $mol_assert_ok(shader.frag().includes('main'));
        },
        'every input and glob name is used in vert'($) {
            const shader = new $bog_gamengine_shader_flat;
            const vert = shader.sources().vert;
            const face = shader.face();
            for (const name in face.input)
                $mol_assert_ok(vert.includes(name));
            for (const name in face.glob)
                $mol_assert_ok(vert.includes(name));
        },
        'sources mix only glsl both'($) {
            const shader = new $bog_gamengine_shader_flat;
            $mol_assert_equal(shader.sources().vert, $mol_3d_glsl_both + shader.vert());
            $mol_assert_equal(shader.sources().frag, $mol_3d_glsl_both + shader.frag());
        },
        'every pipe name is in both vert and frag'($) {
            const shader = new $bog_gamengine_shader_flat;
            const face = shader.face();
            for (const name in face.pipe) {
                $mol_assert_ok(shader.vert().includes(name));
                $mol_assert_ok(shader.frag().includes(name));
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'vert and frag have main'($) {
            const shader = new $bog_gamengine_shader_solid;
            $mol_assert_ok(shader.vert().includes('main'));
            $mol_assert_ok(shader.frag().includes('main'));
        },
        'every input name is used in vert'($) {
            const shader = new $bog_gamengine_shader_solid;
            const vert = shader.sources().vert;
            const face = shader.face();
            for (const name in face.input)
                $mol_assert_ok(vert.includes(name));
        },
        'every glob name is used in vert or frag'($) {
            const shader = new $bog_gamengine_shader_solid;
            const both = shader.sources().vert + shader.sources().frag;
            const face = shader.face();
            for (const name in face.glob)
                $mol_assert_ok(both.includes(name));
        },
        'sources mix only glsl both'($) {
            const shader = new $bog_gamengine_shader_solid;
            $mol_assert_equal(shader.sources().vert, $mol_3d_glsl_both + shader.vert());
            $mol_assert_equal(shader.sources().frag, $mol_3d_glsl_both + shader.frag());
        },
        'every pipe name is in both vert and frag'($) {
            const shader = new $bog_gamengine_shader_solid;
            const face = shader.face();
            for (const name in face.pipe) {
                $mol_assert_ok(shader.vert().includes(name));
                $mol_assert_ok(shader.frag().includes(name));
            }
        },
        'wireframe glob is float and used in both vert and frag'($) {
            const shader = new $bog_gamengine_shader_solid;
            $mol_assert_equal(shader.face().glob.wireframe, 'float');
            $mol_assert_ok(shader.vert().includes('wireframe'));
            $mol_assert_ok(shader.frag().includes('wireframe'));
        },
        'light uniforms are arrays of eight in face and used in frag'($) {
            const shader = new $bog_gamengine_shader_solid;
            const glob = shader.face().glob;
            $mol_assert_equal(glob.light_count, 'int');
            $mol_assert_equal(glob.light_pos, 'vec4[8]');
            $mol_assert_equal(glob.light_dir, 'vec4[8]');
            $mol_assert_equal(glob.light_color, 'vec4[8]');
            $mol_assert_equal(glob.ambient, 'vec3');
            $mol_assert_equal(glob.cam_pos, 'vec3');
            const frag = shader.frag();
            for (const name of ['light_count', 'light_pos', 'light_dir', 'light_color', 'ambient', 'cam_pos'])
                $mol_assert_ok(frag.includes(name));
        },
        'material and normal layer come per instance and reach frag'($) {
            const shader = new $bog_gamengine_shader_solid;
            $mol_assert_equal(shader.face().input.inst_material, 'vec4');
            $mol_assert_equal(shader.face().input.inst_normal_layer, 'float');
            $mol_assert_ok(shader.vert().includes('inst_material'));
            $mol_assert_ok(shader.frag().includes('pipe_material'));
            $mol_assert_ok(shader.frag().includes('pipe_normal_layer'));
        },
        'bump comes from the data atlas and albedo from the color one'($) {
            const shader = new $bog_gamengine_shader_solid;
            $mol_assert_equal(shader.face().glob.atlas_data, 'sampler2DArray');
            const frag = shader.frag();
            $mol_assert_ok(frag.includes('texture( atlas_data, vec3( pipe_uv, pipe_normal_layer ) )'));
            $mol_assert_ok(frag.includes('texture( atlas, vec3( pipe_uv, pipe_layer ) )'));
            $mol_assert_not(frag.includes('texture( atlas, vec3( pipe_uv, pipe_normal_layer ) )'));
        },
        'shadow uniforms are in face and frag has a pcf function over shadow_map'($) {
            const shader = new $bog_gamengine_shader_solid;
            const glob = shader.face().glob;
            $mol_assert_equal(glob.shadow_mat, 'mat4');
            $mol_assert_equal(glob.shadow_map, 'sampler2DShadow');
            $mol_assert_equal(glob.shadow_light, 'int');
            const frag = shader.frag();
            $mol_assert_ok(frag.includes('float shade( vec3 pos, vec3 normal, vec3 light )'));
            $mol_assert_ok(frag.includes('texture( shadow_map, coord + vec3( vec2( x, y ) * texel, 0.0 ) )'));
            $mol_assert_ok(frag.includes('return sum / 9.0;'));
        },
        'shadow multiplies only the light it was built for'($) {
            const frag = new $bog_gamengine_shader_solid().frag();
            $mol_assert_ok(frag.includes('float atten = i == shadow_light ? lit : 1.0;'));
            $mol_assert_not(frag.includes('break'));
        },
        'array uniform is declared with size after name'($) {
            const source = $bog_gamengine_gl_source({ glob: { light_pos: 'vec4[8]' } }, '', '');
            $mol_assert_ok(source.frag.includes('uniform vec4 light_pos[8];'));
        },
        'solid wants depth, flat does not'($) {
            $mol_assert_equal(new $bog_gamengine_shader_solid().depth(), true);
            $mol_assert_equal(new $bog_gamengine_shader_flat().depth(), false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'plain solid has no atlas sampler in face and sources'($) {
            const shader = new $bog_gamengine_shader_solid_plain;
            const glob = shader.face().glob;
            $mol_assert_equal(glob.atlas, undefined);
            const both = shader.sources().vert + shader.sources().frag;
            $mol_assert_not(both.includes('sampler2DArray'));
            $mol_assert_not(both.includes('texture( atlas'));
        },
        'plain solid takes color from instance tint'($) {
            const shader = new $bog_gamengine_shader_solid_plain;
            $mol_assert_equal(shader.face().input.inst_tint, 'vec4');
            $mol_assert_ok(shader.vert().includes('pipe_tint = inst_tint;'));
            $mol_assert_ok(shader.frag().includes('vec3 albedo = pipe_tint.rgb;'));
        },
        'plain solid wants depth and lights like solid'($) {
            const shader = new $bog_gamengine_shader_solid_plain;
            $mol_assert_equal(shader.depth(), true);
            const glob = shader.face().glob;
            $mol_assert_equal(glob.light_count, 'int');
            $mol_assert_equal(glob.light_pos, 'vec4[8]');
            $mol_assert_ok(shader.frag().includes('bog_gamengine_pbr_brdf'));
        },
        'every input and pipe name of plain solid is used'($) {
            const shader = new $bog_gamengine_shader_solid_plain;
            const face = shader.face();
            const vert = shader.sources().vert;
            for (const name in face.input)
                $mol_assert_ok(vert.includes(name));
            for (const name in face.pipe) {
                $mol_assert_ok(shader.vert().includes(name));
                $mol_assert_ok(shader.frag().includes(name));
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'quad array lengths'($) {
            const quad = $bog_gamengine_shape_quad.make({ $ });
            $mol_assert_equal(quad.geometry().length, 12);
            $mol_assert_equal(quad.skin().length, 8);
            $mol_assert_equal(quad.normals().length, 12);
            $mol_assert_equal(quad.count(), 4);
        },
        'quad strip triangles are counter clockwise'($) {
            const geometry = $bog_gamengine_shape_quad.make({ $ }).geometry();
            const cross_z = (a, b, c) => {
                const ax = geometry[b * 3] - geometry[a * 3];
                const ay = geometry[b * 3 + 1] - geometry[a * 3 + 1];
                const bx = geometry[c * 3] - geometry[a * 3];
                const by = geometry[c * 3 + 1] - geometry[a * 3 + 1];
                return ax * by - ay * bx;
            };
            $mol_assert_ok(cross_z(0, 1, 2) > 0);
            $mol_assert_ok(cross_z(2, 1, 3) > 0);
        },
        'quad normals point to plus z'($) {
            const normals = $bog_gamengine_shape_quad.make({ $ }).normals();
            for (let i = 0; i < 4; ++i) {
                $mol_assert_equal(normals[i * 3], 0);
                $mol_assert_equal(normals[i * 3 + 1], 0);
                $mol_assert_equal(normals[i * 3 + 2], 1);
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'set through props changes still'() {
            const body = new $bog_gamengine_phys_body;
            body.props().find(prop => prop.name === 'still').set(true);
            $mol_assert_equal(body.still(), true);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_map_test_make(plane = 'xy') {
        const map = new $bog_gamengine_map;
        map.map([
            '#####',
            '#.E.#',
            '#.P.',
            '#####',
        ].join('\n'));
        map.plane(plane);
        return map;
    }
    $mol_test({
        'size comes from the row count and the longest row'() {
            const map = $bog_gamengine_map_test_make();
            $mol_assert_equal(map.width(), 5);
            $mol_assert_equal(map.height(), 4);
        },
        'char outside the map is empty'() {
            const map = $bog_gamengine_map_test_make();
            $mol_assert_equal(map.char(2, 1), 'E');
            $mol_assert_equal(map.char(4, 2), '');
            $mol_assert_equal(map.char(-1, 0), '');
            $mol_assert_equal(map.char(0, 4), '');
        },
        'spots list every cell with the char'() {
            const map = $bog_gamengine_map_test_make();
            $mol_assert_equal(map.spots('E'), [[2, 1]]);
            $mol_assert_equal(map.spots('#').length, 13);
            $mol_assert_equal(map.spots('x').length, 0);
        },
        'chars gather the whole alphabet of the map'() {
            const map = $bog_gamengine_map_test_make();
            $mol_assert_equal([...map.chars()].sort(), ['#', '.', 'E', 'P']);
        },
        'id keeps the cell coordinates'() {
            const map = $bog_gamengine_map_test_make();
            $mol_assert_equal(map.ids('P'), ['2_2']);
            $mol_assert_equal([...map.xy('2_2', new Int32Array(2))], [2, 2]);
        },
        'flat plane puts the cell center on xy with rows going down'() {
            const map = $bog_gamengine_map_test_make();
            $mol_assert_equal([...map.pos(2, 1, 0, new Float32Array(3))], [2.5, -1.5, 0]);
        },
        'ground plane puts the cell center on xz at the asked lift'() {
            const map = $bog_gamengine_map_test_make('xz');
            $mol_assert_equal([...map.spot_pos('2_1', 0.5, new Float32Array(3))], [2.5, 0.5, 1.5]);
        },
        'origin moves the whole grid on both planes'() {
            const map = $bog_gamengine_map_test_make();
            map.origin([4, -3]);
            $mol_assert_equal([...map.pos(0, 0, 0, new Float32Array(3))], [4.5, -3.5, 0]);
            $mol_assert_equal([...map.pos(2, 1, 0, new Float32Array(3))], [6.5, -4.5, 0]);
            const ground = $bog_gamengine_map_test_make('xz');
            ground.origin([4, 3]);
            $mol_assert_equal([...ground.pos(2, 1, 0.5, new Float32Array(3))], [6.5, 0.5, 4.5]);
        },
        'center sits in the middle of the map on both planes'() {
            $mol_assert_equal([...$bog_gamengine_map_test_make().center(0, new Float32Array(3))], [2.5, -2, 0]);
            $mol_assert_equal([...$bog_gamengine_map_test_make('xz').center(0, new Float32Array(3))], [2.5, 0, 2]);
        },
        'unknown plane falls at the first place, not into xy silently'() {
            const map = $bog_gamengine_map_test_make();
            map.plane('zx');
            $mol_assert_fail(() => map.pos(2, 1, 0, new Float32Array(3)), 'Map plane zx is unknown, known: xy, xz');
            $mol_assert_fail(() => map.center(0, new Float32Array(3)), 'Map plane zx is unknown, known: xy, xz');
        },
        'plane set by a tree literal is checked too, the accessor is overridden there'() {
            const map = new $bog_gamengine_map;
            Object.assign(map, { plane: () => 'zx' });
            $mol_assert_fail(() => map.pos(0, 0, 0, new Float32Array(3)), 'Map plane zx is unknown, known: xy, xz');
        },
        'edit of the map moves the spots'() {
            const map = $bog_gamengine_map_test_make();
            map.map('..\n.E');
            $mol_assert_equal(map.spots('E'), [[1, 1]]);
            $mol_assert_equal(map.ids('P').length, 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_phys_tile_test_make() {
        const tile = new $bog_gamengine_phys_tile;
        tile.map('###\n#.#\n###');
        return tile;
    }
    function $bog_gamengine_phys_tile_test_level() {
        const tile = new $bog_gamengine_phys_tile;
        tile.map('..o..\n.###.\n.E...\n#####');
        return tile;
    }
    $mol_test({
        'ahead gives the char of the cell in the given direction'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            $mol_assert_equal(tile.ahead(0.5, -2.5, 1, 0, 1), 'E');
            $mol_assert_equal(tile.ahead(2.5, -0.5, 0, -1, 1), '#');
            $mol_assert_equal(tile.ahead(2.5, -0.5, 1, 0, 1), '.');
            $mol_assert_equal(tile.ahead(2.5, -0.5, 1, 0, 3), '');
        },
        'edge is true past the end of the platform and false above it'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            $mol_assert_equal(tile.edge(2.5, -0.5, 1, 0), false);
            $mol_assert_equal(tile.edge(3.5, -0.5, 1, 0), true);
            $mol_assert_equal(tile.edge(1.5, -0.5, -1, 0), true);
        },
        'edge is false when the cell ahead is solid'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            $mol_assert_equal(tile.edge(1.5, -1.5, 1, 0), false);
        },
        'spots gives every cell with the char'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            $mol_assert_equal(tile.spots('o').length, 1);
            $mol_assert_equal(tile.spots('o')[0][0], 2);
            $mol_assert_equal(tile.spots('o')[0][1], 0);
            $mol_assert_equal(tile.spots('E').length, 1);
            $mol_assert_equal(tile.spots('#').length, 8);
            $mol_assert_equal(tile.spots('x').length, 0);
        },
        'chars gives the set of chars of the map'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            const chars = tile.chars();
            $mol_assert_equal(chars.size, 4);
            $mol_assert_equal(chars.has('o'), true);
            $mol_assert_equal(chars.has('E'), true);
            $mol_assert_equal(chars.has('#'), true);
            $mol_assert_equal(chars.has('x'), false);
        },
        'spots follow the map'() {
            const tile = $bog_gamengine_phys_tile_test_level();
            $mol_assert_equal(tile.spots('o').length, 1);
            tile.map('.....\n#####');
            $mol_assert_equal(tile.spots('o').length, 0);
            $mol_assert_equal(tile.chars().size, 2);
        },
        'cell pos is the center of the cell square'() {
            const tile = $bog_gamengine_phys_tile_test_make();
            const pos = tile.cell_pos(2, 1, new Float32Array(3));
            $mol_assert_equal(pos[0], 2.5);
            $mol_assert_equal(pos[1], -1.5);
            $mol_assert_equal(pos[2], 0);
        },
        'cell at the center of a cell gives that cell back'() {
            const tile = $bog_gamengine_phys_tile_test_make();
            const pos = tile.cell_pos(2, 1, new Float32Array(3));
            const at = tile.cell_at(pos[0], pos[1], new Int32Array(2));
            $mol_assert_equal(at[0], 2);
            $mol_assert_equal(at[1], 1);
        },
        'corners of a cell belong to it'() {
            const tile = $bog_gamengine_phys_tile_test_make();
            const at = new Int32Array(2);
            tile.cell_at(2, -1, at);
            $mol_assert_equal(at[0], 2);
            $mol_assert_equal(at[1], 1);
            tile.cell_at(2.999, -1.001, at);
            $mol_assert_equal(at[0], 2);
            $mol_assert_equal(at[1], 1);
        },
        'cell at a point outside the map is outside its bounds'() {
            const tile = $bog_gamengine_phys_tile_test_make();
            const at = tile.cell_at(-0.5, 0.5, new Int32Array(2));
            $mol_assert_equal(at[0], -1);
            $mol_assert_equal(at[1], -1);
            $mol_assert_equal(tile.cell(at[0], at[1]), true);
        },
        'shifted grid keeps drawing and passability on the same cell'() {
            const tile = $bog_gamengine_phys_tile_test_make();
            tile.origin([5, -4]);
            const pos = tile.cell_pos(1, 1, new Float32Array(3));
            $mol_assert_equal([pos[0], pos[1]], [6.5, -5.5]);
            const at = tile.cell_at(pos[0], pos[1], new Int32Array(2));
            $mol_assert_equal([at[0], at[1]], [1, 1]);
            $mol_assert_equal(tile.solid_at(pos[0], pos[1]), false);
            const wall = tile.cell_pos(0, 1, new Float32Array(3));
            $mol_assert_equal(tile.solid_at(wall[0], wall[1]), true);
            $mol_assert_equal(tile.solid_at(1.5, -1.5), true);
        },
        'shifted grid on the vertical plane reads back the very cell it drew'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map('####\n#..#\n#..#\n####');
            tile.plane('xz');
            tile.origin([6, -5]);
            const spot = tile.cell_pos(1, 2, new Float32Array(3));
            $mol_assert_equal([spot[0], spot[2]], [7.5, -2.5]);
            $mol_assert_equal(tile.solid_at(spot[0], spot[2]), false);
            const pos = new Float32Array(3);
            const at = new Int32Array(2);
            for (let y = 0; y < tile.height(); ++y) {
                for (let x = 0; x < tile.width(); ++x) {
                    tile.cell_pos(x, y, pos);
                    tile.cell_at(pos[0], pos[2], at);
                    $mol_assert_equal([at[0], at[1]], [x, y]);
                    $mol_assert_equal(tile.solid_at(pos[0], pos[2]), tile.cell(x, y));
                }
            }
        },
        'cell spot is the packed pair that cell at consumes, on both planes'() {
            for (const plane of ['xy', 'xz']) {
                const tile = new $bog_gamengine_phys_tile;
                tile.map('####\n#..#\n####');
                tile.plane(plane);
                tile.origin([3, -2]);
                const spot = new Float32Array(2);
                const at = new Int32Array(2);
                for (let y = 0; y < tile.height(); ++y) {
                    for (let x = 0; x < tile.width(); ++x) {
                        tile.cell_spot(x, y, spot);
                        tile.cell_at(spot[0], spot[1], at);
                        $mol_assert_equal([at[0], at[1]], [x, y]);
                    }
                }
            }
        },
        'unknown plane falls at cell at, not into xy silently'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map('####\n#..#\n####');
            tile.plane('zx');
            $mol_assert_fail(() => tile.cell_at(1.5, -1.5, new Int32Array(2)), 'Map plane zx is unknown, known: xy, xz');
        },
        'solid at a point uses the same cell as cell at'() {
            const tile = $bog_gamengine_phys_tile_test_make();
            const pos = tile.cell_pos(1, 1, new Float32Array(3));
            $mol_assert_equal(tile.solid_at(pos[0], pos[1]), false);
            const wall = tile.cell_pos(0, 1, new Float32Array(3));
            $mol_assert_equal(tile.solid_at(wall[0], wall[1]), true);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const map = '####\n#..#\n####';
    const room = '#####\n#...#\n#...#\n#...#\n#####';
    class Probe extends $bog_gamengine_phys_body {
        hits = [];
        normals = [];
        hit(other, normal) {
            this.hits.push(other);
            this.normals.push(normal ? [normal[0], normal[1]] : []);
        }
        last_normal() {
            return this.normals[this.normals.length - 1];
        }
    }
    function room_phys(body, gy) {
        const tile = new $bog_gamengine_phys_tile;
        tile.map(room);
        const phys = new $bog_gamengine_phys;
        phys.tile(tile);
        phys.gravity(new Float32Array([0, gy]));
        phys.bodies([body]);
        return phys;
    }
    function falling(steps) {
        const body = new Probe;
        body.pos(new Float32Array([2.5, -1.5, 0]));
        const phys = room_phys(body, -10);
        for (let i = 0; i < steps; ++i)
            phys.step(0.1);
        return body;
    }
    function flying() {
        const body = new Probe;
        body.pos(new Float32Array([1.5, -1.5, 0]));
        body.vel(new Float32Array([10, 0, 0]));
        const tile = new $bog_gamengine_phys_tile;
        tile.map(map);
        const phys = new $bog_gamengine_phys;
        phys.tile(tile);
        phys.bodies([body]);
        phys.step(0.1);
        return body;
    }
    function pair(a_still) {
        const a = new Probe;
        a.still(a_still);
        const b = new Probe;
        b.pos(new Float32Array([0.5, 0, 0]));
        const phys = new $bog_gamengine_phys;
        phys.bodies([a, b]);
        phys.step(0.1);
        return [a, b];
    }
    $mol_test({
        'body flying into tile wall stops at its face'() {
            const body = flying();
            $mol_assert_ok(Math.abs(body.pos()[0] - 2.5) < 1e-6);
        },
        'body flying into tile wall loses velocity along that axis'() {
            $mol_assert_equal(flying().vel()[0], 0);
        },
        'body flying into tile wall gets hit with null'() {
            $mol_assert_equal(flying().hits, [null]);
        },
        'two moving bodies push apart equally'() {
            const [a, b] = pair(false);
            $mol_assert_equal(a.pos()[0], -0.25);
            $mol_assert_equal(b.pos()[0], 0.75);
        },
        'two moving bodies hit each other'() {
            const [a, b] = pair(false);
            $mol_assert_equal(a.hits, [b]);
            $mol_assert_equal(b.hits, [a]);
        },
        'moving body is pushed out of still one entirely'() {
            const [a, b] = pair(true);
            $mol_assert_equal(a.pos()[0], 0);
            $mol_assert_equal(b.pos()[0], 1);
        },
        'moving body passes through ghost and both get hit'() {
            const ghost = new Probe;
            ghost.ghost(true);
            const mover = new Probe;
            mover.pos(new Float32Array([0.5, 0, 0]));
            mover.vel(new Float32Array([1, 0, 0]));
            const phys = new $bog_gamengine_phys;
            phys.bodies([ghost, mover]);
            phys.step(0.1);
            $mol_assert_equal(ghost.pos()[0], 0);
            $mol_assert_ok(Math.abs(mover.pos()[0] - 0.6) < 1e-6);
            $mol_assert_equal(ghost.hits, [mover]);
            $mol_assert_equal(mover.hits, [ghost]);
        },
        'body inside tile wall stays put while time stands still and moves out once it runs'() {
            const body = new Probe;
            body.pos(new Float32Array([0.5, -0.5, 0]));
            const tile = new $bog_gamengine_phys_tile;
            tile.map(map);
            const phys = new $bog_gamengine_phys;
            phys.tile(tile);
            phys.bodies([body]);
            phys.step(0);
            $mol_assert_equal(body.pos()[0], 0.5);
            $mol_assert_equal(body.pos()[1], -0.5);
            $mol_assert_equal(body.hits, []);
            phys.step(0.1);
            $mol_assert_ok(body.pos()[0] !== 0.5 || body.pos()[1] !== -0.5);
        },
        'ghost inside tile wall is not pushed out'() {
            const ghost = new Probe;
            ghost.ghost(true);
            ghost.pos(new Float32Array([0.5, -0.5, 0]));
            const tile = new $bog_gamengine_phys_tile;
            tile.map(map);
            const phys = new $bog_gamengine_phys;
            phys.tile(tile);
            phys.bodies([ghost]);
            phys.step(0.1);
            $mol_assert_equal(ghost.pos()[0], 0.5);
            $mol_assert_equal(ghost.pos()[1], -0.5);
            $mol_assert_equal(ghost.hits, []);
        },
        'gravity drops the body onto the tile floor'() {
            $mol_assert_equal(falling(8).pos()[1], -3.5);
        },
        'gravity drops the body onto the floor of a shifted map'() {
            const body = new Probe;
            body.pos(new Float32Array([32.5, -21.5, 0]));
            const tile = new $bog_gamengine_phys_tile;
            tile.map(room);
            tile.origin([30, -20]);
            const phys = new $bog_gamengine_phys;
            phys.tile(tile);
            phys.gravity(new Float32Array([0, -10]));
            phys.bodies([body]);
            for (let i = 0; i < 8; ++i)
                phys.step(0.1);
            $mol_assert_equal(body.pos()[1], -23.5);
            $mol_assert_equal(body.pos()[0], 32.5);
            $mol_assert_equal(body.on_ground(), true);
        },
        'landed body stands on ground'() {
            const body = falling(8);
            $mol_assert_equal(body.on_ground(), true);
            $mol_assert_equal(body.touched & $bog_gamengine_phys_body.side_down, $bog_gamengine_phys_body.side_down);
        },
        'landed body gets hit with the normal up'() {
            $mol_assert_equal(falling(8).last_normal(), [0, 1]);
        },
        'jump up stops at the ceiling'() {
            const body = new Probe;
            body.pos(new Float32Array([2.5, -3.5, 0]));
            body.vel(new Float32Array([0, 10, 0]));
            const phys = room_phys(body, -10);
            for (let i = 0; i < 3; ++i)
                phys.step(0.1);
            $mol_assert_equal(body.pos()[1], -1.5);
            $mol_assert_equal(body.on_ceil(), true);
            $mol_assert_equal(body.last_normal(), [0, -1]);
        },
        'body running into a wall touches it aside'() {
            const body = new Probe;
            body.pos(new Float32Array([2.5, -2.5, 0]));
            body.vel(new Float32Array([10, 0, 0]));
            const phys = room_phys(body, 0);
            phys.step(0.1);
            $mol_assert_equal(body.on_wall(), true);
            $mol_assert_equal(body.on_ground(), false);
            $mol_assert_equal(body.last_normal(), [-1, 0]);
        },
        'gravity does not move a ghost'() {
            const body = new Probe;
            body.ghost(true);
            body.pos(new Float32Array([2.5, -1.5, 0]));
            const phys = room_phys(body, -10);
            phys.step(0.1);
            $mol_assert_equal(body.pos()[1], -1.5);
            $mol_assert_equal(body.vel()[1], 0);
        },
        'gravity does not move a still body'() {
            const body = new Probe;
            body.still(true);
            body.pos(new Float32Array([2.5, -1.5, 0]));
            const phys = room_phys(body, -10);
            phys.step(0.1);
            $mol_assert_equal(body.pos()[1], -1.5);
            $mol_assert_equal(body.vel()[1], 0);
        },
        'body with read-only pos fails by name'() {
            class Stuck extends $bog_gamengine_phys_body {
                fixed = new Float32Array([2.5, -1.5, 0]);
                pos() {
                    return this.fixed;
                }
            }
            const body = new Stuck;
            body.vel(new Float32Array([1, 0, 0]));
            const phys = new $bog_gamengine_phys;
            phys.bodies([body]);
            $mol_assert_fail(() => phys.step(0.1), 'Stuck: pos is read-only, declare it as `pos? <=>`');
        },
        'tile cell beyond map edge is solid'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map(map);
            $mol_assert_equal(tile.cell(-1, 1), true);
            $mol_assert_equal(tile.cell(4, 1), true);
            $mol_assert_equal(tile.cell(1, 3), true);
        },
        'tile solid_at reads free world point'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map(map);
            $mol_assert_equal(tile.solid_at(1.5, -1.5), false);
        },
        'tile solid_at reads wall world point'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map(map);
            $mol_assert_equal(tile.solid_at(0.5, -0.5), true);
        },
        'step_ms is zero before the first step and a time after it'() {
            const phys = new $bog_gamengine_phys;
            $mol_assert_equal(phys.step_ms(), 0);
            phys.step(1 / 60);
            $mol_assert_equal(phys.samples, 1);
            $mol_assert_ok(phys.step_ms() >= 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'add writes sum into out'() {
            const out = new Float32Array(2);
            const res = $bog_gamengine_vec_add(out, new Float32Array([1, 2]), new Float32Array([3, 5]));
            $mol_assert_equal(res, out);
            $mol_assert_equal([...out], [4, 7]);
        },
        'sub writes difference into out shared with a'() {
            const a = new Float32Array([5, 7, 9]);
            const res = $bog_gamengine_vec_sub(a, a, new Float32Array([1, 2, 3]));
            $mol_assert_equal(res, a);
            $mol_assert_equal([...a], [4, 5, 6]);
        },
        'scale multiplies by scalar'() {
            const out = new Float32Array(3);
            const res = $bog_gamengine_vec_scale(out, new Float32Array([1, -2, 3]), 2);
            $mol_assert_equal(res, out);
            $mol_assert_equal([...out], [2, -4, 6]);
        },
        'len is euclidean length'() {
            $mol_assert_equal($bog_gamengine_vec_len(new Float32Array([3, 4])), 5);
            $mol_assert_equal($bog_gamengine_vec_len(new Float32Array([2, 3, 6])), 7);
        },
        'norm gives unit vector'() {
            const out = new Float32Array(2);
            const res = $bog_gamengine_vec_norm(out, new Float32Array([0, -5]));
            $mol_assert_equal(res, out);
            $mol_assert_equal([...out], [0, -1]);
        },
        'dot is scalar product'() {
            $mol_assert_equal($bog_gamengine_vec_dot(new Float32Array([1, 2, 3]), new Float32Array([4, 5, 6])), 32);
        },
        'cross of x and y is z'() {
            const out = new Float32Array(3);
            const res = $bog_gamengine_vec_cross(out, new Float32Array([1, 0, 0]), new Float32Array([0, 1, 0]));
            $mol_assert_equal(res, out);
            $mol_assert_equal([...out], [0, 0, 1]);
        },
        'lerp interpolates into out shared with b'() {
            const b = new Float32Array([10, 20]);
            const res = $bog_gamengine_vec_lerp(b, new Float32Array([0, 0]), b, 0.25);
            $mol_assert_equal(res, b);
            $mol_assert_equal([...b], [2.5, 5]);
        },
        'mat4_apply multiplies column-major matrix by vec4'() {
            const out = new Float32Array(4);
            const m = $mol_3d_mat4.translation([10, 20, 30]);
            const res = $bog_gamengine_vec_mat4_apply(out, m, new Float32Array([1, 2, 3, 1]));
            $mol_assert_equal(res, out);
            $mol_assert_equal([...out], [11, 22, 33, 1]);
        },
        'quat_rotate by half pi around Y sends x to minus z'() {
            const q = $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 1, 0]), Math.PI / 2);
            const out = $bog_gamengine_vec_quat_rotate(new Float32Array(3), q, new Float32Array([1, 0, 0]));
            $mol_assert_ok(Math.abs(out[0]) < 1e-6);
            $mol_assert_ok(Math.abs(out[1]) < 1e-6);
            $mol_assert_ok(Math.abs(out[2] + 1) < 1e-6);
        },
        'quat_mul of two quarter turns around Y is a half turn'() {
            const q = $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 1, 0]), Math.PI / 2);
            const qq = $bog_gamengine_vec_quat_mul(new Float32Array(4), q, q);
            const out = $bog_gamengine_vec_quat_rotate(new Float32Array(3), qq, new Float32Array([1, 0, 0]));
            $mol_assert_ok(Math.abs(out[0] + 1) < 1e-6);
            $mol_assert_ok(Math.abs(out[2]) < 1e-6);
        },
        'quat_identity leaves vector as is'() {
            const q = $bog_gamengine_vec_quat_identity(new Float32Array(4));
            const out = $bog_gamengine_vec_quat_rotate(new Float32Array(3), q, new Float32Array([1, 2, 3]));
            $mol_assert_equal([...out], [1, 2, 3]);
        },
        'quat_normalize gives unit length'() {
            const out = $bog_gamengine_vec_quat_normalize(new Float32Array(4), new Float32Array([0, 3, 0, 4]));
            $mol_assert_ok(Math.abs(out[1] - 0.6) < 1e-6);
            $mol_assert_ok(Math.abs(out[3] - 0.8) < 1e-6);
        },
        'quat_from_euler to_mat4 matches mat4 translation rotation ZYX scaling for random angles'() {
            for (let trial = 0; trial < 20; ++trial) {
                const x = (Math.random() - 0.5) * 6;
                const y = (Math.random() - 0.5) * 6;
                const z = (Math.random() - 0.5) * 6;
                const pos = new Float32Array([1, 2, 3]);
                const scale = new Float32Array([1, 2, 0.5]);
                const q = $bog_gamengine_vec_quat_from_euler(new Float32Array(4), x, y, z);
                const out = $bog_gamengine_vec_quat_to_mat4(new Float32Array(16), q, pos, scale);
                const ref = $mol_3d_mat4.multiply($mol_3d_mat4.translation(pos), $mol_3d_mat4.rotation([0, 0, 1], z), $mol_3d_mat4.rotation([0, 1, 0], y), $mol_3d_mat4.rotation([1, 0, 0], x), $mol_3d_mat4.scaling(scale));
                for (let i = 0; i < 16; ++i)
                    $mol_assert_ok(Math.abs(out[i] - ref[i]) < 1e-5);
            }
        },
        'quat_to_euler inverts from_euler'() {
            const q = $bog_gamengine_vec_quat_from_euler(new Float32Array(4), 0.3, -0.5, 1.2);
            const out = $bog_gamengine_vec_quat_to_euler(new Float32Array(3), q);
            $mol_assert_ok(Math.abs(out[0] - 0.3) < 1e-6);
            $mol_assert_ok(Math.abs(out[1] + 0.5) < 1e-6);
            $mol_assert_ok(Math.abs(out[2] - 1.2) < 1e-6);
        },
        'mat4_basis normalizes the three columns, which scale makes visible'() {
            const m = new Float32Array([
                2, 0, 0, 0,
                0, 0, 3, 0,
                0, -4, 0, 0,
                7, 8, 9, 1,
            ]);
            const out = $bog_gamengine_vec_mat4_basis(new Float32Array(16), m, 4);
            $mol_assert_equal([out[0], out[1], out[2]], [1, 0, 0]);
            $mol_assert_equal([out[4], out[5], out[6]], [0, 0, 1]);
            $mol_assert_equal([out[8], out[9], out[10]], [0, -1, 0]);
        },
        'mat4_basis with stride three packs columns tight and clobbers nothing'() {
            const m = new Float32Array([
                2, 0, 0, 0,
                0, 0, 3, 0,
                0, -4, 0, 0,
                7, 8, 9, 1,
            ]);
            const out = $bog_gamengine_vec_mat4_basis(new Float32Array(9).fill(5), m, 3);
            $mol_assert_equal([...out], [1, 0, 0, 0, 0, 1, 0, -1, 0]);
        },
        'mat4_basis leaves the translation of the matrix alone'() {
            const m = new Float32Array(16);
            m[0] = 1;
            m[5] = 1;
            m[10] = 1;
            m[12] = 7;
            m[13] = 8;
            m[14] = 9;
            m[15] = 1;
            const out = $bog_gamengine_vec_mat4_basis(new Float32Array(16), m, 4);
            $mol_assert_equal([out[12], out[13], out[14], out[15]], [0, 0, 0, 0]);
            $mol_assert_equal([m[12], m[13], m[14]], [7, 8, 9]);
        },
        'mat4_basis of a zero column gives zero instead of dividing by it'() {
            const out = $bog_gamengine_vec_mat4_basis(new Float32Array(9), new Float32Array(16), 3);
            $mol_assert_equal([...out], [0, 0, 0, 0, 0, 0, 0, 0, 0]);
        },
        'quat_integrate one second at half pi around Y turns x to minus z'() {
            const q = $bog_gamengine_vec_quat_identity(new Float32Array(4));
            const ang = new Float32Array([0, Math.PI / 2, 0]);
            for (let i = 0; i < 60; ++i)
                $bog_gamengine_vec_quat_integrate(q, q, ang, 1 / 60);
            const out = $bog_gamengine_vec_quat_rotate(new Float32Array(3), q, new Float32Array([1, 0, 0]));
            $mol_assert_ok(Math.abs(out[0]) < 1e-3);
            $mol_assert_ok(Math.abs(out[2] + 1) < 1e-3);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function box(world, mass, x, y, z) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), mass, new Float32Array([x, y, z])));
    }
    $mol_test({
        'add two bodies gives indices 0 and 1 and count 2'() {
            const world = new $bog_gamengine_phys3;
            $mol_assert_equal(box(world, 1, 0, 0, 0), 0);
            $mol_assert_equal(box(world, 1, 0, 0, 0), 1);
            $mol_assert_equal(world.count, 2);
        },
        'remove first moves second into its place and returns 1'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 1, 1, 1);
            box(world, 2, 5, 6, 7);
            $mol_assert_equal(world.remove(world.handle_of(0)), true);
            $mol_assert_equal(world.count, 1);
            $mol_assert_equal([...world.pos.subarray(0, 3)], [5, 6, 7]);
            $mol_assert_equal(world.mass[0], 2);
            $mol_assert_equal([...world.trans.subarray(12, 15)], [5, 6, 7]);
        },
        'handle of a neighbour survives removal of the body between them'() {
            const world = new $bog_gamengine_phys3;
            const a = world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array([1, 0, 0]));
            const b = world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array([2, 0, 0]));
            const c = world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array([3, 0, 0]));
            $mol_assert_equal(world.remove(b), true);
            $mol_assert_equal(world.count, 2);
            $mol_assert_equal(world.index_of(b), -1);
            $mol_assert_equal(world.pos_of(a)[0], 1);
            $mol_assert_equal(world.pos_of(c)[0], 3);
            $mol_assert_equal(world.handle_of(world.index_of(c)), c);
        },
        'removed handle is not answered twice'() {
            const world = new $bog_gamengine_phys3;
            const a = world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array(3));
            $mol_assert_equal(world.remove(a), true);
            $mol_assert_equal(world.remove(a), false);
            $mol_assert_equal(world.pos_of(a), null);
        },
        'move updates bounds and trans within the same step'() {
            const world = new $bog_gamengine_phys3;
            const a = world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 0, new Float32Array(3));
            world.move(a, new Float32Array([5, 0, 0]));
            const i = world.index_of(a);
            $mol_assert_equal([...world.aabb.subarray(i * 6, i * 6 + 6)], [4.5, -0.5, -0.5, 5.5, 0.5, 0.5]);
            $mol_assert_equal([...world.trans.subarray(i * 16 + 12, i * 16 + 15)], [5, 0, 0]);
        },
        'kinematic body carries a box along and does not fall'() {
            const world = new $bog_gamengine_phys3;
            const plate = world.add($bog_gamengine_phys3.shape_box, new Float32Array([2, 0.25, 2]), 0, new Float32Array(3));
            world.kinematic_of(plate, true);
            const cargo = box(world, 1, 0, 0.76, 0);
            world.vel[world.index_of(plate) * 3] = 1;
            for (let k = 0; k < 60; ++k)
                world.step(1 / 60);
            const at = world.pos_of(plate);
            $mol_assert_ok(Math.abs(at[0] - 1) < 0.05);
            $mol_assert_equal(at[1], 0);
            $mol_assert_ok(world.pos[cargo * 3] > 0.5);
        },
        'body with mass falls about 4.9 in one second'() {
            const world = new $bog_gamengine_phys3;
            const i = box(world, 1, 0, 0, 0);
            for (let k = 0; k < 60; ++k)
                world.step(1 / 60);
            $mol_assert_ok(Math.abs(world.pos[i * 3 + 1] + 4.9) < 0.2);
        },
        'body without mass stays still under gravity'() {
            const world = new $bog_gamengine_phys3;
            const i = box(world, 0, 1, 2, 3);
            for (let k = 0; k < 60; ++k)
                world.step(1 / 60);
            $mol_assert_equal([...world.pos.subarray(i * 3, i * 3 + 3)], [1, 2, 3]);
            $mol_assert_equal(world.inv_mass[i], 0);
        },
        'trans of body at (1,2,3) keeps translation in 12 to 14'() {
            const world = new $bog_gamengine_phys3;
            const i = box(world, 1, 1, 2, 3);
            $mol_assert_equal([...world.trans.subarray(i * 16 + 12, i * 16 + 15)], [1, 2, 3]);
        },
        'trans scales unit box to full size'() {
            const world = new $bog_gamengine_phys3;
            const i = world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([1, 2, 3]), 1, new Float32Array(3)));
            $mol_assert_equal(world.trans[i * 16], 2);
            $mol_assert_equal(world.trans[i * 16 + 5], 4);
            $mol_assert_equal(world.trans[i * 16 + 10], 6);
        },
        'angular velocity turns body a quarter around Y in one second'() {
            const world = new $bog_gamengine_phys3;
            const i = box(world, 1, 0, 0, 0);
            world.gravity(new Float32Array(3));
            world.ang[i * 3 + 1] = Math.PI / 2;
            for (let k = 0; k < 60; ++k)
                world.step(1 / 60);
            const out = $bog_gamengine_vec_quat_rotate(new Float32Array(3), world.rot.subarray(i * 4, i * 4 + 4), new Float32Array([1, 0, 0]));
            $mol_assert_ok(Math.abs(out[2] + 1) < 1e-3);
        },
        'sleeping body is skipped'() {
            const world = new $bog_gamengine_phys3;
            const i = box(world, 1, 0, 0, 0);
            world.flags[i] |= $bog_gamengine_phys3.flag_sleep;
            world.step(1);
            $mol_assert_equal(world.pos[i * 3 + 1], 0);
        },
        'growing cap keeps data'() {
            const world = new $bog_gamengine_phys3;
            for (let k = 0; k < 20; ++k)
                box(world, k + 1, k, 0, 0);
            $mol_assert_equal(world.cap, 32);
            $mol_assert_equal(world.pos[3 * 3], 3);
            $mol_assert_equal(world.mass[17], 18);
            $mol_assert_equal(world.rot[17 * 4 + 3], 1);
            $mol_assert_equal(world.trans[17 * 16 + 12], 17);
        },
        'sphere and box inverse inertia follow standard formulas'() {
            const world = new $bog_gamengine_phys3;
            const s = world.index_of(world.add($bog_gamengine_phys3.shape_sphere, new Float32Array([2, 0, 0]), 5, new Float32Array(3)));
            $mol_assert_ok(Math.abs(world.inv_inertia[s * 3] - 1 / (0.4 * 5 * 4)) < 1e-6);
            const b = world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([1, 2, 3]), 3, new Float32Array(3)));
            $mol_assert_ok(Math.abs(world.inv_inertia[b * 3] - 1 / (3 / 12 * (16 + 36))) < 1e-6);
        },
        'hull_points stores points with offset and count per body'() {
            const world = new $bog_gamengine_phys3;
            const a = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array(3), 1, new Float32Array(3)));
            const b = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array(3), 1, new Float32Array(3)));
            world.hull_points(a, new Float32Array([0, 0, 0, 1, 0, 0]));
            world.hull_points(b, new Float32Array([0, 1, 0, 0, 0, 1, 1, 1, 1]));
            $mol_assert_equal(world.hull_off[b], 6);
            $mol_assert_equal(world.hull_count[b], 3);
            $mol_assert_equal([...world.hull.subarray(6, 9)], [0, 1, 0]);
        },
        'hull of four tetrahedron points gives aabb by these points'() {
            const world = new $bog_gamengine_phys3;
            const a = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array(3), 1, new Float32Array(3)));
            const b = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array(3), 1, new Float32Array([10, 20, 30])));
            world.hull_points(a, new Float32Array([5, 5, 5, 6, 6, 6]));
            world.hull_points(b, new Float32Array([0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3]));
            $mol_assert_equal([...world.aabb.subarray(b * 6, b * 6 + 6)], [10, 20, 30, 11, 22, 33]);
        },
        'step of 0.1 equals six steps of 1/60 for a box over the floor'() {
            const one = new $bog_gamengine_phys3;
            const six = new $bog_gamengine_phys3;
            for (const world of [one, six]) {
                world.max_steps = 6;
                world.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3));
                box(world, 1, 0, 0.6, 0);
            }
            one.step(0.1);
            for (let k = 0; k < 6; ++k)
                six.step(1 / 60);
            $mol_assert_equal(one.steps_done, 6);
            for (let n = 0; n < 6; ++n)
                $mol_assert_ok(Math.abs(one.pos[n] - six.pos[n]) < 1e-6);
            for (let n = 0; n < 6; ++n)
                $mol_assert_ok(Math.abs(one.vel[n] - six.vel[n]) < 1e-6);
        },
        'step of 1 makes at most four substeps and keeps the debt for the next running step'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            world.step(1);
            $mol_assert_equal(world.steps_done, 4);
            world.step(0);
            $mol_assert_equal(world.steps_done, 0);
            world.step(1 / 60);
            $mol_assert_equal(world.steps_done, 2);
        },
        'step of 0 moves nothing even right after a frame that spent all substeps'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array([0, -10, 0]));
            const body = box(world, 1, 0, 5, 0);
            world.step(1);
            const was = world.pos[body * 3 + 1];
            world.step(0);
            $mol_assert_equal(world.pos[body * 3 + 1], was);
        },
        'step_ms is zero before the first step and a time after it'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            $mol_assert_equal(world.step_ms(), 0);
            world.step(1 / 60);
            $mol_assert_equal(world.samples, 1);
            $mol_assert_ok(world.step_ms() >= 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'box array lengths'($) {
            const box = $bog_gamengine_shape_box.make({ $ });
            $mol_assert_equal(box.geometry().length, 102);
            $mol_assert_equal(box.skin().length, 68);
            $mol_assert_equal(box.normals().length, 102);
            $mol_assert_equal(box.size(), 34);
            $mol_assert_equal(box.count(), 24);
            $mol_assert_equal(box.mode(), 'strip');
        },
        'box has six different unit normals'($) {
            const normals = $bog_gamengine_shape_box.make({ $ }).normals();
            const seen = new Set();
            for (let i = 0; i < 34; ++i) {
                const x = normals[i * 3];
                const y = normals[i * 3 + 1];
                const z = normals[i * 3 + 2];
                $mol_assert_equal(x * x + y * y + z * z, 1);
                seen.add(`${x} ${y} ${z}`);
            }
            $mol_assert_equal(seen.size, 6);
        },
        'box faces are counter clockwise from outside'($) {
            const box = $bog_gamengine_shape_box.make({ $ });
            const geometry = box.geometry();
            const normals = box.normals();
            const winding = (a, b, c) => {
                const ax = geometry[b * 3] - geometry[a * 3];
                const ay = geometry[b * 3 + 1] - geometry[a * 3 + 1];
                const az = geometry[b * 3 + 2] - geometry[a * 3 + 2];
                const bx = geometry[c * 3] - geometry[a * 3];
                const by = geometry[c * 3 + 1] - geometry[a * 3 + 1];
                const bz = geometry[c * 3 + 2] - geometry[a * 3 + 2];
                const cx = ay * bz - az * by;
                const cy = az * bx - ax * bz;
                const cz = ax * by - ay * bx;
                return cx * normals[a * 3] + cy * normals[a * 3 + 1] + cz * normals[a * 3 + 2];
            };
            for (let face = 0; face < 6; ++face) {
                const v = face * 6;
                $mol_assert_ok(winding(v, v + 1, v + 2) > 0);
                $mol_assert_ok(winding(v + 2, v + 1, v + 3) > 0);
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_atlas_mock extends $bog_gamengine_atlas {
        sizes = {};
        image(uri) {
            const [width, height] = this.sizes[uri] ?? [64, 64];
            return { data: () => ({ width, height }) };
        }
    }
    class $bog_gamengine_atlas_wait_mock extends $bog_gamengine_atlas {
        image(uri) {
            return { data: () => $mol_fail_hidden(new Promise(() => { })) };
        }
    }
    class $bog_gamengine_atlas_blank_mock extends $bog_gamengine_atlas {
        image(uri) {
            return { data: () => ({ width: 512, height: 512, data: new Uint8ClampedArray(4) }) };
        }
    }
    function atlas_mock(uris, sizes = {}) {
        const atlas = new $bog_gamengine_atlas_mock;
        atlas.uris(uris);
        atlas.sizes = sizes;
        return atlas;
    }
    $mol_test({
        'layer index equals position of file in uris'() {
            const atlas = atlas_mock(['bog/gamengine/demo/atlas/coin.png', 'bog/gamengine/demo/atlas/hero.png']);
            $mol_assert_equal(atlas.layer('hero'), 1);
        },
        'image 64×32 in atlas 64 fails with file path'() {
            const uri = 'bog/gamengine/demo/atlas/hero.png';
            const atlas = atlas_mock([uri], { [uri]: [64, 32] });
            const error = $mol_assert_fail(() => atlas.images(), Error);
            $mol_assert_equal(error.message.includes(uri), true);
            $mol_assert_equal(error.message.includes('64×32'), true);
        },
        'unknown layer name fails'() {
            const atlas = atlas_mock(['bog/gamengine/demo/atlas/hero.png']);
            const error = $mol_assert_fail(() => atlas.layer('coin'), Error);
            $mol_assert_equal(error.message.includes('coin'), true);
            $mol_assert_equal(error.message.includes('hero'), true);
        },
        'two files with same name fail'() {
            const atlas = atlas_mock(['bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/tiles/hero.png']);
            const error = $mol_assert_fail(() => atlas.layer('hero'), Error);
            $mol_assert_equal(error.message.includes('atlas/hero.png'), true);
            $mol_assert_equal(error.message.includes('tiles/hero.png'), true);
        },
        'two atlases share one image per uri'($) {
            const uri = 'bog/gamengine/demo/atlas/hero.png';
            const left = new $bog_gamengine_atlas;
            const right = new $bog_gamengine_atlas;
            left.$ = $;
            right.$ = $;
            $mol_assert_equal(left.image(uri), right.image(uri));
            $mol_assert_equal(left.image(uri).uri(), uri);
        },
        'source layers follow layers of uris'() {
            const atlas = atlas_mock(['bog/gamengine/demo/atlas/hero.png']);
            atlas.sources([{ name: 'A', image: { width: 64, height: 64 } }]);
            $mol_assert_equal(atlas.layer('A'), 1);
            $mol_assert_equal(atlas.images().length, 2);
        },
        'ready is true when all images match size'() {
            const atlas = atlas_mock(['bog/gamengine/demo/atlas/hero.png']);
            $mol_assert_equal(atlas.ready(), true);
        },
        'ready is false while the image is still loading'() {
            const atlas = new $bog_gamengine_atlas_wait_mock;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            $mol_assert_equal(atlas.ready(), false);
        },
        'atlas keeps colors by default and takes data atlas apart'() {
            const albedo = atlas_mock(['bog/gamengine/demo/atlas/wall.png']);
            const maps = atlas_mock(['bog/gamengine/demo/atlas/wall_normal.png']);
            maps.kind('data');
            albedo.data(maps);
            $mol_assert_equal(albedo.kind(), 'color');
            $mol_assert_equal(maps.kind(), 'data');
            $mol_assert_equal(albedo.data(), maps);
            $mol_assert_equal(maps.data(), null);
        },
        'placeholder image gives no size error and keeps atlas not ready'() {
            const atlas = new $bog_gamengine_atlas_blank_mock;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            $mol_assert_equal(atlas.images().length, 1);
            $mol_assert_equal(atlas.ready(), false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_mesh_test_atlas extends $bog_gamengine_atlas {
        image(uri) {
            return { data: () => ({ width: 64, height: 64 }) };
        }
    }
    class $bog_gamengine_mesh_test_shape_loading extends $bog_gamengine_shape {
        geometry() {
            return $mol_fail(new Promise(() => { }));
        }
    }
    class $bog_gamengine_mesh_test_cam extends $bog_gamengine_cam {
        proj(aspect) {
            return $mol_3d_mat4.perspective(Math.PI / 3, aspect, 0.1, 100);
        }
    }
    function mesh_test_atlas(uris) {
        const atlas = new $bog_gamengine_mesh_test_atlas;
        atlas.uris(uris);
        return atlas;
    }
    function mesh_test_mesh(atlas, frame) {
        const mesh = new $bog_gamengine_mesh;
        mesh.atlas(atlas);
        mesh.frame(frame);
        return mesh;
    }
    $mol_test({
        'layer is taken from atlas by frame name'() {
            const atlas = mesh_test_atlas(['bog/gamengine/demo/atlas/wall.png', 'bog/gamengine/demo/atlas/floor.png']);
            $mol_assert_equal(mesh_test_mesh(atlas, 'floor').layer(), 1);
        },
        'layer without atlas is 0'() {
            $mol_assert_equal(mesh_test_mesh(null, 'floor').layer(), 0);
        },
        'uv is whole layer'() {
            $mol_assert_equal([...new $bog_gamengine_mesh().uv()], [0, 0, 1, 1]);
        },
        'size scales trans in three axes'() {
            const mesh = new $bog_gamengine_mesh;
            mesh.size(new Float32Array([2, 3, 4]));
            const trans = mesh.trans();
            $mol_assert_equal(trans[0], 2);
            $mol_assert_equal(trans[5], 3);
            $mol_assert_equal(trans[10], 4);
        },
        'default shape is box'() {
            $mol_assert_ok(new $bog_gamengine_mesh().shape() instanceof $bog_gamengine_shape_box);
        },
        'two meshes of different atlases give two batches'() {
            const first = mesh_test_atlas(['bog/gamengine/demo/atlas/wall.png']);
            const second = mesh_test_atlas(['bog/gamengine/demo/atlas/floor.png']);
            const shader = new $bog_gamengine_shader_solid;
            const parts = $bog_gamengine_batch_group([mesh_test_mesh(first, 'wall'), mesh_test_mesh(second, 'floor')], () => shader, node => node.shape());
            $mol_assert_equal(parts.length, 2);
            $mol_assert_equal(parts[0].atlas, first);
            $mol_assert_equal(parts[1].atlas, second);
        },
        'filled batch has layer and tint of mesh'() {
            const atlas = mesh_test_atlas(['bog/gamengine/demo/atlas/wall.png', 'bog/gamengine/demo/atlas/floor.png']);
            const mesh = mesh_test_mesh(atlas, 'floor');
            mesh.tint(new Float32Array([1, 0.5, 0.25, 1]));
            const batch = new $bog_gamengine_batch;
            batch.nodes([mesh]);
            batch.fill();
            $mol_assert_equal(batch.layer[0], 1);
            $mol_assert_equal([...batch.tint.subarray(0, 4)], [1, 0.5, 0.25, 1]);
        },
        'lods are empty by default and can be set'() {
            const mesh = new $bog_gamengine_mesh;
            $mol_assert_equal(mesh.lods().length, 0);
            const low = new $bog_gamengine_shape_quad;
            mesh.lods([{ dist: 6, shape: low }]);
            $mol_assert_equal(mesh.lods()[0].shape, low);
        },
        'radius of a loading shape is infinite and batch fill with frustum keeps the mesh'() {
            const mesh = new $bog_gamengine_mesh;
            mesh.shape(new $bog_gamengine_mesh_test_shape_loading);
            mesh.pos(new Float32Array([0, 0, 5]));
            $mol_assert_equal(mesh.radius(), Infinity);
            const batch = new $bog_gamengine_batch;
            batch.nodes([mesh]);
            const cam = new $bog_gamengine_mesh_test_cam;
            $mol_assert_equal(batch.fill(cam.frustum(1, new Float32Array(24))), 1);
        },
        'radius of box mesh is half diagonal of unit cube'() {
            $mol_assert_ok(Math.abs(new $bog_gamengine_mesh().radius() - Math.sqrt(3) / 2) < 1e-6);
        },
        'normal frame takes its layer from the data atlas, not from the albedo one'() {
            const albedo = new $bog_gamengine_atlas;
            albedo.uris(['bog/gamengine/demo/atlas/wall.png', 'bog/gamengine/demo/atlas/floor.png']);
            const maps = new $bog_gamengine_atlas;
            maps.kind('data');
            maps.uris(['bog/gamengine/demo/atlas/floor.png', 'bog/gamengine/demo/atlas/wall.png']);
            albedo.data(maps);
            const mesh = new $bog_gamengine_mesh;
            mesh.atlas(albedo);
            mesh.frame('wall');
            mesh.normal_frame('wall');
            $mol_assert_equal(mesh.layer(), 0);
            $mol_assert_equal(mesh.normal_layer(), 1);
        },
        'mesh without data atlas has no normal layer'() {
            const albedo = new $bog_gamengine_atlas;
            albedo.uris(['bog/gamengine/demo/atlas/wall.png']);
            const mesh = new $bog_gamengine_mesh;
            mesh.atlas(albedo);
            mesh.normal_frame('wall');
            $mol_assert_equal(mesh.normal_layer(), -1);
        },
        'set through props changes size'() {
            const mesh = new $bog_gamengine_mesh;
            mesh.props().find(prop => prop.name === 'size').set(new Float32Array([2, 3, 4]));
            $mol_assert_equal([...mesh.size()], [2, 3, 4]);
        },
        'sphere of the culler holds every corner of the box in every state'() {
            for (const over of $bog_gamengine_node_reach_states) {
                const node = new $bog_gamengine_mesh;
                if (over.size)
                    node.size(new Float32Array(over.size.slice(0, 3)));
                if (over.scale)
                    node.scale(new Float32Array(over.scale));
                if (over.rot)
                    node.rot(new Float32Array(over.rot));
                const sphere = node.radius() * $bog_gamengine_batch_scale_max(node.world());
                $mol_assert_ok(sphere + 1e-6 >= $bog_gamengine_node_reach(node));
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_batch_test_tinted extends $bog_gamengine_node {
        tint() {
            return new Float32Array([1, 0, 0, 0.5]);
        }
    }
    class $bog_gamengine_batch_test_layered extends $bog_gamengine_node {
        layer() {
            return 3;
        }
        uv() {
            return new Float32Array([1, 0, -1, 1]);
        }
    }
    function $bog_gamengine_batch_test_node(x, y, z) {
        const node = new $bog_gamengine_node;
        node.pos(new Float32Array([x, y, z]));
        return node;
    }
    function $bog_gamengine_batch_test_mesh(x, y, z) {
        const mesh = new $bog_gamengine_mesh;
        mesh.pos(new Float32Array([x, y, z]));
        return mesh;
    }
    class $bog_gamengine_batch_test_cam extends $bog_gamengine_cam {
        proj(aspect) {
            return $mol_3d_mat4.perspective(Math.PI / 3, aspect, 0.1, 100);
        }
    }
    function $bog_gamengine_batch_test_frustum() {
        return new $bog_gamengine_batch_test_cam().frustum(1, new Float32Array(24));
    }
    $mol_test({
        'mesh behind frustum is not counted, mesh in front is'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([
                $bog_gamengine_batch_test_mesh(0, 0, 5),
                $bog_gamengine_batch_test_mesh(0, 0, -5),
            ]);
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 1);
            $mol_assert_equal(batch.count, 1);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [0, 0, -5]);
        },
        'scaled mesh near frustum edge is kept by its grown radius'() {
            const mesh = $bog_gamengine_batch_test_mesh(4, 0, -5);
            mesh.scale(new Float32Array([4, 4, 4]));
            const batch = new $bog_gamengine_batch;
            batch.nodes([mesh]);
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 1);
            mesh.scale(new Float32Array([1, 1, 1]));
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 0);
        },
        'cull off keeps mesh behind frustum'() {
            const batch = new $bog_gamengine_batch;
            batch.cull(false);
            batch.nodes([$bog_gamengine_batch_test_mesh(0, 0, 5)]);
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 1);
        },
        'without frustum nothing is culled'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([$bog_gamengine_batch_test_mesh(0, 0, 5)]);
            $mol_assert_equal(batch.fill(), 1);
        },
        'source with aabb is compacted to instances inside frustum'() {
            const trans = new Float32Array(48);
            trans.set([1, 0, 5], 12);
            trans.set([2, 0, -5], 28);
            trans.set([3, 0, -8], 44);
            const aabb = new Float32Array([
                0, -1, 4, 2, 1, 6,
                1, -1, -6, 3, 1, -4,
                2, -1, -9, 4, 1, -7,
            ]);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 3, aabb });
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 2);
            $mol_assert_equal(batch.count, 2);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [2, 0, -5]);
            $mol_assert_equal([...batch.trans.subarray(28, 31)], [3, 0, -8]);
        },
        'source skip is applied before aabb culling'() {
            const trans = new Float32Array(32);
            trans.set([1, 0, -5], 12);
            trans.set([2, 0, -5], 28);
            const aabb = new Float32Array([0, -1, -6, 2, 1, -4, 1, -1, -6, 3, 1, -4]);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 2, aabb });
            batch.skip(1);
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 1);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [2, 0, -5]);
        },
        'near and far keep only nodes within distance to eye'() {
            const batch = new $bog_gamengine_batch;
            batch.near(2);
            batch.far(10);
            batch.nodes([
                $bog_gamengine_batch_test_node(0, 0, -1),
                $bog_gamengine_batch_test_node(0, 0, -5),
                $bog_gamengine_batch_test_node(0, 0, -20),
            ]);
            $mol_assert_equal(batch.fill(null, new Float32Array(3)), 1);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [0, 0, -5]);
        },
        'far is exclusive so two batches split nodes without overlap'() {
            const nodes = [
                $bog_gamengine_batch_test_node(0, 0, -3),
                $bog_gamengine_batch_test_node(0, 0, -6),
                $bog_gamengine_batch_test_node(0, 0, -9),
            ];
            const close = new $bog_gamengine_batch;
            close.far(6);
            close.nodes(nodes);
            const distant = new $bog_gamengine_batch;
            distant.near(6);
            distant.nodes(nodes);
            const eye = new Float32Array(3);
            $mol_assert_equal(close.fill(null, eye), 1);
            $mol_assert_equal(distant.fill(null, eye), 2);
        },
        'without eye near and far are ignored'() {
            const batch = new $bog_gamengine_batch;
            batch.near(2);
            batch.nodes([$bog_gamengine_batch_test_node(0, 0, -1)]);
            $mol_assert_equal(batch.fill(), 1);
        },
        'two nodes give count 2 and translations at offsets 12 and 28'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([
                $bog_gamengine_batch_test_node(1, 2, 3),
                $bog_gamengine_batch_test_node(4, 5, 6),
            ]);
            $mol_assert_equal(batch.fill(), 2);
            $mol_assert_equal(batch.count, 2);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [1, 2, 3]);
            $mol_assert_equal([...batch.trans.subarray(28, 31)], [4, 5, 6]);
        },
        'third node keeps buffers when cap suffices'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([
                $bog_gamengine_batch_test_node(1, 2, 3),
                $bog_gamengine_batch_test_node(4, 5, 6),
            ]);
            batch.fill();
            $mol_assert_ok(batch.cap >= 3);
            const trans = batch.trans;
            const tint = batch.tint;
            batch.nodes([
                $bog_gamengine_batch_test_node(1, 2, 3),
                $bog_gamengine_batch_test_node(4, 5, 6),
                $bog_gamengine_batch_test_node(7, 8, 9),
            ]);
            $mol_assert_equal(batch.fill(), 3);
            $mol_assert_equal(batch.trans, trans);
            $mol_assert_equal(batch.tint, tint);
            $mol_assert_equal([...batch.trans.subarray(44, 47)], [7, 8, 9]);
        },
        'grow doubles cap until it covers need'() {
            const batch = new $bog_gamengine_batch;
            batch.grow(1);
            $mol_assert_equal(batch.cap, 16);
            batch.grow(40);
            $mol_assert_equal(batch.cap, 64);
            $mol_assert_equal(batch.trans.length, 64 * 16);
            $mol_assert_equal(batch.tint.length, 64 * 4);
        },
        'tint defaults to opaque white'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([$bog_gamengine_batch_test_node(0, 0, 0)]);
            batch.fill();
            $mol_assert_equal([...batch.tint.subarray(0, 4)], [1, 1, 1, 1]);
        },
        'node with tint writes its color'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([
                $bog_gamengine_batch_test_node(0, 0, 0),
                new $bog_gamengine_batch_test_tinted,
            ]);
            batch.fill();
            $mol_assert_equal([...batch.tint.subarray(4, 8)], [1, 0, 0, 0.5]);
        },
        'node with layer and uv writes them, plain node gets 0 and whole uv'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([
                $bog_gamengine_batch_test_node(0, 0, 0),
                new $bog_gamengine_batch_test_layered,
            ]);
            batch.fill();
            $mol_assert_equal([...batch.layer.subarray(0, 2)], [0, 3]);
            $mol_assert_equal([...batch.uv.subarray(0, 8)], [0, 0, 1, 1, 1, 0, -1, 1]);
        },
        'material buffer is filled from mesh material, plain node gets default'() {
            const mesh = new $bog_gamengine_mesh;
            mesh.material(new Float32Array([0.75, 0.25, 0.5, 0]));
            const batch = new $bog_gamengine_batch;
            batch.nodes([$bog_gamengine_batch_test_node(0, 0, 0), mesh]);
            batch.fill();
            $mol_assert_equal(batch.material.subarray(0, 8), new Float32Array([0, 0.6, 0, 0, 0.75, 0.25, 0.5, 0]));
        },
        'normal layer is -1 without normal frame'() {
            const batch = new $bog_gamengine_batch;
            batch.nodes([$bog_gamengine_batch_test_node(0, 0, 0), new $bog_gamengine_mesh]);
            batch.fill();
            $mol_assert_equal([...batch.normal_layer.subarray(0, 2)], [-1, -1]);
        },
        'source fill gives default material'() {
            const batch = new $bog_gamengine_batch;
            batch.source({ trans: new Float32Array(16), count: 1 });
            batch.fill();
            $mol_assert_equal(batch.material.subarray(0, 4), new Float32Array([0, 0.6, 0, 0]));
            $mol_assert_equal(batch.normal_layer[0], -1);
        },
        'version grows on every fill'() {
            const batch = new $bog_gamengine_batch;
            const before = batch.version;
            batch.fill();
            batch.fill();
            $mol_assert_equal(batch.version, before + 2);
        },
        'source with two matrices gives count 2 and same translations'() {
            const trans = new Float32Array(32);
            trans.set([1, 2, 3], 12);
            trans.set([4, 5, 6], 28);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 2 });
            $mol_assert_equal(batch.fill(), 2);
            $mol_assert_equal(batch.count, 2);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [1, 2, 3]);
            $mol_assert_equal([...batch.trans.subarray(28, 31)], [4, 5, 6]);
            $mol_assert_equal([...batch.tint.subarray(4, 8)], [1, 1, 1, 1]);
            $mol_assert_equal([...batch.uv.subarray(4, 8)], [0, 0, 1, 1]);
        },
        'source tint, layer and uv are copied per instance'() {
            const trans = new Float32Array(32);
            const tint = new Float32Array([1, 1, 1, 1, 1, 0, 0, 0.5]);
            const layer = new Float32Array([2, 3]);
            const uv = new Float32Array([0, 0, 1, 1, 1, 0, -1, 1]);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 2, tint, layer, uv });
            $mol_assert_equal(batch.fill(), 2);
            $mol_assert_equal([...batch.tint.subarray(4, 8)], [1, 0, 0, 0.5]);
            $mol_assert_equal([...batch.layer.subarray(0, 2)], [2, 3]);
            $mol_assert_equal([...batch.uv.subarray(4, 8)], [1, 0, -1, 1]);
        },
        'source tint and layer are compacted with trans under frustum'() {
            const trans = new Float32Array(32);
            trans.set([1, 0, 5], 12);
            trans.set([2, 0, -5], 28);
            const aabb = new Float32Array([0, -1, 4, 2, 1, 6, 1, -1, -6, 3, 1, -4]);
            const tint = new Float32Array([1, 1, 1, 1, 0, 1, 0, 1]);
            const layer = new Float32Array([1, 2]);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 2, aabb, tint, layer });
            $mol_assert_equal(batch.fill($bog_gamengine_batch_test_frustum()), 1);
            $mol_assert_equal([...batch.tint.subarray(0, 4)], [0, 1, 0, 1]);
            $mol_assert_equal(batch.layer[0], 2);
        },
        'source with skip 1 drops the first matrix'() {
            const trans = new Float32Array(32);
            trans.set([1, 2, 3], 12);
            trans.set([4, 5, 6], 28);
            const batch = new $bog_gamengine_batch;
            batch.source({ trans, count: 2 });
            batch.skip(1);
            $mol_assert_equal(batch.fill(), 1);
            $mol_assert_equal(batch.count, 1);
            $mol_assert_equal([...batch.trans.subarray(12, 15)], [4, 5, 6]);
        },
        'instances draw without nodes at the world origin'() {
            const batch = new $bog_gamengine_batch;
            batch.instances(1);
            $mol_assert_equal(batch.fill(), 1);
            $mol_assert_equal([...batch.trans.subarray(0, 16)], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            $mol_assert_equal([...batch.tint.subarray(0, 4)], [1, 1, 1, 1]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'plane array lengths'($) {
            const plane = $bog_gamengine_shape_plane.make({ $ });
            $mol_assert_equal(plane.geometry().length, 12);
            $mol_assert_equal(plane.skin().length, 8);
            $mol_assert_equal(plane.normals().length, 12);
            $mol_assert_equal(plane.count(), 4);
        },
        'plane normals point up'($) {
            const normals = $bog_gamengine_shape_plane.make({ $ }).normals();
            for (let i = 0; i < 4; ++i) {
                $mol_assert_equal(normals[i * 3], 0);
                $mol_assert_equal(normals[i * 3 + 1], 1);
                $mol_assert_equal(normals[i * 3 + 2], 0);
            }
        },
        'plane strip is counter clockwise from above'($) {
            const geometry = $bog_gamengine_shape_plane.make({ $ }).geometry();
            const cross_y = (a, b, c) => {
                const ax = geometry[b * 3] - geometry[a * 3];
                const az = geometry[b * 3 + 2] - geometry[a * 3 + 2];
                const bx = geometry[c * 3] - geometry[a * 3];
                const bz = geometry[c * 3 + 2] - geometry[a * 3 + 2];
                return az * bx - ax * bz;
            };
            $mol_assert_ok(cross_y(0, 1, 2) > 0);
            $mol_assert_ok(cross_y(2, 1, 3) > 0);
        },
        'plane skin stretches by tile'($) {
            const plane = $bog_gamengine_shape_plane.make({ $ });
            $mol_assert_equal(Math.max(...plane.skin()), 1);
            plane.tile([4, 4]);
            $mol_assert_equal(Math.max(...plane.skin()), 4);
        },
        'plane skin tiles each axis on its own'($) {
            const plane = $bog_gamengine_shape_plane.make({ $ });
            plane.tile([4, 2]);
            const skin = plane.skin();
            $mol_assert_equal([skin[0], skin[1]], [0, 2]);
            $mol_assert_equal([skin[2], skin[3]], [4, 2]);
            $mol_assert_equal([skin[4], skin[5]], [0, 0]);
            $mol_assert_equal([skin[6], skin[7]], [4, 0]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function group_test_atlas(uris) {
        const atlas = new $bog_gamengine_atlas;
        atlas.uris(uris);
        return atlas;
    }
    function group_test_sprite(atlas) {
        const sprite = new $bog_gamengine_sprite;
        sprite.atlas(atlas);
        return sprite;
    }
    function group_test_mesh(atlas, shape) {
        const mesh = new $bog_gamengine_mesh;
        mesh.atlas(atlas);
        if (shape)
            mesh.shape(shape);
        return mesh;
    }
    const sprite_shader = new $bog_gamengine_shader_sprite;
    const solid_shader = new $bog_gamengine_shader_solid;
    const quad = new $bog_gamengine_shape_quad;
    function group_test_parts(nodes) {
        return $bog_gamengine_batch_group(nodes, node => node.shader?.() ?? (typeof node.normal_layer === 'function' ? solid_shader : sprite_shader), node => typeof node.shape === 'function' ? node.shape() : quad);
    }
    $mol_test({
        'two sprites of one atlas and a mesh with a box give two groups'() {
            const atlas = group_test_atlas(['bog/gamengine/demo/atlas/hero.png']);
            const first = group_test_sprite(atlas);
            const second = group_test_sprite(atlas);
            const mesh = group_test_mesh(atlas);
            const parts = group_test_parts([first, second, mesh]);
            $mol_assert_equal(parts.length, 2);
            $mol_assert_equal(parts[0].nodes, [first, second]);
            $mol_assert_equal(parts[1].nodes, [mesh]);
            $mol_assert_equal(parts[0].atlas, atlas);
            $mol_assert_equal(parts[1].atlas, atlas);
        },
        'two meshes of different shapes give two groups'() {
            const atlas = group_test_atlas(['bog/gamengine/demo/atlas/wall.png']);
            const box = group_test_mesh(atlas, new $bog_gamengine_shape_box);
            const plane = group_test_mesh(atlas, new $bog_gamengine_shape_plane);
            const parts = group_test_parts([box, plane]);
            $mol_assert_equal(parts.length, 2);
            $mol_assert_equal(parts[0].shape, box.shape());
            $mol_assert_equal(parts[1].shape, plane.shape());
        },
        'two meshes of different atlases give two groups'() {
            const first = group_test_atlas(['bog/gamengine/demo/atlas/wall.png']);
            const second = group_test_atlas(['bog/gamengine/demo/atlas/floor.png']);
            const shape = new $bog_gamengine_shape_box;
            const parts = group_test_parts([group_test_mesh(first, shape), group_test_mesh(second, shape)]);
            $mol_assert_equal(parts.length, 2);
            $mol_assert_equal(parts[0].atlas, first);
            $mol_assert_equal(parts[1].atlas, second);
        },
        'node with its own shader goes to its own group'() {
            const atlas = group_test_atlas(['bog/gamengine/demo/atlas/hero.png']);
            const plain = group_test_sprite(atlas);
            const own = group_test_sprite(atlas);
            own.shader(new $bog_gamengine_shader_flat);
            const parts = group_test_parts([plain, own]);
            $mol_assert_equal(parts.length, 2);
            $mol_assert_equal(parts[0].nodes, [plain]);
            $mol_assert_equal(parts[1].nodes, [own]);
            $mol_assert_equal(parts[1].shader, own.shader());
        },
        'group key is the same for the same triple and differs otherwise'() {
            const atlas = group_test_atlas(['bog/gamengine/demo/atlas/hero.png']);
            const shape = new $bog_gamengine_shape_box;
            const parts = group_test_parts([group_test_mesh(atlas, shape), group_test_mesh(atlas, shape)]);
            $mol_assert_equal(parts.length, 1);
            const again = group_test_parts([group_test_mesh(atlas, shape)]);
            $mol_assert_equal(parts[0].key, again[0].key);
        },
        'id of null is zero and id of an object is stable'() {
            const atlas = group_test_atlas(['bog/gamengine/demo/atlas/hero.png']);
            $mol_assert_equal($bog_gamengine_batch_group_id(null), '0');
            $mol_assert_equal($bog_gamengine_batch_group_id(atlas), $bog_gamengine_batch_group_id(atlas));
            $mol_assert_not($bog_gamengine_batch_group_id(atlas) === $bog_gamengine_batch_group_id(new $bog_gamengine_atlas));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_sprite_test_atlas extends $bog_gamengine_atlas {
        image(uri) {
            return { data: () => ({ width: 64, height: 64 }) };
        }
    }
    function sprite_test_atlas(uris) {
        const atlas = new $bog_gamengine_sprite_test_atlas;
        atlas.uris(uris);
        return atlas;
    }
    function sprite_test_sprite(atlas, frame) {
        const sprite = new $bog_gamengine_sprite;
        sprite.atlas(atlas);
        sprite.frame(frame);
        return sprite;
    }
    class $bog_gamengine_sprite_test_clock extends $bog_gamengine_clock {
        at = 0;
        time() {
            return this.at;
        }
    }
    function sprite_test_walk(at) {
        const clock = new $bog_gamengine_sprite_test_clock;
        clock.at = at;
        const sprite = sprite_test_sprite(null, 'a');
        sprite.clock(clock);
        sprite.clips({ walk: ['a', 'b', 'c', 'd'] });
        sprite.fps(4);
        sprite.clip('walk');
        return sprite;
    }
    const sprite_test_shader = new $bog_gamengine_shader_sprite;
    const sprite_test_shape = new $bog_gamengine_shape_quad;
    function sprite_test_group(sprites) {
        const parts = $bog_gamengine_batch_group(sprites, () => sprite_test_shader, () => sprite_test_shape);
        return parts.map(part => {
            const batch = new $bog_gamengine_batch;
            batch.atlas(part.atlas);
            batch.nodes(part.nodes);
            return batch;
        });
    }
    $mol_test({
        'two sprites of different atlases give two batches'() {
            const first = sprite_test_atlas(['bog/gamengine/demo/atlas/hero.png']);
            const second = sprite_test_atlas(['bog/gamengine/demo/atlas/coin.png']);
            const batches = sprite_test_group([
                sprite_test_sprite(first, 'hero'),
                sprite_test_sprite(second, 'coin'),
            ]);
            $mol_assert_equal(batches.length, 2);
            $mol_assert_equal(batches[0].atlas(), first);
            $mol_assert_equal(batches[1].atlas(), second);
        },
        'two sprites of one atlas give one batch with both nodes'() {
            const atlas = sprite_test_atlas(['bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png']);
            const hero = sprite_test_sprite(atlas, 'hero');
            const coin = sprite_test_sprite(atlas, 'coin');
            const batches = sprite_test_group([hero, coin]);
            $mol_assert_equal(batches.length, 1);
            $mol_assert_equal(batches[0].nodes(), [hero, coin]);
        },
        'layer is taken from atlas by frame name'() {
            const atlas = sprite_test_atlas(['bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png']);
            $mol_assert_equal(sprite_test_sprite(atlas, 'coin').layer(), 1);
        },
        'layer without atlas is 0'() {
            $mol_assert_equal(sprite_test_sprite(null, 'coin').layer(), 0);
        },
        'clip frame at 0.5 s with fps 4 is third'() {
            $mol_assert_equal(sprite_test_walk(0.5).frame_now(), 'c');
        },
        'clip frame at 0.26 s with fps 4 is second'() {
            $mol_assert_equal(sprite_test_walk(0.26).frame_now(), 'b');
        },
        'frame_now without clip is frame'() {
            $mol_assert_equal(sprite_test_sprite(null, 'hero').frame_now(), 'hero');
        },
        'layer follows clip frame'() {
            const atlas = sprite_test_atlas(['atlas/a.png', 'atlas/b.png', 'atlas/c.png', 'atlas/d.png']);
            const sprite = sprite_test_walk(0.26);
            sprite.atlas(atlas);
            $mol_assert_equal(sprite.layer(), 1);
        },
        'flip_x mirrors uv'() {
            const sprite = new $bog_gamengine_sprite;
            $mol_assert_equal([...sprite.uv()], [0, 0, 1, 1]);
            sprite.flip_x(true);
            $mol_assert_equal([...sprite.uv()], [1, 0, -1, 1]);
        },
        'size scales trans'() {
            const sprite = new $bog_gamengine_sprite;
            sprite.size(new Float32Array([2, 3]));
            const trans = sprite.trans();
            $mol_assert_equal(trans[0], 2);
            $mol_assert_equal(trans[5], 3);
            $mol_assert_equal(trans[10], 1);
        },
        'filled batch has layer and uv of sprite'() {
            const atlas = sprite_test_atlas(['bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png']);
            const sprite = sprite_test_sprite(atlas, 'coin');
            sprite.flip_x(true);
            const batch = sprite_test_group([sprite])[0];
            batch.fill();
            $mol_assert_equal(batch.layer[0], 1);
            $mol_assert_equal([...batch.uv.subarray(0, 4)], [1, 0, -1, 1]);
        },
        'props contain frame and flip_x'() {
            const names = new $bog_gamengine_sprite().props().map(prop => prop.name);
            $mol_assert_ok(names.includes('frame'));
            $mol_assert_ok(names.includes('flip_x'));
        },
        'set through props changes flip_x'() {
            const sprite = new $bog_gamengine_sprite;
            sprite.props().find(prop => prop.name === 'flip_x').set(true);
            $mol_assert_equal(sprite.flip_x(), true);
        },
        'sphere of the culler holds every corner of the box in every state'() {
            for (const over of $bog_gamengine_node_reach_states) {
                const node = new $bog_gamengine_sprite;
                if (over.size)
                    node.size(new Float32Array(over.size.slice(0, 2)));
                if (over.scale)
                    node.scale(new Float32Array(over.scale));
                if (over.rot)
                    node.rot(new Float32Array(over.rot));
                const sphere = node.radius() * $bog_gamengine_batch_scale_max(node.world());
                $mol_assert_ok(sphere + 1e-6 >= $bog_gamengine_node_reach(node));
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_particle_test_emitter(rate, life) {
        const emitter = new $bog_gamengine_particle;
        emitter.rate(rate);
        emitter.life(new Float32Array([life, life]));
        return emitter;
    }
    function $bog_gamengine_particle_test_run(emitter, seconds, steps = 60) {
        const dt = 1 / steps;
        for (let i = 0; i < Math.round(seconds * steps); ++i)
            emitter.step(dt);
        return emitter.pool().count;
    }
    $mol_test({
        'rate 100 for a second with life 2 keeps about 100 alive'() {
            const count = $bog_gamengine_particle_test_run($bog_gamengine_particle_test_emitter(100, 2), 1);
            $mol_assert_ok(count >= 95 && count <= 105);
        },
        'rate 100 for a second with life 0.5 keeps about 50 alive'() {
            const count = $bog_gamengine_particle_test_run($bog_gamengine_particle_test_emitter(100, 0.5), 1);
            $mol_assert_ok(count >= 45 && count <= 55);
        },
        'burst of 20 gives 20 at once'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 1);
            $mol_assert_equal(emitter.burst(20), 20);
            $mol_assert_equal(emitter.pool().count, 20);
        },
        'particles die by age so after life count drops to zero'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 0.5);
            emitter.burst(10);
            $bog_gamengine_particle_test_run(emitter, 0.6);
            $mol_assert_equal(emitter.pool().count, 0);
        },
        'gravity lowers the mean position'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 10);
            emitter.speed(new Float32Array([0, 0]));
            emitter.gravity(new Float32Array([0, -10, 0]));
            emitter.burst(50);
            $bog_gamengine_particle_test_run(emitter, 0.5);
            const pool = emitter.pool();
            let sum = 0;
            for (let i = 0; i < pool.count; ++i)
                sum += pool.pos[i * 3 + 1];
            $mol_assert_ok(sum / pool.count < -1);
        },
        'color and size are halfway at half life'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 1);
            emitter.speed(new Float32Array([0, 0]));
            emitter.color(new Float32Array([1, 0, 0, 1, 0, 0, 1, 0]));
            emitter.size(new Float32Array([1, 0]));
            emitter.burst(1);
            emitter.step(0.5);
            const pool = emitter.pool();
            $mol_assert_equal([...pool.tint.subarray(0, 4)], [0.5, 0, 0.5, 0.5]);
            $mol_assert_equal(pool.trans[0], 0.5);
            $mol_assert_equal(pool.trans[5], 0.5);
            $mol_assert_equal(pool.size[0], 0.5);
        },
        'aabb covers every particle'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 10);
            emitter.spread(Math.PI);
            emitter.speed(new Float32Array([1, 3]));
            emitter.burst(100);
            $bog_gamengine_particle_test_run(emitter, 0.5);
            const pool = emitter.pool();
            for (let i = 0; i < pool.count; ++i) {
                for (let k = 0; k < 3; ++k) {
                    const at = pool.pos[i * 3 + k];
                    $mol_assert_ok(at >= pool.aabb[i * 6 + k] && at <= pool.aabb[i * 6 + 3 + k]);
                }
            }
        },
        'count never exceeds cap'() {
            const emitter = $bog_gamengine_particle_test_emitter(1000, 10);
            emitter.pool().cap(10);
            emitter.burst(50);
            $mol_assert_equal(emitter.pool().count, 10);
            $bog_gamengine_particle_test_run(emitter, 1);
            $mol_assert_equal(emitter.pool().count, 10);
        },
        'frames switch layer by age through the atlas'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['x/a.png', 'x/b.png']);
            const emitter = $bog_gamengine_particle_test_emitter(0, 1);
            emitter.atlas(atlas);
            emitter.frames(['a', 'b']);
            emitter.burst(1);
            emitter.step(0.25);
            $mol_assert_equal(emitter.pool().layer[0], 0);
            emitter.step(0.5);
            $mol_assert_equal(emitter.pool().layer[0], 1);
        },
        'local space particles follow the emitter, world space ones stay'() {
            const local = $bog_gamengine_particle_test_emitter(0, 10);
            local.world_space(false);
            local.speed(new Float32Array([0, 0]));
            local.pos(new Float32Array([5, 0, 0]));
            local.burst(1);
            local.pos(new Float32Array([7, 0, 0]));
            local.step(0);
            $mol_assert_equal(local.pool().trans[12], 7);
            const world = $bog_gamengine_particle_test_emitter(0, 10);
            world.speed(new Float32Array([0, 0]));
            world.pos(new Float32Array([5, 0, 0]));
            world.burst(1);
            world.pos(new Float32Array([7, 0, 0]));
            world.step(0);
            $mol_assert_equal(world.pool().trans[12], 5);
        },
        'billboard basis is the camera basis under pitch and under roll'() {
            for (const rot of [[-Math.PI / 4, 0, 0], [0, 0, Math.PI / 6], [-0.3, 0.7, 0.2]]) {
                const scene = new $bog_gamengine_scene;
                const cam = new $bog_gamengine_cam;
                cam.scale(new Float32Array([2, 2, 2]));
                cam.rot(new Float32Array(rot));
                scene.cam(cam);
                const emitter = $bog_gamengine_particle_test_emitter(0, 10);
                emitter.billboard(true);
                emitter.speed(new Float32Array([0, 0]));
                scene.kids([emitter]);
                emitter.burst(1);
                const view = cam.world();
                const basis = emitter.basis;
                for (let c = 0; c < 3; ++c) {
                    const x = view[c * 4];
                    const y = view[c * 4 + 1];
                    const z = view[c * 4 + 2];
                    const k = 1 / Math.sqrt(x * x + y * y + z * z);
                    const round = (v) => Math.round(v * 1e6) / 1e6;
                    $mol_assert_equal(round(basis[c * 3]), round(x * k));
                    $mol_assert_equal(round(basis[c * 3 + 1]), round(y * k));
                    $mol_assert_equal(round(basis[c * 3 + 2]), round(z * k));
                    $mol_assert_ok(Math.abs(Math.hypot(basis[c * 3], basis[c * 3 + 1], basis[c * 3 + 2]) - 1) < 1e-5);
                }
            }
        },
        'billboard takes rotation from the scene camera'() {
            const scene = new $bog_gamengine_scene;
            const cam = new $bog_gamengine_cam;
            cam.rot(new Float32Array([0, Math.PI / 2, 0]));
            scene.cam(cam);
            const emitter = $bog_gamengine_particle_test_emitter(0, 10);
            emitter.billboard(true);
            emitter.speed(new Float32Array([0, 0]));
            scene.kids([emitter]);
            emitter.burst(1);
            const trans = emitter.pool().trans;
            $mol_assert_ok(Math.abs(trans[0]) < 1e-6);
            $mol_assert_equal(Math.round(trans[2] * 1e6) / 1e6, -1);
            $mol_assert_equal(Math.round(trans[5] * 1e6) / 1e6, 1);
        },
        'spread zero sends every particle along minus z of the emitter'() {
            const emitter = $bog_gamengine_particle_test_emitter(0, 10);
            emitter.speed(new Float32Array([2, 2]));
            emitter.burst(5);
            const vel = emitter.pool().vel;
            for (let i = 0; i < 5; ++i) {
                $mol_assert_ok(Math.abs(vel[i * 3]) < 1e-6);
                $mol_assert_ok(Math.abs(vel[i * 3 + 1]) < 1e-6);
                $mol_assert_ok(Math.abs(vel[i * 3 + 2] + 2) < 1e-6);
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'first pass is never fresh'() {
            const watch = new $bog_gamengine_watch;
            watch.open();
            watch.of('a');
            watch.of(1);
            $mol_assert_equal(watch.fresh(), false);
        },
        'same values in the same order are fresh'() {
            const watch = new $bog_gamengine_watch;
            const list = [1, 2];
            watch.open().of('a');
            watch.of(list);
            watch.open().of('a');
            watch.of(list);
            $mol_assert_equal(watch.fresh(), true);
        },
        'changed value is not fresh'() {
            const watch = new $bog_gamengine_watch;
            watch.open().of('a');
            watch.open().of('b');
            $mol_assert_equal(watch.fresh(), false);
        },
        'value passes through unchanged'() {
            const watch = new $bog_gamengine_watch;
            const list = [1];
            $mol_assert_equal(watch.open().of(list), list);
            $mol_assert_equal(watch.open().of(7), 7);
        },
        'one more watched value than last time is not fresh'() {
            const watch = new $bog_gamengine_watch;
            watch.open().of('a');
            watch.open().of('a');
            $mol_assert_equal(watch.fresh(), true);
            watch.open().of('a');
            watch.of('b');
            $mol_assert_equal(watch.fresh(), false);
        },
        'one fewer watched value than last time is not fresh'() {
            const watch = new $bog_gamengine_watch;
            watch.open().of('a');
            watch.of('b');
            watch.open().of('a');
            watch.of('b');
            $mol_assert_equal(watch.fresh(), true);
            watch.open().of('a');
            $mol_assert_equal(watch.fresh(), false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_tilemap_test_atlas() {
        const atlas = new $bog_gamengine_atlas;
        atlas.sources(['wall', 'floor'].map(name => ({ name, image: { width: 64, height: 64 } })));
        return atlas;
    }
    function $bog_gamengine_tilemap_test_make(map = '#.#\n..#') {
        const tile = new $bog_gamengine_phys_tile;
        tile.map(map);
        const node = new $bog_gamengine_tilemap;
        node.tile(tile);
        node.atlas($bog_gamengine_tilemap_test_atlas());
        node.palette({ '#': 'wall', '.': 'floor' });
        node.emit();
        return node;
    }
    function $bog_gamengine_tilemap_test_mark(node) {
        const pool = node.pool();
        const marks = [pool.count];
        for (let i = 0; i < pool.count; ++i) {
            for (let k = 0; k < 16; ++k)
                marks.push(pool.trans[i * 16 + k]);
            for (let k = 0; k < 4; ++k)
                marks.push(pool.tint[i * 4 + k]);
            marks.push(pool.layer[i]);
        }
        return marks.join(' ');
    }
    function $bog_gamengine_tilemap_test_other(kind, was) {
        if (kind === 'vec3' || kind === 'euler')
            return [1, 2, 3];
        if (kind === 'vec4')
            return [0.25, 0.5, 0.75, 1];
        if (kind === 'number')
            return Number(was) + 1;
        if (kind === 'text')
            return 'other';
        if (kind === 'flag')
            return !was;
        if (kind === 'node')
            return null;
        return null;
    }
    $mol_test({
        'every drawing prop of the tilemap is watched, and the idle ones are named'() {
            const idle = ['role'];
            const known = new $bog_gamengine_tilemap().props().map(prop => prop.name);
            $mol_assert_equal(known, ['pos', 'rot', 'scale', 'tint', 'role', 'size', 'atlas']);
            for (const name of known) {
                const node = $bog_gamengine_tilemap_test_make();
                const prop = node.props().find(one => one.name === name);
                const before = $bog_gamengine_tilemap_test_mark(node);
                prop.set($bog_gamengine_tilemap_test_other(prop.kind, prop.get()));
                node.emit();
                const after = $bog_gamengine_tilemap_test_mark(node);
                if (idle.includes(name))
                    $mol_assert_equal(after, before);
                else
                    $mol_assert_equal(after === before, false);
            }
        },
        'every drawing input of the grid is watched too'() {
            for (const change of [
                (tile) => tile.map('..#\n#..'),
                (tile) => tile.plane('xz'),
                (tile) => tile.origin([3, -4]),
            ]) {
                const node = $bog_gamengine_tilemap_test_make();
                const before = $bog_gamengine_tilemap_test_mark(node);
                change(node.tile());
                node.emit();
                $mol_assert_equal($bog_gamengine_tilemap_test_mark(node) === before, false);
            }
        },
        'map of three by two gives an instance per cell'() {
            const node = $bog_gamengine_tilemap_test_make();
            $mol_assert_equal(node.pool().count, 6);
        },
        'cell kinds take their layers from the atlas'() {
            const node = $bog_gamengine_tilemap_test_make();
            const layer = node.pool().layer;
            $mol_assert_equal(layer[0], 0);
            $mol_assert_equal(layer[1], 1);
        },
        'char outside the palette is skipped'() {
            const node = $bog_gamengine_tilemap_test_make('#x#\n..#');
            $mol_assert_equal(node.pool().count, 5);
        },
        'first cell sits in the center the tile gives it'() {
            const node = $bog_gamengine_tilemap_test_make();
            const pos = node.tile().cell_pos(0, 0, new Float32Array(3));
            const trans = node.pool().trans;
            $mol_assert_equal(trans[12], pos[0]);
            $mol_assert_equal(trans[13], pos[1]);
            $mol_assert_equal(trans[14], pos[2]);
        },
        'edit of the map refills the pool'() {
            const node = $bog_gamengine_tilemap_test_make();
            node.tile().map('##\n##\n##\n##');
            node.emit();
            $mol_assert_equal(node.pool().count, 8);
        },
        'aabb covers the whole map'() {
            const node = $bog_gamengine_tilemap_test_make();
            const tile = node.tile();
            const box = node.aabb();
            $mol_assert_equal(box[0], 0);
            $mol_assert_equal(box[1], -tile.height());
            $mol_assert_equal(box[3], tile.width());
            $mol_assert_equal(box[4], 0);
        },
        'changed palette relayers the cells'() {
            const node = $bog_gamengine_tilemap_test_make();
            const before = $bog_gamengine_tilemap_test_mark(node);
            node.palette({ '#': 'floor', '.': 'wall' });
            node.emit();
            $mol_assert_equal($bog_gamengine_tilemap_test_mark(node) === before, false);
            $mol_assert_equal(node.pool().layer[0], node.atlas().layer('floor'));
        },
        'grid swapped for another one redraws from the new grid'() {
            const node = $bog_gamengine_tilemap_test_make();
            const before = $bog_gamengine_tilemap_test_mark(node);
            const other = new $bog_gamengine_phys_tile;
            other.map('##\n##');
            node.tile(other);
            node.emit();
            $mol_assert_equal($bog_gamengine_tilemap_test_mark(node) === before, false);
            $mol_assert_equal(node.pool().count, 4);
        },
        'atlas reordered in place relayers the cells without being swapped'() {
            const node = $bog_gamengine_tilemap_test_make();
            const atlas = node.atlas();
            $mol_assert_equal(node.pool().layer[0], 0);
            atlas.sources(['floor', 'wall'].map(name => ({ name, image: { width: 64, height: 64 } })));
            node.emit();
            $mol_assert_equal(atlas.layer('wall'), 1);
            $mol_assert_equal(node.pool().layer[0], 1);
        },
        'swapped atlas relayers the cells instead of keeping the old layers'() {
            const node = $bog_gamengine_tilemap_test_make();
            $mol_assert_equal(node.pool().layer[0], 0);
            const swapped = new $bog_gamengine_atlas;
            swapped.sources(['floor', 'wall'].map(name => ({ name, image: { width: 64, height: 64 } })));
            node.atlas(swapped);
            node.emit();
            $mol_assert_equal(node.pool().layer[0], swapped.layer('wall'));
            $mol_assert_equal(node.pool().layer[1], swapped.layer('floor'));
        },
        'shifted grid moves the drawing and the box with it'() {
            const node = $bog_gamengine_tilemap_test_make();
            const tile = node.tile();
            tile.origin([5, -4]);
            $mol_assert_equal(node.emit(), 6);
            const pos = tile.cell_pos(0, 0, new Float32Array(3));
            $mol_assert_equal([pos[0], pos[1]], [5.5, -4.5]);
            const trans = node.pool().trans;
            $mol_assert_equal([trans[12], trans[13]], [pos[0], pos[1]]);
            const box = node.aabb();
            $mol_assert_equal([box[0], box[1]], [5, -4 - tile.height()]);
            $mol_assert_equal([box[3], box[4]], [5 + tile.width(), -4]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function box(world, mass, x, y, z, rot) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), mass, new Float32Array([x, y, z]), rot));
    }
    function sphere(world, r, x) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_sphere, new Float32Array([r, 0, 0]), 1, new Float32Array([x, 0, 0])));
    }
    function pairs_of(broad) {
        return [...broad.pairs.subarray(0, broad.pair_count * 2)];
    }
    $mol_test({
        'two boxes side by side give one pair'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            box(world, 1, 0.9, 0, 0);
            $mol_assert_equal(world.broad.find(world), 1);
            $mol_assert_equal(pairs_of(world.broad), [0, 1]);
        },
        'two boxes apart give no pairs'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            box(world, 1, 3, 0, 0);
            $mol_assert_equal(world.broad.find(world), 0);
        },
        'boxes overlapping in X but apart in Y give no pairs'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            box(world, 1, 0.5, 3, 0);
            $mol_assert_equal(world.broad.find(world), 0);
        },
        'hundred spheres of radius 1 with step 3 give no pairs'() {
            const world = new $bog_gamengine_phys3;
            for (let k = 0; k < 100; ++k)
                sphere(world, 1, k * 3);
            $mol_assert_equal(world.broad.find(world), 0);
        },
        'hundred spheres of radius 2 with step 3 give 99 pairs'() {
            const world = new $bog_gamengine_phys3;
            for (let k = 0; k < 100; ++k)
                sphere(world, 2, k * 3);
            $mol_assert_equal(world.broad.find(world), 99);
        },
        'two statics give no pairs'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0, 0, 0, 0);
            box(world, 0, 0.5, 0, 0);
            $mol_assert_equal(world.broad.find(world), 0);
        },
        'two sleeping bodies give no pairs'() {
            const world = new $bog_gamengine_phys3;
            const a = box(world, 1, 0, 0, 0);
            const b = box(world, 1, 0.5, 0, 0);
            world.flags[a] |= $bog_gamengine_phys3.flag_sleep;
            world.flags[b] |= $bog_gamengine_phys3.flag_sleep;
            $mol_assert_equal(world.broad.find(world), 0);
        },
        'ghost pairs with moving body'() {
            const world = new $bog_gamengine_phys3;
            const ghost = box(world, 0, 0, 0, 0);
            world.flags[ghost] |= $bog_gamengine_phys3.flag_ghost;
            box(world, 1, 0.5, 0, 0);
            $mol_assert_equal(world.broad.find(world), 1);
        },
        'plane pairs with every moving body and no static'() {
            const world = new $bog_gamengine_phys3;
            world.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3));
            box(world, 1, 10, 0, 0);
            box(world, 1, 20, 0, 0);
            box(world, 0, 30, 0, 0);
            $mol_assert_equal(world.broad.find(world), 2);
            $mol_assert_equal(pairs_of(world.broad), [0, 1, 0, 2]);
        },
        'bounds of unit box turned 45 degrees around Y has half size about 0.707'() {
            const world = new $bog_gamengine_phys3;
            const rot = $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 1, 0]), Math.PI / 4);
            const i = box(world, 1, 0, 0, 0, rot);
            world.bounds();
            const half = (world.aabb[i * 6 + 3] - world.aabb[i * 6]) / 2;
            $mol_assert_ok(Math.abs(half - Math.SQRT1_2) < 1e-3);
            $mol_assert_ok(Math.abs(world.aabb[i * 6 + 4] - 0.5) < 1e-6);
        },
        'bounds of capsule is sphere of radius plus half height'() {
            const world = new $bog_gamengine_phys3;
            const i = world.index_of(world.add($bog_gamengine_phys3.shape_capsule, new Float32Array([0.5, 1, 0]), 1, new Float32Array([1, 2, 3])));
            $mol_assert_equal([...world.aabb.subarray(i * 6, i * 6 + 6)], [-0.5, 0.5, 1.5, 2.5, 3.5, 4.5]);
        },
        'bounds of hull follows rotated points'() {
            const world = new $bog_gamengine_phys3;
            const rot = $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 0, 1]), Math.PI / 2);
            const i = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array(3), 1, new Float32Array(3), rot));
            world.hull_points(i, new Float32Array([0, 0, 0, 2, 0, 0, 0, 1, 0]));
            $mol_assert_ok(Math.abs(world.aabb[i * 6] + 1) < 1e-6);
            $mol_assert_ok(Math.abs(world.aabb[i * 6 + 4] - 2) < 1e-6);
        },
        'second find without motion gives the same list'() {
            const world = new $bog_gamengine_phys3;
            for (let k = 0; k < 20; ++k)
                box(world, 1, (k * 7) % 20 * 0.8, 0, 0);
            world.broad.find(world);
            const first = pairs_of(world.broad);
            $mol_assert_ok(first.length > 0);
            world.broad.find(world);
            $mol_assert_equal(pairs_of(world.broad), first);
        },
        'step refreshes bounds and pairs'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            world.timestep = 1;
            box(world, 1, 0, 0, 0);
            const i = box(world, 1, 3, 0, 0);
            world.vel[i * 3] = -2;
            world.step(1);
            world.step(1);
            $mol_assert_equal(world.aabb[i * 6], 0.5);
            $mol_assert_equal(world.broad.pair_count, 1);
        },
        'remove keeps pairs of the moved body'() {
            const world = new $bog_gamengine_phys3;
            box(world, 1, 0, 0, 0);
            box(world, 1, 10, 0, 0);
            box(world, 1, 0.5, 0, 0);
            world.broad.find(world);
            world.remove(world.handle_of(1));
            $mol_assert_equal(world.broad.find(world), 1);
            $mol_assert_equal(pairs_of(world.broad), [0, 1]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function near(actual, expected) {
        if (Math.abs(actual - expected) < 1e-4)
            return;
        $mol_fail(new Error(`${actual} ≠ ${expected}`));
    }
    function sphere(world, r, x, y, z) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_sphere, new Float32Array([r, 0, 0]), 1, new Float32Array([x, y, z])));
    }
    function box(world, h, x, y, z, rot) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([h, h, h]), 1, new Float32Array([x, y, z]), rot));
    }
    function capsule(world, r, h, x, y, z, rot) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_capsule, new Float32Array([r, h, 0]), 1, new Float32Array([x, y, z]), rot));
    }
    function floor(world) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3)));
    }
    function tetra(world, x, y, z) {
        const i = world.index_of(world.add($bog_gamengine_phys3.shape_hull, new Float32Array([1, 1, 1]), 1, new Float32Array([x, y, z])));
        world.hull_points(i, new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]));
        return i;
    }
    function around_z(angle) {
        return $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 0, 1]), angle);
    }
    function collide(world) {
        const narrow = new $bog_gamengine_phys3_narrow;
        narrow.collide(world, new Uint32Array([0, 1]), 1);
        return narrow;
    }
    function normal_is(narrow, k, x, y, z) {
        near(narrow.contact_normal[k * 3], x);
        near(narrow.contact_normal[k * 3 + 1], y);
        near(narrow.contact_normal[k * 3 + 2], z);
    }
    $mol_test({
        'two spheres of radius 1 at distance 1.5 give depth 0.5 along the center line'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 1, 0, 0, 0);
            sphere(world, 1, 1.5, 0, 0);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            $mol_assert_equal(narrow.contact_a[0], 0);
            $mol_assert_equal(narrow.contact_b[0], 1);
            near(narrow.contact_depth[0], 0.5);
            normal_is(narrow, 0, 1, 0, 0);
            near(narrow.contact_point[0], 0.75);
        },
        'sphere above plane gives no contact'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 1, 0, 1.5, 0);
            floor(world);
            $mol_assert_equal(collide(world).contact_count, 0);
        },
        'sphere sunk 0.2 into plane gives depth 0.2 and plane normal'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 1, 0, 0.8, 0);
            floor(world);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            near(narrow.contact_depth[0], 0.2);
            normal_is(narrow, 0, 0, -1, 0);
        },
        'plane first in pair gives normal from plane to sphere'() {
            const world = new $bog_gamengine_phys3;
            floor(world);
            sphere(world, 1, 0, 0.8, 0);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            $mol_assert_equal(narrow.contact_a[0], 0);
            $mol_assert_equal(narrow.contact_b[0], 1);
            normal_is(narrow, 0, 0, 1, 0);
        },
        'unit box centered 0.4 above plane gives four points of depth 0.1'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0.5, 0, 0.4, 0);
            floor(world);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 4);
            for (let k = 0; k < 4; ++k) {
                near(narrow.contact_depth[k], 0.1);
                normal_is(narrow, k, 0, -1, 0);
                near(narrow.contact_point[k * 3 + 1], -0.05);
            }
        },
        'boxes overlapping 0.2 along X give four points with normal X and depth 0.2'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0.5, 0, 0, 0);
            box(world, 0.5, 0.8, 0, 0);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 4);
            for (let k = 0; k < 4; ++k) {
                near(narrow.contact_depth[k], 0.2);
                normal_is(narrow, k, 1, 0, 0);
                near(narrow.contact_point[k * 3], 0.4);
            }
        },
        'box rotated 45 degrees standing on an edge gives two points'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0.5, 0, 0.6, 0, around_z(Math.PI / 4));
            floor(world);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 2);
            near(narrow.contact_depth[0], Math.SQRT1_2 - 0.6);
            near(narrow.contact_depth[1], Math.SQRT1_2 - 0.6);
            normal_is(narrow, 0, 0, -1, 0);
        },
        'rotated boxes meeting edge to edge give one point'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0.5, 0, 0, 0, around_z(Math.PI / 4));
            box(world, 0.5, 0, 1.3, 0, $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([1, 0, 0]), Math.PI / 4));
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            near(narrow.contact_depth[0], Math.SQRT2 - 1.3);
            normal_is(narrow, 0, 0, 1, 0);
            near(narrow.contact_point[0], 0);
            near(narrow.contact_point[2], 0);
        },
        'sphere against box face'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 0.5, 0.9, 0, 0);
            box(world, 0.5, 0, 0, 0);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            near(narrow.contact_depth[0], 0.1);
            normal_is(narrow, 0, -1, 0, 0);
            near(narrow.contact_point[0], 0.45);
        },
        'sphere against box corner'() {
            const world = new $bog_gamengine_phys3;
            box(world, 0.5, 0, 0, 0);
            sphere(world, 0.5, 0.7, 0.7, 0.7);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            near(narrow.contact_depth[0], 0.5 - 0.2 * Math.sqrt(3));
            const k = 1 / Math.sqrt(3);
            normal_is(narrow, 0, k, k, k);
        },
        'capsule lying on plane gives two points'() {
            const world = new $bog_gamengine_phys3;
            capsule(world, 0.3, 0.5, 0, 0.2, 0, around_z(Math.PI / 2));
            floor(world);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 2);
            near(narrow.contact_depth[0], 0.1);
            near(narrow.contact_depth[1], 0.1);
            normal_is(narrow, 0, 0, -1, 0);
            near(Math.abs(narrow.contact_point[0]), 0.5);
        },
        'crossed capsules give one point at the crossing'() {
            const world = new $bog_gamengine_phys3;
            capsule(world, 0.3, 1, 0, 0, 0);
            capsule(world, 0.3, 1, 0.5, 0, 0, $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([1, 0, 0]), Math.PI / 2));
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            near(narrow.contact_depth[0], 0.1);
            normal_is(narrow, 0, 1, 0, 0);
            near(narrow.contact_point[0], 0.25);
        },
        'separated tetrahedra give no contact'() {
            const world = new $bog_gamengine_phys3;
            tetra(world, 0, 0, 0);
            tetra(world, 3, 3, 3);
            $mol_assert_equal(collide(world).contact_count, 0);
        },
        'overlapping tetrahedra give depth and normal from a to b'() {
            const world = new $bog_gamengine_phys3;
            tetra(world, 0, 0, 0);
            tetra(world, 0.5, 0, 0);
            const narrow = collide(world);
            $mol_assert_equal(narrow.contact_count, 1);
            const k = 1 / Math.sqrt(3);
            near(narrow.contact_depth[0], 0.5 * k);
            normal_is(narrow, 0, k, k, k);
        },
        'ghost body still gets a contact'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 1, 0, 0, 0);
            const g = sphere(world, 1, 1.5, 0, 0);
            world.flags[g] = $bog_gamengine_phys3.flag_ghost;
            $mol_assert_equal(collide(world).contact_count, 1);
        },
        'contacts of a second collide overwrite the first'() {
            const world = new $bog_gamengine_phys3;
            sphere(world, 1, 0, 0, 0);
            sphere(world, 1, 1.5, 0, 0);
            const narrow = collide(world);
            narrow.collide(world, new Uint32Array([0, 1]), 1);
            $mol_assert_equal(narrow.contact_count, 1);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const dt = 1 / 60;
    function floor(world, nx = 0, ny = 1, nz = 0) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_plane, new Float32Array([nx, ny, nz]), 0, new Float32Array(3)));
    }
    function box(world, x, y, z, rot) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array([x, y, z]), rot));
    }
    function sphere(world, x, y, z) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_sphere, new Float32Array([0.5, 0, 0]), 1, new Float32Array([x, y, z])));
    }
    function run(world, seconds) {
        const steps = Math.round(seconds / dt);
        for (let k = 0; k < steps; ++k)
            world.step(dt);
    }
    function speed(world, i) {
        return $bog_gamengine_vec_len(world.vel.subarray(i * 3, i * 3 + 3));
    }
    function slope(angle) {
        const world = new $bog_gamengine_phys3;
        const rot = $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 0, 1]), angle);
        const nx = -Math.sin(angle), ny = Math.cos(angle);
        floor(world, nx, ny, 0);
        const i = box(world, nx * 0.5, ny * 0.5, 0, rot);
        return { world, i };
    }
    $mol_test({
        'box dropped from 2 rests on the plane after 3 s and sleeps'() {
            const world = new $bog_gamengine_phys3;
            floor(world);
            const i = box(world, 0, 2, 0);
            run(world, 3);
            $mol_assert_ok(Math.abs(world.pos[i * 3 + 1] - 0.5) < 0.01);
            $mol_assert_ok(speed(world, i) < 0.01);
            $mol_assert_ok(world.flags[i] & $bog_gamengine_phys3.flag_sleep);
        },
        'box on a 20 degree slope with friction 0.5 stays'() {
            const { world, i } = slope(20 * Math.PI / 180);
            const x0 = world.pos[i * 3], y0 = world.pos[i * 3 + 1];
            run(world, 2);
            $mol_assert_ok(Math.abs(world.pos[i * 3] - x0) < 0.02);
            $mol_assert_ok(Math.abs(world.pos[i * 3 + 1] - y0) < 0.02);
        },
        'box on a 40 degree slope slides faster and faster'() {
            const { world, i } = slope(40 * Math.PI / 180);
            run(world, 0.5);
            const first = speed(world, i);
            run(world, 0.5);
            const second = speed(world, i);
            $mol_assert_ok(first > 0.5);
            $mol_assert_ok(second > first + 0.5);
        },
        'bouncy sphere dropped from 1 rises above 0.5'() {
            const world = new $bog_gamengine_phys3;
            world.restitution(0.8);
            floor(world);
            const i = sphere(world, 0, 1.5, 0);
            let top = 0, bounced = false;
            for (let k = 0; k < 120; ++k) {
                world.step(dt);
                if (world.vel[i * 3 + 1] > 0)
                    bounced = true;
                if (bounced && world.pos[i * 3 + 1] > top)
                    top = world.pos[i * 3 + 1];
            }
            $mol_assert_ok(top - 0.5 > 0.5);
        },
        'stack of three boxes stands 3 s without drifting'() {
            const world = new $bog_gamengine_phys3;
            floor(world);
            const ids = [box(world, 0, 0.5, 0), box(world, 0, 1.51, 0), box(world, 0, 2.52, 0)];
            run(world, 3);
            for (const i of ids) {
                $mol_assert_ok(Math.abs(world.pos[i * 3]) < 0.02);
                $mol_assert_ok(Math.abs(world.pos[i * 3 + 2]) < 0.02);
            }
            $mol_assert_ok(world.pos[ids[2] * 3 + 1] > 2.4);
        },
        'ghost neither pushes nor is pushed but has a contact'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const a = sphere(world, 0, 0, 0);
            const g = sphere(world, 0.8, 0, 0);
            world.flags[g] |= $bog_gamengine_phys3.flag_ghost;
            world.vel[a * 3] = 1;
            world.step(dt);
            $mol_assert_equal(world.narrow.contact_count, 1);
            $mol_assert_equal(world.vel[a * 3], 1);
            $mol_assert_equal(world.vel[g * 3], 0);
        },
        'two boxes collide head-on and keep total momentum'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            world.restitution(1);
            const a = box(world, -1.5, 0, 0);
            const b = box(world, 1.5, 0, 0);
            world.vel[a * 3] = 6;
            world.vel[b * 3] = -2;
            run(world, 1);
            $mol_assert_ok(world.vel[a * 3] < 0);
            $mol_assert_ok(world.vel[b * 3] > 0);
            $mol_assert_ok(Math.abs(world.vel[a * 3] + world.vel[b * 3] - 4) < 0.2);
        },
        'warm start keeps the normal impulse of a resting box between frames'() {
            const world = new $bog_gamengine_phys3;
            floor(world);
            box(world, 0, 0.497, 0);
            world.step(dt);
            world.step(dt);
            let sum = 0;
            for (let k = 0; k < world.solve.prev_count; ++k)
                sum += world.solve.prev_pn[k];
            $mol_assert_ok(Math.abs(sum - 9.81 * dt) < 1e-3);
        },
        'thousand boxes in a 10x10x10 pile settle above the plane within 20 ms per step'() {
            const world = new $bog_gamengine_phys3;
            floor(world);
            for (let x = 0; x < 10; ++x)
                for (let y = 0; y < 10; ++y)
                    for (let z = 0; z < 10; ++z) {
                        box(world, x * 1.1 - 5, y * 1.1 + 0.6, z * 1.1 - 5);
                    }
            const steps = Math.round(3 / dt);
            let total = 0;
            for (let k = 0; k < steps; ++k) {
                const start = performance.now();
                world.step(dt);
                total += performance.now() - start;
            }
            for (let i = 1; i < world.count; ++i)
                $mol_assert_ok(world.pos[i * 3 + 1] > 0.4);
            $mol_assert_ok(total / steps < 20);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const dt = 1 / 60;
    function ground(world) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array([0, -100, 0])));
    }
    function box(world, x, y, z, half = 0.5, mass = 1) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([half, half, half]), mass, new Float32Array([x, y, z])));
    }
    function run(world, seconds) {
        const steps = Math.round(seconds / dt);
        for (let k = 0; k < steps; ++k)
            world.step(dt);
    }
    function anchor_world(world, i, local) {
        const out = new Float32Array(3);
        $bog_gamengine_vec_quat_rotate(out, world.rot_view[i], local);
        return $bog_gamengine_vec_add(out, out, world.pos_view[i]);
    }
    function gap(world, a, b, anchor_a, anchor_b) {
        const pa = anchor_world(world, a, anchor_a), pb = anchor_world(world, b, anchor_b);
        return $bog_gamengine_vec_len($bog_gamengine_vec_sub(pa, pa, pb));
    }
    function speed(world, i) {
        return $bog_gamengine_vec_len(world.vel.subarray(i * 3, i * 3 + 3));
    }
    function angle_y(world, i) {
        const out = new Float32Array(3);
        $bog_gamengine_vec_quat_to_euler(out, world.rot_view[i]);
        return out[1];
    }
    $mol_test({
        'box on a point joint 2 m below the anchor hangs there after 3 s'() {
            const world = new $bog_gamengine_phys3;
            const g = ground(world);
            const i = box(world, 0, 4, 0);
            const local = new Float32Array([0, 2, 0]);
            world.joint.add($bog_gamengine_phys3_joint.type_point, i, g, local, new Float32Array([0, 106, 0]));
            run(world, 3);
            const dx = world.pos[i * 3], dy = world.pos[i * 3 + 1] - 6, dz = world.pos[i * 3 + 2];
            $mol_assert_ok(Math.abs(Math.sqrt(dx * dx + dy * dy + dz * dz) - 2) < 0.05);
            $mol_assert_ok(dy < 0);
            $mol_assert_ok(speed(world, i) < 0.05);
        },
        'swinging box on a point joint keeps its distance to the anchor'() {
            const world = new $bog_gamengine_phys3;
            const g = ground(world);
            const i = box(world, 2, 6, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_point, i, g, new Float32Array([-2, 0, 0]), new Float32Array([0, 106, 0]));
            let worst = 0;
            for (let k = 0; k < 180; ++k) {
                world.step(dt);
                const dx = world.pos[i * 3], dy = world.pos[i * 3 + 1] - 6, dz = world.pos[i * 3 + 2];
                const err = Math.abs(Math.sqrt(dx * dx + dy * dy + dz * dz) - 2);
                if (err > worst)
                    worst = err;
            }
            $mol_assert_ok(worst < 0.05);
        },
        'chain of five boxes on hinges does not tear after 3 s'() {
            const world = new $bog_gamengine_phys3;
            const g = ground(world);
            const axis = new Float32Array([0, 0, 1]);
            const ids = [];
            for (let n = 0; n < 5; ++n)
                ids.push(box(world, 0.55 + n * 1.1, 6, 0));
            world.joint.add($bog_gamengine_phys3_joint.type_point, ids[0], g, new Float32Array([-0.55, 0, 0]), new Float32Array([0, 106, 0]));
            for (let n = 1; n < 5; ++n) {
                world.joint.add($bog_gamengine_phys3_joint.type_hinge, ids[n], ids[n - 1], new Float32Array([-0.55, 0, 0]), new Float32Array([0.55, 0, 0]), axis);
            }
            run(world, 3);
            for (let n = 1; n < 5; ++n) {
                $mol_assert_ok(gap(world, ids[n], ids[n - 1], new Float32Array([-0.55, 0, 0]), new Float32Array([0.55, 0, 0])) <= 0.05);
            }
            $mol_assert_ok(world.pos[ids[4] * 3 + 1] < 3);
        },
        'hinge with limits stops the door at the limit'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const g = ground(world);
            const i = box(world, 0.6, 0, 0);
            const limit = Math.PI / 2;
            world.joint.add($bog_gamengine_phys3_joint.type_hinge, g, i, new Float32Array([0, 100, 0]), new Float32Array([-0.6, 0, 0]), new Float32Array([0, 1, 0]), new Float32Array([-limit, limit]));
            world.ang[i * 3 + 1] = 6;
            let worst = 0;
            for (let k = 0; k < 120; ++k) {
                world.step(dt);
                const angle = Math.abs(angle_y(world, i));
                if (angle > worst)
                    worst = angle;
            }
            $mol_assert_ok(worst > limit - 0.1);
            $mol_assert_ok(worst <= limit + 0.02);
        },
        'hinge keeps its axis while the body spins'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const g = ground(world);
            const i = box(world, 0.6, 0, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_hinge, g, i, new Float32Array([0, 100, 0]), new Float32Array([-0.6, 0, 0]), new Float32Array([0, 1, 0]));
            world.ang[i * 3] = 3;
            world.ang[i * 3 + 1] = 3;
            run(world, 1);
            const out = new Float32Array(3);
            $bog_gamengine_vec_quat_rotate(out, world.rot_view[i], new Float32Array([0, 1, 0]));
            $mol_assert_ok(out[1] > 0.99);
            $mol_assert_ok(Math.abs(world.ang[i * 3 + 1]) > 0.5);
        },
        'slider moves only along its axis and stops at the limit'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const g = ground(world);
            const i = box(world, 0, 0, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_slider, g, i, new Float32Array([0, 100, 0]), new Float32Array(3), new Float32Array([1, 0, 0]), new Float32Array([-1, 1]));
            world.vel[i * 3] = 4;
            world.vel[i * 3 + 1] = 2;
            world.ang[i * 3 + 2] = 2;
            let worst = 0;
            for (let k = 0; k < 90; ++k) {
                world.step(dt);
                const side = Math.hypot(world.pos[i * 3 + 1], world.pos[i * 3 + 2]);
                if (side > worst)
                    worst = side;
            }
            $mol_assert_ok(worst <= 0.01);
            $mol_assert_ok(world.pos[i * 3] > 0.95);
            $mol_assert_ok(world.pos[i * 3] <= 1.01);
            $mol_assert_ok(Math.abs(angle_y(world, i)) < 0.01);
        },
        'spring oscillates around its rest length and settles in 5 s'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const g = ground(world);
            const i = box(world, 3, 0, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_spring, g, i, new Float32Array([0, 100, 0]), new Float32Array(3), undefined, new Float32Array([2, 20, 2]));
            let nearest = Infinity;
            for (let k = 0; k < 300; ++k) {
                world.step(dt);
                if (world.pos[i * 3] < nearest)
                    nearest = world.pos[i * 3];
            }
            $mol_assert_ok(nearest < 1.9);
            $mol_assert_ok(Math.abs(world.pos[i * 3] - 2) < 0.05);
        },
        'sleeping box joined to a moving one wakes up'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const a = box(world, 0, 0, 0);
            const b = box(world, 2, 0, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_point, a, b, new Float32Array([1, 0, 0]), new Float32Array([-1, 0, 0]));
            world.flags[a] |= $bog_gamengine_phys3.flag_sleep;
            world.vel[b * 3 + 1] = 2;
            world.step(dt);
            $mol_assert_equal(world.flags[a] & $bog_gamengine_phys3.flag_sleep, 0);
            $mol_assert_ok(world.vel[a * 3 + 1] > 0.1);
        },
        'removing a body drops its joints and renumbers the moved one'() {
            const world = new $bog_gamengine_phys3;
            const a = box(world, 0, 0, 0);
            const b = box(world, 2, 0, 0);
            const c = box(world, 4, 0, 0);
            world.joint.add($bog_gamengine_phys3_joint.type_point, a, b, new Float32Array(3), new Float32Array(3));
            world.joint.add($bog_gamengine_phys3_joint.type_point, b, c, new Float32Array(3), new Float32Array(3));
            world.remove(world.handle_of(a));
            $mol_assert_equal(world.joint.count, 1);
            $mol_assert_equal(world.joint.a[0], b);
            $mol_assert_equal(world.joint.b[0], a);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_scene_time_mock extends $mol_state_time {
        static stamp(next = 0) {
            return next;
        }
        static now(precision) {
            return this.stamp();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene_time_mock, "stamp", null);
    class $bog_gamengine_scene_mover extends $bog_gamengine_node {
        step(dt) {
            const pos = this.pos();
            this.pos(new Float32Array([pos[0] + dt, pos[1], pos[2]]));
        }
    }
    class $bog_gamengine_scene_roled extends $bog_gamengine_node {
        role() {
            return 'hero';
        }
    }
    class $bog_gamengine_scene_parted extends $bog_gamengine_node {
        own = [];
        parts() {
            return this.own;
        }
    }
    class $bog_gamengine_scene_named extends $bog_gamengine_node {
        kids(next = []) {
            return next;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene_named.prototype, "kids", null);
    class $bog_gamengine_scene_test_cam extends $bog_gamengine_cam {
        proj(aspect) {
            return $mol_3d_mat4.perspective(Math.PI / 3, aspect, 0.1, 100);
        }
    }
    class $bog_gamengine_scene_generated extends $bog_gamengine_scene {
        extra = new $bog_gamengine_scene_mover;
        auto_nodes() {
            return [this.extra];
        }
    }
    class $bog_gamengine_scene_input_mock extends $bog_gamengine_input {
        polls = 0;
        poll() {
            ++this.polls;
        }
    }
    $mol_test({
        'phys set by code survives a recompute within the frame'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const body = new $bog_gamengine_phys_body;
            body.vel(new Float32Array([1, 0, 0]));
            const phys = new $bog_gamengine_phys;
            phys.bodies([body]);
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.phys(phys);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            scene.aspect(2);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(32);
            scene.step();
            $mol_assert_ok(Math.abs(body.pos()[0] - 0.032) < 1e-6);
        },
        'scene polls input once per frame'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const input = new $bog_gamengine_scene_input_mock;
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.input(input);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            scene.aspect(2);
            scene.step();
            $mol_assert_equal(input.polls, 2);
        },
        'three ticks of 16 ms move node by 0.048'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const mover = new $bog_gamengine_scene_mover;
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.kids = () => [mover];
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(32);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(48);
            scene.step();
            $mol_assert_ok(Math.abs(mover.pos()[0] - 0.048) < 1e-9);
        },
        'scene steps phys body by its velocity'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const body = new $bog_gamengine_phys_body;
            body.vel(new Float32Array([1, 0, 0]));
            const phys = new $bog_gamengine_phys;
            phys.bodies([body]);
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.phys(phys);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            $mol_assert_ok(Math.abs(body.pos()[0] - 0.016) < 1e-6);
        },
        'step recomputed within one frame moves node once'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const mover = new $bog_gamengine_scene_mover;
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.kids = () => [mover];
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            scene.aspect(2);
            scene.step();
            $mol_assert_ok(Math.abs(mover.pos()[0] - 0.016) < 1e-9);
        },
        'gravity of phys set by code lives through two frames'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const body = new $bog_gamengine_phys_body;
            const phys = new $bog_gamengine_phys;
            phys.bodies([body]);
            phys.gravity(new Float32Array([0, -10]));
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.phys(phys);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            scene.aspect(2);
            scene.step();
            $mol_wire_fiber.sync();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(32);
            scene.step();
            $mol_assert_equal([...phys.gravity()], [0, -10]);
            $mol_assert_ok(body.vel()[1] < -0.3);
        },
        'scene steps phys3 body by its velocity'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const i = world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 1, new Float32Array(3)));
            world.vel[i * 3] = 1;
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.phys3(world);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(17);
            scene.step();
            $mol_assert_ok(Math.abs(world.pos[i * 3] - world.timestep) < 1e-6);
        },
        'cam is null by default and can be set'() {
            const scene = new $bog_gamengine_scene;
            $mol_assert_equal(scene.cam(), null);
            const cam = new $bog_gamengine_scene_test_cam;
            scene.cam(cam);
            $mol_assert_equal(scene.cam(), cam);
        },
        'scene with cam drops mesh behind it from batch count'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const front = new $bog_gamengine_mesh;
            front.pos(new Float32Array([0, 0, -5]));
            const behind = new $bog_gamengine_mesh;
            behind.pos(new Float32Array([0, 0, 5]));
            const batch = new $bog_gamengine_batch;
            batch.nodes([front, behind]);
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.batches([batch]);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $mol_assert_equal(batch.count, 2);
            scene.cam(new $bog_gamengine_scene_test_cam);
            scene.step();
            $mol_assert_equal(batch.count, 1);
        },
        'auto batches group scene nodes by shader, shape and atlas'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const hero = new $bog_gamengine_sprite;
            hero.atlas(atlas);
            const coin = new $bog_gamengine_sprite;
            coin.atlas(atlas);
            const mesh = new $bog_gamengine_mesh;
            mesh.atlas(atlas);
            const scene = new $bog_gamengine_scene;
            scene.kids([hero, coin, mesh]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 2);
            $mol_assert_equal(batches[0].nodes(), [hero, coin]);
            $mol_assert_equal(batches[1].nodes(), [mesh]);
            $mol_assert_ok(batches[0].shader() instanceof $bog_gamengine_shader_sprite);
            $mol_assert_ok(batches[0].shape() instanceof $bog_gamengine_shape_quad);
            $mol_assert_ok(batches[1].shader() instanceof $bog_gamengine_shader_solid);
            $mol_assert_equal(batches[1].shape(), mesh.shape());
            $mol_assert_equal(batches[1].atlas(), atlas);
        },
        'batches fall back to auto batches and explicit batches win'() {
            const sprite = new $bog_gamengine_sprite;
            const scene = new $bog_gamengine_scene;
            scene.kids([sprite]);
            $mol_assert_equal(scene.batches(), scene.auto_batches());
            $mol_assert_equal(scene.batches().length, 1);
            const own = new $bog_gamengine_batch;
            scene.batches([own]);
            $mol_assert_equal(scene.batches(), [own]);
        },
        'mesh without atlas gets the plain solid shader'() {
            const mesh = new $bog_gamengine_mesh;
            const scene = new $bog_gamengine_scene;
            scene.kids([mesh]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 1);
            $mol_assert_ok(batches[0].shader() instanceof $bog_gamengine_shader_solid_plain);
            $mol_assert_equal(batches[0].atlas(), null);
        },
        'node shader set by hand takes its own batch'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const plain = new $bog_gamengine_sprite;
            plain.atlas(atlas);
            const own = new $bog_gamengine_sprite;
            own.atlas(atlas);
            own.shader(new $bog_gamengine_shader_flat);
            const scene = new $bog_gamengine_scene;
            scene.kids([plain, own]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 2);
            $mol_assert_equal(batches[1].shader(), own.shader());
        },
        'source node gets its own batch without uv'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const spark = new $bog_gamengine_particle;
            spark.atlas(atlas);
            const scene = new $bog_gamengine_scene;
            scene.kids([spark]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 1);
            $mol_assert_equal(batches[0].source(), spark.pool());
            $mol_assert_equal(batches[0].nodes(), []);
            $mol_assert_equal(batches[0].atlas(), atlas);
            $mol_assert_ok(batches[0].shader() instanceof $bog_gamengine_shader_sprite);
        },
        'auto batches keep the order the nodes are listed in'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const map = new $bog_gamengine_tilemap;
            map.atlas(atlas);
            const hero = new $bog_gamengine_sprite;
            hero.atlas(atlas);
            const spark = new $bog_gamengine_particle;
            spark.atlas(atlas);
            const scene = new $bog_gamengine_scene;
            scene.kids([map, hero, spark]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 3);
            $mol_assert_equal(batches[0].source(), map.pool());
            $mol_assert_equal(batches[1].nodes(), [hero]);
            $mol_assert_equal(batches[2].source(), spark.pool());
        },
        'nodes without layer and uv stay out of auto batches'() {
            const bare = new $bog_gamengine_node;
            const scene = new $bog_gamengine_scene;
            scene.kids([bare]);
            $mol_assert_equal(scene.auto_batches().length, 0);
        },
        'auto batch of the same group survives a nodes recompute'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const first = new $bog_gamengine_sprite;
            first.atlas(atlas);
            const second = new $bog_gamengine_sprite;
            second.atlas(atlas);
            const scene = new $bog_gamengine_scene;
            scene.kids([first]);
            const before = scene.auto_batches()[0];
            scene.kids([first, second]);
            const after = scene.auto_batches()[0];
            $mol_assert_equal(before, after);
            $mol_assert_equal(after.nodes(), [first, second]);
        },
        'nodes lists tree depth first with parent before kids'() {
            const a = new $bog_gamengine_scene_named;
            const b = new $bog_gamengine_scene_named;
            const c = new $bog_gamengine_scene_named;
            a.kids([b]);
            const scene = new $bog_gamengine_scene;
            scene.kids = () => [a, c];
            $mol_assert_equal(scene.nodes(), [a, b, c]);
        },
        'nodes see kids given through setter'() {
            const a = new $bog_gamengine_node;
            const b = new $bog_gamengine_node;
            const scene = new $bog_gamengine_scene;
            scene.kids([a, b]);
            $mol_assert_equal(scene.nodes(), [a, b]);
        },
        'node in scene kids sees scene, its input and clock'() {
            const a = new $bog_gamengine_node;
            const scene = new $bog_gamengine_scene;
            const input = new $bog_gamengine_input;
            scene.input(input);
            scene.kids([a]);
            $mol_assert_equal(a.scene(), scene);
            $mol_assert_equal(a.input(), input);
            $mol_assert_equal(a.clock(), scene.clock());
        },
        'generated nodes live alongside the tree ones'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const kid = new $bog_gamengine_scene_mover;
            const scene = new $bog_gamengine_scene_generated;
            scene.$ = $;
            scene.kids([kid]);
            $mol_assert_equal(scene.nodes(), [kid, scene.extra]);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            $mol_assert_ok(Math.abs(kid.pos()[0] - 0.016) < 1e-9);
            $mol_assert_ok(Math.abs(scene.extra.pos()[0] - 0.016) < 1e-9);
            $mol_assert_equal(kid.parent(), scene);
            $mol_assert_equal(scene.extra.parent(), scene);
        },
        'auto batches take generated nodes too'() {
            const atlas = new $bog_gamengine_atlas;
            atlas.uris(['bog/gamengine/demo/atlas/hero.png']);
            const sprite = new $bog_gamengine_sprite;
            sprite.atlas(atlas);
            const scene = new $bog_gamengine_scene;
            scene.auto_nodes([sprite]);
            const batches = scene.auto_batches();
            $mol_assert_equal(batches.length, 1);
            $mol_assert_equal(batches[0].nodes(), [sprite]);
        },
        'node hidden between frames neither steps nor draws'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const hero = new $bog_gamengine_scene_mover;
            const mate = new $bog_gamengine_scene_mover;
            const batch = new $bog_gamengine_batch;
            batch.nodes([hero, mate]);
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.kids = () => [hero, mate];
            scene.batches([batch]);
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            const nodes = scene.nodes();
            $mol_assert_equal(batch.count, 2);
            const at = hero.pos()[0];
            hero.hidden = true;
            $bog_gamengine_scene_time_mock.stamp(32);
            scene.step();
            $mol_assert_equal(hero.pos()[0], at);
            $mol_assert_ok(mate.pos()[0] > at);
            $mol_assert_equal(batch.count, 1);
            $mol_assert_equal(scene.nodes(), nodes);
        },
        'snapshot holds positions and its version grows once per frame'($) {
            $.$mol_state_time = $bog_gamengine_scene_time_mock;
            const hero = new $bog_gamengine_scene_mover;
            const mate = new $bog_gamengine_scene_mover;
            mate.pos(new Float32Array([0, 5, 0]));
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.kids = () => [hero, mate];
            $bog_gamengine_scene_time_mock.stamp(0);
            scene.step();
            $bog_gamengine_scene_time_mock.stamp(16);
            scene.step();
            const version = scene.snapshot_version();
            const snap = scene.snapshot();
            $mol_assert_equal(scene.snapshot_count(), 2);
            $mol_assert_ok(Math.abs(snap[0] - hero.pos()[0]) < 1e-9);
            $mol_assert_equal(snap[4], 5);
            scene.aspect(2);
            scene.step();
            $mol_assert_equal(scene.snapshot_version(), version);
            $bog_gamengine_scene_time_mock.stamp(32);
            scene.step();
            $mol_assert_equal(scene.snapshot_version(), version + 1);
            $mol_assert_equal(scene.snapshot(), snap);
        },
        'nodes of a role come in the order of the scene'() {
            const first = new $bog_gamengine_node;
            const second = new $bog_gamengine_node;
            const other = new $bog_gamengine_node;
            first.role('crumb');
            second.role('crumb');
            other.role('hero');
            const scene = new $bog_gamengine_scene;
            scene.kids([first, other, second]);
            $mol_assert_equal(scene.by_role('crumb'), [first, second]);
            $mol_assert_equal(scene.by_role('hero'), [other]);
            $mol_assert_equal(scene.by_role('ghost'), []);
        },
        'list of a role is remembered until a role changes'() {
            const node = new $bog_gamengine_node;
            const mate = new $bog_gamengine_node;
            node.role('crumb');
            const scene = new $bog_gamengine_scene;
            scene.kids([node, mate]);
            const first = scene.by_role('crumb');
            $mol_assert_equal(scene.by_role('crumb'), first);
            mate.role('crumb');
            $mol_assert_equal(scene.by_role('crumb'), [node, mate]);
            node.role('');
            $mol_assert_equal(scene.by_role('crumb'), [mate]);
        },
        'role given by a tree is seen as well as one given by code'() {
            const node = new $bog_gamengine_scene_roled;
            const scene = new $bog_gamengine_scene;
            scene.kids([node]);
            $mol_assert_equal(scene.by_role('hero'), [node]);
            $mol_assert_equal(scene.by_role_one('hero'), node);
        },
        'single node of a role is demanded loudly'() {
            const first = new $bog_gamengine_node;
            const second = new $bog_gamengine_node;
            first.role('hero');
            const scene = new $bog_gamengine_scene;
            scene.kids([first, second]);
            $mol_assert_equal(scene.by_role_one('hero'), first);
            $mol_assert_fail(() => scene.by_role_one('ghost'), 'Role "ghost" is on 0 nodes, need exactly one');
            second.role('hero');
            $mol_assert_fail(() => scene.by_role_one('hero'), 'Role "hero" is on 2 nodes, need exactly one');
        },
        'role of a node is shown to the inspector as text'() {
            const node = new $bog_gamengine_node;
            const prop = node.props().find(one => one.name === 'role');
            $mol_assert_equal(prop.kind, 'text');
            $mol_assert_equal(prop.get(), '');
            prop.set('hero');
            $mol_assert_equal(node.role(), 'hero');
        },
        'part declared by a tree gets its owner on the nodes walk'() {
            const part = new $bog_gamengine_combat;
            const node = new $bog_gamengine_scene_parted;
            node.own = [part];
            const scene = new $bog_gamengine_scene;
            scene.kids([node]);
            $mol_assert_equal(part.owner(), null);
            scene.nodes();
            $mol_assert_equal(part.owner(), node);
        },
        'own owner of a part is kept by the nodes walk'() {
            const part = new $bog_gamengine_combat;
            const mate = new $bog_gamengine_node;
            part.owner(mate);
            const node = new $bog_gamengine_scene_parted;
            node.own = [part];
            const scene = new $bog_gamengine_scene;
            scene.kids([node]);
            scene.nodes();
            $mol_assert_equal(part.owner(), mate);
        },
        'grandchild of overridden kids sees scene after nodes walk'() {
            const a = new $bog_gamengine_scene_named;
            const b = new $bog_gamengine_node;
            a.kids([b]);
            const scene = new $bog_gamengine_scene;
            scene.kids = () => [a];
            $mol_assert_equal(a.scene(), null);
            scene.nodes();
            $mol_assert_equal(a.scene(), scene);
            $mol_assert_equal(b.scene(), scene);
            $mol_assert_equal(b.clock(), scene.clock());
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'face gives source sampler, uv pipe and color output'($) {
            const shader = new $bog_gamengine_shader_post;
            const face = shader.face();
            $mol_assert_equal(face.glob.source, 'sampler2D');
            $mol_assert_equal(face.pipe.pipe_uv, 'vec2');
            $mol_assert_equal(face.output.color, 'vec4');
        },
        'both entries have main'($) {
            const shader = new $bog_gamengine_shader_post;
            $mol_assert_ok(shader.vert().includes('void main()'));
            $mol_assert_ok(shader.frag().includes('void main()'));
        },
        'vert makes the quad out of gl_VertexID without attributes'($) {
            const shader = new $bog_gamengine_shader_post;
            $mol_assert_ok(shader.vert().includes('gl_VertexID'));
            $mol_assert_not('input' in shader.face());
        },
        'source declares the sampler and mixes only glsl both'($) {
            const shader = new $bog_gamengine_shader_post;
            const source = $bog_gamengine_gl_source(shader.face(), shader.vert(), shader.frag());
            $mol_assert_ok(source.frag.includes('uniform sampler2D source;'));
            $mol_assert_ok(source.frag.includes('out vec4 color;'));
            $mol_assert_equal(shader.sources().vert, $mol_3d_glsl_both + shader.vert());
        },
        'one step reads the pass input at full size'($) {
            const shader = new $bog_gamengine_shader_post;
            const steps = shader.steps();
            $mol_assert_equal(steps.length, 1);
            $mol_assert_equal(steps[0].shader, shader);
            $mol_assert_equal(steps[0].scale, 1);
            $mol_assert_equal(steps[0].from, 'in');
            $mol_assert_equal(steps[0].extra, null);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function $bog_gamengine_shape_gltf_test_glb(normals, indices) {
        const pos = [0, 0, 0, 1, 0, 0, 0, 1, 0];
        const norm = [0, 0, 1, 0, 0, 1, 0, 0, 1];
        const tex = [0, 0, 1, 0, 0, 1];
        const floats = [...pos, ...(normals ? norm : []), ...tex];
        const bin_size = floats.length * 4 + (indices ? 8 : 0);
        const bin = new ArrayBuffer(bin_size);
        const view = new DataView(bin);
        for (let i = 0; i < floats.length; ++i)
            view.setFloat32(i * 4, floats[i], true);
        if (indices)
            for (let i = 0; i < 3; ++i)
                view.setUint16(floats.length * 4 + i * 2, i, true);
        const views = [];
        const accessors = [];
        const attributes = {};
        let offset = 0;
        const add = (name, count, type, size, componentType, unit) => {
            views.push({ buffer: 0, byteOffset: offset, byteLength: count * size * unit });
            accessors.push({ bufferView: views.length - 1, componentType, count, type });
            attributes[name] = accessors.length - 1;
            offset += count * size * unit;
        };
        add('POSITION', 3, 'VEC3', 3, 5126, 4);
        if (normals)
            add('NORMAL', 3, 'VEC3', 3, 5126, 4);
        add('TEXCOORD_0', 3, 'VEC2', 2, 5126, 4);
        if (indices)
            add('indices', 3, 'SCALAR', 1, 5123, 2);
        const primitive = { attributes: { ...attributes } };
        if (indices) {
            primitive.indices = attributes.indices;
            delete primitive.attributes.indices;
        }
        const doc = { asset: { version: '2.0' }, meshes: [{ primitives: [primitive] }], accessors, bufferViews: views, buffers: [{ byteLength: bin_size }] };
        return $bog_gamengine_shape_gltf_test_wrap(doc, bin);
    }
    function $bog_gamengine_shape_gltf_test_wrap(doc, bin) {
        const bin_size = bin.byteLength;
        let json = new TextEncoder().encode(JSON.stringify(doc));
        while (json.length % 4)
            json = new Uint8Array([...json, 0x20]);
        const total = 12 + 8 + json.length + 8 + bin_size;
        const glb = new ArrayBuffer(total);
        const out = new DataView(glb);
        out.setUint32(0, 0x46546C67, true);
        out.setUint32(4, 2, true);
        out.setUint32(8, total, true);
        out.setUint32(12, json.length, true);
        out.setUint32(16, 0x4E4F534A, true);
        new Uint8Array(glb, 20, json.length).set(json);
        out.setUint32(20 + json.length, bin_size, true);
        out.setUint32(24 + json.length, 0x004E4942, true);
        new Uint8Array(glb, 28 + json.length, bin_size).set(new Uint8Array(bin));
        return glb;
    }
    function $bog_gamengine_shape_gltf_test_skin_glb() {
        const parts = [
            { data: [0, 0, 0, 1, 0, 0, 0, 1, 0], kind: 'f32', type: 'VEC3' },
            { data: [0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0], kind: 'u8', type: 'VEC4' },
            { data: [1, 0, 0, 0, 0.5, 0.5, 0, 0, 0.25, 0.75, 0, 0], kind: 'f32', type: 'VEC4' },
            { data: [2, 1, 0], kind: 'u16', type: 'SCALAR' },
            { data: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1, 0, 1], kind: 'f32', type: 'MAT4' },
            { data: [0, 0.75], kind: 'f32', type: 'SCALAR' },
            { data: [0, 0, 0, 1, 0, 0, 1, 0], kind: 'f32', type: 'VEC4' },
        ];
        const dims = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
        const units = { f32: 4, u8: 1, u16: 2 };
        const codes = { f32: 5126, u8: 5121, u16: 5123 };
        const align = (size) => size + (4 - size % 4) % 4;
        let bin_size = 0;
        for (const part of parts)
            bin_size += align(part.data.length * units[part.kind]);
        const bin = new ArrayBuffer(bin_size);
        const view = new DataView(bin);
        const views = [];
        const accessors = [];
        let at = 0;
        for (const part of parts) {
            const unit = units[part.kind];
            for (let i = 0; i < part.data.length; ++i) {
                const to = at + i * unit;
                if (part.kind === 'f32')
                    view.setFloat32(to, part.data[i], true);
                else if (part.kind === 'u16')
                    view.setUint16(to, part.data[i], true);
                else
                    view.setUint8(to, part.data[i]);
            }
            views.push({ buffer: 0, byteOffset: at, byteLength: part.data.length * unit });
            accessors.push({
                bufferView: views.length - 1,
                componentType: codes[part.kind],
                count: part.data.length / dims[part.type],
                type: part.type,
            });
            at += align(part.data.length * unit);
        }
        const doc = {
            asset: { version: '2.0' },
            nodes: [
                { name: 'root', translation: [0, 0, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1], children: [1] },
                { name: 'tip', translation: [0, 1, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] },
                { name: 'arm', mesh: 0, skin: 0 },
            ],
            meshes: [{ primitives: [{ attributes: { POSITION: 0, JOINTS_0: 1, WEIGHTS_0: 2 }, indices: 3 }] }],
            skins: [{ joints: [0, 1], inverseBindMatrices: 4 }],
            animations: [
                {
                    name: 'wave',
                    channels: [{ sampler: 0, target: { node: 1, path: 'rotation' } }],
                    samplers: [{ input: 5, output: 6, interpolation: 'LINEAR' }],
                },
                {
                    name: 'hold',
                    channels: [{ sampler: 0, target: { node: 1, path: 'rotation' } }],
                    samplers: [{ input: 5, output: 6, interpolation: 'STEP' }],
                },
            ],
            accessors,
            bufferViews: views,
            buffers: [{ byteLength: bin_size }],
        };
        return $bog_gamengine_shape_gltf_test_wrap(doc, bin);
    }
    $mol_test({
        'glb triangle gives positions, normals and flipped uv'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_glb(true, true) });
            $mol_assert_equal(shape.size(), 3);
            $mol_assert_equal(shape.mode(), 'triangles');
            $mol_assert_equal([...shape.geometry()], [0, 0, 0, 1, 0, 0, 0, 1, 0]);
            $mol_assert_equal([...shape.normals()], [0, 0, 1, 0, 0, 1, 0, 0, 1]);
            $mol_assert_equal([...shape.skin()], [0, 1, 1, 1, 0, 0]);
        },
        'glb without normals gets flat normal from ccw triangle'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_glb(false, true) });
            $mol_assert_equal([...shape.normals()], [0, 0, 1, 0, 0, 1, 0, 0, 1]);
        },
        'glb without indices takes vertices in order'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_glb(true, false) });
            $mol_assert_equal(shape.size(), 3);
            $mol_assert_equal([...shape.geometry()], [0, 0, 0, 1, 0, 0, 0, 1, 0]);
        },
        'glb skin unrolls joints and weights by index'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_skin_glb() });
            $mol_assert_equal(shape.size(), 3);
            $mol_assert_equal([...shape.joints()], [1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]);
            $mol_assert_equal([...shape.weights()], [0.25, 0.75, 0, 0, 0.5, 0.5, 0, 0, 1, 0, 0, 0]);
        },
        'glb skeleton keeps parents, base pose and inverse binds'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_skin_glb() });
            const skeleton = shape.skeleton();
            $mol_assert_equal(skeleton.count, 2);
            $mol_assert_equal([...skeleton.names], ['root', 'tip']);
            $mol_assert_equal([...skeleton.parents], [-1, 0]);
            $mol_assert_equal([...skeleton.order], [0, 1]);
            $mol_assert_equal([...skeleton.base.subarray(10, 20)], [0, 1, 0, 0, 0, 0, 1, 1, 1, 1]);
            $mol_assert_equal(skeleton.binds[16 + 13], -1);
        },
        'glb clip with two keys takes duration from the last key'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_skin_glb() });
            const clip = shape.clips().get('wave');
            $mol_assert_equal(clip.duration, 0.75);
            $mol_assert_equal(clip.channels.length, 1);
            $mol_assert_equal(clip.channels[0].joint, 1);
            $mol_assert_equal(clip.channels[0].path, 'rotation');
        },
        'glb marks a step sampler as step and a linear one as not'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_skin_glb() });
            $mol_assert_equal(shape.clips().get('hold').channels[0].step, true);
            $mol_assert_equal(shape.clips().get('wave').channels[0].step, false);
        },
        'glb cubic spline animation fails with message'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, json: () => ({
                    nodes: [{ name: 'root' }],
                    skins: [{ joints: [0] }],
                    animations: [{
                            name: 'jump',
                            channels: [{ sampler: 0, target: { node: 0, path: 'rotation' } }],
                            samplers: [{ input: 0, output: 1, interpolation: 'CUBICSPLINE' }],
                        }],
                }) });
            $mol_assert_fail(() => shape.clips(), 'glTF animation interpolation CUBICSPLINE is not supported');
        },
        'glb without skin gives no skeleton and no clips'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, data: () => $bog_gamengine_shape_gltf_test_glb(true, true) });
            $mol_assert_equal(shape.skeleton(), null);
            $mol_assert_equal(shape.clips().size, 0);
            $mol_assert_equal(shape.joints().length, 0);
        },
        'glb without position fails with message'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, json: () => ({ meshes: [{ primitives: [{ attributes: {} }] }] }) });
            $mol_assert_fail(() => shape.geometry(), 'glTF primitive has no POSITION');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function $bog_gamengine_skin_test_skeleton() {
        return {
            count: 2,
            names: ['root', 'tip'],
            parents: new Int32Array([-1, 0]),
            order: new Int32Array([0, 1]),
            base: new Float32Array([
                0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
                0, 1, 0, 0, 0, 0, 1, 1, 1, 1,
            ]),
            binds: new Float32Array([
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1, 0, 1,
            ]),
        };
    }
    function $bog_gamengine_skin_test_clips() {
        const quarter = Math.PI / 2;
        return new Map([
            ['turn', {
                    name: 'turn',
                    duration: 1,
                    channels: [{
                            joint: 1,
                            path: 'rotation',
                            step: false,
                            times: new Float32Array([0, 1]),
                            values: new Float32Array([0, 0, 0, 1, 0, 0, Math.sin(quarter / 2), Math.cos(quarter / 2)]),
                        }],
                }],
            ['here', {
                    name: 'here',
                    duration: 1,
                    channels: [{
                            joint: 0,
                            path: 'translation',
                            step: false,
                            times: new Float32Array([0, 1]),
                            values: new Float32Array([0, 0, 0, 0, 0, 0]),
                        }],
                }],
            ['there', {
                    name: 'there',
                    duration: 1,
                    channels: [{
                            joint: 0,
                            path: 'translation',
                            step: false,
                            times: new Float32Array([0, 1]),
                            values: new Float32Array([2, 0, 0, 2, 0, 0]),
                        }],
                }],
            ['jump', {
                    name: 'jump',
                    duration: 1,
                    channels: [{
                            joint: 0,
                            path: 'translation',
                            step: true,
                            times: new Float32Array([0, 1]),
                            values: new Float32Array([0, 0, 0, 4, 0, 0]),
                        }],
                }],
        ]);
    }
    function $bog_gamengine_skin_test_make($, clip) {
        const skeleton = $bog_gamengine_skin_test_skeleton();
        const clips = $bog_gamengine_skin_test_clips();
        const shape = $bog_gamengine_shape_gltf.make({ $, skeleton: () => skeleton, clips: () => clips });
        const skin = new $bog_gamengine_skin;
        skin.shape(shape);
        skin.clip(clip);
        return skin;
    }
    $mol_test({
        'pose at time zero keeps the bind pose'($) {
            const skin = $bog_gamengine_skin_test_make($, 'turn');
            const bones = skin.pose();
            for (let i = 0; i < 2; ++i) {
                for (let k = 0; k < 16; ++k) {
                    $mol_assert_ok(Math.abs(bones[i * 16 + k] - (k % 5 ? 0 : 1)) < 1e-4);
                }
            }
        },
        'pose in the middle of a clip turns the bone'($) {
            const skin = $bog_gamengine_skin_test_make($, 'turn');
            skin.time(0.5);
            const bones = skin.pose();
            const cos = Math.cos(Math.PI / 4);
            const sin = Math.sin(Math.PI / 4);
            $mol_assert_ok(Math.abs(bones[16] - cos) < 1e-4);
            $mol_assert_ok(Math.abs(bones[17] - sin) < 1e-4);
            $mol_assert_ok(Math.abs(bones[20] + sin) < 1e-4);
            $mol_assert_ok(Math.abs(bones[28] - sin) < 1e-4);
            $mol_assert_ok(Math.abs(bones[29] - (1 - cos)) < 1e-4);
            $mol_assert_ok(Math.abs(bones[0] - 1) < 1e-4);
        },
        'blend of two clips with half weight gives the middle'($) {
            const skin = $bog_gamengine_skin_test_make($, 'here');
            skin.blend('there', 0.5);
            const bones = skin.pose();
            $mol_assert_ok(Math.abs(bones[12] - 1) < 1e-4);
            $mol_assert_ok(Math.abs(bones[13]) < 1e-4);
        },
        'step interpolation holds the previous key'($) {
            const skin = $bog_gamengine_skin_test_make($, 'jump');
            skin.time(0.9);
            $mol_assert_ok(Math.abs(skin.pose()[12]) < 1e-4);
            skin.time(1);
            $mol_assert_ok(Math.abs(skin.pose()[12] - 4) < 1e-4);
        },
        'time runs by step and loops over the duration'($) {
            const skin = $bog_gamengine_skin_test_make($, 'turn');
            skin.step(0.6);
            $mol_assert_ok(Math.abs(skin.time() - 0.6) < 1e-6);
            skin.step(0.6);
            $mol_assert_ok(Math.abs(skin.time() - 0.2) < 1e-6);
        },
        'time stops at the end without loop'($) {
            const skin = $bog_gamengine_skin_test_make($, 'turn');
            skin.loop(false);
            skin.step(0.8);
            skin.step(0.8);
            $mol_assert_equal(skin.time(), 1);
        },
        'pose without a skeleton stays identity'($) {
            const skin = new $bog_gamengine_skin;
            const bones = skin.pose();
            $mol_assert_equal(bones.length, $bog_gamengine_skin_max * 16);
            $mol_assert_equal([...bones.subarray(0, 16)], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        },
        'pose keeps the same buffer and bumps version only on change'($) {
            const skin = $bog_gamengine_skin_test_make($, 'turn');
            const first = skin.pose();
            const was = skin.version;
            $mol_assert_equal(skin.pose(), first);
            $mol_assert_equal(skin.version, was);
            skin.time(0.5);
            $mol_assert_equal(skin.pose(), first);
            $mol_assert_equal(skin.version, was + 1);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'both entries have main'($) {
            const shader = new $bog_gamengine_shader_post_bloom;
            $mol_assert_ok(shader.vert().includes('void main()'));
            $mol_assert_ok(shader.frag().includes('void main()'));
        },
        'mix face adds the blurred sampler next to the source'($) {
            const face = new $bog_gamengine_shader_post_bloom().face();
            $mol_assert_equal(face.glob.source, 'sampler2D');
            $mol_assert_equal(face.glob.extra, 'sampler2D');
        },
        'chain is bright, two blurs at half size and a mix at full'($) {
            const shader = new $bog_gamengine_shader_post_bloom;
            const steps = shader.steps();
            $mol_assert_equal(steps.map(step => step.scale), [2, 2, 2, 1]);
            $mol_assert_equal(steps.map(step => step.from), ['in', 'prev', 'prev', 'in']);
            $mol_assert_equal(steps.map(step => step.extra), [null, null, null, 'prev']);
            $mol_assert_equal(steps[3].shader, shader);
        },
        'blurs walk different axes'($) {
            const along = new $bog_gamengine_shader_post_bloom_blur;
            const across = new $bog_gamengine_shader_post_bloom_blur_across;
            $mol_assert_ok(along.frag().includes('vec2( 1.0, 0.0 ) * texel'));
            $mol_assert_ok(across.frag().includes('vec2( 0.0, 1.0 ) * texel'));
        },
        'bright pass keeps only what is over the threshold'($) {
            const frag = new $bog_gamengine_shader_post_bloom_bright().frag();
            $mol_assert_ok(frag.includes('power - 0.13'));
        },
        'source of the mix declares both samplers'($) {
            const shader = new $bog_gamengine_shader_post_bloom;
            const source = $bog_gamengine_gl_source(shader.face(), shader.vert(), shader.frag());
            $mol_assert_ok(source.frag.includes('uniform sampler2D source;'));
            $mol_assert_ok(source.frag.includes('uniform sampler2D extra;'));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'both entries have main'($) {
            const shader = new $bog_gamengine_shader_post_tone;
            $mol_assert_ok(shader.vert().includes('void main()'));
            $mol_assert_ok(shader.frag().includes('void main()'));
        },
        'face keeps source sampler of the base pass'($) {
            const shader = new $bog_gamengine_shader_post_tone;
            $mol_assert_equal(shader.face().glob.source, 'sampler2D');
        },
        'frag rolls the tone off and encodes gamma at the end'($) {
            const shader = new $bog_gamengine_shader_post_tone;
            const frag = shader.frag();
            $mol_assert_ok(frag.includes('aces'));
            $mol_assert_not(frag.includes('white'));
            $mol_assert_ok(frag.includes('pow( mapped, vec3( 1.0 / 2.2 ) )'));
        },
        'source declares the sampler and the color output'($) {
            const shader = new $bog_gamengine_shader_post_tone;
            const source = $bog_gamengine_gl_source(shader.face(), shader.vert(), shader.frag());
            $mol_assert_ok(source.frag.includes('uniform sampler2D source;'));
            $mol_assert_ok(source.frag.includes('out vec4 color;'));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'vert has main and frag is empty main'($) {
            const shader = new $bog_gamengine_shader_depth;
            $mol_assert_ok(shader.vert().includes('void main()'));
            $mol_assert_equal(shader.frag().trim(), 'void main() {}');
        },
        'vert uses shadow_mat, inst_trans and vertex'($) {
            const shader = new $bog_gamengine_shader_depth;
            const vert = shader.vert();
            $mol_assert_ok(vert.includes('shadow_mat'));
            $mol_assert_ok(vert.includes('inst_trans'));
            $mol_assert_ok(vert.includes('vertex'));
        },
        'inputs match solid inputs in order so the same vao fits both programs'($) {
            const depth = Object.keys(new $bog_gamengine_shader_depth().face().input);
            const solid = Object.keys(new $bog_gamengine_shader_solid().face().input);
            $mol_assert_equal(depth, solid);
        },
        'sources mix only glsl both'($) {
            const shader = new $bog_gamengine_shader_depth;
            $mol_assert_equal(shader.sources().vert, $mol_3d_glsl_both + shader.vert());
            $mol_assert_equal(shader.sources().frag, $mol_3d_glsl_both + shader.frag());
        },
        'source declares shadow_mat uniform and no outputs'($) {
            const shader = new $bog_gamengine_shader_depth;
            const source = $bog_gamengine_gl_source(shader.face(), shader.vert(), shader.frag());
            $mol_assert_ok(source.vert.includes('uniform mat4 shadow_mat;'));
            $mol_assert_not(source.frag.includes('out '));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_draw_time_mock extends $mol_state_time {
        static stamp(next = 0) {
            return next;
        }
        static now(precision) {
            return this.stamp();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_draw_time_mock, "stamp", null);
    class $bog_gamengine_draw_gl_mock extends Object {
        deleted = [];
        createTexture() {
            return 'bones';
        }
        bindTexture() { }
        texStorage2D() { }
        texParameteri() { }
        deleteVertexArray(vao) {
            this.deleted.push(vao);
        }
        deleteBuffer(buffer) {
            this.deleted.push(buffer);
        }
        deleteTexture(texture) {
            this.deleted.push(texture);
        }
    }
    class $bog_gamengine_draw_mock extends $$.$bog_gamengine_draw {
        gl = new $bog_gamengine_draw_gl_mock;
        scene_mock = new $bog_gamengine_scene;
        passes_mock = null;
        context() {
            return this.gl;
        }
        scene() {
            return this.scene_mock;
        }
        passes() {
            return this.passes_mock ?? super.passes();
        }
        slot(batch) {
            const found = this.slots_all.get(batch);
            if (found)
                return found;
            const slot = new $$.$bog_gamengine_draw_slot;
            slot.batch = batch;
            slot.vao = `vao ${batch}`;
            slot.buffers = [{ native: `buffer ${batch}` }];
            this.slots_all.set(batch, slot);
            return slot;
        }
    }
    $mol_test({
        'slot of a vanished batch frees vao and buffers, the kept one stays'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            const kept = new $bog_gamengine_batch;
            kept[Symbol.toStringTag] = 'kept';
            const gone = new $bog_gamengine_batch;
            gone[Symbol.toStringTag] = 'gone';
            draw.scene().batches([kept, gone]);
            draw.slots();
            draw.scene().batches([kept]);
            draw.slots();
            $mol_assert_equal(draw.gl.deleted, ['buffer gone', 'vao gone']);
        },
        'slot with bones frees its bone texture as well'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            const gone = new $bog_gamengine_batch;
            gone[Symbol.toStringTag] = 'gone';
            draw.scene().batches([gone]);
            draw.slots()[0].bones_tex = $bog_gamengine_skin_gl_bones(draw.context());
            draw.scene().batches([]);
            draw.slots();
            $mol_assert_equal(draw.gl.deleted, ['buffer gone', 'vao gone', 'bones']);
        },
        'clear colour is the dark default until it is set'($) {
            const draw = new $$.$bog_gamengine_draw;
            draw.$ = $;
            $mol_assert_equal(draw.clear(), new Float32Array([0.004, 0.004, 0.007, 1]));
            draw.clear([0.5, 0.7, 1, 1]);
            $mol_assert_equal(draw.clear(), new Float32Array([0.5, 0.7, 1, 1]));
        },
        'report of a ready slot with bones counts its instance'($) {
            $.$mol_state_time = $bog_gamengine_draw_time_mock;
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            const slot = new $$.$bog_gamengine_draw_slot;
            slot.batch = new $bog_gamengine_batch;
            slot.batch.count = 1;
            slot.batch.cap = 1;
            slot.ready = true;
            slot.tris = 12;
            slot.bytes = 512;
            slot.bones_tex = $bog_gamengine_skin_gl_bones(draw.context());
            draw.count_fill([slot]);
            draw.measure(0, 1, 1, 2, 3, 4, 5);
            $mol_assert_equal(draw.report().instances, 1);
            $mol_assert_equal(draw.report().triangles, 12);
            $mol_assert_equal(draw.report().bytes, 512);
        },
        'light matrix puts a point on the sphere border into ±1'($) {
            const mat = $$.$bog_gamengine_draw_shadow_mat(new Float32Array([0, -1, 0]), 0, new Float32Array([1, 2, 3]), 10, new Float32Array(16));
            const round = (value) => Math.round(value * 1e6) / 1e6 + 0;
            const at = (x, y, z) => [
                round(mat[0] * x + mat[4] * y + mat[8] * z + mat[12]),
                round(mat[1] * x + mat[5] * y + mat[9] * z + mat[13]),
                round(mat[2] * x + mat[6] * y + mat[10] * z + mat[14]),
            ];
            $mol_assert_equal(at(1, 2, 3), [0, 0, 0]);
            $mol_assert_equal(at(11, 2, 3), [1, 0, 0]);
            $mol_assert_equal(at(1, 2, 13), [0, 1, 0]);
            $mol_assert_equal(at(1, -8, 3), [0, 0, 1]);
            $mol_assert_equal(at(1, 12, 3), [0, 0, -1]);
        },
        'stat without context is a string'($) {
            $.$mol_state_time = $bog_gamengine_draw_time_mock;
            const draw = new $bog_gamengine_draw;
            draw.$ = $;
            $mol_assert_equal(draw.stat(), 'frame 1 | 0.0 ms | tick 0.0 ms');
        },
        'report without context is all zeros'($) {
            $.$mol_state_time = $bog_gamengine_draw_time_mock;
            const draw = new $bog_gamengine_draw;
            draw.$ = $;
            $mol_assert_equal(draw.report(), {
                tick: 0, fill: 0, shadow: 0, main: 0, post: 0,
                batches: 0, instances: 0, draws: 0, triangles: 0, bytes: 0,
            });
        },
        'counters sum instances and triangles of ready slots only'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            const slot = (count, ready) => {
                const made = new $$.$bog_gamengine_draw_slot;
                made.batch = new $bog_gamengine_batch;
                made.batch.count = count;
                made.batch.cap = count;
                made.ready = ready;
                made.tris = 2;
                made.stride = 100;
                made.bytes = 100 * count;
                return made;
            };
            draw.count_fill([slot(3, true), slot(5, true), slot(7, false)]);
            $mol_assert_equal(draw.count_batches, 2);
            $mol_assert_equal(draw.count_instances, 8);
            $mol_assert_equal(draw.count_triangles, 16);
            $mol_assert_equal(draw.count_bytes, 800);
        },
        'chain of one pass draws straight to the screen'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            const plan = draw.post_plan();
            $mol_assert_equal(plan.length, 1);
            $mol_assert_equal(plan[0].from, 'scene');
            $mol_assert_equal(plan[0].out, null);
        },
        'bloom before tone ping-pongs half size targets and ends on the screen'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            draw.passes_mock = [new $bog_gamengine_shader_post_bloom, new $bog_gamengine_shader_post_tone];
            const plan = draw.post_plan();
            $mol_assert_equal(plan.map(step => step.from), ['scene', '2_0', '2_1', 'scene', '1_0']);
            $mol_assert_equal(plan.map(step => step.out), ['2_0', '2_1', '2_0', '1_0', null]);
            $mol_assert_equal(plan.map(step => step.extra), [null, null, null, '2_0', null]);
        },
        'chain is empty when post is off'($) {
            const draw = new $bog_gamengine_draw_mock;
            draw.$ = $;
            draw.post(false);
            $mol_assert_equal(draw.post_plan().length, 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'flat camera with height 10 and aspect 2 maps (10, 5, 0) to (1, 1)'() {
            const cam = new $bog_gamengine_cam_flat;
            cam.height(10);
            const proj = cam.proj(2);
            const point = [10, 5, 0, 1];
            const out = new Float32Array(4);
            for (let i = 0; i < 4; ++i) {
                out[i] = proj[i] * point[0] + proj[4 + i] * point[1] + proj[8 + i] * point[2] + proj[12 + i] * point[3];
            }
            $mol_assert_ok(Math.abs(out[0] - 1) < 1e-6);
            $mol_assert_ok(Math.abs(out[1] - 1) < 1e-6);
        },
        'camera without target keeps its own position'() {
            const cam = new $bog_gamengine_cam_flat;
            cam.pos(new Float32Array([3, 4, 0]));
            cam.step(0.016);
            $mol_assert_equal(cam.pos()[0], 3);
            $mol_assert_equal(cam.pos()[1], 4);
        },
        'camera jumps to the target with no follow'() {
            const target = new $bog_gamengine_node;
            target.pos(new Float32Array([5, -3, 0]));
            const cam = new $bog_gamengine_cam_flat;
            cam.target(target);
            cam.step(0.016);
            $mol_assert_equal(cam.pos()[0], 5);
            $mol_assert_equal(cam.pos()[1], -3);
        },
        'camera stops at the bounds of the level'() {
            const target = new $bog_gamengine_node;
            target.pos(new Float32Array([5, 8, 0]));
            const cam = new $bog_gamengine_cam_flat;
            cam.height(10);
            cam.aspect(2);
            cam.target(target);
            cam.bounds(new Float32Array([0, 0, 40, 10]));
            cam.step(0.016);
            $mol_assert_equal(cam.pos()[0], 10);
            $mol_assert_equal(cam.pos()[1], 5);
            target.pos(new Float32Array([35, 8, 0]));
            cam.step(0.016);
            $mol_assert_equal(cam.pos()[0], 30);
        },
        'follow moves the camera part of the way to the target'() {
            const target = new $bog_gamengine_node;
            target.pos(new Float32Array([10, 0, 0]));
            const cam = new $bog_gamengine_cam_flat;
            cam.target(target);
            cam.follow(0.5);
            cam.step(0.1);
            const rate = 1 - Math.exp(-0.2);
            $mol_assert_ok(Math.abs(cam.pos()[0] - 10 * rate) < 1e-5);
            for (let i = 0; i < 100; ++i)
                cam.step(0.1);
            $mol_assert_ok(Math.abs(cam.pos()[0] - 10) < 1e-3);
        },
        'pan moves the camera and stops at the bounds'() {
            const cam = new $bog_gamengine_cam_flat;
            cam.height(10);
            cam.aspect(2);
            cam.bounds(new Float32Array([0, 0, 40, 10]));
            cam.pos(new Float32Array([10, 5, 0]));
            cam.pan(5, 0);
            $mol_assert_equal(cam.pos()[0], 15);
            cam.pan(100, 0);
            $mol_assert_equal(cam.pos()[0], 30);
            cam.pan(0, 100);
            $mol_assert_equal(cam.pos()[1], 5);
        },
        'zoom at a point keeps that point in place'() {
            const cam = new $bog_gamengine_cam_flat;
            cam.height(10);
            cam.pos(new Float32Array([0, 0, 0]));
            cam.zoom_at(2, 4, 2);
            $mol_assert_equal(cam.zoom(), 2);
            $mol_assert_equal(cam.pos()[0], 2);
            $mol_assert_equal(cam.pos()[1], 1);
        },
        'zoom stays within its limits'() {
            const cam = new $bog_gamengine_cam_flat;
            cam.zoom_min(0.5);
            cam.zoom_max(2);
            cam.zoom_at(10, 0, 0);
            $mol_assert_equal(cam.zoom(), 2);
            cam.zoom_at(0.01, 0, 0);
            $mol_assert_equal(cam.zoom(), 0.5);
        },
        'set through props changes zoom'() {
            const cam = new $bog_gamengine_cam_flat;
            cam.props().find(prop => prop.name === 'zoom').set(2);
            $mol_assert_equal(cam.zoom(), 2);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function project(proj, point) {
        const out = new Float32Array(4);
        for (let i = 0; i < 4; ++i) {
            out[i] = proj[i] * point[0] + proj[4 + i] * point[1] + proj[8 + i] * point[2] + proj[12 + i] * point[3];
        }
        return out;
    }
    $mol_test({
        'deep camera maps near plane to z = -1'() {
            const cam = new $bog_gamengine_cam_deep;
            const out = project(cam.proj(1), [0, 0, -cam.near(), 1]);
            $mol_assert_ok(Math.abs(out[2] / out[3] + 1) < 1e-6);
        },
        'deep camera maps far plane to z = 1'() {
            const cam = new $bog_gamengine_cam_deep;
            const out = project(cam.proj(1), [0, 0, -cam.far(), 1]);
            $mol_assert_ok(Math.abs(out[2] / out[3] - 1) < 1e-6);
        },
        'follow puts the camera over the node with its turn'() {
            const node = new $bog_gamengine_node;
            node.pos(new Float32Array([2, 1, -3]));
            node.rot(new Float32Array([0.25, 0.5, 0]));
            const cam = new $bog_gamengine_cam_deep;
            cam.follow(node);
            cam.lift(0.5);
            cam.step(1 / 60);
            $mol_assert_equal(Array.from(cam.pos()), [2, 1.5, -3]);
            $mol_assert_equal(Array.from(cam.rot()), [0.25, 0.5, 0]);
        },
        'follow of nothing leaves the camera alone'() {
            const cam = new $bog_gamengine_cam_deep;
            const pos = cam.pos();
            cam.step(1 / 60);
            $mol_assert_equal(cam.pos(), pos);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function near(actual, expected) {
        $mol_assert_ok(Math.abs(actual - expected) < 1e-4);
    }
    function flat_point() {
        const cam = new $bog_gamengine_cam_flat;
        cam.height(10);
        const point = new $bog_gamengine_point;
        point.cam(cam);
        point.width(800);
        point.height(400);
        return point;
    }
    function sized_node(size, pos = [0, 0, 0]) {
        const node = new $bog_gamengine_node;
        node.size = () => $bog_gamengine_node_vec(size);
        node.pos($bog_gamengine_node_vec(pos));
        return node;
    }
    function deep_point() {
        const cam = new $bog_gamengine_cam_deep;
        cam.pos(new Float32Array([0, 0, 5]));
        const point = new $bog_gamengine_point;
        point.cam(cam);
        point.width(800);
        point.height(400);
        return point;
    }
    $mol_test({
        'flat camera at origin maps screen center to world (0, 0)'() {
            const out = new Float32Array(3);
            flat_point().world(out, 400, 200);
            near(out[0], 0);
            near(out[1], 0);
        },
        'flat camera with height 10 maps top right corner to world (10, 5)'() {
            const out = new Float32Array(3);
            flat_point().world(out, 800, 0);
            near(out[0], 10);
            near(out[1], 5);
        },
        'deep camera at (0, 0, 5) maps screen center to world (0, 0)'() {
            const out = new Float32Array(3);
            deep_point().world(out, 400, 200);
            near(out[0], 0);
            near(out[1], 0);
        },
        'deep camera projects world origin to screen center'() {
            const out = new Float32Array(3);
            deep_point().screen(out, new Float32Array([0, 0, 0]));
            near(out[0], 400);
            near(out[1], 200);
            $mol_assert_ok(out[2] > 0);
        },
        'pick by screen center gives node at origin'() {
            const point = deep_point();
            const first = new $bog_gamengine_node;
            const second = new $bog_gamengine_node;
            second.pos(new Float32Array([3, 0, 0]));
            $mol_assert_equal(point.pick([first, second], 400, 200), first);
        },
        'pick by projected point gives shifted node'() {
            const point = deep_point();
            const first = new $bog_gamengine_node;
            const second = new $bog_gamengine_node;
            second.pos(new Float32Array([3, 0, 0]));
            const at = new Float32Array(3);
            point.screen(at, second.pos());
            $mol_assert_equal(point.pick([first, second], at[0], at[1]), second);
        },
        'ground layer under a small node does not shadow it at the same depth'() {
            const point = flat_point();
            const ground = sized_node([12, 10, 0]);
            const coin = sized_node([1, 1, 0], [3, 1, 0]);
            const at = point.screen(new Float32Array(3), coin.pos());
            $mol_assert_equal(point.pick([ground, coin], at[0], at[1]), coin);
            $mol_assert_equal(point.pick([coin, ground], at[0], at[1]), coin);
        },
        'click beside the small node still takes the ground layer'() {
            const point = flat_point();
            const ground = sized_node([12, 10, 0]);
            const coin = sized_node([1, 1, 0], [3, 1, 0]);
            const at = point.screen(new Float32Array(3), new Float32Array([-3, -2, 0]));
            $mol_assert_equal(point.pick([ground, coin], at[0], at[1]), ground);
        },
        'box over the middle of five nodes gives three of them'() {
            const point = flat_point();
            const nodes = [];
            for (let i = 0; i < 5; ++i) {
                const node = new $bog_gamengine_node;
                node.pos(new Float32Array([(i - 2) * 3, 0, 0]));
                nodes.push(node);
            }
            const found = point.pick_box(nodes, 240, 160, 560, 240);
            $mol_assert_equal(found.length, 3);
            $mol_assert_equal(found[0], nodes[1]);
            $mol_assert_equal(found[1], nodes[2]);
            $mol_assert_equal(found[2], nodes[3]);
        },
        'box reuses the same buffer and fills the given indices'() {
            const point = flat_point();
            const first = new $bog_gamengine_node;
            const second = new $bog_gamengine_node;
            second.pos(new Float32Array([6, 0, 0]));
            const at = [];
            const found = point.pick_box([first, second], 240, 160, 560, 240, at);
            $mol_assert_equal(at.length, 1);
            $mol_assert_equal(at[0], 0);
            $mol_assert_equal(point.pick_box([first, second], 0, 0, 800, 400, at), found);
            $mol_assert_equal(at.length, 2);
        },
        'scale lets the point take css coordinates'() {
            const point = flat_point();
            point.scale(2);
            const out = new Float32Array(3);
            point.world(out, 400, 0);
            near(out[0], 10);
            near(out[1], 5);
            point.screen(out, new Float32Array([10, 5, 0]));
            near(out[0], 400);
            near(out[1], 0);
        },
        'pick away from all nodes gives null'() {
            const point = deep_point();
            const first = new $bog_gamengine_node;
            const second = new $bog_gamengine_node;
            second.pos(new Float32Array([3, 0, 0]));
            $mol_assert_equal(point.pick([first, second], 0, 0), null);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function node_stub() {
        const targets = [];
        return {
            targets,
            connect: (target) => { targets.push(target); },
            disconnect: () => { },
            addEventListener: () => { },
        };
    }
    function gain_stub() {
        const ramps = [];
        return {
            ramps,
            gain: {
                value: 1,
                setValueAtTime: () => { },
                linearRampToValueAtTime: (value) => { ramps.push(value); },
            },
            connect: () => { },
            disconnect: () => { },
        };
    }
    function panner_stub() {
        return {
            pan: { value: 0 },
            connect: () => { },
            disconnect: () => { },
        };
    }
    function sample_stub() {
        const source = node_stub();
        return $mol_audio_sample.make({
            start: () => { },
            output: () => source,
            stop_at: (next) => next ?? -1,
        });
    }
    class $bog_gamengine_sound_mute extends $bog_gamengine_sound {
        uris() {
            return {
                coin: 'bog/gamengine/demo/sound/coin.wav',
                a: 'bog/gamengine/demo/sound/a.wav',
                b: 'bog/gamengine/demo/sound/b.wav',
            };
        }
        sample_last = null;
        sample(name) {
            super.sample(name);
            return this.sample_last = sample_stub();
        }
        music_sample(name) {
            super.music_sample(name);
            return sample_stub();
        }
        Room() {
            return $mol_audio_room.make({ node: () => node_stub() });
        }
        time() {
            return 0;
        }
        panner() {
            return panner_stub();
        }
        gain() {
            return gain_stub();
        }
    }
    function sound() {
        return new $bog_gamengine_sound_mute;
    }
    function settle() {
        return new Promise(done => setTimeout(done));
    }
    function ramps(gain) {
        return gain.ramps;
    }
    $mol_test({
        'play known sample without AudioContext does not throw'() {
            sound().play('coin');
        },
        'play unknown sample throws with its name'() {
            $mol_assert_fail(() => sound().play('nope'), 'Sound has no sample nope, known: coin, a, b');
        },
        async 'sample to the right of listener pans right'() {
            const snd = sound();
            snd.play('coin', [1, 0, 0]);
            await settle();
            $mol_assert_ok(snd.voices[0].panner.pan.value > 0);
        },
        async 'sample to the left of listener pans left'() {
            const snd = sound();
            snd.play('coin', [-1, 0, 0]);
            await settle();
            $mol_assert_ok(snd.voices[0].panner.pan.value < 0);
        },
        async 'sample in front of listener stays centered'() {
            const snd = sound();
            snd.play('coin', [0, 0, -5]);
            await settle();
            $mol_assert_equal(snd.voices[0].panner.pan.value, 0);
        },
        async 'sample twice as far fades by distance'() {
            const snd = sound();
            snd.play('coin', [5, 0, 0]);
            snd.play('coin', [10, 0, 0]);
            await settle();
            $mol_assert_equal(snd.voices[0].gain.gain.value, 0.8);
            $mol_assert_equal(snd.voices[1].gain.gain.value, 0.5);
        },
        async 'listener turned around flips the pan'() {
            const snd = sound();
            snd.play('coin', [1, 0, 0]);
            await settle();
            snd.listener({ world: () => $mol_3d_mat4.rotation([0, 0, 1], Math.PI) });
            snd.update();
            $mol_assert_ok(snd.voices[0].panner.pan.value < 0);
        },
        async 'music switch fades old track out and new one in'() {
            const snd = sound();
            snd.music('a');
            await settle();
            const old = snd.music_voice;
            snd.music('b');
            await settle();
            $mol_assert_equal(ramps(old.gain), [1, 0]);
            $mol_assert_equal(ramps(snd.music_voice.gain), [1]);
        },
        async 'music null fades track out'() {
            const snd = sound();
            snd.music('a');
            await settle();
            const old = snd.music_voice;
            snd.music(null);
            await settle();
            $mol_assert_equal(ramps(old.gain), [1, 0]);
            $mol_assert_equal(snd.music_voice, null);
        },
        'volume scales music before the room'() {
            const snd = sound();
            snd.volume(0.5);
            $mol_assert_equal(snd.music_gain().gain.value, 0.5);
        },
        'effects scales samples before the room'() {
            const snd = sound();
            snd.effects(0.5);
            $mol_assert_equal(snd.effects_gain().gain.value, 0.5);
        },
        async 'sample without position goes through effects gain'() {
            const snd = sound();
            snd.play('coin');
            await settle();
            const source = snd.sample_last.output();
            $mol_assert_equal(source.targets, [snd.effects_gain()]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function grid(map) {
        const tile = new $bog_gamengine_phys_tile;
        tile.map(map);
        const grid = new $bog_gamengine_nav_grid;
        grid.tile(tile);
        return grid;
    }
    function length(path, count) {
        let sum = 0;
        for (let i = 1; i < count; ++i) {
            sum += Math.hypot(path[i * 2] - path[i * 2 - 2], path[i * 2 + 1] - path[i * 2 - 1]);
        }
        return sum;
    }
    $mol_test({
        'wall between points gives detour longer than straight line and outside the wall'() {
            const nav = grid('#######\n#..#..#\n#..#..#\n#.....#\n#######');
            const out = new Float32Array(64);
            const count = nav.path(new Float32Array([1.5, -1.5, 0]), new Float32Array([5.5, -1.5, 0]), out);
            $mol_assert_ok(count > 2);
            $mol_assert_ok(length(out, count) > 4);
            for (let i = 0; i < count; ++i)
                $mol_assert_not(nav.solid_at(out[i * 2], out[i * 2 + 1]));
        },
        'shifted grid takes and gives world points of the shifted map'() {
            const nav = grid('#######\n#..#..#\n#..#..#\n#.....#\n#######');
            nav.tile().origin([10, -20]);
            $mol_assert_equal(nav.solid_at(11.5, -21.5), false);
            $mol_assert_equal(nav.solid_at(13.5, -21.5), true);
            $mol_assert_equal(nav.solid_at(1.5, -1.5), true);
            const out = new Float32Array(64);
            const count = nav.path(new Float32Array([11.5, -21.5, 0]), new Float32Array([15.5, -21.5, 0]), out);
            $mol_assert_ok(count > 2);
            $mol_assert_ok(length(out, count) > 4);
            for (let i = 0; i < count; ++i)
                $mol_assert_not(nav.solid_at(out[i * 2], out[i * 2 + 1]));
            $mol_assert_equal([out[0], out[1]], [11.5, -21.5]);
            $mol_assert_equal([out[count * 2 - 2], out[count * 2 - 1]], [15.5, -21.5]);
        },
        'path off the shifted map gives zero'() {
            const nav = grid('#######\n#..#..#\n#..#..#\n#.....#\n#######');
            nav.tile().origin([10, -20]);
            const out = new Float32Array(64);
            $mol_assert_equal(nav.path(new Float32Array([1.5, -1.5, 0]), new Float32Array([15.5, -21.5, 0]), out), 0);
        },
        'unreachable target gives zero'() {
            const nav = grid('#######\n#..#..#\n#..#..#\n#..#..#\n#######');
            const out = new Float32Array(64);
            const count = nav.path(new Float32Array([1.5, -1.5, 0]), new Float32Array([5.5, -1.5, 0]), out);
            $mol_assert_equal(count, 0);
        },
        'smooth on empty map gives two points'() {
            const nav = grid('########\n#......#\n#......#\n#......#\n#......#\n########');
            const out = new Float32Array(64);
            const count = nav.path(new Float32Array([1.5, -1.5, 0]), new Float32Array([6.5, -4.5, 0]), out);
            $mol_assert_ok(count > 2);
            const smooth = nav.smooth(out, count, out);
            $mol_assert_equal(smooth, 2);
            $mol_assert_equal(out[2], 6.5);
            $mol_assert_equal(out[3], -4.5);
        },
        'diagonal path does not cut wall corner'() {
            const nav = grid('#####\n#.#.#\n#...#\n#####');
            const out = new Float32Array(64);
            const count = nav.path(new Float32Array([1.5, -1.5, 0]), new Float32Array([3.5, -1.5, 0]), out);
            $mol_assert_equal(count, 5);
            $mol_assert_equal(out[2], 1.5);
            $mol_assert_equal(out[3], -2.5);
            $mol_assert_equal(out[6], 3.5);
            $mol_assert_equal(out[7], -2.5);
        },
        'dynamic block changes the path'() {
            const nav = grid('#####\n#...#\n#...#\n#####');
            const out = new Float32Array(64);
            const from = new Float32Array([1.5, -1.5, 0]);
            const to = new Float32Array([3.5, -1.5, 0]);
            $mol_assert_equal(nav.path(from, to, out), 3);
            nav.block(2, 1, true);
            $mol_assert_equal(nav.path(from, to, out), 5);
            nav.block(2, 1, false);
            $mol_assert_equal(nav.path(from, to, out), 3);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function rect(x0, z0, x1, z1) {
        return new Float32Array([x0, z0, x1, z0, x1, z1, x0, z1]);
    }
    function length(path, count) {
        let sum = 0;
        for (let i = 1; i < count; ++i) {
            sum += Math.hypot(path[i * 3] - path[i * 3 - 3], path[i * 3 + 2] - path[i * 3 - 1]);
        }
        return sum;
    }
    $mol_test({
        'two rectangles with common edge give path through the edge'() {
            const mesh = new $bog_gamengine_nav_mesh;
            mesh.polys([rect(0, 0, 1, 1), rect(1, 0, 2, 1)]);
            $mol_assert_equal(mesh.build(), 1);
            const out = new Float32Array(30);
            const count = mesh.path(new Float32Array([0.5, 0, 0.5]), new Float32Array([1.5, 0, 0.5]), out);
            $mol_assert_equal(count, 2);
            $mol_assert_equal(out[0], 0.5);
            $mol_assert_equal(out[3], 1.5);
            $mol_assert_equal(out[5], 0.5);
        },
        'funnel on L corridor of three rectangles gives start corner and finish'() {
            const mesh = new $bog_gamengine_nav_mesh;
            mesh.polys([rect(0, 0, 1, 2), rect(0, 2, 1, 3), rect(1, 2, 3, 3)]);
            $mol_assert_equal(mesh.build(), 2);
            const out = new Float32Array(30);
            const count = mesh.path(new Float32Array([0.5, 0, 0.5]), new Float32Array([2.5, 0, 2.5]), out);
            $mol_assert_equal(count, 3);
            $mol_assert_equal(out[3], 1);
            $mol_assert_equal(out[5], 2);
            $mol_assert_equal(out[6], 2.5);
            $mol_assert_equal(out[8], 2.5);
        },
        'from_tile of 5x5 map with one wall gives several polygons and detour'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map('.....\n.....\n..#..\n.....\n.....');
            const mesh = new $bog_gamengine_nav_mesh;
            mesh.from_tile(tile, 1);
            $mol_assert_ok(mesh.polys().length > 1);
            const out = new Float32Array(30);
            const count = mesh.path(new Float32Array([2.5, 0, 0.5]), new Float32Array([2.5, 0, 4.5]), out);
            $mol_assert_ok(count > 2);
            $mol_assert_ok(length(out, count) > 4);
            $mol_assert_equal(out[1], 1);
            for (let i = 0; i < count; ++i) {
                const inside = out[i * 3] > 2 && out[i * 3] < 3 && out[i * 3 + 2] > 2 && out[i * 3 + 2] < 3;
                $mol_assert_not(inside);
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'agent reaches target behind wall within 3 seconds never entering a wall'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map('#######\n#..#..#\n#..#..#\n#.....#\n#######');
            const grid = new $bog_gamengine_nav_grid;
            grid.tile(tile);
            const agent = new $bog_gamengine_nav_agent;
            agent.grid(grid);
            agent.pos(new Float32Array([1.5, -1.5, 0]));
            const target = new Float32Array([5.5, -1.5, 0]);
            agent.target(target);
            for (let i = 0; i < 180; ++i) {
                agent.step(1 / 60);
                const pos = agent.pos();
                $mol_assert_not(tile.solid_at(pos[0], pos[1]));
            }
            const pos = agent.pos();
            $mol_assert_ok(Math.hypot(pos[0] - target[0], pos[1] - target[1]) < agent.radius());
        },
        'goal set once keeps moving the agent on the next frame'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map('#####\n#...#\n#...#\n#...#\n#####');
            const grid = new $bog_gamengine_nav_grid;
            grid.tile(tile);
            const agent = new $bog_gamengine_nav_agent;
            agent.grid(grid);
            agent.pos(new Float32Array([1.5, -1.5, 0]));
            agent.aim(3.5, -1.5);
            agent.step(1 / 60);
            const first = agent.pos()[0];
            agent.step(1 / 60);
            $mol_assert_ok(first > 1.5);
            $mol_assert_ok(agent.pos()[0] > first);
            $mol_assert_equal(agent.target(), agent.goal);
        },
        'stop drops the goal and the route'() {
            const agent = new $bog_gamengine_nav_agent;
            agent.aim(3.5, -1.5);
            agent.stop();
            $mol_assert_equal(agent.target(), null);
            $mol_assert_equal(agent.path_count(), 0);
        },
        'agents push each other apart'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map('#####\n#...#\n#...#\n#...#\n#####');
            const grid = new $bog_gamengine_nav_grid;
            grid.tile(tile);
            const a = new $bog_gamengine_nav_agent;
            const b = new $bog_gamengine_nav_agent;
            a.grid(grid);
            b.grid(grid);
            a.pos(new Float32Array([2.4, -2.5, 0]));
            b.pos(new Float32Array([2.6, -2.5, 0]));
            a.others([a, b]);
            b.others([a, b]);
            a.target(new Float32Array([2.5, -2.5, 0]));
            b.target(new Float32Array([2.5, -2.5, 0]));
            for (let i = 0; i < 30; ++i) {
                a.step(1 / 60);
                b.step(1 / 60);
            }
            $mol_assert_ok(b.pos()[0] - a.pos()[0] > 0.2);
        },
        'goal of an agent is set through props and survives a snapshot'() {
            const agent = new $bog_gamengine_nav_agent;
            const prop = (name) => agent.props().find(one => one.name === name);
            $mol_assert_equal(prop('target').kind, 'point');
            $mol_assert_equal(prop('aimed').kind, 'flag');
            $mol_assert_equal(prop('aimed').get(), false);
            prop('target').set(new Float32Array([4.5, -2.5, 0]));
            $mol_assert_equal([...prop('target').get()], [4.5, -2.5, 0]);
            $mol_assert_equal(prop('aimed').get(), true);
            $mol_assert_equal(agent.target(), agent.goal);
            const snap = [new Float32Array(prop('target').get()), prop('aimed').get()];
            agent.aim(9, 9);
            prop('target').set(snap[0]);
            prop('aimed').set(snap[1]);
            $mol_assert_equal([...agent.goal], [4.5, -2.5, 0]);
            $mol_assert_equal(agent.goal_on, true);
        },
        'restored snapshot of an agent without a goal leaves it without a goal'() {
            const agent = new $bog_gamengine_nav_agent;
            const prop = (name) => agent.props().find(one => one.name === name);
            const snap = [new Float32Array(prop('target').get()), prop('aimed').get()];
            agent.aim(3, -3);
            $mol_assert_equal(agent.goal_on, true);
            prop('target').set(snap[0]);
            prop('aimed').set(snap[1]);
            $mol_assert_equal(agent.goal_on, false);
            $mol_assert_equal(agent.target(), null);
        },
        'neighbours of an agent are a property of node kind'() {
            const agent = new $bog_gamengine_nav_agent;
            const mate = new $bog_gamengine_nav_agent;
            const prop = agent.props().find(one => one.name === 'others');
            $mol_assert_equal(prop.kind, 'nodes');
            $mol_assert_equal(prop.get().length, 0);
            prop.set([mate]);
            $mol_assert_equal(agent.others(), [mate]);
            $mol_assert_equal(prop.get()[0], mate);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'without a canvas the font gives no glyphs'() {
            const font = new $bog_gamengine_text_font;
            $mol_assert_equal(font.sources().length, 0);
        },
        'without a canvas every char advances by 0.6 of the square'() {
            const font = new $bog_gamengine_text_font;
            $mol_assert_equal(font.advance('a'), 0.6);
            $mol_assert_equal(font.advance('Ж'), 0.6);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_text_test_atlas(names) {
        const atlas = new $bog_gamengine_atlas;
        atlas.sources(names.map(name => ({ name, image: { width: 64, height: 64 } })));
        return atlas;
    }
    function $bog_gamengine_text_test_make(value, align = 'left') {
        const text = new $bog_gamengine_text;
        text.atlas($bog_gamengine_text_test_atlas(['a', 'b']));
        text.value(value);
        text.height(0.5);
        text.align(align);
        return text;
    }
    function $bog_gamengine_text_test_round(value) {
        return Math.round(value * 1e6) / 1e6;
    }
    function $bog_gamengine_text_test_other(kind, was) {
        if (kind === 'vec3' || kind === 'euler')
            return [1, 2, 3];
        if (kind === 'vec4')
            return [0.25, 0.5, 0.75, 1];
        if (kind === 'number')
            return Number(was) + 1;
        if (kind === 'flag')
            return !was;
        if (kind === 'text')
            return was === 'center' ? 'right' : 'center';
        if (kind === 'node')
            return null;
        return null;
    }
    $mol_test({
        'string of two chars gives two glyphs'() {
            const text = $bog_gamengine_text_test_make('ab');
            $mol_assert_equal(text.pool().count, 2);
        },
        'second glyph is shifted by advance of the first'() {
            const text = $bog_gamengine_text_test_make('ab');
            const trans = text.pool().trans;
            const shift = trans[16 + 12] - trans[12];
            $mol_assert_equal($bog_gamengine_text_test_round(shift), text.font().advance('a') * text.height());
        },
        'align center spreads the string around the node'() {
            const text = $bog_gamengine_text_test_make('ab', 'center');
            const trans = text.pool().trans;
            $mol_assert_equal($bog_gamengine_text_test_round(trans[12] + trans[16 + 12]), 0);
        },
        'space takes width but gives no glyph'() {
            const text = $bog_gamengine_text_test_make('a b');
            $mol_assert_equal(text.pool().count, 2);
            $mol_assert_equal(text.width(), $bog_gamengine_text_test_make('ab').width() + 0.6 * 0.5);
        },
        'layer of a glyph is its layer in the atlas'() {
            const text = $bog_gamengine_text_test_make('ba');
            const layer = text.pool().layer;
            $mol_assert_equal(layer[0], 1);
            $mol_assert_equal(layer[1], 0);
        },
        'pool follows the value without a manual emit'() {
            const text = $bog_gamengine_text_test_make('ab');
            $mol_assert_equal(text.pool().count, 2);
            text.value('aba');
            $mol_assert_equal(text.pool().count, 3);
        },
        'every drawing prop of the text is watched, and the idle ones are named'() {
            const idle = ['role', 'tint'];
            const known = new $bog_gamengine_text().props().map(prop => prop.name);
            $mol_assert_equal(known, ['pos', 'rot', 'scale', 'tint', 'role', 'value', 'height', 'align', 'color', 'billboard']);
            for (const name of known) {
                const text = $bog_gamengine_text_test_make('ab');
                const prop = text.props().find(one => one.name === name);
                const version = text.pool().version;
                prop.set($bog_gamengine_text_test_other(prop.kind, prop.get()));
                text.emit();
                if (idle.includes(name))
                    $mol_assert_equal(text.pool().version, version);
                else
                    $mol_assert_equal(text.pool().version > version, true);
            }
        },
        'billboard glyph axes are the camera basis under pitch and under roll'() {
            for (const rot of [[-Math.PI / 4, 0, 0], [0, 0, Math.PI / 6], [-0.3, 0.7, 0.2]]) {
                const text = $bog_gamengine_text_test_make('a');
                text.height(1);
                const cam = new $bog_gamengine_cam;
                const scene = new $bog_gamengine_scene;
                scene.cam(cam);
                scene.kids([text]);
                text.billboard(true);
                cam.scale(new Float32Array([2, 2, 2]));
                cam.rot(new Float32Array(rot));
                const view = cam.world();
                const trans = text.pool().trans;
                for (let c = 0; c < 3; ++c) {
                    const x = view[c * 4];
                    const y = view[c * 4 + 1];
                    const z = view[c * 4 + 2];
                    const k = 1 / Math.sqrt(x * x + y * y + z * z);
                    $mol_assert_equal($bog_gamengine_text_test_round(trans[c * 4]), $bog_gamengine_text_test_round(x * k));
                    $mol_assert_equal($bog_gamengine_text_test_round(trans[c * 4 + 1]), $bog_gamengine_text_test_round(y * k));
                    $mol_assert_equal($bog_gamengine_text_test_round(trans[c * 4 + 2]), $bog_gamengine_text_test_round(z * k));
                    const len = Math.hypot(trans[c * 4], trans[c * 4 + 1], trans[c * 4 + 2]);
                    $mol_assert_ok(Math.abs(len - 1) < 1e-5);
                }
            }
        },
        'camera tipped in pitch redraws a billboard string though its own world stays'() {
            const text = $bog_gamengine_text_test_make('ab');
            const cam = new $bog_gamengine_cam;
            const scene = new $bog_gamengine_scene;
            scene.cam(cam);
            scene.kids([text]);
            text.billboard(true);
            cam.rot(new Float32Array([0, 0, 0]));
            const version = text.pool().version;
            const world = [...text.world()];
            const was = $bog_gamengine_text_test_round(text.pool().trans[6]);
            cam.rot(new Float32Array([Math.PI / 4, 0, 0]));
            $mol_assert_equal([...text.world()], world);
            text.emit();
            $mol_assert_equal(text.pool_own().version > version, true);
            $mol_assert_equal($bog_gamengine_text_test_round(text.pool_own().trans[6]) === was, false);
        },
        'font edited in place redraws the string without being swapped'() {
            const text = $bog_gamengine_text_test_make('ab');
            const font = text.font();
            font.family('sans-serif');
            font.size(64);
            const version = text.pool().version;
            font.size(32);
            text.emit();
            $mol_assert_equal(text.pool_own().version > version, true);
            const after = text.pool_own().version;
            font.family('serif');
            text.emit();
            $mol_assert_equal(text.pool_own().version > after, true);
            const last = text.pool_own().version;
            font.chars('ab');
            text.emit();
            $mol_assert_equal(text.pool_own().version > last, true);
        },
        'swapped font and swapped atlas both redraw the string'() {
            const text = $bog_gamengine_text_test_make('ab');
            const version = text.pool().version;
            text.atlas($bog_gamengine_text_test_atlas(['b', 'a']));
            text.emit();
            $mol_assert_equal(text.pool().version > version, true);
            const after = text.pool().version;
            const font = new $bog_gamengine_text_font;
            font.family('serif');
            text.font(font);
            text.emit();
            $mol_assert_equal(text.pool().version > after, true);
        },
        'pool version grows only when the input changes'() {
            const text = $bog_gamengine_text_test_make('ab');
            const version = text.pool().version;
            text.emit();
            text.emit();
            $mol_assert_equal(text.pool().version, version);
            text.value('ba');
            $mol_assert_equal(text.pool().version, version + 1);
        },
        'aabb covers the quad of every glyph'() {
            const text = $bog_gamengine_text_test_make('ab');
            const pool = text.pool();
            const half = text.height() / 2;
            for (let i = 0; i < pool.count; ++i) {
                const x = pool.trans[i * 16 + 12];
                const y = pool.trans[i * 16 + 13];
                $mol_assert_ok(pool.aabb[i * 6] <= x - half);
                $mol_assert_ok(pool.aabb[i * 6 + 1] <= y - half);
                $mol_assert_ok(pool.aabb[i * 6 + 3] >= x + half);
                $mol_assert_ok(pool.aabb[i * 6 + 4] >= y + half);
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'vert and frag have main'($) {
            const shader = new $bog_gamengine_shader_skin;
            $mol_assert_ok(shader.vert().includes('main'));
            $mol_assert_ok(shader.frag().includes('main'));
        },
        'bones come as a plain sampler and joints with weights as inputs'($) {
            const face = new $bog_gamengine_shader_skin().face();
            $mol_assert_equal(face.glob.bones, 'sampler2D');
            $mol_assert_equal(face.input.joints, 'vec4');
            $mol_assert_equal(face.input.weights, 'vec4');
        },
        'vert fetches four bone rows and mixes them by weights'($) {
            const vert = new $bog_gamengine_shader_skin().vert();
            $mol_assert_ok(vert.includes('texelFetch( bones, ivec2( 0, at ), 0 )'));
            $mol_assert_ok(vert.includes('texelFetch( bones, ivec2( 3, at ), 0 )'));
            $mol_assert_ok(vert.includes('bone( joints.w ) * weights.w'));
            $mol_assert_not(vert.includes('break'));
        },
        'skin keeps the solid input locations and puts its own after them'($) {
            const skin = new $bog_gamengine_shader_skin();
            const solid = new $bog_gamengine_shader_solid();
            const source = $bog_gamengine_gl_source(skin.face(), skin.vert(), skin.frag()).vert;
            const before = $bog_gamengine_gl_source(solid.face(), solid.vert(), solid.frag()).vert;
            for (const name in solid.face().input) {
                const line = before.split('\n').find(row => row.endsWith(` ${name};`));
                $mol_assert_ok(source.includes(line));
            }
            $mol_assert_ok(source.includes('layout( location = 12 ) in vec4 joints;'));
            $mol_assert_ok(source.includes('layout( location = 13 ) in vec4 weights;'));
            $mol_assert_ok(source.includes('uniform sampler2D bones;'));
        },
        'skin keeps the solid pipe, output and depth'($) {
            const skin = new $bog_gamengine_shader_skin();
            const solid = new $bog_gamengine_shader_solid();
            $mol_assert_equal(Object.keys(skin.face().pipe), Object.keys(solid.face().pipe));
            $mol_assert_equal(Object.keys(skin.face().output), Object.keys(solid.face().output));
            $mol_assert_equal(skin.frag(), solid.frag());
            $mol_assert_equal(skin.depth(), true);
        },
        'every pipe name is in both vert and frag'($) {
            const shader = new $bog_gamengine_shader_skin;
            const face = shader.face();
            for (const name in face.pipe) {
                $mol_assert_ok(shader.vert().includes(name));
                $mol_assert_ok(shader.frag().includes(name));
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'both entries have main'($) {
            const shader = new $bog_gamengine_shader_post_vignette;
            $mol_assert_ok(shader.vert().includes('void main()'));
            $mol_assert_ok(shader.frag().includes('void main()'));
        },
        'face keeps source sampler of the base pass'($) {
            const shader = new $bog_gamengine_shader_post_vignette;
            $mol_assert_equal(shader.face().glob.source, 'sampler2D');
        },
        'frag dims by the distance from the middle'($) {
            const frag = new $bog_gamengine_shader_post_vignette().frag();
            $mol_assert_ok(frag.includes('vec2( 0.5 )'));
            $mol_assert_ok(frag.includes('smoothstep'));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function screen_stub() {
        const calls = [];
        const handlers = {};
        const target = {
            requestPointerLock() {
                calls.push('lock');
                return Promise.resolve();
            },
        };
        const doc = {
            fullscreenElement: null,
            pointerLockElement: null,
            documentElement: {
                requestFullscreen() {
                    calls.push('request');
                    return Promise.resolve();
                },
            },
            exitFullscreen() {
                calls.push('exit');
                return Promise.resolve();
            },
            exitPointerLock() { },
            addEventListener(name, handler) {
                handlers[name] = handler;
            },
            removeEventListener() { },
        };
        const screen = new $bog_gamengine_screen;
        screen.$ = $$.$mol_ambient({ $mol_dom_context: { document: doc } });
        screen.target(target);
        return { screen, doc, calls, handlers, target };
    }
    function settle() {
        return new Promise(done => setTimeout(done));
    }
    $mol_test({
        async 'fullscreen on requests document element after tick'() {
            const { screen, calls } = screen_stub();
            screen.fullscreen(true);
            $mol_assert_equal(calls, []);
            await settle();
            $mol_assert_equal(calls, ['request']);
        },
        async 'fullscreen off exits after tick'() {
            const { screen, doc, calls } = screen_stub();
            doc.fullscreenElement = doc.documentElement;
            screen.fullscreen(false);
            await settle();
            $mol_assert_equal(calls, ['exit']);
        },
        async 'lock on requests pointer lock of the target after tick'() {
            const { screen, calls } = screen_stub();
            screen.lock(true);
            $mol_assert_equal(calls, []);
            await settle();
            $mol_assert_equal(calls, ['lock']);
        },
        'fullscreenchange syncs the flag'() {
            const { screen, doc, handlers } = screen_stub();
            $mol_assert_equal(screen.fullscreen(), false);
            doc.fullscreenElement = doc.documentElement;
            handlers.fullscreenchange({});
            $mol_assert_equal(screen.fullscreen(), true);
        },
        'mousemove while locked accumulates movement'() {
            const { screen, doc, handlers, target } = screen_stub();
            screen.lock(true);
            doc.pointerLockElement = target;
            handlers.mousemove({ movementX: 3, movementY: -2 });
            handlers.mousemove({ movementX: 4, movementY: 1 });
            $mol_assert_equal(screen.dx, 7);
            $mol_assert_equal(screen.dy, -1);
        },
        'mousemove without lock is ignored'() {
            const { screen, handlers } = screen_stub();
            screen.lock(true);
            handlers.mousemove({ movementX: 3, movementY: 2 });
            $mol_assert_equal(screen.dx, 0);
            $mol_assert_equal(screen.dy, 0);
        },
        'take returns movement and zeroes it'() {
            const { screen, doc, handlers, target } = screen_stub();
            screen.lock(true);
            doc.pointerLockElement = target;
            handlers.mousemove({ movementX: 5, movementY: -3 });
            const out = new Float32Array(2);
            $mol_assert_equal(screen.take(out), out);
            $mol_assert_equal(Array.from(out), [5, -3]);
            $mol_assert_equal(Array.from(screen.take(out)), [0, 0]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'skinned mesh takes its shape from the skin'($) {
            const shape = $bog_gamengine_shape_gltf.make({ $, skeleton: () => null, geometry: () => new Float32Array(9) });
            const skin = new $bog_gamengine_skin;
            skin.shape(shape);
            const mesh = new $bog_gamengine_mesh_skin;
            mesh.skin(skin);
            $mol_assert_equal(mesh.shape(), shape);
        },
        'every skinned mesh gets its own shader, so it gets its own batch'($) {
            const one = new $bog_gamengine_mesh_skin;
            const two = new $bog_gamengine_mesh_skin;
            $mol_assert_ok(one.shader() instanceof $bog_gamengine_shader_skin);
            $mol_assert_not(one.shader() === two.shader());
        },
        'batch of one skinned node gives its bones'($) {
            const skin = new $bog_gamengine_skin;
            const mesh = new $bog_gamengine_mesh_skin;
            mesh.skin(skin);
            $mol_assert_equal($bog_gamengine_skin_bones({ nodes: () => [mesh] }), skin.pose());
            $mol_assert_equal($bog_gamengine_skin_bones({ nodes: () => [mesh, mesh] }), null);
            $mol_assert_equal($bog_gamengine_skin_bones({ nodes: () => [new $bog_gamengine_mesh] }), null);
        },
        'step moves the skin time'($) {
            const clips = new Map([
                ['go', { name: 'go', duration: 2, channels: [] }],
            ]);
            const shape = $bog_gamengine_shape_gltf.make({ $, skeleton: () => null, clips: () => clips });
            const skin = new $bog_gamengine_skin;
            skin.shape(shape);
            skin.clip('go');
            const mesh = new $bog_gamengine_mesh_skin;
            mesh.skin(skin);
            mesh.step(0.5);
            $mol_assert_equal(skin.time(), 0.5);
        },
        'sphere of the culler holds every corner of the box in every state'() {
            for (const over of $bog_gamengine_node_reach_states) {
                const node = new $bog_gamengine_mesh_skin;
                if (over.size)
                    node.size(new Float32Array(over.size.slice(0, 3)));
                if (over.scale)
                    node.scale(new Float32Array(over.scale));
                if (over.rot)
                    node.rot(new Float32Array(over.rot));
                const sphere = node.radius() * $bog_gamengine_batch_scale_max(node.world());
                $mol_assert_ok(sphere + 1e-6 >= $bog_gamengine_node_reach(node));
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function walker_test_key(...held) {
        const key = new $bog_gamengine_key;
        key.bind({
            forward: ['W'],
            back: ['S'],
            left: ['A'],
            right: ['D'],
            turn_left: ['Q'],
            turn_right: ['E'],
        });
        for (const name of held)
            key.pressed(name, true);
        return key;
    }
    function walker_test_walker(key, tile = null) {
        const input = new $bog_gamengine_input;
        input.key(key);
        const walker = new $bog_gamengine_demo_room_walker;
        walker.input(input);
        walker.tile(tile);
        return walker;
    }
    function walker_test_screen() {
        const doc = {
            fullscreenElement: null,
            pointerLockElement: null,
            documentElement: {},
            addEventListener() { },
            removeEventListener() { },
        };
        const screen = new $bog_gamengine_screen;
        screen.$ = $$.$mol_ambient({ $mol_dom_context: { document: doc } });
        return screen;
    }
    function walker_test_tile() {
        const tile = new $bog_gamengine_phys_tile;
        tile.map([
            '#####',
            '#...#',
            '#...#',
            '#####',
        ].join('\n'));
        tile.plane('xz');
        return tile;
    }
    $mol_test({
        'forward for a second walks speed units along minus z'() {
            const walker = walker_test_walker(walker_test_key('W'));
            walker.step(1);
            $mol_assert_equal([...walker.pos()], [0, 0, -walker.speed()]);
        },
        'right strafes along plus x'() {
            const walker = walker_test_walker(walker_test_key('D'));
            walker.step(1);
            $mol_assert_equal([...walker.pos()], [walker.speed(), 0, 0]);
        },
        'turn left grows yaw and forward follows it'() {
            const walker = walker_test_walker(walker_test_key('Q', 'W'));
            walker.turn(Math.PI / 2);
            walker.step(1);
            const pos = walker.pos();
            $mol_assert_ok(Math.abs(walker.rot()[1] - Math.PI / 2) < 1e-6);
            $mol_assert_ok(Math.abs(pos[0] + walker.speed()) < 1e-6);
            $mol_assert_ok(Math.abs(pos[2]) < 1e-6);
        },
        'no keys held keeps pos reference'() {
            const walker = walker_test_walker(walker_test_key());
            const pos = walker.pos();
            walker.step(1);
            $mol_assert_equal(walker.pos(), pos);
        },
        'mouse right turns right and mouse down looks down'() {
            const walker = walker_test_walker(walker_test_key());
            const screen = walker_test_screen();
            walker.screen(screen);
            walker.sense(0.01);
            screen.dx = 10;
            screen.dy = 4;
            walker.step(1);
            const rot = walker.rot();
            $mol_assert_ok(Math.abs(rot[1] + 0.1) < 1e-6);
            $mol_assert_ok(Math.abs(rot[0] + 0.04) < 1e-6);
            walker.step(1);
            $mol_assert_equal(walker.rot(), rot);
        },
        'mouse look forward follows the new yaw'() {
            const walker = walker_test_walker(walker_test_key('W'));
            const screen = walker_test_screen();
            walker.screen(screen);
            walker.sense(Math.PI / 2);
            screen.dx = -1;
            walker.step(1);
            const pos = walker.pos();
            $mol_assert_ok(Math.abs(walker.rot()[1] - Math.PI / 2) < 1e-6);
            $mol_assert_ok(Math.abs(pos[0] + walker.speed()) < 1e-6);
            $mol_assert_ok(Math.abs(pos[2]) < 1e-6);
        },
        'pitch stops just short of straight down'() {
            const walker = walker_test_walker(walker_test_key());
            const screen = walker_test_screen();
            walker.screen(screen);
            walker.sense(0.01);
            screen.dy = 1000;
            walker.step(1);
            $mol_assert_ok(Math.abs(walker.rot()[0] + Math.PI / 2) < 1e-2);
            $mol_assert_ok(walker.rot()[0] > -Math.PI / 2);
        },
        'wall ahead stops at its face with radius'() {
            const walker = walker_test_walker(walker_test_key('W'), walker_test_tile());
            walker.radius(0.25);
            walker.speed(2);
            walker.pos(new Float32Array([2.5, 0.5, 2.75]));
            for (let i = 0; i < 8; ++i)
                walker.step(0.125);
            $mol_assert_equal([...walker.pos()], [2.5, 0.5, 1.25]);
        },
        'wall of a shifted room stops the walker at its face'() {
            const tile = walker_test_tile();
            tile.origin([40, 60]);
            const walker = walker_test_walker(walker_test_key('W'), tile);
            walker.radius(0.25);
            walker.speed(2);
            walker.pos(new Float32Array([42.5, 0.5, 62.75]));
            for (let i = 0; i < 8; ++i)
                walker.step(0.125);
            $mol_assert_equal([...walker.pos()], [42.5, 0.5, 61.25]);
        },
        'wall aside slides along it'() {
            const walker = walker_test_walker(walker_test_key('W', 'A'), walker_test_tile());
            walker.radius(0.25);
            walker.speed(2);
            walker.pos(new Float32Array([1.25, 0.5, 2.75]));
            walker.step(0.125);
            $mol_assert_equal([...walker.pos()], [1.25, 0.5, 2.5]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'lines array lengths follow points'($) {
            const lines = $bog_gamengine_shape_lines.make({ $ });
            lines.points(new Float32Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0]));
            $mol_assert_equal(lines.geometry().length, 12);
            $mol_assert_equal(lines.size(), 4);
            $mol_assert_equal(lines.count(), 2);
            $mol_assert_equal(lines.normals().length, 12);
            $mol_assert_equal(lines.skin().length, 8);
        },
        'count cuts the drawn vertices and keeps the buffers'($) {
            const lines = $bog_gamengine_shape_lines.make({ $ });
            lines.points(new Float32Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0]));
            lines.count(1);
            $mol_assert_equal(lines.size(), 2);
            $mol_assert_equal(lines.geometry().length, 12);
            $mol_assert_equal(lines.normals().length, 12);
        },
        'count over the points draws no more than there are'($) {
            const lines = $bog_gamengine_shape_lines.make({ $ });
            lines.points(new Float32Array([0, 0, 0, 1, 0, 0]));
            lines.count(5);
            $mol_assert_equal(lines.size(), 2);
        },
        'lines normals and skin are zeros'($) {
            const lines = $bog_gamengine_shape_lines.make({ $ });
            lines.points(new Float32Array([0, 0, 0, 1, 1, 1]));
            for (const value of lines.normals())
                $mol_assert_equal(value, 0);
            for (const value of lines.skin())
                $mol_assert_equal(value, 0);
        },
        'lines mode is lines and empty by default'($) {
            const lines = $bog_gamengine_shape_lines.make({ $ });
            $mol_assert_equal(lines.mode(), 'lines');
            $mol_assert_equal(lines.size(), 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'points of two sphere-plane contacts give 12 numbers with normals of 0.2'() {
            const world = new $bog_gamengine_phys3;
            world.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3));
            world.add($bog_gamengine_phys3.shape_sphere, new Float32Array([0.5, 0, 0]), 1, new Float32Array([-2, 0.4, 0]));
            world.add($bog_gamengine_phys3.shape_sphere, new Float32Array([0.5, 0, 0]), 1, new Float32Array([2, 0.4, 0]));
            world.step(1 / 60);
            $mol_assert_equal(world.narrow.contact_count, 2);
            const debug = new $bog_gamengine_phys3_debug;
            debug.phys3(world);
            const points = debug.points();
            $mol_assert_equal(points.length, 12);
            for (let i = 0; i < 2; ++i) {
                const o = i * 6;
                const len = Math.hypot(points[o + 3] - points[o], points[o + 4] - points[o + 1], points[o + 5] - points[o + 2]);
                $mol_assert_ok(Math.abs(len - 0.2) < 1e-6);
            }
        },
        'points keep the buffer when contacts do not grow'() {
            const world = new $bog_gamengine_phys3;
            world.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3));
            world.add($bog_gamengine_phys3.shape_sphere, new Float32Array([0.5, 0, 0]), 1, new Float32Array([0, 0.4, 0]));
            world.step(1 / 60);
            const debug = new $bog_gamengine_phys3_debug;
            debug.phys3(world);
            const first = debug.points();
            world.step(1 / 60);
            $mol_assert_equal(debug.points(), first);
        },
        'points without a world are empty'() {
            const debug = new $bog_gamengine_phys3_debug;
            $mol_assert_equal(debug.points().length, 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function cast_test_world() {
        return new $bog_gamengine_phys3;
    }
    function cast_test_add(world, shape, sx, sy, sz, x, y, z, rot) {
        return world.index_of(world.add(shape, new Float32Array([sx, sy, sz]), 0, new Float32Array([x, y, z]), rot));
    }
    function cast_test_ray(world, ox, oy, oz, dx, dy, dz, opts) {
        const out = new Float32Array(7);
        const i = new $bog_gamengine_phys3_cast().ray(world, new Float32Array([ox, oy, oz]), new Float32Array([dx, dy, dz]), 100, out, opts);
        return { i, out };
    }
    function cast_test_near(actual, expected) {
        if (!(Math.abs(actual - expected) < 1e-3))
            $mol_fail(new Error(`${actual} is not near ${expected}`));
    }
    function cast_test_hit(out, t, px, py, pz, nx, ny, nz) {
        cast_test_near(out[0], t);
        cast_test_near(out[1], px);
        cast_test_near(out[2], py);
        cast_test_near(out[3], pz);
        cast_test_near(out[4], nx);
        cast_test_near(out[5], ny);
        cast_test_near(out[6], nz);
    }
    $mol_test({
        'ray hits sphere at its near surface'() {
            const world = cast_test_world();
            cast_test_add(world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -5);
            const { i, out } = cast_test_ray(world, 0, 0, 0, 0, 0, -1);
            $mol_assert_equal(i, 0);
            cast_test_hit(out, 4, 0, 0, -4, 0, 0, 1);
        },
        'ray hits box face with face normal'() {
            const world = cast_test_world();
            cast_test_add(world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 3, 0, 0);
            const { i, out } = cast_test_ray(world, 0, 0.2, 0.1, 1, 0, 0);
            $mol_assert_equal(i, 0);
            cast_test_hit(out, 2.5, 2.5, 0.2, 0.1, -1, 0, 0);
        },
        'ray past box misses'() {
            const world = cast_test_world();
            cast_test_add(world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 3, 0, 0);
            $mol_assert_equal(cast_test_ray(world, 0, 0.7, 0, 1, 0, 0).i, -1);
            $mol_assert_equal(cast_test_ray(world, 0, 0, 0, -1, 0, 0).i, -1);
        },
        'ray hits rotated box on its tilted face'() {
            const world = cast_test_world();
            const rot = $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array([0, 1, 0]), Math.PI / 4);
            cast_test_add(world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 3, 0, 0, rot);
            const { i, out } = cast_test_ray(world, 0, 0, 0.1, 1, 0, 0);
            $mol_assert_equal(i, 0);
            cast_test_near(out[0], 3.1 - Math.SQRT1_2);
            cast_test_near(out[4], -Math.SQRT1_2);
            cast_test_near(out[5], 0);
            cast_test_near(out[6], Math.SQRT1_2);
        },
        'ray hits capsule side'() {
            const world = cast_test_world();
            cast_test_add(world, $bog_gamengine_phys3.shape_capsule, 0.5, 1, 0, 0, 0.5, -4);
            const { i, out } = cast_test_ray(world, 0, 0, 0, 0, 0, -1);
            $mol_assert_equal(i, 0);
            cast_test_hit(out, 3.5, 0, 0, -3.5, 0, 0, 1);
        },
        'ray hits capsule cap'() {
            const world = cast_test_world();
            cast_test_add(world, $bog_gamengine_phys3.shape_capsule, 0.5, 1, 0, 0, 0, -4);
            const { i, out } = cast_test_ray(world, 0, 3, -4, 0, -1, 0);
            $mol_assert_equal(i, 0);
            cast_test_hit(out, 1.5, 0, 1.5, -4, 0, 1, 0);
        },
        'ray hits plane from above and misses from below'() {
            const world = cast_test_world();
            cast_test_add(world, $bog_gamengine_phys3.shape_plane, 0, 1, 0, 0, 0, 0);
            const { i, out } = cast_test_ray(world, 1, 2, 3, 0, -1, 0);
            $mol_assert_equal(i, 0);
            cast_test_hit(out, 2, 1, 0, 3, 0, 1, 0);
            $mol_assert_equal(cast_test_ray(world, 1, 2, 3, 0, 1, 0).i, -1);
        },
        'ray hits hull tetrahedron on its face'() {
            const world = cast_test_world();
            const i = cast_test_add(world, $bog_gamengine_phys3.shape_hull, 0, 0, 0, 0, 0, 0);
            world.hull_points(i, new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]));
            const hit = cast_test_ray(world, -2, 0.2, 0.2, 1, 0, 0);
            $mol_assert_equal(hit.i, 0);
            cast_test_hit(hit.out, 2, 0, 0.2, 0.2, -1, 0, 0);
            $mol_assert_equal(cast_test_ray(world, -2, 0.6, 0.6, 1, 0, 0).i, -1);
        },
        'ray skips ghost when asked'() {
            const world = cast_test_world();
            const ghost = cast_test_add(world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -3);
            world.flags[ghost] |= $bog_gamengine_phys3.flag_ghost;
            cast_test_add(world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 0, 0, -6);
            $mol_assert_equal(cast_test_ray(world, 0, 0, 0, 0, 0, -1).i, 0);
            const { i, out } = cast_test_ray(world, 0, 0, 0, 0, 0, -1, { skip_ghost: true });
            $mol_assert_equal(i, 1);
            cast_test_near(out[0], 5.5);
        },
        'ray returns nearest of two bodies'() {
            const world = cast_test_world();
            cast_test_add(world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -8);
            cast_test_add(world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -4);
            const { i, out } = cast_test_ray(world, 0, 0, 0, 0, 0, -1);
            $mol_assert_equal(i, 1);
            cast_test_near(out[0], 3);
        },
        'ray with skip index does not see that body'() {
            const world = cast_test_world();
            const near = cast_test_add(world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -3);
            cast_test_add(world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -6);
            $mol_assert_equal(cast_test_ray(world, 0, 0, 0, 0, 0, -1).i, near);
            const { i, out } = cast_test_ray(world, 0, 0, 0, 0, 0, -1, { skip: near });
            $mol_assert_equal(i, 1);
            cast_test_near(out[0], 5);
        },
        'ray with skip list does not see any listed body'() {
            const world = cast_test_world();
            const a = cast_test_add(world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -3);
            const b = cast_test_add(world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -6);
            cast_test_add(world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -9);
            const { i, out } = cast_test_ray(world, 0, 0, 0, 0, 0, -1, { skip: [a, b] });
            $mol_assert_equal(i, 2);
            cast_test_near(out[0], 8);
        },
        'ray hits a body at the place given by move in the same step'() {
            const world = cast_test_world();
            const handle = world.add($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), 0, new Float32Array([0, 0, -4]));
            world.move(handle, new Float32Array([0, 0, -8]));
            const { i, out } = cast_test_ray(world, 0, 0, 0, 0, 0, -1);
            $mol_assert_equal(i, world.index_of(handle));
            cast_test_near(out[0], 7.5);
        },
        'sweep sphere down to plane stops at distance minus radius'() {
            const world = cast_test_world();
            cast_test_add(world, $bog_gamengine_phys3.shape_plane, 0, 1, 0, 0, 0, 0);
            const out = new Float32Array(7);
            const i = new $bog_gamengine_phys3_cast().sweep(world, $bog_gamengine_phys3.shape_sphere, new Float32Array([0.5, 0, 0]), new Float32Array([0, 3, 0]), new Float32Array([0, 0, 0, 1]), new Float32Array([0, -1, 0]), 10, out);
            $mol_assert_equal(i, 0);
            cast_test_hit(out, 2.5, 0, 0, 0, 0, 1, 0);
        },
        'sweep box to box stops face to face'() {
            const world = cast_test_world();
            cast_test_add(world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 4, 0, 0);
            const out = new Float32Array(7);
            const i = new $bog_gamengine_phys3_cast().sweep(world, $bog_gamengine_phys3.shape_box, new Float32Array([0.5, 0.5, 0.5]), new Float32Array([0, 0, 0]), new Float32Array([0, 0, 0, 1]), new Float32Array([1, 0, 0]), 10, out);
            $mol_assert_equal(i, 0);
            cast_test_near(out[0], 3);
            cast_test_near(out[1], 3.5);
            cast_test_near(out[4], -1);
            cast_test_near(out[5], 0);
            cast_test_near(out[6], 0);
        },
        'sweep capsule to box stops with box face normal'() {
            const world = cast_test_world();
            cast_test_add(world, $bog_gamengine_phys3.shape_box, 0.5, 1, 0.5, 0, 1, -4);
            const out = new Float32Array(7);
            const i = new $bog_gamengine_phys3_cast().sweep(world, $bog_gamengine_phys3.shape_capsule, new Float32Array([0.3, 0.6, 0]), new Float32Array([0, 0.9, 0]), new Float32Array([0, 0, 0, 1]), new Float32Array([0, 0, -1]), 10, out);
            $mol_assert_equal(i, 0);
            cast_test_near(out[0], 3.2);
            cast_test_near(out[6], 1);
        },
        'sweep past a body misses'() {
            const world = cast_test_world();
            cast_test_add(world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 4, 0, 0);
            const out = new Float32Array(7);
            const i = new $bog_gamengine_phys3_cast().sweep(world, $bog_gamengine_phys3.shape_sphere, new Float32Array([0.5, 0, 0]), new Float32Array([0, 2, 0]), new Float32Array([0, 0, 0, 1]), new Float32Array([1, 0, 0]), 10, out);
            $mol_assert_equal(i, -1);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'first index read adds body to world'() {
            const world = new $bog_gamengine_phys3;
            const body = new $bog_gamengine_phys3_body;
            body.phys3(world);
            $mol_assert_equal(world.count, 0);
            $mol_assert_equal(body.index(), 0);
            $mol_assert_equal(body.index(), 0);
            $mol_assert_equal(world.count, 1);
        },
        'pos writes into world buffer and reads back after step'() {
            const world = new $bog_gamengine_phys3;
            world.gravity(new Float32Array(3));
            const body = new $bog_gamengine_phys3_body;
            body.phys3(world);
            body.pos(new Float32Array([1, 2, 3]));
            $mol_assert_equal([...world.pos.subarray(0, 3)], [1, 2, 3]);
            world.vel[0] = 1;
            world.timestep = 0.5;
            world.step(0.5);
            $mol_assert_equal([...body.pos()], [1.5, 2, 3]);
        },
        'rot writes euler as quaternion and reads it back'() {
            const body = new $bog_gamengine_phys3_body;
            body.rot(new Float32Array([0.3, -0.5, 1.2]));
            const q = body.phys3().rot.subarray(0, 4);
            $mol_assert_ok(Math.abs(Math.hypot(q[0], q[1], q[2], q[3]) - 1) < 1e-6);
            const rot = body.rot();
            $mol_assert_ok(Math.abs(rot[0] - 0.3) < 1e-6);
            $mol_assert_ok(Math.abs(rot[1] + 0.5) < 1e-6);
            $mol_assert_ok(Math.abs(rot[2] - 1.2) < 1e-6);
        },
        'mass prop writes through to world'() {
            const body = new $bog_gamengine_phys3_body;
            body.index();
            body.props().find(prop => prop.name === 'mass').set(4);
            $mol_assert_equal(body.phys3().mass[0], 4);
            $mol_assert_equal(body.phys3().inv_mass[0], 0.25);
        },
        'mass_set moves a body whose mass is fixed by the tree'() {
            const world = new $bog_gamengine_phys3;
            const body = new $bog_gamengine_phys3_body;
            body.phys3(world);
            body.mass = () => 0;
            body.pos(new Float32Array([0, 5, 0]));
            for (let k = 0; k < 30; ++k)
                world.step(1 / 60);
            $mol_assert_equal(body.pos()[1], 5);
            body.mass_set(1);
            $mol_assert_equal(world.mass[body.index()], 1);
            for (let k = 0; k < 30; ++k)
                world.step(1 / 60);
            $mol_assert_ok(body.pos()[1] < 4.9);
        },
        'ghost_set marks the body invisible to a skipping ray'() {
            const world = new $bog_gamengine_phys3;
            const body = new $bog_gamengine_phys3_body;
            body.phys3(world);
            body.pos(new Float32Array([0, 0, -4]));
            const out = new Float32Array(7);
            const cast = new $bog_gamengine_phys3_cast;
            const from = new Float32Array(3);
            const dir = new Float32Array([0, 0, -1]);
            $mol_assert_equal(cast.ray(world, from, dir, 20, out, { skip_ghost: true }), body.index());
            body.ghost_set(true);
            $mol_assert_equal(cast.ray(world, from, dir, 20, out, { skip_ghost: true }), -1);
        },
        'body keeps its world and handle when the world property changes'() {
            const first = new $bog_gamengine_phys3;
            const second = new $bog_gamengine_phys3;
            const body = new $bog_gamengine_phys3_body;
            body.phys3(first);
            body.index();
            body.phys3(second);
            $mol_assert_equal(body.index(), 0);
            $mol_assert_equal(first.count, 1);
            $mol_assert_equal(second.count, 0);
            body.destructor();
            $mol_assert_equal(first.count, 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const map = ['..o.', '..=.', 'E..F', '####'].join('\n');
    function level_test() {
        const tile = new $bog_gamengine_phys_tile;
        tile.map(map);
        tile.solid('#=');
        const level = new $bog_gamengine_demo_jumper_level;
        level.tile(tile);
        return level;
    }
    $mol_test({
        'level map gives coins, enemies, flag and size'() {
            const level = level_test();
            $mol_assert_equal(level.width(), 4);
            $mol_assert_equal(level.height(), 4);
            $mol_assert_equal(level.ids('o').join(), '2_0');
            $mol_assert_equal(level.ids('E').join(), '0_2');
            $mol_assert_equal(level.ids('F').join(), '3_2');
        },
        'level start is the lowest free cell over the solid one'() {
            const level = level_test();
            $mol_assert_equal(level.start().join(), '0,2');
            $mol_assert_equal(level.start_pos()[0], 0.5);
            $mol_assert_equal(level.start_pos()[1], -2.5);
        },
        'level tells ground from platform and sky'() {
            const level = level_test();
            $mol_assert_equal(level.frame(0, 3), 'ground');
            $mol_assert_equal(level.frame(2, 1), 'platform');
            $mol_assert_equal(level.frame(0, 0), 'sky');
            $mol_assert_equal(level.solid(2, 1), true);
            $mol_assert_equal(level.solid(2, 0), false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_brain_fsm_test_owner extends $bog_gamengine_node {
        tired(next = false) {
            return next;
        }
        props() {
            return [
                ...super.props(),
                { name: 'tired', kind: 'flag', get: () => this.tired(), set: next => this.tired(Boolean(next)) },
            ];
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_brain_fsm_test_owner.prototype, "tired", null);
    class $bog_gamengine_brain_fsm_test_state extends $bog_gamengine_brain_state {
        enters = 0;
        exits = 0;
        enter() {
            ++this.enters;
        }
        exit() {
            ++this.exits;
        }
    }
    class $bog_gamengine_brain_fsm_test_always extends $bog_gamengine_brain_fsm {
        cond(name) {
            return name === 'always';
        }
    }
    function fsm_test_make(fsm = new $bog_gamengine_brain_fsm, when = 'tired') {
        const owner = new $bog_gamengine_brain_fsm_test_owner;
        const idle = new $bog_gamengine_brain_fsm_test_state;
        idle.name('idle');
        idle.next([{ to: 'rest', when }]);
        const rest = new $bog_gamengine_brain_fsm_test_state;
        rest.name('rest');
        fsm.kids([idle, rest]);
        fsm.owner(owner);
        return { owner, idle, rest, fsm };
    }
    class $bog_gamengine_brain_fsm_test_time extends $mol_state_time {
        static stamp(next = 0) {
            return next;
        }
        static now(precision) {
            return this.stamp();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_brain_fsm_test_time, "stamp", null);
    class $bog_gamengine_brain_fsm_test_walker extends $bog_gamengine_node {
        seen = '';
        stopped = false;
        Brain = new $bog_gamengine_brain_fsm;
        stop() {
            return this.stopped;
        }
        kids() {
            return [this.Brain];
        }
        step(dt) {
            this.seen = this.Brain.state();
        }
    }
    function fsm_test_walker() {
        const walker = new $bog_gamengine_brain_fsm_test_walker;
        const walk = new $bog_gamengine_brain_state;
        walk.name('walk');
        walk.next([{ to: 'stop', when: 'stop' }]);
        const stop = new $bog_gamengine_brain_state;
        stop.name('stop');
        walker.Brain.kids([walk, stop]);
        return walker;
    }
    $mol_test({
        'owner set on a bare machine does not loop through ownership'() {
            const host = new $bog_gamengine_node;
            const brain = new $bog_gamengine_brain_fsm;
            brain.owner(host);
            $mol_assert_equal(brain.owner(), host);
            $mol_assert_equal(brain.$, brain.$);
        },
        'condition comes from a method of the owner'() {
            const walker = fsm_test_walker();
            walker.Brain.owner(walker);
            walker.Brain.step(0.016);
            $mol_assert_equal(walker.Brain.state(), 'walk');
            walker.stopped = true;
            walker.Brain.step(0.016);
            $mol_assert_equal(walker.Brain.state(), 'stop');
        },
        'state knows the owner of its machine'() {
            const { owner, idle } = fsm_test_make();
            $mol_assert_equal(idle.owner(), owner);
            $mol_assert_equal(new $bog_gamengine_brain_state().owner(), null);
        },
        'machine switches state before its owner steps in the same frame'($) {
            $.$mol_state_time = $bog_gamengine_brain_fsm_test_time;
            const walker = fsm_test_walker();
            const scene = new $bog_gamengine_scene;
            scene.$ = $;
            scene.kids = () => [walker];
            $bog_gamengine_brain_fsm_test_time.stamp(0);
            scene.step();
            $bog_gamengine_brain_fsm_test_time.stamp(16);
            scene.step();
            $mol_assert_equal(walker.seen, 'walk');
            walker.stopped = true;
            $bog_gamengine_brain_fsm_test_time.stamp(32);
            scene.step();
            $mol_assert_equal(walker.seen, 'stop');
        },
        'state is the first one before the flag and the second is not entered'() {
            const { idle, rest, fsm } = fsm_test_make();
            fsm.step(0.016);
            fsm.step(0.016);
            $mol_assert_equal(fsm.state(), 'idle');
            $mol_assert_equal(idle.enters, 1);
            $mol_assert_equal(rest.enters, 0);
        },
        'flag of the owner switches state with one exit and one enter'() {
            const { owner, idle, rest, fsm } = fsm_test_make();
            fsm.step(0.016);
            owner.tired(true);
            fsm.step(0.016);
            fsm.step(0.016);
            $mol_assert_equal(fsm.state(), 'rest');
            $mol_assert_equal(idle.exits, 1);
            $mol_assert_equal(rest.enters, 1);
        },
        'condition overridden by descendant switches without owner props'() {
            const { rest, fsm } = fsm_test_make(new $bog_gamengine_brain_fsm_test_always, 'always');
            fsm.step(0.016);
            $mol_assert_equal(fsm.state(), 'rest');
            $mol_assert_equal(rest.enters, 1);
        },
        'props end with state text'() {
            const { fsm } = fsm_test_make();
            const prop = fsm.props().at(-1);
            $mol_assert_equal(prop.name, 'state');
            $mol_assert_equal(prop.kind, 'text');
            $mol_assert_equal(prop.get(), 'idle');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function enemy_test() {
        const tile = new $bog_gamengine_phys_tile;
        tile.map('....\n.==.\n....');
        tile.solid('#=');
        const brain = new $bog_gamengine_brain_fsm;
        const right = new $bog_gamengine_brain_state;
        right.name('right');
        right.next([{ to: 'left', when: 'edge_right' }]);
        const left = new $bog_gamengine_brain_state;
        left.name('left');
        left.next([{ to: 'right', when: 'edge_left' }]);
        brain.kids([right, left]);
        const enemy = new $bog_gamengine_demo_jumper_enemy;
        enemy.tile(tile);
        enemy.brain(brain);
        enemy.pos(new Float32Array([1.5, -0.6, 0]));
        brain.owner(enemy);
        return { enemy, brain };
    }
    $mol_test({
        'enemy in the middle of the platform goes right'() {
            const { enemy, brain } = enemy_test();
            brain.step(0.1);
            enemy.step(0.1);
            $mol_assert_equal(enemy.edge_right(), false);
            $mol_assert_ok(enemy.vel()[0] > 0);
        },
        'enemy at the platform edge turns back'() {
            const { enemy, brain } = enemy_test();
            brain.step(0.1);
            enemy.pos(new Float32Array([2.5, -0.6, 0]));
            $mol_assert_equal(enemy.edge_right(), true);
            brain.step(0.1);
            $mol_assert_equal(brain.state(), 'left');
            enemy.step(0.1);
            $mol_assert_ok(enemy.vel()[0] < 0);
            $mol_assert_equal(enemy.face_left(), true);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function hero_test(y) {
        const tile = new $bog_gamengine_phys_tile;
        tile.map('....\n####');
        const key = new $bog_gamengine_key;
        key.bind({ jump: ['space'], left: ['A'], right: ['D'] });
        const input = new $bog_gamengine_input;
        input.key(key);
        const hero = new $bog_gamengine_demo_jumper_hero;
        hero.input(input);
        hero.start(new Float32Array([0.5, -0.6, 0]));
        hero.pos(new Float32Array([0.5, y, 0]));
        hero.vel(new Float32Array([0, -1, 0]));
        const phys = new $bog_gamengine_phys;
        phys.tile(tile);
        phys.bodies([hero]);
        phys.step(1 / 60);
        return { hero, key };
    }
    $mol_test({
        'hero standing on the ground jumps up'() {
            const { hero, key } = hero_test(-0.6);
            $mol_assert_equal(hero.on_ground(), true);
            key.pressed('space', true);
            hero.step(1 / 60);
            $mol_assert_ok(hero.vel()[1] > 0);
        },
        'hero in the air does not jump'() {
            const { hero, key } = hero_test(-0.3);
            $mol_assert_equal(hero.on_ground(), false);
            key.pressed('space', true);
            hero.step(1 / 60);
            $mol_assert_ok(hero.vel()[1] < 0);
        },
        'hero touching a coin takes it once'() {
            const { hero } = hero_test(-0.6);
            const coin = new $bog_gamengine_demo_jumper_item;
            coin.role('coin');
            hero.hit(coin);
            hero.hit(coin);
            $mol_assert_equal(coin.taken(), true);
            $mol_assert_equal(hero.coins(), 1);
        },
        'hero touching a spike loses a life and starts over'() {
            const { hero } = hero_test(-0.6);
            const spike = new $bog_gamengine_demo_jumper_item;
            spike.role('spike');
            hero.hit(spike);
            $mol_assert_equal(hero.lives(), 2);
            $mol_assert_equal(hero.pos()[1], hero.start()[1]);
        },
        'hero reaching the flag wins and stands still'() {
            const { hero, key } = hero_test(-0.6);
            const flag = new $bog_gamengine_demo_jumper_item;
            flag.role('flag');
            hero.hit(flag);
            $mol_assert_equal(hero.won(), true);
            key.pressed('D', true);
            hero.step(1 / 60);
            $mol_assert_equal(hero.vel()[0], 0);
        },
        'hero falling on an enemy kills it, touching aside loses a life'() {
            const stomp = hero_test(-0.6).hero;
            const enemy = new $bog_gamengine_demo_jumper_enemy;
            enemy.pos(new Float32Array([0.5, -1.4, 0]));
            stomp.vel(new Float32Array([0, -5, 0]));
            stomp.hit(enemy);
            $mol_assert_equal(enemy.dead(), true);
            $mol_assert_ok(stomp.vel()[1] > 0);
            const side = hero_test(-0.6).hero;
            const walker = new $bog_gamengine_demo_jumper_enemy;
            walker.pos(new Float32Array([1.2, -0.6, 0]));
            side.hit(walker);
            $mol_assert_equal(walker.dead(), false);
            $mol_assert_equal(side.lives(), 2);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const map = [
        '#####',
        '#.E.#',
        '#.P.#',
        '#####',
    ].join('\n');
    $mol_test({
        'arena measures the map by rows and the longest row'() {
            const arena = new $bog_gamengine_demo_shooter_arena;
            arena.map(map);
            $mol_assert_equal(arena.width(), 5);
            $mol_assert_equal(arena.height(), 4);
        },
        'walls are every cell with the wall sign'() {
            const arena = new $bog_gamengine_demo_shooter_arena;
            arena.map(map);
            $mol_assert_equal(arena.wall_ids().length, 14);
            $mol_assert_equal(arena.wall(0, 0), true);
            $mol_assert_equal(arena.wall(2, 1), false);
        },
        'target ids keep the cell coordinates'() {
            const arena = new $bog_gamengine_demo_shooter_arena;
            arena.map(map);
            $mol_assert_equal(arena.target_ids(), ['2_1']);
            $mol_assert_equal([...arena.xy('2_1', new Int32Array(2))], [2, 1]);
        },
        'cell position lands in the middle of the cell at the asked height'() {
            const arena = new $bog_gamengine_demo_shooter_arena;
            arena.map(map);
            $mol_assert_equal([...arena.pos_of('2_1', 0.5)], [2.5, 0.5, 1.5]);
        },
        'start position comes from the start sign'() {
            const arena = new $bog_gamengine_demo_shooter_arena;
            arena.map(map);
            $mol_assert_equal([...arena.start_pos(0.5)], [2.5, 0.5, 2.5]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function walker_test_world() {
        const world = new $bog_gamengine_phys3;
        world.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3));
        return world;
    }
    function walker_test_box(world, sx, sy, sz, x, y, z, rot) {
        return world.index_of(world.add($bog_gamengine_phys3.shape_box, new Float32Array([sx, sy, sz]), 0, new Float32Array([x, y, z]), rot));
    }
    function walker_test_key(...held) {
        const key = new $bog_gamengine_key;
        key.bind({
            forward: ['W'],
            back: ['S'],
            left: ['A'],
            right: ['D'],
            jump: ['Space'],
        });
        for (const name of held)
            key.pressed(name, true);
        return key;
    }
    function walker_test_walker(world, key, y = 0.9) {
        const walker = new $bog_gamengine_phys3_walker;
        walker.phys3(world);
        const input = new $bog_gamengine_input;
        input.key(key);
        walker.input(input);
        walker.pos(new Float32Array([0, y, 0]));
        return walker;
    }
    function walker_test_run(walker, steps) {
        for (let k = 0; k < steps; ++k)
            walker.step(1 / 60);
        return walker.pos();
    }
    function walker_test_around(axis, angle) {
        return $bog_gamengine_vec_quat_from_axis(new Float32Array(4), new Float32Array(axis), angle);
    }
    function walker_test_near(actual, expected, eps) {
        if (!(Math.abs(actual - expected) < eps))
            $mol_fail(new Error(`${actual} is not near ${expected}`));
    }
    $mol_test({
        'stands as a capsule body a ray can see'() {
            const world = walker_test_world();
            const walker = walker_test_walker(world, walker_test_key(), 3);
            walker_test_run(walker, 120);
            const out = new Float32Array(7);
            const i = new $bog_gamengine_phys3_cast().ray(world, new Float32Array([0, 0.9, 6]), new Float32Array([0, 0, -1]), 20, out);
            $mol_assert_equal(i, world.index_of(walker.handle_last));
            walker_test_near(out[0], 5.7, 0.05);
        },
        'own body neither blocks nor is pushed by its walk'() {
            const world = walker_test_world();
            const walker = walker_test_walker(world, walker_test_key('W'));
            const pos = walker_test_run(walker, 60);
            walker_test_near(pos[2], -4, 1e-3);
            const body = world.pos_of(walker.handle_last);
            walker_test_near(body[2], pos[2], 1e-6);
            walker_test_near(body[1], pos[1], 1e-6);
        },
        'falls and stands on the floor with center at half height'() {
            const walker = walker_test_walker(walker_test_world(), walker_test_key(), 3);
            const pos = walker_test_run(walker, 120);
            $mol_assert_ok(walker.grounded);
            walker_test_near(pos[1], 0.9, 0.01);
        },
        'walks forward a second at speed'() {
            const walker = walker_test_walker(walker_test_world(), walker_test_key('W'));
            const pos = walker_test_run(walker, 60);
            walker_test_near(pos[2], -4, 1e-3);
            walker_test_near(pos[0], 0, 1e-3);
            $mol_assert_ok(walker.grounded);
        },
        'box wall ahead stops at its face minus radius'() {
            const world = walker_test_world();
            walker_test_box(world, 2, 1, 0.25, 0, 1, -3);
            const walker = walker_test_walker(world, walker_test_key('W'));
            const pos = walker_test_run(walker, 90);
            walker_test_near(pos[2], -2.45, 0.01);
            walker_test_near(pos[1], 0.9, 0.01);
        },
        'wall at 45 degrees slides along it'() {
            const world = walker_test_world();
            walker_test_box(world, 4, 1, 0.25, 0, 1, -3, walker_test_around([0, 1, 0], Math.PI / 4));
            const walker = walker_test_walker(world, walker_test_key('W'));
            const pos = walker_test_run(walker, 60);
            $mol_assert_ok(pos[0] > 0.3);
            $mol_assert_ok(pos[2] < -2.5);
        },
        'step 0.3 high is climbed'() {
            const world = walker_test_world();
            walker_test_box(world, 1, 0.15, 0.5, 0, 0.15, -2);
            const walker = walker_test_walker(world, walker_test_key('W'));
            const pos = walker_test_run(walker, 30);
            $mol_assert_ok(pos[2] < -1.9);
            walker_test_near(pos[1], 1.2, 0.02);
            $mol_assert_ok(walker.grounded);
        },
        'step 0.5 high blocks'() {
            const world = walker_test_world();
            walker_test_box(world, 1, 0.25, 0.5, 0, 0.25, -2);
            const walker = walker_test_walker(world, walker_test_key('W'));
            const pos = walker_test_run(walker, 60);
            walker_test_near(pos[2], -1.2, 0.02);
            walker_test_near(pos[1], 0.9, 0.01);
        },
        'jump lifts and returns to the floor'() {
            const key = walker_test_key();
            const walker = walker_test_walker(walker_test_world(), key);
            walker_test_run(walker, 1);
            key.pressed('Space', true);
            walker_test_run(walker, 1);
            key.pressed('Space', false);
            $mol_assert_ok(!walker.grounded);
            $mol_assert_ok(walker_test_run(walker, 20)[1] > 1.5);
            const pos = walker_test_run(walker, 100);
            $mol_assert_ok(walker.grounded);
            walker_test_near(pos[1], 0.9, 0.01);
        },
        'slope of 30 degrees is walked up'() {
            const world = walker_test_world();
            walker_test_box(world, 2, 0.25, 3, 0, 0, -4, walker_test_around([1, 0, 0], Math.PI / 6));
            const walker = walker_test_walker(world, walker_test_key('W'));
            const pos = walker_test_run(walker, 90);
            $mol_assert_ok(pos[1] > 1.5);
            $mol_assert_ok(pos[2] < -4.5);
            $mol_assert_ok(walker.grounded);
        },
        'slope of 60 degrees is a wall'() {
            const world = walker_test_world();
            walker_test_box(world, 2, 0.25, 3, 0, 0, -4, walker_test_around([1, 0, 0], Math.PI / 3));
            const walker = walker_test_walker(world, walker_test_key('W'));
            const pos = walker_test_run(walker, 120);
            walker_test_near(pos[1], 0.9, 0.02);
            $mol_assert_ok(pos[2] > -3.8);
        },
        'yaw field turns the walk and shows up in rot'() {
            const world = walker_test_world();
            const walker = walker_test_walker(world, walker_test_key('W'));
            walker.yaw = Math.PI / 2;
            const pos = walker_test_run(walker, 60);
            walker_test_near(walker.rot()[1], Math.PI / 2, 1e-6);
            walker_test_near(pos[0], -4, 1e-3);
            walker_test_near(pos[2], 0, 1e-3);
        },
        'no input and standing keeps pos reference'() {
            const walker = walker_test_walker(walker_test_world(), walker_test_key());
            walker_test_run(walker, 2);
            const pos = walker.pos();
            walker.step(1 / 60);
            $mol_assert_equal(walker.pos(), pos);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function world_of() {
        const world = new $bog_gamengine_demo_shooter_phys;
        world.place($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3), 0);
        return world;
    }
    function target_at(world, at) {
        const target = new $bog_gamengine_demo_shooter_target;
        target.phys3(world);
        target.start(at);
        target.index();
        return target;
    }
    function player_at(world, at) {
        const player = new $bog_gamengine_demo_shooter_player;
        player.phys3(world);
        player.pos(at);
        return player;
    }
    $mol_test({
        'the body lands where the start says'() {
            const world = world_of();
            const target = target_at(world, new Float32Array([3, 0.5, 5]));
            $mol_assert_equal([...target.pos()], [3, 0.5, 5]);
        },
        'patrol walks along X until a wall turns it back'() {
            const world = world_of();
            world.place($bog_gamengine_phys3.shape_box, new Float32Array([0.5, 1, 0.5]), 0, new Float32Array([2, 1, 0]), 0);
            const target = target_at(world, new Float32Array([0, 0.9, 0]));
            for (let i = 0; i < 15; ++i)
                target.step(0.1);
            $mol_assert_equal(target.pos()[0] > 0, true);
            $mol_assert_equal(target.way, -1);
        },
        'patrol never turns back on its own body'() {
            const world = world_of();
            const target = target_at(world, new Float32Array([0, 0.9, 0]));
            for (let i = 0; i < 5; ++i)
                target.step(0.1);
            $mol_assert_equal(target.way, 1);
        },
        'a seen player takes damage'() {
            const world = world_of();
            const target = target_at(world, new Float32Array([0, 0.9, 0]));
            const player = player_at(world, new Float32Array([0, 0.85, -5]));
            target.player(player);
            target.aim(world, 0.016);
            $mol_assert_equal(target.seen, true);
            $mol_assert_equal(player.health(), 94);
        },
        'a wall on the line of sight saves the player'() {
            const world = world_of();
            world.place($bog_gamengine_phys3.shape_box, new Float32Array([2, 2, 0.5]), 0, new Float32Array([0, 1, -2]), 0);
            const target = target_at(world, new Float32Array([0, 0.9, 0]));
            const player = player_at(world, new Float32Array([0, 0.85, -5]));
            target.player(player);
            target.aim(world, 0.016);
            $mol_assert_equal(target.seen, false);
            $mol_assert_equal(player.health(), 100);
        },
        'a player further than the reach is left alone'() {
            const world = world_of();
            const target = target_at(world, new Float32Array([0, 0.9, 0]));
            const player = player_at(world, new Float32Array([0, 0.85, -40]));
            target.player(player);
            target.aim(world, 0.016);
            $mol_assert_equal(target.seen, false);
            $mol_assert_equal(player.health(), 100);
        },
        'the second shot waits for the delay'() {
            const world = world_of();
            const target = target_at(world, new Float32Array([0, 0.9, 0]));
            const player = player_at(world, new Float32Array([0, 0.85, -5]));
            target.player(player);
            target.aim(world, 0.016);
            target.aim(world, 0.016);
            $mol_assert_equal(player.health(), 94);
        },
        'a dead target goes ghost and leaves the arena after the fade'() {
            const world = world_of();
            const target = target_at(world, new Float32Array([0, 0.9, 0]));
            target.hurt(2, new Float32Array([0, 0, -1]), 7);
            $mol_assert_equal(target.alive(), false);
            for (let i = 0; i < 3; ++i)
                target.step(1);
            $mol_assert_equal(target.done, true);
            $mol_assert_equal(world.flags[target.index()] & $bog_gamengine_phys3.flag_ghost, $bog_gamengine_phys3.flag_ghost);
            $mol_assert_equal(target.pos()[1], -1000);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function world_of() {
        const world = new $bog_gamengine_demo_shooter_phys;
        world.place($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3), 0);
        return world;
    }
    function player_of(world) {
        const player = new $bog_gamengine_demo_shooter_player;
        player.phys3(world);
        player.pos(new Float32Array([0, 0.85, 0]));
        return player;
    }
    function target_of(world, at) {
        const target = new $bog_gamengine_demo_shooter_target;
        target.phys3(world);
        target.start(at);
        target.index();
        return target;
    }
    $mol_test({
        'aim looks along minus Z while the head is straight'() {
            const player = player_of(world_of());
            const dir = player.aim();
            $mol_assert_equal(Math.abs(dir[0]) < 1e-6, true);
            $mol_assert_equal(dir[1], 0);
            $mol_assert_equal(dir[2], -1);
        },
        'quarter turn left aims along minus X'() {
            const player = player_of(world_of());
            player.yaw = Math.PI / 2;
            const dir = player.aim();
            $mol_assert_equal(dir[0].toFixed(4), '-1.0000');
            $mol_assert_equal(Math.abs(dir[2]) < 1e-6, true);
        },
        'eye sits above the capsule center by half the height less the drop'() {
            const player = player_of(world_of());
            const eye = player.eye();
            $mol_assert_equal(eye[1].toFixed(2), (0.85 + player.height() / 2 - 0.15).toFixed(2));
        },
        'a shot into a target ahead takes its health down'() {
            const world = world_of();
            const player = player_of(world);
            const target = target_of(world, new Float32Array([0, 0.9, -3]));
            player.targets([target]);
            $mol_assert_equal(player.fire(), target);
            $mol_assert_equal(target.health(), 1);
        },
        'a wall between the eye and the target eats the shot'() {
            const world = world_of();
            const player = player_of(world);
            world.place($bog_gamengine_phys3.shape_box, new Float32Array([2, 2, 0.5]), 0, new Float32Array([0, 1, -1.5]), 0);
            const target = target_of(world, new Float32Array([0, 0.9, -3]));
            player.targets([target]);
            $mol_assert_equal(player.fire(), null);
            $mol_assert_equal(target.health(), 2);
        },
        'the next shot waits for the delay'() {
            const world = world_of();
            const player = player_of(world);
            const target = target_of(world, new Float32Array([0, 0.9, -3]));
            player.targets([target]);
            player.fire();
            $mol_assert_equal(player.fire(), null);
            $mol_assert_equal(target.health(), 1);
        },
        'the last shot pushes the target and makes it fall'() {
            const world = world_of();
            const player = player_of(world);
            const target = target_of(world, new Float32Array([0, 0.9, -3]));
            player.targets([target]);
            for (let i = 0; i < 2; ++i) {
                player.wait = 0;
                player.fire();
            }
            $mol_assert_equal(target.alive(), false);
            $mol_assert_equal(world.inv_mass[target.index()] > 0, true);
            $mol_assert_equal(world.vel[target.index() * 3 + 2] < 0, true);
        },
        'damage taken lands in health and ends at zero'() {
            const player = player_of(world_of());
            player.hurt(40);
            $mol_assert_equal(player.health(), 60);
            player.hurt(100);
            $mol_assert_equal(player.health(), 0);
            $mol_assert_equal(player.dead(), true);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'pointer at the left edge pans the camera left'() {
            const cam = new $bog_gamengine_cam_flat;
            const edge = new $bog_gamengine_cam_edge;
            edge.cam(cam);
            edge.width(800);
            edge.height(600);
            edge.edge(50);
            edge.speed(10);
            edge.aim(0, 300);
            edge.step(0.1);
            $mol_assert_equal(cam.pos()[0], -1);
            $mol_assert_equal(cam.pos()[1], 0);
        },
        'pointer in the middle leaves the camera alone'() {
            const cam = new $bog_gamengine_cam_flat;
            const edge = new $bog_gamengine_cam_edge;
            edge.cam(cam);
            edge.width(800);
            edge.height(600);
            edge.aim(400, 300);
            edge.step(0.1);
            $mol_assert_equal(cam.pos()[0], 0);
        },
        'pointer away from the panel stops the pan'() {
            const cam = new $bog_gamengine_cam_flat;
            const edge = new $bog_gamengine_cam_edge;
            edge.cam(cam);
            edge.width(800);
            edge.height(600);
            edge.aim(799, 300);
            edge.step(0.1);
            const moved = cam.pos()[0];
            $mol_assert_ok(moved > 0);
            edge.away();
            edge.step(0.1);
            $mol_assert_equal(cam.pos()[0], moved);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'ten agents get ten distinct passable goals around a wall'() {
            const tile = new $bog_gamengine_phys_tile;
            tile.map([
                '####################',
                '#..................#',
                '#..................#',
                '#..................#',
                '#........####......#',
                '#........####......#',
                '#..................#',
                '#..................#',
                '#..................#',
                '####################',
            ].join('\n'));
            const grid = new $bog_gamengine_nav_grid;
            grid.tile(tile);
            const squad = new $bog_gamengine_nav_squad;
            const agents = [];
            for (let i = 0; i < 10; ++i)
                agents.push(new $bog_gamengine_nav_agent);
            squad.order(agents, 10.5, -4.5, grid);
            $mol_assert_equal(squad.count, 10);
            for (let i = 0; i < agents.length; ++i) {
                const goal = agents[i].target();
                $mol_assert_not(grid.solid_at(goal[0], goal[1]));
                for (let k = 0; k < i; ++k) {
                    const other = agents[k].target();
                    $mol_assert_ok(Math.hypot(goal[0] - other[0], goal[1] - other[1]) > 0.1);
                }
            }
        },
        'second order allocates nothing'() {
            const squad = new $bog_gamengine_nav_squad;
            const agents = [];
            for (let i = 0; i < 10; ++i)
                agents.push(new $bog_gamengine_nav_agent);
            squad.order(agents, 0, 0);
            const spots = squad.spots;
            const first = agents[0].target()[0];
            squad.order(agents, 5, 5);
            $mol_assert_equal(squad.spots, spots);
            $mol_assert_ok(Math.abs(agents[0].target()[0] - first - 5) < 1e-6);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_demo_legion_unit_pair() {
        const tile = new $bog_gamengine_phys_tile;
        tile.map([
            '#####',
            '#...#',
            '#...#',
            '#...#',
            '#####',
        ].join('\n'));
        const grid = new $bog_gamengine_nav_grid;
        grid.tile(tile);
        const mine = new $bog_gamengine_demo_legion_unit;
        mine.camp(0);
        mine.grid(grid);
        const foe = new $bog_gamengine_demo_legion_unit;
        foe.camp(1);
        foe.grid(grid);
        for (const unit of [mine, foe]) {
            const fight = new $bog_gamengine_combat;
            fight.owner(unit);
            fight.health_max(40);
            fight.rate(0.7);
            unit.fight(fight);
        }
        mine.foes([foe]);
        foe.foes([mine]);
        mine.pos(new Float32Array([1.5, -1.5, 0]));
        foe.pos(new Float32Array([3.5, -3.5, 0]));
        const clock = new $bog_gamengine_clock;
        const scene = new $bog_gamengine_scene;
        scene.clock(clock);
        scene.kids([mine, foe]);
        return { tile, grid, mine, foe, clock, scene };
    }
    $mol_test({
        'order sends the unit toward the goal'() {
            const { mine } = $bog_gamengine_demo_legion_unit_pair();
            mine.mode_set('move');
            mine.aim(3.5, -3.5);
            const before = mine.pos()[0];
            for (let i = 0; i < 10; ++i)
                mine.step(0.05);
            $mol_assert_ok(mine.pos()[0] > before);
        },
        'foe in sight becomes the target, out of sight does not'() {
            const { mine, foe } = $bog_gamengine_demo_legion_unit_pair();
            mine.sight(10);
            mine.step(0.05);
            $mol_assert_equal(mine.has_foe(), true);
            mine.sight(1);
            mine.scan_left = 0;
            mine.step(0.05);
            $mol_assert_equal(mine.has_foe(), false);
        },
        'attack drains health by the rate and kills'() {
            const { mine, foe, clock } = $bog_gamengine_demo_legion_unit_pair();
            foe.pos(new Float32Array([2, -1.5, 0]));
            mine.damage(10);
            mine.fight().rate(1);
            mine.mode_set('attack');
            for (let i = 0; i < 3; ++i) {
                clock.time(i);
                mine.step(0.1);
            }
            $mol_assert_equal(foe.hp(), 10);
            clock.time(3);
            mine.step(0.1);
            $mol_assert_equal(foe.dead(), true);
        },
        'dead unit stops moving'() {
            const { mine } = $bog_gamengine_demo_legion_unit_pair();
            mine.mode_set('move');
            mine.aim(3.5, -3.5);
            mine.die();
            const at = mine.pos()[0];
            for (let i = 0; i < 10; ++i)
                mine.step(0.05);
            $mol_assert_equal(mine.pos()[0], at);
            $mol_assert_equal(mine.shown(), false);
        },
        'reset brings the unit back to full health at the start'() {
            const { mine } = $bog_gamengine_demo_legion_unit_pair();
            mine.wound(mine.health_max());
            $mol_assert_equal(mine.dead(), true);
            mine.reset(new Float32Array([1.5, -1.5, 0]));
            $mol_assert_equal(mine.dead(), false);
            $mol_assert_equal(mine.hp(), mine.health_max());
        },
        'patrol picks a goal around home and skips walls'() {
            const { mine, grid } = $bog_gamengine_demo_legion_unit_pair();
            mine.home(new Float32Array([2.5, -2.5, 0]));
            mine.roam(6);
            mine.mode_set('patrol');
            mine.step(0.05);
            $mol_assert_equal(grid.solid_at(mine.goal[0], mine.goal[1]), false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_brain_bt_test_owner extends $bog_gamengine_node {
        alive(next = false) {
            return next;
        }
        props() {
            return [
                ...super.props(),
                { name: 'alive', kind: 'flag', get: () => this.alive(), set: next => this.alive(Boolean(next)) },
            ];
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_brain_bt_test_owner.prototype, "alive", null);
    class $bog_gamengine_brain_bt_test_walker extends $bog_gamengine_node {
        close = false;
        near() {
            return this.close;
        }
    }
    class $bog_gamengine_brain_bt_test_act extends $bog_gamengine_brain_bt_act {
        ticks = 0;
        result = 'ok';
        tick(dt, brain) {
            ++this.ticks;
            return this.status_now = this.result;
        }
    }
    function bt_test_act(result = 'ok') {
        const act = new $bog_gamengine_brain_bt_test_act;
        act.result = result;
        return act;
    }
    function bt_test_root(kid) {
        const root = new $bog_gamengine_brain_bt;
        root.kids([kid]);
        return root;
    }
    $mol_test({
        'seq does not tick the action while waiting and ticks it with ok after 0.1 s'() {
            const wait = new $bog_gamengine_brain_bt_wait;
            wait.seconds(0.1);
            const act = bt_test_act();
            const seq = new $bog_gamengine_brain_bt_seq;
            seq.kids([wait, act]);
            const root = bt_test_root(seq);
            root.step(0.05);
            $mol_assert_equal(act.ticks, 0);
            $mol_assert_equal(root.status(), 'run');
            root.step(0.05);
            $mol_assert_equal(act.ticks, 1);
            $mol_assert_equal(root.status(), 'ok');
        },
        'sel picks the second when the first fails'() {
            const first = bt_test_act('fail');
            const second = bt_test_act();
            const sel = new $bog_gamengine_brain_bt_sel;
            sel.kids([first, second]);
            const root = bt_test_root(sel);
            root.step(0.016);
            $mol_assert_equal(first.ticks, 1);
            $mol_assert_equal(second.ticks, 1);
            $mol_assert_equal(root.status(), 'ok');
        },
        'inv turns ok into fail'() {
            const inv = new $bog_gamengine_brain_bt_inv;
            inv.kids([bt_test_act()]);
            const root = bt_test_root(inv);
            root.step(0.016);
            $mol_assert_equal(root.status(), 'fail');
        },
        'par waits for all kids'() {
            const slow = bt_test_act('run');
            const par = new $bog_gamengine_brain_bt_par;
            par.kids([slow, bt_test_act()]);
            const root = bt_test_root(par);
            root.step(0.016);
            $mol_assert_equal(root.status(), 'run');
            slow.result = 'ok';
            root.step(0.016);
            $mol_assert_equal(root.status(), 'ok');
        },
        'cond follows a method of the owner'() {
            const owner = new $bog_gamengine_brain_bt_test_walker;
            const cond = new $bog_gamengine_brain_bt_cond;
            cond.when('near');
            const root = bt_test_root(cond);
            root.owner(owner);
            root.step(0.016);
            $mol_assert_equal(root.status(), 'fail');
            owner.close = true;
            root.step(0.016);
            $mol_assert_equal(root.status(), 'ok');
        },
        'cond follows the flag of the owner'() {
            const owner = new $bog_gamengine_brain_bt_test_owner;
            const cond = new $bog_gamengine_brain_bt_cond;
            cond.when('alive');
            const root = bt_test_root(cond);
            root.owner(owner);
            root.step(0.016);
            $mol_assert_equal(root.status(), 'fail');
            owner.alive(true);
            root.step(0.016);
            $mol_assert_equal(root.status(), 'ok');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_phys_walker_keys() {
        const key = new $bog_gamengine_key;
        key.bind({ left: ['A'], right: ['D'], up: ['W'], down: ['S'] });
        const input = new $bog_gamengine_input;
        input.key(key);
        return { key, input };
    }
    class $bog_gamengine_phys_walker_stick extends $bog_gamengine_input {
        lean = 0;
        axis(neg, pos) {
            return pos === 'right' ? this.lean : 0;
        }
    }
    $mol_test({
        'walker without input writes no velocity at all'() {
            const walker = new $bog_gamengine_phys_walker;
            const still = walker.vel();
            walker.step(0.1);
            $mol_assert_equal(walker.vel(), still);
        },
        'axes turn into velocity by the speed'() {
            const { key, input } = $bog_gamengine_phys_walker_keys();
            const walker = new $bog_gamengine_phys_walker;
            walker.input(input);
            walker.speed(4);
            key.pressed('D', true);
            walker.step(0.1);
            $mol_assert_equal([...walker.vel()], [4, 0, 0]);
        },
        'diagonal does not go faster than a straight line'() {
            const { key, input } = $bog_gamengine_phys_walker_keys();
            const walker = new $bog_gamengine_phys_walker;
            walker.input(input);
            walker.speed(4);
            key.pressed('D', true);
            key.pressed('W', true);
            walker.step(0.1);
            const vel = walker.vel();
            $mol_assert_ok(Math.abs(Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1]) - 4) < 1e-6);
            $mol_assert_ok(Math.abs(vel[0] - vel[1]) < 1e-6);
            $mol_assert_ok(vel[0] > 2.8 && vel[0] < 2.9);
        },
        'half pressed stick keeps half of the speed'() {
            const stick = new $bog_gamengine_phys_walker_stick;
            const walker = new $bog_gamengine_phys_walker;
            walker.input(stick);
            walker.speed(4);
            stick.lean = 0.5;
            walker.step(0.1);
            $mol_assert_equal([...walker.vel()], [2, 0, 0]);
            stick.lean = 1;
            walker.step(0.1);
            $mol_assert_equal([...walker.vel()], [4, 0, 0]);
        },
        'released keys stop the walker once and then it keeps silent'() {
            const { key, input } = $bog_gamengine_phys_walker_keys();
            const walker = new $bog_gamengine_phys_walker;
            walker.input(input);
            key.pressed('D', true);
            walker.step(0.1);
            key.pressed('D', false);
            walker.step(0.1);
            $mol_assert_equal([...walker.vel()], [0, 0, 0]);
            const stopped = walker.vel();
            walker.step(0.1);
            walker.step(0.1);
            $mol_assert_equal(walker.vel(), stopped);
        },
        'same keys on the next frame write nothing'() {
            const { key, input } = $bog_gamengine_phys_walker_keys();
            const walker = new $bog_gamengine_phys_walker;
            walker.input(input);
            key.pressed('A', true);
            walker.step(0.1);
            const going = walker.vel();
            walker.step(0.1);
            walker.step(0.1);
            $mol_assert_equal(walker.vel(), going);
            $mol_assert_equal(going[0], -walker.speed());
        },
        'walker takes the input of its scene when none is set'() {
            const { key, input } = $bog_gamengine_phys_walker_keys();
            const walker = new $bog_gamengine_phys_walker;
            const scene = new $bog_gamengine_scene;
            scene.input(input);
            scene.kids([walker]);
            scene.nodes();
            $mol_assert_equal(walker.input(), input);
            key.pressed('D', true);
            walker.step(0.1);
            $mol_assert_equal(walker.vel()[0], walker.speed());
        },
        'speed is shown among props for the inspector'() {
            const walker = new $bog_gamengine_phys_walker;
            const prop = walker.props().find(one => one.name === 'speed');
            $mol_assert_equal(prop.kind, 'number');
            prop.set(6);
            $mol_assert_equal(walker.speed(), 6);
        },
        'walker driven into a wall of the map stops at its edge'() {
            const { key, input } = $bog_gamengine_phys_walker_keys();
            const tile = new $bog_gamengine_phys_tile;
            tile.map('########\n#......#\n########');
            const walker = new $bog_gamengine_phys_walker;
            walker.input(input);
            walker.speed(4);
            walker.size(new Float32Array([0.8, 0.8]));
            walker.pos(new Float32Array([1.5, -1.5, 0]));
            const phys = new $bog_gamengine_phys;
            phys.tile(tile);
            phys.bodies([walker]);
            key.pressed('D', true);
            for (let i = 0; i < 120; ++i) {
                walker.step(1 / 60);
                phys.step(1 / 60);
            }
            const pos = walker.pos();
            $mol_assert_ok(pos[0] > 5);
            $mol_assert_ok(pos[0] <= 6.6);
            $mol_assert_ok(Math.abs(pos[1] + 1.5) < 1e-6);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    const tree_list = [
        { uri: 'bog/gamengine/demo/atlas/hero.png', kind: 'image' },
        { uri: 'bog/gamengine/demo/room/model/pillar.glb', kind: 'model' },
        { uri: 'bog/gamengine/demo/sound/coin.wav', kind: 'sound' },
        { uri: 'bog/gamengine/demo/atlas/coin.png', kind: 'image' },
    ];
    function assets($, json = null) {
        $.$mol_fetch = class extends $mol_fetch {
            static json(input) {
                if (json === null)
                    return $mol_fail(new Error(`Not Found: ${input}`));
                return json;
            }
        };
        return $bog_gamengine_studio_assets.create(assets => {
            assets.$ = $;
            assets.fallback = () => tree_list;
        });
    }
    $mol_test({
        'list comes from the json of the pack'($) {
            const list = assets($, [
                { uri: 'bog/gamengine/demo/atlas/wall.png', kind: 'image' },
                { uri: 'bog/gamengine/demo/icon/hero-192.png', kind: 'image' },
            ]).list();
            $mol_assert_equal(list.map(item => item.uri), ['bog/gamengine/demo/atlas/wall.png', 'bog/gamengine/demo/icon/hero-192.png']);
        },
        'kinds beyond image, model and sound are dropped'($) {
            const list = assets($, [
                { uri: 'bog/gamengine/demo/atlas/wall.png', kind: 'image' },
                { uri: 'bog/gamengine/demo/room/room.view.tree', kind: 'file' },
            ]).list();
            $mol_assert_equal(list.map(item => item.uri), ['bog/gamengine/demo/atlas/wall.png']);
        },
        'missing json falls back to the list of the tree'($) {
            $mol_assert_equal(assets($).list().map(item => item.uri), tree_list.map(item => item.uri));
        },
        'empty json falls back to the list of the tree'($) {
            $mol_assert_equal(assets($, []).list().length, tree_list.length);
        },
        'list is filtered by kind'($) {
            $mol_assert_equal(assets($).of('image').map(item => item.uri), ['bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png']);
            $mol_assert_equal(assets($).of('sound').length, 1);
        },
        'kind is found by uri'($) {
            $mol_assert_equal(assets($).kind('bog/gamengine/demo/room/model/pillar.glb'), 'model');
            $mol_assert_equal(assets($).kind('bog/gamengine/demo/nothing.png'), null);
        },
        'name is the file without the extension'($) {
            $mol_assert_equal(assets($).name('bog/gamengine/demo/atlas/coin.png'), 'coin');
            $mol_assert_equal(assets($).file('bog/gamengine/demo/atlas/coin.png'), 'coin.png');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'span for same uri'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const child = span.span(4, 5, 8);
            $mol_assert_equal(child.uri, 'test.ts');
            $mol_assert_equal(child.row, 4);
            $mol_assert_equal(child.col, 5);
            $mol_assert_equal(child.length, 8);
        },
        'span after of given position'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const child = span.after(11);
            $mol_assert_equal(child.uri, 'test.ts');
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 7);
            $mol_assert_equal(child.length, 11);
        },
        'slice span - regular'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            const child = span.slice(1, 4);
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 4);
            $mol_assert_equal(child.length, 3);
            const child2 = span.slice(2, 2);
            $mol_assert_equal(child2.col, 5);
            $mol_assert_equal(child2.length, 0);
        },
        'slice span - negative'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            const child = span.slice(-3, -1);
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 5);
            $mol_assert_equal(child.length, 2);
        },
        'slice span - out of range'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            $mol_assert_fail(() => span.slice(-1, 3), `End value '3' can't be less than begin value (test.ts#1:3/5)`);
            $mol_assert_fail(() => span.slice(1, 6), `End value '6' out of range (test.ts#1:3/5)`);
            $mol_assert_fail(() => span.slice(1, 10), `End value '10' out of range (test.ts#1:3/5)`);
        },
        'error handling'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const error = span.error('Some error');
            $mol_assert_equal(error.message, 'Some error (test.ts#1:3/4)');
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'tree parsing'($) {
            $mol_assert_equal($.$mol_tree2_from_string("foo\nbar\n").kids.length, 2);
            $mol_assert_equal($.$mol_tree2_from_string("foo\nbar\n").kids[1].type, "bar");
            $mol_assert_equal($.$mol_tree2_from_string("foo\n\n\n").kids.length, 1);
            $mol_assert_equal($.$mol_tree2_from_string("=foo\n\\bar\n").kids.length, 2);
            $mol_assert_equal($.$mol_tree2_from_string("=foo\n\\bar\n").kids[1].value, "bar");
            $mol_assert_equal($.$mol_tree2_from_string("foo bar \\pol\n").kids[0].kids[0].kids[0].value, "pol");
            $mol_assert_equal($.$mol_tree2_from_string("foo bar\n\t\\pol\n\t\\men\n").kids[0].kids[0].kids[1].value, "men");
            $mol_assert_equal($.$mol_tree2_from_string('foo bar \\text\n').toString(), 'foo bar \\text\n');
        },
        'Too many tabs'($) {
            const tree = `
				foo
						bar
			`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Too many tabs\ntest#3:1/6\n!!!!!!\n\t\t\t\t\t\tbar');
        },
        'Too few tabs'($) {
            const tree = `
					foo
				bar
			`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Too few tabs\ntest#3:1/4\n!!!!\n\t\t\t\tbar');
        },
        'Wrong nodes separator at start'($) {
            const tree = `foo\n \tbar\n`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Wrong nodes separator\ntest#2:1/2\n!!\n \tbar');
        },
        'Wrong nodes separator in the middle'($) {
            const tree = `foo  bar\n`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Wrong nodes separator\ntest#1:5/1\n    !\nfoo  bar');
        },
        'Unexpected EOF, LF required'($) {
            const tree = `	foo`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Unexpected EOF, LF required\ntest#1:5/1\n	   !\n	foo');
        },
        'Errors skip and collect'($) {
            const tree = `foo  bar`;
            const errors = [];
            const $$ = $.$mol_ambient({
                $mol_fail: (error) => {
                    errors.push(error.message);
                    return null;
                }
            });
            const res = $$.$mol_tree2_from_string(tree, 'test');
            $mol_assert_like(errors, [
                'Wrong nodes separator\ntest#1:5/1\n    !\nfoo  bar',
                'Unexpected EOF, LF required\ntest#1:9/1\n        !\nfoo  bar',
            ]);
            $mol_assert_equal(res.toString(), 'foo bar\n');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function check(tree, ideal) {
        $mol_assert_equal(tree.toString(), $$.$mol_tree2_from_string(ideal).toString());
    }
    $mol_test({
        'inserting'($) {
            check($.$mol_tree2_from_string(`
					a b c d
				`).insert($mol_tree2.struct('x'), 'a', 'b', 'c'), `
					a b x
				`);
            check($.$mol_tree2_from_string(`
					a b
				`).insert($mol_tree2.struct('x'), 'a', 'b', 'c', 'd'), `
					a b c x
				`);
            check($.$mol_tree2_from_string(`
					a b c d
				`)
                .insert($mol_tree2.struct('x'), 0, 0, 0), `
					a b x
				`);
            check($.$mol_tree2_from_string(`
					a b
				`)
                .insert($mol_tree2.struct('x'), 0, 0, 0, 0), `
					a b \\
						x
				`);
            check($.$mol_tree2_from_string(`
					a b c d
				`)
                .insert($mol_tree2.struct('x'), null, null, null), `
					a b x
				`);
            check($.$mol_tree2_from_string(`
					a b
				`)
                .insert($mol_tree2.struct('x'), null, null, null, null), `
					a b \\
						x
				`);
        },
        'updating'($) {
            check($.$mol_tree2_from_string(`
					a b c d
				`).update([], 'a', 'b', 'c')[0], `
					a b
				`);
            check($.$mol_tree2_from_string(`
					a b c d
				`).update([$mol_tree2.struct('x')])[0], `
					x
				`);
            check($.$mol_tree2_from_string(`
					a b c d
				`).update([$mol_tree2.struct('x'), $mol_tree2.struct('y')], 'a', 'b', 'c')[0], `
					a b
						x
						y
				`);
        },
        'deleting'($) {
            const base = $.$mol_tree2_from_string(`
				a b c d
			`);
            check(base.insert(null, 'a', 'b', 'c'), `
					a b
				`);
            check(base.update(base.select('a', 'b', 'c', null).kids, 'a', 'b', 'c')[0], `
					a b d
				`);
            check(base.insert(null, 0, 0, 0), `
					a b
				`);
        },
        'hack'($) {
            const res = $.$mol_tree2_from_string(`
				foo bar xxx
			`)
                .hack({
                'bar': (input, belt) => [input.struct('777', input.hack(belt))],
            });
            $mol_assert_equal(res.map(String), ['foo 777 xxx\n']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function get_parts(str) {
        return $$.$mol_view_tree2_prop_parts($mol_tree2.struct(str));
    }
    $mol_test({
        'wrong order'($) {
            $mol_assert_fail(() => {
                get_parts('some_bla?*');
            }, 'Required prop like some*? at `?#1:1/0`');
        },
        'empty'($) {
            $mol_assert_fail(() => {
                get_parts('');
            }, 'Required prop like some*? at `?#1:1/0`');
        },
        'prop in upper case'($) {
            const parts = get_parts('Close_icon');
            $mol_assert_equal(parts.name, 'Close_icon');
            $mol_assert_equal(parts.key, '');
            $mol_assert_equal(parts.next, '');
        },
        'prop with index'($) {
            const parts = get_parts('some_bla*');
            $mol_assert_equal(parts.name, 'some_bla');
            $mol_assert_equal(parts.key, '*');
            $mol_assert_equal(parts.next, '');
        },
        'prop with index and value'($) {
            const parts = get_parts('some_bla*?');
            $mol_assert_equal(parts.name, 'some_bla');
            $mol_assert_equal(parts.key, '*');
            $mol_assert_equal(parts.next, '?');
        },
        'legacy indexed'($) {
            const parts = get_parts('Some*default');
            $mol_assert_equal(parts.name, 'Some');
            $mol_assert_equal(parts.key, '*default');
            $mol_assert_equal(parts.next, '');
        },
        'legacy indexed value'($) {
            const parts = get_parts('Some*k?v');
            $mol_assert_equal(parts.name, 'Some');
            $mol_assert_equal(parts.key, '*k');
            $mol_assert_equal(parts.next, '?');
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        const d = '$';
        const file_name = '/mol/view/tree2/class/props.test.ts';
        function normalize($, src, dest) {
            const mod = $.$mol_tree2_from_string(src, file_name);
            const input = $.$mol_view_tree2_class_props(mod.kids[0]).join('');
            const output = dest ? $$.$mol_tree2_from_string(dest, 'reference').toString() : '';
            return { input, output };
        }
        $mol_test({
            'dupes merge'($) {
                const src = `
				${d}my_test ${d}my_super
					query? \\
					Query $mol_string
						value? <=> query? \\
					Suggest_label ${d}mol_dimmer
						needle <= query? \\
						key * escape? <=> clear? null
					Clear ${d}mol_button_minor
						click? <=> clear? null
			`;
                const dest = `
				query? \\
				clear? null
				Query $mol_string value? <=> query?
				Suggest_label $mol_dimmer
					needle <= query?
					key * escape? <=> clear?
				Clear $mol_button_minor click? <=> clear?
			`;
                const res = normalize($, src, dest);
                $mol_assert_equal(res.input, res.output);
            },
            'left and bidi common'($) {
                const src = `
				${d}my_test ${d}my_super
					title @ \\title
					sub2 /
						<= Close_icon ${d}mol_icon_cross
					sub /
						<= Title ${d}mol_view
							sub /
								<= title
						<= Close ${d}mol_button
							title \\close
							click? <=> close? null
			`;
                const dest = `
				Close_icon ${d}mol_icon_cross
				Title ${d}mol_view sub / <= title
				close? null
				Close ${d}mol_button
					title \\close
					click? <=> close?
				title @ \\title
				sub2 / <= Close_icon
				sub /
					<= Title
					<= Close
			`;
                const res = normalize($, src, dest);
                $mol_assert_equal(res.input, res.output);
            },
            'right bind levels'($) {
                const src = `
				${d}my_test ${d}my_super
					Dog ${d}mol_view_tree2_class_test_dog
						Mouth => Dog_mouth
							animation => dog_animation
					plugins /
						<= Human* ${d}mol_view_tree2_class_test_human
							Mouth => Human_mouth
								animation => human_animation
									text => human_text
			`;
                const dest = `
				Dog_mouth = Dog Mouth
				dog_animation = Dog_mouth animation
				Human_mouth = Human* Mouth
				human_animation = Human_mouth animation
				human_text = human_animation text
				Human* $mol_view_tree2_class_test_human Mouth => Human_mouth animation => human_animation text => human_text
				Dog $mol_view_tree2_class_test_dog Mouth => Dog_mouth animation => dog_animation
				plugins / <= Human*
			`;
                const res = normalize($, src, dest);
                $mol_assert_equal(res.input, res.output);
            },
            'good right bind dupes'($) {
                const src = `
				${d}my_test ${d}my_super
					Suggest_label ${d}mol_dimmer
						clear? => clear?
					Clear ${d}mol_button_minor
						click?e <=> clear?e
			`;
                const dest = `
				clear? = Suggest_label clear?
				Suggest_label $mol_dimmer clear? => clear?
				Clear $mol_button_minor click? <=> clear?
			`;
                const res = normalize($, src, dest);
                $mol_assert_equal(res.input, res.output);
            },
            'conflicting right bind dupes'($) {
                const src = `
				${d}my_test ${d}my_super
					Suggest_label ${d}mol_dimmer
						clear => clear
					Clear ${d}mol_button_minor
						click? <=> clear? null
			`;
                $mol_assert_fail(() => normalize($, src).input, `Need an equal default values at \`/mol/view/tree2/class/props.test.ts#4:16/5\` vs \`/mol/view/tree2/class/props.test.ts#6:18/6\`
<=>
/mol/view/tree2/class/props.test.ts#6:14/3
click?
/mol/view/tree2/class/props.test.ts#6:7/6
$mol_button_minor
/mol/view/tree2/class/props.test.ts#5:12/17
Clear
/mol/view/tree2/class/props.test.ts#5:6/5`);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'config by value'() {
            const N = $mol_data_setup((a) => a, 5);
            $mol_assert_equal(N.config, 5);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'function'() {
            $mol_assert_not($mol_func_is_class(function () { }));
        },
        'generator'() {
            $mol_assert_not($mol_func_is_class(function* () { }));
        },
        'async'() {
            $mol_assert_not($mol_func_is_class(async function () { }));
        },
        'arrow'() {
            $mol_assert_not($mol_func_is_class(() => null));
        },
        'named class'() {
            $mol_assert_ok($mol_func_is_class(class Foo {
            }));
        },
        'unnamed class'() {
            $mol_assert_ok($mol_func_is_class(class {
            }));
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_test({
        // @todo enable on strict
        // 'no functions'() {
        // 	const stringify = $mol_data_pipe()
        // 	type Type = $mol_type_assert<
        // 		typeof stringify,
        // 		( input : never )=> never
        // 	>
        // },
        'single function'() {
            const stringify = $mol_data_pipe((input) => input.toString());
            $mol_assert_equal(stringify(5), '5');
        },
        'two functions'() {
            const isLong = $mol_data_pipe((input) => input.toString(), (input) => input.length > 2);
            $mol_assert_equal(isLong(5.0), false);
            $mol_assert_equal(isLong(5.1), true);
        },
        'three functions'() {
            const pattern = $mol_data_pipe((input) => input.toString(), (input) => new RegExp(input), (input) => input.toString());
            $mol_assert_equal(pattern(5), '/5/');
        },
        'classes'() {
            class Box {
                value;
                constructor(value) {
                    this.value = value;
                }
            }
            const boxify = $mol_data_pipe((input) => input.toString(), Box);
            $mol_assert_ok(boxify(5) instanceof Box);
            $mol_assert_like(boxify(5).value, '5');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const convert = $mol_data_pipe($mol_tree2_from_string, $mol_tree2_js_to_text, $mol_tree2_text_to_string);
    $mol_test({
        'boolean'() {
            $mol_assert_equal(convert(`
					true
				`), 'true\n');
        },
        'number'() {
            $mol_assert_equal(convert(`
					1.2
				`), '1.2\n');
            $mol_assert_equal(convert(`
					1e+2
				`), '1e+2\n');
            $mol_assert_equal(convert(`
					-Infinity
				`), '-Infinity\n');
            $mol_assert_equal(convert(`
					NaN
				`), 'NaN\n');
        },
        'variable'() {
            $mol_assert_equal(convert(`
					a
				`), 'a\n');
            $mol_assert_equal(convert(`
					$
				`), '$\n');
            $mol_assert_equal(convert(`
					a0
				`), 'a0\n');
        },
        'string'() {
            $mol_assert_equal(convert(`
					\\
						\\foo
						\\bar
				`), '"foo\\nbar"\n');
            $mol_assert_equal(convert(`
					\`\`
						\\foo
						bar
				`), '`foo${bar}`\n');
        },
        'wrong name'() {
            $mol_assert_fail(() => convert(`
					foo+bar
				`), 'Wrong node type\nfoo+bar\n?#2:6/7');
        },
        'array'() {
            $mol_assert_equal(convert(`
					[,]
				`), '[]\n');
            $mol_assert_equal(convert(`
					[,]
						1
						2
				`), '[1, 2]\n');
        },
        'last'() {
            $mol_assert_equal(convert(`
					(,)
						1
						2
				`), '(1, 2)\n');
        },
        'scope'() {
            $mol_assert_equal(convert(`
					{;}
						1
						2
				`), '{\n\t1;\n\t2;\n}\n');
        },
        'object'() {
            $mol_assert_equal(convert(`
					{,}
				`), '{}\n');
            $mol_assert_equal(convert(`
					{,}
						foo
						bar
				`), '{foo, bar}\n');
            $mol_assert_equal(convert(`
					{,}
						:
							\\foo
							1
						:
							bar
							2
				`), '{"foo": 1, [bar]: 2}\n');
        },
        'regexp'() {
            $mol_assert_equal(convert(`
					/./
						.source \\foo\\n
						.multiline
						.ignoreCase
						.global
				`), '/foo\\\\n/mig\n');
        },
        'unary'() {
            $mol_assert_equal(convert(`
					void yield* yield await ~ ! - + 1
				`), 'void yield* yield await ~!-+1\n');
        },
        'binary'() {
            $mol_assert_equal(convert(`
					(+)
						1
						2
						3
				`), '(\n\t1 + \n\t2 + \n\t3\n)\n');
            $mol_assert_equal(convert(`
					@++ foo
				`), 'foo++\n');
        },
        'chain'() {
            $mol_assert_equal(convert(`
					()
						foo
						[] \\bar
						[] 1
				`), '(foo.bar[1])\n');
            $mol_assert_equal(convert(`
					()
						foo
						[] 1
						(,)
				`), '(foo[1]())\n');
            $mol_assert_equal(convert(`
					()
						[,] 0
						[] 1
						(,)
							2
							3
				`), '([0][1](2, 3))\n');
        },
        'function'() {
            $mol_assert_equal(convert(`
					=>
						(,)
						1
				`), '() => 1\n');
            $mol_assert_equal(convert(`
					async=>
						(,)
						1
				`), 'async () => 1\n');
            $mol_assert_equal(convert(`
					function
						foo
						(,)
						{;}
				`), 'function foo(){}\n');
            $mol_assert_equal(convert(`
					function
						(,) foo
						{;} debugger
				`), 'function (foo){\n\tdebugger;\n}\n');
            $mol_assert_equal(convert(`
					function*
						(,)
						{;}
				`), 'function* (){}\n');
            $mol_assert_equal(convert(`
					async
						(,)
						{;}
				`), 'async function (){}\n');
            $mol_assert_equal(convert(`
					async*
						(,) foo
						{;} debugger
				`), 'async function* (foo){\n\tdebugger;\n}\n');
        },
        'class'() {
            $mol_assert_equal(convert(`
					class
						Foo
						{}
				`), 'class Foo {}\n');
            $mol_assert_equal(convert(`
					class
						Foo
						extends Bar
						{}
				`), 'class Foo extends Bar {}\n');
            $mol_assert_equal(convert(`
					class {}
						.
							\\foo
							(,)
							{;}
				`), 'class {\n\tfoo(){}\n}\n');
            $mol_assert_equal(convert(`
					class {}
						static
							\\foo
							(,)
							{;}
				`), 'class {\n\tstatic ["foo"](){}\n}\n');
            $mol_assert_equal(convert(`
					class {}
						get
							\\foo
							(,)
							{;}
				`), 'class {\n\tget ["foo"](){}\n}\n');
            $mol_assert_equal(convert(`
					class {}
						set
							\\foo
							(,) bar
							{;}
				`), 'class {\n\tset ["foo"](bar){}\n}\n');
        },
        'if'() {
            $mol_assert_equal(convert(`
					?:
						1
						2
						3
				`), '1 ? 2 : 3\n');
            $mol_assert_equal(convert(`
					if
						() 1
						{;} 2
				`), 'if(1) {\n\t2;\n}\n');
            $mol_assert_equal(convert(`
					if
						() 1
						{;} 2
						{;} 3
				`), 'if(1) {\n\t2;\n}else{\n\t3;\n}\n');
        },
        'assign'() {
            $mol_assert_equal(convert(`
					=
						foo
						bar
				`), 'foo = bar\n');
            $mol_assert_equal(convert(`
					=
						[,]
							foo
							bar
						[,]
							1
							2
				`), '[foo, bar] = [1, 2]\n');
            $mol_assert_equal(convert(`
					let foo
				`), 'let foo\n');
            $mol_assert_equal(convert(`
					let
						foo
						bar
				`), 'let foo = bar\n');
            $mol_assert_equal(convert(`
					+=
						foo
						bar
				`), 'foo += bar\n');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    function $mol_vlq_encode(val) {
        const sign = val < 0 ? 1 : 0;
        if (sign)
            val = -val;
        let index = sign | ((val & 0b1111) << 1);
        val >>>= 4;
        let res = '';
        while (val) {
            index |= 1 << 5;
            res += alphabet[index];
            if (!val)
                break;
            index = val & 0b11111;
            val >>>= 5;
        }
        res += alphabet[index];
        return res;
    }
    $.$mol_vlq_encode = $mol_vlq_encode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'min'() {
            $mol_assert_equal($mol_vlq_encode(Number.MIN_SAFE_INTEGER), '//////H');
        },
        'negative'() {
            $mol_assert_equal($mol_vlq_encode(-1), 'D');
        },
        'zero'() {
            $mol_assert_equal($mol_vlq_encode(0), 'A');
        },
        'binom'() {
            $mol_assert_equal($mol_vlq_encode(67), 'mE');
        },
        'max'() {
            $mol_assert_equal($mol_vlq_encode(Number.MAX_SAFE_INTEGER), '+/////H');
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_text_to_sourcemap(tree) {
        let col = 1;
        let prev_span;
        let prev_index = 0;
        let prev_col = 1;
        let mappings = '';
        let line = [];
        const file_indexes = new Map();
        const file_sources = new Map();
        function span2index(span) {
            if (file_indexes.has(span.uri))
                return file_indexes.get(span.uri);
            const index = file_indexes.size;
            file_indexes.set(span.uri, index);
            file_sources.set(span.uri, span.source);
            return index;
        }
        function next_line() {
            if (!line.length)
                return;
            mappings += line.join(',') + ';';
            line = [];
            col = 1;
            prev_col = 1;
        }
        function visit(text, prefix, inline) {
            function indent() {
                col += prefix;
            }
            if (inline && text.type === 'indent')
                next_line();
            if (prev_span !== text.span || col === 1) {
                const index = span2index(text.span);
                line.push($mol_vlq_encode(col - prev_col) +
                    $mol_vlq_encode(index - prev_index) +
                    $mol_vlq_encode(text.span.row - (prev_span?.row ?? 1)) +
                    $mol_vlq_encode(text.span.col - (prev_span?.col ?? 1)));
                prev_col = col;
                prev_span = text.span;
                prev_index = index;
            }
            if (text.type === 'indent') {
                for (let kid of text.kids) {
                    visit(kid, prefix + 1, false);
                }
                if (inline)
                    next_line();
            }
            else if (text.type === 'line') {
                if (!inline)
                    indent();
                for (let kid of text.kids) {
                    visit(kid, prefix, true);
                }
                if (!inline)
                    next_line();
            }
            else {
                if (!inline)
                    indent();
                col += text.text().length;
                if (!inline)
                    next_line();
            }
        }
        for (let kid of tree.kids) {
            visit(kid, 0, false);
        }
        next_line();
        const map = {
            version: 3,
            sources: [...file_sources.keys()],
            sourcesContent: [...file_sources.values()],
            mappings,
        };
        return map;
    }
    $.$mol_tree2_text_to_sourcemap = $mol_tree2_text_to_sourcemap;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'sample source mapped lang'($) {
            const source = {
                script1: `1@\n2`,
                script2: `***`
            };
            const span = {
                script1: $mol_span.entire('script1', source.script1),
                script2: $mol_span.entire('script2', source.script2),
            };
            const tree = $mol_tree2.list([
                $mol_tree2.struct('line', [
                    $mol_tree2.data('"use strict";', [], span.script1.after()),
                    $mol_tree2.data('console.log(11);', [], span.script1.slice(0, 1)),
                    $mol_tree2.data('console.log(21);', [], span.script2),
                    $mol_tree2.data('console.log(12);', [], span.script1.span(2, 1, 1)),
                ], span.script1),
            ], span.script1);
            $mol_assert_like($.$mol_tree2_text_to_string(tree), '"use strict";console.log(11);console.log(21);console.log(12);\n');
            $mol_assert_like($.$mol_tree2_text_to_sourcemap(tree), {
                "version": 3,
                "sources": [
                    "script1",
                    "script2"
                ],
                "sourcesContent": [source.script1, source.script2],
                "mappings": "AAAA,AAAI,aAAJ,gBCAA,gBDCA;"
            });
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_sourcemap_url(uri, type = 'js') {
        if (type === 'css')
            return `\n/*# sourceMappingURL=${uri}*/`;
        return `\n//# sourceMappingURL=${uri}`;
    }
    $.$mol_sourcemap_url = $mol_sourcemap_url;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const prefix = '# sourceMappingURL=data:application/json,';
    const end_comment = ' */';
    function $mol_sourcemap_dataurl_decode(data) {
        const index = data.lastIndexOf(prefix);
        if (index === -1)
            return undefined;
        data = data.substring(index + prefix.length);
        if (data.endsWith(end_comment))
            data = data.substring(0, data.length - end_comment.length);
        const decoded = this.decodeURIComponent(data);
        try {
            const map = JSON.parse(decoded);
            if (!map)
                return undefined;
            if (typeof map.mappings === 'string' && map.mappings.startsWith(';;')) {
                map.mappings = map.mappings.substring(2);
            }
            return map;
        }
        catch (e) {
            if (e instanceof Error)
                e.message += ', origin=' + decoded;
            $mol_fail_hidden(e);
        }
    }
    $.$mol_sourcemap_dataurl_decode = $mol_sourcemap_dataurl_decode;
    function $mol_sourcemap_dataurl_encode(map, type = 'js') {
        const str = JSON.stringify({ ...map, mappings: ';;' + map.mappings });
        return this.$mol_sourcemap_url('data:application/json,' + this.encodeURIComponent(str), type);
    }
    $.$mol_sourcemap_dataurl_encode = $mol_sourcemap_dataurl_encode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_text_to_string_mapped(text, type) {
        const code = this.$mol_tree2_text_to_string(text);
        const map = this.$mol_tree2_text_to_sourcemap(text);
        const chunk = this.$mol_sourcemap_dataurl_encode(map, type);
        return code + chunk;
    }
    $.$mol_tree2_text_to_string_mapped = $mol_tree2_text_to_string_mapped;
    function $mol_tree2_text_to_string_mapped_js(text) {
        return this.$mol_tree2_text_to_string_mapped(text, 'js');
    }
    $.$mol_tree2_text_to_string_mapped_js = $mol_tree2_text_to_string_mapped_js;
    function $mol_tree2_text_to_string_mapped_css(text) {
        return this.$mol_tree2_text_to_string_mapped(text, 'css');
    }
    $.$mol_tree2_text_to_string_mapped_css = $mol_tree2_text_to_string_mapped_css;
})($ || ($ = {}));

;
	($.$mol_view_tree2_to_js_test_ex_array_slot_foo) = class $mol_view_tree2_to_js_test_ex_array_slot_foo extends ($.$mol_object) {
		ins1(){
			return "ins1";
		}
		sub_ins1(){
			return 1;
		}
		sub_ins(){
			return [(this.sub_ins1())];
		}
		ins2(){
			return "ins2";
		}
		insert(){
			return [
				2, 
				3, 
				(this.ins1()), 
				...(this.sub_ins()), 
				(this.ins2())
			];
		}
		foot2(){
			return "foot2";
		}
		foot(){
			return [
				1, 
				true, 
				"foot1", 
				...(this.insert()), 
				(this.foot2())
			];
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_simple_nan_foo) = class $mol_view_tree2_to_js_test_ex_simple_nan_foo extends ($.$mol_object) {
		a(){
			return NaN;
		}
		b(){
			return +NaN;
		}
		c(){
			return -NaN;
		}
		d(){
			return +Infinity;
		}
		e(){
			return -Infinity;
		}
		f(){
			return Infinity;
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_structural_foo) = class $mol_view_tree2_to_js_test_ex_structural_foo extends ($.$mol_object) {
		lol(){
			return 2;
		}
		bar(){
			return {
				"alpha": 1, 
				"beta": {}, 
				"xxx": (this.lol())
			};
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_array_union_foo) = class $mol_view_tree2_to_js_test_ex_array_union_foo extends ($.$mol_object) {
		foo(){
			return "c";
		}
		bar(){
			return [
				"a", 
				(this.foo()), 
				"b"
			];
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_array_number_foo) = class $mol_view_tree2_to_js_test_ex_array_number_foo extends ($.$mol_object) {
		bar(){
			return [
				-NaN, 
				-Infinity, 
				+Infinity, 
				0
			];
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_bidi_indexed_foo) = class $mol_view_tree2_to_js_test_ex_bidi_indexed_foo extends ($.$mol_object) {
		owner(id, next){
			if(next !== undefined) return next;
			return null;
		}
		indexed(id, next){
			return (this.owner(id, next));
		}
	};
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_bidi_indexed_foo.prototype), "owner"));


;
	($.$mol_view_tree2_to_js_test_ex_array_boolean_foo) = class $mol_view_tree2_to_js_test_ex_array_boolean_foo extends ($.$mol_object) {
		bar(){
			return [false, true];
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_array_indexed_foo) = class $mol_view_tree2_to_js_test_ex_array_indexed_foo extends ($.$mol_object) {
		tag1(id){
			return "t1";
		}
		tag2(id){
			return "t2";
		}
		slot(id){
			return [(this.tag2(id))];
		}
		tags(id){
			return [(this.tag1(id)), ...(this.slot(id))];
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_bidi_chaining_foo) = class $mol_view_tree2_to_js_test_ex_bidi_chaining_foo extends ($.$mol_object) {
		c(next){
			if(next !== undefined) return next;
			return null;
		}
		b(next){
			return (this.c(next));
		}
		a(next){
			return (this.b(next));
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_bidi_chaining_foo.prototype), "c"));


;
	($.$mol_view_tree2_to_js_test_ex_bidi_fallback_foo) = class $mol_view_tree2_to_js_test_ex_bidi_fallback_foo extends ($.$mol_object) {
		bar2(next){
			if(next !== undefined) return next;
			return 1;
		}
		bar1(next){
			return (this.bar2(next));
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_bidi_fallback_foo.prototype), "bar2"));


;
	($.$mol_view_tree2_to_js_test_ex_left_chaining_foo) = class $mol_view_tree2_to_js_test_ex_left_chaining_foo extends ($.$mol_object) {
		d(next){
			if(next !== undefined) return next;
			return 0;
		}
		c(next){
			if(next !== undefined) return next;
			return (this.d());
		}
		b(){
			return (this.c());
		}
		a(){
			return (this.b());
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_left_chaining_foo.prototype), "d"));
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_left_chaining_foo.prototype), "c"));


;
	($.$mol_view_tree2_to_js_test_ex_right_indexed_foo) = class $mol_view_tree2_to_js_test_ex_right_indexed_foo extends ($.$mol_object) {
		a(next){
			if(next !== undefined) return next;
			return {"some": 123};
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_right_indexed_foo.prototype), "a"));
	($.$mol_view_tree2_to_js_test_ex_right_indexed_bar) = class $mol_view_tree2_to_js_test_ex_right_indexed_bar extends ($.$mol_object) {
		b(id){
			return (this.Cls(id).a());
		}
		Cls(id){
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_right_indexed_foo();
			return obj;
		}
	};
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_right_indexed_bar.prototype), "Cls"));


;
	($.$mol_view_tree2_to_js_test_ex_simple_string_foo) = class $mol_view_tree2_to_js_test_ex_simple_string_foo extends ($.$mol_object) {
		hardcoded(){
			return "First\nSecond";
		}
		localized(){
			return (this.$.$mol_locale.text("$mol_view_tree2_to_js_test_ex_simple_string_foo_localized"));
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_left_read_only_foo) = class $mol_view_tree2_to_js_test_ex_left_read_only_foo extends ($.$mol_object) {
		bar2(next){
			if(next !== undefined) return next;
			return 1;
		}
		bar1(){
			return (this.bar2());
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_left_read_only_foo.prototype), "bar2"));


;
	($.$mol_view_tree2_to_js_test_ex_right_hierarchy_foo) = class $mol_view_tree2_to_js_test_ex_right_hierarchy_foo extends ($.$mol_object) {
		indexed_title(id, next){
			return (this.Indexed(id).title(next));
		}
		indexed_id(id){
			return 0;
		}
		prj_domain(id){
			return (this.prj().domain(id));
		}
		prj_user(id){
			return (this.prj_domain(id).user());
		}
		prj_user_id(id){
			return (this.prj_user(id).id());
		}
		Indexed(id){
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_right_hierarchy_bar();
			(obj.id) = () => ((this.indexed_id(id)));
			return obj;
		}
		prj(){
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_right_hierarchy_bar();
			return obj;
		}
	};
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_right_hierarchy_foo.prototype), "Indexed"));
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_right_hierarchy_foo.prototype), "prj"));


;
	($.$mol_view_tree2_to_js_test_ex_right_read_only_foo) = class $mol_view_tree2_to_js_test_ex_right_read_only_foo extends ($.$mol_object) {
		a(id, next){
			if(next !== undefined) return next;
			return null;
		}
	};
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_right_read_only_foo.prototype), "a"));
	($.$mol_view_tree2_to_js_test_ex_right_read_only_bar) = class $mol_view_tree2_to_js_test_ex_right_read_only_bar extends ($.$mol_object) {
		b(id, next){
			return (this.Obj().a(id, next));
		}
		Obj(){
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_right_read_only_foo();
			return obj;
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_right_read_only_bar.prototype), "Obj"));


;
	($.$mol_view_tree2_to_js_test_ex_structural_dict_foo) = class $mol_view_tree2_to_js_test_ex_structural_dict_foo extends ($.$mol_object) {
		bar(){
			return {"alpha": 1, "beta": "a"};
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_array_with_types_foo) = class $mol_view_tree2_to_js_test_ex_array_with_types_foo extends ($.$mol_object) {
		arr(){
			return [];
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_array_inheritance_foo) = class $mol_view_tree2_to_js_test_ex_array_inheritance_foo extends ($.$mol_object) {
		arr(){
			return ["v1"];
		}
	};
	($.$mol_view_tree2_to_js_test_ex_array_inheritance_bar) = class $mol_view_tree2_to_js_test_ex_array_inheritance_bar extends ($.$mol_view_tree2_to_js_test_ex_array_inheritance_foo) {
		arr(){
			return [
				"v3", 
				...(super.arr()), 
				"v4"
			];
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_bidi_legacy_value_foo) = class $mol_view_tree2_to_js_test_ex_bidi_legacy_value_foo extends ($.$mol_object) {
		b(next){
			if(next !== undefined) return next;
			return 1;
		}
		a(next){
			return (this.b(next));
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_bidi_legacy_value_foo.prototype), "b"));


;
	($.$mol_view_tree2_to_js_test_ex_simple_typed_null_foo) = class $mol_view_tree2_to_js_test_ex_simple_typed_null_foo extends ($.$mol_object) {
		a(){
			return null;
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_bidi_in_dictionary_foo) = class $mol_view_tree2_to_js_test_ex_bidi_in_dictionary_foo extends ($.$mol_object) {
		run(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {"click": (next) => (this.run(next))};
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_bidi_in_dictionary_foo.prototype), "run"));


;
	($.$mol_view_tree2_to_js_test_ex_right_in_left_foo) = class $mol_view_tree2_to_js_test_ex_right_in_left_foo extends ($.$mol_object) {
		a(){
			return null;
		}
	};
	($.$mol_view_tree2_to_js_test_ex_right_in_left_bar) = class $mol_view_tree2_to_js_test_ex_right_in_left_bar extends ($.$mol_object) {
		b(){
			return (this.Cls().a());
		}
		Cls(){
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_right_in_left_foo();
			return obj;
		}
		Menu_title(){
			return (this.Menu().Title());
		}
		Menu(){
			const obj = new this.$.$mol_page();
			return obj;
		}
		foo(){
			return (this.Cls());
		}
		pages(){
			return [(this.Menu())];
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_right_in_left_bar.prototype), "Cls"));
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_right_in_left_bar.prototype), "Menu"));


;
	($.$mol_view_tree2_to_js_test_ex_simple_empty_class_foo) = class $mol_view_tree2_to_js_test_ex_simple_empty_class_foo extends ($.$mol_object) {};


;
	($.$mol_view_tree2_to_js_test_ex_simple_two_classes_foo) = class $mol_view_tree2_to_js_test_ex_simple_two_classes_foo extends ($.$mol_object) {
		str(){
			return "some";
		}
	};
	($.$mol_view_tree2_to_js_test_ex_simple_two_classes_bar) = class $mol_view_tree2_to_js_test_ex_simple_two_classes_bar extends ($.$mol_view_tree2_to_js_test_ex_simple_two_classes_foo) {
		str(){
			return "some2";
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_simple_factory_props_bar) = class $mol_view_tree2_to_js_test_ex_simple_factory_props_bar extends ($.$mol_object) {
		sub(){
			return [];
		}
		loc(){
			return "v2";
		}
		deep(){
			return {"loc": (this.$.$mol_locale.text("$mol_view_tree2_to_js_test_ex_simple_factory_props_bar_deep_loc"))};
		}
		some(){
			return false;
		}
	};
	($.$mol_view_tree2_to_js_test_ex_simple_factory_props_foo) = class $mol_view_tree2_to_js_test_ex_simple_factory_props_foo extends ($.$mol_object) {
		button(){
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_simple_factory_props_bar();
			(obj.some) = () => (true);
			(obj.loc) = () => ((this.$.$mol_locale.text("$mol_view_tree2_to_js_test_ex_simple_factory_props_foo_button_loc")));
			(obj.deep) = () => ({"loc": (this.$.$mol_locale.text("$mol_view_tree2_to_js_test_ex_simple_factory_props_foo_button_deep_loc"))});
			(obj.sub) = () => ([1]);
			return obj;
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_simple_factory_props_foo.prototype), "button"));


;
	($.$mol_view_tree2_to_js_test_ex_simple_default_indexed_foo) = class $mol_view_tree2_to_js_test_ex_simple_default_indexed_foo extends ($.$mol_object) {
		a_b(id, next){
			if(next !== undefined) return next;
			return 0;
		}
		legacy(id, next){
			if(next !== undefined) return next;
			return 0;
		}
	};
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_simple_default_indexed_foo.prototype), "a_b"));
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_simple_default_indexed_foo.prototype), "legacy"));


;
	($.$mol_view_tree2_to_js_test_ex_structural_complex_key_foo) = class $mol_view_tree2_to_js_test_ex_structural_complex_key_foo extends ($.$mol_object) {
		dictionary(){
			return {
				"raw data key": "1", 
				"key2": "2", 
				"key3": "3"
			};
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_array_constructor_tuple_foo) = class $mol_view_tree2_to_js_test_ex_array_constructor_tuple_foo extends ($.$mol_object) {
		text(){
			return "123";
		}
		text_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_klass_tuple([(this.text())], {"type": "text/plain"});
			return obj;
		}
		blobs(){
			return [(this.text_blob())];
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_array_constructor_tuple_foo.prototype), "text_blob"));


;
	($.$mol_view_tree2_to_js_test_ex_left_second_level_index_bar) = class $mol_view_tree2_to_js_test_ex_left_second_level_index_bar extends ($.$mol_object) {
		localized(){
			return "";
		}
	};
	($.$mol_view_tree2_to_js_test_ex_left_second_level_index_foo) = class $mol_view_tree2_to_js_test_ex_left_second_level_index_foo extends ($.$mol_object) {
		some(id, next){
			if(next !== undefined) return next;
			return (this.$.$mol_locale.text("$mol_view_tree2_to_js_test_ex_left_second_level_index_foo_some"));
		}
		owner(id, next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_left_second_level_index_bar();
			(obj.localized) = () => ((this.some(id)));
			return obj;
		}
		cls(id){
			return (this.owner(id));
		}
	};
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_left_second_level_index_foo.prototype), "some"));
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_left_second_level_index_foo.prototype), "owner"));


;
	($.$mol_view_tree2_to_js_test_ex_structural_quoted_props_foo) = class $mol_view_tree2_to_js_test_ex_structural_quoted_props_foo extends ($.$mol_object) {
		bar(){
			return {"a$": 1, "b-t": {}};
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_structural_spread_other_foo) = class $mol_view_tree2_to_js_test_ex_structural_spread_other_foo extends ($.$mol_object) {
		test(){
			return {"aaa": 123};
		}
		field(){
			return {"bbb": 321, ...(this.test())};
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_array_of_array_or_object_foo) = class $mol_view_tree2_to_js_test_ex_array_of_array_or_object_foo extends ($.$mol_object) {
		complex(){
			return [
				"1", 
				[true], 
				["1", 21], 
				{"a": 1, "str": "some"}
			];
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_bidi_localized_in_object_foo) = class $mol_view_tree2_to_js_test_ex_bidi_localized_in_object_foo extends ($.$mol_object) {
		outer(next){
			if(next !== undefined) return next;
			return (this.$.$mol_locale.text("$mol_view_tree2_to_js_test_ex_bidi_localized_in_object_foo_outer"));
		}
		obj(){
			return {"loc": (next) => (this.outer(next))};
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_bidi_localized_in_object_foo.prototype), "outer"));


;
	($.$mol_view_tree2_to_js_test_ex_bidi_with_default_object_foo) = class $mol_view_tree2_to_js_test_ex_bidi_with_default_object_foo extends ($.$mol_object) {
		owner(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_object();
			return obj;
		}
		class(next){
			return (this.owner(next));
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_bidi_with_default_object_foo.prototype), "owner"));


;
	($.$mol_view_tree2_to_js_test_ex_left_in_array_and_object_bar) = class $mol_view_tree2_to_js_test_ex_left_in_array_and_object_bar extends ($.$mol_object) {
		rows(){
			return [];
		}
	};
	($.$mol_view_tree2_to_js_test_ex_left_in_array_and_object_foo) = class $mol_view_tree2_to_js_test_ex_left_in_array_and_object_foo extends ($.$mol_object) {
		content(){
			return [];
		}
		Obj(){
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_left_in_array_and_object_bar();
			(obj.rows) = () => ((this.content()));
			return obj;
		}
		obj(){
			return {"prop": (this.Obj())};
		}
		arr(){
			return [(this.Obj())];
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_left_in_array_and_object_foo.prototype), "Obj"));


;
	($.$mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar) = class $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar extends ($.$mol_object) {
		expanded(){
			return "";
		}
	};
	($.$mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_foo) = class $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_foo extends ($.$mol_object) {
		owner(id, next){
			if(next !== undefined) return next;
			return "w";
		}
		indexed(id, next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar();
			(obj.expanded) = (next) => ((this.owner(id, next)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_foo.prototype), "owner"));
	($mol_mem_key(($.$mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_foo.prototype), "indexed"));


;
	($.$mol_view_tree2_to_js_test_ex_array_spread_other_bar) = class $mol_view_tree2_to_js_test_ex_array_spread_other_bar extends ($.$mol_object) {
		sup(){
			return ["v1"];
		}
		arr(){
			return ["v2", ...(this.sup())];
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_simple_factory_inheritance_bar) = class $mol_view_tree2_to_js_test_ex_simple_factory_inheritance_bar extends ($.$mol_object) {
		config(){
			return {"ips": ["127.0.0.1"]};
		}
	};
	($.$mol_view_tree2_to_js_test_ex_simple_factory_inheritance_foo) = class $mol_view_tree2_to_js_test_ex_simple_factory_inheritance_foo extends ($.$mol_object) {
		addon(){
			return ["1.1.1.1"];
		}
		Having(){
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_simple_factory_inheritance_bar();
			(obj.config) = () => ({"ips": [
				...(this.$.$mol_view_tree2_to_js_test_ex_simple_factory_inheritance_bar.prototype.config.call(obj).ips), 
				"0.0.0.0", 
				...(this.addon())
			]});
			return obj;
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_simple_factory_inheritance_foo.prototype), "Having"));


;
	($.$mol_view_tree2_to_js_test_ex_structural_with_inheritance_foo) = class $mol_view_tree2_to_js_test_ex_structural_with_inheritance_foo extends ($.$mol_object) {
		field(){
			return {"xxx": 123, "xxy": "test"};
		}
	};
	($.$mol_view_tree2_to_js_test_ex_structural_with_inheritance_bar) = class $mol_view_tree2_to_js_test_ex_structural_with_inheritance_bar extends ($.$mol_view_tree2_to_js_test_ex_structural_with_inheritance_foo) {
		field(){
			return {
				"yyy": 234, 
				...(super.field()), 
				"zzz": 345
			};
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_bidi_localized_default_value_foo) = class $mol_view_tree2_to_js_test_ex_bidi_localized_default_value_foo extends ($.$mol_object) {
		b(next){
			if(next !== undefined) return next;
			return (this.$.$mol_locale.text("$mol_view_tree2_to_js_test_ex_bidi_localized_default_value_foo_b"));
		}
		a(next){
			return (this.b(next));
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_bidi_localized_default_value_foo.prototype), "b"));


;
	($.$mol_view_tree2_to_js_test_ex_simple_mutable_and_read_only_foo) = class $mol_view_tree2_to_js_test_ex_simple_mutable_and_read_only_foo extends ($.$mol_object) {
		readonly(){
			return null;
		}
		mutable(next){
			if(next !== undefined) return next;
			return null;
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_simple_mutable_and_read_only_foo.prototype), "mutable"));


;
	($.$mol_view_tree2_to_js_test_ex_structural_localized_prop_value_foo) = class $mol_view_tree2_to_js_test_ex_structural_localized_prop_value_foo extends ($.$mol_object) {
		bar(){
			return {"loc": (this.$.$mol_locale.text("$mol_view_tree2_to_js_test_ex_structural_localized_prop_value_foo_bar_loc")), "baz": {"loc2": (this.$.$mol_locale.text("$mol_view_tree2_to_js_test_ex_structural_localized_prop_value_foo_bar_baz_loc2"))}};
		}
	};


;
	($.$mol_view_tree2_to_js_test_ex_left_with_separate_default_and_comment_bar) = class $mol_view_tree2_to_js_test_ex_left_with_separate_default_and_comment_bar extends ($.$mol_object) {
		rows(){
			return [];
		}
	};
	($.$mol_view_tree2_to_js_test_ex_left_with_separate_default_and_comment_foo) = class $mol_view_tree2_to_js_test_ex_left_with_separate_default_and_comment_foo extends ($.$mol_object) {
		content(){
			return 123;
		}
		Obj(){
			const obj = new this.$.$mol_view_tree2_to_js_test_ex_left_with_separate_default_and_comment_bar();
			(obj.rows) = () => ([(this.content())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_left_with_separate_default_and_comment_foo.prototype), "Obj"));


;
	($.$mol_view_tree2_to_js_test_ex_bidi_with_separate_default_in_right_part_foo) = class $mol_view_tree2_to_js_test_ex_bidi_with_separate_default_in_right_part_foo extends ($.$mol_object) {
		b(next){
			if(next !== undefined) return next;
			return false;
		}
		a(next){
			return (this.b(next));
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_bidi_with_separate_default_in_right_part_foo.prototype), "b"));


;
	($.$mol_view_tree2_to_js_test_ex_bidi_doubing_right_part_with_same_default_foo) = class $mol_view_tree2_to_js_test_ex_bidi_doubing_right_part_with_same_default_foo extends ($.$mol_object) {
		b(next){
			if(next !== undefined) return next;
			return false;
		}
		a(next){
			return (this.b(next));
		}
		c(next){
			return (this.b(next));
		}
	};
	($mol_mem(($.$mol_view_tree2_to_js_test_ex_bidi_doubing_right_part_with_same_default_foo.prototype), "b"));


;
"use strict";
var $;
(function ($) {
    class $mol_view_tree2_to_js_test_ex_klass_tuple extends $mol_object {
        tuple;
        some;
        constructor(tuple = [], some) {
            super();
            this.tuple = tuple;
            this.some = some;
        }
    }
    $.$mol_view_tree2_to_js_test_ex_klass_tuple = $mol_view_tree2_to_js_test_ex_klass_tuple;
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


;
"use strict";


;
"use strict";


;
"use strict";
var $;
(function ($) {
    class $mol_view_tree2_to_js_test_ex_right_hierarchy_bar extends $mol_object {
        title(next) {
            return 123 + (next ?? 0);
        }
        id() {
            return 0;
        }
        domain(id) {
            return {
                user() {
                    return {
                        id() {
                            return 1 + id;
                        }
                    };
                }
            };
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_tree2_to_js_test_ex_right_hierarchy_bar.prototype, "title", null);
    __decorate([
        $mol_mem_key
    ], $mol_view_tree2_to_js_test_ex_right_hierarchy_bar.prototype, "domain", null);
    $.$mol_view_tree2_to_js_test_ex_right_hierarchy_bar = $mol_view_tree2_to_js_test_ex_right_hierarchy_bar;
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
(function ($_1) {
    const str2js = (function (data, url) {
        const tree = this.$mol_tree2_from_string(data, url);
        const js_tree = this.$mol_view_tree2_to_js(tree);
        const js_text = this.$mol_tree2_js_to_text(js_tree);
        const js_str = this.$mol_tree2_text_to_string_mapped_js(js_text);
        return js_str;
    }).bind($);
    function $mol_view_tree2_to_js_test_run(tree) {
        class $mol_view_mock extends $mol_object {
        }
        const $ = { $mol_object: $mol_view_mock };
        $mol_view_mock[$mol_ambient_ref] = $;
        const src_uri = `.view.tree`;
        const js = str2js(tree, src_uri);
        eval(js);
        return $;
    }
    $_1.$mol_view_tree2_to_js_test_run = $mol_view_tree2_to_js_test_run;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Bidi bind fallback'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_bidi_fallback_foo;
            const foo = _foo.make({});
            $mol_assert_equal(foo.bar1(), foo.bar2(), 1);
            $mol_assert_equal(foo.bar2(2), foo.bar1(), 2);
            $mol_assert_equal(foo.bar1(1), foo.bar1(), 1);
            $mol_assert_equal(foo.bar1(1), foo.bar2(), 1);
            $mol_assert_equal(foo.bar2(3), foo.bar2(), foo.bar1(), 3);
        },
        'Bidi bind legacy value'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_bidi_legacy_value_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.a(), foo.b(), 1);
            $mol_assert_like(foo.b(2), foo.a(), 2);
        },
        'Bidi bind in dictionary'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_bidi_in_dictionary_foo;
            $mol_assert_like(_foo.make({ $ }).event().click({}), {});
        },
        'Bidi bind chaining'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_bidi_chaining_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.c(), foo.b(), foo.a());
        },
        'Bidi bind indexed'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_bidi_indexed_foo;
            const foo = _foo.make({ $ });
            foo.owner(1, 'a');
            foo.owner(2, 'b'),
                $mol_assert_like(foo.owner(1), foo.indexed(1), 'a');
            $mol_assert_like(foo.owner(1, 'a2'), foo.indexed(1), 'a2');
            $mol_assert_like(foo.owner(2), foo.indexed(2), 'b');
        },
        'Bidi bind indexed second level'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_foo;
            const _bar = $mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar;
            _foo.$.$mol_view_tree2_to_js_test_ex_bidi_indexed_second_level_bar = _bar;
            const foo = _foo.make({ $ });
            foo.owner(1, 'a');
            foo.owner(2, 'b');
            $mol_assert_like(foo.owner(1), foo.indexed(1).expanded(), 'a');
            $mol_assert_like(foo.owner(2), foo.indexed(2).expanded(), 'b');
        },
        'Bidi bind doubing right part with same default'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_bidi_doubing_right_part_with_same_default_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.b(), foo.c(), foo.a(), false);
        },
        'Bidi bind with separate default in right part'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_bidi_with_separate_default_in_right_part_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.b(), foo.a());
        },
        'Bidi bind index from outer scope throws error'($) {
            $mol_assert_fail(() => {
                $mol_view_tree2_to_js_test_run(`
					Foo $mol_view
						a!? $mol_view
							expanded? <=> cell_test_expanded!? null
				`);
            }, `Required prop like some*? at \`.view.tree#4:22/20\`
<=>
.view.tree#4:18/3
expanded?
.view.tree#4:8/9
$mol_view
.view.tree#3:11/9
a!?
.view.tree#3:7/3`);
        },
        'Bidi bind with default object'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_bidi_with_default_object_foo;
            const foo = _foo.make({ $ });
            const view = new $mol_object;
            foo.owner(view);
            $mol_assert_like(foo.owner(), foo.class(), view);
        },
        'Bidi bind localized default value'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_bidi_localized_default_value_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.b(), foo.a(), `$mol_view_tree2_to_js_test_ex_bidi_localized_default_value_foo_b`);
        },
        'Bidi bind localized in object'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_bidi_localized_in_object_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.obj().loc(), foo.outer(), `$mol_view_tree2_to_js_test_ex_bidi_localized_in_object_foo_outer`);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Left bind read only'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_left_read_only_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.bar1(), 
            // @ts-ignore
            foo.bar1(2), foo.bar1(), foo.bar2(), 1);
            $mol_assert_like(foo.bar2(2), foo.bar1(), 2);
        },
        'Left bind second level index'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_left_second_level_index_foo;
            const foo = _foo.make({ $ });
            $mol_assert_ok(foo.owner(1) instanceof $mol_object);
            $mol_assert_like(foo.some(1), foo.some(1), `$mol_view_tree2_to_js_test_ex_left_second_level_index_foo_some`);
            $mol_assert_equal(foo.owner(1), foo.cls(1));
            $mol_assert_equal(foo.owner(1).localized(), foo.some(1));
            $mol_assert_equal(foo.cls(2), foo.owner(2));
        },
        'Left bind in array and object'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_left_in_array_and_object_foo;
            const foo = _foo.make({ $ });
            $mol_assert_equal(foo.obj().prop, foo.arr()[0], foo.Obj());
        },
        'Left bind with separate default and comment'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_left_with_separate_default_and_comment_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.Obj().rows(), [123]);
        },
        'Left bind chaining'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_left_chaining_foo;
            const foo = _foo.make({ $ });
            $mol_assert_equal(foo.d(), foo.c(), foo.b(), foo.a(), 0);
            $mol_assert_equal(foo.d(1), foo.c(), foo.b(), foo.a(), 1);
            $mol_assert_equal(
            // @ts-ignore
            foo.a(2), 
            // @ts-ignore
            foo.b(2), foo.c(), foo.d(), 1);
            $mol_assert_equal(foo.c(2), foo.b(), foo.a(), 2);
            $mol_assert_equal(foo.d(1), 1);
            $mol_assert_equal(foo.d(3), foo.c(), foo.b(), foo.a(), 3);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Array boolean'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_array_boolean_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.bar(), [false, true]);
        },
        'Array number'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_array_number_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.bar(), [
                Number.NaN,
                Number.NEGATIVE_INFINITY,
                Number.POSITIVE_INFINITY,
                0,
            ]);
        },
        'Array with types'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_array_with_types_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.arr(), []);
        },
        'Array of array or object'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_array_of_array_or_object_foo;
            const foo = _foo.make({ $ });
            // type a1 = $mol_type_assert<
            // 	ReturnType<typeof foo.complex>,
            // 	readonly (readonly(number | string)[] | Record<string, number | string>)[]
            // >
            $mol_assert_like(foo.complex(), ['1', [true], ['1', 21], { a: 1, str: 'some' }]);
        },
        'Array inheritance'($) {
            const _bar = $mol_view_tree2_to_js_test_ex_array_inheritance_bar;
            $mol_assert_like(_bar.make({ $ }).arr(), ['v3', 'v1', 'v4']);
        },
        'Array spread other'($) {
            const _bar = $mol_view_tree2_to_js_test_ex_array_spread_other_bar;
            const bar = _bar.make({ $ });
            $mol_assert_like(bar.arr(), ['v2', 'v1']);
            $mol_assert_like(bar.arr()[1], bar.sup()[0]);
        },
        'Array slot'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_array_slot_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.foot(), [1, true, 'foot1', 2, 3, 'ins1', 1, 'ins2', 'foot2']);
        },
        'Array indexed'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_array_indexed_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.tags(1), ['t1', 't2']);
            $mol_assert_like(foo.slot(1), ['t2']);
        },
        'Array union'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_array_union_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.bar(), ['a', 'c', 'b']);
        },
        'Array constructor tuple'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_array_constructor_tuple_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.text_blob().tuple, ['123']);
            $mol_assert_like(foo.blobs(), [
                foo.text_blob(),
            ]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Right bind read only'($) {
            const _bar = $mol_view_tree2_to_js_test_ex_right_read_only_bar;
            const bar = _bar.make({ $: _bar.$ });
            $mol_assert_like(bar.Obj().a(1), bar.b(1));
        },
        'Right bind in left bind'($) {
            const _bar = $mol_view_tree2_to_js_test_ex_right_in_left_bar;
            const bar = _bar.make({ $: _bar.$ });
            $mol_assert_like(bar.foo(), bar.Cls());
            $mol_assert_like(bar.foo().a(), bar.Cls().a(), bar.b());
        },
        'Right bind indexed'($) {
            const _bar = $mol_view_tree2_to_js_test_ex_right_indexed_bar;
            const bar = _bar.make({ $: _bar.$ });
            $mol_assert_equal(bar.Cls(1).a(), bar.b(1));
            $mol_assert_like(bar.b(1), { some: 123 });
            $mol_assert_equal(bar.Cls(1).a() === bar.b(2), false);
        },
        'Right hierarchy'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_right_hierarchy_foo;
            const foo = _foo.make({ $: _foo.$ });
            $mol_assert_like(foo.prj_user_id(1), 2);
        },
        'Right mixed args'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_right_hierarchy_foo;
            const foo = _foo.make({ $: _foo.$ });
            foo.indexed_id = id => id + 25;
            $mol_assert_like(foo.indexed_title(1), 123);
            $mol_assert_like(foo.Indexed(0).id(), 25);
            $mol_assert_like(foo.Indexed(1).id(), 26);
            $mol_assert_like(foo.indexed_title(0, 2), 125);
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'simple empty class'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_simple_empty_class_foo;
            $mol_assert_ok(_foo.make({ $ }) instanceof _foo);
        },
        'simple mutable and read only channels'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_simple_mutable_and_read_only_foo;
            const foo = _foo.make({ $ });
            $mol_assert_equal(foo.readonly(), 
            // @ts-ignore
            foo.readonly(1), foo.readonly(), null);
            $mol_assert_equal(foo.mutable(), null);
            $mol_assert_equal(foo.mutable(2), foo.mutable(), 2);
        },
        'simple string channel'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_simple_string_foo;
            $mol_assert_equal(_foo.make({ $ }).hardcoded(), 'First\nSecond');
            $mol_assert_equal(_foo.make({ $ }).localized(), `$mol_view_tree2_to_js_test_ex_simple_string_foo_localized`);
        },
        'simple default indexed channel'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_simple_default_indexed_foo;
            const foo = _foo.make({ $ });
            $mol_assert_equal(foo.a_b(0, 1), foo.a_b(0), 1);
            $mol_assert_equal(foo.legacy(0, 1), foo.legacy(0), 1);
        },
        'simple throw if cyrillic name'($) {
            $mol_assert_fail(() => {
                $mol_view_tree2_to_js_test_run(`
					Foo $mol_object
						sub / <= Чlose_icon $mol_object
				`);
            }, `Required prop like some*? at \`.view.tree#3:16/10\`
<=
.view.tree#3:13/2
/
.view.tree#3:11/1
sub
.view.tree#3:7/3`);
        },
        'simple empty legacy indexed channel throws error'($) {
            $mol_assert_fail(() => {
                $mol_view_tree2_to_js_test_run(`
					Foo $mol_object
						a!? null
				`);
            }, 'Required prop like some*? at `.view.tree#3:7/3`');
            $mol_assert_fail(() => {
                $mol_view_tree2_to_js_test_run(`
					Foo $mol_object
						b! 1
				`);
            }, 'Required prop like some*? at `.view.tree#3:7/2`');
        },
        'simple two classes'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_simple_two_classes_foo;
            const _bar = $mol_view_tree2_to_js_test_ex_simple_two_classes_bar;
            const a = _foo.make({ $ });
            const b = _bar.make({ $ });
            $mol_assert_ok(b instanceof _foo);
            $mol_assert_ok(b instanceof _bar);
            $mol_assert_equal(a.str(), 'some');
            $mol_assert_equal(b.str(), 'some2');
        },
        'simple commented node'($) {
            const { Foo } = $mol_view_tree2_to_js_test_run(`
				- Foo $mol_object
					a!? $mol_object
						expanded <=> cell_test_expanded!? null
			`);
            $mol_assert_ok(Foo === undefined);
        },
        'simple factory props'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_simple_factory_props_foo;
            const foo = _foo.make({ $ });
            $mol_assert_ok(typeof foo.button().sub === 'function');
            $mol_assert_ok(typeof foo.button().some === 'function');
            $mol_assert_equal(foo.button().loc(), `$mol_view_tree2_to_js_test_ex_simple_factory_props_foo_button_loc`);
            $mol_assert_equal(foo.button().deep().loc, `$mol_view_tree2_to_js_test_ex_simple_factory_props_foo_button_deep_loc`);
            $mol_assert_equal(foo.button().sub()[0], 1);
        },
        'simple factory inheritance'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_simple_factory_inheritance_foo;
            const foo = _foo.make({ $ });
            $mol_assert_equal(foo.Having().config(), { ips: ['127.0.0.1', '0.0.0.0', '1.1.1.1'] });
        },
        'simple nan'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_simple_nan_foo;
            const foo = _foo.make({ $ });
            $mol_assert_equal(foo.a(), foo.b(), foo.c(), NaN);
            $mol_assert_equal(foo.d(), Infinity);
            $mol_assert_equal(foo.e(), -Infinity);
            $mol_assert_equal(foo.f(), Infinity);
        },
        'simple typed null'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_simple_typed_null_foo;
            const foo = _foo.make({ $ });
            $mol_assert_equal(foo.a(), null);
        },
        'extra char'($) {
            $mol_assert_fail(() => {
                $mol_view_tree2_to_js_test_run(`
					Foo $mol_object
						item_чount 50
				`);
            }, 'Required prop like some*? at `.view.tree#3:7/10`');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Structural channel'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_structural_foo;
            $mol_assert_like(_foo.make({ $ }).bar(), {
                alpha: 1,
                beta: {},
                xxx: 2,
            });
        },
        'Structural dict'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_structural_dict_foo;
            $mol_assert_like(_foo.make({ $ }).bar(), {
                alpha: 1,
                beta: 'a',
            });
        },
        'Structural channel with inheritance'($) {
            const _bar = $mol_view_tree2_to_js_test_ex_structural_with_inheritance_bar;
            $mol_assert_like(_bar.make({ $ }).field(), {
                yyy: 234,
                xxx: 123,
                xxy: 'test',
                zzz: 345,
            });
        },
        'Structural channel spread other'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_structural_spread_other_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.field(), {
                bbb: 321,
                aaa: 123,
            });
        },
        'Structural channel localized prop value'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_structural_localized_prop_value_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.bar(), {
                'loc': `$mol_view_tree2_to_js_test_ex_structural_localized_prop_value_foo_bar_loc`,
                'baz': { 'loc2': `$mol_view_tree2_to_js_test_ex_structural_localized_prop_value_foo_bar_baz_loc2` }
            });
        },
        'Structural channel quoted props'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_structural_quoted_props_foo;
            $mol_assert_like(_foo.make({ $ }).bar(), {
                'a$': 1,
                'b-t': {},
            });
        },
        'Structural complex key'($) {
            const _foo = $mol_view_tree2_to_js_test_ex_structural_complex_key_foo;
            const foo = _foo.make({ $ });
            $mol_assert_like(foo.dictionary(), {
                'raw data key': '1',
                'key2': '2',
                'key3': '3'
            });
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function open($, source) {
        return $bog_gamengine_studio_doc.create(doc => {
            doc.$ = $;
            doc.source(source);
        });
    }
    function named(doc, title) {
        return doc.scene().nodes().find(node => node.title() === title);
    }
    function titles(doc) {
        return doc.scene().nodes().map(node => node.title());
    }
    $mol_test({
        'sample lists its nodes and every other declaration'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            const rows = doc.nodes();
            for (const title of ['Герой', 'Монета', 'Стена']) {
                $mol_assert_ok(rows.some(row => row.title === title && row.kind === 'node'));
            }
            $mol_assert_ok(rows.some(row => row.name === 'Atlas' && row.kind === 'own'));
        },
        'set changes exactly one line of the source'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.set('Hero', 'pos', [1, 2, 0]);
            const before = doc.source().split('\n');
            doc.set('Hero', 'pos', [3, 0, 0]);
            const after = doc.source().split('\n');
            $mol_assert_equal(after.length, before.length);
            const changed = before.filter((line, index) => line !== after[index]);
            $mol_assert_equal(changed, ['\t\t\tpos / 1 2 0']);
            $mol_assert_equal(after[before.indexOf(changed[0])], '\t\t\tpos / 3 0 0');
        },
        'set adds a missing line to the node'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.set('Wall', 'pos', [0, 0, 0]);
            doc.set('Wall', 'flip_x', true);
            $mol_assert_ok(doc.source().includes('\t\t\tpos / 0 0 0\n\t\t\tflip_x true\n'));
        },
        'scene follows the document'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.set('Hero', 'pos', [-2, 0, 0]);
            $mol_assert_equal(named(doc, 'Герой').pos()[0], -2);
            doc.set('Hero', 'pos', [3, 0, 0]);
            $mol_assert_equal(named(doc, 'Герой').pos()[0], 3);
        },
        'sample compiles into a class named after the root'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            $mol_assert_equal(doc.compile().klass.name, '$bog_gamengine_studio_sample');
            for (const title of ['Карта', 'Герой', 'Монета', 'Стена'])
                $mol_assert_ok(titles(doc).includes(title));
        },
        'set gives a new scene with the new value'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            const before = doc.scene();
            doc.set('Hero', 'pos', [3, 0, 0]);
            $mol_assert_not(doc.scene() === before);
            $mol_assert_equal(named(doc, 'Герой').pos()[0], 3);
        },
        'literal of a node is writable on the node without touching the source'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            const look = named(doc, 'Вид героя');
            look.pos([5, 0, 0]);
            $mol_assert_equal(look.pos()[0], 5);
            look.frame('coin');
            $mol_assert_equal(look.frame(), 'coin');
            $mol_assert_equal(doc.source(), $bog_gamengine_studio_sample);
            doc.set('Hero_look', 'pos', [3, 0, 0]);
            $mol_assert_equal(named(doc, 'Вид героя').pos()[0], 3);
            $mol_assert_equal(named(doc, 'Вид героя').frame(), 'hero');
        },
        'clock survives the recompilation'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            const clock = doc.scene().clock();
            doc.set('Hero', 'pos', [3, 0, 0]);
            $mol_assert_ok(doc.scene().clock() === clock);
        },
        'add gives a node in nodes and lines in the source'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            const before = doc.source();
            const name = doc.add('$bog_gamengine_sprite', { name: '\\Ключ', atlas: '<= Atlas', frame: '\\coin', pos: '/ 1 2 0' });
            $mol_assert_equal(name, 'Sprite_1');
            $mol_assert_ok(doc.nodes().some(node => node.title === 'Ключ'));
            const lines = '\t\t<= Sprite_1 $bog_gamengine_sprite\n\t\t\tname \\Ключ\n\t\t\tatlas <= Atlas\n\t\t\tframe \\coin\n\t\t\tpos / 1 2 0\n';
            $mol_assert_ok(doc.source().includes(lines + '\tAtlas $bog_gamengine_atlas\n'));
            $mol_assert_equal(doc.source().replace(lines, ''), before);
            $mol_assert_equal(named(doc, 'Ключ').pos()[1], 2);
        },
        'second add of the same class gives _2'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.add('$bog_gamengine_sprite', { atlas: '<= Atlas', frame: '\\coin' });
            $mol_assert_equal(doc.add('$bog_gamengine_sprite', { atlas: '<= Atlas', frame: '\\wall' }), 'Sprite_2');
            const names = doc.nodes().map(node => node.name);
            $mol_assert_ok(names.includes('Sprite_1') && names.includes('Sprite_2'));
        },
        'add with a nested subview makes no batch of its own'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            const mesh = doc.add('$bog_gamengine_mesh', { atlas: '<= Atlas', shape: '<= Mesh_1_shape $bog_gamengine_shape_box\n\ttile 2' });
            $mol_assert_equal(mesh, 'Mesh_1');
            $mol_assert_ok(doc.source().includes('\t\t\tshape <= Mesh_1_shape $bog_gamengine_shape_box\n\t\t\t\ttile 2\n\tAtlas '));
            $mol_assert_not(doc.source().includes('$bog_gamengine_batch'));
            const batches = doc.scene().batches();
            $mol_assert_equal(batches.filter(batch => batch.shape() instanceof $bog_gamengine_shape_box).length, 1);
        },
        'list rows are read from the document'($) {
            const doc = open($, $bog_gamengine_studio_sample_brain);
            $mol_assert_equal(doc.list_rows('Walk', 'next'), [{ to: 'Ждёт', when: 'near' }]);
        },
        'edit of a list row changes exactly one line of the source'($) {
            const doc = open($, $bog_gamengine_studio_sample_brain);
            const before = doc.source().split('\n');
            doc.list_set('Walk', 'next', 0, 'when', 'far');
            const after = doc.source().split('\n');
            $mol_assert_equal(after.length, before.length);
            const changed = before.filter((line, index) => line !== after[index]);
            $mol_assert_equal(changed, ['\t\t\t\t\twhen \\near']);
            $mol_assert_ok(doc.source().includes('\t\t\t\t\twhen \\far\n'));
        },
        'row added to a list becomes a record of the source'($) {
            const doc = open($, $bog_gamengine_studio_sample_brain);
            doc.list_add('Walk', 'next', { to: 'Спит', when: 'tired' });
            $mol_assert_ok(doc.source().includes('\t\t\tnext /\n\t\t\t\t*\n\t\t\t\t\tto \\Ждёт\n\t\t\t\t\twhen \\near\n\t\t\t\t*\n\t\t\t\t\tto \\Спит\n\t\t\t\t\twhen \\tired\n\t\t<= Wait '));
            $mol_assert_equal(doc.list_rows('Walk', 'next').length, 2);
        },
        'dropped row leaves the rest of the list'($) {
            const doc = open($, $bog_gamengine_studio_sample_brain);
            doc.list_add('Walk', 'next', { to: 'Спит', when: 'tired' });
            doc.list_drop('Walk', 'next', 0);
            $mol_assert_equal(doc.list_rows('Walk', 'next'), [{ to: 'Спит', when: 'tired' }]);
            doc.list_drop('Walk', 'next', 0);
            $mol_assert_equal(doc.list_rows('Walk', 'next'), []);
            $mol_assert_ok(doc.source().includes('\t\t\tnext /\n'));
        },
        'list of the document reaches the node'($) {
            const doc = open($, $bog_gamengine_studio_sample_brain);
            const state = () => doc.scene().nodes().find(node => node.title() === 'Ходит');
            $mol_assert_equal(state().next().length, 1);
            $mol_assert_equal(state().next()[0].when, 'near');
            doc.list_set('Walk', 'next', 0, 'when', 'far');
            $mol_assert_equal(state().next()[0].when, 'far');
        },
        'add_uri appends to the list without duplicates'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.add_uri('Atlas', 'uris', 'bog/gamengine/demo/atlas/hero_1.png');
            $mol_assert_ok(doc.source().includes('floor.png\n\t\t\t\\bog/gamengine/demo/atlas/hero_1.png\n\t\tsize 64\n'));
            const once = doc.source();
            doc.add_uri('Atlas', 'uris', 'bog/gamengine/demo/atlas/hero_1.png');
            doc.add_uri('Atlas', 'uris', 'bog/gamengine/demo/atlas/coin.png');
            $mol_assert_equal(doc.source(), once);
        },
        'add_uri with a name writes a dict entry and creates the missing dict'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.declare('Sound', '$bog_gamengine_sound', {});
            $mol_assert_ok(doc.source().endsWith('\t\tsize 64\n\tSound $bog_gamengine_sound\n'));
            doc.add_uri('Sound', 'uris', 'bog/gamengine/demo/sound/coin.wav', 'coin');
            doc.add_uri('Sound', 'uris', 'bog/gamengine/demo/sound/coin.wav', 'coin');
            $mol_assert_ok(doc.source().endsWith('\tSound $bog_gamengine_sound\n\t\turis *\n\t\t\tcoin \\bog/gamengine/demo/sound/coin.wav\n'));
            $mol_assert_not(titles(doc).includes('Sound'));
        },
        'map of the sample is read row by row'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            $mol_assert_equal(doc.map().map(row => row.join('')), ['######', '#....#', '#..#.#', '#....#', '######']);
        },
        'paint past the right edge grows the map and leaves the grid where it was'($) {
            const doc = open($, $bog_gamengine_studio_sample_shift);
            $mol_assert_equal(doc.map_origin(), [4, -3]);
            const tile = () => named(doc, 'Карта').tile();
            const before = tile().cell_pos(1, 1, new Float32Array(3));
            $mol_assert_equal([before[0], before[1]], [5.5, -4.5]);
            doc.paint(6, 1, '#');
            $mol_assert_equal(doc.map().map(row => row.join('')), ['#######', '#....##', '#######']);
            $mol_assert_equal(doc.map_origin(), [4, -3]);
            const after = tile().cell_pos(1, 1, new Float32Array(3));
            $mol_assert_equal([after[0], after[1]], [before[0], before[1]]);
        },
        'paint past the bottom edge grows the map down and leaves the grid where it was'($) {
            const doc = open($, $bog_gamengine_studio_sample_shift);
            const tile = () => named(doc, 'Карта').tile();
            const before = tile().cell_pos(1, 1, new Float32Array(3));
            doc.paint(1, 4, '.');
            $mol_assert_equal(doc.map().map(row => row.join('')), [
                '######', '#....#', '######', '######', '#.####',
            ]);
            $mol_assert_equal(doc.map_origin(), [4, -3]);
            const after = tile().cell_pos(1, 1, new Float32Array(3));
            $mol_assert_equal([after[0], after[1]], [before[0], before[1]]);
        },
        'growth keeps passability on the very cells that are drawn'($) {
            const doc = open($, $bog_gamengine_studio_sample_shift);
            doc.paint(7, 4, '.');
            const tiles = named(doc, 'Карта');
            const tile = tiles.tile();
            $mol_assert_equal([tile.width(), tile.height()], [8, 5]);
            $mol_assert_equal(tiles.emit(), tile.width() * tile.height());
            const trans = tiles.pool().trans;
            const drawn = new Set();
            for (let i = 0; i < tiles.pool().count; ++i)
                drawn.add(`${trans[i * 16 + 12]} ${trans[i * 16 + 13]}`);
            const pos = new Float32Array(3);
            const at = new Int32Array(2);
            for (let y = 0; y < tile.height(); ++y) {
                for (let x = 0; x < tile.width(); ++x) {
                    tile.cell_pos(x, y, pos);
                    $mol_assert_ok(drawn.has(`${pos[0]} ${pos[1]}`));
                    tile.cell_at(pos[0], pos[1], at);
                    $mol_assert_equal([at[0], at[1]], [x, y]);
                    $mol_assert_equal(tile.solid_at(pos[0], pos[1]), tile.cell(x, y));
                }
            }
            $mol_assert_equal(tile.solid_at(11.5, -7.5), false);
            $mol_assert_equal(tile.cell(7, 4), false);
        },
        'paint past the left top corner shifts the grid so the cells stay where they were drawn'($) {
            const doc = open($, $bog_gamengine_studio_sample_shift);
            const tile = () => named(doc, 'Карта').tile();
            const before = tile().cell_pos(1, 1, new Float32Array(3));
            doc.paint(-2, -1, '.');
            $mol_assert_equal(doc.map_origin(), [2, -2]);
            $mol_assert_equal(doc.map().map(row => row.join('')), [
                '.#######', '########', '###....#', '########',
            ]);
            const moved = tile();
            const after = moved.cell_pos(3, 2, new Float32Array(3));
            $mol_assert_equal([after[0], after[1]], [before[0], before[1]]);
            const at = moved.cell_at(before[0], before[1], new Int32Array(2));
            $mol_assert_equal([at[0], at[1]], [3, 2]);
            $mol_assert_equal(moved.solid_at(before[0], before[1]), false);
        },
        'paint far outside the map is ignored instead of growing it to the moon'($) {
            const doc = open($, $bog_gamengine_studio_sample_shift);
            const before = doc.source();
            doc.paint(400, 400, '#');
            $mol_assert_equal(doc.source(), before);
        },
        'paint changes exactly one char of exactly one source line'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.set('Hero', 'pos', [-2, 0, 0]);
            const before = doc.source().split('\n');
            doc.paint(2, 1, '#');
            const after = doc.source().split('\n');
            $mol_assert_equal(after.length, before.length);
            const changed = before.map((line, index) => index).filter(index => before[index] !== after[index]);
            $mol_assert_equal(changed.length, 1);
            $mol_assert_equal(before[changed[0]], '\t\t\t\\#....#');
            $mol_assert_equal(after[changed[0]], '\t\t\t\\#.#..#');
            $mol_assert_equal(named(doc, 'Герой').pos()[0], -2);
        },
        'paint of the same char keeps the source'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.paint(0, 0, '#');
            $mol_assert_equal(doc.source(), $bog_gamengine_studio_sample);
        },
        'paint below and right of the map grows it in both directions at once'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.paint(9, 9, '#');
            const rows = doc.map();
            $mol_assert_equal(rows.length, 10);
            $mol_assert_equal(rows[0].length, 10);
            $mol_assert_equal(rows[9][9], '#');
            $mol_assert_equal(rows[1].join('').slice(0, 6), '#....#');
            $mol_assert_equal(doc.map_origin(), [0, 0]);
        },
        'rect paints a rectangle'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.rect(3, 3, 1, 1, '#');
            $mol_assert_equal(doc.map().map(row => row.join('')), ['######', '####.#', '####.#', '####.#', '######']);
        },
        'fill stops at the walls'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.fill(1, 1, 'o');
            $mol_assert_equal(doc.map().map(row => row.join('')), ['######', '#oooo#', '#oo#o#', '#oooo#', '######']);
            const walled = doc.source();
            doc.fill(0, 0, '#');
            $mol_assert_equal(doc.source(), walled);
        },
        'map of emoji is painted by char index'($) {
            const doc = open($, $bog_gamengine_studio_sample.replace('\t\t\\#..#.#', '\t\t\\#🌵🌵#🌵#'));
            $mol_assert_equal(doc.map()[2].join(''), '#🌵🌵#🌵#');
            doc.paint(2, 2, '.');
            $mol_assert_equal(doc.map()[2].join(''), '#🌵.#🌵#');
            $mol_assert_equal(doc.map()[1].join(''), '#....#');
        },
        'prefab declaration leaves the scene as the document root'($) {
            const doc = open($, $bog_gamengine_studio_sample_prefab);
            $mol_assert_equal(doc.decls().get('').type, '$bog_gamengine_scene');
        },
        'instances and their prefab kids are listed by path'($) {
            const doc = open($, $bog_gamengine_studio_sample_prefab);
            $mol_assert_equal(doc.nodes().map(node => node.path), ['Enemy_1', 'Enemy_1/Gun', 'Enemy_2', 'Enemy_2/Gun']);
            $mol_assert_equal(doc.nodes().map(node => node.title), ['Страж', 'Ствол', 'Вожак', 'Ствол']);
        },
        'path of a kid inside an instance walks into the prefab body'($) {
            const doc = open($, $bog_gamengine_studio_sample_prefab);
            $mol_assert_equal(doc.path_at([1, 0]), 'Enemy_2/Gun');
            $mol_assert_equal(doc.nodes().length, doc.scene().nodes().length);
        },
        'inherited value of an instance is writable on the node'($) {
            const doc = open($, $bog_gamengine_studio_sample_prefab);
            const nodes = doc.scene().nodes();
            $mol_assert_equal(nodes[0].name(), 'Страж');
            nodes[0].name('Дозорный');
            $mol_assert_equal(nodes[0].name(), 'Дозорный');
            $mol_assert_equal(nodes[2].name(), 'Вожак');
            $mol_assert_equal(doc.source(), $bog_gamengine_studio_sample_prefab);
        },
        'edit of a prefab kid reaches every instance, edit of an instance reaches one'($) {
            const doc = open($, $bog_gamengine_studio_sample_prefab);
            $mol_assert_equal(doc.shared('Enemy_1/Gun'), ['Enemy_1/Gun', 'Enemy_2/Gun']);
            $mol_assert_equal(doc.shared('Enemy_1'), ['Enemy_1']);
            $mol_assert_equal(doc.shared('Enemy_2'), ['Enemy_2']);
            doc.set('Enemy_1/Gun', 'pos', [7, 0, 0]);
            const guns = doc.scene().nodes().filter(node => node.title() === 'Ствол');
            $mol_assert_equal(guns.map(node => node.pos()[0]), [7, 7]);
        },
        'override of a prefab kid detaches one instance and keeps the rest'($) {
            const doc = open($, $bog_gamengine_studio_sample_prefab);
            $mol_assert_equal(doc.override('Enemy_1/Gun'), 'Enemy_1_Gun');
            $mol_assert_not(/\n\t\t\t\t</.test(doc.source()));
            $mol_assert_equal(doc.nodes().map(node => node.path), ['Enemy_1', 'Enemy_1/Enemy_1_Gun', 'Enemy_2', 'Enemy_2/Gun']);
            doc.set('Enemy_1/Enemy_1_Gun', 'pos', [9, 0, 0]);
            const guns = doc.scene().nodes().filter(node => node.title() === 'Ствол');
            $mol_assert_equal(guns.length, 2);
            $mol_assert_equal(guns.map(node => node.pos()[0]), [9, 0]);
            const names = doc.scene().nodes().map(node => node.title());
            $mol_assert_equal(names, ['Страж', 'Ствол', 'Вожак', 'Ствол']);
        },
        'syntax error fails with the parser message'($) {
            const doc = open($, $bog_gamengine_studio_sample.replace('\tphys <= Phys', '\t\t\tphys <= Phys'));
            const error = $mol_assert_fail(() => doc.scene(), Error);
            $mol_assert_ok(error.message.startsWith('Too many tabs\nscene.view.tree#2:1/3'));
        },
        'unknown class fails with its name'($) {
            const doc = open($, [
                '$bog_gamengine_studio_sample_ref $bog_gamengine_scene',
                '\tkids /',
                '\t\t<= Ghost $' + 'bog_ghost',
                '',
            ].join('\n'));
            $mol_assert_fail(() => doc.scene().nodes(), 'Unknown class $' + 'bog_ghost of Ghost');
        },
        'drop takes the node out of the scene and out of the source'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.drop('Coin');
            $mol_assert_not(doc.nodes().some(node => node.title === 'Монета'));
            $mol_assert_not(doc.source().includes('Coin'));
            $mol_assert_not(doc.source().includes('Монета'));
            $mol_assert_not(titles(doc).includes('Монета'));
            $mol_assert_ok(titles(doc).includes('Герой'));
        },
        'drop leaves the world of the scene alone'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.drop('Hero_look');
            doc.drop('Hero');
            $mol_assert_not(titles(doc).includes('Герой'));
            $mol_assert_ok(doc.source().includes('Atlas $bog_gamengine_atlas'));
            $mol_assert_ok(doc.source().includes('palette *'));
            $mol_assert_ok(doc.source().includes('\\######'));
            $mol_assert_ok(doc.source().includes('Phys $bog_gamengine_phys'));
        },
        'drop of a body takes it out of the list of the world too'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            $mol_assert_ok(doc.source().includes('bodies /\n\t\t\t<= Hero\n'));
            doc.drop('Hero_look');
            doc.drop('Hero');
            $mol_assert_not(doc.source().includes('<= Hero'));
            $mol_assert_ok(doc.source().includes('Phys $bog_gamengine_phys'));
            $mol_assert_ok(titles(doc).includes('Карта'));
            $mol_assert_ok(titles(doc).includes('Монета'));
        },
        'drop of an unknown node fails with its path'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            $mol_assert_fail(() => doc.drop('Ghost'), 'Node Ghost is neither placed nor declared');
        },
        'dup puts a copy right after the node and gives it a free name'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            const made = doc.dup('Coin');
            $mol_assert_equal(made, 'Sprite_1');
            const names = doc.nodes().map(node => node.name);
            $mol_assert_equal(names.indexOf('Sprite_1'), names.indexOf('Coin') + 1);
            $mol_assert_equal(titles(doc).filter(title => title === 'Монета').length, 2);
        },
        'dup of a plain reference sends the user to the declaration'($) {
            const doc = open($, [
                '$bog_gamengine_studio_sample_ref $bog_gamengine_scene',
                '\tkids /',
                '\t\t<= Hero',
                '\tHero $bog_gamengine_sprite',
                '\t\tname \\Герой',
                '',
            ].join('\n'));
            $mol_assert_equal(doc.nodes().map(node => node.title), ['Герой']);
            $mol_assert_fail(() => doc.dup('Hero'), 'Node Hero is a reference to a declaration, duplicate the declaration itself');
        },
        'drop of a node placed once takes its declaration with it'($) {
            const doc = open($, [
                '$bog_gamengine_studio_sample_ref $bog_gamengine_scene',
                '\tkids /',
                '\t\t<= Hero',
                '\tHero $bog_gamengine_sprite',
                '\t\tname \\Герой',
                '',
            ].join('\n'));
            doc.drop('Hero');
            $mol_assert_equal(doc.scene().nodes().length, 0);
            $mol_assert_not(doc.source().includes('Hero'));
            $mol_assert_equal(doc.nodes().length, 0);
        },
        'drop of a declaration is refused with the name of the user'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            $mol_assert_fail(() => doc.drop('Atlas'), 'Node Atlas is used by Tiles, Hero_look, Coin, Wall, drop them first');
            $mol_assert_ok(doc.source().includes('Atlas $bog_gamengine_atlas'));
        },
        'placed sound is dropped by its declaration, the world stays'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.declare('Sound', '$bog_gamengine_sound', {});
            doc.add_uri('Sound', 'uris', 'bog/gamengine/demo/sound/coin.wav', 'coin');
            $mol_assert_ok(doc.source().includes('coin.wav'));
            const before = titles(doc);
            doc.drop('Sound');
            $mol_assert_not(doc.source().includes('coin.wav'));
            $mol_assert_not(doc.source().includes('Sound'));
            $mol_assert_equal(titles(doc), before);
        },
        'copy keeps every property of the node and lives on its own'($) {
            const doc = open($, $bog_gamengine_studio_sample);
            doc.set('Coin', 'pos', [2, 0, 0]);
            const made = doc.dup('Coin');
            $mol_assert_equal(doc.node(made).klass, '$bog_gamengine_sprite');
            const coins = () => doc.scene().nodes().filter(node => node.title() === 'Монета').map(node => node.pos()[0]);
            $mol_assert_equal(coins(), [2, 2]);
            doc.set(made, 'pos', [7, 0, 0]);
            $mol_assert_equal(coins(), [2, 7]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const png = new Uint8Array([0x1a, 0x0a, 0x00, 0x49, 0x48, 0x78, 0xda]);
    $mol_test({
        'base64 encode string'() {
            $mol_assert_equal($mol_base64_encode($mol_charset_encode('Hello, ΧΨΩЫ')), 'SGVsbG8sIM6nzqjOqdCr');
        },
        'base64 encode binary'() {
            $mol_assert_equal($mol_base64_encode(png), 'GgoASUh42g==');
        },
        'base64 encode string with plus'() {
            $mol_assert_equal($mol_base64_encode($mol_charset_encode('шоешпо')), '0YjQvtC10YjQv9C+');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const png = new Uint8Array([0x1a, 0x0a, 0x00, 0x49, 0x48, 0x78, 0xda]);
    const with_plus = new TextEncoder().encode('шоешпо');
    $mol_test({
        'base64 decode string'() {
            $mol_assert_equal($mol_base64_decode('SGVsbG8sIM6nzqjOqdCr'), new TextEncoder().encode('Hello, ΧΨΩЫ'));
        },
        'base64 decode binary'() {
            $mol_assert_equal($mol_base64_decode('GgoASUh42g=='), png);
        },
        'base64 decode binary - without equals'() {
            $mol_assert_equal($mol_base64_decode('GgoASUh42g'), png);
        },
        'base64 decode with plus'() {
            $mol_assert_equal($mol_base64_decode('0YjQvtC10YjQv9C+'), with_plus);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'empty hash'() {
            $mol_assert_equal($mol_crypto2_hash(new Uint8Array([])), new Uint8Array([218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]));
        },
        'three bytes hash'() {
            $mol_assert_equal($mol_crypto2_hash(new Uint8Array([255, 254, 253])), new Uint8Array([240, 150, 38, 243, 255, 128, 96, 0, 72, 215, 207, 228, 19, 149, 113, 52, 2, 125, 27, 77]));
        },
        'six bytes hash'() {
            $mol_assert_equal($mol_crypto2_hash(new Uint8Array([0, 255, 10, 250, 32, 128])), new Uint8Array([23, 25, 155, 181, 46, 200, 221, 83, 254, 0, 166, 68, 91, 255, 67, 140, 114, 88, 218, 155]));
        },
        'seven bytes hash'() {
            $mol_assert_equal($mol_crypto2_hash(new Uint8Array([1, 2, 3, 4, 5, 6, 7])), new Uint8Array([140, 31, 40, 252, 47, 72, 194, 113, 214, 196, 152, 240, 242, 73, 205, 222, 54, 92, 84, 197]));
        },
        'unaligned hash'() {
            const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);
            $mol_assert_equal($mol_crypto2_hash(new Uint8Array(data.buffer, 1, 7)), new Uint8Array([140, 31, 40, 252, 47, 72, 194, 113, 214, 196, 152, 240, 242, 73, 205, 222, 54, 92, 84, 197]));
        },
        async 'reference'() {
            const data = new Uint8Array([255, 254, 253]);
            $mol_assert_equal($mol_crypto2_hash(data), new Uint8Array(await $mol_crypto_native.subtle.digest('SHA-1', data)));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Float schema"($) {
                $mol_assert_equal('$mol_schema_float', $mol_schema_float + '', $mol_key($mol_schema_float));
                $mol_assert_equal(true, $mol_schema_float.check(0));
                $mol_assert_equal(true, $mol_schema_float.check(Number.NaN));
                $mol_assert_equal(true, $mol_schema_float.check(Number.POSITIVE_INFINITY));
                $mol_assert_equal(false, $mol_schema_float.check(null));
                $mol_assert_equal(1.5, $mol_schema_float.cast(1.5));
                $mol_assert_equal(Number.NaN, $mol_schema_float.cast('0'));
                $mol_assert_equal(Number.EPSILON, $mol_schema_float.guard(Number.EPSILON));
                $mol_assert_fail(() => $mol_schema_float.guard('0'), 'Wrong type');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "String schema"($) {
                $mol_assert_equal('$mol_schema_string', $mol_schema_string + '', $mol_key($mol_schema_string));
                $mol_assert_equal(true, $mol_schema_string.check('foo'));
                $mol_assert_equal(false, $mol_schema_string.check(123));
                $mol_assert_equal('foo', $mol_schema_string.cast('foo'));
                $mol_assert_equal('', $mol_schema_string.cast(123));
                $mol_assert_equal('foo', $mol_schema_string.guard('foo'));
                $mol_assert_fail(() => $mol_schema_string.guard(123), 'Wrong type');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Cache of maybe schema"($) {
                $mol_assert_equal($mol_schema_maybe($mol_schema_float), $mol_schema_maybe($mol_schema_float));
                $mol_assert_unique($mol_schema_maybe($mol_schema_float), $mol_schema_maybe($mol_schema_string));
            },
            "Optional value"($) {
                const Config = $mol_schema_maybe($mol_schema_string);
                $mol_assert_equal('$mol_schema_maybe<$mol_schema_string>', Config + '');
                $mol_assert_equal(true, Config.check('foo'));
                $mol_assert_equal(true, Config.check(undefined));
                $mol_assert_equal(true, Config.check(null));
                $mol_assert_equal(false, Config.check(0));
                $mol_assert_equal('foo', Config.cast('foo'));
                $mol_assert_equal(undefined, Config.cast(undefined));
                $mol_assert_equal(null, Config.cast(null));
                $mol_assert_equal(null, Config.cast(0));
                $mol_assert_equal('foo', Config.guard('foo'));
                $mol_assert_fail(() => Config.guard(123), 'Wrong type');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Cache of instance schema"($) {
                $mol_assert_equal($mol_schema_instance(Uint8Array), $mol_schema_instance(Uint8Array));
                $mol_assert_unique($mol_schema_instance(Uint8Array), $mol_schema_instance(Int8Array));
            },
            "Class instance schema"($) {
                const Blob = $mol_schema_instance(Uint8Array);
                $mol_assert_equal('$mol_schema_instance<Uint8Array>', Blob + '', $mol_key(Blob));
                $mol_assert_equal(true, Blob.check(new Uint8Array));
                $mol_assert_equal(false, Blob.check(new Int8Array));
                $mol_assert_equal(false, Blob.check(null));
                $mol_assert_equal(new Uint8Array([0, 1]), Blob.cast(new Uint8Array([0, 1])));
                $mol_assert_fail(() => Blob.cast(new Int8Array), 'Wrong class');
                $mol_assert_equal(new Uint8Array, Blob.guard(new Uint8Array));
                $mol_assert_fail(() => Blob.guard(new Int8Array), 'Wrong class');
            },
            "Boxed instance schema"($) {
                const Str = $mol_schema_instance(String);
                $mol_assert_equal('$mol_schema_instance<String>', Str + '', $mol_key(Str));
                $mol_assert_equal(true, Str.check(Object('')));
                $mol_assert_equal(true, Str.check(''));
                $mol_assert_equal(true, Object('') instanceof Str);
            },
            "Schema instance schema"($) {
                const Str = $mol_schema_instance($mol_schema_instance(String));
                $mol_assert_equal('$mol_schema_instance<String>', Str + '', $mol_key(Str));
                $mol_assert_equal(true, Str.check(Object('')));
                $mol_assert_equal(true, Str.check(''));
                $mol_assert_equal(true, Object('') instanceof Str);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Validation"($) {
                $mol_assert_fail(() => new $giper_baza_link('qwertyui_asdfghjk123'), 'Wrong Link');
            },
            "From integer"($) {
                $mol_assert_equal($giper_baza_link.from_int(178308648732587), new $giper_baza_link('qwertyui'));
            },
            "Pick Lord only"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').lord(), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').lord(), new $giper_baza_link('qwertyui_asdfghjk').lord(), new $giper_baza_link('qwertyui_asdfghjk'));
            },
            "Pick Land only"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').land(), new $giper_baza_link('qwertyui_asdfghjk').land(), new $giper_baza_link('qwertyui_asdfghjk'));
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').land(), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').land(), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed'));
            },
            "Pick Peer only"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').peer(), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').peer(), new $giper_baza_link('qwertyui'));
                $mol_assert_equal(new $giper_baza_link('___qazwsxed').peer(), new $giper_baza_link(''));
            },
            "Pick Head only"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').head(), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').head(), new $giper_baza_link('zxcvbnm0'));
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').head(), new $giper_baza_link('qwertyui_asdfghjk').head(), new $giper_baza_link(''));
            },
            "Pick Area only"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').area(), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').area(), new $giper_baza_link('qazwsxed'));
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').area(), new $giper_baza_link('qwertyui_asdfghjk').area(), new $giper_baza_link('').area(), new $giper_baza_link(''));
            },
            "Binary encoding"($) {
                const pawn = new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').toBin();
                const land = new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').toBin();
                const lord = new $giper_baza_link('qwertyui_asdfghjk').toBin();
                const rel_pawn = new $giper_baza_link('___zxcvbnm0').toBin();
                const rel_root = new $giper_baza_link('').toBin();
                $mol_assert_equal(pawn.length, 24);
                $mol_assert_equal(land.length, 18);
                $mol_assert_equal(lord.length, 12);
                $mol_assert_equal(rel_pawn.length, 6);
                $mol_assert_equal(rel_root.length, 0);
                $mol_assert_equal($giper_baza_link.from_bin(pawn), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0'));
                $mol_assert_equal($giper_baza_link.from_bin(land), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed'));
                $mol_assert_equal($giper_baza_link.from_bin(lord), new $giper_baza_link('qwertyui_asdfghjk'));
                $mol_assert_equal($giper_baza_link.from_bin(rel_pawn), new $giper_baza_link('zxcvbnm0'));
                $mol_assert_equal($giper_baza_link.from_bin(rel_root), new $giper_baza_link(''));
            },
            "Relate to base"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').relate(new $giper_baza_link('QWERTYUI_ASDFGHJK')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').relate(new $giper_baza_link('QWERTYUI_ASDFGHJK__ZXCVBNM0')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0'));
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').relate(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed')), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').relate(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_12345678')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').relate(new $giper_baza_link('qwertyui_asdfghjk')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').relate(new $giper_baza_link('qwertyui_asdfghjk__12345678')), new $giper_baza_link('___zxcvbnm0'));
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').relate(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').relate(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed')), new $giper_baza_link('qwertyui_asdfghjk').relate(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk').relate(new $giper_baza_link('qwertyui_asdfghjk')), new $giper_baza_link(''));
            },
            "Resolve Link from base"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').resolve(new $giper_baza_link('QWERTYUI_ASDFGHJK__ZXCVBNM0')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').resolve(new $giper_baza_link('QWERTYUI_ASDFGHJK')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').resolve(new $giper_baza_link('qwertyui_asdfghjk')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0'));
                $mol_assert_equal(new $giper_baza_link('___12345678').resolve(new $giper_baza_link('qwertyui_asdfghjk')), new $giper_baza_link('___12345678').resolve(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk__12345678'));
                $mol_assert_equal(new $giper_baza_link('___12345678').resolve(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed')), new $giper_baza_link('___12345678').resolve(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_12345678'));
                $mol_assert_equal(new $giper_baza_link('').resolve(new $giper_baza_link('qwertyui_asdfghjk')), new $giper_baza_link('').resolve(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk'));
                $mol_assert_equal(new $giper_baza_link('').resolve(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed')), new $giper_baza_link('').resolve(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed'));
            },
            'Hashing'() {
                $mol_assert_equal($giper_baza_link.hash_bin(new Uint8Array([1, 2, 3])), new $giper_baza_link('cDeAcZjC_Kn0rCAc3'));
                $mol_assert_equal($giper_baza_link.hash_str('foo bar'), new $giper_baza_link('N3PeplFW_kJg4æmwi'));
            }
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'str & bin sizes'() {
            const signer = await $$.$mol_crypto2_signer.generate();
            const auditor = signer.auditor();
            $mol_assert_equal(signer.toStringPrivate().length, $mol_crypto2_signer.size_str);
            $mol_assert_equal(auditor.toString().length, $mol_crypto2_auditor.size_str);
            $mol_assert_equal(signer.asArrayPrivate().length, $mol_crypto2_signer.size_bin);
            $mol_assert_equal(auditor.asArray().length, $mol_crypto2_auditor.size_bin);
            const data = new Uint8Array([1, 2, 3]);
            const sign = await signer.sign(data);
            $mol_assert_equal(sign.byteLength, $mol_crypto2_signer.size_sign);
        },
        async 'verify self signed with auto generated key'() {
            const Alice = await $$.$mol_crypto2_signer.generate();
            const data = new Uint8Array([1, 2, 3]);
            const sign = await Alice.sign(data);
            $mol_assert_equal(true, await Alice.auditor().verify(data, sign));
        },
        async 'verify signed with str exported auto generated key'() {
            const Alice = await $$.$mol_crypto2_signer.generate();
            const data = new Uint8Array([1, 2, 3]);
            const Bella = $mol_crypto2_signer.from(Alice.toString() + Alice.toStringPrivate());
            const sign = await Bella.sign(data);
            const Catie = $mol_crypto2_auditor.from(Alice.auditor().toString());
            $mol_assert_equal(true, await Catie.verify(data, sign));
            const Diana = $mol_crypto2_auditor.from(Alice.toString());
            $mol_assert_equal(true, await Diana.verify(data, sign));
        },
        async 'verify signed with bin exported auto generated key'() {
            const Alice = await $$.$mol_crypto2_signer.generate();
            const data = new Uint8Array([1, 2, 3]);
            const Bella = $mol_crypto2_signer.from(new Uint8Array([...Alice.asArray(), ...Alice.asArrayPrivate()]));
            const sign = await Bella.sign(data);
            const Catie = $mol_crypto2_auditor.from(Alice.auditor().asArray());
            $mol_assert_equal(true, await Catie.verify(data, sign));
            const Diana = $mol_crypto2_auditor.from(Alice.asArray());
            $mol_assert_equal(true, await Diana.verify(data, sign));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'Sizes'() {
            const secret = $mol_crypto_sacred.make();
            const key = secret.asArray();
            $mol_assert_equal(key.byteLength, $mol_crypto_sacred.size);
            const data = new Uint8Array([1, 2, 3]);
            const salt = $mol_crypto_salt();
            const closed = await secret.encrypt(data, salt);
            $mol_assert_equal(closed.byteLength, $mol_crypto_sacred.size);
            const self_closed = await secret.close(secret, salt);
            $mol_assert_equal(self_closed.byteLength, $mol_crypto_sacred.size);
        },
        async 'Decrypt self encrypted'() {
            const secret = $mol_crypto_sacred.make();
            const data = new Uint8Array([1, 2, 3]);
            const salt = $mol_crypto_salt();
            const closed = await secret.encrypt(data, salt);
            const opened = await secret.decrypt(closed, salt);
            $mol_assert_equal(data, opened);
        },
        async 'Decrypt encrypted with exported key'() {
            const data = new Uint8Array([1, 2, 3]);
            const salt = $mol_crypto_salt();
            const Alice = $mol_crypto_sacred.make();
            const closed = await Alice.encrypt(data, salt);
            const Bob = $mol_crypto_sacred.from(Alice.asArray());
            const opened = await Bob.decrypt(closed, salt);
            $mol_assert_equal(data, opened);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'str & bin sizes'() {
            const cipher = await $$.$mol_crypto2_cipher.generate();
            const socket = cipher.socket();
            $mol_assert_equal(cipher.toStringPrivate().length, $mol_crypto2_cipher.size_str);
            $mol_assert_equal(socket.toString().length, $mol_crypto2_socket.size_str);
            $mol_assert_equal(cipher.asArrayPrivate().length, $mol_crypto2_cipher.size_bin);
            $mol_assert_equal(socket.asArray().length, $mol_crypto2_socket.size_bin);
            const secret = await cipher.secret(socket);
            $mol_assert_equal(secret.byteLength, $mol_crypto2_cipher.size_secret);
        },
        async 'Shared secret from public & private keys'() {
            const A = await $mol_crypto2_cipher.generate();
            const B = await $mol_crypto2_cipher.generate();
            const SA = await A.secret(B.socket());
            const SB = await B.secret(A.socket());
            $mol_assert_equal(SA.asArray(), SB.asArray());
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            async "Signing & encryption"($) {
                const Alice = await $mol_crypto2_private.generate();
                const Bella = await $mol_crypto2_private.generate();
                const secretA = await Alice.cipher().secret(Bella.socket());
                const secretB = await Bella.cipher().secret(Alice.socket());
                $mol_assert_equal(secretA, secretB);
                const data = new Uint8Array([1, 2, 3]);
                const nonce = $mol_crypto2_nonce();
                const closed = await secretA.encrypt(data, nonce);
                const digest = $mol_crypto2_hash(closed);
                const sign = await Alice.signer().sign(digest);
                $mol_assert_equal(true, await Alice.auditor().verify(digest, sign));
                $mol_assert_equal(data, await secretA.decrypt(closed, nonce));
            },
            async "Serial & Deserial"($) {
                const orig = await $mol_crypto2_private.generate();
                const bin = new Uint8Array([...orig.asArray(), ...orig.asArrayPrivate()]);
                const str = orig.toString() + orig.toStringPrivate();
                $mol_assert_equal(orig, $mol_crypto2_private.from(bin), $mol_crypto2_private.from(str));
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $giper_baza_auth_mock extends $.$giper_baza_auth {
            static current() {
                return this.from('_7uaNxSijvQDjZ-9a9r22hpcROZwhgBTaWZrcDIMwkU3e6xFHq_7h9-Dfxgif7E_szNlubYXJLUWFNt8x5ko3wb0YsrNPmwb8tahStoyKB_J5_gj8LqmJItGnwJHsGmRs17BgVIMzCEMbNqhiBiz6-dkW9PFWp346RUya2lNHzpk');
            }
            static embryos = [
                '_7bJySpjwMJr-9xpQtl3XIQhiiHIAJ3mJGJ9Z8XJXOMbKLhjUHMrA4RZzmscCgO0c7xnXnw_UFhwhDN7CRHOTca4x_vAJdIvjnNNRkBaYqJJRHBiLn6Cjf1Iv7ZYsHBZQZ72WxwYK8xKs8L3Kokv5RZ-jqBoozqc8JIFI1DWayJM',
                '_zOldFN6un21Kk9V_Z51D84ZJXdDoSfkxZZl5iNdSJ8mN-zcOuKh0tUTajmynoVmYG73krPQXIkIlGLAEwx5n03Fju-SIG0_fENxSNDRH8Pukvibs6nnMDPgXCYRvJi6gL8ZVwedP7LYkwa1qpsaUN7nmjWvhkkgVcVMLYK0Jk7g',
                '_8-GDFlnyEYoMzoeCiH1H7lBLuqMyZ1S_2ZEt0o4YIE4frZ1syTbDar0RqkFzC78BhVCYVykYxDTewnzyq4nEwG3y1Al3BskP59eYuDeaH0UKbBNF407K7kGJrMpJXZtMj0kZdX16E3aKfUmeLp0NL9VWFrAg6QiVQd1jJ5-MU5w',
                '_9GnExCEqMmBM5nBUnfdGBPjYSVHOUjHygAFipsPU0UU8mOgMS9JC8Wwkv0waX-JgfPrI_em3gPznH-2_C9MDcP03zEmIAoLRltMEBftax-lHJ52kciH3GUFAdQ1glc9Ej8ypgYHvfvO5gkQA6q0DhCEcWUPkOok5OvJre6iO358',
                '_y1XB55LywSvOEtuyr_hh3wjRaW7gFW_aebG1eSQFmcFTzFvw50xd9Vft_jXFvP3Cd9T4jL-eIPMizBX9gafRcaW8XDdjaWW6GDCJLeXBSoFQH4PpNjufNT7BaPCZfAwY_12rLEO66Pse1GrzdVHU6wSOciL99w56zQLgzFLHErc',
                '_62jup6y61Rt8SN8Oq1Lzu5GXA_WL7oxoRPkRPQNkiwvKz8z4D2p8g_Qa5QWvBYmFrgBwAZmarD1UJ1ucA_zUQbrgMUBmEiYv7S4AApUa1Obo6r2KQ_70BebGOo_F3lNUtzfNxEnMh4FRLShzu0hLlp6gZyFjW7aZKoqLRXR68bw',
                '_yXB4FEZnF35nrJxHpsiS3YB18ADNOwbrKIYKcXAdpAIjWy6A4-Nx6K44RWNvgnreWlACm6PaaymM6he1TaCAAyS8ouYHqSezBbGRPyKmKVXjcyHYfQ33W3tQvipwLM8YB3VcOAuvRBNaiQLLzPb9saE5HT2cU25EJE34hpAVm6I',
                '_6iVZXF5fD2ztELDFvmhTAJWMRNLBMRv3W6GArqcVLwcCM6WeoqPAySo05cG-XaqXTme0iC3Pzf5jvlHqY1GgAO4qfQcF3EWV66Uw9sYD1T_tu_rmKYjYT5YXyaxtki08r50YHA-Jw4obKcDHt6_sDONANUA7pCYjIeFGt0mv1Zs',
                '_yPV-YZgPu0_edJc3I8o1SUKqUucgYVKlbTrKqVyl3sxjQo3u73nGtQq190q3W_ebhVnQWLC8A4JFhbjWDCTzY8i7shadOvvSEeAfuPqsyK5JERqw-tbJm_0nvR8bShIcXzyrYDIg_ZBU_wNKbFzoCXHmh-CNsuKpb6NyBQPsIrU',
                '_-67MXDuic5c7e4Febc1QuI456bgmfeMnmp3rWcGWzcMIPytythDMqmZISsGGsLVFUOQxsGjm7s3ULV-307L3wd47B4K4BtUhTR5cyKMI4y5Ld-UstbevtgOURqLsc_XIhyFilGTJ8ORTRW7RI3O83xtRu-_0lRg9WcmnhWERBIU',
            ];
        }
        __decorate([
            $mol_mem
        ], $giper_baza_auth_mock, "current", null);
        $.$giper_baza_auth = $giper_baza_auth_mock;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'ordered links'() {
            var graph = new $mol_graph();
            graph.link('A', 'B', 'E');
            $mol_assert_equal(graph.edge_out('A', 'B'), 'E');
            $mol_assert_equal(graph.edge_in('B', 'A'), 'E');
            $mol_assert_equal(graph.edge_out('B', 'A'), null);
            $mol_assert_equal(graph.edge_in('A', 'B'), null);
        },
        'nodes without edges'() {
            var graph = new $mol_graph();
            graph.nodes.add('A');
            graph.nodes.add('B');
            graph.nodes.add('C');
            graph.nodes.add('D');
            graph.acyclic(edge => 0);
            $mol_assert_equal([...graph.sorted].join(''), 'ABCD');
        },
        'partial ordering'() {
            var graph = new $mol_graph();
            graph.nodes.add('A');
            graph.nodes.add('B');
            graph.nodes.add('C');
            graph.nodes.add('D');
            graph.link('B', 'C', { priority: 0 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'ACBD');
        },
        'sorting must cut cycles at low priority edges A'() {
            var graph = new $mol_graph();
            graph.link('A', 'B', { priority: 0 });
            graph.link('B', 'C', { priority: -2 });
            graph.link('C', 'D', { priority: 0 });
            graph.link('D', 'A', { priority: -1 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must cut cycles at low priority edges B'() {
            var graph = new $mol_graph();
            graph.link('B', 'C', { priority: -2 });
            graph.link('C', 'D', { priority: 0 });
            graph.link('D', 'A', { priority: -1 });
            graph.link('A', 'B', { priority: 0 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must cut cycles at low priority edges C'() {
            var graph = new $mol_graph();
            graph.link('C', 'D', { priority: 0 });
            graph.link('D', 'A', { priority: -1 });
            graph.link('A', 'B', { priority: 0 });
            graph.link('B', 'C', { priority: -2 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must cut cycles at low priority edges D'() {
            var graph = new $mol_graph();
            graph.link('D', 'A', { priority: -1 });
            graph.link('A', 'B', { priority: 0 });
            graph.link('B', 'C', { priority: -2 });
            graph.link('C', 'D', { priority: 0 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must group cutted cycles'() {
            var graph = new $mol_graph();
            graph.link('A', 'B', 0);
            graph.link('B', 'C', 0);
            graph.link('C', 'D', -2);
            graph.link('D', 'E', 0);
            graph.link('E', 'C', 0);
            graph.acyclic(edge => edge);
            $mol_assert_equal([...graph.sorted].join(''), 'CEDBA');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'parse and serial'() {
            $mol_assert_equal(new $mol_time_duration('P42.1Y').toString(), 'P42.1YT');
            $mol_assert_equal(new $mol_time_duration('P42.1M').toString(), 'P42.1MT');
            $mol_assert_equal(new $mol_time_duration('P42.1D').toString(), 'P42.1DT');
            $mol_assert_equal(new $mol_time_duration('PT42.1h').toString(), 'PT42.1H');
            $mol_assert_equal(new $mol_time_duration('PT42.1m').toString(), 'PT42.1M');
            $mol_assert_equal(new $mol_time_duration('PT42.1s').toString(), 'PT42.1S');
            $mol_assert_equal(new $mol_time_duration('P1Y2M3DT4h5m6.7s').toString(), 'P1Y2M3DT4H5M6.7S');
        },
        'negatives'() {
            $mol_assert_equal(new $mol_time_duration('P-1Y-2M-3DT-4h-5m-6.7s').toString(), new $mol_time_duration('-P1Y2M3DT4h5m6.7s').toString(), 'P-1Y-2M-3DT-4H-5M-6.7S');
            $mol_assert_equal(new $mol_time_duration('-P-1Y-2M-3DT-4h-5m-6.7s').toString(), 'P1Y2M3DT4H5M6.7S');
        },
        'format typed'() {
            $mol_assert_equal(new $mol_time_duration('P1Y2M3DT4h5m6s').toString('P#Y#M#DT#h#m#s'), 'P1Y2M3DT4H5M6S');
        },
        'format readable'() {
            $mol_assert_equal(new $mol_time_duration('P1Y2M3DT4h5m6s').toString('hh:mm:ss.sss'), '04:05:06.000');
        },
        'normalization'() {
            $mol_assert_equal(new $mol_time_duration('P1Y2M3DT44h55m66s').normal.toString(), 'P1Y2M4DT20H56M6S');
            $mol_assert_equal(new $mol_time_duration('P-1Y-2M-3DT-44h-55m-66s').normal.toString(), 'P-1Y-2M-4DT-20H-56M-6S');
        },
        'comparison'() {
            const iso = 'P1Y1M1DT1h1m1s';
            $mol_assert_equal(new $mol_time_duration(iso), new $mol_time_duration(iso));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'parse and serial'() {
            $mol_assert_equal(new $mol_time_moment('2014').toString(), '2014');
            $mol_assert_equal(new $mol_time_moment('2014-01').toString(), '2014-01');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').toString(), '2014-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03').toString(), '2014-01-02T03');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04').toString(), '2014-01-02T03:04');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05').toString(), '2014-01-02T03:04:05');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05.006').toString(), '2014-01-02T03:04:05.006');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05.006Z').toString(), '2014-01-02T03:04:05.006+00:00');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05.006+07:00').toString(), '2014-01-02T03:04:05.006+07:00');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05+07:08').toString(), '2014-01-02T03:04:05+07:08');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04+07:08').toString(), '2014-01-02T03:04+07:08');
            $mol_assert_equal(new $mol_time_moment('T03:04+07:08').toString(), 'T03:04+07:08');
            $mol_assert_equal(new $mol_time_moment('T03:04:05').toString(), 'T03:04:05');
            $mol_assert_equal(new $mol_time_moment('T03:04').toString(), 'T03:04');
            $mol_assert_equal(new $mol_time_moment('T03').toString(), 'T03');
        },
        'format simple'() {
            $mol_assert_equal(new $mol_time_moment('2014-01-02T01:02:03.000000').toString('AD YY-M-D h:m:s'), '21 14-1-2 1:2:3');
        },
        'format padded'() {
            $mol_assert_equal(new $mol_time_moment('2014-01-02T01:02:03.000').toString('YYYY-MM-DD hh:mm:ss'), '2014-01-02 01:02:03');
        },
        'format time zone'() {
            $mol_assert_equal(new $mol_time_moment('2014-01-02T01:02:03+05:00').toString('Z'), '+05:00');
        },
        'format names'() {
            new $mol_time_moment('2014-01-02T01:02:03.000').toString('Month Mon | WeekDay WD');
        },
        'shifting'() {
            $mol_assert_equal(new $mol_time_moment('T15:54:58.243+03:00').shift({}).toString(), 'T15:54:58.243+03:00');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('P1Y').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('P12M').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('P365D').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('PT8760h').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01').shift('PT8760h').toString(), '2015-01');
            $mol_assert_equal(new $mol_time_moment('2014-01').shift('PT-8760h').toString(), '2013-01');
        },
        'native from reduced'() {
            $mol_assert_equal(new $mol_time_moment('T15:00').native.toISOString().slice(0, -5), new $mol_time_moment().merge('T15:00:00').toOffset('Z').toString().slice(0, -6));
        },
        'normalization'() {
            $mol_assert_equal(new $mol_time_moment({ year: 2015, month: 6, day: 34 }).normal.toString(), '2015-08-04');
            $mol_assert_equal(new $mol_time_moment('2024-09-30 19:00+03:00').normal.month, 8);
        },
        'renormalization'() {
            $mol_assert_equal(new $mol_time_moment('2024-08').normal.toString(), '2024-08');
            $mol_assert_equal(new $mol_time_moment('2024-11').normal.toString(), '2024-11');
        },
        'iso week day'() {
            $mol_assert_equal(new $mol_time_moment('2017-09-17').weekday, $mol_time_moment_weekdays.sunday);
            $mol_assert_equal(new $mol_time_moment('2017-09-18').weekday, $mol_time_moment_weekdays.monday);
        },
        'change offset'() {
            $mol_assert_equal(new $mol_time_moment('2021-04-10 +03:00').toOffset('Z').toString(), '2021-04-09T21:00:00+00:00');
        },
        'comparison'() {
            const iso = '2021-01-02T03:04:05.678+09:10';
            $mol_assert_equal(new $mol_time_moment(iso), new $mol_time_moment(iso));
        },
        'array keeps zero offset'() {
            const moment = new $mol_time_moment('2026-01-25T16:37:36.129+00:00');
            const restored = new $mol_time_moment(moment.toArray());
            $mol_assert_equal(restored.offset?.count('PT1m'), 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Is number'() {
            $mol_data_number(0);
        },
        'Is not number'() {
            $mol_assert_fail(() => {
                $mol_data_number('x');
            }, 'x is not a number');
        },
        'Is object number'() {
            $mol_assert_fail(() => {
                $mol_data_number(new Number(''));
            }, '0 is not a number');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Is integer'() {
            $mol_data_integer(0);
        },
        'Is float'() {
            $mol_assert_fail(() => {
                $mol_data_integer(1.1);
            }, '1.1 is not an integer');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'tagged typing'() {
            const { Weight, Length } = $mol_data_tagged({
                Weight: $mol_data_integer,
                Length: $mol_data_integer,
            });
            Length(20); // Validate
            let len = Length(10); // Inferred type
            len = 20; // Explicit type
            let num = len; // Implicit cast
            len = Length(Weight(20)); // Explicit cast
            // len = 20 // Compile time error
            // len = Weight( 20 ) // Compile time error
            // len = Length( 20.1 ) // Run time error
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Watch one value'($) {
            class App extends $mol_object2 {
                static $ = $;
                static dict = new $mol_wire_dict();
                static lucky() {
                    return this.dict.get(777);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "lucky", null);
            $mol_assert_equal(App.lucky(), undefined);
            App.dict.set(666, 6666);
            $mol_assert_equal(App.lucky(), undefined);
            App.dict.set(777, 7777);
            $mol_assert_equal(App.lucky(), 7777);
            App.dict.delete(777);
            $mol_assert_equal(App.lucky(), undefined);
        },
        'Watch item channel'($) {
            class App extends $mol_object2 {
                static $ = $;
                static dict = new $mol_wire_dict();
                static lucky() {
                    return this.dict.item(777);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "lucky", null);
            $mol_assert_equal(App.lucky(), null);
            App.dict.item(666, 6666);
            $mol_assert_equal(App.lucky(), null);
            App.dict.item(777, 7777);
            $mol_assert_equal(App.lucky(), 7777);
            App.dict.item(777, null);
            $mol_assert_equal(App.lucky(), null);
        },
        'Watch size'($) {
            class App extends $mol_object2 {
                static $ = $;
                static dict = new $mol_wire_dict();
                static size() {
                    return this.dict.size;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "size", null);
            $mol_assert_equal(App.size(), 0);
            App.dict.set(666, 6666);
            $mol_assert_equal(App.size(), 1);
            App.dict.set(777, 7777);
            $mol_assert_equal(App.size(), 2);
            App.dict.delete(777);
            $mol_assert_equal(App.size(), 1);
        },
        'Watch for-of'($) {
            class App extends $mol_object2 {
                static $ = $;
                static dict = new $mol_wire_dict();
                static sum() {
                    let keys = 0;
                    let vals = 0;
                    for (const [key, val] of this.dict) {
                        keys += key;
                        vals += val;
                    }
                    return [keys, vals];
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "sum", null);
            $mol_assert_like(App.sum(), [0, 0]);
            App.dict.set(111, 1111);
            $mol_assert_like(App.sum(), [111, 1111]);
            App.dict.set(222, 2222);
            $mol_assert_like(App.sum(), [333, 3333]);
            App.dict.delete(111);
            $mol_assert_like(App.sum(), [222, 2222]);
        },
        'Watch forEach'($) {
            class App extends $mol_object2 {
                static $ = $;
                static dict = new $mol_wire_dict();
                static sum() {
                    let keys = 0;
                    let vals = 0;
                    this.dict.forEach((val, key) => {
                        keys += key;
                        vals += val;
                    });
                    return [keys, vals];
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "sum", null);
            $mol_assert_like(App.sum(), [0, 0]);
            App.dict.set(111, 1111);
            $mol_assert_like(App.sum(), [111, 1111]);
            App.dict.set(222, 2222);
            $mol_assert_like(App.sum(), [333, 3333]);
            App.dict.delete(111);
            $mol_assert_like(App.sum(), [222, 2222]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Empty release"($) {
                const pool = new $mol_memory_pool;
                $mol_assert_equal(pool.empty(), true);
                pool.release(0, 0);
                $mol_assert_equal(pool.acquire(8), 0);
                $mol_assert_equal(pool.empty(), false);
                pool.release(0, 8);
                $mol_assert_equal(pool.empty(), true);
            },
            "linear allocation"($) {
                const pool = new $mol_memory_pool;
                $mol_assert_equal(pool.acquire(8), 0);
                $mol_assert_equal(pool.acquire(16), 8);
                $mol_assert_equal(pool.acquire(32), 24);
            },
            "allocation in released"($) {
                const pool = new $mol_memory_pool;
                $mol_assert_equal(pool.acquire(8), 0);
                $mol_assert_equal(pool.acquire(16), 8);
                pool.release(0, 16);
                $mol_assert_equal(pool.acquire(8), 0);
                $mol_assert_equal(pool.acquire(16), 24);
                $mol_assert_equal(pool.acquire(8), 8);
            },
            "space limitation"($) {
                const pool = new $mol_memory_pool(10);
                pool.acquire(8);
                pool.release(2, 4);
                $mol_assert_fail(() => pool.acquire(6), 'No free space\nneed: 6\nhave: 4');
            },
            "double release"($) {
                const pool = new $mol_memory_pool;
                $mol_assert_fail(() => pool.release(0, 2), 'Double release');
                $mol_assert_fail(() => pool.release(2, 2), 'Release out of allocated');
                pool.acquire(16);
                pool.release(4, 8);
                $mol_assert_fail(() => pool.release(4, 8), 'Double release');
                $mol_assert_fail(() => pool.release(10, 4), 'Double release');
                $mol_assert_fail(() => pool.release(2, 4), 'Double release');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "faces serial and parse"($) {
                const land1 = new $giper_baza_link('12345678_12345678');
                const land2 = new $giper_baza_link('87654321_87654321');
                const land3 = new $giper_baza_link('87654321_00000000');
                const peer1 = new $giper_baza_link('12345678');
                const peer2 = new $giper_baza_link('87654321');
                const faces1 = new $giper_baza_face_map;
                faces1.peer_time(peer1.str, $giper_baza_time_now(), 0);
                faces1.peer_summ(peer1.str, 0);
                faces1.peer_time(peer2.str, $giper_baza_time_now(), 0);
                faces1.peer_summ(peer2.str, 64_000);
                const faces2 = new $giper_baza_face_map;
                faces2.peer_time(peer1.str, $giper_baza_time_now(), 0);
                faces2.peer_summ(peer1.str, 1);
                faces2.peer_time(peer2.str, $giper_baza_time_now(), 1);
                const faces3 = new $giper_baza_face_map;
                const parts = [
                    [land1.str, new $giper_baza_pack_part([], faces1)],
                    [land2.str, new $giper_baza_pack_part([], faces2)],
                    [land3.str, new $giper_baza_pack_part([], faces3)],
                ];
                const pack = $giper_baza_pack.make(parts);
                $mol_assert_equal(parts, pack.parts());
            },
            "units serial and parse"($) {
                const land = new $giper_baza_link('12345678_12345678');
                const pass = $.$giper_baza_auth.grab().pass();
                const gift = $giper_baza_unit_gift.make();
                const sand_small = $giper_baza_unit_sand.make(5);
                const ball = new Uint8Array($giper_baza_unit_sand.size_equator + 5);
                const sand_big = $giper_baza_unit_sand.make(ball.byteLength);
                sand_big.ball(ball);
                const seal = $giper_baza_unit_seal.make(15, true);
                const parts = [
                    [land.str, new $giper_baza_pack_part([pass, gift, sand_small, sand_big, seal])],
                ];
                const pack = $giper_baza_pack.make(parts);
                $mol_assert_equal(parts, pack.parts());
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'triplets'() {
            $mol_assert_equal(new $mol_time_interval('2015-01-01/P1M').end.toString(), '2015-02-01');
            $mol_assert_equal(new $mol_time_interval('P1M/2015-02-01').start.toString(), '2015-01-01');
            $mol_assert_equal(new $mol_time_interval('2015-01-01/2015-02-01').duration.toString(), 'PT2678400S');
        },
        'comparison'() {
            const iso = '2021-01-02/2022-03-04';
            $mol_assert_like(new $mol_time_interval(iso), new $mol_time_interval(iso));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "1 byte int"($) {
                $mol_assert_equal($mol_bigint_encode(0n), new Uint8Array(new Int8Array([0]).buffer));
                $mol_assert_equal($mol_bigint_encode(1n), new Uint8Array(new Int8Array([1]).buffer));
                $mol_assert_equal($mol_bigint_encode(-1n), new Uint8Array(new Int8Array([-1]).buffer));
                $mol_assert_equal($mol_bigint_encode(127n), new Uint8Array(new Int8Array([127]).buffer));
                $mol_assert_equal($mol_bigint_encode(-128n), new Uint8Array(new Int8Array([-128]).buffer));
            },
            "2 byte int"($) {
                $mol_assert_equal($mol_bigint_encode(128n), new Uint8Array(new Int16Array([128]).buffer));
                $mol_assert_equal($mol_bigint_encode(-129n), new Uint8Array(new Int16Array([-129]).buffer));
                $mol_assert_equal($mol_bigint_encode(128n * 256n - 1n), new Uint8Array(new Int16Array([128 * 256 - 1]).buffer));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n), new Uint8Array(new Int16Array([-128 * 256]).buffer));
            },
            "3 byte int"($) {
                $mol_assert_equal($mol_bigint_encode(128n * 256n), new Uint8Array(new Int32Array([128 * 256]).buffer).slice(0, 3));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n - 1n), new Uint8Array(new Int32Array([-128 * 256 - 1]).buffer).slice(0, 3));
                $mol_assert_equal($mol_bigint_encode(128n * 256n ** 2n - 1n), new Uint8Array(new Int32Array([128 * 256 ** 2 - 1]).buffer).slice(0, 3));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n ** 2n), new Uint8Array(new Int32Array([-128 * 256 ** 2]).buffer).slice(0, 3));
            },
            "4 byte int"($) {
                $mol_assert_equal($mol_bigint_encode(128n * 256n ** 2n), new Uint8Array(new Int32Array([128 * 256 ** 2]).buffer));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n ** 2n - 1n), new Uint8Array(new Int32Array([-128 * 256 ** 2 - 1]).buffer));
                $mol_assert_equal($mol_bigint_encode(128n * 256n ** 3n - 1n), new Uint8Array(new Int32Array([128 * 256 ** 3 - 1]).buffer));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n ** 3n), new Uint8Array(new Int32Array([-128 * 256 ** 3]).buffer));
            },
            "8 byte int"($) {
                $mol_assert_equal($mol_bigint_encode(128n * 256n ** 7n - 1n), new Uint8Array(new BigInt64Array([128n * 256n ** 7n - 1n]).buffer));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n ** 7n), new Uint8Array(new BigInt64Array([-128n * 256n ** 7n]).buffer));
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        function check(text, bytes) {
            const ideal = new Uint8Array(bytes);
            const actual = $mol_charset_ucf_encode(text);
            $mol_assert_equal($mol_charset_ucf_decode(actual), text);
            $mol_assert_equal(actual, ideal);
        }
        $mol_test({
            "Full ASCII compatible"($) {
                check('hi', [0x68, 0x69]);
            },
            "1B ASCII with diacritic"($) {
                check('allo\u0300', [0x61, 0x6C, 0x6C, 0x6F, 0xE2]);
            },
            "1B Cyrillic"($) {
                check('мир', [0x88, 0x3C, 0xE2, 0x40, 0xF8]);
            },
            "1B Cyrillic with nummbers and punctuation"($) {
                check('м.1', [0x88, 0x3C, 0x2E, 0x31, 0xF8]);
            },
            "2B Kanji"($) {
                check('美', [0xF9, 0x0E, 0x63, 0x87]);
            },
            "3B rare Kanji"($) {
                check('𲎯', [0xF7, 0x2F, 0x47, 0x0C, 0x89]);
            },
            "1B Kana"($) {
                check('しい', [0xE0, 0x57, 0x44, 0xA0]);
            },
            "2B Emoji"($) {
                check('🏴', [0xFF, 0x74, 0x4B, 0x81]);
            },
            "2B Emoji with 1B modifiers"($) {
                check('🏴‍☠', [0xFF, 0x74, 0x4B, 0xC1, 0x0D, 0x8C, 0xA9, 0xB4]);
            },
            "2B Emoji with 3B Tag"($) {
                check('🏴\u{E007F}', [0xFF, 0x74, 0x4B, 0xF8, 0x7F, 0x00, 0xF3, 0x89]);
            },
            "Mixed scripts"($) {
                check('allô 美しい мир, 🏴‍☠\n', [
                    0x61, 0x6C, 0x6C, 0x6F, 0xEA, 0x20, // allô 
                    0xF9, 0x0E, 0x63, 0xE7, 0x57, 0x44, 0x20, // 美しい 
                    0xA8, 0x3C, 0xE2, 0x40, 0x2C, 0x20, // мир, 
                    0xF7, 0x74, 0x4B, 0xC1, 0x0D, 0x8C, 0xA9, 0x0A, // 🏴‍☠\n
                    0xB4,
                ]);
            },
            "Wrong ending"($) {
                const bin = new Uint8Array([0x88, 0x3C, 0xE2, 0x40]);
                const error = $mol_assert_fail(() => $mol_charset_ucf_decode(bin), 'Wrong ending');
                $mol_assert_equal(error.cause.mode, 166);
                $mol_assert_equal(error.cause.text, 'мир');
            },
            "Wrong byte"($) {
                const bin = new Uint8Array([0xFF, 0x74, 0x4B, 0x74, 0x9B, 0x81]);
                const error = $mol_assert_fail(() => $mol_charset_ucf_decode(bin), 'Wrong byte');
                $mol_assert_equal(error.cause.pos, 4);
                $mol_assert_equal(error.cause.text, '🏴');
            },
            "Wrong 2B sequence length"($) {
                const bin = new Uint8Array([0x78, 0xF9, 0x0E]);
                const error = $mol_assert_fail(() => $mol_charset_ucf_decode(bin), 'Expected 2 bytes');
                $mol_assert_equal(error.cause.pos, 2);
                $mol_assert_equal(error.cause.text, 'x');
            },
            "Wrong 3B sequence length"($) {
                const bin = new Uint8Array([0x78, 0xF7, 0x2F, 0x47]);
                const error = $mol_assert_fail(() => $mol_charset_ucf_decode(bin), 'Expected 3 bytes');
                $mol_assert_equal(error.cause.pos, 2);
                $mol_assert_equal(error.cause.text, 'x');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "1 byte int"($) {
                $mol_assert_equal($mol_bigint_decode(new Uint8Array), 0n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int8Array([1]).buffer)), 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int8Array([-1]).buffer)), -1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int8Array([127]).buffer)), 127n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int8Array([-128]).buffer)), -128n);
            },
            "2 byte int"($) {
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int16Array([128]).buffer)), 128n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int16Array([-129]).buffer)), -129n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int16Array([128 * 256 - 1]).buffer)), 128n * 256n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int16Array([-128 * 256]).buffer)), -128n * 256n);
            },
            "3 byte int"($) {
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([128 * 256]).buffer).slice(0, 3)), 128n * 256n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([-128 * 256 - 1]).buffer).slice(0, 3)), -128n * 256n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([128 * 256 ** 2 - 1]).buffer).slice(0, 3)), 128n * 256n ** 2n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([-128 * 256 ** 2]).buffer).slice(0, 3)), -128n * 256n ** 2n);
            },
            "4 byte int"($) {
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([128 * 256 ** 2]).buffer)), 128n * 256n ** 2n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([-128 * 256 ** 2 - 1]).buffer)), -128n * 256n ** 2n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([128 * 256 ** 3 - 1]).buffer)), 128n * 256n ** 3n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([-128 * 256 ** 3]).buffer)), -128n * 256n ** 3n);
            },
            "8 byte int"($) {
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new BigInt64Array([128n * 256n ** 7n - 1n]).buffer)), 128n * 256n ** 7n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new BigInt64Array([-128n * 256n ** 7n]).buffer)), -128n * 256n ** 7n);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Zero int"($) {
                $mol_assert_equal($mol_bigint_decode($mol_bigint_encode(0n)), 0n);
            },
            "Large positive int"($) {
                $mol_assert_equal($mol_bigint_decode($mol_bigint_encode(12345678901234567890n)), 12345678901234567890n);
            },
            "Large negative int"($) {
                $mol_assert_equal($mol_bigint_decode($mol_bigint_encode(-12345678901234567890n)), -12345678901234567890n);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        const { uint, link, spec, blob, text, list, tupl, sint } = $mol_vary_tip;
        const { none, both, fp16, fp32, fp64 } = $mol_vary_spec;
        const { L1, L2, L4, L8, LA } = $mol_vary_len;
        const str = $mol_charset_ucf_encode;
        function check(vary, ideal, Vary = $mol_vary) {
            const pack = Vary.pack(vary);
            $mol_assert_equal(Vary.take(pack), vary);
            $mol_assert_equal(pack, new Uint8Array(ideal));
        }
        $mol_test({
            "vary pack logical"($) {
                check([null], [spec | none]);
                check([true], [$mol_vary_spec.true]);
                check([false], [$mol_vary_spec.fake]);
                check([undefined], [spec | both]);
            },
            "vary pack uint0"($) {
                check([0], [0]);
                check([27], [27]);
            },
            "vary pack uint1"($) {
                check([28], [uint | L1, 28]);
                check([255], [uint | L1, 255]);
            },
            "vary pack uint2"($) {
                check([256], [uint | L2, 0, 1]);
                check([256 ** 2 - 1], [uint | L2, 255, 255]);
            },
            "vary pack uint4"($) {
                check([256 ** 2], [uint | L4, 0, 0, 1, 0]);
                check([256 ** 4 - 1], [uint | L4, 255, 255, 255, 255]);
            },
            "vary pack uint8"($) {
                check([256 ** 4], [uint | L8, 0, 0, 0, 0, 1, 0, 0, 0]);
                check([Number.MAX_SAFE_INTEGER], [uint | L8, 255, 255, 255, 255, 255, 255, 31, 0]);
                check([256n ** 8n - 1n], [uint | L8, 255, 255, 255, 255, 255, 255, 255, 255]);
            },
            "vary pack sint0"($) {
                check([-1], [-1]);
                check([-27], [-27]);
            },
            "vary pack sint1"($) {
                check([-28,], [sint | -L1, -28]);
                check([-256 / 2], [sint | -L1, 128]);
            },
            "vary pack sint2"($) {
                check([-256 / 2 - 1], [sint | -L2, 127, 255]);
                check([-(256 ** 2) / 2], [sint | -L2, 0, 128]);
            },
            "vary pack sint4"($) {
                check([-(256 ** 2) / 2 - 1], [sint | -L4, 255, 127, 255, 255]);
                check([-(256 ** 4) / 2], [sint | -L4, 0, 0, 0, 128]);
            },
            "vary pack sint8"($) {
                check([-(256 ** 4) / 2 - 1], [sint | -L8, 255, 255, 255, 127, 255, 255, 255, 255]);
                check([Number.MIN_SAFE_INTEGER], [sint | -L8, 1, 0, 0, 0, 0, 0, 224, 255]);
                check([-(2n ** 63n)], [sint | -L8, 0, 0, 0, 0, 0, 0, 0, 128]);
            },
            "vary pack bigint"($) {
                check([2n ** 64n], [sint | -LA, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
                check([2n ** 2111n], [sint | -LA, 0, 1, ...Array.from({ length: 263 }, () => 0), 128, 0]);
                check([-1n - 2n ** 64n], [sint | -LA, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 254]);
                check([-1n - 2n ** 2111n], [sint | -LA, 0, 1, ...Array.from({ length: 263 }, () => 255), -129, 255]);
            },
            "vary pack float"($) {
                check([1.5], [fp64, ...new Uint8Array(new Float64Array([1.5]).buffer)]);
            },
            "vary pack list"($) {
                check([[1, 2, 3]], [list | 3, 1, 2, 3]);
                check([[[], [1], [2, 3]]], [list | 3, list | 0, list | 1, 1, list | 2, 2, 3]);
            },
            "vary pack dedup list"($) {
                const pair = [1, 2];
                check([[pair, pair]], [list | 2, list | 2, 1, 2, link | 0]);
                const seven = [7];
                const box = [seven];
                check([[box, box, seven]], [list | 3, list | 1, list | 1, 7, link | 1, link | 0]);
            },
            "vary pack cyclic list"($) {
                const foo = [];
                foo.push([foo]);
                $mol_assert_fail(() => $mol_vary.pack([foo]), 'Cyclic refs');
            },
            "vary pack dedup uint"($) {
                check([[28, 28]], [list | 2, uint | L1, 28, link | 0]);
                check([[2n ** 64n, 2n ** 64n]], [list | 2, sint | -LA, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, link | 0]);
            },
            "vary pack dedup float"($) {
                check([[1.5, 1.5]], [list | 2, fp64, ...new Uint8Array(new Float64Array([1.5]).buffer), link | 0]);
            },
            "vary pack text"($) {
                check(['foo'], [text | 3, ...str('foo')]);
                check(['абв'], [text | 5, ...str('абв')]);
                const long_lat = 'abcdefghijklmnopqrst';
                check([long_lat], [text | L1, 20, ...str(long_lat)]);
                const long_cyr = 'абвгдеёжзийклмнопрст';
                check([long_cyr], [text | L1, 22, ...str(long_cyr)]);
            },
            "vary pack dedup text"($) {
                check([["f", "f"]], [list | 2, text | 1, ...str('f'), link | 0]);
            },
            "vary pack blob"($) {
                check([new Uint8Array([1, 255])], [blob | 2, uint | L1, 1, 255]);
                check([new Int8Array([-128, 127])], [blob | 2, sint | ~L1, -128, 127]);
                check([new Uint32Array([255])], [blob | 4, uint | L4, 255, 0, 0, 0]);
                check([new Int32Array([-128])], [blob | 4, sint | ~L4, -128, 255, 255, 255]);
                check([new BigUint64Array([255n])], [blob | 8, uint | L8, 255, 0, 0, 0, 0, 0, 0, 0]);
                check([new BigInt64Array([-128n])], [blob | 8, sint | ~L8, -128, 255, 255, 255, 255, 255, 255, 255]);
                check([new Float32Array([1.5])], [blob | 4, fp32, ...new Uint8Array(new Float32Array([1.5]).buffer)]);
                check([new Float64Array([1.5])], [blob | 8, fp64, ...new Uint8Array(new Float64Array([1.5]).buffer)]);
            },
            "vary pack dedup blob"($) {
                const part = new Uint8Array([1, 2]);
                check([[part, part]], [list | 2, blob | 2, uint | L1, 1, 2, link | 0]);
            },
            "vary pack struct"($) {
                check([{ x: 1, y: 2 }], [tupl | 2, list | 2, text | 1, ...str('x'), text | 1, ...str('y'), 1, 2]);
                check([{ x: {}, y: { a: 1 } }], [tupl | 2, list | 2, text | 1, ...str('x'), text | 1, ...str('y'), tupl | 0, list | 0, tupl | 1, list | 1, text | 1, ...str('a'), 1]);
            },
            "vary pack struct shape dedup"($) {
                check([[{}, { foo: 1 }, { foo: 2 }]], [list | 3, tupl | 0, list | 0, tupl | 1, list | 1, text | 3, ...str('foo'), 1, tupl | 1, link | 3, 2]);
                check([{ x: 1, y: { x: 2, y: 3 } }], [tupl | 2, list | 2, text | 1, ...str('x'), text | 1, ...str('y'), 1, tupl | 2, link | 2, 2, 3]);
            },
            "vary pack struct full dedup"($) {
                const item = { x: 1 };
                check([[item, item]], [list | 2, tupl | 1, list | 1, text | 1, ...str('x'), 1, link | 2]);
                const part = { x: 1, y: 2 };
                check([{ x: part, y: part }], [tupl | 2, list | 2, text | 1, ...str('x'), text | 1, ...str('y'), tupl | 2, link | 2, 1, 2, link | 3]);
            },
            "vary pack cyclic struct"($) {
                const foo = { bar: null };
                foo.bar = foo;
                $mol_assert_fail(() => $mol_vary.pack([foo]), 'Cyclic refs');
            },
            "vary pack Map"($) {
                check([new Map([['foo', 1], [2, 'bar']])], [tupl | 2, list | 2, text | 4, ...str('keys'), text | 4, ...str('vals'), list | 2, text | 3, ...str('foo'), 2, list | 2, 1, text | 3, ...str('bar')]);
            },
            "vary pack Set"($) {
                check([new Set([7, 'foo'])], [tupl | 1, list | 1, text | 3, ...str('set'), list | 2, 7, text | 3, ...str('foo')]);
            },
            "vary pack Date"($) {
                const date1 = new Date('2025-01-02T03:04:05');
                check([date1], [tupl | 1, list | 1, text | $mol_vary_len.L1, 9, ...str('unix_time'), uint | L4, ...new Uint8Array(new Uint32Array([date1.valueOf() / 1000]).buffer)]);
                const date2 = new Date('2025-01-02T03:04:05.678');
                check([date2], [tupl | 1, list | 1, text | $mol_vary_len.L1, 9, ...str('unix_time'), fp64, ...new Uint8Array(new Float64Array([date2.valueOf() / 1000]).buffer)]);
            },
            "vary pack DOM Element"($) {
                $mol_assert_equal($mol_dom_serialize($mol_jsx("div", null,
                    $mol_jsx("span", null),
                    $mol_jsx("br", null),
                    " ")), $mol_dom_serialize($mol_vary.take($mol_vary.pack([$mol_jsx("div", null,
                        $mol_jsx("span", null),
                        $mol_jsx("br", null),
                        " ")]))[0]));
            },
            "vary pack custom types in rooms"($) {
                class Foo {
                    a;
                    b;
                    constructor(a, b) {
                        this.a = a;
                        this.b = b;
                    }
                    ;
                    [Symbol.iterator]() {
                        return [this.a, this.b].values();
                    }
                }
                const Vary = $mol_vary.zone();
                Vary.type({
                    type: Foo,
                    keys: ['summ', 'diff'],
                    lean: foo => [foo.a + foo.b, foo.a - foo.b],
                    rich: ([summ, diff]) => new Foo((summ + diff) / 2, (summ - diff) / 2),
                });
                // restore
                check([new Foo(4, 2)], [tupl | 2, list | 2, text | 4, ...str('summ'), text | 4, ...str('diff'), 6, 2], Vary);
                // isolated
                $mol_assert_equal($mol_vary.take($mol_vary.pack([new Foo(4, 2)])), [{ a: 4, b: 2 }]);
                // inherited
                $mol_assert_equal(Vary.take(Vary.pack([new Map([[1, 2]])])), [new Map([[1, 2]])]);
            },
            "vary pack sequences"($) {
                check([], []);
                check([7], [7]);
                check([3, 4], [3, 4]);
                check([['foo', 'foo'], ['bar', 'bar']], [list | 2, text | 3, ...str('foo'), link | 0, list | 2, text | 3, ...str('bar'), link | 0]);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        function check(vary) {
            $mol_assert_equal(vary, $giper_baza_vary.take($giper_baza_vary.pack([vary]))[0]);
        }
        $mol_test({
            "Bin"($) {
                check(null);
                check(new Uint8Array([1, 2, 3]));
            },
            "Bool"($) {
                check(false);
                check(true);
            },
            "Int"($) {
                check(0);
                check(4611686018427387904n);
            },
            "Real"($) {
                check(0);
                check(Math.PI);
                check(Number.NaN);
                check(Number.POSITIVE_INFINITY);
                check(Number.NEGATIVE_INFINITY);
                check(Number.MAX_SAFE_INTEGER);
                check(Number.MIN_SAFE_INTEGER);
                check(BigInt(Number.MAX_VALUE));
                check(Number.MIN_VALUE);
            },
            "Link"($) {
                check(new $giper_baza_link(''));
                check($giper_baza_link.from_int(123456789));
            },
            "Str"($) {
                check('');
                check('123');
                check('🐱‍👤');
            },
            "Time"($) {
                check(new $mol_time_moment('1984-08-04T09:05:13.666+03:00'));
                check(new $mol_time_moment);
            },
            "Dura"($) {
                check(new $mol_time_duration('P1Y2M3DT4h5m6.6s'));
            },
            "Span"($) {
                check(new $mol_time_interval('T09:00/PT9h'));
            },
            "JSON"($) {
                check({ foo: ['bar'] });
                check([{ foo: 'bar' }]);
            },
            "DOM"($) {
                const xml = ($mol_jsx("div", null,
                    $mol_jsx("span", { class: "bar" }, "xxx")));
                $mol_assert_equal($mol_dom_serialize($giper_baza_vary.take($giper_baza_vary.pack([xml]))[0]), $mol_dom_serialize(xml));
            },
            "Tree"($) {
                const tree = $.$mol_tree2_from_string(`
				foo \\bar
					foo \\bar
			`);
                $mol_assert_equal($.$mol_tree2_to_string($giper_baza_vary.take($giper_baza_vary.pack([tree]))[0]), $.$mol_tree2_to_string(tree));
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $mol_bus extends $.$mol_bus {
            send() { }
        }
        $.$mol_bus = $mol_bus;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'empty array'() {
            $mol_assert_equal($mol_array_chunks([], () => true), []);
        },
        'one chunk'() {
            $mol_assert_equal($mol_array_chunks([1, 2, 3, 4, 5], () => false), [[1, 2, 3, 4, 5]]);
        },
        'fixed size chunk'() {
            $mol_assert_equal($mol_array_chunks([1, 2, 3, 4, 5], 3), [[1, 2, 3], [4, 5]]);
        },
        'first empty chunk'() {
            $mol_assert_equal($mol_array_chunks([1, 2, 3, 4, 5], (_, i) => i === 0), [[1, 2, 3, 4, 5]]);
        },
        'chunk for every item'() {
            $mol_assert_equal($mol_array_chunks([1, 2, 3, 4, 5], () => true), [[1], [2], [3], [4], [5]]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $giper_baza_land_mock extends $.$giper_baza_land {
            sync() {
                return this;
            }
        }
        $.$giper_baza_land = $giper_baza_land_mock;
    });
    $mol_test({
        async 'Give rights'($) {
            const auth0 = await $.$giper_baza_auth.grab();
            const auth1 = await $.$giper_baza_auth.grab();
            const auth2 = await $.$giper_baza_auth.grab();
            const land0 = $giper_baza_land.make({ $, auth: () => auth0 });
            const land1 = $giper_baza_land.make({ $, link: () => land0.link(), auth: () => auth1 });
            $mol_assert_equal(land0.lord_rank(land0.link()), $giper_baza_rank_rule);
            $mol_assert_equal(land0.lord_rank(auth1.pass().lord()), $giper_baza_rank_read);
            land1.give(auth2.pass(), $giper_baza_rank_post('just'));
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_read);
            land0.give(auth1.pass(), $giper_baza_rank_read);
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_read);
            land0.give(auth1.pass(), $giper_baza_rank_read);
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_read);
            land0.give(auth1.pass(), $giper_baza_rank_post('just'));
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_post('just'));
            land0.give(auth1.pass(), $giper_baza_rank_pull('just'));
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_pull('just'));
            land0.give(auth1.pass(), $giper_baza_rank_rule);
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_rule);
            land0.give(auth1.pass(), $giper_baza_rank_post('just'));
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_post('just'));
            await $mol_wire_async(land1).units_steal(land0);
            $mol_assert_equal(land1.pass_rank(auth1.pass()), $giper_baza_rank_post('just'));
            land1.give(auth2.pass(), $giper_baza_rank_post('just'));
        },
        async 'Post Data and pick Delta'($) {
            const auth1 = $.$giper_baza_auth.grab();
            const auth2 = $.$giper_baza_auth.grab();
            const land1 = $giper_baza_land.make({ $, auth: () => auth1 });
            const land2 = $giper_baza_land.make({ $, link: () => land1.link(), auth: () => auth2 });
            $mol_assert_equal(await $mol_wire_async(land1).diff_units(), []);
            land1.post($giper_baza_link.hole, $giper_baza_link.hole, new $giper_baza_link('AA111111'), new Uint8Array([1]));
            $mol_assert_equal((await $mol_wire_async(land1).diff_units()).length, 4);
            const face = land1.faces.clone();
            land1.post(new $giper_baza_link('AA111111'), $giper_baza_link.hole, new $giper_baza_link('AA222222'), new Uint8Array([2]));
            $mol_assert_equal((await $mol_wire_async(land1).diff_units()).length, 5);
            $mol_assert_equal((await $mol_wire_async(land1).diff_units(face)).length, 2);
            await $mol_wire_async(land2).units_steal(land1);
            land2.post(new $giper_baza_link('AA222222'), $giper_baza_link.hole, new $giper_baza_link('AA333333'), new Uint8Array([3]));
            $mol_assert_equal((await $mol_wire_async(land2).diff_units()).length, 5);
            $mol_assert_equal((await $mol_wire_async(land2).diff_units(face)).length, 2);
            land1.give(auth2.pass(), $giper_baza_rank_post('just'));
            await $mol_wire_async(land2).units_steal(land1);
            land2.post(new $giper_baza_link('AA222222'), $giper_baza_link.hole, new $giper_baza_link('AA333333'), new Uint8Array([5]));
            $mol_assert_equal((await $mol_wire_async(land2).diff_units()).length, 9);
            $mol_assert_equal((await $mol_wire_async(land2).diff_units(face)).length, 6);
            land1.give(auth2.pass(), $giper_baza_rank_read);
            await $mol_wire_async(land2).units_steal(land1);
            $mol_assert_equal((await $mol_wire_async(land2).diff_units()).length, 7);
        },
        async 'Land encryption'($) {
            const land = $mol_wire_async($giper_baza_land.make({ $ }));
            $mol_assert_equal(await land.encrypted(), false);
            await land.encrypted(true);
            $mol_assert_equal(await land.encrypted(), true);
            const material = await land.post($giper_baza_link.hole, $giper_baza_link.hole, null, new Uint8Array([1, 2, 3]));
            $mol_assert_equal((await land.sand_encode(material)).data().length, 16);
            $mol_assert_equal(await land.sand_decode(material), new Uint8Array([1, 2, 3]));
            $mol_assert_equal((await land.sand_ordered({ head: $giper_baza_link.hole, peer: $giper_baza_link.hole })).length, 1);
            const tombstone = await land.post($giper_baza_link.hole, $giper_baza_link.hole, material.self(), null);
            $mol_assert_equal((await land.sand_encode(tombstone)).data().length, 1);
            $mol_assert_equal(await land.sand_decode(tombstone), null);
            $mol_assert_equal((await land.sand_ordered({ head: $giper_baza_link.hole, peer: $giper_baza_link.hole })).length, 1);
        },
        'Land fork & merge': $mol_wire_async(($) => {
            const home = $.$giper_baza_glob.home().land();
            const left = home.fork();
            home.Data($giper_baza_list).items_vary(['foo', 'xxx']);
            $mol_assert_equal(home.Data($giper_baza_list).items_vary(), ['foo', 'xxx']);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), ['foo', 'xxx']);
            left.faces.sync(home.faces);
            left.Data($giper_baza_list).items_vary(['foo', 'yyy']);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), ['foo', 'yyy']);
            const right = home.fork();
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary(['foo', 'zzz']);
            $mol_assert_equal(right.Data($giper_baza_list).items_vary(), ['foo', 'zzz']);
            const both = home.fork();
            $mol_assert_equal(both.Data($giper_baza_list).items_vary(), ['foo', 'xxx']);
            both.Tine().items_vary([right.link()]);
            $mol_assert_equal(both.Data($giper_baza_list).items_vary(), ['foo', 'zzz']);
            both.Tine().items_vary([left.link()]);
            $mol_assert_equal(both.Data($giper_baza_list).items_vary(), ['foo', 'yyy']);
            both.Tine().items_vary([right.link(), left.link()]);
            $mol_assert_equal(both.Data($giper_baza_list).items_vary(), ['foo', 'yyy']);
            both.Tine().items_vary([left.link(), right.link()]);
            $mol_assert_equal(both.Data($giper_baza_list).items_vary(), ['foo', 'zzz']);
        }),
        'Inner Links are relative to forked Land': $mol_wire_async(($) => {
            const Alice = $.$giper_baza_glob.home().land();
            const Bella = Alice.fork();
            const alice_val = Alice.Pawn($giper_baza_atom_text).Head(new $giper_baza_link('qwertyui'));
            const bella_val = Bella.Pawn($giper_baza_atom_text).Head(new $giper_baza_link('qwertyui'));
            alice_val.val('Alice');
            bella_val.val('Bella');
            const alice_link = Alice.Pawn($giper_baza_atom_link).Head(new $giper_baza_link('asdfghjk'));
            const bella_link = Bella.Pawn($giper_baza_atom_link).Head(new $giper_baza_link('asdfghjk'));
            alice_link.val(alice_val.link());
            $mol_assert_equal(alice_link.val(), alice_val.link());
            $mol_assert_unique(alice_link.val(), bella_link.val());
            $mol_assert_equal(bella_link.val(), bella_val.link());
        }),
        async 'Land Area inherits rights'($) {
            const area = await $mol_wire_async(() => {
                const base = $.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('just')]]);
                base.units_saving();
                return base.area_make();
            })();
            $mol_assert_equal(area.pass_rank(area.auth().pass()), $giper_baza_rank_rule);
            $mol_assert_equal(area.lord_rank($giper_baza_link.hole), $giper_baza_rank_post('just'));
        },
        // async 'Merge text changes'() {
        // 	const base = new $giper_baza_land( 1n, 1 )
        // 	base.chief.as( $hyoo_crowd_text ).str( 'Hello World and fun!' )
        // 	const left = base.fork( await $hyoo_crowd_peer.generate() )
        // 	const right = base.fork( await $hyoo_crowd_peer.generate() )
        // 	right.clock_data.tick( right.peer().id )
        // 	left.chief.as( $hyoo_crowd_text ).str( 'Hello Alice and fun!' )
        // 	right.chief.as( $hyoo_crowd_text ).str( 'Bye World and fun!' )
        // 	const left_delta = left.delta()
        // 	const right_delta = right.delta()
        // 	left.apply( right_delta )
        // 	right.apply( left_delta )
        // 	$mol_assert_equal(
        // 		left.chief.as( $hyoo_crowd_text ).str(),
        // 		right.chief.as( $hyoo_crowd_text ).str(),
        // 		'Bye Alice and fun!',
        // 	)
        // },
        // async 'Write into token'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'foobar' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'xyz', 3 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'fooxyzbar' ] )
        // },
        // async 'Write into token with split'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'foobar' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'XYZ', 2, 4 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'fo', 'XYZar' ] )
        // },
        // async 'Write over few tokens'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'xxx foo bar yyy' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'X Y Z', 6, 9 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxx', ' fo', 'X', ' Y', ' Zar', ' yyy' ] )
        // },
        // async 'Write whole token'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'xxxFoo yyy' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'bar', 3, 7 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxxbaryyy' ] )
        // },
        // async 'Write whole text'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'foo bar' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'xxx', 0, 7 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxx' ] )
        // },
        // async 'Write at the end'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'foo' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'bar' )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'foobar' ] )
        // },
        // async 'Write between tokens'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'foo bar' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'xxx', 4 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'foo', ' xxxbar' ] )
        // },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Watch one value'($) {
            class App extends $mol_object2 {
                static $ = $;
                static set = new $mol_wire_set();
                static lucky() {
                    return this.set.has(777);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "lucky", null);
            $mol_assert_equal(App.lucky(), false);
            App.set.add(666);
            $mol_assert_equal(App.lucky(), false);
            App.set.add(777);
            $mol_assert_equal(App.lucky(), true);
            App.set.delete(777);
            $mol_assert_equal(App.lucky(), false);
        },
        'Watch item channel'($) {
            class App extends $mol_object2 {
                static $ = $;
                static set = new $mol_wire_set();
                static lucky() {
                    return this.set.item(777);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "lucky", null);
            $mol_assert_equal(App.lucky(), false);
            App.set.item(666, true);
            $mol_assert_equal(App.lucky(), false);
            App.set.item(777, true);
            $mol_assert_equal(App.lucky(), true);
            App.set.item(777, false);
            $mol_assert_equal(App.lucky(), false);
        },
        'Watch size'($) {
            class App extends $mol_object2 {
                static $ = $;
                static set = new $mol_wire_set();
                static size() {
                    return this.set.size;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "size", null);
            $mol_assert_equal(App.size(), 0);
            App.set.add(666);
            $mol_assert_equal(App.size(), 1);
            App.set.add(777);
            $mol_assert_equal(App.size(), 2);
            App.set.delete(777);
            $mol_assert_equal(App.size(), 1);
        },
        'Watch for-of'($) {
            class App extends $mol_object2 {
                static $ = $;
                static set = new $mol_wire_set();
                static sum() {
                    let res = 0;
                    for (const val of this.set) {
                        res += val;
                    }
                    return res;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "sum", null);
            $mol_assert_equal(App.sum(), 0);
            App.set.add(111);
            $mol_assert_equal(App.sum(), 111);
            App.set.add(222);
            $mol_assert_equal(App.sum(), 333);
            App.set.delete(111);
            $mol_assert_equal(App.sum(), 222);
        },
        'Watch forEach'($) {
            class App extends $mol_object2 {
                static $ = $;
                static set = new $mol_wire_set();
                static sum() {
                    let res = 0;
                    this.set.forEach(val => res += val);
                    return res;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "sum", null);
            $mol_assert_equal(App.sum(), 0);
            App.set.add(111);
            $mol_assert_equal(App.sum(), 111);
            App.set.add(222);
            $mol_assert_equal(App.sum(), 333);
            App.set.delete(111);
            $mol_assert_equal(App.sum(), 222);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $giper_baza_yard_mock extends $.$giper_baza_yard {
            master() {
                return null;
            }
        }
        $.$giper_baza_yard = $giper_baza_yard_mock;
    });
    $giper_baza_yard.masters_override = () => ['http://localhost:9090/'];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'gift unit type'() {
            const gift = $giper_baza_unit_gift.make();
            gift.rank($giper_baza_rank_rule);
            $mol_assert_equal(gift.kind(), 'gift');
            $mol_assert_equal(gift.rank(), $giper_baza_rank_rule);
        },
        'data unit type'() {
            const unit = $giper_baza_unit_sand.make(2);
            unit.ball(new Uint8Array([0xFF, 0xFF]));
            $mol_assert_equal(unit.kind(), 'sand');
            $mol_assert_equal(unit.size(), 2);
            $mol_assert_equal(unit.ball(), new Uint8Array([0xFF, 0xFF]));
        },
        'big data unit type'() {
            const unit = $giper_baza_unit_sand.make(1000);
            unit.ball(new Uint8Array(1000));
            $mol_assert_equal(unit.kind(), 'sand');
            $mol_assert_equal(unit.size(), 1000);
            $mol_assert_equal(unit.ball(), new Uint8Array(1000));
        },
        'gift unit fields'() {
            const unit = $giper_baza_unit_gift.make();
            $mol_assert_equal(unit.time(), 0);
            $mol_assert_equal(unit.mate(), $giper_baza_link.hole);
            unit.time_tick(0xd1d2d3d4d5d6);
            unit.mate(new $giper_baza_link('ÆPv6æfj3_9vX08ÆLx'));
            $mol_assert_equal(unit.time_tick(), 0xd1d2d3d4d5d6);
            $mol_assert_equal(unit.mate(), new $giper_baza_link('ÆPv6æfj3_9vX08ÆLx'));
        },
        'data unit fields'() {
            const unit = $giper_baza_unit_sand.make(0);
            $mol_assert_equal(unit.time(), 0);
            $mol_assert_equal(unit.head(), $giper_baza_link.hole);
            $mol_assert_equal(unit.self(), $giper_baza_link.hole);
            $mol_assert_equal(unit.lead(), $giper_baza_link.hole);
            unit.time_tick(0xd1d2d3d4d5d6);
            unit.head(new $giper_baza_link('ÆPv6æfj3'));
            unit.self(new $giper_baza_link('Pv6æfj39'));
            unit.lead(new $giper_baza_link('v6æfj39v'));
            $mol_assert_equal(unit.time_tick(), 0xd1d2d3d4d5d6);
            $mol_assert_equal(unit.head(), new $giper_baza_link('ÆPv6æfj3'));
            $mol_assert_equal(unit.self(), new $giper_baza_link('Pv6æfj39'));
            $mol_assert_equal(unit.lead(), new $giper_baza_link('v6æfj39v'));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'put, get, drop, count records and clear store'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('letters'));
            const trans = db.change('letters');
            try {
                const { letters } = trans.stores;
                $mol_assert_like(await letters.get(1), undefined);
                $mol_assert_like(await letters.get(2), undefined);
                $mol_assert_like(await letters.count(), 0);
                await letters.put('a');
                await letters.put('b', 1);
                await letters.put('c', 2);
                $mol_assert_like(await letters.get(1), 'b');
                $mol_assert_like(await letters.get(2), 'c');
                $mol_assert_like(await letters.count(), 2);
                await letters.drop(1);
                $mol_assert_like(await letters.get(1), undefined);
                $mol_assert_like(await letters.count(), 1);
                await letters.clear();
                $mol_assert_like(await letters.count(), 0);
            }
            finally {
                trans.abort();
                db.kill();
            }
        },
        async 'select by query'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('letters'));
            const trans = db.change('letters');
            try {
                const { letters } = trans.stores;
                await letters.put('a');
                await letters.put('b');
                await letters.put('c');
                await letters.put('d');
                $mol_assert_like(await letters.select(), ['a', 'b', 'c', 'd']);
                $mol_assert_like(await letters.select(null, 2), ['a', 'b']);
                $mol_assert_like(await letters.select($mol_dom_context.IDBKeyRange.bound(2, 3)), ['b', 'c']);
            }
            finally {
                trans.abort();
                db.kill();
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'take and drop db'() {
            const db = await $$.$mol_db('$mol_db_test');
            await db.kill();
        },
        async 'make and drop store in separate migrations'() {
            try {
                const db1 = await $$.$mol_db('$mol_db_test', mig => mig.store_make('temp'));
                db1.destructor();
                $mol_assert_like(db1.stores, ['temp']);
                $mol_assert_like(db1.version, 2);
                const db2 = await $$.$mol_db('$mol_db_test', mig => mig.store_make('temp'), mig => mig.store_drop('temp'));
                db2.destructor();
                $mol_assert_like(db2.stores, []);
                $mol_assert_like(db2.version, 3);
            }
            finally {
                const db0 = await $$.$mol_db('$mol_db_test');
                await db0.kill();
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'unique index'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('users'), mig => mig.stores.users.index_make('names', ['name'], true));
            const trans = db.change('users');
            try {
                const { users } = trans.stores;
                await users.put({ name: 'Jin' }, 'jin');
                await users.put({ name: 'John' }, 'john');
                await users.put({ name: 'Bin' }, 'bin');
                const { names } = users.indexes;
                $mol_assert_like(await names.get(['Jin']), { name: 'Jin' });
                $mol_assert_like(await names.get(['John']), { name: 'John' });
                $mol_assert_like(await names.count(), 3);
                $mol_assert_like(await names.select($mol_dom_context.IDBKeyRange.bound(['J'], ['J\uFFFF'])), [{ name: 'Jin' }, { name: 'John' }]);
                try {
                    await users.put({ name: 'Jin' }, 'jin2');
                    $mol_fail(new Error('Exception expected'));
                }
                catch (error) {
                    $mol_assert_unique(error.message, 'Exception expected');
                }
            }
            finally {
                trans.abort();
                await db.kill();
            }
        },
        async 'multi path index'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('users'), mig => mig.stores.users.index_make('names', ['first', 'last']));
            const trans = db.change('users');
            try {
                const { users } = trans.stores;
                await users.put({ first: 'Jin', last: 'Johnson' }, 'jin');
                await users.put({ first: 'John', last: 'Jinson' }, 'john');
                await users.put({ first: 'Bond', last: 'James' }, '007');
                const { names } = users.indexes;
                $mol_assert_like(await names.get(['Jin', 'Johnson']), { first: 'Jin', last: 'Johnson' });
                $mol_assert_like(await names.get(['John', 'Jinson']), { first: 'John', last: 'Jinson' });
                $mol_assert_like(await names.count(), 3);
                $mol_assert_like(await names.select($mol_dom_context.IDBKeyRange.bound(['Jin', 'Johnson'], ['John', 'Jinson'])), [{ first: 'Jin', last: 'Johnson' }, { first: 'John', last: 'Jinson' }]);
            }
            finally {
                trans.abort();
                await db.kill();
            }
        },
        async 'multiple indexes'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('users'), mig => mig.stores.users.index_make('names', ['name'], true), mig => mig.stores.users.index_make('ages', ['age']));
            const trans = db.change('users');
            try {
                const { users } = trans.stores;
                await users.put({ name: 'Jin', age: 18 }, 'jin');
                await users.put({ name: 'John', age: 18 }, 'john');
                const { names, ages } = users.indexes;
                $mol_assert_like(await names.select(['Jin']), [{ name: 'Jin', age: 18 }]);
                $mol_assert_like(await names.select(['John']), [{ name: 'John', age: 18 }]);
                $mol_assert_like(await names.count(), 2);
                $mol_assert_like(await ages.select([18]), [{ name: 'Jin', age: 18 }, { name: 'John', age: 18 }]);
                $mol_assert_like(await ages.count(), 2);
            }
            finally {
                trans.abort();
                await db.kill();
            }
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $giper_baza_mine_mock extends $.$giper_baza_mine_temp {
        }
        $.$giper_baza_mine = $giper_baza_mine_mock;
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
var $;
(function ($) {
    $mol_test({
        'same list'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "old" }, "c"));
            $mol_reconcile({
                prev: [...list.children],
                from: 0,
                to: 3,
                next: 'abc',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "old" }, "c"))).outerHTML);
        },
        'insert items'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "old" }, "c"),
                $mol_jsx("p", { "data-rev": "old" }, "d"));
            $mol_reconcile({
                prev: [...list.children],
                from: 1,
                to: 3,
                next: 'bXYc',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "new" }, "X"),
                $mol_jsx("p", { "data-rev": "new" }, "Y"),
                $mol_jsx("p", { "data-rev": "old" }, "c"),
                $mol_jsx("p", { "data-rev": "old" }, "d"))).outerHTML);
        },
        'append items'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"));
            $mol_reconcile({
                prev: [...list.children],
                from: 2,
                to: 3,
                next: 'bc',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "new" }, "b"),
                $mol_jsx("p", { "data-rev": "new" }, "c"))).outerHTML);
        },
        'split item'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "bc"),
                $mol_jsx("p", { "data-rev": "old" }, "d"));
            $mol_reconcile({
                prev: [...list.children],
                from: 0,
                to: 3,
                next: 'abcd',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "new" }, "b"),
                $mol_jsx("p", { "data-rev": "up" }, "c"),
                $mol_jsx("p", { "data-rev": "old" }, "d"))).outerHTML);
        },
        'drop items'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "A"),
                $mol_jsx("p", { "data-rev": "old" }, "B"),
                $mol_jsx("p", { "data-rev": "old" }, "x"),
                $mol_jsx("p", { "data-rev": "old" }, "y"),
                $mol_jsx("p", { "data-rev": "old" }, "C"),
                $mol_jsx("p", { "data-rev": "old" }, "D"));
            $mol_reconcile({
                prev: [...list.children],
                from: 1,
                to: 5,
                next: 'BC',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "A"),
                $mol_jsx("p", { "data-rev": "old" }, "B"),
                $mol_jsx("p", { "data-rev": "old" }, "C"),
                $mol_jsx("p", { "data-rev": "old" }, "D"))).outerHTML);
        },
        'update items'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "B"),
                $mol_jsx("p", { "data-rev": "old" }, "C"),
                $mol_jsx("p", { "data-rev": "old" }, "d"));
            $mol_reconcile({
                prev: [...list.children],
                from: 1,
                to: 3,
                next: 'XY',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "up" }, "X"),
                $mol_jsx("p", { "data-rev": "up" }, "Y"),
                $mol_jsx("p", { "data-rev": "old" }, "d"))).outerHTML);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Boolean schema"($) {
                $mol_assert_equal('$mol_schema_boolean', $mol_schema_boolean + '', $mol_key($mol_schema_boolean));
                $mol_assert_equal(true, $mol_schema_boolean.check(false));
                $mol_assert_equal(true, $mol_schema_boolean.check(true));
                $mol_assert_equal(false, $mol_schema_boolean.check('true'));
                $mol_assert_equal(false, $mol_schema_boolean.check(0));
                $mol_assert_equal(false, $mol_schema_boolean.cast(false));
                $mol_assert_equal(false, $mol_schema_boolean.cast('true'));
                $mol_assert_equal(false, $mol_schema_boolean.guard(false));
                $mol_assert_fail(() => $mol_schema_boolean.guard(null), 'Wrong type');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Integer schema"($) {
                $mol_assert_equal('$mol_schema_integer', $mol_schema_integer + '', $mol_key($mol_schema_integer));
                $mol_assert_equal(true, $mol_schema_integer.check(Number.MAX_SAFE_INTEGER));
                $mol_assert_equal(true, $mol_schema_integer.check(Number.MIN_SAFE_INTEGER));
                $mol_assert_equal(true, $mol_schema_integer.check(0));
                $mol_assert_equal(false, $mol_schema_integer.check(Number.EPSILON));
                $mol_assert_equal(false, $mol_schema_integer.check(Number.POSITIVE_INFINITY));
                $mol_assert_equal(false, $mol_schema_integer.check(Number.NEGATIVE_INFINITY));
                $mol_assert_equal(Number.MAX_SAFE_INTEGER, $mol_schema_integer.cast(Number.MAX_SAFE_INTEGER));
                $mol_assert_equal(0, $mol_schema_integer.cast(Number.EPSILON));
                $mol_assert_equal(0, $mol_schema_integer.cast(1.5));
                $mol_assert_equal(0, $mol_schema_integer.guard(0));
                $mol_assert_fail(() => $mol_schema_integer.guard(''), 'Wrong type');
                $mol_assert_fail(() => $mol_schema_integer.guard(Number.NaN), 'Non finite');
                $mol_assert_fail(() => $mol_schema_integer.guard(1.5), 'Non integer');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "BigInt schema"($) {
                $mol_assert_equal('$mol_schema_bigint', $mol_schema_bigint + '', $mol_key($mol_schema_bigint));
                $mol_assert_equal(true, $mol_schema_bigint.check(0n));
                $mol_assert_equal(false, $mol_schema_bigint.check(0));
                $mol_assert_equal(1n, $mol_schema_bigint.cast(1n));
                $mol_assert_equal(1n, $mol_schema_bigint.cast(1));
                $mol_assert_equal(0n, $mol_schema_bigint.guard(0n));
                $mol_assert_fail(() => $mol_schema_bigint.guard(1), 'Wrong type');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_pattern = $mol_memo_key.func(function $mol_schema_pattern(Pattern) {
        return class $mol_schema_pattern_ extends $mol_schema_string {
            static Pattern = Pattern;
            static toString() {
                if (this !== $mol_schema_pattern_)
                    return super.toString();
                return '$mol_schema_pattern<' + $mol_key(Pattern) + '>';
            }
            static guard(value) {
                if (Pattern.test(super.guard(value)))
                    return value;
                return $mol_fail(new TypeError('Wrong string', { cause: { value, schema: this } }));
            }
            static cast(value) {
                return super.cast(value);
            }
            static default = '';
        };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Cache of pattern schema"($) {
                $mol_assert_equal($mol_schema_pattern(/foo/), $mol_schema_pattern(/foo/));
                $mol_assert_unique($mol_schema_pattern(/foo/), $mol_schema_pattern(/bar/));
            },
            "String pattern schema"($) {
                const Email = $mol_schema_pattern(/^.*@.*$/);
                $mol_assert_equal('$mol_schema_pattern</^.*@.*$/>', Email + '', $mol_key(Email));
                $mol_assert_equal(true, Email.check('foo@bar'));
                $mol_assert_equal(false, Email.check('foo'));
                $mol_assert_equal(false, Email.check(123));
                $mol_assert_equal('foo@bar', Email.cast('foo@bar'));
                $mol_assert_equal('', Email.cast('foo'));
                $mol_assert_equal('', Email.cast(123));
                $mol_assert_equal('foo@bar', Email.guard('foo@bar'));
                $mol_assert_fail(() => Email.guard('foo'), 'Wrong string');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        "Cache of dict schema"($) {
            $mol_assert_equal($mol_schema_dict([$mol_schema_string, $mol_schema_float]), $mol_schema_dict([$mol_schema_string, $mol_schema_float]));
            $mol_assert_unique($mol_schema_dict([$mol_schema_string, $mol_schema_float]), $mol_schema_dict([$mol_schema_string, $mol_schema_string]));
        },
        "Dictionary schema"($) {
            const Flags = $mol_schema_dict([$mol_schema_pattern(/^[a-z]+$/), $mol_schema_boolean]);
            $mol_assert_equal(true, Flags.check({}));
            $mol_assert_equal(true, Flags.check({ foo: false }));
            $mol_assert_equal(false, Flags.check({ f00: false }));
            $mol_assert_equal(false, Flags.check([]));
            $mol_assert_equal(false, Flags.check({ foo: 0 }));
            $mol_assert_equal({ foo: false }, Flags.cast({ foo: false, f00: true }));
            $mol_assert_equal({ foo: false }, Flags.cast({ foo: 123 }));
            $mol_assert_equal({}, Flags.guard({}));
            $mol_assert_equal({ foo: false }, Flags.guard({ foo: false }));
            $mol_assert_fail(() => Flags.guard({ foo: 123 }), 'Wrong val');
            $mol_assert_fail(() => Flags.guard({ f00: 123 }), 'Wrong key');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Cache of list schema"($) {
                $mol_assert_equal($mol_schema_list($mol_schema_float), $mol_schema_list($mol_schema_float));
                $mol_assert_unique($mol_schema_list($mol_schema_float), $mol_schema_list($mol_schema_string));
            },
            "Array schema"($) {
                const Vector = $mol_schema_list($mol_schema_float);
                $mol_assert_equal('$mol_schema_list<$mol_schema_float>', Vector + '');
                $mol_assert_equal(true, Vector.check([]));
                $mol_assert_equal(true, Vector.check([123]));
                $mol_assert_equal(false, Vector.check(['foo']));
                $mol_assert_equal([123], Vector.cast([123]));
                $mol_assert_equal([123, Number.NaN], Vector.cast([123, 'foo']));
                $mol_assert_equal([], Vector.guard([]));
                $mol_assert_equal([123], Vector.guard([123]));
                $mol_assert_fail(() => Vector.guard(0), 'Non array');
                $mol_assert_fail(() => Vector.guard([false]), 'Wrong item');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_enum = $mol_memo_key.func(function $mol_schema_enum(Options) {
        return class $mol_schema_enum_ extends $mol_schema_any {
            static Options = Options;
            static toString() {
                if (this !== $mol_schema_enum_)
                    return super.toString();
                return '$mol_schema_enum<' + $mol_key(Options) + '>';
            }
            static guard(value) {
                if (Options.some(Option => Object.is(Option, value)))
                    return value;
                return $mol_fail(new TypeError('Wrong option', { cause: { value, schema: this } }));
            }
            static cast(value) {
                if (this.check(value))
                    return value;
                return Options[0];
            }
            static default = Options[0];
        };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Cache of enum schema"($) {
                $mol_assert_equal($mol_schema_enum(['foo']), $mol_schema_enum(['foo']));
                $mol_assert_unique($mol_schema_enum(['foo']), $mol_schema_enum(['bar']));
            },
            "Enum options"($) {
                const Config = $mol_schema_enum([123, 'foo']);
                $mol_assert_equal('$mol_schema_enum<[123,"foo"]>', Config + '', $mol_key(Config));
                $mol_assert_equal(true, Config.check(123));
                $mol_assert_equal(true, Config.check('foo'));
                $mol_assert_equal(false, Config.check(true));
                $mol_assert_equal(false, Config.check(321));
                $mol_assert_equal(false, Config.check('bar'));
                $mol_assert_equal(Config.cast(123), 123);
                $mol_assert_equal(Config.cast('foo'), 'foo');
                $mol_assert_equal(Config.cast('bar'), 123);
                $mol_assert_equal(123, Config.guard(123));
                $mol_assert_fail(() => Config.guard(321), 'Wrong option');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Empty representation"($) {
                const land = $giper_baza_land.make({ $ });
                const reg = land.Pawn($giper_baza_atom_time).Data();
                $mol_assert_equal(reg.val(), null);
                reg.vary(null);
                $mol_assert_equal(reg.val(), null);
            },
            "Validation on set, cast on get"($) {
                const land = $.$giper_baza_glob.home().land();
                const head = new $giper_baza_link('22222222');
                const str = land.Pawn($giper_baza_atom.of($mol_schema_maybe($mol_schema_string))).Head(head);
                const mail = land.Pawn($giper_baza_atom.of($mol_schema_pattern(/.+@.+/))).Head(head);
                $mol_assert_equal(str.val(), null);
                $mol_assert_equal(mail.val(), null);
                $mol_assert_fail(() => str.val(123), 'Wrong type');
                $mol_assert_fail(() => mail.val('foo'), 'Wrong string');
                $mol_assert_equal(str.val(), null);
                $mol_assert_equal(mail.val(), null);
                str.val('foo');
                $mol_assert_equal(str.val(), 'foo');
                $mol_assert_equal(mail.val(), null);
                mail.val('foo@bar');
                $mol_assert_equal(str.val(), 'foo@bar');
                $mol_assert_equal(mail.val(), 'foo@bar');
            },
            "Hyper link to another land"($) {
                const land = $.$giper_baza_glob.home().land();
                const reg = land.Pawn($giper_baza_atom_link.to(() => $giper_baza_atom)).Head(new $giper_baza_link('11111111'));
                const remote = reg.ensure(land);
                $mol_assert_unique(reg.land(), remote.land());
                $mol_assert_equal(reg.vary(), remote.link());
                $mol_assert_equal(reg.remote(), remote);
            },
            "Register with linked Pawns"($) {
                const land = $.$giper_baza_glob.home().land();
                const str = land.Pawn($giper_baza_atom_text).Head(new $giper_baza_link('11111111'));
                const link = land.Pawn($giper_baza_atom_link.to(() => $giper_baza_atom_text)).Head(new $giper_baza_link('11111111'));
                $mol_assert_equal(link.remote(), null);
                link.remote(str);
                $mol_assert_equal(link.vary(), link.remote().link(), str.link());
            },
            "Enumerated reg type"($) {
                class FileType extends $giper_baza_atom.of($mol_schema_maybe($mol_schema_enum(['file', 'dir', 'link']))) {
                }
                const land = $.$giper_baza_glob.home().land();
                const type = land.Data(FileType);
                $mol_assert_equal(type.val(), null);
                type.val('file');
                $mol_assert_equal(type.val(), 'file');
                $mol_assert_fail(() => type.val('drive'), 'Wrong option');
                $mol_assert_equal(type.val(), 'file');
                type.vary('drive');
                $mol_assert_equal(type.val(), null);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function clone(base) {
        const land = $mol_wire_sync(base.$.$giper_baza_land).make({ $: base.$ });
        land.units_steal(base);
        return land;
    }
    function sync(left, right) {
        left.units_steal(right);
        right.units_steal(left);
    }
    $mol_test({
        'Basic list ops'($) {
            const land = $.$giper_baza_land.make({ $ });
            const list = land.Pawn($giper_baza_list).Data();
            $mol_assert_equal(list.items_vary(), []);
            list.items_vary([2, 3]);
            $mol_assert_equal(list.items_vary(), [2, 3]);
            $mol_assert_equal(list.has(1), false);
            list.add(1);
            $mol_assert_equal(list.items_vary(), [1, 2, 3]);
            $mol_assert_equal(list.has(1), true);
            list.add(3);
            $mol_assert_equal(list.items_vary(), [1, 2, 3]);
            list.splice([2]);
            $mol_assert_equal(list.items_vary(), [1, 2, 3, 2]);
            list.splice([2], 0);
            $mol_assert_equal(list.items_vary(), [2, 1, 2, 3, 2]);
            list.wipe(2);
            $mol_assert_equal(list.items_vary(), [2, 1, 3, 2]);
            list.move(2, 1);
            $mol_assert_equal(list.items_vary(), [2, 3, 1, 2]);
            list.move(1, 3);
            $mol_assert_equal(list.items_vary(), [2, 1, 3, 2]);
            list.cut(2);
            $mol_assert_equal(list.items_vary(), [1, 3]);
            $mol_assert_equal(list.has(2), false);
            list.cut(2);
            $mol_assert_equal(list.items_vary(), [1, 3]);
        },
        'Different types'($) {
            const land = $.$giper_baza_land.make({ $ });
            const list = land.Pawn($.$giper_baza_list).Data();
            list.items_vary([
                null,
                false,
                true,
                0n,
                4611686018427387904n,
                0,
                Math.PI,
                Number.NaN,
                Number.NEGATIVE_INFINITY,
                '',
                '1234567890123456789012345678901234567890',
                new Uint8Array([]),
                new Uint8Array([1, 2, 3]),
                new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
                list.link(),
            ]);
            $mol_assert_equal(list.items_vary(), [
                false,
                true,
                0,
                4611686018427387904n,
                0,
                Math.PI,
                Number.NaN,
                Number.NEGATIVE_INFINITY,
                '',
                '1234567890123456789012345678901234567890',
                new Uint8Array([]),
                new Uint8Array([1, 2, 3]),
                new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
                list.link(),
            ]);
        },
        async 'List merge'($) {
            const land1 = $.$giper_baza_land.make({ $ });
            const land2 = $.$giper_baza_land.make({ $ });
            const list1 = land1.Pawn($giper_baza_list).Data();
            const list2 = land2.Pawn($giper_baza_list).Data();
            list1.items_vary(['foo', 'xxx']);
            land2.tick();
            list2.items_vary(['foo', 'yyy']);
            await $mol_wire_async(land1).units_steal(land2);
            $mol_assert_equal(list1.items_vary(), ['foo', 'yyy', 'foo', 'xxx']);
        },
        'Insert before removed before changed'($) {
            const land = $.$giper_baza_land.make({ $ });
            const list = land.Pawn($giper_baza_list).Data();
            list.items_vary(['foo', 'bar']);
            list.items_vary(['xxx', 'foo', 'bar']);
            list.items_vary(['xxx', 'bars']);
            $mol_assert_equal(list.items_vary(), ['xxx', 'bars']);
        },
        'Many moves'($) {
            const land = $.$giper_baza_land.make({ $ });
            const list = land.Pawn($giper_baza_list).Data();
            list.items_vary(['foo', 'bar', 'lol']);
            list.move(2, 1);
            list.move(2, 1);
            list.move(0, 3);
            list.move(2, 1);
            $mol_assert_equal(list.items_vary(), ['bar', 'foo', 'lol']);
        },
        'Reorder separated sublists'($) {
            const land = $.$giper_baza_land.make({ $ });
            const list = land.Pawn($giper_baza_list).Data();
            list.items_vary([1, 2, 3, 4, 5, 6]);
            list.move(3, 5);
            list.move(3, 5);
            list.move(5, 4);
            list.move(0, 2);
            list.move(0, 2);
            list.move(2, 1);
            $mol_assert_equal(list.items_vary(), [1, 3, 2, 4, 6, 5]);
        },
        'Insert after moved right': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 7, 2, 3, 4]);
            const right = clone(base);
            right.Data($giper_baza_list).move(0, 2);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [2, 1, 7, 3, 4]);
        }),
        'Insert before moved left': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).move(1, 0);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 7, 2, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [2, 1, 7, 3, 4]);
        }),
        'Move left after inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 7, 2, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).move(1, 0);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [2, 1, 3, 7, 4]);
        }),
        'Insert before moved right': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).move(1, 4);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 7, 2, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 7, 3, 4, 2]);
        }),
        'Move right after inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 7, 2, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).move(1, 4);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 3, 7, 4, 2]);
        }),
        'Insert after wiped': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 7, 3, 4]);
        }),
        'Wiped before inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 7, 3, 4]);
        }),
        'Insert before wiped': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).wipe(2);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 2, 7, 4]);
        }),
        'Wiped after inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).wipe(2);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 2, 7, 4]);
        }),
        'Insert after moved out': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.sand_move(left.Data($giper_baza_list).units()[1], new $giper_baza_link('11111111'), 0);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 7, 3, 4]);
            $mol_assert_equal(left.Pawn($giper_baza_list).Head(new $giper_baza_link('11111111')).items_vary(), right.Pawn($giper_baza_list).Head(new $giper_baza_link('11111111')).items_vary(), [2]);
        }),
        'Move out before inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.sand_move(right.Data($giper_baza_list).units()[1], new $giper_baza_link('11111111'), 0);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 7, 3, 4]);
            $mol_assert_equal(left.Pawn($giper_baza_list).Head(new $giper_baza_link('11111111')).items_vary(), right.Pawn($giper_baza_list).Head(new $giper_baza_link('11111111')).items_vary(), [2]);
        }),
        'Insert before changed': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 7, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 13, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 2, 13, 7, 4]);
        }),
        'Change after inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 13, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 7, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 2, 7, 13, 4]);
        }),
        'Insert between moved': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4, 5, 6]);
            const left = clone(base);
            left.Data($giper_baza_list).move(1, 5);
            left.Data($giper_baza_list).move(1, 5);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4, 5, 6]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 4, 5, 2, 7, 3, 6]);
        }),
        'Move near inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4, 5, 6]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4, 5, 6]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).move(1, 5);
            right.Data($giper_baza_list).move(1, 5);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 4, 5, 2, 3, 7, 6]);
        }),
        async '3 transactions in same second must keep ordering'($) {
            const auth_left = $.$giper_baza_auth.grab();
            const auth_right = $.$giper_baza_auth.grab();
            const land_left = $.$giper_baza_land.make({ $, auth: () => auth_left });
            land_left.give(auth_right.pass(), $giper_baza_rank_post('just'));
            const land_right = $.$giper_baza_land.make({ $, auth: () => auth_right, link: () => land_left.link() });
            const list_left = land_left.Data($giper_baza_list);
            const list_right = land_right.Data($giper_baza_list);
            list_left.items_vary(['a', 'b', 'c', 'd']);
            $mol_assert_equal(list_left.items_vary(), ['a', 'b', 'c', 'd']);
            await $mol_wire_async(land_right).units_steal(land_left);
            $mol_assert_equal(list_right.items_vary(), ['a', 'b', 'c', 'd']);
            list_right.splice(['x'], 0, 0);
            $mol_assert_equal(list_right.items_vary(), ['x', 'a', 'b', 'c', 'd']);
            await $mol_wire_async(land_left).units_steal(land_right);
            $mol_assert_equal(list_left.items_vary(), ['x', 'a', 'b', 'c', 'd']);
            list_left.items_vary(['d', 'x', 'a', 'b', 'c']);
            $mol_assert_equal(list_left.items_vary(), ['d', 'x', 'a', 'b', 'c']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            async 'Dictionary invariants'($) {
                const land = $giper_baza_land.make({ $ });
                const dict = land.Pawn($giper_baza_dict).Data();
                $mol_assert_equal(dict.keys(), []);
                dict.dive(123, $giper_baza_atom, null);
                dict.dive('xxx', $giper_baza_atom, null);
                $mol_assert_equal(dict.keys(), ['xxx', 123]);
                $mol_assert_equal(dict.has(123), true);
                $mol_assert_equal(dict.has('xxx'), true);
                $mol_assert_equal(dict.has('yyy'), false);
                $mol_assert_equal(dict.dive(123, $giper_baza_atom).vary(), null);
                $mol_assert_equal(dict.dive('xxx', $giper_baza_atom).vary(), null);
                dict.dive(123, $giper_baza_atom).vary(777);
                $mol_assert_equal(dict.dive(123, $giper_baza_atom).vary(), 777);
                dict.dive('xxx', $giper_baza_list).items_vary(['foo', 'bar']);
                $mol_assert_equal(dict.dive('xxx', $giper_baza_list).items_vary(), ['foo', 'bar']);
                dict.has(123, false);
                $mol_assert_equal(dict.keys(), ['xxx']);
            },
            async 'Dictionary merge'($) {
                const land1 = $giper_baza_land.make({ $ });
                const land2 = $giper_baza_land.make({ $ });
                const dict1 = land1.Pawn($giper_baza_dict).Data();
                const dict2 = land2.Pawn($giper_baza_dict).Data();
                dict1.dive(123, $giper_baza_atom, null).vary(666);
                land2.tick();
                dict2.dive(123, $giper_baza_atom, null).vary(777);
                await $mol_wire_async(land1).units_steal(land2);
                $mol_assert_equal(dict1.dive(123, $giper_baza_atom).vary(), 777);
                dict1.dive('xxx', $giper_baza_list, null).items_vary(['foo']);
                land2.tick();
                dict2.dive('xxx', $giper_baza_list, null).items_vary(['bar']);
                await $mol_wire_async(land1).units_steal(land2);
                $mol_assert_equal(dict1.dive('xxx', $giper_baza_list).items_vary(), ['bar', 'foo']);
            },
            async "Narrowed Dictionary with linked Dictionaries and others"($) {
                class User extends $giper_baza_dict.with({
                    Title: $giper_baza_atom_text,
                    Account: $giper_baza_atom_link.to(() => Account),
                    Articles: $giper_baza_list_link.to(() => Article),
                }) {
                }
                class Account extends $giper_baza_dict.with({
                    Title: $giper_baza_atom_text,
                    User: $giper_baza_atom_link.to(() => User),
                }) {
                }
                class Article extends $giper_baza_dict.with({
                    Title: $giper_baza_dict_to($giper_baza_atom_text),
                    Author: $giper_baza_atom_link.to(() => User),
                }) {
                }
                const land = $.$giper_baza_glob.home().land();
                const user = land.Pawn(User).Head(new $giper_baza_link('11111111'));
                $mol_assert_equal(user.Title()?.val() ?? null, null);
                $mol_assert_equal(user.Account()?.remote() ?? null, null);
                $mol_assert_equal(user.Articles()?.remote_list() ?? [], []);
                user.Title(null).val('Jin');
                $mol_assert_equal(user.Title().val() ?? '', 'Jin');
                const account = (await $mol_wire_async(user.Account(null)).ensure([[null, $giper_baza_rank_read]]));
                $mol_assert_equal(user.Account()?.remote() ?? null, account);
                $mol_assert_equal(account.User()?.remote() ?? null, null);
                account.User(null).remote(user);
                $mol_assert_equal(account.User()?.remote(), user);
                const articles = [
                    await $mol_wire_async(user.Articles(null)).make([[null, $giper_baza_rank_read]]),
                    await $mol_wire_async(user.Articles(null)).make([[null, $giper_baza_rank_read]]),
                ];
                $mol_assert_equal(user.Articles()?.remote_list().map(n => n[Symbol.toStringTag]), articles.map(n => n[Symbol.toStringTag]));
                articles[0].Title(null).key('en', 'auto').val('Hello!');
                $mol_assert_equal(articles[0].Title()?.key('en').val(), 'Hello!');
                $mol_assert_equal(articles[1].Title()?.key('ru')?.val() ?? null, null);
                $mol_assert_equal(articles[1].Title()?.key('ru')?.val() ?? null, null);
                $mol_assert_unique(user.land(), account.land(), ...articles.map(article => article.land()));
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $giper_baza_glob_mock extends $.$giper_baza_glob {
            static $ = $;
            static lands_touched = new $mol_wire_set();
        }
        $.$giper_baza_glob = $giper_baza_glob_mock;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        '$mol_syntax2_md_flow'() {
            const check = (input, right) => {
                const tokens = [];
                $mol_syntax2_md_flow.tokenize(input, (...token) => tokens.push(token));
                $mol_assert_equal(tokens, right);
            };
            check('Hello,\nWorld..\r\n\r\n\nof Love!', [
                ['block', 'Hello,\n', ['Hello,', '\n'], 0],
                ['block', 'World..\r\n\r\n\n', ['World..', '\r\n\r\n\n'], 7],
                ['block', 'of Love!', ['of Love!', ''], 19],
            ]);
            check('# Header1\n\nHello!\n\n## Header2', [
                ['header', '# Header1\n\n', ['#', ' ', 'Header1', '\n\n'], 0],
                ['block', 'Hello!\n\n', ['Hello!', '\n\n'], 11],
                ['header', '## Header2', ['##', ' ', 'Header2', ''], 19],
            ]);
            check('```\nstart()\n```\n\n```jam.js\nrestart()\n```\n\nHello!\n\n```\nstop()\n```', [
                ['code', '```\nstart()\n```\n\n', ['```', '', 'start()\n', '```', '\n\n'], 0],
                ['code', '```jam.js\nrestart()\n```\n\n', ['```', 'jam.js', 'restart()\n', '```', '\n\n'], 17],
                ['block', 'Hello!\n\n', ['Hello!', '\n\n'], 42],
                ['code', '```\nstop()\n```', ['```', '', 'stop()\n', '```', ''], 50],
            ]);
            check('| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n\n| Cell11 | Cell12\n| Cell21 | Cell22\n', [
                ['table', '| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n\n', ['| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n', '\n'], 0],
                ['table', '| Cell11 | Cell12\n| Cell21 | Cell22\n', ['| Cell11 | Cell12\n| Cell21 | Cell22\n', ''], 68],
            ]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'empty string'() {
            $mol_assert_equal(''.match($giper_baza_text_tokens), null);
        },
        'new lines'() {
            $mol_assert_equal('\n\r\n'.match($giper_baza_text_tokens), ['\n', '\r\n']);
        },
        'numbers'() {
            $mol_assert_equal('123'.match($giper_baza_text_tokens), ['123']);
        },
        'emoji'() {
            $mol_assert_equal('😀😁'.match($giper_baza_text_tokens), ['😀', '😁']);
        },
        'emoji with modifier'() {
            $mol_assert_equal('👩🏿👩🏿'.match($giper_baza_text_tokens), ['👩🏿', '👩🏿']);
        },
        'combo emoji with modifier'() {
            $mol_assert_equal('👩🏿‍🤝‍🧑🏿👩🏿‍🤝‍🧑🏿'.match($giper_baza_text_tokens), ['👩🏿‍🤝‍🧑🏿', '👩🏿‍🤝‍🧑🏿']);
        },
        'word with spaces'() {
            $mol_assert_equal('foo1  bar2'.match($giper_baza_text_tokens), ['foo1', ' ', ' bar2']);
        },
        'word with diactric'() {
            $mol_assert_equal('Е́е́'.match($giper_baza_text_tokens), ['Е́е́']);
        },
        'word with punctuation'() {
            $mol_assert_equal('foo--bar'.match($giper_baza_text_tokens), ['foo', '--', 'bar']);
        },
        'CamelCase'() {
            $mol_assert_equal('Foo1BAR2'.match($giper_baza_text_tokens), ['Foo1', 'BAR2']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Change sequences'($) {
            const land = $giper_baza_land.make({ $ });
            const text = land.Data($giper_baza_text);
            const list = land.Data($giper_baza_list);
            $mol_assert_equal(text.str(), '');
            $mol_assert_equal(list.items_vary(), []);
            text.str('foo');
            $mol_assert_equal(text.str(), 'foo');
            $mol_assert_equal(list.items_vary(), ['foo']);
            text.str('foo bar');
            $mol_assert_equal(text.str(), 'foo bar');
            $mol_assert_equal(list.items_vary(), ['foo', ' bar']);
            text.str('foo lol bar');
            $mol_assert_equal(text.str(), 'foo lol bar');
            $mol_assert_equal(list.items_vary(), ['foo', ' lol', ' bar']);
            text.str('lol bar');
            $mol_assert_equal(text.str(), 'lol bar');
            $mol_assert_equal(list.items_vary(), ['lol', ' bar']);
            text.str('foo bar');
            $mol_assert_equal(text.str(), 'foo bar');
            $mol_assert_equal(list.items_vary(), ['foo', ' bar']);
            text.str('foo  bar');
            $mol_assert_equal(text.str(), 'foo  bar');
            $mol_assert_equal(list.items_vary(), ['foo', ' ', ' bar']);
            text.str('foo  BarBar');
            $mol_assert_equal(text.str(), 'foo  BarBar');
            $mol_assert_equal(list.items_vary(), ['foo', ' ', ' Bar', 'Bar']);
        },
        async 'str: Offset <=> Point'($) {
            const land = $giper_baza_land.make({ $ });
            const text = land.Data($giper_baza_text);
            text.str('fooBar');
            const [first, second] = text.units();
            $mol_assert_equal(text.point_by_offset(0), [first.self().str, 0, 0]);
            $mol_assert_equal(text.offset_by_point([first.self().str, 0, 0]), [first.self().str, 0]);
            $mol_assert_equal(text.point_by_offset(3), [first.self().str, 3, 0]);
            $mol_assert_equal(text.offset_by_point([first.self().str, 3, 0]), [first.self().str, 3]);
            $mol_assert_equal(text.offset_by_point([first.self().str, 5, 0]), [first.self().str, 5]);
            $mol_assert_equal(text.point_by_offset(5), [second.self().str, 2, 0]);
            $mol_assert_equal(text.offset_by_point([second.self().str, 2, 0]), [second.self().str, 5]);
            $mol_assert_equal(text.point_by_offset(6), [second.self().str, 3, 0]);
            $mol_assert_equal(text.offset_by_point([second.self().str, 3, 0]), [second.self().str, 6]);
            $mol_assert_equal(text.point_by_offset(7), ['', 1, 0]);
            $mol_assert_equal(text.offset_by_point(['', 1, 0]), ['', 7]);
        },
        async 'text: Offset <=> Point'($) {
            const land = $giper_baza_land.make({ $ });
            const text = land.Data($giper_baza_text);
            text.text('foo bar\n666 777');
            const [first, second] = text.pawns($giper_baza_text);
            $mol_assert_equal(text.point_by_offset(0), [first.units()[0].self().str, 0, 0]);
            $mol_assert_equal(text.offset_by_point([first.units()[0].self().str, 0, 0]), [first.units()[0].self().str, 0]);
            $mol_assert_equal(text.point_by_offset(8), [first.units()[2].self().str, 1, 0]);
            $mol_assert_equal(text.offset_by_point([first.units()[2].self().str, 1, 0]), [first.units()[2].self().str, 8]);
        },
        async 'Merge different sequences'($) {
            const land1 = $giper_baza_land.make({ $ });
            const land2 = $giper_baza_land.make({ $ });
            const text1 = land1.Pawn($giper_baza_text).Data();
            const text2 = land2.Pawn($giper_baza_text).Data();
            text1.str('foo bar.');
            land2.faces.stat.time = land1.faces.stat.time;
            text2.str('xxx yyy.');
            const delta1 = await $mol_wire_async(land1).diff_units();
            const delta2 = await $mol_wire_async(land2).diff_units();
            await $mol_wire_async(land1).diff_apply(delta2);
            await $mol_wire_async(land2).diff_apply(delta1);
            $mol_assert_equal(text1.str(), text2.str(), 'xxx yyy.foo bar.');
        },
        async 'Merge same insertions with different changes to same place'($) {
            const base = $giper_baza_land.make({ $ });
            base.Data($giper_baza_text).str('( )');
            const left = $giper_baza_land.make({ $ });
            await $mol_wire_async(left).units_steal(base);
            left.Data($giper_baza_text).str('( [ f ] )');
            left.Data($giper_baza_text).str('( [ foo ] )');
            const right = $giper_baza_land.make({ $ });
            await $mol_wire_async(right).units_steal(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_text).str('( [ f ] )');
            right.Data($giper_baza_text).str('( [ fu ] )');
            const left_delta = await $mol_wire_async(left).diff_units(base.faces);
            const right_delta = await $mol_wire_async(right).diff_units(base.faces);
            await $mol_wire_async(left).diff_apply(right_delta);
            await $mol_wire_async(right).diff_apply(left_delta);
            $mol_assert_equal(left.Data($giper_baza_text).str(), right.Data($giper_baza_text).str(), '( [ fu ] [ foo ] )');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function html(dom) {
        return dom.html().replace(/ (id|xmlns)=".+?"/g, '');
    }
    $mol_test({
        'plain text'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('foo bar');
            $mol_assert_equal(html(left), '<span>foo</span><span> bar</span>');
        },
        'simple tags'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('<br /><hr />');
            $mol_assert_equal(html(left), '<br /><hr />');
        },
        'tags with attrs'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('<br hidden="" /><hr tabindex="-1" />');
            $mol_assert_equal(html(left), '<br hidden="" /><hr tabindex="-1" />');
        },
        'nested tags'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('<p><br /></p>');
            $mol_assert_equal(html(left), '<p><br /></p>');
        },
        'paragraphs'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('<p>foo bar</p><p>xxx yyy</p>');
            $mol_assert_equal(html(left), '<p><span>foo</span><span> bar</span></p><p><span>xxx</span><span> yyy</span></p>');
        },
        'import exported html'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('foo<a data-xxx="yyy" href="hhh:zzz">ton</a>bar');
            const right = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            right.html(left.html());
            $mol_assert_equal(html(left), html(right));
            $mol_assert_equal(left.html(), right.html());
        },
        'import wild spans'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('<span>foo bar<a href="hhh:ton"/></span>');
            $mol_assert_equal(html(left), '<span>foo</span><span> bar</span><a href="hhh:ton"></a>');
        },
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    $mol_test({
        'Attach to document'() {
            const doc = $mol_dom_parse('<html><body id="foo"></body></html>');
            $mol_jsx_attach(doc, () => $mol_jsx("body", { id: "foo" }, "bar"));
            $mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="foo">bar</body></html>');
        },
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Head"($) {
                const div = $mol_jsx("div", null, "foo");
                $mol_assert_equal($mol_dom_point.head(div), new $mol_dom_point(div, 0));
                $mol_assert_equal($mol_dom_point.head(div).is_head(), true);
                $mol_assert_equal(new $mol_dom_point(div.firstChild, 1).is_head(), false);
            },
            "Foot"($) {
                const div = $mol_jsx("div", null, "foo");
                $mol_assert_equal($mol_dom_point.foot(div), new $mol_dom_point(div, 1), $mol_dom_point.tail(div.firstChild));
                $mol_assert_equal($mol_dom_point.foot(div).is_foot(), true);
                $mol_assert_equal(new $mol_dom_point(div.firstChild, 2).is_foot(), false);
            },
            "Near & jump"($) {
                const div = $mol_jsx("div", null,
                    "123",
                    $mol_jsx("span", null, "foo"),
                    "456");
                const span = div.childNodes[1];
                $mol_assert_equal(new $mol_dom_point(div, 1), $mol_dom_point.near(span, -1), new $mol_dom_point(span, 1).jump(-1));
                $mol_assert_equal(new $mol_dom_point(div, 2), $mol_dom_point.near(span, +1), new $mol_dom_point(span, 1).jump(+1));
            },
            "move by steps to the end"($) {
                const div = $mol_jsx("div", null,
                    "1",
                    $mol_jsx("span", null, "23"),
                    $mol_jsx("br", null),
                    "4");
                const span = div.childNodes[1];
                const br = div.childNodes[2];
                let cursor = $mol_dom_point.head(div);
                $mol_assert_equal([
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                ], [
                    $mol_dom_point.head(div.firstChild),
                    $mol_dom_point.foot(div.firstChild),
                    $mol_dom_point.tail(div.firstChild),
                    $mol_dom_point.head(span),
                    $mol_dom_point.head(span.firstChild),
                    new $mol_dom_point(span.firstChild, 1),
                    $mol_dom_point.foot(span.firstChild),
                    $mol_dom_point.tail(span.firstChild),
                    $mol_dom_point.tail(span),
                    $mol_dom_point.head(br),
                    $mol_dom_point.tail(br),
                    $mol_dom_point.head(div.lastChild),
                    $mol_dom_point.foot(div.lastChild),
                    $mol_dom_point.tail(div.lastChild),
                    null,
                ]);
            },
            "move by chars to the end"($) {
                const div = $mol_jsx("div", null,
                    "1",
                    $mol_jsx("span", null, "23"),
                    $mol_jsx("br", null),
                    "4");
                const span = div.childNodes[1];
                const br = div.childNodes[2];
                let start = $mol_dom_point.head(div);
                $mol_assert_equal([
                    start.move_chars(div, +0),
                    start.move_chars(div, +1),
                    start.move_chars(div, +2),
                    start.move_chars(div, +3),
                    start.move_chars(div, +4),
                    start.move_chars(div, +5),
                ], [
                    $mol_dom_point.head(div),
                    $mol_dom_point.foot(div.firstChild),
                    new $mol_dom_point(span.firstChild, 1),
                    $mol_dom_point.foot(span.firstChild),
                    $mol_dom_point.foot(div.lastChild),
                    $mol_dom_point.foot(div),
                ]);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Inside, expand & around"($) {
                const div = $mol_jsx("div", null,
                    "123",
                    $mol_jsx("span", null, "foo"),
                    "456");
                const span = div.childNodes[1];
                $mol_assert_equal($mol_dom_range.inside(span).expand(), $mol_dom_range.around(span));
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Special'() {
            $mol_assert_equal($mol_si_short(0), '0');
            $mol_assert_equal($mol_si_short(1 / 0), '∞');
            $mol_assert_equal($mol_si_short(-1 / 0), '-∞');
            $mol_assert_equal($mol_si_short(0 / 0), '∅');
        },
        'M'() {
            $mol_assert_equal($mol_si_short(0), '0');
            $mol_assert_equal($mol_si_short(0.999500), '1.00');
            $mol_assert_equal($mol_si_short(-0.999600), '-1.00');
            $mol_assert_equal($mol_si_short(999.4), '999');
            $mol_assert_equal($mol_si_short(-999.4), '-999');
        },
        'L'() {
            $mol_assert_equal($mol_si_short(999.5), '1.00k');
            $mol_assert_equal($mol_si_short(-999.5), '-1.00k');
            $mol_assert_equal($mol_si_short(999_400), '999k');
            $mol_assert_equal($mol_si_short(-999_400), '-999k');
        },
        'XL'() {
            $mol_assert_equal($mol_si_short(999_500), '1.00M');
            $mol_assert_equal($mol_si_short(-999_600), '-1.00M');
            $mol_assert_equal($mol_si_short(999_400_000), '999M');
            $mol_assert_equal($mol_si_short(-999_400_000), '-999M');
        },
        'S'() {
            $mol_assert_equal($mol_si_short(0.999400), '999m');
            $mol_assert_equal($mol_si_short(-0.999400), '-999m');
            $mol_assert_equal($mol_si_short(0.000_999_500), '1.00m');
            $mol_assert_equal($mol_si_short(-0.000_999_500), '-1.00m');
        },
        'XS'() {
            $mol_assert_equal($mol_si_short(0.000_999_400), '999µ');
            $mol_assert_equal($mol_si_short(-0.000_999_400), '-999µ');
            $mol_assert_equal($mol_si_short(0.000_000_999_600), '1.00µ');
            $mol_assert_equal($mol_si_short(-0.000_000_999_600), '-1.00µ');
        },
        'With unit'() {
            $mol_assert_equal($mol_si_short(0, 's'), '0 s');
            $mol_assert_equal($mol_si_short(1 / 0, 's'), '∞ s');
            $mol_assert_equal($mol_si_short(0 / 0, 's'), '∅ s');
            $mol_assert_equal($mol_si_short(123, 'Hz'), '123 Hz');
            $mol_assert_equal($mol_si_short(1234, 'g'), '1.23 kg');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'simple sort'() {
            const list = ['abc', 'ac', 'ab'];
            list.sort($mol_compare_text());
            $mol_assert_equal(`${list}`, 'ab,abc,ac');
        },
        'sort ignoring spaces around'() {
            const list = [' a', '\tb', ' b'];
            list.sort($mol_compare_text());
            $mol_assert_equal(`${list}`, ' a,\tb, b');
        },
        'sort ignoring letter case'() {
            const list = ['A', 'B', 'a'];
            list.sort($mol_compare_text());
            $mol_assert_equal(`${list}`, 'A,a,B');
        },
        'sort with custom serializer'() {
            const list = ['abc', 'ab', 'ac'];
            list.sort($mol_compare_text(str => str.split('').reverse().join('')));
            $mol_assert_equal(`${list}`, 'ab,ac,abc');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Vector limiting'() {
            let point = new $mol_vector_3d(7, 10, 13);
            const res = point.limited([[1, 5], [15, 20], [5, 10]]);
            $mol_assert_equal(res.x, 5);
            $mol_assert_equal(res.y, 15);
            $mol_assert_equal(res.z, 10);
        },
        'Vector adding scalar'() {
            let point = new $mol_vector_3d(1, 2, 3);
            let res = point.added0(5);
            $mol_assert_equal(res.x, 6);
            $mol_assert_equal(res.y, 7);
            $mol_assert_equal(res.z, 8);
        },
        'Vector adding vector'() {
            let point = new $mol_vector_3d(1, 2, 3);
            let res = point.added1([5, 10, 15]);
            $mol_assert_equal(res.x, 6);
            $mol_assert_equal(res.y, 12);
            $mol_assert_equal(res.z, 18);
        },
        'Vector multiplying scalar'() {
            let point = new $mol_vector_3d(2, 3, 4);
            let res = point.multed0(-1);
            $mol_assert_equal(res.x, -2);
            $mol_assert_equal(res.y, -3);
            $mol_assert_equal(res.z, -4);
        },
        'Vector multiplying vector'() {
            let point = new $mol_vector_3d(2, 3, 4);
            let res = point.multed1([5, 2, -2]);
            $mol_assert_equal(res.x, 10);
            $mol_assert_equal(res.y, 6);
            $mol_assert_equal(res.z, -8);
        },
        'Matrix adding matrix'() {
            let matrix = new $mol_vector_matrix(...[[1, 2], [3, 4], [5, 6]]);
            let res = matrix.added2([[10, 20], [30, 40], [50, 60]]);
            $mol_assert_equal(res[0][0], 11);
            $mol_assert_equal(res[0][1], 22);
            $mol_assert_equal(res[1][0], 33);
            $mol_assert_equal(res[1][1], 44);
            $mol_assert_equal(res[2][0], 55);
            $mol_assert_equal(res[2][1], 66);
        },
        'Matrix multiplying matrix'() {
            let matrix = new $mol_vector_matrix(...[[2, 3], [4, 5], [6, 7]]);
            let res = matrix.multed2([[2, 3], [4, 5], [6, 7]]);
            $mol_assert_equal(res[0][0], 4);
            $mol_assert_equal(res[0][1], 9);
            $mol_assert_equal(res[1][0], 16);
            $mol_assert_equal(res[1][1], 25);
            $mol_assert_equal(res[2][0], 36);
            $mol_assert_equal(res[2][1], 49);
        },
        'Range expanding'() {
            let range = $mol_vector_range_full.inversed;
            const expanded = range.expanded0(10).expanded0(5);
            $mol_assert_like([...expanded], [5, 10]);
        },
        'Vector of range expanding by vector'() {
            let dimensions = new $mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
            const expanded = dimensions.expanded1([1, 7]).expanded1([3, 5]);
            $mol_assert_like([...expanded.x], [1, 3]);
            $mol_assert_like([...expanded.y], [5, 7]);
        },
        'Vector of range expanding by vector of range'() {
            let dimensions = new $mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
            const expanded = dimensions
                .expanded2([[1, 3], [7, 9]])
                .expanded2([[2, 4], [6, 8]]);
            $mol_assert_like([...expanded.x], [1, 4]);
            $mol_assert_like([...expanded.y], [6, 9]);
        },
        'Vector of infinity range expanding by vector of range'() {
            let dimensions = new $mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
            const next = new $mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
            const expanded = next
                .expanded2(dimensions);
            $mol_assert_like([...expanded.x], [Infinity, -Infinity]);
            $mol_assert_like([...expanded.y], [Infinity, -Infinity]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_studio_doc_land_stub extends $bog_gamengine_studio_doc_land {
        clock = 1e6;
        beats = 0;
        seen_at = new Map();
        text(next = '') {
            return next;
        }
        now() {
            return this.clock;
        }
        stamp() {
            return this.clock;
        }
        me() {
            return 'me';
        }
        read() {
            return this.text();
        }
        write(text) {
            this.text(text);
        }
        me_mate() {
            return {};
        }
        seen(id) {
            return this.seen_at.get(id) ?? 0;
        }
        beat(mate, name, pick, spot, now) {
            ++this.beats;
            this.seen_at.set(this.me(), now);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_studio_doc_land_stub.prototype, "text", null);
    function opened($) {
        const land = $bog_gamengine_studio_doc_land_stub.create(land => land.$ = $);
        land.text($bog_gamengine_studio_sample);
        const doc = $bog_gamengine_studio_doc.create(doc => {
            doc.$ = $;
            doc.land(land);
        });
        return { land, doc };
    }
    $mol_test({
        'set of a document with a land rewrites the text of the land'($) {
            const { land, doc } = opened($);
            doc.set('Hero', 'pos', [3, 0, 0]);
            $mol_assert_not(land.text().includes('pos / 3 0 0'));
            $mol_after_mock_warp();
            $mol_assert_ok(land.text().includes('pos / 3 0 0'));
            $mol_assert_equal(doc.source(), land.text());
            $mol_assert_equal(doc.node('Hero').props.pos.toString(), 'pos / 3 0 0\n');
        },
        'presence is written once per rate interval and not more often'($) {
            const { land } = opened($);
            land.push('Герой', [1, 2]);
            land.push('Герой', [1.5, 2]);
            land.push('Герой', [2, 2]);
            $mol_after_mock_warp();
            $mol_assert_equal(land.pushes, 1);
            $mol_assert_equal(land.beats, 1);
        },
        'presence is written again once the rate gap passed'($) {
            const { land } = opened($);
            land.push('Герой', [1, 2]);
            land.clock += 1000 / land.rate();
            land.push('Герой', [2, 2]);
            $mol_after_mock_warp();
            $mol_assert_equal(land.beats, 2);
        },
        'mate that stopped writing is gone after the timeout'($) {
            const { land } = opened($);
            land.seen_at.set('other', land.clock);
            $mol_assert_ok(land.present('other'));
            land.clock += land.timeout() * 1000;
            $mol_assert_not(land.present('other'));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'every palette item names a class and either a known world or none'() {
            const kit = new $bog_gamengine_studio_kit;
            $mol_assert_ok(kit.list().length > 0);
            for (const item of kit.list()) {
                $mol_assert_ok(item.klass.startsWith('$'));
                $mol_assert_ok(item.title.length > 0);
                $mol_assert_ok(!item.world || Boolean($bog_gamengine_studio_kit_worlds[item.world]));
                $mol_assert_ok(!item.part || !item.world);
            }
        },
        'part attaches to a node and keeps its own props'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own([
                '$bog_gamengine_studio_sample $bog_gamengine_scene',
                '\tkids /',
                '\t\t<= Hero $bog_gamengine_node',
                '\t\t\tname \\Герой',
                '',
            ].join('\n'));
            const kit = new $bog_gamengine_studio_kit;
            const name = $bog_gamengine_studio_kit_attach(doc, kit.item('combat'), 'Hero');
            const source = doc.source();
            $mol_assert_ok(name.length > 0);
            $mol_assert_ok(source.includes('$bog_gamengine_combat'));
            $mol_assert_ok(source.includes('health_max 40'));
            $mol_assert_ok(source.includes('parts /'));
            $mol_assert_ok(source.includes(`<= ${name}`));
            const scene = doc.scene();
            const hero = scene.nodes().find(one => one.name() === 'Герой');
            const part = hero.parts()[0];
            $mol_assert_equal(hero.parts().length, 1);
            $mol_assert_equal(part.owner(), hero);
            $mol_assert_equal(part.props().find(prop => prop.name === 'health_max').get(), 40);
            $mol_assert_equal(hero.props().map(prop => prop.name).filter(name => /health|rate|\./.test(name)), []);
        },
        'part of a missing host is not written at all'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own('$bog_gamengine_studio_sample $bog_gamengine_scene\n\tkids /\n');
            const before = doc.source();
            const kit = new $bog_gamengine_studio_kit;
            $mol_assert_equal($bog_gamengine_studio_kit_attach(doc, kit.item('combat'), 'Ghost'), '');
            $mol_assert_equal(doc.source(), before);
        },
        'item is found by id and missing one is null'() {
            const kit = new $bog_gamengine_studio_kit;
            $mol_assert_equal(kit.item('walker').klass, '$bog_gamengine_phys_walker');
            $mol_assert_equal(kit.item('body').klass, '$bog_gamengine_phys_body');
            $mol_assert_equal(kit.item('ghost'), null);
            $mol_assert_equal(kit.title('walker'), 'Ходок');
        },
        'body of the palette asks for the phys world and binds a tile only if there is one'() {
            const kit = new $bog_gamengine_studio_kit;
            const world = kit.world('body');
            $mol_assert_equal(world.prop, 'phys');
            $mol_assert_equal(world.node, 'Phys');
            $mol_assert_equal(world.klass, '$bog_gamengine_phys');
            $mol_assert_equal(world.list, 'bodies');
            $mol_assert_equal(world.props.tile, undefined);
            $mol_assert_equal(world.binds.tile, 'Tile');
        },
        'map of the palette gives a bare scene a tile and cells to paint on'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own('$bog_gamengine_studio_sample $bog_gamengine_scene\n\tkids /\n');
            const kit = new $bog_gamengine_studio_kit;
            const name = $bog_gamengine_studio_kit_apply(doc, kit.item('map'), '/ 0 0 0');
            const source = doc.source();
            $mol_assert_ok(source.includes('$bog_gamengine_tilemap'));
            $mol_assert_ok(source.includes('Tile $bog_gamengine_phys_tile'));
            $mol_assert_ok(source.includes('tile <= Tile'));
            $mol_assert_equal(source.includes('atlas <='), false);
            const scene = doc.scene();
            const tiles = scene.nodes().find(one => one instanceof $bog_gamengine_tilemap);
            $mol_assert_ok(tiles.emit() > 0);
            $mol_assert_equal(tiles.atlas(), null);
            $mol_assert_ok(scene.nodes().some(one => one instanceof $bog_gamengine_tilemap && one.tile()));
            $mol_assert_equal($bog_gamengine_studio_kit_bound(doc, name, 'atlas'), '');
        },
        'map of the palette puts the click into the grid, not into the node'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own('$bog_gamengine_studio_sample $bog_gamengine_scene\n\tkids /\n');
            const kit = new $bog_gamengine_studio_kit;
            $bog_gamengine_studio_kit_apply(doc, kit.item('map'), '/ 6.5 -4.5 0');
            $mol_assert_ok(doc.source().includes('origin / 6 -4'));
            $mol_assert_equal(doc.source().includes('pos /'), false);
            const tiles = doc.scene().nodes().find(one => one instanceof $bog_gamengine_tilemap);
            const tile = tiles.tile();
            $mol_assert_equal([...tiles.pos()], [0, 0, 0]);
            $mol_assert_equal([...tile.origin()], [6, -4]);
            const pos = tile.cell_pos(0, 0, new Float32Array(3));
            $mol_assert_equal([pos[0], pos[1]], [6.5, -4.5]);
            const at = tile.cell_at(pos[0], pos[1], new Int32Array(2));
            $mol_assert_equal([at[0], at[1]], [0, 0]);
        },
        'brush paints into the map that the palette has just placed'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own('$bog_gamengine_studio_sample $bog_gamengine_scene\n\tkids /\n');
            const kit = new $bog_gamengine_studio_kit;
            $bog_gamengine_studio_kit_apply(doc, kit.item('map'), '/ 0 0 0');
            doc.paint(2, 1, '#');
            const tiles = doc.scene().nodes().find(one => one instanceof $bog_gamengine_tilemap);
            $mol_assert_equal(tiles.tile().char(2, 1), '#');
            $mol_assert_equal(tiles.tile().cell(2, 1), true);
            $mol_assert_ok(tiles.emit() > 0);
        },
        'map of the palette takes the tile that is already in the document'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own([
                '$bog_gamengine_studio_sample $bog_gamengine_scene',
                '\tTile $bog_gamengine_phys_tile',
                '\t\tmap \\',
                '\t\t\t\\####',
                '\tkids /',
                '',
            ].join('\n'));
            const kit = new $bog_gamengine_studio_kit;
            $bog_gamengine_studio_kit_apply(doc, kit.item('map'), '/ 0 0 0');
            const source = doc.source();
            $mol_assert_equal(source.match(/\$bog_gamengine_phys_tile/g).length, 1);
            $mol_assert_ok(source.includes('tile <= Tile'));
            $mol_assert_ok(source.includes('\\####'));
        },
        'map of the palette binds the atlas only when the document has one'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own([
                '$bog_gamengine_studio_sample $bog_gamengine_scene',
                '\tkids /',
                '\tAtlas $bog_gamengine_atlas',
                '\t\turis /',
                '\t\t\t\\bog/gamengine/demo/atlas/wall.png',
                '\t\t\t\\bog/gamengine/demo/atlas/floor.png',
                '\t\tsize 64',
                '',
            ].join('\n'));
            const kit = new $bog_gamengine_studio_kit;
            const name = $bog_gamengine_studio_kit_apply(doc, kit.item('map'), '/ 0 0 0');
            $mol_assert_ok(doc.source().includes('atlas <= Atlas'));
            $mol_assert_equal($bog_gamengine_studio_kit_bound(doc, name, 'atlas'), 'Atlas');
            const tiles = doc.scene().nodes().find(one => one instanceof $bog_gamengine_tilemap);
            $mol_assert_ok(Boolean(tiles.atlas()));
            const count = tiles.emit();
            $mol_assert_ok(count > 0);
            $mol_assert_equal(tiles.pool().layer[0], tiles.atlas().layer('floor'));
        },
        'atlas of a tilemap is a reference in the panel, empty until it is bound'() {
            const tiles = new $bog_gamengine_tilemap;
            const prop = tiles.props().find(one => one.name === 'atlas');
            $mol_assert_equal(prop.kind, 'node');
            $mol_assert_equal(prop.klass, '$bog_gamengine_atlas');
            $mol_assert_equal(prop.get(), null);
        },
        'reference of a wrong class is refused instead of being written'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own([
                '$bog_gamengine_studio_sample $bog_gamengine_scene',
                '\tkids /',
                '\t\t<= Walker_1 $bog_gamengine_phys_walker',
                '\tAtlas $bog_gamengine_atlas',
                '\t\turis /',
                '\t\t\t\\bog/gamengine/demo/atlas/wall.png',
                '\t\tsize 64',
                '',
            ].join('\n'));
            const kit = new $bog_gamengine_studio_kit;
            const name = $bog_gamengine_studio_kit_apply(doc, kit.item('map'), '/ 0 0 0');
            $mol_assert_equal($bog_gamengine_studio_kit_bind(doc, name, 'atlas', 'Walker_1', '$bog_gamengine_atlas'), false);
            $mol_assert_equal(doc.source().includes('atlas <= Walker_1'), false);
            $mol_assert_equal($bog_gamengine_studio_kit_bind(doc, name, 'atlas', 'Atlas', '$bog_gamengine_atlas'), true);
            $mol_assert_equal($bog_gamengine_studio_kit_bound(doc, name, 'atlas'), 'Atlas');
        },
        'no world of the palette declares a tile or leans on a map of the root'() {
            const kit = new $bog_gamengine_studio_kit;
            for (const id of ['walker', 'body', 'agent']) {
                const world = kit.world(id);
                $mol_assert_equal(Object.values(world.props).indexOf('<= map'), -1);
                $mol_assert_equal(world.binds.tile, 'Tile');
                const plan = $bog_gamengine_studio_kit_plan_of(kit.item(id), [], [], '/ 0.5 -0.5 0');
                $mol_assert_equal(plan.decls.some(one => one.klass === '$bog_gamengine_phys_tile'), false);
            }
        },
        'walker is the engine primitive and asks for no input wiring'() {
            const kit = new $bog_gamengine_studio_kit;
            const item = kit.item('walker');
            $mol_assert_equal(item.klass, '$bog_gamengine_phys_walker');
            $mol_assert_equal(item.props.input, undefined);
            $mol_assert_equal(new $bog_gamengine_phys_walker().speed(), 3);
        },
        'placed node comes with a readable name of its own'() {
            const kit = new $bog_gamengine_studio_kit;
            const plan = $bog_gamengine_studio_kit_plan_of(kit.item('walker'), ['Tile', 'Phys'], ['phys'], '/ 1.5 -1.5 0');
            $mol_assert_equal(plan.props.name, '\\Ходок');
            $mol_assert_equal(kit.item('body').props.name, '\\Тело');
        },
        'empty scene gets the world and a line on the root'() {
            const kit = new $bog_gamengine_studio_kit;
            const plan = $bog_gamengine_studio_kit_plan_of(kit.item('walker'), [], ['map', 'palette'], '/ 1.5 -1.5 0');
            $mol_assert_equal(plan.decls.map(one => one.node), ['Phys']);
            $mol_assert_equal(plan.decls[0].props.bodies, '/');
            $mol_assert_equal(plan.decls[0].props.tile, undefined);
            $mol_assert_equal(plan.root, ['phys <= Phys']);
            $mol_assert_equal(plan.klass, '$bog_gamengine_phys_walker');
            $mol_assert_equal(plan.props.pos, '/ 1.5 -1.5 0');
            $mol_assert_equal(plan.join, { node: 'Phys', prop: 'bodies' });
        },
        'scene that already has a world only gets the node'() {
            const kit = new $bog_gamengine_studio_kit;
            const plan = $bog_gamengine_studio_kit_plan_of(kit.item('body'), ['Tile', 'Phys'], ['map', 'phys'], '/ 2.5 -3.5 0');
            $mol_assert_equal(plan.decls.length, 0);
            $mol_assert_equal(plan.root.length, 0);
            $mol_assert_equal(plan.join, { node: 'Phys', prop: 'bodies' });
        },
        'half built world is filled up, not doubled, and takes the tile that is already there'() {
            const kit = new $bog_gamengine_studio_kit;
            const plan = $bog_gamengine_studio_kit_plan_of(kit.item('body'), ['Tile'], ['map'], '/ 0.5 -0.5 0');
            $mol_assert_equal(plan.decls.map(one => one.node), ['Phys']);
            $mol_assert_equal(plan.decls[0].props.tile, '<= Tile');
            $mol_assert_equal(plan.root, ['phys <= Phys']);
        },
        'placing a walker into a bare scene of the engine gives a working world'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own([
                '$bog_gamengine_studio_sample $bog_gamengine_scene',
                '\tkids /',
                '',
            ].join('\n'));
            const kit = new $bog_gamengine_studio_kit;
            const name = $bog_gamengine_studio_kit_apply(doc, kit.item('walker'), '/ 1.5 -1.5 0');
            const source = doc.source();
            $mol_assert_ok(name.length > 0);
            $mol_assert_ok(source.includes('Phys $bog_gamengine_phys'));
            $mol_assert_ok(source.includes('phys <= Phys'));
            $mol_assert_ok(source.includes('$bog_gamengine_phys_walker'));
            $mol_assert_ok(source.includes('pos / 1.5 -1.5 0'));
            $mol_assert_ok(source.includes(`<= ${name}`));
            $mol_assert_equal(source.includes('$bog_gamengine_phys_tile'), false);
            $mol_assert_equal(source.includes('map <= map'), false);
            const scene = doc.scene();
            const phys = scene.phys();
            $mol_assert_equal(phys.tile(), null);
            const body = scene.nodes().find(one => one instanceof $bog_gamengine_phys_body);
            body.vel(new Float32Array([1, 0, 0]));
            phys.step_world(0.5);
            $mol_assert_equal(body.pos()[0] > 1.5, true);
        },
        'second body joins the same world instead of making another'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own([
                '$bog_gamengine_studio_sample $bog_gamengine_scene',
                '\tTile $bog_gamengine_phys_tile',
                '\t\tmap \\',
                '\t\t\t\\####',
                '\t\t\t\\#..#',
                '\t\t\t\\####',
                '\tkids /',
                '',
            ].join('\n'));
            const kit = new $bog_gamengine_studio_kit;
            const first = $bog_gamengine_studio_kit_apply(doc, kit.item('walker'), '/ 1.5 -1.5 0');
            const second = $bog_gamengine_studio_kit_apply(doc, kit.item('body'), '/ 2.5 -1.5 0');
            const source = doc.source();
            $mol_assert_ok(first !== second);
            $mol_assert_equal(source.match(/Phys \$bog_gamengine_phys/g).length, 1);
            $mol_assert_equal(source.match(/\$bog_gamengine_phys_tile/g).length, 1);
            $mol_assert_equal(source.match(/tile <= Tile/g).length, 1);
            $mol_assert_equal(source.match(/phys <= Phys/g).length, 1);
            $mol_assert_ok(source.includes(`<= ${first}`));
            $mol_assert_ok(source.includes(`<= ${second}`));
            $mol_assert_equal(doc.nodes().filter((one) => one.kind === 'node' && one.klass.startsWith('$bog_gamengine_phys')).length, 2);
        },
        'agent takes the grid by a reference of its own, not by a list'() {
            const kit = new $bog_gamengine_studio_kit;
            const world = kit.world('agent');
            $mol_assert_equal(world.node, 'Grid');
            $mol_assert_equal(world.klass, '$bog_gamengine_nav_grid');
            $mol_assert_equal(world.list, '');
            $mol_assert_equal(world.ref, 'grid');
            $mol_assert_equal(world.prop, '');
            const plan = $bog_gamengine_studio_kit_plan_of(kit.item('agent'), [], ['map'], '/ 1.5 -1.5 0');
            $mol_assert_equal(plan.decls.map(one => one.node), ['Grid']);
            $mol_assert_equal(plan.root, []);
            $mol_assert_equal(plan.join, null);
            $mol_assert_equal(plan.props.grid, '<= Grid');
        },
        'two agents share one grid and one tile'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own([
                '$bog_gamengine_studio_sample $bog_gamengine_scene',
                '\tTile $bog_gamengine_phys_tile',
                '\t\tmap \\',
                '\t\t\t\\######',
                '\t\t\t\\#....#',
                '\t\t\t\\######',
                '\tkids /',
                '',
            ].join('\n'));
            const kit = new $bog_gamengine_studio_kit;
            const first = $bog_gamengine_studio_kit_apply(doc, kit.item('agent'), '/ 1.5 -1.5 0');
            const second = $bog_gamengine_studio_kit_apply(doc, kit.item('agent'), '/ 3.5 -1.5 0');
            const source = doc.source();
            $mol_assert_ok(first !== second);
            $mol_assert_equal(source.match(/Grid \$bog_gamengine_nav_grid/g).length, 1);
            $mol_assert_equal(source.match(/\$bog_gamengine_phys_tile/g).length, 1);
            $mol_assert_equal(source.match(/grid <= Grid/g).length, 2);
            $mol_assert_equal(source.includes('phys <= '), false);
            const scene = doc.scene();
            const agents = scene.nodes().filter(one => one instanceof $bog_gamengine_nav_agent);
            $mol_assert_equal(agents.length, 2);
            $mol_assert_ok(Boolean(agents[0].grid()));
            $mol_assert_equal(agents[0].grid().width(), 6);
            $mol_assert_equal(agents[0].grid(), agents[1].grid());
        },
        'agent shows its numbers to the inspector'() {
            const agent = new $bog_gamengine_nav_agent;
            const names = agent.props().map(prop => prop.name);
            $mol_assert_ok(names.indexOf('speed') > 0);
            $mol_assert_ok(names.indexOf('radius') > 0);
            $mol_assert_ok(names.indexOf('replan') > 0);
            agent.props().find(prop => prop.name === 'speed').set(5);
            $mol_assert_equal(agent.speed(), 5);
        },
        'nodes are handed to a property one by one and read back by name'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own([
                '$bog_gamengine_studio_sample $bog_gamengine_scene',
                '\tkids /',
                '\t\t<= First $bog_gamengine_nav_agent',
                '\t\t<= Second $bog_gamengine_nav_agent',
                '\t\t<= Third $bog_gamengine_nav_agent',
                '',
            ].join('\n'));
            $mol_assert_equal($bog_gamengine_studio_kit_refs(doc, 'First', 'others'), []);
            $bog_gamengine_studio_kit_join(doc, 'First', 'others', 'Second');
            $bog_gamengine_studio_kit_join(doc, 'First', 'others', 'Third');
            $mol_assert_equal($bog_gamengine_studio_kit_refs(doc, 'First', 'others'), ['Second', 'Third']);
            $bog_gamengine_studio_kit_join(doc, 'First', 'others', 'Second');
            $mol_assert_equal($bog_gamengine_studio_kit_refs(doc, 'First', 'others'), ['Second', 'Third']);
            const scene = doc.scene();
            const agents = scene.nodes();
            $mol_assert_equal(agents[0].others().length, 2);
            $mol_assert_equal(agents[0].others()[0], agents[1]);
            $mol_assert_equal(agents[0].props().find(one => one.name === 'others').kind, 'nodes');
            $mol_assert_equal($bog_gamengine_studio_kit_clear(doc, 'First', 'others'), true);
            $mol_assert_equal($bog_gamengine_studio_kit_refs(doc, 'First', 'others'), []);
            $mol_assert_equal(doc.source().includes('others'), false);
        },
        'path of a live node is found by its place among the kids'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own([
                '$bog_gamengine_studio_sample $bog_gamengine_scene',
                '\tkids /',
                '\t\t<= First $bog_gamengine_node',
                '\t\t<= Second $bog_gamengine_node',
                '',
            ].join('\n'));
            const scene = doc.scene();
            const nodes = scene.nodes();
            $mol_assert_equal($bog_gamengine_studio_kit_path_of(doc, nodes[1]), 'Second');
            $mol_assert_equal($bog_gamengine_studio_kit_path_of(doc, null), '');
            $mol_assert_equal($bog_gamengine_studio_kit_path_of(doc, new $bog_gamengine_node), '');
        },
        'single reference is bound by name and replaced, not doubled'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own([
                '$bog_gamengine_studio_sample $bog_gamengine_scene',
                '\tkids /',
                '\t\t<= Rule $bog_gamengine_node',
                '\t\t<= First $bog_gamengine_node',
                '\t\t<= Second $bog_gamengine_node',
                '',
            ].join('\n'));
            $mol_assert_equal($bog_gamengine_studio_kit_bound(doc, 'Rule', 'hero'), '');
            $mol_assert_equal($bog_gamengine_studio_kit_bind(doc, 'Rule', 'hero', 'First'), true);
            $mol_assert_equal($bog_gamengine_studio_kit_bound(doc, 'Rule', 'hero'), 'First');
            $mol_assert_equal($bog_gamengine_studio_kit_bind(doc, 'Rule', 'hero', 'Second'), true);
            $mol_assert_equal($bog_gamengine_studio_kit_bound(doc, 'Rule', 'hero'), 'Second');
            $mol_assert_equal(doc.source().match(/hero <= /g).length, 1);
            $mol_assert_equal($bog_gamengine_studio_kit_bind(doc, 'Ghost', 'hero', 'First'), false);
        },
        'clearing a property that is not there changes nothing'($) {
            const doc = new $bog_gamengine_studio_doc;
            doc.$ = $;
            doc.source_own('$bog_gamengine_studio_sample $bog_gamengine_scene\n\tkids /\n\t\t<= First $bog_gamengine_node\n');
            const before = doc.source();
            $mol_assert_equal($bog_gamengine_studio_kit_clear(doc, 'First', 'others'), false);
            $mol_assert_equal($bog_gamengine_studio_kit_clear(doc, 'Ghost', 'others'), false);
            $mol_assert_equal(doc.source(), before);
        },
        'palette can be replaced from outside'() {
            const kit = new $bog_gamengine_studio_kit;
            kit.list([{ id: 'own', title: 'Своё', klass: '$bog_gamengine_sprite', props: {}, world: 'phys' }]);
            $mol_assert_equal(kit.list().length, 1);
            $mol_assert_equal(kit.item('own').title, 'Своё');
            $mol_assert_equal(kit.item('walker'), null);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_studio_time_mock extends $mol_state_time {
        static stamp(next = 0) {
            return next;
        }
        static now(precision) {
            return this.stamp();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_studio_time_mock, "stamp", null);
    function played($) {
        $.$mol_state_time = $bog_gamengine_studio_time_mock;
        const app = $$.$bog_gamengine_studio.make({ $ });
        $bog_gamengine_studio_time_mock.stamp(0);
        app.Scene().step();
        app.play();
        app.Key().keys().D(true);
        for (let tick = 1; tick <= 3; ++tick) {
            $bog_gamengine_studio_time_mock.stamp(tick * 16);
            app.Scene().step();
        }
        return app;
    }
    function canvas_app($) {
        return $$.$bog_gamengine_studio.make({ $, draw_width: () => 616, draw_height: () => 801 });
    }
    function spot_at(app, x, y) {
        return Array.from(app.Point().world(new Float32Array(3), x, y));
    }
    function wheel_at(delta, x, y) {
        return {
            deltaY: delta, deltaMode: 0, offsetX: x, offsetY: y, preventDefault: () => { },
        };
    }
    function row_of(app, title) {
        return app.Doc().nodes().findIndex(row => row.title === title);
    }
    function pick(app, title) {
        app.selected(row_of(app, title));
        return app;
    }
    function press_at(x, y, button = 0) {
        return {
            button, offsetX: x, offsetY: y, pointerId: 1, isTrusted: false,
        };
    }
    function hero_row(app) {
        return row_of_name(app, 'Hero');
    }
    function row_of_name(app, name) {
        const at = app.Doc().nodes().findIndex(row => row.name === name);
        $mol_assert_ok(at >= 0);
        return at;
    }
    function scene_named(app, title) {
        const node = app.Scene().nodes().find(one => one.title() === title);
        $mol_assert_ok(Boolean(node));
        return node;
    }
    function hero(app) {
        return scene_named(app, 'Герой');
    }
    $mol_test({
        'play with D held moves the hero right'($) {
            $.$mol_state_time = $bog_gamengine_studio_time_mock;
            const app = $$.$bog_gamengine_studio.make({ $ });
            pick(app, 'Герой');
            app.write('pos', [1.5, -1.5, 0]);
            $bog_gamengine_studio_time_mock.stamp(0);
            app.Scene().step();
            app.play();
            app.Key().keys().D(true);
            for (let tick = 1; tick <= 3; ++tick) {
                $bog_gamengine_studio_time_mock.stamp(tick * 16);
                app.Scene().step();
            }
            $mol_assert_ok(hero(app).pos()[0] > 1.5);
            $mol_assert_equal(hero(app).pos()[1], -1.5);
        },
        'stop returns the hero to where the play started'($) {
            $.$mol_state_time = $bog_gamengine_studio_time_mock;
            const app = $$.$bog_gamengine_studio.make({ $ });
            $bog_gamengine_studio_time_mock.stamp(0);
            app.Scene().step();
            hero(app).pos(new Float32Array([-5, 1, 0]));
            app.play();
            hero(app).pos(new Float32Array([-2, 1, 0]));
            $mol_assert_equal(hero(app).pos()[0], -2);
            app.stop();
            $mol_assert_equal(Array.from(hero(app).pos()), [-5, 1, 0]);
        },
        'play and stop leave the source untouched'($) {
            const app = played($);
            app.stop();
            $mol_assert_equal(app.source(), $bog_gamengine_studio_sample);
        },
        'pause stops the movement'($) {
            const app = played($);
            app.Pause().checked(true);
            const before = hero(app).pos()[0];
            $bog_gamengine_studio_time_mock.stamp(64);
            app.Scene().step();
            $bog_gamengine_studio_time_mock.stamp(80);
            app.Scene().step();
            $mol_assert_equal(hero(app).pos()[0], before);
        },
        'the key changes nothing in the edit mode'($) {
            $.$mol_state_time = $bog_gamengine_studio_time_mock;
            const run = (held) => {
                const app = $$.$bog_gamengine_studio.make({ $ });
                pick(app, 'Герой');
                app.write('pos', [1.5, -1.5, 0]);
                $bog_gamengine_studio_time_mock.stamp(0);
                app.Scene().step();
                if (held)
                    app.Key().keys().D(true);
                for (let tick = 1; tick <= 3; ++tick) {
                    $bog_gamengine_studio_time_mock.stamp(tick * 16);
                    app.Scene().step();
                }
                return Array.from(hero(app).pos());
            };
            $mol_assert_equal(run(true), run(false));
        },
        'the edit mode leaves the scene without input'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            $mol_assert_equal(app.scene_input(), null);
            app.play();
            $mol_assert_equal(app.scene_input(), app.Input());
        },
        'stop restores a number of a component, not only of a node'($) {
            $.$mol_state_time = $bog_gamengine_studio_time_mock;
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.selected(hero_row(app));
            const part = app.kit_attach('combat');
            const row = app.Doc().nodes().findIndex(one => one.path === `Hero/${part}`);
            app.selected(row);
            const health = () => app.props_of(`Hero/${part}`).find(one => one.name === 'health_max');
            const before = health().get();
            $mol_assert_ok(Number(before) > 0);
            $bog_gamengine_studio_time_mock.stamp(0);
            app.play();
            health().set(7);
            $mol_assert_equal(health().get(), 7);
            app.stop();
            $mol_assert_equal(health().get(), before);
            $mol_assert_not(app.source().includes('health_max 7'));
        },
        'placed sound is selected by a row, renamed and dropped by the button'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.place('bog/gamengine/demo/sound/coin.wav', [0, 0, 0]);
            const rows = app.Doc().nodes();
            const at = rows.findIndex(one => one.name === 'Sound');
            $mol_assert_ok(at >= 0);
            $mol_assert_equal(rows[at].kind, 'own');
            app.selected(at);
            $mol_assert_equal(app.doc_path(), 'Sound');
            $mol_assert_equal(app.props_of('Sound'), []);
            app.node_name('Звуки');
            $mol_assert_equal(app.row_title(at), 'Звуки');
            app.Node_drop().click(null);
            $mol_assert_not(app.source().includes('coin.wav'));
            $mol_assert_not(app.Doc().nodes().some(one => one.name === 'Sound'));
            $mol_assert_ok(app.Scene().nodes().some(node => node.title() === 'Герой'));
        },
        'component attached to a node shows up in the tree under its owner'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.selected(hero_row(app));
            const part = app.kit_attach('combat');
            $mol_assert_ok(part.length > 0);
            const rows = app.Doc().nodes();
            const at = rows.findIndex(row => row.path === `Hero/${part}`);
            $mol_assert_ok(at > 0);
            $mol_assert_equal(rows[at].kind, 'part');
            $mol_assert_equal(rows[0].kind, 'node');
            app.selected(at);
            $mol_assert_equal(app.doc_path(), `Hero/${part}`);
            app.write('health_max', 70);
            $mol_assert_ok(app.source().includes('health_max 70'));
        },
        'scene tree lists every declaration of the document, not only the nodes'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            const titles = app.node_rows().map((row, at) => app.row_title(at));
            $mol_assert_equal(titles.length, app.Doc().nodes().length);
            for (const title of ['Герой', 'Монета', 'Стена', 'Atlas']) {
                $mol_assert_ok(titles.indexOf(title) >= 0);
            }
            $mol_assert_ok(titles.length > app.Scene().nodes().length);
        },
        'tree row shows node name'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            $mol_assert_equal(app.row_title(row_of(app, 'Герой')), 'Герой');
        },
        'pos typed into the inspector moves the selected node'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            pick(app, 'Монета');
            app.Vec_num('pos_0').value(5);
            $mol_assert_equal(scene_named(app, 'Монета').pos()[0], 5);
        },
        'pos typed into the inspector rewrites the source'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            pick(app, 'Герой');
            app.write('pos', [0, 0, 0]);
            app.Vec_num('pos_0').value(5);
            $mol_assert_ok(app.source().includes('\t\t\tpos / 5 0 0\n'));
        },
        'source typed into the editor moves the node'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            pick(app, 'Герой');
            app.write('pos', [0, 0, 0]);
            app.source(app.source().replace('\t\t\tpos / 0 0 0\n', '\t\t\tpos / 7 0 0\n'));
            $mol_assert_equal(hero(app).pos()[0], 7);
        },
        'rotation is edited in degrees'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            pick(app, 'Герой');
            app.Vec_num('rot_2').value(90);
            $mol_assert_equal(Math.round(hero(app).rot()[2] * 1e6) / 1e6, Math.round(Math.PI / 2 * 1e6) / 1e6);
        },
        'assets tab lists every asset of the pack with its file name'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            $mol_assert_equal(app.asset_rows().length, 8);
            $mol_assert_equal(app.Asset_row('bog/gamengine/demo/atlas/coin.png').title(), 'coin.png');
            $mol_assert_ok(app.asset_icon('bog/gamengine/demo/atlas/coin.png') instanceof $mol_image);
            $mol_assert_ok(app.asset_icon('bog/gamengine/demo/sound/coin.wav') instanceof $mol_icon_music);
        },
        'picked image placed by a canvas click becomes a sprite at the click point'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.Asset_row('bog/gamengine/demo/atlas/floor.png').checked(true);
            $mol_assert_ok(app.placing());
            app.place('bog/gamengine/demo/atlas/floor.png', [1, -2, 0]);
            $mol_assert_ok(row_of(app, 'floor') >= 0);
            $mol_assert_equal(scene_named(app, 'floor').pos()[1], -2);
            $mol_assert_ok(app.source().includes('\t\t\t\\bog/gamengine/demo/atlas/floor.png\n'));
            $mol_assert_ok(app.source().includes('\t\t<= Sprite_1 $bog_gamengine_sprite\n\t\t\tname \\floor\n\t\t\tatlas <= Atlas\n\t\t\tframe \\floor\n\t\t\tpos / 1 -2 0\n'));
        },
        'placed model gets a loader shape and no batch of its own'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.place('bog/gamengine/demo/room/model/pillar.glb', [0, 1, 0]);
            $mol_assert_equal(app.row_title(row_of(app, 'pillar')), 'pillar');
            $mol_assert_ok(app.source().includes('\t\t\tshape <= Mesh_1_shape $bog_gamengine_studio_assets_gltf\n\t\t\t\turi \\bog/gamengine/demo/room/model/pillar.glb\n'));
            $mol_assert_not(app.source().includes('$bog_gamengine_batch'));
            $mol_assert_ok(app.Scene().batches().some(batch => batch.shape() instanceof $bog_gamengine_studio_assets_gltf));
            $mol_assert_ok(scene_named(app, 'pillar') instanceof $bog_gamengine_mesh);
        },
        'model and sprites go to batches of their own'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            const before = app.Scene().batches().length;
            app.place('bog/gamengine/demo/room/model/pillar.glb', [0, 1, 0]);
            const batches = app.Scene().batches();
            $mol_assert_equal(batches.length, before + 1);
            const mesh = batches.find(batch => batch.shape() instanceof $bog_gamengine_studio_assets_gltf);
            $mol_assert_equal(mesh.nodes().length, 1);
            $mol_assert_ok(mesh.nodes()[0] instanceof $bog_gamengine_mesh);
        },
        'placed sound is written into the sound dictionary'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.place('bog/gamengine/demo/sound/coin.wav', [0, 0, 0]);
            $mol_assert_ok(app.source().endsWith('\tSound $bog_gamengine_sound\n\t\turis *\n\t\t\tcoin \\bog/gamengine/demo/sound/coin.wav\n'));
            app.place('bog/gamengine/demo/sound/coin.wav', [0, 0, 0]);
            $mol_assert_equal(app.source().split('coin.wav').length, 2);
            const at = app.Doc().nodes().findIndex(row => row.name === 'Sound');
            $mol_assert_ok(at >= 0);
            $mol_assert_equal(app.row_title(at), 'Sound');
            app.selected(at);
            $mol_assert_equal(app.doc_path(), 'Sound');
        },
        'assets tab survives the scene rebuild'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.Side_switch().value('1');
            app.place('bog/gamengine/demo/atlas/floor.png', [1, -2, 0]);
            $mol_assert_equal(app.tab(), '1');
            $mol_assert_not(app.tab_hidden_1());
            app.Side_switch().value('');
            $mol_assert_equal(app.tab(), '1');
        },
        'tiles tab lists the palette of the scene'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            $mol_assert_equal(app.tile_rows().length, 3);
            $mol_assert_equal(app.tile_title('#'), '# wall');
            $mol_assert_equal(app.tile_uri('.'), 'bog/gamengine/demo/atlas/floor.png');
            $mol_assert_ok(app.tile_icon('#') instanceof $mol_image);
        },
        'picked char and cell tool paint the map of the document'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.Tile('#').checked(true);
            app.Tools().value('cell');
            app.brush_down([1, 1]);
            app.brush_move([2, 1]);
            app.brush_up([2, 1]);
            $mol_assert_equal(app.Doc().map()[1].join(''), '###..#');
        },
        'brush past the right edge shows the new cells while the stroke is held'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.Tile('#').checked(true);
            app.Tools().value('cell');
            const wide = app.tile_grid().width();
            app.brush_down([1, 1]);
            app.brush_move([wide + 1, 1]);
            $mol_assert_equal(app.tile_grid().width(), wide + 2);
            $mol_assert_equal(app.tile_grid().char(wide + 1, 1), '#');
            app.brush_up([wide + 1, 1]);
            $mol_assert_equal(app.Doc().map()[1].length, wide + 2);
            $mol_assert_equal(app.Doc().map()[1][wide + 1], '#');
        },
        'brush past the top left corner shifts the previewed grid, not its cells'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.Tile('#').checked(true);
            app.Tools().value('cell');
            const grid = () => app.tile_grid();
            const before = grid().cell_pos(1, 1, new Float32Array(3));
            app.brush_down([1, 1]);
            app.brush_move([-2, -1]);
            $mol_assert_equal([...grid().origin()], [-2, 1]);
            $mol_assert_equal(grid().char(0, 0), '#');
            const after = grid().cell_pos(3, 2, new Float32Array(3));
            $mol_assert_equal([after[0], after[1]], [before[0], before[1]]);
            app.brush_up([-2, -1]);
            $mol_assert_equal(app.Doc().map_origin(), [-2, 1]);
        },
        'rect preview frame sits on the shifted grid'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.source($bog_gamengine_studio_sample_shift);
            app.Tile('#').checked(true);
            app.Tools().value('rect');
            app.brush_down([1, 1]);
            app.brush_move([2, 1]);
            const points = app.Rect_shape().points();
            $mol_assert_equal([points[0], points[1]], [5, -4]);
            $mol_assert_equal([points[3], points[4]], [7, -4]);
            app.brush_up([2, 1]);
        },
        'rect tool paints a rectangle and shows a preview frame'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.Tile('#').checked(true);
            app.Tools().value('rect');
            app.brush_down([1, 1]);
            app.brush_move([2, 2]);
            $mol_assert_equal(app.rect_nodes().length, 1);
            app.brush_up([2, 2]);
            $mol_assert_equal(app.rect_nodes().length, 0);
            $mol_assert_equal(app.Doc().map().map(row => row.join('')), ['######', '###..#', '####.#', '#....#', '######']);
        },
        'fill tool floods the room and the tool blocks the gizmo'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            pick(app, 'Герой');
            $mol_assert_equal(app.gizmo_arrow_nodes().length, 2);
            app.Tile('#').checked(true);
            app.Tools().value('fill');
            $mol_assert_equal(app.gizmo_arrow_nodes().length, 0);
            app.brush_down([1, 1]);
            $mol_assert_equal(app.Doc().map().map(row => row.join('')), ['######', '######', '######', '######', '######']);
            app.tool_drop();
            $mol_assert_equal(app.gizmo_arrow_nodes().length, 2);
        },
        'painted cell reaches the map of the scene'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            $mol_assert_equal(app.tile_grid().rows()[1][1], '.');
            app.Tile('#').checked(true);
            app.Tools().value('cell');
            app.brush_down([1, 1]);
            $mol_assert_equal(app.tile_grid().rows()[1][1], '#');
            app.brush_up([1, 1]);
            $mol_assert_equal(app.tile_grid().rows()[1][1], '#');
            $mol_assert_ok(app.source().includes('\\##...#'));
        },
        'inspector draws a row per record of a list prop'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.source($bog_gamengine_studio_sample_brain);
            app.selected(row_of_name(app, 'Walk'));
            $mol_assert_equal(app.row_title(1), 'Ходит');
            $mol_assert_ok(app.fields().some(field => field.name() === 'next'));
            $mol_assert_equal(app.list_rows('next').length, 2);
            $mol_assert_equal(app.list_row('next/0').length, 3);
            $mol_assert_equal(app.List_field('next/0/to').value(), 'Ждёт');
            $mol_assert_equal(app.List_field('next/0/when').value(), 'near');
            $mol_assert_equal(app.List_field('next/0/when').hint(), 'when');
        },
        'text typed into a list row rewrites the record in the source'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.source($bog_gamengine_studio_sample_brain);
            app.selected(row_of_name(app, 'Walk'));
            app.List_field('next/0/to').value('Спит');
            $mol_assert_ok(app.source().includes('\t\t\t\t\tto \\Спит\n\t\t\t\t\twhen \\near\n'));
            $mol_assert_equal(app.list_values('next').length, 1);
        },
        'buttons add and drop a record of a list prop'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.source($bog_gamengine_studio_sample_brain);
            app.selected(row_of_name(app, 'Walk'));
            app.List_add('next').click(null);
            $mol_assert_equal(app.list_values('next').length, 2);
            $mol_assert_equal(app.list_rows('next').length, 3);
            app.List_field('next/1/to').value('Ждёт');
            app.List_drop('next/0').click(null);
            $mol_assert_equal(app.list_values('next'), [{ to: 'Ждёт', when: '' }]);
        },
        'inspector writes into the nested node, not into its neighbour'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.source($bog_gamengine_studio_sample_nest);
            const titles = app.Scene().nodes().map(node => node.title());
            $mol_assert_equal(titles, ['Сторож', 'Ходит', 'Ждёт', 'Метка']);
            app.selected(titles.indexOf('Ходит'));
            app.Vec_num('pos_0').value(5);
            const nodes = app.Scene().nodes();
            const walk = nodes.find(node => node.title() === 'Ходит');
            $mol_assert_equal(walk.pos()[0], 5);
            $mol_assert_equal(nodes.find(node => node.title() === 'Метка').pos()[0], 2);
            walk.pos([7, 0, 0]);
            $mol_assert_equal(walk.pos()[0], 7);
        },
        'inspector signs a field shared by prefab instances'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.source($bog_gamengine_studio_sample_prefab);
            const titles = app.Scene().nodes().map(node => node.title());
            app.selected(titles.indexOf('Ствол'));
            $mol_assert_equal(app.doc_path(), 'Enemy_1/Gun');
            $mol_assert_equal(app.field_bids('pos'), ['часть префаба, затронет 2 инстанса']);
            app.selected(titles.indexOf('Вожак'));
            $mol_assert_equal(app.field_bids('name'), []);
        },
        'detach button rebinds one instance and leaves the prefab compiling'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.source($bog_gamengine_studio_sample_prefab);
            app.selected(app.Scene().nodes().map(node => node.title()).indexOf('Ствол'));
            $mol_assert_ok(app.form_foot().includes(app.Detach()));
            app.Detach().click(null);
            $mol_assert_equal(app.doc_path(), 'Enemy_1/Enemy_1_Gun');
            $mol_assert_not(app.form_foot().includes(app.Detach()));
            app.Vec_num('pos_0').value(9);
            const nodes = app.Scene().nodes();
            $mol_assert_equal(nodes.map(node => node.title()), ['Страж', 'Ствол', 'Вожак', 'Ствол']);
            $mol_assert_equal(nodes.filter(node => node.title() === 'Ствол').map(node => node.pos()[0]), [9, 0]);
        },
        'edited source comes back to a freshly opened editor'($) {
            const key = 'bog_gamengine_studio_source_test_keep';
            const make = () => {
                const app = $$.$bog_gamengine_studio.make({ $ });
                app.source_key = () => key;
                return app;
            };
            try {
                const first = make();
                const edited = first.source().replace('\\Герой', '\\Крошка');
                first.source(edited);
                $mol_assert_equal(make().source(), edited);
            }
            finally {
                $.$mol_state_local.value(key, null);
            }
        },
        'node put by the mouse is still there after a reload, without asking to save'($) {
            const key = 'bog_gamengine_studio_source_test_place';
            const make = () => {
                const app = $$.$bog_gamengine_studio.make({ $ });
                app.source_key = () => key;
                return app;
            };
            try {
                const first = make();
                first.place('bog/gamengine/demo/atlas/floor.png', [1, -2, 0]);
                $mol_assert_ok(row_of(first, 'floor') >= 0);
                const again = make();
                $mol_assert_ok(row_of(again, 'floor') >= 0);
                $mol_assert_equal(scene_named(again, 'floor').pos()[1], -2);
            }
            finally {
                $.$mol_state_local.value(key, null);
            }
        },
        'editor keeps working and tells the truth when the browser refuses to save'($) {
            class $mol_state_local_locked extends $mol_state_local {
                static value(key, next) {
                    return $mol_fail(new Error('The operation is insecure'));
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_state_local_locked, "value", null);
            $.$mol_state_local = $mol_state_local_locked;
            const app = $$.$bog_gamengine_studio.make({ $ });
            const edited = app.source().replace('\\Герой', '\\Крошка');
            app.source(edited);
            $mol_assert_equal(app.source(), edited);
            $mol_assert_ok(row_of(app, 'Крошка') >= 0);
            $mol_assert_ok(app.kept_stat().startsWith('Браузер не сохраняет, вынимайте файлом'));
            $mol_assert_ok(app.source_uri().length > 0);
        },
        'footer says the work lies in the browser while saving goes through'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.source_key = () => 'bog_gamengine_studio_source_test_stat';
            app.source(app.source());
            $mol_assert_ok(app.kept_stat().startsWith('Браузер этой машины'));
        },
        'editor without kept source starts from the sample'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.source_key = () => 'bog_gamengine_studio_source_test_empty';
            $mol_assert_equal(app.source(), $bog_gamengine_studio_sample);
        },
        'source uri carries the document and asks to be saved as a tree file'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.source_key = () => 'bog_gamengine_studio_source_test_uri';
            const uri = app.source_uri();
            $mol_assert_ok(uri.startsWith('data:text/plain;charset=utf-8,'));
            $mol_assert_equal(decodeURIComponent(uri.slice('data:text/plain;charset=utf-8,'.length)), app.source());
            $mol_assert_equal(app.Save().file_name(), 'scene.view.tree');
        },
        'name typed into the inspector renames the node in the tree and in the source'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            pick(app, 'Герой');
            app.Name_string().value('Крошка');
            $mol_assert_equal(app.row_title(row_of(app, 'Крошка')), 'Крошка');
            $mol_assert_ok(app.source().includes('name \\Крошка\n'));
            $mol_assert_not(app.source().includes('name \\Герой\n'));
        },
        'cleared name falls the node back to its declaration name'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            pick(app, 'Герой');
            app.Name_string().value('');
            $mol_assert_equal(app.node_name(), '');
            $mol_assert_not(app.source().includes('name \\Герой'));
        },
        'name hint shows what the node is called now'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.selected(row_of_name(app, 'Coin'));
            $mol_assert_equal(app.node_hint(), 'Монета');
        },
        'form has no name field while nothing is selected'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            $mol_assert_equal(app.fields().length, 0);
            pick(app, 'Герой');
            $mol_assert_equal(app.fields()[0], app.Name_field());
        },
        'delete button takes the selected node out of the scene and drops the selection'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.selected(row_of_name(app, 'Coin'));
            app.Node_drop().click(null);
            $mol_assert_ok(row_of(app, 'Монета') < 0);
            $mol_assert_equal(app.selected(), null);
            $mol_assert_not(app.source().includes('Монета'));
        },
        'duplicate button copies the node and selects the copy'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            const at = row_of_name(app, 'Coin');
            app.selected(at);
            app.Node_dup().click(null);
            $mol_assert_equal(app.Doc().nodes().filter(row => row.title === 'Монета').length, 2);
            $mol_assert_ok(app.selected() !== at);
            $mol_assert_equal(app.row_title(app.selected() ?? -1), 'Монета');
        },
        'delete leaves the atlas and the map of the scene alone'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.selected(row_of_name(app, 'Coin'));
            app.Node_drop().click(null);
            $mol_assert_ok(app.source().includes('Atlas $bog_gamengine_atlas'));
            $mol_assert_ok(app.source().includes('\\######'));
            $mol_assert_equal(Object.keys(app.palette()), ['#', '.']);
        },
        'inspector shows no delete and no duplicate while nothing is selected'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            $mol_assert_equal(app.form_foot().length, 0);
            pick(app, 'Герой');
            $mol_assert_equal(app.form_foot(), [app.Node_dup(), app.Node_drop()]);
        },
        'delete key drops the selected node'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.selected(row_of_name(app, 'Coin'));
            app.Delete_key().keydown({ keyCode: 46, target: { tagName: 'BUTTON' } });
            $mol_assert_ok(row_of(app, 'Монета') < 0);
            $mol_assert_not(app.source().includes('Монета'));
        },
        'delete key typed into a field leaves the node alone'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.selected(row_of_name(app, 'Coin'));
            for (const tag of ['INPUT', 'TEXTAREA']) {
                app.Delete_key().keydown({ keyCode: 46, target: { tagName: tag } });
            }
            $mol_assert_ok(row_of(app, 'Монета') >= 0);
            $mol_assert_ok(app.source().includes('Монета'));
        },
        'delete key does nothing while the game is playing'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.selected(row_of_name(app, 'Coin'));
            app.play();
            app.Delete_key().keydown({ keyCode: 46, target: { tagName: 'BUTTON' } });
            $mol_assert_ok(row_of(app, 'Монета') >= 0);
        },
        'undo returns the document to the state before the edit, redo brings it back'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            const before = app.source();
            pick(app, 'Герой');
            app.Vec_num('pos_0').value(7);
            $mol_assert_ok(app.source().includes('\t\t\tpos / 7 '));
            app.undo();
            $mol_assert_equal(app.source(), before);
            $mol_assert_ok(row_of(app, 'Герой') >= 0);
            app.redo();
            $mol_assert_ok(app.source().includes('\t\t\tpos / 7 '));
        },
        'undo takes back a deleted node'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.selected(row_of_name(app, 'Coin'));
            app.Node_drop().click(null);
            $mol_assert_ok(row_of(app, 'Монета') < 0);
            app.undo();
            $mol_assert_ok(row_of(app, 'Монета') >= 0);
        },
        'two edits within the pause give one step of history'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            const before = app.source();
            app.source(before.replace('\\Герой', '\\Первый'));
            app.source(app.source().replace('\\Первый', '\\Второй'));
            $mol_assert_equal(app.history.length, 1);
            app.undo();
            $mol_assert_equal(app.source(), before);
        },
        'pointer gesture holds the history window open until the pointer is up'($) {
            const app = canvas_app($);
            app.pointer_down(press_at(5, 5));
            $mol_assert_equal(app.history_gesture, true);
            app.pointer_up(press_at(5, 5));
            $mol_assert_equal(app.history_gesture, false);
        },
        'one undo takes the whole gesture, not a frame of it'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            pick(app, 'Герой');
            const before = app.source();
            app.history_gesture = true;
            app.history_taken = false;
            for (const x of [3, 4, 5])
                app.write('pos', [x, 0, 0]);
            app.history_gesture = false;
            $mol_assert_ok(app.source().includes('pos / 5 0 0'));
            $mol_assert_equal(app.history.length, 1);
            app.undo();
            $mol_assert_equal(app.source(), before);
        },
        'a held session of many clicks gives one step of history'($) {
            const app = canvas_app($);
            pick(app, 'Герой');
            const before = app.source();
            app.history_hold(true);
            for (const x of [3, 4, 5]) {
                app.pointer_down(press_at(5, 5));
                app.pointer_up(press_at(5, 5));
                pick(app, 'Герой');
                app.write('pos', [x, 0, 0]);
            }
            app.history_hold(false);
            $mol_assert_ok(app.source().includes('pos / 5 0 0'));
            $mol_assert_equal(app.history.length, 1);
            app.undo();
            $mol_assert_equal(app.source(), before);
        },
        'undo button is dark while there is nothing to undo'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            $mol_assert_equal(app.can_undo(), false);
            $mol_assert_equal(app.can_redo(), false);
            $mol_assert_equal(app.undo_stat(), 'Отмена: отменять нечего');
            pick(app, 'Герой');
            app.Vec_num('pos_0').value(7);
            $mol_assert_equal(app.can_undo(), true);
            $mol_assert_equal(app.undo_stat(), 'Отмена: 1 шаг, до перезагрузки');
            app.undo();
            $mol_assert_equal(app.can_undo(), false);
            $mol_assert_equal(app.can_redo(), true);
        },
        'history forgets the oldest step when it is full'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.history_depth = () => 2;
            pick(app, 'Герой');
            for (const x of [1, 2, 3, 4]) {
                app.history_at = 0;
                app.Vec_num('pos_0').value(x);
            }
            $mol_assert_equal(app.history.length, 2);
            $mol_assert_equal(app.undo_stat(), 'Отмена: 2 шага, до перезагрузки');
        },
        'shared document leaves undo to the base'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            pick(app, 'Герой');
            app.Vec_num('pos_0').value(7);
            app.doc_land = () => ({});
            $mol_assert_equal(app.can_undo(), false);
            $mol_assert_equal(app.undo_stat(), 'Отмена у Базы: документ общий');
        },
        'ctrl z typed into a field leaves the document to the browser'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            pick(app, 'Герой');
            app.Vec_num('pos_0').value(7);
            const typed = app.source();
            app.Undo_key().keydown({ keyCode: 90, ctrlKey: true, target: { tagName: 'TEXTAREA' } });
            $mol_assert_equal(app.source(), typed);
            app.Undo_key().keydown({ keyCode: 90, ctrlKey: true, target: { tagName: 'BUTTON' } });
            $mol_assert_not(app.source().includes('pos / 7 0 0'));
        },
        'gizmo hit on the x arrow'($) {
            $mol_assert_equal($bog_gamengine_studio_gizmo_hit(0.7, 0.05, 1), 'x');
        },
        'gizmo hit on the y arrow'($) {
            $mol_assert_equal($bog_gamengine_studio_gizmo_hit(-0.05, 0.9, 1), 'y');
        },
        'gizmo hit on the box'($) {
            $mol_assert_equal($bog_gamengine_studio_gizmo_hit(0.1, -0.1, 1), 'xy');
        },
        'gizmo miss'($) {
            $mol_assert_equal($bog_gamengine_studio_gizmo_hit(0.5, 0.5, 1), null);
        },
        'wheel up zooms in, wheel down zooms out, line mode counts as pixels'($) {
            $mol_assert_ok($bog_gamengine_studio_zoom_factor(-100) > 1);
            $mol_assert_ok($bog_gamengine_studio_zoom_factor(100) < 1);
            $mol_assert_equal($bog_gamengine_studio_zoom_factor(-3, 1), $bog_gamengine_studio_zoom_factor(-48));
        },
        'wheel keeps the world point under the cursor'($) {
            const app = canvas_app($);
            const before = spot_at(app, 500, 700);
            app.wheel(wheel_at(-240, 500, 700));
            const after = spot_at(app, 500, 700);
            $mol_assert_ok(app.Cam().zoom() > 1);
            $mol_assert_ok(Math.abs(after[0] - before[0]) < 1e-4);
            $mol_assert_ok(Math.abs(after[1] - before[1]) < 1e-4);
        },
        'zoom stops at the camera limits'($) {
            const app = canvas_app($);
            for (let i = 0; i < 40; ++i)
                app.wheel(wheel_at(-400, 300, 400));
            $mol_assert_equal(app.Cam().zoom(), app.Cam().zoom_max());
            for (let i = 0; i < 80; ++i)
                app.wheel(wheel_at(400, 300, 400));
            $mol_assert_equal(app.Cam().zoom(), app.Cam().zoom_min());
        },
        'middle button drag pans the camera by the grabbed distance'($) {
            const app = canvas_app($);
            const from = spot_at(app, 300, 400);
            const to = spot_at(app, 400, 500);
            app.pointer_down(press_at(300, 400, 1));
            app.pointer_move(press_at(400, 500, 1));
            app.pointer_up(press_at(400, 500, 1));
            const pos = app.Cam().pos();
            $mol_assert_ok(Math.abs(pos[0] - (from[0] - to[0])) < 1e-4);
            $mol_assert_ok(Math.abs(pos[1] - (from[1] - to[1])) < 1e-4);
        },
        'drag on empty space pans, drag started on a node does not'($) {
            const app = canvas_app($);
            app.pointer_down(press_at(10, 10));
            app.pointer_move(press_at(120, 120));
            app.pointer_up(press_at(120, 120));
            const panned = app.Cam().pos()[0];
            $mol_assert_ok(panned !== 0);
            const node = hero(app);
            const seen = app.Point().screen(new Float32Array(3), node.pos());
            app.pointer_down(press_at(seen[0], seen[1]));
            app.pointer_move(press_at(seen[0] + 60, seen[1] + 60));
            app.pointer_up(press_at(seen[0] + 60, seen[1] + 60));
            $mol_assert_equal(app.Cam().pos()[0], panned);
        },
        'fit brings every node of the scene into the view'($) {
            const app = canvas_app($);
            app.place('bog/gamengine/demo/atlas/floor.png', [40, -30, 0]);
            app.fit();
            const bounds = $bog_gamengine_studio_bounds(app.Scene().nodes(), new Float32Array(4));
            const cam = app.Cam();
            const half = cam.height() / cam.zoom() / 2;
            const aspect = app.draw_width() / app.draw_height();
            const pos = cam.pos();
            $mol_assert_ok(bounds[0] >= pos[0] - half * aspect);
            $mol_assert_ok(bounds[2] <= pos[0] + half * aspect);
            $mol_assert_ok(bounds[1] >= pos[1] - half);
            $mol_assert_ok(bounds[3] <= pos[1] + half);
        },
        'grid snapping rounds to the step, and without it to a thousandth'($) {
            $mol_assert_equal($bog_gamengine_studio_grid_value(-4.500001, 0.5), -4.5);
            $mol_assert_equal($bog_gamengine_studio_grid_value(5.3, 0.5), 5.5);
            $mol_assert_equal($bog_gamengine_studio_grid_value(5.3000001907, 0), 5.3);
        },
        'click puts the node on the grid without a tail of digits'($) {
            const app = canvas_app($);
            app.Asset_row('bog/gamengine/demo/atlas/floor.png').checked(true);
            app.pointer_down(press_at(293, 517));
            const pos = app.Scene().nodes()[app.Scene().nodes().length - 1].pos();
            $mol_assert_equal(pos[0], app.grid_value(pos[0]));
            $mol_assert_equal(pos[1], app.grid_value(pos[1]));
            $mol_assert_not(/\d\.\d{4,}/.test(app.source()));
        },
        'click without snapping keeps the point but drops the float tail'($) {
            const app = canvas_app($);
            app.Grid().checked(false);
            app.Asset_row('bog/gamengine/demo/atlas/floor.png').checked(true);
            const at = spot_at(app, 293, 517);
            app.pointer_down(press_at(293, 517));
            const pos = app.Scene().nodes()[app.Scene().nodes().length - 1].pos();
            $mol_assert_ok(Math.abs(pos[0] - at[0]) < 1e-3);
            $mol_assert_not(/\d\.\d{4,}/.test(app.source()));
        },
        'gizmo drag writes a snapped position'($) {
            const app = canvas_app($);
            pick(app, 'Герой');
            const node = hero(app);
            const was = node.pos()[0];
            const seen = app.Point().screen(new Float32Array(3), node.pos());
            app.pointer_down(press_at(seen[0], seen[1]));
            app.pointer_move(press_at(seen[0] + 97, seen[1] - 53));
            app.pointer_up(press_at(seen[0] + 97, seen[1] - 53));
            const pos = hero(app).pos();
            $mol_assert_ok(pos[0] !== was);
            $mol_assert_equal(pos[0], app.grid_value(pos[0]));
            $mol_assert_not(/\d\.\d{4,}/.test(app.source()));
        },
        'taking the brush drops the picked asset instead of losing the stroke'($) {
            const app = canvas_app($);
            app.Asset_row('bog/gamengine/demo/atlas/floor.png').checked(true);
            $mol_assert_ok(app.placing());
            app.Tile('#').checked(true);
            app.Tools().value('cell');
            $mol_assert_not(app.placing());
            $mol_assert_not(app.Asset_row('bog/gamengine/demo/atlas/floor.png').checked());
            $mol_assert_ok(app.brushing());
            const before = app.node_rows().length;
            app.brush_down([1, 1]);
            app.brush_up([1, 1]);
            $mol_assert_equal(app.Doc().map()[1][1], '#');
            $mol_assert_equal(app.node_rows().length, before);
        },
        'taking an asset drops the brush instead of painting a cell'($) {
            const app = canvas_app($);
            app.Tile('#').checked(true);
            app.Tools().value('cell');
            $mol_assert_ok(app.brushing());
            app.Asset_row('bog/gamengine/demo/atlas/floor.png').checked(true);
            $mol_assert_not(app.brushing());
            $mol_assert_equal(app.Tools().value(), '');
            $mol_assert_not(app.Tile('#').checked());
            const before = app.node_rows().length;
            const map_before = app.Doc().map().map(row => row.join('')).join('\n');
            app.pointer_down(press_at(200, 300));
            $mol_assert_equal(app.node_rows().length, before + 1);
            $mol_assert_equal(app.Doc().map().map(row => row.join('')).join('\n'), map_before);
        },
        'picked class of the palette drops the brush too'($) {
            const app = canvas_app($);
            app.Tile('#').checked(true);
            app.Tools().value('cell');
            app.Kit_row('walker').checked(true);
            $mol_assert_not(app.brushing());
            $mol_assert_equal(app.kit(), 'walker');
        },
        'escape drops the tile under the brush as well'($) {
            const app = canvas_app($);
            app.Tile('#').checked(true);
            app.Tools().value('cell');
            app.tool_drop();
            $mol_assert_equal(app.tile_char(), '');
            $mol_assert_not(app.Tile('#').checked());
        },
        'picked asset stays picked and puts a copy on every click'($) {
            const app = canvas_app($);
            const before = app.node_rows().length;
            app.Asset_row('bog/gamengine/demo/atlas/floor.png').checked(true);
            app.pointer_down(press_at(200, 300));
            $mol_assert_ok(app.placing());
            app.pointer_down(press_at(260, 360));
            app.pointer_down(press_at(320, 420));
            $mol_assert_equal(app.node_rows().length, before + 3);
            $mol_assert_ok(app.placing());
        },
        'escape drops both the tile tool and the picked asset'($) {
            const app = canvas_app($);
            app.Asset_row('bog/gamengine/demo/atlas/floor.png').checked(true);
            app.Tile('#').checked(true);
            app.tool('cell');
            app.tool_drop();
            $mol_assert_equal(app.tool(), '');
            $mol_assert_not(app.placing());
        },
        'after fit every node can be reached by the mouse inside the canvas'($) {
            const app = canvas_app($);
            app.place('bog/gamengine/demo/atlas/floor.png', [40, -30, 0]);
            app.fit();
            const seen = new Float32Array(3);
            for (const node of app.Scene().nodes()) {
                app.Point().screen(seen, node.pos());
                $mol_assert_ok(seen[0] >= 0 && seen[0] <= app.draw_width());
                $mol_assert_ok(seen[1] >= 0 && seen[1] <= app.draw_height());
            }
        },
        'fit shows the whole tile map of a scene made of tiles alone'($) {
            const app = canvas_app($);
            app.source($bog_gamengine_studio_sample_tiles);
            app.fit();
            const rows = app.tile_grid().rows();
            const cam = app.Cam();
            const half = cam.height() / cam.zoom() / 2;
            const aspect = app.draw_width() / app.draw_height();
            const pos = cam.pos();
            $mol_assert_ok(cam.zoom() !== 1);
            $mol_assert_ok(pos[0] - half * aspect <= 0 && pos[0] + half * aspect >= rows[0].length);
            $mol_assert_ok(pos[1] - half <= -rows.length && pos[1] + half >= 0);
        },
        'picked asset drops the picked class of the palette'($) {
            const app = canvas_app($);
            app.Kit_row('walker').checked(true);
            $mol_assert_equal(app.kit(), 'walker');
            app.Asset_row('bog/gamengine/demo/atlas/floor.png').checked(true);
            $mol_assert_equal(app.kit(), null);
            $mol_assert_ok(app.placing());
        },
        'export links hand out the module the document turns into'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            $mol_assert_equal(app.klass(), '$bog_gamengine_studio_sample');
            $mol_assert_equal(app.module_tree_name(), 'sample.view.tree');
            $mol_assert_equal(app.module_ts_name(), 'sample.view.ts');
            const made = app.module();
            $mol_assert_ok(made.tree.includes('pos? <=> Hero_pos? Float32Array'));
            $mol_assert_ok(made.ts.includes('Hero_pos( next?: Float32Array ) {'));
            $mol_assert_not(/^\t+pos \/ /m.test(made.tree));
            $mol_assert_equal(decodeURIComponent(app.module_tree_uri().replace(/^data:[^,]*,/, '')), made.tree);
            $mol_assert_equal(decodeURIComponent(app.module_ts_uri().replace(/^data:[^,]*,/, '')), made.ts);
        },
        'export names follow the class typed by hand and stop on a bad one'($) {
            const app = $$.$bog_gamengine_studio.make({ $ });
            app.Klass().value('$bog_myapp_level');
            $mol_assert_equal(app.module_tree_name(), 'level.view.tree');
            $mol_assert_ok(app.module().tree.split('\n')[0].startsWith('$bog_myapp_level $'));
            $mol_assert_ok(app.module().ts.includes('export class $bog_myapp_level extends $.$bog_myapp_level {'));
            app.Klass().value('level');
            $mol_assert_equal(app.module(), null);
            $mol_assert_equal(app.module_tree_uri(), '');
        },
        'fit of a wide map zooms out, fit of one sprite zooms in'($) {
            const wide = canvas_app($);
            wide.fit();
            const first = wide.Cam().zoom();
            wide.place('bog/gamengine/demo/atlas/floor.png', [40, -30, 0]);
            wide.fit();
            $mol_assert_ok(wide.Cam().zoom() < first);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_demo_crumb_rule_stage(spots) {
        const hero = new $bog_gamengine_node;
        hero.pos(new Float32Array([0, 0, 0]));
        const crumbs = spots.map(spot => {
            const crumb = new $bog_gamengine_node;
            crumb.pos(new Float32Array([spot[0], spot[1], 0]));
            return crumb;
        });
        const rule = new $bog_gamengine_demo_crumb_rule;
        rule.hero(hero);
        rule.crumbs(crumbs);
        return { hero, crumbs, rule };
    }
    $mol_test({
        'crumb under the hero is taken and hidden'() {
            const { hero, crumbs, rule } = $bog_gamengine_demo_crumb_rule_stage([[0.2, 0], [5, 5]]);
            rule.step(0.1);
            $mol_assert_equal(rule.taken(), 1);
            $mol_assert_equal(crumbs[0].hidden, true);
            $mol_assert_equal(crumbs[1].hidden, false);
            $mol_assert_equal(rule.left(), 1);
            $mol_assert_equal(hero.hidden, false);
        },
        'all crumbs taken is a win'() {
            const { hero, rule } = $bog_gamengine_demo_crumb_rule_stage([[0.2, 0], [3, 0]]);
            rule.step(0.1);
            $mol_assert_equal(rule.won(), false);
            hero.pos(new Float32Array([3, 0, 0]));
            rule.step(0.1);
            $mol_assert_equal(rule.won(), true);
            $mol_assert_equal(rule.over(), true);
            $mol_assert_equal(rule.lost(), false);
        },
        'time over without all crumbs is a loss'() {
            const { rule } = $bog_gamengine_demo_crumb_rule_stage([[5, 5]]);
            rule.limit(2);
            rule.step(1);
            $mol_assert_equal(rule.lost(), false);
            $mol_assert_equal(rule.rest(), 1);
            rule.step(1);
            $mol_assert_equal(rule.rest(), 0);
            $mol_assert_equal(rule.lost(), true);
        },
        'restart brings the crumbs back'() {
            const { crumbs, rule } = $bog_gamengine_demo_crumb_rule_stage([[0.2, 0]]);
            rule.step(0.1);
            $mol_assert_equal(rule.won(), true);
            rule.restart();
            $mol_assert_equal(rule.taken(), 0);
            $mol_assert_equal(rule.spent(), 0);
            $mol_assert_equal(crumbs[0].hidden, false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_demo_crumb2_rule_stage(spots) {
        const hero = new $bog_gamengine_node;
        hero.pos(new Float32Array([0, 0, 0]));
        const crumbs = spots.map(spot => {
            const crumb = new $bog_gamengine_node;
            crumb.pos(new Float32Array([spot[0], spot[1], 0]));
            return crumb;
        });
        const rule = new $bog_gamengine_demo_crumb2_rule;
        rule.hero(hero);
        rule.crumbs(crumbs);
        return { hero, crumbs, rule };
    }
    $mol_test({
        'crumb under the hero is taken and hidden'() {
            const { hero, crumbs, rule } = $bog_gamengine_demo_crumb2_rule_stage([[0.2, 0], [5, 5]]);
            rule.step(0.1);
            $mol_assert_equal(rule.taken(), 1);
            $mol_assert_equal(crumbs[0].hidden, true);
            $mol_assert_equal(crumbs[1].hidden, false);
            $mol_assert_equal(rule.left(), 1);
            $mol_assert_equal(hero.hidden, false);
        },
        'all crumbs taken is a win'() {
            const { hero, rule } = $bog_gamengine_demo_crumb2_rule_stage([[0.2, 0], [3, 0]]);
            rule.step(0.1);
            $mol_assert_equal(rule.won(), false);
            hero.pos(new Float32Array([3, 0, 0]));
            rule.step(0.1);
            $mol_assert_equal(rule.won(), true);
            $mol_assert_equal(rule.over(), true);
            $mol_assert_equal(rule.lost(), false);
        },
        'time over without all crumbs is a loss'() {
            const { rule } = $bog_gamengine_demo_crumb2_rule_stage([[5, 5]]);
            rule.limit(2);
            rule.step(1);
            $mol_assert_equal(rule.lost(), false);
            $mol_assert_equal(rule.rest(), 1);
            rule.step(1);
            $mol_assert_equal(rule.rest(), 0);
            $mol_assert_equal(rule.lost(), true);
        },
        'restart brings the crumbs back'() {
            const { crumbs, rule } = $bog_gamengine_demo_crumb2_rule_stage([[0.2, 0]]);
            rule.step(0.1);
            $mol_assert_equal(rule.won(), true);
            rule.restart();
            $mol_assert_equal(rule.taken(), 0);
            $mol_assert_equal(rule.spent(), 0);
            $mol_assert_equal(crumbs[0].hidden, false);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    class $bog_gamengine_demo_crumb2_time_mock extends $mol_state_time {
        static stamp(next = 0) {
            return next;
        }
        static now(precision) {
            return this.stamp();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_crumb2_time_mock, "stamp", null);
    function $bog_gamengine_demo_crumb2_test_run($, key, ticks) {
        $.$mol_state_time = $bog_gamengine_demo_crumb2_time_mock;
        const app = $$.$bog_gamengine_demo_crumb2.make({ $ });
        $bog_gamengine_demo_crumb2_time_mock.stamp(0);
        app.Scene().step();
        app.Key().keys()[key](true);
        for (let tick = 1; tick <= ticks; ++tick) {
            $bog_gamengine_demo_crumb2_time_mock.stamp(tick * 16);
            app.Scene().step();
        }
        return app;
    }
    $mol_test({
        'hero walks right while D is held'($) {
            const app = $bog_gamengine_demo_crumb2_test_run($, 'D', 20);
            $mol_assert_ok(app.hero().pos()[0] > 1);
        },
        'wall of the painted map stops the hero'($) {
            const app = $bog_gamengine_demo_crumb2_test_run($, 'D', 400);
            $mol_assert_ok(app.hero().pos()[0] < 5);
        },
        'five crumbs are counted at the start'($) {
            const app = $$.$bog_gamengine_demo_crumb2.make({ $ });
            $mol_assert_equal(app.crumbs().length, 5);
            $mol_assert_equal(app.Rule().left(), 5);
        },
        'crumb under the hero is taken'($) {
            const app = $$.$bog_gamengine_demo_crumb2.make({ $ });
            app.hero().pos(new Float32Array(app.crumbs()[0].pos()));
            app.Rule().step(0.1);
            $mol_assert_equal(app.Rule().left(), 4);
        },
        'every crumb taken is a win'($) {
            const app = $$.$bog_gamengine_demo_crumb2.make({ $ });
            for (const crumb of app.crumbs()) {
                app.hero().pos(new Float32Array(crumb.pos()));
                app.Rule().step(0.1);
            }
            $mol_assert_ok(app.Rule().won());
            $mol_assert_equal(app.end_title(), 'Победа');
        },
        'time over without crumbs is a loss'($) {
            const app = $$.$bog_gamengine_demo_crumb2.make({ $ });
            app.Rule().spent(app.Rule().limit());
            $mol_assert_ok(app.Rule().lost());
            $mol_assert_equal(app.end_title(), 'Время вышло');
        },
    });
})($ || ($ = {}));


//# sourceMappingURL=web.test.js.map
