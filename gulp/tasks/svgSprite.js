import fs from 'fs';
import svgSprite from 'gulp-svg-sprites';

// формируем спрайт из svg-иконок
export const spritesvg = () => {
         return global_app.gulp.src(global_app.path.src.svg_for_sprite)
            .pipe(global_app.plugins.plumber(
               global_app.plugins.notify.onError({
                  title : 'Error in svgSprite',
                  message : 'Error: <%= error.message %>'
               })
            ))
            .pipe(svgSprite({
               mode: "symbols"
            }))
            .pipe(
               global_app.gulp.dest(global_app.path.src.svg_sprite_folder)
            );
   }

// записываем разметку сформированного спрайта в html шаблон
export const writeContentSpriteToHTML = (cb) => {
   let fileSpriteContent = fs.readFileSync(`${global_app.path.src.svg_sprite_folder}/svg/symbols.svg`, "utf8");
   fs.writeFileSync(`${global_app.path.srcFolder}/templates/sprite_svg.html`, fileSpriteContent);
   cb()
}