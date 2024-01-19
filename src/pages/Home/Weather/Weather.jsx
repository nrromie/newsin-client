import React, { useEffect, useState } from 'react';

const Weather = () => {
    const [location, setLocation] = useState('new-york');

    useEffect(() => {
        const script = document.createElement('script');
        script.id = 'weatherwidget-io-js';
        script.src = 'https://weatherwidget.io/js/widget.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);

        return () => {
            const existingScript = document.getElementById('weatherwidget-io-js');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, [location]);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    return (
        <div className='w-11/12 mx-auto py-6'>
            <label htmlFor="location">Choose Location:</label>
            <select
                id="location"
                className="mb-2"
                value={location}
                onChange={handleLocationChange}
            >
                <option value="new-york">New York</option>
            </select>

            <a
                className="weatherwidget-io"
                href={`https://forecast7.com/en/40d71n74d01/${location}/`}
                data-label_1={location.toUpperCase()}
                data-label_2="WEATHER"
                data-theme="dark"
            >
                {location.toUpperCase()} WEATHER
            </a>
        </div>
    );
};

export default Weather;