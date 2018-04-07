import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

const COLOR_LIGHT_BLUE = '#66A8CC';

@Component({
  selector: 'app-return-chart',
  templateUrl: './return-chart.component.html',
  styleUrls: ['./return-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReturnChartComponent implements OnInit, OnChanges {
  @Input() contractStartYear: number;

  @Input() currentYear: number;

  @Input() targetAmount: number;

  @Input() realization: number[];

  @Input() simulationGood: number[];

  @Input() simulationExpected: number[];

  @Input() simulationBad: number[];

  chart: Chart;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const realizationLine: number[] = [...this.realization];
    for (let i = 0; i < this.simulationGood.length; i++) {
      realizationLine.push(null);
    }

    const simulationGoodLine: number[] = [...this.simulationGood];
    const simulationExpectedLine: number[] = [...this.simulationExpected];
    const simulationBadLine: number[] = [...this.simulationBad];

    const lastRealization = realizationLine[this.realization.length - 1];

    simulationGoodLine.unshift(lastRealization);
    simulationExpectedLine.unshift(lastRealization);
    simulationBadLine.unshift(lastRealization);

    for (let i = 0; i < this.realization.length - 1; i++) {
      simulationGoodLine.unshift(null);
      simulationExpectedLine.unshift(null);
      simulationBadLine.unshift(null);
    }

    this.chart = new Chart({
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          lineWidth: 5,
          marker: {
            enabled: false
          },
          pointStart: this.contractStartYear
        },
        spline: {
          dashStyle: 'ShortDash'
        }
      },
      tooltip: {
        shared: true,
        valueDecimals: 0,
        valuePrefix: '€'
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      series: [
        {
          type: 'areaspline',
          name: 'Realization',
          data: realizationLine,
          zIndex: 99
        },
        {
          type: 'spline',
          name: 'Good',
          data: simulationGoodLine
        },
        {
          type: 'spline',
          name: 'Expected',
          data: simulationExpectedLine
        },
        {
          type: 'spline',
          name: 'Bad',
          data: simulationBadLine
        }
      ],
      xAxis: {
        crosshair: {
          width: 1,
          color: COLOR_LIGHT_BLUE
        },
        tickInterval: 1,
        plotLines: [
          {
            color: COLOR_LIGHT_BLUE,
            value: this.currentYear,
            width: 2,
            label: {
              text: 'Today',
              style: { color: COLOR_LIGHT_BLUE }
            }
          }
        ]
      },
      yAxis: {
        crosshair: {
          width: 1,
          color: COLOR_LIGHT_BLUE
        },
        plotLines: [
          {
            color: COLOR_LIGHT_BLUE,
            value: this.targetAmount,
            width: 2,
            label: {
              text: 'Goal',
              style: { color: COLOR_LIGHT_BLUE }
            }
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
  }
}
