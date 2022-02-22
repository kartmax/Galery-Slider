import fileInclude from 'gulp-file-include'; // Для возможности подключения html-шаблонов
import versionNubmer from 'gulp-version-number'; // Для авто-прописывания версионности css и js (обход кеширования)

export const html = () => {
   return global_app.gulp.src(global_app.path.src.html)
      .pipe(global_app.plugins.plumber(
         global_app.plugins.notify.onError({
            title : 'Error in HTML',
            message : 'Error: <%= error.message %>'
         })
      ))
      .pipe(fileInclude())
      .pipe(global_app.plugins.replace(/\.\.\/images/g, 'images'))
      .pipe(
         global_app.plugins.if(
            global_app.isBuild,
            versionNubmer({
               'value' : '%DT%',
               'append' : {
                  'key' : '-v',
                  'cover' : 0,
                  'to' : [
                     'css', 'js'
                  ]
               },
               'output' : {
                  'file' : 'gulp/version.json'
               }
            })
         )
      )
      .pipe(global_app.gulp.dest(global_app.path.build.html))
      .pipe(global_app.plugins.browsersync.stream())
}