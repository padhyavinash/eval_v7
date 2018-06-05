import { Component, Input, OnInit } from '@angular/core';
import { PieChartConfig } from '../piechart';
import { PieChartService } from '../piechart.service';
import { HrComponent } from '../hr/hr.component';

declare var google: any;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  title = 'Reusable charts sample';

  data1: any[] =[['Category', 'Correct Answers'],
  ['Cat1',      3],
  ['Cat2',      4],
  ['Cat3',      3],
  ['Wrong',     0]
];


  config1: PieChartConfig = new PieChartConfig('Final Result stat', 0.4);;
  elementId1: String = 'myPieChart1';

  /* data2: any[];
  config2: PieChartConfig;
  elementId2: String;

   */
    @Input() data: any[];
    @Input() config: PieChartConfig;
    @Input() elementId: String;

    constructor(private _pieChartService: PieChartService) {}

    ngOnInit(): void {
        this._pieChartService.BuildPieChart(this.elementId1, this.data1, this.config1); 
    }
}