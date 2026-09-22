# S1. Две GL-программы в одном бандле

Грабля 3.1 подтвердилась и оказалась шире, чем записано в архитектуре.

## Механизм

`mol/build/build.node.ts:218-230`, `glslTranspile`: каждый `.glsl` файл бандла
превращается в `$mol_3d_glsl_vert += "..."` (по `.vert.`/`.frag.` в имени, иначе
`$mol_3d_glsl_both`). `mol/3d/context/context.ts:24-31`, `func()`: вершинный шейдер это
`$mol_3d_glsl_both + $mol_3d_glsl_vert + main`. Функция из `bad/b/b.vert.glsl` попадает
в программу `bad/a`, и наоборот.

## Ошибки (Chrome, SwiftShader)

Программа `bad/a`:

```
ERROR: 0:12: 'scale' : undeclared identifier
ERROR: 0:13: 'tone' : undeclared identifier
ERROR: 0:13: 'hue' : undeclared identifier
ERROR: 0:13: 'assign' : l-value required (can't modify a const)
```

Программа `bad/b`:

```
ERROR: 0:10: 'tint' : undeclared identifier
ERROR: 0:10: '=' : dimension mismatch
ERROR: 0:10: 'assign' : cannot convert from 'const highp float' to 'out highp 4-component vector of float'
```

Падают обе, не только вторая. Вершинный шейдер `a` тянет `scale`, `tone`, `hue` из
`b.vert.glsl`, фрагментный `b` тянет `tint` из `a.frag.glsl`. Очерёдность не важна:
падает любая программа, чей `face` не покрывает чужие функции.

## Обход

`good/good.ts`: точки входа строками в TS, сборка через
`context.program( face, $mol_3d_glsl_both + vert, $mol_3d_glsl_both + frag )`. Обе
программы компилируются, на холсте два квада: левый `(255,102,51)` это `tint`, правый
`(153,254,102)` это интерполяция атрибута `hue`.

`$mol_3d_glsl_vert` и `$mol_3d_glsl_frag` в `good` подмешивать нельзя. Проверено:
`good.left` с `$mol_3d_glsl_vert` в префиксе падает с тем же
`'scale' : undeclared identifier`, пока в бандле есть хоть один `.vert.glsl` с точкой
входа (здесь `bad/*`, в приложении это `bog/game/eye`). Безопасен только
`$mol_3d_glsl_both`: туда идут `.glsl` без `.vert.`/`.frag.` в имени, и пока там только
функции с аргументами, они компилируются в любом `face`.

## Вторая грабля: имя с `_` в `.glsl` это зависимость

`mol/build/build.node.ts:1651-1675`: dependor для `.glsl` каждый идентификатор вида
`[a-z]+_[a-z0-9]+` кроме `gl_*` считает путём модуля. `pipe_hue` в `b.vert.glsl` дал
`Root package "pipe" not found`, сборка встала. Поэтому в `bad/b` пайп назван `tone`, а в
TS-строке `good` тот же пайп спокойно зовётся `pipe_hue`.

Следствие для раздела 8: имена `inst_*`, `pipe_*` живут только в TS-строках. В
`glsl/*.glsl` имя функции с префиксом `bog_gamengine_` резолвится в сам пак и безвредно,
а параметры и локальные переменные там должны быть без подчёркиваний.

## Как смотреть

`localhost:9080/bog/gamengine/spike/s1/-/test.html`. Чекбокс `bad` переключает на
программы из `.glsl`: холст получает `mol_view_error`, в консоли ошибки выше.

Корень `$bog_gamengine_spike_s1` это `$mol_view` с чекбоксом и панелью
`$bog_gamengine_spike_s1_pane`, а не наследник `$mol_3d_pane`: `test.html` монтирует
корневой класс прямо на `<body>` (`mol/build/build.node.ts:967-971`, дальше
`$mol_view.roots` делает `view.dom_node( node )`), а панели нужен свой `<canvas>`.

Headless: `bog/probe` со своим `--disable-gpu` даёт `getContext( 'webgl2' ) === null`.
С `flags: [ '--use-angle=swiftshader', '--enable-unsafe-swiftshader' ]` контекст есть,
`readPixels` отдаёт цвета квадов. Пригодится S3.
