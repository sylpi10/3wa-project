class HomeController{
    constructor(){
        this.viewPath = "views/home.html"
    }
    executeAfterDomUpdate(){
        console.log('home ok !!');
    }
}

export default HomeController;
