import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //RECEIVED DATA FROM ANOTHER COMPONENT
  
  @Input('countryData')
  countryData:any;
  constructor() { }

  ngOnInit(): void {}

}
