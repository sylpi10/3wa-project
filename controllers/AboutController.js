class AboutController{
    constructor(){
        this.viewPath = "views/about.html"
    }
    executeAfterDomUpdate(){
        console.log('about ok !!');
    }
}
export default AboutController;
