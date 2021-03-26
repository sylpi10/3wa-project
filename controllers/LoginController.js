import app from "../app/app.js";

class LoginController{
    constructor(){
        this.viewPath = "views/login.html"
    }

    executeAfterDomUpdate(){
        document.querySelector("#githubLogin")
        .addEventListener('click', app.auth.loginWithGithub);
    }
}

export default LoginController;
