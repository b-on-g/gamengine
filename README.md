# $bog_gamestudio

Редактор сцен для `bog/gamengine`. Документ сцены это текст `view.tree`, редактор компилирует его штатным компилятором мола прямо в браузере через `new Function`, поэтому странице редактора нужен `unsafe-eval`: `index.html` без `Content-Security-Policy`, а на своём хостинге в `script-src` добавляйте `'unsafe-eval'`.
