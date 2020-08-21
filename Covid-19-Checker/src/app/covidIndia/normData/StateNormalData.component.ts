import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';


import { LoadDataServices } from 'src/app/services/loadData.service';
import { AppState } from "../../store/index";
import * as loadAction from "../../store/statedataload/stateload.action";
import { getStatewiseData } from "../../store/statedataload/stateload.selectors";
import { IndiaStat } from "../../services/covidmodel";


@Component({
    selector: "normdata",
    templateUrl: "./StateNormalData.component.html",
    styleUrls: ["./StateNormalData.component.css"]
})
export class StateNormalComponent implements OnInit {
    //VARIABLE DECLARATION AREA

    case$: any;
    StateCase$: Observable<any[]>;
    prev_data: Observable<any[]>;
    countryData: IndiaStat = undefined;
    loading: boolean = true;
    line1: number[];
    line2: number[];
    line3: number[];
    line4: number[];
    label: string[];
    chart: any = undefined;

    lineChartData: ChartDataSets[] = [];
    public lineChartLabels: Label[] = [];
    public lineChartOptions: ChartOptions = {
        responsive: true,
    };
    public lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
        },
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];


    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartColors = [undefined];
    public barChartOptions: ChartOptions = {
        responsive: true,
        showLines: true,
        animation: { duration: 1000 },
    };

    public barChartData: ChartDataSets[] = [
        { data: [], label: "" }
    ];
    //CONSTRUCTOR
    constructor(private totalData: LoadDataServices, private store: Store<AppState>,) {

        store.dispatch(loadAction.LoadRequest());
        this.StateCase$ = this.store.pipe(select(getStatewiseData));
        this.line1 = [];
        this.line2 = [];
        this.line3 = [];
        this.label = [];
        this.line4 = [];

        totalData.IndiaTotalDataLoad().subscribe((next) => { this.case$ = next },
            error => {
                console.log(error);
            },
            () => {
                this.countryData = {
                    active: this.case$['active'],
                    confirmed: this.case$['confirmed'],
                    death: this.case$['deaths'],
                    recovered: this.case$['recovered'],
                    aChange: this.case$['aChanges'],
                    cChange: this.case$['cChanges'],
                    rChange: this.case$['rChanges'],
                    dChange: this.case$['dChanges']
                }
            });
        this.totalData.IndiaLast15DaysStat().subscribe(next => {
            this.prev_data = next;
        },
            error => {
                console.log(error);
            },
            () => {

                this.prev_data.forEach(x => {
                    this.line1.push(x['Active']);
                    this.line2.push(x['Confirmed']);
                    this.line3.push(x['Deaths']);
                    this.line4.push(x['Recovered']);

                    this.label.push(x['Date'].slice(0, 10));

                })

            })

        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();

    }

    ngOnInit() {
        this.lineChartLabels = this.label;

        this.chart = {
            "dataSet": [
                { "data": this.line1, "label": "Active" },
                { "data": this.line2, "label": "Confirmed" },
                { "data": this.line4, "label": "Recovered" },
                { "data": this.line3, "label": "Deceased" },
            ]
        }
        this.lineChartData = this.chart['dataSet'];


        this.initChart("active");
        this.loading = false;
    }
    //FUNCTION DEFINITION
    initChart(caseType: string) {

        let stateNameTable = [];
        let caseTable = [];
        this.StateCase$.forEach(sc => {
            sc.forEach(data => {
                stateNameTable.push([data['state']])
                caseTable.push(data[caseType])
            })
        })

        this.barChartData[0]['data'] = caseTable;
        this.barChartData[0]['label'] = caseType;
        this.barChartLabels = stateNameTable;
    }


    updateChart(htmlInput: HTMLInputElement) {

        let type: string = htmlInput.value;

        if (type === "a")
            this.initChart("active");
        else if (type === "c")
            this.initChart('confirmed');
        else if (type === "r")
            this.initChart("recovered");
        else if (type === "d")
            this.initChart("deaths");

    }
}