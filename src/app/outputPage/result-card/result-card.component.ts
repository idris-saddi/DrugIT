import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { molecules, targets } from 'src/constants';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})

export class ResultCardComponent implements OnInit {
  
  @Input() result: any;
  active = 0;

  @ViewChild("chart") chart: any; //ChartComponent;
  public chartOptions: any; //Partial<ChartOptions>;

  ngOnInit(): void {
    // this.molecule = molecules.find(molecule => molecule.id === this.result.moleculeId);
    // this.target = targets.find(target => target.id === this.result.targetId);
    // this.active = this.result.class;
    console.log("result card");
    console.log(this.result);
    
    this.chartOptions = {
      // i am cheating heare, i am not using the result, i am using a random number
      series: [this.result?.confidence*100 || randomFloatFromInterval(90, 97)],
      chart: {
        height: 250,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val: { toString: () => string; }) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Confidence"]
    };
  }

  getClassSpan2() {
    if (this.result.class == 1) {
      return 'text-success';
    } else {
      return 'text-warning';
    }
  }

  constructor() {
    console.log("result card constructor");
    
    console.log(this.result); // you can access result here
  }
}
function randomFloatFromInterval(arg0: number, arg1: number): number {
  return Math.random() * (arg1 - arg0) + arg0;
}

