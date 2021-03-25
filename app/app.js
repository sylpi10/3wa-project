let app = {
    // ----------------------------------------------------------------------------------------------------------------
    // MANIPULATION DU DOM DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    dom: {
    },


    // ----------------------------------------------------------------------------------------------------------------
    // ARCHITECTURE MVC DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    mvc: {
        router: null,
        dispatchRoutes: (controller) => {
             // fetch partial view's url 
        fetch(controller.viewPath).then(res => res.text())
        // update main with content 
        .then((htmlString) => {
            document.querySelector('main').innerHTML = htmlString 
            // executeAfterDomUpdate
            controller.executeAfterDomUpdate();
        });
        }
    }
};


// L'application est exportée afin d'être accessible par d'autres modules.
export default app;