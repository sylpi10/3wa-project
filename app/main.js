// import Router from "vanilla-router";
import app from './app.js';
import config from './config.js';

// --------------------------------------------------------------------------------------------------------------------
// INITIALISATION DE L'APPLICATION
// --------------------------------------------------------------------------------------------------------------------

function initializeRouter() {
    // Instancier ici le Vanilla Router dans l'objet "app.mvc.router"
    app.mvc.router = new Router({
        mode: 'hash',
        page404: function (path) {
            console.log('"/' + path + '" Page not found');
        }
    });

    app.mvc.router.add('home', function () {
        console.log('Home page');
    });
    
    app.mvc.router.add('search', function () {
        console.log('Hello search');
    });
    
    app.mvc.router.add('about', function () {
        console.log('About Page');
    });

    app.mvc.router.add('login', function () {
        console.log('Login Page');
    });

    app.mvc.router.addUriListener();
    app.mvc.router.navigateTo('home');
}
 
 

// --------------------------------------------------------------------------------------------------------------------
// CODE PRINCIPAL
// --------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Initialisation du routeur.
    initializeRouter();
});