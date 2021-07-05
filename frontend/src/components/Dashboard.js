import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Dashboard() {
    const history = useHistory();
    return (
        <div>
            <header className="App-header">
                <Typography variant="h3" color="inherit" paragraph={true} align="center">
                    Dashboard
                </Typography>
                <Grid direction="column" xs={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => history.push({
                            pathname: '/dailyweather',
                        })}
                        style={{ marginLeft: 16, marginTop: 32 }}
                    >
                        Daily Weather Data
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => history.push({
                            pathname: '/currentweather',
                        })}
                        style={{ marginLeft: 16, marginTop: 32 }}
                    >
                        Current Weather Data
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => history.push({
                            pathname: '/charts/currenttemperature',
                        })}
                        style={{ marginLeft: 16, marginTop: 32 }}
                    >
                        Current Temperature Chart
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => history.push({
                            pathname: '/charts/recenttemperaturetrend',
                        })}
                        style={{ marginLeft: 16, marginTop: 32 }}
                    >
                        Recent Temperature Trends Chart
                    </Button>
                </Grid>
            </header>
        </div>
    );
}

export default Dashboard;