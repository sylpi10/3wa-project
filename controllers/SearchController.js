import EventsModel  from "../models/EventsModel.js";

class SearchController{
    constructor(){
        this.viewPath = "views/search.html"
    }

    fillYears() {
        const currentYear = new Date().getFullYear();
        
        const options = ["<option value=''> --Choisir--</option>"];
       
        for (let y = currentYear +1; y >= currentYear -2; y--) {
            options.push(`<option value="${y}">${y}</option>`);
        }
        
        document.querySelector('#date_start').innerHTML = options.join('');
    }

    // func callback in addEventListener
    onSubmitForm(e) {
        e.preventDefault();
        // console.log(this);
        // get values from form 
        const q = document.querySelector('#q').value;
        const date_start = document.querySelector('#date_start').value;
        const sort = document.querySelector('#sort').value;
        
        // send request
        const eventsModel = new EventsModel();
        eventsModel
        .getEvents(q, date_start, sort)
        .then(({ nhits, parameters, records }) =>{
            const htmlRecords = records.map(
                ({
                    fields: {title, date_description, cover_url, cover_alt}, 
            })=> `<li class='col-12 col-sm-6 col-lg-3 text-center'>
                <img class="img-fluid" src="${cover_url}" alt="${cover_alt}"/>
                <h6>${title}</h6>
                <p>${date_description}</p>
             </li>`
             );
             document.querySelector("#searchResults").innerHTML = `
                <h3> ${records.length} résultats sur ${nhits} au total </h3>
                <ul class="events-list row"> ${htmlRecords.join('')} </ul>
             `;
        });

    }

    executeAfterDomUpdate(){
        // fill dropdown options of years
        this.fillYears();
        // watch submit 
        document.querySelector('#searchForm')
        .addEventListener("submit", this.onSubmitForm.bind(this));
    }
}

export default SearchController;
