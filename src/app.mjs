import express from "express";
import path from "path";
import process from "process"
import hbs from "hbs";
import { getGeoCode } from "./utils/geocode.mjs";
import { forecast } from "./utils/forecast.mjs";

const app = express();
const port = process.env.PORT || 3000;

// define path for experess config
const publicFolder = path.join(process.argv[1],'../../public');
const viewsFolder = path.join(process.argv[1],'../../public/templates/views');
const partialsFolder = path.join(process.argv[1],'../../public/templates/partials');


//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsFolder);
hbs.registerPartials(partialsFolder);

// setup static directory to serve
app.use(express.static(publicFolder));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Jabed'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Jabed'
    });
});

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Jabed'
    });
});

app.get('/weather', ({query}, res) => {
    if(query)
    {
        getGeoCode(query.address,(error,{center} = {}) =>{
            console.log('Location: '+query.address);
            // console.log('Lat: '+center[1]+' Long: '+center[0]);

            if(error)
            {
                res.send({
                    error: error
                })
            }
            else
            {
                forecast(center[1], center[0], (error, data) => {
                    if(error)
                    {
                        res.send({
                            error: error
                        })
                    }
                    else{
                        console.log('It is currently '+data.current.temperature+' degress out. It feels like '+data.current.feelslike+ ' degress out.');
                        res.send({
                            forecast: data.current.weather_descriptions[0],
                            temperature: data.current.temperature,
                            location: data.location.name
                        })
                    }

                })
            }
        });

    }
    else
    {
        res.send({
            error: 'address is required'
        })
    }
});

app.get('/help/*', (req, res) => {
    res.render('error',{
        Error: 'Help article not found',
        name: 'Jabed',
        title: '404 Error'

    });
});

app.get('*', (req, res) => {
    res.render('error',{
        Error: 'Page not found',
        name: 'Jabed',
        title: '404 Error'
    });
});


app.listen(port, () =>{
    console.log('Listening on port: '+port);
});