document.addEventListener('DOMContentLoaded', () => {
    const marsDataElement = document.getElementById('marsData');

    // Fetch the latest Mars weather data from the NASA InSight API
    fetch('https://api.nasa.gov/insight_weather/?api_key=cCdjmqlGi0bBiuC1XefBouNbYJIviX9fkTyjQYXP&feedtype=json&ver=1.0')
        .then(response => response.json())
        .then(data => {
            const sol_keys = data.sol_keys;
            const latestSol = sol_keys[sol_keys.length - 1];
            const latestData = data[latestSol];

            const sol= latestSol;
            const temperature = latestData.AT.av;
            const minTemperature = latestData.AT.mn;
            const maxTemperature = latestData.AT.mx;
            const windSpeed = latestData.HWS.av;
            const windDirection = latestData.WD.most_common.compass_point;
            const pressure = latestData.PRE.av;
            const opacity = latestData.AT.av;
            const season = latestData.Season;
            
            // Display the Mars data
            marsDataElement.innerHTML = `
                <p><strong>Sol:</strong> ${sol}</p>
                <p><strong>Average Temperature:</strong> ${temperature} °C</p>
                <p><strong>Average Wind Speed:</strong> ${windSpeed} m/s</p>
                <p><strong>Average Pressure:</strong> ${pressure} Pa</p>
                <p><strong>Min Temperature:</strong> ${minTemperature} °C</p>
                <p><strong>Max Temperature:</strong> ${maxTemperature} °C</p>
                <p><strong>Wind Direction:</strong> ${windDirection}</p>
                <p><strong>Opacity:</strong> ${opacity}</p>
                <p><strong>Season:</strong> ${season}</p>

            `;
        })
        .catch(error => {
            marsDataElement.innerHTML = '<p>Error fetching Mars data. Please try again later.</p>';
            console.error('Error fetching Mars data:', error);
        });
});