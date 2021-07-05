import React, { Component } from 'react';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import update from 'immutability-helper';

class CurrentTemperatureChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Current Temperature for Cities'
        },
        xAxis: {
          categories: [],
          title: {
            text: 'City',
            style: {
              fontWeight: 'bold'
            }
          }
        },
        yAxis: {
          title: {
            text: 'Temperature (℃)',

          },
          stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
          },
        },
        series: [],
        legend: {
          align: 'right',
          x: -30,
          verticalAlign: 'top',
          y: 25,
          floating: true,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '<b>{point.y}</b><br/>'
        },
        plotOptions: {
          series: {
            point: {
              events: {
                mouseOver: this.setHoverData.bind(this)
              }
            }
          },
          column: {
            stacking: 'normal',
            // dataLabels: {
            //     enabled: true
            // }
          }
        }
      },
      hoverData: null
    };

    this.getCurrentTemperatureData();
  }

  getCurrentTemperatureData = () => {
    axios.get('/api/v1/currentweather/').then(({ data}) => {
      let newState = update(
        this.state, {
          chartOptions: {
            xAxis: {
              categories: {$set: data.map(d => d.city)}
            },
            series: {$push: [
              {
                name: 'Current Temperature (℃)',
                data: data.map(d => d.avg_temperature)
              }
            ]}
          }
        }
      );
      this.setState(newState);
    })
  }

  setHoverData = (e) => {
    // The chart is not updated because `chartOptions` has not changed.
    this.setState({ hoverData: e.target.category })
  }

  render() {
    const { chartOptions } = this.state;
    console.log(chartOptions)
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    )
  }
}

export default CurrentTemperatureChart;
