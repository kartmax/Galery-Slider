import del from 'del';
export const clean = () => {
   return del(global_app.path.buildFolder);
}