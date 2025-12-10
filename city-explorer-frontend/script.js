// ----------------- Search City -----------------
async function searchCity() {
    const cityName = document.getElementById("cityInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!cityName) {
        resultDiv.classList.remove("hidden");
        resultDiv.innerHTML = "<p>⚠️ Please enter a city name!</p>";
        return;
    }

    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = "<p>⏳ Fetching information...</p>";

    try {
        const geoDBKey = "48c04111damshbbf353186b98196p1e8fc4jsn42ba124ed82e";
        const weatherKey = "3b0622f169ed566744c51020a892bd05";

        // 1️⃣ GeoDB API
        const geoRes = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityName}&limit=1`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': geoDBKey,
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        });
        const geoData = await geoRes.json();
        if (!geoData.data.length) {
            resultDiv.innerHTML = "❌ City not found!";
            return;
        }

        const cityData = geoData.data[0];
        const { latitude, longitude, population, countryCode, name } = cityData;

        // 2️⃣ OpenWeatherMap API
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherKey}`);
        const weatherData = await weatherRes.json();
        const weather = {
            temp: weatherData.main?.temp ?? "N/A",
            humidity: weatherData.main?.humidity ?? "N/A",
            description: weatherData.weather ? weatherData.weather[0].description : "N/A"
        };

        // Local time
        const timezoneOffset = weatherData.timezone; // seconds offset from UTC
        const localTime = new Date(Date.now() + timezoneOffset * 1000).toLocaleString();

        // Wikipedia link
        const wikiLink = `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`;

        // 3️⃣ RestCountries API
        const countryRes = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const countryData = await countryRes.json();
        const country = countryData[0];
        const countryInfo = {
            name: country.name.common,
            flag: country.flags.svg,
            region: country.region,
            currency: country.currencies ? Object.keys(country.currencies)[0] : "N/A",
            languages: country.languages ? Object.values(country.languages) : ["N/A"]
        };

        // 4️⃣ Combine data
        const finalData = {
            city: name,
            latitude,
            longitude,
            population,
            country: countryInfo.name,
            flag: countryInfo.flag,
            region: countryInfo.region,
            currency: countryInfo.currency,
            languages: countryInfo.languages,
            weather,
            localTime,
            wikiLink,
            searchedAt: new Date()
        };

        // 5️⃣ Send to backend
        try {
            await fetch("http://localhost:5000/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": "12345ABCDEF",
                    "Authorization": "Bearer MY_SECRET_TOKEN_2025"
                },
                body: JSON.stringify(finalData)
            });
            console.log("✅ Data sent to backend successfully!");
        } catch (saveError) {
            console.error("❌ Backend save error:", saveError);
        }

        // 6️⃣ Display city info
        displayCity(finalData);

    } catch (err) {
        console.error(err);
        resultDiv.innerHTML = "<p>❌ Error fetching data. Check API keys and internet connection.</p>";
    }
}

// ----------------- Display City -----------------
function displayCity(data) {
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `
        <div class="city-header">
            <h2>${data.city}, <span>${data.country}</span></h2>
            <img src="${data.flag}" class="flag">
        </div>

        <div class="info-section">
            <div class="card">
                <h3>🌍 City Details</h3>
                <p><b>Population:</b> ${data.population.toLocaleString()}</p>
                <p><b>Coordinates:</b> ${data.latitude}, ${data.longitude}</p>
                <p><b>Local Time:</b> ${data.localTime}</p>
            </div>
            <div class="card">
                <h3>⛅ Weather</h3>
                <p><b>Temperature:</b> ${data.weather.temp}°C</p>
                <p><b>Humidity:</b> ${data.weather.humidity}%</p>
                <p><b>Description:</b> ${data.weather.description}</p>
            </div>
            <div class="card">
                <h3>Country</h3>
                <p><b>Region:</b> ${data.region}</p>
                <p><b>Currency:</b> ${data.currency}</p>
                <p><b>Languages:</b> ${data.languages.join(", ")}</p>
            </div>
            <div class="card">
                <h3>🗺️ Map</h3>
                <iframe
                    width="100%"
                    height="250"
                    frameborder="0"
                    style="border:0; border-radius:12px;"
                    src="https://www.google.com/maps?q=${data.latitude},${data.longitude}&hl=en&z=12&output=embed"
                    allowfullscreen>
                </iframe>
            </div>
            <div class="card">
                <h3>📖 Learn More</h3>
                <p><a href="${data.wikiLink}" target="_blank">View ${data.city} on Wikipedia</a></p>
            </div>
        </div>

        <h3>📦 Raw JSON</h3>
        <details class="json-box">
            <summary>Click to expand JSON</summary>
            <pre>${JSON.stringify(data, null, 4)}</pre>
        </details>
    `;
}

// ----------------- Load Search History -----------------
async function loadHistory() {
    // Open the history page instead of inline display
    window.location.href = "history.html";
}
