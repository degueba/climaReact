import React, { Component } from 'react';

// services
import { bing, weather, opencage, forecast } from '../../services/api';

// styles
import './styles.scss';

// Components
import Prediction from '../../components/Prediction';

class Main extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            backgroundURL: '',
            coords: {},
            city: '',
            weatherData: {},
            forecastData: {}
        }
    }  

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else { 
           console.log("Geolocation não é suportado por esse browser.");
        }
    }

    getCity = async ({...position}) => {
        let response = await opencage({...position});

        let {results} = response.data;
        let city = results[0].components.city; // just get first item on array to get city

        this.setState({city});

        
        this.getWeather(city);
        this.getForecast(city);
    }

    getWeather = async (city) => {
        let response = await weather(city);

        let weatherData = response.data;
        this.setState({weatherData})
    }

    getForecast = async (city) => {
        let response = await forecast(city);

        let forecastData = response.data;
        this.setState({forecastData})
    }

    showPosition = (position) => {        
        let {coords} = position;

        this.setState({coords});
        this.getCity({coords});
    }
    
    setBackground = async () => {
        let response = await bing();

        const {data: {images: [background]}} = response;

        let {url} = background;
        let backgroundURL = `https://www.bing.com${url}`;

        this.setState({backgroundURL})
    }

    componentDidMount(){
        this.getLocation()
        this.setBackground()
    }

    render(){
        return (
            <main className="main" style={{background: `url(${this.state.backgroundURL})`}}>
                {(Object.keys(this.state.weatherData).length && Object.keys(this.state.forecastData).length) ? <Prediction forecast={this.state.forecastData} weather={this.state.weatherData}/> : <div>Carregando...</div>} 
            </main>
        )
    }
}

export default Main