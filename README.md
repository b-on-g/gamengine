# $bog_gamengine

Игровой движок на $mol: 2D и 3D на одном рендерере WebGL2 поверх `$mol_3d`,
сцена и правила игры на реактивных объектах, интерфейс игры на обычных `view.tree`.

Документы:

- [ARCHITECTURE.md](./ARCHITECTURE.md): принятые решения, модули, кадр, грабли `$mol_3d`.
- [PLAN.md](./PLAN.md): этапы, задачи под одного молера, приёмка.
- [STYLE.md](./STYLE.md): как писать код именно в этом паке.
- [COMPARE.md](./COMPARE.md): чем движок отличается от Godot и Bevy и когда что брать.

Демо: https://b-on-g.github.io/gamengine/ (страницы [quad](https://b-on-g.github.io/gamengine/#!demo=quad),
[flat](https://b-on-g.github.io/gamengine/#!demo=flat), [room](https://b-on-g.github.io/gamengine/#!demo=room)).
До вливания [mol#897](https://github.com/hyoo-ru/mam_mol/pull/897) сборка на CI берёт мол из форка `Dev-cmyser/mam_mol` через `meta` в workflow; после вливания эти две строки из `deploy.yml` убрать.

Управление: WASD и стрелки, Q/E поворот в комнате, клик по монете, звук после первого клика.

Единственная страница пака: `demo/index.html`. Донор кода: пак `bog/game`
(форк `hyoo-ru/game.hyoo.ru`), его `eye` это прототип модуля `draw`.
