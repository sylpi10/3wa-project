// import Router from "vanilla-router";
import HomeController from '../controllers/HomeController.js';
import LoginController from '../controllers/LoginController.js';
import SearchController from '../controllers/SearchController.js';
import AboutController from '../controllers/AboutController.js';
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
        app.mvc.dispatchRoutes(new HomeController())
    });
    
    app.mvc.router.add('search', function () {
        console.log('Hello search');
        app.mvc.dispatchRoutes(new SearchController());
    });
    
    app.mvc.router.add('about', function () {
        console.log('About Page');
        app.mvc.dispatchRoutes(new AboutController());
    });

    app.mvc.router.add('login', function () {
        console.log('Login Page');
        app.mvc.dispatchRoutes(new LoginController());

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