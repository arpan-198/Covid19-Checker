import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Distdata, IndiaStat } from 'src/app/services/covidmodel';
import { LoadDataServices } from 'src/app/services/loadData.service';
import { AppState } from "../../store/index";
import * as loadAction from "../../store/statedataload/stateload.action";
import { getStatewiseData } from "../../store/statedataload/stateload.selectors";


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  //VARIABLE DECLARATION AREA

  case$: Observable<any[]>;
  state: Observable<any>;
  distData: Observable<any[]>;
  loading: boolean = true;
  distNames: string[];
  data: any[];
  complete_data: any;
  Data_District_level: Distdata[] = [];
  active: number[];
  recovered: number[];
  deceased: number[];
  confirmed: number[];
  countryData: IndiaStat = null;



  //BAR CHART
  public barChartOptions: ChartOptions = {
    responsive: true,
    showLines: true,
    animation: { duration: 1000 },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColor1: Color[] = [
    {
      backgroundColor: 'pink'
    }
  ]
  public barChartColor2: Color[] = [
    {
      backgroundColor: 'red'
    }
  ]
  public barChartColor3: Color[] = [
    {
      backgroundColor: 'green'
    }
  ]
  public barChartColor4: Color[] = [
    {
      backgroundColor: 'red'
    }
  ]

  public barChartData1: ChartDataSets[] = [
    { data: [], label: '' }
  ];
  public barChartData2: ChartDataSets[] = [
    { data: [], label: '' }
  ];
  public barChartData3: ChartDataSets[] = [
    { data: [], label: '' }
  ];
  public barChartData4: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  //CONSTRUCTOR

  constructor(private store: Store<AppState>, private distLoad: LoadDataServices) {
    store.dispatch(loadAction.LoadRequest());
    this.case$ = this.store.pipe(select(getStatewiseData));
  }


  ngOnInit(): void {
    this.distLoad.DistrictDataLoad().subscribe(next => { this.distData = next }, err => { }, () => {
      this.onSelectState("Maharashtra");
      this.loading = false;
    });
  }

  //FUNCTION DEFFINITION AREA


  sortOrder(type: string, onValue: string) {
    if (onValue === "dist_name")
      return function (a, b) {
        let res = 1;
        let a1 = a[onValue];
        let a2 = b[onValue];
        if (type === "asc")
          a1 > a2 ? res = 1 : res = -1;
        else if (type === "desc")
          a1 < a2 ? res = 1 : res = -1;
        return res;
      }
    else
      return function (a, b) {
        let res = 1;
        let a1 = a['data'][onValue];
        let a2 = b['data'][onValue];
        if (type === "asc")
          a1 > a2 ? res = 1 : res = -1;
        else if (type === "desc")
          a1 < a2 ? res = 1 : res = -1;
        return res;
      }
  }





  onSelectState(value: string) {

    this.case$.forEach(next => next.filter(x => { if (x.state == value) { this.state = x; return; } }));

    // console.log(this.state);
    this.countryData = {
      active: this.state['active'],
      confirmed: this.state['confirmed'],
      deceased: this.state['deaths'],
      recovered: this.state['recovered'],
      aChange: this.state['aChanges'],
      cChange: this.state['cChanges'],
      rChange: this.state['rChanges'],
      dChange: this.state['dChanges']
    }



    this.data = null;

    if (value == "Dadra and Nagar Haveli" || value == "Daman and Diu") {
      this.data = this.distData["Dadra and Nagar Haveli and Daman and Diu"];
    } else {
      Object.keys(this.distData).forEach(x => {
        if (x == value) {

          this.data = this.distData[x]['districtData'];
          // console.log(Object.keys(this.data["districtData"]).length);
          return;
        }
      })
    }

    // this.sample=this.data["districtData"];
    this.Data_District_level = [];
    for (let i in this.data) {
      this.Data_District_level.push({
        dist_name: i,
        data: {
          active: this.data[i]['active'],
          confirmed: this.data[i]['confirmed'],
          recovered: this.data[i]['recovered'],
          deceased: this.data[i]['deceased'],
          cChange: this.data[i]['delta']['confirmed'],
          rChange: this.data[i]['delta']['recovered'],
          dChange: this.data[i]['delta']['deceased'],
        }
      })
    }

    this.complete_data = this.Data_District_level;
    this.createChartsAndTable(this.Data_District_level);

  }


  sorting(onValue: string, type: string) {

    this.complete_data = this.Data_District_level.sort(this.sortOrder(type, onValue));
    this.createChartsAndTable(this.complete_data);
  }



  createChartsAndTable(ChartData: any) {

    this.active = [];
    this.confirmed = [];
    this.recovered = [];
    this.deceased = [];
    this.distNames = [];

    ChartData.forEach(x => {
      // console.log(x);

      this.active.push(x['data']['active']);
      this.recovered.push(x['data']['recovered']);
      this.confirmed.push(x['data']['confirmed']);
      this.deceased.push(x['data']['deceased']);
      this.distNames.push(x['dist_name']);
    })

    this.barChartLabels = this.distNames;

    this.barChartData1[0]['data'] = this.active;
    this.barChartData1[0]['label'] = "Active Cases"

    this.barChartData2[0]['data'] = this.confirmed;
    this.barChartData2[0]['label'] = "Confirmed Cases"

    this.barChartData3[0]['data'] = this.recovered;
    this.barChartData3[0]['label'] = "Recovered Cases"

    this.barChartData4[0]['data'] = this.deceased;
    this.barChartData4[0]['label'] = "Deceased Cases"
  }


}
