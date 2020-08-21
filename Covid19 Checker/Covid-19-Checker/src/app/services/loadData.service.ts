import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: "any"
})
export class LoadDataServices {
    //DATE DECLARE
    date1: Date = new Date();
    date2: Date = new Date();
    days_count = 15;
    current: string = this.date1.toJSON().slice(0, 10);
    prev_date: string;


    //URLS DEFINE
    private stateDataLoadingURL: string = "https://api.covidindiatracker.com/state_data.json";
    private districtDataURL: string = "https://api.covid19india.org/state_district_wise.json";
    private IndiaDataLoadingURL: string = "https://api.covidindiatracker.com/total.json";
    private IndiaLast15DaysStatURL: string;

    //CONSTRUCTOR
    constructor(private http: HttpClient) {}
    //SERVICES DECLARE

    //LOAD STATE CURRENT COVID19 CASE TOTAL DATA 
    StateDataLoad(): Observable<any[]> {
        return this.http.get<any[]>(this.stateDataLoadingURL);
    }

    //LOAD INDIA'S CURRENT COVID19 CASE TOTAL DATA 
    IndiaTotalDataLoad(): Observable<any> {
        return this.http.get(this.IndiaDataLoadingURL);
    }


    //LOAD LAST 15 DAYS INDIA'S TOTAL COVID19 CASE DATA
    IndiaLast15DaysStat(): Observable<any> {
        this.date2.setDate(this.date1.getDate() - this.days_count);

        if ((this.date2.getMonth() + 1) < 10 && this.date2.getDate() >= 10)
            this.prev_date = this.date2.getFullYear() + "-0" + (this.date2.getMonth() + 1) + "-" + this.date2.getDate();
        else if ((this.date2.getMonth() + 1) >= 10 && this.date2.getDate() < 10)
            this.prev_date = this.date2.getFullYear() + "-" + (this.date2.getMonth() + 1) + "-0" + this.date2.getDate();
        else if ((this.date2.getMonth() + 1) < 10 && this.date2.getDate() < 10)
            this.prev_date = this.date2.getFullYear() + "-0" + (this.date2.getMonth() + 1) + "-0" + this.date2.getDate();
        else
            this.prev_date = this.date2.getFullYear() + "-" + (this.date2.getMonth() + 1) + "-" + this.date2.getDate();

        this.IndiaLast15DaysStatURL = "https://api.covid19api.com/country/south-africa?from=" + this.prev_date + "T00:00:00Z&to=" + this.current + "T00:00:00Z";

        return this.http.get(this.IndiaLast15DaysStatURL);
    }
    

    //LOAD DISTRICT WISE COVID19 CASE CURRENT DATA
    DistrictDataLoad(): Observable<any> {
        return this.http.get(this.districtDataURL);
    }
}