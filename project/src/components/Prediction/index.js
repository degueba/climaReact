import React, {Component} from 'react';

import './styles.scss';
import { blue } from 'ansi-colors';

class Prediction extends Component {
    constructor(props){
        super(props)

        this.state = {
            tomorrow: '',
            dayAfterTomorrow: ''
        }
    }

    celsiusToFah = (temp) => {
        return temp * 9 / 5 + 32;
    }

    formatTemp(temp, isFah=false){
        return isFah ? `${temp} ℉` : `${temp} ℃`
    }

    tempColor(temp, opacity = .7){
        let color = `168,168,168,0.3`; // cinza

        if(temp < 15){
            color = `0,127,255${opacity && `,${opacity}`}`; // blue to weather cold
        } else if(temp > 35){
            color = `255,0,0${opacity && `,${opacity}`}`; // red to weather hot 
        } else if(temp > 15 && temp < 35){
            color = `251, 207, 68${opacity && `,${opacity}`}`; // yellow to comfortable temperature 
        }       
        
        return color;
    }

    getTomorrowAndAfterTemp(){
        const self = this
        let { forecast: { list } } = this.props;
        
        let tempTomorrow = list[1].main.temp;
        let tempDayAfterTomorrow = list[2].main.temp;
        
        this.setState({tomorrow: tempTomorrow, dayAfterTomorrow: tempDayAfterTomorrow})
    }
    
    async componentDidMount(){
        await this.getTomorrowAndAfterTemp()
    }

    render() {
        let {weather: {name, main: {temp, pressure, humidity}, wind: {speed}, weather:insideWeather}} = this.props;
        let {id, main, description, icon} = insideWeather[0]

        return (
            <div className="prediction">
                <h1 className="prediction__title">
                    <i className="icon" data-icon="("></i> 
                    <span>{name}</span>
                </h1>
                <ul className="prediction__list">
                    <li className="prediction__item prediction__item-today" style={{background: `rgba(${this.tempColor(temp)})`}}>
                        <div className="prediction__icon">
                            <span>
                                <i className="icon" data-icon={icon.toUpperCase()}></i>
                            </span>
                        </div>
                        <div className="prediction__info">
                            <h5 className="prediction__info-title">HOJE</h5>
                            <span>{this.formatTemp(temp)}</span>
                            <ul className="prediction__info-list">
                                <li>
                                    {main}
                                </li>
                                <li>
                                    <span>Vento:</span>
                                    <b> { speed } km/h</b>
                                </li>
                                <li>
                                    <span> Umidade: </span>
                                    <b> { humidity }%</b>
                                </li>
                                <li>
                                    <span> Pressão: </span>
                                    <b> { pressure }hpa</b>
                                </li>
                            </ul>  
                        </div>
                    </li>
                    <li className="prediction__item  prediction__item-tomorrow" style={{background: `rgba(${this.tempColor(temp, 1)})`}}>
                        <div className="prediction__item--box">
                            <h5>Amanhã</h5>
                            <b>{this.state.tomorrow && this.formatTemp(this.state.tomorrow)}</b>
                        </div>
                    </li>
                    <li className="prediction__item prediction__item-aftertomorrow" style={{background: `rgba(${this.tempColor(temp)})`}}>
                        <div className="prediction__item--box">
                            <h5>Depois de amanhã</h5>
                            <b>{this.state.dayAfterTomorrow && this.formatTemp(this.state.dayAfterTomorrow)}</b>
                        </div>
                        
                    </li>
                </ul>
            </div>
        )
    }
}

export default Prediction;