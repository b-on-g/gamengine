# $bog_gamengine — с чего начать

Как сделать на движке свою игру. Решения и внутренности в [ARCHITECTURE.md](./ARCHITECTURE.md),
правила кода в [STYLE.md](./STYLE.md), сравнение с Godot и Bevy в [COMPARE.md](./COMPARE.md).

Весь код здесь взят из работающих игр: платформер `bog/jumper`, шутер `bog/shooter`,
стратегия `bog/legion` и демки `bog/gamengine/demo`. Под каждым куском написано, откуда он.

---

## Первая игра: едущий спрайт

Четыре шага, после каждого есть что проверить.

### Шаг 1. Дерево MAM и дев-сервер

```bash
git clone https://github.com/hyoo-ru/mam.git
cd mam
npm install
npm start
```

`npm start` поднимает дев-сервер на `localhost:9080`. Он собирает модуль по запросу за
секунды: открыл адрес — получил свежий бандл. Руками ничего собирать не надо.

Движок и игры лежат в том же дереве, каждый пак это папка первого уровня: `bog/gamengine`,
`bog/jumper`. Свою игру заводим там же.

**Проверка:** `http://localhost:9080/bog/gamengine/demo/` открывает демки движка.

### Шаг 2. Пустой пак

Четыре файла. Имя класса это путь к папке, поэтому `$bog_mygame_app` живёт в
`bog/mygame/app/`, а подчёркивание в имени всегда означает папку.

`bog/mygame/app/index.html`:

```html
<!doctype html>
<html lang="ru" mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
		<title>Моя игра</title>
	</head>
	<body mol_view_root="$bog_mygame_app">
		<script src="web.js" charset="utf-8"></script>
	</body>
</html>
```

`bog/mygame/app/app.view.tree`:

```tree
$bog_mygame_app $mol_page
	title \Моя игра
	body /
		<= Draw $bog_gamengine_draw
			scene <= Scene
			cam <= Cam
			stat => stat
	foot /
		<= Stat $mol_view
			sub / <= stat
	Clock $bog_gamengine_clock
	Scene $bog_gamengine_scene
		clock <= Clock
		kids <= nodes /
	Cam $bog_gamengine_cam_flat
		height 8
```

Панель `draw` **никогда не корень страницы**: корневой класс получает `<body>`, а холсту
нужен настоящий `<canvas>`. Поэтому корень это `$mol_page`, а `Draw` лежит в `body`
(архитектура, грабля 3.7).

`bog/mygame/app/app.view.ts`:

```ts
namespace $.$$ {

	export class $bog_mygame_app extends $.$bog_mygame_app {

		@ $mol_mem
		nodes() {
			return []
		}

	}

}
```

**Проверка:** `curl -s localhost:9080/bog/mygame/app/-/web.audit.js` печатает `Audit passed`.
Страница `http://localhost:9080/bog/mygame/app/` показывает пустой холст и счётчик кадров
в подвале. Счётчик идёт — значит цикл живой.

### Шаг 3. Спрайт на экране

Картинки атласа это квадраты одного размера, один кадр анимации это один слой
(архитектура, грабля 3.3). Пока возьмём готовую картинку движка, свои заведём в шаге 5.

В `app.view.tree` добавляем атлас и спрайт:

```tree
	Atlas $bog_gamengine_atlas
		uris /
			\bog/gamengine/demo/atlas/hero.png
		size 64
	Hero_sprite $bog_gamengine_sprite
		atlas <= Atlas
		frame \hero
```

и отдаём спрайт сцене:

```ts
		@ $mol_mem
		nodes() {
			return [ this.Hero_sprite() ]
		}
```

Батч заводить не нужно: сцена сама группирует узлы по шейдеру, фигуре и атласу. Явный
`batches /` нужен, только когда группировкой хочется управлять руками.

**Проверка:** на холсте герой в центре. Если холст пустой, смотри в подвал: пока атлас
грузится, рисовать нечего.

### Шаг 4. Спрайт поехал

Поведение это метод `step( dt )` у узла, а не колбэк в дереве. `dt` в секундах, скорость
в единицах мира в секунду; число «за кадр» в коде это ошибка.

`bog/mygame/hero/hero.ts`:

```ts
namespace $ {

	export class $bog_mygame_hero extends $bog_gamengine_node {

		@ $mol_mem
		speed( next = 2 ) {
			return next
		}

		step( dt: number ) {
			const pos = this.pos()
			const next = new Float32Array( 3 )
			next[ 0 ] = pos[ 0 ] + this.speed() * dt
			next[ 1 ] = pos[ 1 ]
			next[ 2 ] = pos[ 2 ]
			this.pos( next )
		}

	}

}
```

Узел с логикой и спрайт это разные вещи: спрайт вешается на узел через `parent` и едет
за ним. Так сделано во всех трёх играх.

```tree
	Hero $bog_mygame_hero
		pos? <=> hero_pos? Float32Array
	Hero_sprite $bog_gamengine_sprite
		parent <= Hero
		atlas <= Atlas
		frame \hero
```

```ts
		@ $mol_mem
		hero_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ -3, 0, 0 ])
		}

		@ $mol_mem
		nodes() {
			return [ this.Hero(), this.Hero_sprite() ]
		}
```

Двусторонняя стрелка `<=>` у `pos` обязательна. С односторонним `pos <= hero_pos`
свойство становится геттером, запись из `step` глотается без ошибки, и узел считает
скорость, рисуется, но стоит на месте.

**Проверка:** герой едет вправо и уезжает за край. В ноде это видно без браузера:

```bash
curl -s -o /dev/null localhost:9080/bog/mygame/app/-/node.js
node -e "
const \$ = require( './bog/mygame/app/-/node.js' )
const hero = new \$.\$bog_mygame_hero
hero.step( 0.5 )
console.log( Array.from( hero.pos() ) )
"
```

Печатает `[ 1, 0, 0 ]`.

---

## Карта и столкновения

Уровень это строки символов прямо в дереве. `$bog_gamengine_phys_tile` разбирает их и
знает, какие символы твёрдые.

Из `bog/jumper/app/app.view.tree`:

```tree
	map \
		\........................................
		\....o........#..E..#....xx....o.........
		\########################################
	Tile $bog_gamengine_phys_tile
		map <= map
		solid \#=
```

Карта даёт не только стены. `ids( '#' )` отдаёт список ячеек с этим символом в виде
`x_y`, `spot_pos( id, lift, out )` переводит ячейку в точку мира. Так расставляют стены,
монеты и точки появления, не дублируя координаты в коде.

Для объёмных игр у карты есть `plane \xz`: тогда строка идёт по Z, а не вниз по Y.

Физика включается отдельным узлом в сцене, тела это узлы, наследующие
`$bog_gamengine_phys_body`:

```tree
	Scene $bog_gamengine_scene
		clock <= Clock
		input <= Input
		kids <= nodes /
		phys <= Phys $bog_gamengine_phys
			bodies <= bodies /
			tile <= Tile
```

Тело задаёт размер и скорость, а столкновения ловит методом `hit`. Из
`bog/jumper/hero/hero.ts`:

```ts
	export class $bog_jumper_hero extends $bog_gamengine_phys_body {

		@ $mol_mem
		size( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0.8, 0.8 ])
		}

		step( dt: number ) {
			const input = this.input()
			const vel = this.vel()
			if( !input || this.frozen() ) return
			const ground = this.on_ground()
			const vx = input.axis( 'left', 'right' ) * this.speed()
			let vy = vel[ 1 ] - this.gravity() * dt
			if( ground && input.action( 'jump' ) ) {
				vy = this.jump_speed()
				this.sound()?.play( 'jump' )
			}
			const next = new Float32Array( 3 )
			next[ 0 ] = vx
			next[ 1 ] = vy
			next[ 2 ] = vel[ 2 ]
			this.vel( next )
		}

		hit( other: $bog_gamengine_phys_body | null ) {
			if( !other || this.frozen() ) return
			if( other instanceof $bog_jumper_item ) return this.take( other )
			if( other instanceof $bog_jumper_enemy ) this.clash( other )
		}

	}
```

Шаг пишет **скорость**, а не позицию: позицию двигает физика, она же разруливает стены.
`on_ground()`, `on_ceil()`, `on_wall()` отвечают на вопрос, во что тело упёрлось на
прошлом шаге.

Объёмная физика это отдельный мир `$bog_gamengine_phys3` с теми же правилами.

## Атлас и кадры анимации

Атлас это список картинок одного размера, слой на кадр. Из
`bog/gamengine/demo/flat/flat.view.tree`:

```tree
	Atlas $bog_gamengine_atlas
		uris /
			\bog/gamengine/demo/atlas/hero.png
			\bog/gamengine/demo/atlas/hero_1.png
			\bog/gamengine/demo/atlas/hero_2.png
			\bog/gamengine/demo/atlas/coin.png
		size 64
```

Имя слоя это имя файла без папки и расширения, оно же значение `frame`. Картинка не того
размера роняет атлас с внятной ошибкой, а не мажется молча.

Анимация это именованный набор кадров. Спрайт сам листает их по часам:

```tree
	Hero_sprite $bog_gamengine_sprite
		parent <= Hero
		atlas <= Atlas
		frame \hero
		flip_x <= hero_face_left
		clock <= Clock
		clip <= hero_clip
		fps 6
		clips *
			walk /
				\hero
				\hero_1
				\hero_2
				\hero_1
```

Кто играет, решает логика узла. Из `bog/gamengine/demo/flat/hero/hero.ts`:

```ts
			const clip = vx !== 0 || vy !== 0 ? 'walk' : ''
			if( this.clip() !== clip ) this.clip( clip )
```

Пустой `clip` означает неподвижный кадр из `frame`. `flip_x` разворачивает спрайт, второй
набор картинок для ходьбы влево не нужен.

Свои картинки кладут в пак рядом с приложением и перечисляют в `app.meta.tree`, иначе при
деплое их не будет. Из `bog/jumper/app/app.meta.tree`:

```tree
deploy \/bog/jumper/app/atlas/hero.png
deploy \/bog/jumper/app/sound/jump.wav
```

## Ввод

Клавиши, экранные кнопки и геймпад сводятся к именованным действиям. Игра спрашивает
«нажат ли jump», а не «нажат ли пробел».

Из `bog/jumper/app/app.view.tree`:

```tree
	Key $bog_gamengine_key
		bind *
			left /
				\A
				\left
			right /
				\D
				\right
			jump /
				\W
				\up
				\space
	Input $bog_gamengine_input
		key <= Key
		screen <= Screen
```

Клавиатуру слушает плагин на корневом виде, ему отдают карту клавиш:

```tree
	plugins /
		<= Control $mol_keyboard_state
			key <= key_map *
```

```ts
		key_map() {
			return this.Key().keys()
		}
```

Внутри `step` у узла есть два вопроса:

```ts
	const vx = input.axis( 'left', 'right' ) * this.speed()
	if( ground && input.action( 'jump' ) ) { … }
```

`axis` возвращает −1, 0 или 1, `action` возвращает флаг. Для телефона в `body` кладут
`$bog_gamengine_input_screen` и отдают его тому же `Input`: джойстик и кнопки появятся
поверх холста, а код узла не изменится.

Состояние ввода живёт в обычных полях, а не в атомах. Это не экономия, это необходимость:
атом, который читают только из `step`, мол сметает между кадрами (архитектура, раздел 5).

## Камера

Плоская камера это ортография, `height` задаёт, сколько единиц мира влезает по вертикали.
Из `bog/jumper/app/app.view.tree`:

```tree
	Cam $bog_gamengine_cam_flat
		height <= cam_height 12
		target <= Hero
		bounds <= cam_bounds Float32Array
```

`target` включает слежение за узлом, `bounds` не пускает камеру за края уровня:

```ts
		@ $mol_mem
		cam_bounds() {
			const level = this.Level()
			return new Float32Array([ 0, - level.height(), level.width(), 0 ])
		}
```

Камера это такой же узел сцены, её кладут в `kids` вместе со всеми. Свободная камера
умеет `pan( dx, dy )` и `zoom_at( factor, x, y )`, точка при этом мировая: про пиксели
холста камера не знает.

Для объёма есть `$bog_gamengine_cam_deep` с `fov`, `near` и `far`. Перевод экранных
координат в мир и луч под курсором делает `$bog_gamengine_point`, ему отдают камеру и
размер холста.

## Интерфейс поверх холста

HUD, меню и кнопки это обычный `view.tree`, никакого игрового слоя для них нет. Холст
лежит в `body` страницы, счётчики в `tools` и `foot`. Из `bog/jumper/app/app.view.tree`:

```tree
	tools /
		<= Lives $mol_labeler
			title \Жизни
			content / <= lives_stat \
	foot /
		<= Stat $mol_view
			sub / <= stat
```

Экран конца игры это ещё один `$mol_page`, который появляется в списке, когда игра
кончилась:

```ts
		@ $mol_mem
		game() {
			return [
				this.Draw(),
				this.Screen(),
				... this.over() ? [ this.End() ] : [],
			]
		}
```

Одна ловушка при вёрстке: `$mol_scroll` внутри `$mol_page` не тянет содержимое по высоте,
холст получает ноль пикселей и ничего не рисует. Лечится строкой в стилях
(`bog/jumper/app/app.view.css.ts`):

```ts
	$mol_style_define( $bog_jumper_app, {

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
			minHeight: '16rem',
		},

	} )
```

Статистику кадра `draw.stat()` держат в подвале с самого начала: когда игра начнёт
тормозить, она скажет, где именно.

## Звук

Сэмплы объявляют по именам, играют из логики. Из `bog/jumper`:

```tree
	Sound $bog_gamengine_sound
		uris *
			jump \bog/jumper/app/sound/jump.wav
			coin \bog/jumper/app/sound/coin.wav
			death \bog/jumper/app/sound/death.wav
```

```ts
	this.sound()?.play( 'jump' )
```

`play( name, pos )` со вторым аргументом даёт панораму и затухание по расстоянию, если
звуку отдать слушателя через `listener`. Фоновая музыка это `music( name )`.

Браузер не даёт звуку зазвучать до первого жеста пользователя, поэтому первый `play`
обычно приходится на клик или нажатие клавиши. Это не баг движка, лечению не подлежит.

---

## Куда смотреть дальше

**Читать код игр.** Они маленькие и полные: `bog/jumper` это платформер с физикой,
врагами и звуком, `bog/shooter` это объёмный шутер с лучами и генератором уровня,
`bog/legion` это стратегия с сотней юнитов, навигацией и свободной камерой. Демки движка
в `bog/gamengine/demo` короче игр и показывают по одной вещи.

**Что в движке уже есть**, кроме показанного выше:

- объём: `mesh`, `shape/gltf`, `light`, тени, PBR-материалы, туман;
- постобработка: тон-маппинг, свечение, виньетка;
- скелетная анимация (`skin`), частицы (`particle`), текст в мире (`text`),
  тайловая карта одним батчем (`tilemap`);
- навигация: A* по сетке и navmesh с порталами (`nav`), агенты с перепланированием;
- поведение: машина состояний и дерево поведения (`brain`);
- сохранения (`save`), сеть на Гипер Базе (`net`), бой (`combat`), геймпад (`pad`),
  полный экран и захват курсора (`screen`).

**Чего нет.** Движку несколько дней, API не стабилен и может поменяться. Нет ассет-стора,
сообщества и ответов на StackOverflow; вся документация это пять файлов в этом
репозитории. Экспорта никуда, кроме браузера, тоже нет: Tauri и PWA это тот же браузер.
Редактор сцен (`bog/gamestudio`) существует, но он моложе движка. Честное сравнение с
Godot и Bevy, включая то, в чём они сильнее, лежит в [COMPARE.md](./COMPARE.md), раздел 5.

**Перед тем как писать много кода**, прочитай [ARCHITECTURE.md](./ARCHITECTURE.md),
разделы 1 и 5: там про холодную и горячую зоны и про то, почему тысяча реактивных
объектов на кадр движок не потянет, а тысяча инстансов в буфере потянет. Это решение, на
которое опирается всё остальное, и оно объясняет большинство правил из
[STYLE.md](./STYLE.md).
