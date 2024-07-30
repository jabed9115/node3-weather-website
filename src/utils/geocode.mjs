import request from "request";

export const getGeoCode = ((location,callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoiandvcmQ5OSIsImEiOiJjbHozMW1qMDgxZHluMmpwcTV2OWF0ODhuIn0.0-MQGIuOIslTQjOKelIstQ&limit=1';

    request({url: url, json: true},(error, {body}) => {

        if(error){
            callback('Unable to connect to geocoding service',undefined);
        }
        else if(body.features.length === 0){
            callback('Unable to find location',undefined);
        }
        else{
            const feature = body.features[0];
            callback(undefined,feature);
        }
    })
});