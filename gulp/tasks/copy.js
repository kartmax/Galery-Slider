export const copy = () => {
   return global_app.gulp.src(
      [ 
         global_app.path.src.folder, 
         `!${global_app.path.watch.html}`, 
         `!${global_app.path.watch.scss}`,
         `!${global_app.path.watch.js}`,
         `!${global_app.path.watch.images}`,
         `!${global_app.path.src.svg_for_sprite}`,
         `!${global_app.path.src.svg_sprite_folder}/**/*.*`,
         `!${global_app.path.src.fonts}/**/*.*`
      ]
   )
      .pipe(global_app.gulp.dest(global_app.path.build.folder));
}