import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import CurrentWeather from './components/CurrentWeather';
import DailyWeather from './components/DailyWeather';
import CurrentTemperatureChart from './components/CurrentTemperatureChart';
import RecentTemperatureTrendChart from './components/RecentTemperatureTrendChart';
import Dashboard from './components/Dashboard';

require('dotenv').config()

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Dashboard} exact />
            <Route path='/currentweather' component={CurrentWeather} />
            <Route path='/dailyweather' component={DailyWeather} />
            <Route path='/charts/currenttemperature' component={CurrentTemperatureChart} />
            <Route path='/charts/recenttemperaturetrend' component={RecentTemperatureTrendChart} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
