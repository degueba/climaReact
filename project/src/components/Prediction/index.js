import React, {Component} from 'react';

import './styles.scss';
import { blue } from 'ansi-colors';

class Prediction extends Component {
    constructor(props){
        super(props)
    }

    celsiusToFah = (temp) => {
        return temp * 9 / 5 + 32;
    }

    formatTemp(temp, isFah=false){
        return isFah ? `${temp} ℉` : `${temp} ℃`
    }

    tempColor(temp, opacity = .7){
        let color = `rgba(0, 255, 255, ${opacity})`;

        if(temp < 15){
            color = `rgba(255, 0, 255, ${opacity})`;
        } else if(temp > 35){
            color = `rgba(0, 255, 255, ${opacity})`;
        } else if(temp > 15 && temp < 35){
            color = `rgba(255, 255, 0, ${opacity})`;
        }       
        
        return color;
    }

    render() {
        console.log(this.props)
        let {weather: {name, main: {temp, pressure, humidity}, wind: {speed}, weather}} = this.props;

        return (
            <div className="prediction">
                <h1 className="prediction__title">
                    <i className="icon" data-icon="("></i> 
                    <span>{name}</span>
                </h1>
                <ul className="prediction__list">
                    <li className="prediction__item prediction__item-today">
                        <div className="prediction__icon">
                            <span>
                                <i className="icon" data-icon="A"></i>
                            </span>
                        </div>
                        <div  className="prediction__info">
                            <h5>HOJE</h5>
                            <span>{this.formatTemp(temp)}</span>
                            <ul>
                                <li>
                                    <span>Vento:</span>
                                    <b>{ speed } km/h</b>
                                </li>
                                <li>
                                    <span> Umidade: </span>
                                    <b>{ humidity }%</b>
                                </li>
                                <li>
                                    <span> Pressão: </span>
                                    <b>{ pressure }hpa</b>
                                </li>
                            </ul>  
                        </div>
                    </li>
                    <li className="prediction__item prediction__item-tomorrow">
                        <h5>Amanhã</h5>
                    </li>
                    <li className="prediction__item prediction__item-aftertomorrow">
                        <h5>Depois de amanhã</h5>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Prediction;