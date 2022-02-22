import imagemin from 'gulp-imagemin';

export const images = () => {
   return global_app.gulp.src(global_app.path.src.images)
      .pipe(global_app.plugins.plumber(
         global_app.plugins.notify.onError({
            title : 'Error in IMAGES',
            message : 'Error: <%= error.message %>'
         })
      ))

      .pipe(global_app.plugins.newer(global_app.path.build.images))
      .pipe(
         global_app.plugins.if(
            global_app.isBuild,
            imagemin({
               progressive : true,
               svgoPlugins : [{ removeViewBox : false }],
               interlaced : true,
               optimizationLevel : 3 // от 0 до 7
            })
         )
      )
      .pipe(
         global_app.plugins.if(
            global_app.isBuild,
            global_app.gulp.dest(global_app.path.build.images)
         )
      )

      .pipe(global_app.gulp.src(global_app.path.src.svg))
      .pipe(global_app.gulp.dest(global_app.path.build.images))

      .pipe(global_app.plugins.browsersync.stream())
}