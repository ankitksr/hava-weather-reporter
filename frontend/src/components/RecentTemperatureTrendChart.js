import React, { Component } from 'react';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import update from 'immutability-helper';

class RecentTemperatureTrendChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // To avoid unnecessary update keep all options in the state.
            chartOptions: {
                chart: {
                    type: 'line',
                },
                title: {
                    text: 'Recent Max-Temperature Trend for Cities'
                },
                xAxis: {
                    categories: [],
                    title: {
                        text: 'Date',
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

        this.getDailyWeatherData();
    }

    getDailyWeatherData = () => {
        axios.get('/api/v1/dailyweather/').then(({ data }) => {
            let categories = new Set();
            let dataMap = new Map();
            for (const elem of data) {
                let fd = elem.forecast_date;
                let city = elem.city;
                let max_temperature = elem.max_temperature;

                categories.add(fd);
                if (dataMap.has(city)) {
                    dataMap.get(city).push(max_temperature);
                } else {
                    dataMap.set(city, [max_temperature]);
                }
            }
    
            let series = [];
            for (let entry of dataMap.entries()) {
                series.push({
                    name: entry[0],
                    data: entry[1]
                })
            }

            let newState = update(
                this.state, {
                chartOptions: {
                    xAxis: {
                        categories: { $set: [...categories] }
                    },
                    series: { $set: series}
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

export default RecentTemperatureTrendChart;
