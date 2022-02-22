export const server = (done) => {
   global_app.plugins.browsersync.init({
      server : {
         baseDir: `${global_app.path.build.html}`
      },
      notify : false, // без уведомлений
      port : 3000,
      online : true // работа с wi-fi сети (false -- без wi-fi)
   });
}