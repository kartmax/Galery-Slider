import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import sourcemaps from 'gulp-sourcemaps';

import cleancss from 'gulp-clean-css'; // Минификация CSS
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа-запросов

const sass = gulpSass(dartSass);

export const scss = () => {
   // return global_app.gulp.src(global_app.path.src.scss, { sourcemaps : global_app.isDev })
   return global_app.gulp.src(global_app.path.src.scss, {})

      .pipe(sourcemaps.init({sourcemaps : global_app.isDev}))
      

      .pipe(global_app.plugins.plumber(
         global_app.plugins.notify.onError({
            title : 'Error in SCSS',
            message : 'Error: <%= error.message %>'
         })
      ))
      .pipe(sass({
         outputStyle : 'expanded'
      }))
      .pipe(global_app.plugins.replace(/\.\.\/images/g, 'images'))
      .pipe(
         global_app.plugins.if(
            global_app.isBuild,
            groupCssMediaQueries()
         )
      )
      .pipe(
         global_app.plugins.if(
            global_app.isBuild,
            autoprefixer({
               grid : true,
               overrideBrowserslist : ['last 3 versions'],
               cascade : true
            })
         )
      )
      // .pipe(global_app.gulp.dest(global_app.path.build.css)) // Если нужен и не минифицированный файл css
      .pipe(
         global_app.plugins.if(
            global_app.isBuild,
            cleancss()
         )   
      )
      .pipe(rename({
         extname : '.min.css'
      }))

      .pipe(
         global_app.plugins.if(
            global_app.isDev,
            sourcemaps.write('.')
         )
      )

      .pipe(global_app.gulp.dest(global_app.path.build.css))

      .pipe(global_app.plugins.browsersync.stream());
}