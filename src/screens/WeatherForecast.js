import { useState, useEffect } from 'react';
import API from '../API';
import dateFormat from 'dateformat';

const WeatherForecast = () => {

    const [forecast, setForecast] = useState([]);
    const [time, setTime] = useState('');

    const getWeather = async () => {
        const { status, data } = await API.get('/environment/2-hour-weather-forecast');
        const forecasts = data.items[0].forecasts;
        const timestamp = data.items[0].timestamp;
        if (status === 200) {
            setForecast(forecasts);
            setTime(timestamp)
        }
    }

    useEffect(() => {
        getWeather();
    }, []);

    return (<>
        <h2>Singapore<br />2-hour Weather Forecast</h2>
        <div className='subheader'>As of {dateFormat(time, "dddd, dS mmmm yyyy, h:MM TT")}</div>
        <table>
            <thead>
                <tr>
                    <th>Area</th>
                    <th>Forecast</th>
                </tr>
            </thead>
            <tbody>
                {forecast.map((f) => {
                    return (
                        <tr>
                            <td>{f.area}</td>
                            <td>{f.forecast}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        {/* <ul>
            {forecast.map((f) => {
                return <li>{f.area}: {f.forecast}</li>
            })}
        </ul> */}
        <div>
            BaseURL: {config.baseURL}
        </div>
    </>);
}

export default WeatherForecast;