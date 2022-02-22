import fs from 'fs';
import fonter from 'gulp-fonter-unx'; // для конвертации otf в ttf, ttf в woff
import ttf2woff2 from 'gulp-ttf2woff2'; // для конвертации любых шрифтов в woff2 и woff

// Шрифты лучше пускать на продакшен в форматах woff2 (если не требуется поддержа очень старых версий браузеров)
// Все шрифты в исходниках в форматах otf или ttf будут конвертироваться автоматически на продакшен в woff2
// Если исходник в woff2 -- он просто скопируется в папку продакшена

// Сначала все otf конвертируем в ttf
// Затем ttf в woff2 и заливаем на продакшен
export const otfTOttf = () => {
   return global_app.gulp.src(`${global_app.path.src.fontsOTF}`, {})
      .pipe(global_app.plugins.plumber(
         global_app.plugins.notify.onError({
            title : 'Error in FONTS_OTF',
            message : 'Error: <%= error.message %>'
         })
      ))
      .pipe(fonter({
         formats : ['ttf']
      }))
      .pipe(ttf2woff2())
      .pipe(global_app.gulp.dest(global_app.path.build.fonts))
}

// Если есть исходники сразу в woff2 -- он будет автоматически скопирован на продакшен
// Исходники в woff лучше не использовать -- их можно сконвертировать в woff2 на https://cloudconvert.com/
export const copyWoff2 = () => {
   return global_app.gulp.src(`${global_app.path.src.fonts}*.woff2`)
      .pipe(global_app.plugins.plumber(
         global_app.plugins.notify.onError({
            title : 'Error in FONTS_WOFF2',
            message : 'Error: <%= error.message %>'
         })
      ))
      .pipe(global_app.gulp.dest(global_app.path.build.fonts));
}

// Затем
// - ttf конвертируем в woff2 и выгружаем в build
// В итоге все шрифты в build(dist) должны быть в формате woff и woff2
export const ttfTOwoff = () => {
   return global_app.gulp.src(global_app.path.src.fontsTTF, {})
      .pipe(global_app.plugins.plumber(
         global_app.plugins.notify.onError({
            title : 'Error in FONTS_TTF',
            message : 'Error: <%= error.message %>'
         })
      ))

      // если требуется woff
      // .pipe(fonter({
      //    formats : ['woff']
      // }))
      // .pipe(global_app.gulp.dest(`${global_app.path.build.fonts}`))

      .pipe(global_app.gulp.src(global_app.path.src.fontsTTF))
      .pipe(ttf2woff2())
      .pipe(global_app.gulp.dest(`${global_app.path.build.fonts}`))
}

// подключаем шрифты в файл стилей
export const fontsStyle = () => {
   // Файл стилей подключения шрифтов
   let fontsFile = `${global_app.path.srcFolder}/scss/global/fonts.scss`;

   // Проверяем существует ли вообще файлы шрифтов (возможно они подлючены не локально)
   fs.readdir(global_app.path.build.fonts, function(err, buildFontsFiles) {
      if(buildFontsFiles) {

         // Проверяем существует ли файл стилей для подлючения шрифтов
         if(!fs.existsSync(fontsFile)) {
            // И если его нету -- создаем
            fs.writeFile(fontsFile, '', cb);
            let newFileOnly;
            for(let i = 0; i < buildFontsFiles.length; i++) {
               let fontFileName = buildFontsFiles[i].split('.')[0];
               if(newFileOnly !== fontFileName) {
                  let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                  let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                  let fontStyle = fontFileName.split('-')[2] ? fontFileName.split('-')[2] : fontFileName;
                  if(fontWeight.toLowerCase() === 'thin') {
                     fontWeight = 100;
                  }
                  else if(fontWeight.toLowerCase() === 'extralight') {
                     fontWeight = 200;
                  }
                  else if(fontWeight.toLowerCase() === 'light') {
                     fontWeight = 300;
                  }
                  else if(fontWeight.toLowerCase() === 'medium') {
                     fontWeight = 500;
                  }
                  else if(fontWeight.toLowerCase() === 'semibold') {
                     fontWeight = 600;
                  }
                  else if(fontWeight.toLowerCase() === 'bold') {
                     fontWeight = 700;
                  }
                  else if(fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                     fontWeight = 800;
                  }
                  else if(fontWeight.toLowerCase() === 'black') {
                     fontWeight = 900;
                  }
                  else {
                     fontWeight = 400;
                  };

                  if(fontStyle.toLowerCase() === 'italic') {
                     fontStyle = fontStyle.toLowerCase()
                  }
                  else {
                     fontStyle = 'normal'
                  }

                  // fs.appendFile(fontsFile, `@font-face {\n\tfont-family : "${fontName}";\n\tfont-display : swap;\n\tsrc : url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight : ${fontWeight};\n\tfont-style : normal;\n}\r\n`, cb);
                  fs.appendFile(fontsFile, `@font-face {\n\tfont-family : "${fontName}";\n\tfont-display : swap;\n\tsrc : url("../fonts/${fontFileName}.woff2") format("woff2");\n\tfont-weight : ${fontWeight};\n\tfont-style : ${fontStyle};\n}\r\n`, cb);
                  
                  newFileOnly = fontFileName;
               }
            }
         } 
         // Если файл для подключеня шрифтов уже есть
         else {
            console.log('Файл scss/global/fonts.scss уже существует. Если требуется его обновить автоматически -- его сначала нужно удалить и заново запусть gulp.\nЛибы вы можете поправить этот файл вручную.')
         }
      }
   });
   return global_app.gulp.src(global_app.path.srcFolder);
   function cb () {};
}