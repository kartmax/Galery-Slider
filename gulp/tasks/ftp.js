import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util'; // вывод логов


export const ftp = () => {
   configFTP.log = util.log;
   const ftpConnect = vinylFTP.create(configFTP);
   return global_app.gulp.src(`${global_app.path.buildFolder}/**/*.*`, {})
      .pipe(global_app.plugins.plumber(
         global_app.plugins.notify.onError({
            title : 'Error in FTP',
            message : 'Error: <%= error.message %>'
         })
      ))
      .pipe(ftpConnect.dest(`/${global_app.path.ftp}/${global_app.path.rootFolder}`));

}
