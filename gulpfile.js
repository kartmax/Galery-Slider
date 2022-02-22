// Создаем глобальный обьект для использования в тасках
import gulp from 'gulp';
import { path } from './gulp/config/path.js';
global.global_app = {
   gulp : gulp,
   path : path,
   plugins : plugins,
   isBuild : process.argv.includes('--build'),
   isDev : !process.argv.includes('--build')
};

// Импорт плагинов
import { plugins } from './gulp/config/plugins.js';

// Импорт тасков
import { copy } from './gulp/tasks/copy.js';
import { clean } from './gulp/tasks/clean.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js, delLicencseTxt } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfTOttf, copyWoff2, ttfTOwoff, fontsStyle } from './gulp/tasks/fonts.js';
import { spritesvg, writeContentSpriteToHTML } from './gulp/tasks/svgSprite.js';
import { ftp } from './gulp/tasks/ftp.js';

// Таски
function watcher() {
   gulp.watch(path.watch.folder, copy);
   gulp.watch(path.watch.html, html); // если требуется после каждого изменеия выгрузка на сервер по ftp -- gulp.watch(path.watch.html, gulp.series(html, ftp)); (для каждой нужной задачи)
   gulp.watch(path.watch.scss, scss);
   gulp.watch(path.watch.js, js);
   gulp.watch(path.watch.images, images);
   gulp.watch(path.watch.svg_for_sprite, svg_sprite_task);
}

// Инструкция для последовательной обработки svg иконок для спрайта и записи в html шаблон
const svg_sprite_task = gulp.series(spritesvg, writeContentSpriteToHTML);
// export { svg_sprite_task } // если нужно запускать отдельно

// Инструкция для последовательной обработки шрифтов
const fonts = gulp.series(otfTOttf, copyWoff2, ttfTOwoff, fontsStyle);

// Инструкция для ПАРРАЛЕЛЬНОГО выполнения основных тасков
const mainTasks = gulp.series(fonts, svg_sprite_task, gulp.parallel(copy, html, scss, js, images));

// Инструкция для ПОСЛЕДОВАТЕЛЬНОГО выполнения тасков
const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(clean, mainTasks, delLicencseTxt);
const deployFTP = gulp.series(clean, mainTasks, ftp);

export { dev };
export { build };
export { deployFTP };

// Запуск тасков по умолчанию
gulp.task('default', dev);