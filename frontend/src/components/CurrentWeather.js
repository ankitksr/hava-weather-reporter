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


class CurrentWeather extends Component {
    state = {
        data: [],
        temperature_unit: "c",
        loaded: false,
    }

    constructor() {
        super()
        this.getCurrentWeatherData()
    }

    getCurrentWeatherData = () => {
        let url = '/api/v1/currentweather/';
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
        this.setState({ 'temperature_unit': event.target.value });
    };

    render() {
        const { data, loaded, temperature_unit } = this.state;
        const tempFieldSuffix = temperature_unit === 'c' ? '(℃)' : '(°F)';
        const columns = [
            {
                field: 'col1',
                width: 200,
                renderHeader: (params) => (
                    <strong>
                        {'CITY'}
                    </strong>
                ),
            },
            {
                field: 'col2',
                renderHeader: (params) => (
                    <strong>
                        {`AVG TEMPERATURE ${tempFieldSuffix}`}
                    </strong>
                ),
                width: 230,
                type: 'number'
            },
            {
                field: 'col3',
                renderHeader: (params) => (
                    <strong>
                        {`MIN TEMPERATURE ${tempFieldSuffix}`}
                    </strong>
                ),
                width: 230,
                type: 'number'
            },
            {
                field: 'col4',
                renderHeader: (params) => (
                    <strong>
                        {`MAX TEMPERATURE ${tempFieldSuffix}`}
                    </strong>
                ),
                width: 230,
                type: 'number'
            },
            {
                field: 'col5',
                renderHeader: (params) => (
                    <strong>
                        {'WIND SPEED (metre/sec)'}
                    </strong>
                ),
                width: 225,
                type: 'number'
            },
            {
                field: 'col6',
                renderHeader: (params) => (
                    <strong>
                        {'VISIBILITY'}
                    </strong>
                ),
                width: 130,
                type: 'number'
            },
            {
                field: 'col7',
                renderHeader: (params) => (
                    <strong>
                        {'CLOUDS'}
                    </strong>
                ),
                width: 120,
                type: 'number'
            },
            {
                field: 'col8',
                renderHeader: (params) => (
                    <strong>
                        {`FEELS LIKE ${tempFieldSuffix}`}
                    </strong>
                ),
                width: 170,
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
                col1: entry.city,
                col2: temperature_unit === 'c' ? entry.avg_temperature: (entry.avg_temperature * 9/5) + 32,
                col3: temperature_unit === 'c' ? entry.min_temperature: (entry.min_temperature * 9/5) + 32,
                col4: temperature_unit === 'c' ? entry.max_temperature: (entry.max_temperature * 9/5) + 32,
                col5: entry.wind_speed,
                col6: entry.visibility,
                col7: entry.clouds,
                col8: temperature_unit === 'c' ? entry.feels_like: (entry.feels_like * 9/5) + 32,
                col9: entry.main + ' ( ' + entry.description + ')',
            };
        })
        return (
            <div>
                {data ? (
                    <>
                        <Typography variant="h4" color="textSecondary" paragraph="true" align="center">
                            Current Weather Data
                        </Typography>
                        <FormControl component="fieldset" align="left">
                            <FormLabel component="legend">Temperature Unit</FormLabel>
                            <RadioGroup aria-label="temperature_unit" name="temperatureUnit" value={temperature_unit} onChange={this.handleChange}>
                                <FormControlLabel value="f" control={<Radio />} label="Fahrenheit" />
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

export default CurrentWeather;