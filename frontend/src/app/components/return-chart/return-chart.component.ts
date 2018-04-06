import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

const COLOR_LIGHT_BLUE = '#66A8CC';

@Component({
  selector: 'app-return-chart',
  templateUrl: './return-chart.component.html',
  styleUrls: ['./return-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReturnChartComponent implements OnInit {
  chart = new Chart({
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        lineWidth: 5,
        marker: {
          enabled: false
        }
      }
    },
    credits: {
      enabled: false
    },
    chart: {
      type: 'areaspline'
    },
    title: {
      text: null
    },
    series: [
      {
        name: 'Return',
        data: [10, 12, 9, 8, 12, 18, 19, 18, 30, 33, 40, 38, 45]
      }
    ],
    xAxis: {
      crosshair: {
        width: 1,
        color: COLOR_LIGHT_BLUE
      }
    },
    yAxis: {
      crosshair: {
        width: 1,
        color: COLOR_LIGHT_BLUE
      },
      plotLines: [
        {
          color: COLOR_LIGHT_BLUE,
          dashStyle: 'ShortDash',
          value: 42,
          width: 3
        }
      ],
      labels: {
        format: '€{value}'
      },
      title: {
        text: null
      }
    }
  });

  constructor() {}

  ngOnInit() {}
}
