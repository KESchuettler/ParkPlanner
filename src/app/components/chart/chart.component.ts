import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import * as moment from 'moment';
import Chart from 'chart.js';

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
    if(this.data) {
      console.log(this.data.id)
      this.style = `chart-container-${this.data.id}`
    }
  }
  
  ngAfterViewInit() {
    this.renderChart();
  }

  /** MapReduce database data to make it compatible with graph */
  renderChart() {
    if(this.data) {
      this.dataMorph = this.data.times
                        .map(t => [moment(t.dateTime).format("HH:mm"), t.waitTime])
                        .sort()
                        .reduce((acc, time) => {
                          if(acc[time[0]]) {
                            acc[time[0]].push(time[1]);
                          } else {
                            acc[time[0]] = [time[1]]
                          }
                          return acc;
                        }, {});
      console.log(this.dataMorph);
      this.dataMorph = Object.keys(this.dataMorph).reduce((acc, key) => {
        acc.push([this.formatTime(key), this.dataMorph[key].reduce((acc, wait) => acc + wait / this.dataMorph[key].length, 0)])
        return acc
      }, [])
      console.log(this.dataMorph);
      /** Highchart formatting */
      jQuery(`.${this.style}`).highcharts({
        xAxis: {
          title: { text: null }
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
          type: 'line',
          // data: this.data.times.map( t => [t.dateTime, t.waitTime] )
          data: this.dataMorph
                               
        }]
      });
    }
  }

  formatTime(time: String) {
    var hour = time.substring(0,2);
    var minute = time.substring(3);
    return eval(`${hour[0] !== "0" ? hour : hour[1] }.${minute}`)
  }

}
