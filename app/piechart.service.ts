import { GoogleChartsBaseService } from './googlechartbase.service';
import { Injectable } from '@angular/core';
import { PieChartConfig } from './piechart';
import { ComboChartConfig } from './combochartconfig';
declare var google: any;

@Injectable()
export class PieChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildPieChart(elementId: String, data: any[], config: PieChartConfig) : void {  
    var chartFunc = () => { return new google.visualization.PieChart(document.getElementById(<string>elementId)); };
    var options = {
            title: config.title,
            pieHole: config.pieHole,
            slices: {
              0:{color: 'red'},
              1:{color: 'purple'},
              2:{color: 'blue'},
              3:{color: 'green'},
            },
            is3D : true
      };

    this.buildChart(data, chartFunc, options);
  }
}
 