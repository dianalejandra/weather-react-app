import React, { useState, useEffect }  from 'react';
import './index.scss';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import { Switch, Route, Link, useParams } from 'react-router-dom';

const Home = () => {
    const [cities, setCities] = useState([]);
    const SaveCities = () => {
        fetch('https://raw.githubusercontent.com/michaelx/climate/master/climate.json')
        .then(response => response.json())
        .then(ciudades => {
            ciudades.sort((a, b) => a.country.localeCompare(b.country));
            setCities(ciudades);
        })
        .catch(err => console.log(err.message))   
    }
    useEffect(() => {
        SaveCities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <main>
            <h1 id="MAIN_TITLE">El tiempo en {cities.length} ciudades del mundo</h1>
            {cities.map((ciudad, i) => <div key={i} className="CARD"><Link to={"/ciudad/" + ciudad.city} className="selected"><h1>{ciudad.city}</h1><h2>{ciudad.country}</h2></Link></div>)}
        </main>
    );
};

const Ciudad = () => {
    const [city, setCity] = useState({});
    let params = useParams();
    let months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
        ];
    const SaveCity = () => {
        fetch('https://raw.githubusercontent.com/michaelx/climate/master/climate.json')
        .then(response => response.json())
        .then(ciudades => {
            let ciudad_filtrada = ciudades.filter((ciudad) => ciudad.city === params.city);
            setCity(ciudad_filtrada[0]);
        })
        .catch(err => console.log(err.message))   
    }
    useEffect(() => {
        SaveCity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <main id="CITY_MAIN">
            <h1 id="CITY_TITLE" style={{marginBottom: '25px'}}>{city.city}</h1>
            <h2 id="COUNTRY_TITLE">{city.country}</h2>
            {city.monthlyAvg ? city.monthlyAvg.map((date, i) => 
                <div key={i} className="BOX">
                    <h1 id="MONTH_TITLE">{months[i]}</h1>
                    <h2>
                        <i className="fas fa-thermometer-three-quarters"></i>
                        {date.high}° 
                        <i className="fas fa-thermometer-quarter"></i>
                        {date.low}° 
                    </h2>
                    <h3>🌞 {date.dryDays} días secos</h3>
                    <h3>⛄ {date.snowDays} días nevados</h3>
                    <h3>☔ {date.rainfall} mm de lluvia</h3>
                </div>
            ) : null}
        </main>
    );
};

const App = () => (
    <>
        <Header />
        <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/ciudad/:city"><Ciudad/></Route>
        </Switch> 
        <Footer />      
    </>
  );
  export default App;