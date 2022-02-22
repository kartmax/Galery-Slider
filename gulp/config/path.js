// Папка проэкта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());


const buildFolder = `./dist`;
const srcFolder = `./app`;

export const path = {
   build : {
      folder : `${buildFolder}/`,
      html : `${buildFolder}/`,
      css : `${buildFolder}/css/`,
      js : `${buildFolder}/js/`,
      images : `${buildFolder}/images/`,
      fonts : `${buildFolder}/fonts/`
   },
   src : {
      folder : `${srcFolder}/**/*.*`,
      html : `${srcFolder}/*.html`,
      scss : `${srcFolder}/scss/main.scss`,
      js : `${srcFolder}/js/app.js`,
      images : `${srcFolder}/images/**/*.{jpg,jpeg,png,gif}`,
      svg : [`${srcFolder}/images/**/*.svg`, `!${srcFolder}/images/svg_for_sprite/*.svg`, `!${srcFolder}/images/sprite_svg/**/*.*`],
      fonts : `${srcFolder}/fonts/`,
      fontsOTF : `${srcFolder}/fonts/*.otf`,
      fontsTTF : `${srcFolder}/fonts/*.ttf`,
      svg_for_sprite : `${srcFolder}/images/svg_for_sprite/*.svg`,
      svg_sprite_folder : `${srcFolder}/images/sprite_svg`
   },
   watch : {
      folder : `${srcFolder}/**/*.*`,
      html : `${srcFolder}/**/*.html`,
      scss : `${srcFolder}/scss/**/*.scss`,
      js : `${srcFolder}/js/**/*.js`,
      images : [`${srcFolder}/images/**/*.{jpg,jpeg,png,gif,svg}`, `!${srcFolder}/images/svg_for_sprite/*.svg`, `!${srcFolder}/images/sprite_svg/**/*.*`],
      svg_for_sprite : `${srcFolder}/images/svg_for_sprite/*.svg`,
   },
   buildFolder : buildFolder,
   srcFolder : srcFolder,
   rootFolder : rootFolder,
   ftp : `name_folder_in_ftp_server` // папка на ftp сервере, куда нужно выгрузить проект
}