import React, { Component } from 'react';
import axios from 'axios';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';


class DailyWeather extends Component {
    state = {
        data: [],
        temperature_unit: "c",
        loaded: false,
    }

    constructor() {
        super()
        this.getDailyWeatherData()
    }

    getDailyWeatherData = () => {
        let url = '/api/v1/dailyweather/';
        console.log(url);
        axios
            .get(url).then(({ data }) => {
                if (data) {
                    this.setState(() => ({
                        data: data,
                        loaded: true,
                    }));
                }
            })
            .catch(err => console.log(err))
    };

    customLoadingOverlay() {
        return (
            <GridOverlay>
                <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                    <LinearProgress />
                </div>
            </GridOverlay>
        );
    }

    handleChange = (event) => {
        this.setState({'temperature_unit': event.target.value});
    };

    render() {
        const { data, loaded, temperature_unit } = this.state;
        const columns = [
            {
                field: 'city',
                width: 200,
                renderHeader: (params) => (
                    <strong>
                        {'CITY'}
                    </strong>
                ),
            },
            {
                field: 'date',
                renderHeader: (params) => (
                    <strong>
                        {'DATE'}
                    </strong>
                ),
                width: 150,
                type: 'date'
            },
            {
                field: 'min_temp',
                renderHeader: (params) => (
                    <strong>
                        {'MIN TEMPERATURE (℃)'}
                    </strong>
                ),
                width: 230,
                type: 'number',
            },
            {
                field: 'max_temp',
                renderHeader: (params) => (
                    <strong>
                        {'MAX TEMPERATURE (℃)'}
                    </strong>
                ),
                width: 230,
                type: 'number'
            },
            {
                field: 'wind_speed',
                renderHeader: (params) => (
                    <strong>
                        {'WIND SPEED (metre/sec)'}
                    </strong>
                ),
                width: 225,
                type: 'number'
            },
            {
                field: 'wind_degree',
                renderHeader: (params) => (
                    <strong>
                        {'WIND DEGREE'}
                    </strong>
                ),
                width: 170,
                type: 'number'
            },
            {
                field: 'pressure',
                renderHeader: (params) => (
                    <strong>
                        {'PRESSURE (hPa)'}
                    </strong>
                ),
                width: 180,
                type: 'number'
            },
            {
                field: 'humidity',
                renderHeader: (params) => (
                    <strong>
                        {'HUMIDITY (%)'}
                    </strong>
                ),
                width: 180,
                type: 'number'
            },
            {
                field: 'col9',
                renderHeader: (params) => (
                    <strong>
                        {'WEATHER'}
                    </strong>
                ),
                width: 230,
            },
        ]
        const rows = data.map(entry => {
            return {
                id: entry.id,
                city: entry.city,
                date: entry.forecast_date,
                min_temp: temperature_unit === 'c' ? entry.min_temperature: (entry.min_temperature * 9/5) + 32,
                max_temp: temperature_unit === 'c' ? entry.max_temperature: (entry.min_temperature * 9/5) + 32,
                wind_speed: entry.wind_speed,
                wind_degree: entry.wind_degree,
                pressure: entry.pressure,
                humidity: entry.humidity,
                col8: entry.feels_like,
                col9: entry.main + ' ( ' + entry.description + ')',
            };
        })
        return (
            <div>
                {data ? (
                    <>
                        <Typography variant="h4" color="textSecondary" paragraph="true">
                            Daily Weather Data
                        </Typography>
                        <FormControl component="fieldset" align="left">
                            <FormLabel component="legend">Temperature Unit</FormLabel>
                            <RadioGroup aria-label="temperature_unit" name="temperatureUnit" value={temperature_unit} onChange={this.handleChange}>
                                <FormControlLabel value="f" control={<Radio />} label="Farenheit" />
                                <FormControlLabel value="c" control={<Radio />} label="Celsius" />
                            </RadioGroup>
                        </FormControl>
                        <div style={{ height: 800, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                components={{
                                    LoadingOverlay: this.customLoadingOverlay,
                                }}
                            />
                        </div>
                    </>
                ) : (!loaded ? "Loading..." : "No policies found")}
            </div>
        );
    }
}

export default DailyWeather;