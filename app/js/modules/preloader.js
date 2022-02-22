// preloader
document.body.classList.add('loaded_hiding');
window.addEventListener('load', function() {
   document.body.classList.add('loaded');
   document.body.classList.remove('loaded_hiding');
})