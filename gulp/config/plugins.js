import replace from 'gulp-replace'; // Поиск и замена
import plumber from 'gulp-plumber'; // Обработка ошибок
import notify from 'gulp-notify'; // Сообщения-подсказки
import browsersync from 'browser-sync'; // Запуск сервера и автообновление страницы
import newer from 'gulp-newer'; // Проверка обновления файлов (картинок, чтобы не обрабатывать те, к-рые уже обработаны)
import gulpIf from 'gulp-if'; // Ветвление

export const plugins = {
   replace : replace,
   plumber : plumber,
   notify : notify,
   browsersync : browsersync,
   newer : newer,
   if : gulpIf
}