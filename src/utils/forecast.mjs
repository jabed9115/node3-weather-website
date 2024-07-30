import request from "request";

export const forecast = ((lat,long,callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=5856a39bcd97d9e75485558d528118a4&query='+lat+','+long+'&units=f';
    request({url: url, json: true},(error, {body}) => {
        if(error){
            callback('Unable to connect to weatherstack',undefined);
        }
        else if(body.error){
            callback('Unable to find location',undefined);
        }
        else{
        
        callback(undefined,body);
        
        //console.log('It is currently '+current.temperature+' degress out. It feels like '+current.feelslike+ ' degress out.');
    }
    })
});