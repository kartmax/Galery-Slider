import webpack from 'webpack-stream';
import del from 'del';

export const js = () => {
   return global_app.gulp.src(global_app.path.src.js, { sourcemaps : global_app.isDev })
      .pipe(global_app.plugins.plumber(
         global_app.plugins.notify.onError({
            title : 'Error in JS',
            message : 'Error: <%= error.message %>'
         })
      ))
      .pipe(webpack({
         mode : global_app.isBuild ? 'production' : 'development',
         output : {
            filename : 'app.min.js'
         }
      }))
      .pipe(global_app.gulp.dest(global_app.path.build.js))
      .pipe(global_app.plugins.browsersync.stream());
}

export const delLicencseTxt = () => {
   return del(`${global_app.path.buildFolder}/js/*.txt`);
}