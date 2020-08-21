import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { map } from 'rxjs/operators';
import { IndiaStat } from 'src/app/services/covidmodel';
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

    case$ : Observable<any[]>;
    state:Observable<any>;
    distData : Observable<any[]>;
    loading : boolean =true;
    distNames : string[];
    data : any[];
    complete_data :any;
    active : number [];
    recovered : number [];
    deceased : number [];
    confirmed : number[];
    countryData : IndiaStat=null;



//BAR CHART
  public barChartOptions: ChartOptions = {
    responsive: true,
    showLines: true,
    animation: {duration: 1000},
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColor1 : Color[]=[
    {
      backgroundColor : 'pink'
    }
  ]
  public barChartColor2 : Color[]=[
    {
      backgroundColor : 'red'
    }
  ]
  public barChartColor3 : Color[]=[
    {
      backgroundColor : 'green'
    }
  ]
  public barChartColor4 : Color[]=[
    {
      backgroundColor : 'red'
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

  constructor(private store : Store<AppState> ,private distLoad : LoadDataServices) { 
        store.dispatch(loadAction.LoadRequest());
        this.case$=this.store.pipe(select(getStatewiseData));    
  }


  ngOnInit(): void {
    this.distLoad.DistrictDataLoad().subscribe(next => {this.distData=next},err=>{},()=>{
      this.onSelectState("Maharashtra");
      this.loading=false;
    });
  }

  //FUNCTION DEFFINITION AREA

  onSelectState(value : string){
    
    this.case$.subscribe(next => {next.filter(x => {if(x.state ==value) {this.state=x;return}} ) },
    error=>{console.log(error);
    },
    ()=>{});


    this.countryData={
      active : this.state['active'],
      confirmed : this.state['confirmed'],
      death : this.state['deaths'],
      recovered : this.state['recovered'],
      aChange : this.state['aChanges'],
      cChange : this.state['cChanges'],
      rChange : this.state['rChanges'],
      dChange : this.state['dChanges']
    }

    this.data=null;

    if(value=="Dadra and Nagar Haveli" || value=="Daman and Diu")
    {
      this.data=this.distData["Dadra and Nagar Haveli and Daman and Diu"];
    }else{
    Object.keys(this.distData).forEach(x => {
      if(x==value){
        this.data=this.distData[x];
        return;
      } 
    })
    }

    this.distNames=Object.keys(this.data["districtData"]);
    this.complete_data=this.data['districtData'];


    this.barChartLabels=this.distNames;
    this.active=[];
    this.confirmed=[];
    this.recovered=[];
    this.deceased=[];
    Object.keys(this.complete_data).forEach(x => {
        this.active.push(this.complete_data[x]['active']);
        this.recovered.push(this.complete_data[x]['recovered']);
        this.confirmed.push(this.complete_data[x]['confirmed']);
        this.deceased.push(this.complete_data[x]['deceased']);
      })


      this.barChartData1[0]['data']=this.active;
      this.barChartData1[0]['label']="Active Cases"
      
      this.barChartData2[0]['data']=this.confirmed;
      this.barChartData2[0]['label']="Confirmed Cases"
      
      this.barChartData3[0]['data']=this.recovered;
      this.barChartData3[0]['label']="Recovered Cases"
      
      this.barChartData4[0]['data']=this.deceased;
      this.barChartData4[0]['label']="Deceased Cases"


  }
    
  }
