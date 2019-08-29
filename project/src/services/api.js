import axios from 'axios';
import {isLocalhost} from '../utils';

export const bing = async () => {
    try {
        let response = await axios.get(`${isLocalhost()}https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR`)
        return response
    } catch(error) {
        console.log('Não foi possível acessar a api bing')
    }
}

export const weather = async (location) => {
    try {
        let response = await axios.get(`${isLocalhost()}http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=7ba73e0eb8efe773ed08bfd0627f07b8`)    
        return response
    } catch(error){
        console.error('Não foi possível acessar a api openweathermap')
    }
}

export const gmapcity = async (url) => {
    try {
        let response = await axios.get(`${isLocalhost()}${url}`);
        return response
    } catch(error){
        console.error('Não foi possível acessar a api googlemaps')
    }    
}

export const opencage = async ({...position}) => {
    try {
        let response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude},${position.coords.longitude}&key=c63386b4f77e46de817bdf94f552cddf&language=en`)
        return response
    } catch(error){
        console.error('Não foi possível acessar a api opencage')
    }
}