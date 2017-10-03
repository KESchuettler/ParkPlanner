import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import * as moment from 'moment';

declare var jQuery:any;

@Component({
  selector: 'app-chart',
  // templateUrl: './chart.component.html',
  template: `<div style="width:60%" [ngClass]='style'></div>`,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent  {

  @Input() data: any;
  private dataMorph: any;
  private style: String;

  ngAfterContentInit() {
    if(this.data) this.style = `chart-container-${this.data.id}`
  }
  
  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    if(this.data) {
      this.dataMorph = this.data.times
                        .map(t => [moment(t.dateTime).format("HH:mm"), t.waitTime])
                        .reduce((a, t) => {
                          if(a[t[0]]) {
                            a[t[0]].push(t[1]);
                          } else {
                            a[t[0]] = [t[1]]
                          }
                          return a;
                        }, {});
      this.dataMorph = Object.keys(this.dataMorph).reduce((acc, key) => {
        acc.push([moment(key, "HH:mm"), this.dataMorph[key].reduce((acc, wait) => acc+wait / this.dataMorph[key].length, 0)])
        return acc
      }, [])

      console.log(this.dataMorph)

      jQuery(`.${this.style}`).highcharts({
        xAxis: {
          title: { text: null },
          type: 'string'
        },
        legend: {
          enabled: false
        },
        yAxis: {
          title: {text: 'Wait Time (minutes)'}
        },
        title: {
          text: `Ride wait time for ${this.data.rideName}`
        },
        series: [{
          type: 'spline',
          // data: this.data.times.map( t => [t.dateTime, t.waitTime] )
          data: this.dataMorph
                               
        }]
      });
    }
  }

}
