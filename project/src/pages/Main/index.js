import React, { Component } from 'react';

// services
import { bing, weather, opencage } from '../../services/api';

// styles
import './styles.scss';

class Main extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            backgroundURL: '',
            coords: {}
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
        console.log('city-> ',response)
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
                {this.state.coords.length && <>{this.state.coords.latitude}, {this.state.coords.longitude}</>}
            </main>
        )
    }
}

export default Main