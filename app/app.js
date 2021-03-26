import firebase from "firebase/app";
import "firebase/auth";

let app = {
    // ----------------------------------------------------------------------------------------------------------------
    // MANIPULATION DU DOM DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    dom: {
        refreshMainMenu: (isLoggedIn = false) => {
            /** refactor html of mainMenu */
            let links = [];
            if (isLoggedIn) {
                links = [
                    {
                        url: '#/home',
                        title: 'Accueil',
                    },
                    {
                        url: '#/about',
                        title: 'A propos',
                    },
                    {
                        url: '#/search',
                        title: 'Recherche',
                    },
                    {
                        url: '#/logout',
                        title: 'Deconnexion',
                        liClasses: 'flex-grow-1',
                        aClasses: 'text-lg-end'
                    },
                ]
            }else{
                links = [
                    {
                        url: '#/home',
                        title: 'Accueil',
                    },
                    {
                        url: '#/about',
                        title: 'A propos',
                    },
             
                    {
                        url: '#/login',
                        title: 'Connexion',
                        liClasses: 'flex-grow-1',
                        aClasses: 'text-lg-end'
                    },
                ]
            }
            document.querySelector("#mainMenu").innerHTML =
             links.map(
                ({
                    url,
                    title,
                    liClasses = "",
                    aClasses = "",
                }) => `<li class="nav-item ${liClasses}">
            <a class="nav-link ${aClasses}" href="${url}">${title}</a>
        </li>`
            )
             .join('');
        }
    },

    // ----------------------------------------------------------------------------------------------------------------
    // AUTHENTICATION
    // ----------------------------------------------------------------------------------------------------------------
    auth: {
        loginWithGithub: () => {
            const provider = new firebase.auth.GithubAuthProvider();
            firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                // app.mvc.router.navigateTo('home');
                app.mvc.router.navigateTo("home");
            })
            .catch((error) => {
                console.error(`err: -- ${error.message} --`);
            });
        }
    },
    
    logout: () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                app.mvc.router.navigateTo("home");
            })
            .catch((error) => {
                console.error(`ERREUR: ${error.message}`);
            });
    },

    // ----------------------------------------------------------------------------------------------------------------
    // ARCHITECTURE MVC DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    mvc: {
        router: null,
        dispatchRoutes: (controller) => {
             // fetch partial view's url 
        fetch(controller.viewPath)
        .then(res => res.text())
        // update main with content 
        .then((htmlString) => {
            document.querySelector("main").innerHTML = htmlString;
            // executeAfterDomUpdate
            controller.executeAfterDomUpdate();
        });
        }
    }
};


// L'application est exportée afin d'être accessible par d'autres modules.
export default app;