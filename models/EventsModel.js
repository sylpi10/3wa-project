class EventsModel {
    static API_ENDPOINT = "https://opendata.paris.fr/api/records/1.0/search/";
    constructor(rows = 12) {
        this._queryParameters = {
            dataset: "que-faire-a-paris-",
            rows: rows
        };
    }

    /**
     * build request string
     * @param {string} q  research terms 
     * @param {string} date_start research year  
     * @param {string} sort order
     * @returns {string} 
     */
    buildQuery(q="", date_start="", sort="date_start"){

        // complete prop queryParameters 
        this._queryParameters.q = q.trim();
        this._queryParameters.sort = sort;
        if (date_start !== "") {
            this._queryParameters.facet = "date_start";
            this._queryParameters['refine.date_start'] = date_start;
        }
        // console.log(Object.entries(this._queryParameters));        
        // translate to request string and return this string
       const queryString = Object.entries(this._queryParameters).
            map(([key, value]) => `${key}=${value}`)
            .join('&');
        return queryString;

    }

    /**
     * build string
     * @param {string} q  research terms 
     * @param {string} date_start research year  
     * @param {string} sort order
     */
    getEvents(q="", date_start="", sort="date_start"){

        // build request 
        const queryString = this.buildQuery(q, date_start, sort)
        // send request 
        return fetch(`${EventsModel.API_ENDPOINT}?${queryString}`)
        .then(res => res.json());
       
    }
}

export default EventsModel;

/* 
https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&
q=sport&
sort=-date_start&
facet=date_start&refine.date_start=2020
*/