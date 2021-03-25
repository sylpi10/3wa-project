class LoginController{
    constructor(){
        this.viewPath = "views/login.html"
    }
    executeAfterDomUpdate(){
        console.log('login ok !!');
    }
}

export default LoginController;
