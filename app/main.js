import Router from "vanilla-router";
import firebase from "firebase/app";

import HomeController from '../controllers/HomeController.js';
import LoginController from '../controllers/LoginController.js';
import SearchController from '../controllers/SearchController.js';
import AboutController from '../controllers/AboutController.js';
import app from './app.js';
import config from './config.js';

import "../static/css/main.css";

// --------------------------------------------------------------------------------------------------------------------
// INITIALISATION DE L'APPLICATION
// --------------------------------------------------------------------------------------------------------------------

function initializeRouter(isLoggedIn = false) {
    // Instancier ici le Vanilla Router dans l'objet "app.mvc.router"
    app.mvc.router = new Router({
        mode: 'hash',
        page404: function (path) {
            console.log('"/' + path + '" Page not found');
        }
    });

    app.mvc.router.add('home', function () {
        app.mvc.dispatchRoutes(new HomeController())
    });
    
    app.mvc.router.add('search', function () {
        app.mvc.dispatchRoutes(new SearchController());
    });
    
    app.mvc.router.add('about', function () {
        app.mvc.dispatchRoutes(new AboutController());
    });

    if (isLoggedIn) {
		app.mvc.router.add("search", function () {
			app.mvc.dispatchRoutes(new SearchController());
		});
		app.mvc.router.add("logout", app.auth.logout);
	} else {
		app.mvc.router.add("login", function () {
			app.mvc.dispatchRoutes(new LoginController());
		});
	}
    
    app.mvc.router.addUriListener();
    app.mvc.router.navigateTo("home");
}
 

// --------------------------------------------------------------------------------------------------------------------
// CODE PRINCIPAL
// --------------------------------------------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', function () {
    // Initialisation du routeur.
    firebase.initializeApp(config.firebase);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            app.dom.refreshMainMenu(true);
            initializeRouter(true);
        }else {
            app.dom.refreshMainMenu(false);
            initializeRouter();
        }
    })
});

