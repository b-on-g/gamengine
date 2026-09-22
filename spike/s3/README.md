# S3. WebGL2 в headless Chrome через `bog/probe`

Вопрос: рисует ли WebGL2 в headless Chrome, который поднимает `$bog_probe_run`, и с какими флагами.

Ответ: рисует, но только если снять программный рендер с тормоза. Штатный набор флагов пробы
содержит `--disable-gpu`, с ним `canvas.getContext( 'webgl2' )` возвращает `null`.
Любой из флагов `--use-angle=swiftshader` или `--enable-unsafe-swiftshader` включает SwiftShader,
и центр холста с красным квадом читается как `[ 255, 0, 0, 255 ]`.

## Стенд

- Chrome 153.0.8010.53, macOS, Apple M4 Pro.
- `spike/s3/quad`: `$bog_gamengine_spike_s3_quad` это `$mol_view` со вложенным
  `$bog_gamengine_spike_s3_quad_pane` (наследник `$mol_3d_pane`). Обёртка нужна потому, что
  `-/test.html` отдаёт корневому классу сам `<body>` как `dom_node`, а холсту нужен `<canvas>`.
- Точка входа шейдера строкой в TS через `context.program( face, ... )`, без `.glsl` файлов.
- Контекст берётся с `preserveDrawingBuffer: true`, чтобы `readPixels` из `Runtime.evaluate`
  читал уже нарисованный кадр, а не очищенный буфер.
- `spike/s3/probe`: `check()` открывает `quad/-/test.html`, ждёт `canvas.width > 0`, читает
  пиксель центра и `UNMASKED_RENDERER_WEBGL`.

## Замеры

Время это весь прогон `$bog_probe_run`: статика, старт Chrome, страница, `evaluate`.

| Флаги сверх штатных | `getContext( 'webgl2' )` | Центр | Рендерер | Время |
| --- | --- | --- | --- | --- |
| нет | `null` | нет | нет | 1.3–1.4 с |
| `--use-angle=swiftshader` | есть | `[ 255, 0, 0, 255 ]` | ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (LLVM 10.0.0) (0x0000C0DE)), SwiftShader driver) | 0.6–0.7 с |
| `--enable-unsafe-swiftshader` | есть | `[ 255, 0, 0, 255 ]` | тот же SwiftShader | 0.6–0.7 с |
| оба | есть | `[ 255, 0, 0, 255 ]` | тот же SwiftShader | 0.6 с |
| без `--disable-gpu`, без флагов | есть | `[ 255, 0, 0, 255 ]` | ANGLE (Apple, ANGLE Metal Renderer: Apple M4 Pro, Unspecified Version) | 0.8 с |
| без `--disable-gpu`, `--use-angle=swiftshader` | есть | `[ 255, 0, 0, 255 ]` | SwiftShader | 2.3 с |

Старт Chrome до готовой CDP-сессии: 380–420 мс, флаги на него не влияют.

Первый прогон без флагов дольше остальных на секунду: это прогрев профиля и Chrome, а не WebGL.

Снятие `--disable-gpu` даёт железный Metal и проходит на этой машине, но в CI без GPU
это непредсказуемо, а `--use-angle=swiftshader` даёт один и тот же рендерер везде.

## Рецепт для архитектуры, раздел 14

`$bog_probe_opts` получил поле `flags?: string[]`, оно дописывается к аргументам Chrome.
Штатный `--disable-gpu` остаётся, SwiftShader включается поверх него:

```ts
const got = await $bog_probe_run({
	page: 'bog/gamengine/draw/-/test.html',
	flags: [ '--use-angle=swiftshader' ],
	ready: `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`,
	script: `
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas.getContext( 'webgl2' )
		const pixel = new Uint8Array( 4 )
		gl.readPixels( canvas.width / 2 | 0, canvas.height / 2 | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel )
		return Array.from( pixel )
	`,
})
```

Условия, без которых пиксель будет чёрным или `readPixels` бросит:

- контекст холста создаётся с `preserveDrawingBuffer: true`, иначе после кадра буфер
  очищен и `readPixels` из `evaluate` читает нули;
- `ready` ждёт `canvas.width > 0`: атрибут выставляется в том же `render()`, где зовётся
  `paint()`, поэтому ненулевая ширина значит, что кадр уже нарисован;
- `--use-angle=swiftshader` и `--disable-gpu` вместе, тогда рендерер один и тот же на
  Mac и в CI.

Побочная находка: `-/test.html` сборщика без `<meta name="viewport">`, поэтому при
эмуляции ширины меньше 700 (`mobile: true` в пробе) страница раскладывается в 980 px,
холст получается 980×735 при запрошенных 640×480. На пиксель центра не влияет.

## Запуск

```
curl -s localhost:9080/bog/gamengine/spike/s3/quad/-/test.html -o /dev/null
curl -s -o /dev/null localhost:9080/bog/gamengine/spike/s3/probe/-/node.test.js
node bog/gamengine/spike/s3/probe/-/node.test.js
```

Отрицательный прогон: `check( root, [] )` без флагов падает с `центр не красный` и
`webgl: false`.
