// import { useState, useEffect } from 'react';
// import styled, { keyframes } from 'styled-components'; // <--- Båda samlade på en och samma rad!


// // --- ANIMATIONER (Helt fristående CSS) ---
// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const pulse = keyframes`
//   0% { opacity: 0.5; }
//   50% { opacity: 1; }
//   100% { opacity: 0.5; }
// `;

// const float = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-6px); }
//   100% { transform: translateY(0px); }
// `;

// // --- STYLED COMPONENTS ---
// const WeatherCard = styled.div`
//   background-color: white;
//   padding: 30px;
//   border-radius: 24px; /* Lite mjukare hörn */
//   box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
//   text-align: center;
//   width: 100%;
//   max-width: 380px;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   /* Snygg hover-effekt på hela kortet */
//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
//   }
// `;

// const Title = styled.h2`
//   margin-top: 0;
//   color: #1a202c;
//   font-size: 24px;
//   font-weight: 800;
// `;

// const SearchForm = styled.form`
//   display: flex;
//   gap: 8px;
//   margin-bottom: 20px;
// `;

// const SearchInput = styled.input`
//   flex: 1;
//   padding: 12px 16px;
//   border: 2px solid #e2e8f0;
//   border-radius: 12px;
//   font-size: 16px;
//   outline: none;
//   transition: border-color 0.2s ease, box-shadow 0.2s ease;

//   &:focus {
//     border-color: #3182ce;
//     box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.15); /* Blå glöd vid klick */
//   }
// `;

// const SearchButton = styled.button`
//   padding: 12px 20px;
//   background-color: #3182ce;
//   color: white;
//   border: none;
//   border-radius: 12px;
//   cursor: pointer;
//   font-size: 16px;
//   font-weight: 600;
//   transition: background-color 0.2s ease, transform 0.1s ease;

//   &:hover {
//     background-color: #2b6cb0;
//   }

//   /* Knappen trycks ner en aning när man klickar */
//   &:active {
//     transform: scale(0.95);
//   }
// `;

// const WeatherInfo = styled.div`
//   margin-top: 20px;
//   animation: ${fadeIn} 0.5s ease-out forwards; /* Tonar in vädret mjukt */
// `;

// const CityName = styled.h3`
//   margin: 10px 0 0 0;
//   color: #2d3748;
//   font-size: 24px;
//   font-weight: 700;
// `;

// const WeatherIcon = styled.img`
//   width: 110px;
//   height: 110px;
//   margin: 0 auto;
//   animation: ${float} 3s ease-in-out infinite; /* Svävar upp och ner automatiskt! */
// `;

// const Temperature = styled.p`
//   font-size: 64px;
//   font-weight: 800;
//   margin: 0;
//   color: #2d3748;
//   letter-spacing: -2px;
// `;

// const Condition = styled.p`
//   text-transform: capitalize;
//   color: #4a5568;
//   font-size: 18px;
//   margin: 5px 0 25px 0;
//   font-weight: 500;
// `;

// const DetailsContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   border-top: 2px solid #f7fafc;
//   padding-top: 20px;
//   margin-top: 20px;
// `;

// const DetailText = styled.p`
//   margin: 0;
//   font-size: 14px;
//   color: #718096;

//   strong {
//     color: #2d3748;
//     display: block;
//     margin-bottom: 4px;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: #e53e3e;
//   font-weight: 500;
//   background-color: #fff5f5;
//   padding: 12px;
//   border-radius: 12px;
//   border: 1px solid #fed7d7;
//   margin: 15px 0;
//   animation: ${fadeIn} 0.3s ease-out;
// `;

// const LoadingText = styled.p`
//   color: #3182ce;
//   font-weight: 600;
//   text-align: center;
//   margin: 20px 0;
//   animation: ${pulse} 1.5s infinite ease-in-out; /* Pulserar vid laddning */
// `;


// // Din verifierade API-nyckel
// const API_KEY = 'a0382fa2b6d51c7b0306f5839d9e8099';

// // --- MAIN COMPONENT ---
// function Weather() {
//   const [searchInput, setSearchInput] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     const fetchInitialWeather = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const geoResponse = await fetch(
//           `https://api.openweathermap.org/geo/1.0/direct?q=Stockholm&limit=1&appid=${API_KEY}`
//         );
//         const geoData = await geoResponse.json();
//         if (!geoData || geoData.length === 0) return;

//         const { lat, lon, name } = geoData[0];
//         const weatherResponse = await fetch(
//           `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&lang=en&appid=${API_KEY}`
//         );

//         if (!weatherResponse.ok) {
//           const fallbackResponse = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=${API_KEY}&units=metric&lang=en`
//           );
//           if (!fallbackResponse.ok) return;
//           const fallbackData = await fallbackResponse.json();
//           setWeatherData({
//             name: fallbackData.name,
//             temp: fallbackData.main.temp,
//             description: fallbackData.weather[0].description,
//             icon: fallbackData.weather[0].icon,
//             humidity: fallbackData.main.humidity,
//             wind: fallbackData.wind.speed
//           });
//           return;
//         }

//         const data = await weatherResponse.json();
//         setWeatherData({
//           name: name,
//           temp: data.current.temp,
//           description: data.current.weather[0].description,
//           icon: data.current.weather[0].icon,
//           humidity: data.current.humidity,
//           wind: data.current.wind_speed
//         });
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialWeather();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchInput.trim() === '') return;

//     setLoading(true);
//     setError(null);

//     try {
//       const geoResponse = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${API_KEY}`
//       );
//       const geoData = await geoResponse.json();

//       if (!geoData || geoData.length === 0) {
//         throw new Error('City not found. Please check the spelling.');
//       }

//       const { lat, lon, name } = geoData[0];
//       const weatherResponse = await fetch(
//         `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&lang=en&appid=${API_KEY}`
//       );

//       if (!weatherResponse.ok) {
//         const fallbackResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${API_KEY}&units=metric&lang=en`
//         );
//         if (!fallbackResponse.ok) throw new Error('City not found.');
//         const fallbackData = await fallbackResponse.json();
//         setWeatherData({
//           name: fallbackData.name,
//           temp: fallbackData.main.temp,
//           description: fallbackData.weather[0].description,
//           icon: fallbackData.weather[0].icon,
//           humidity: fallbackData.main.humidity,
//           wind: fallbackData.wind.speed
//         });
//         setSearchInput('');
//         return;
//       }

//       const data = await weatherResponse.json();
//       setWeatherData({
//         name: name,
//         temp: data.current.temp,
//         description: data.current.weather[0].description,
//         icon: data.current.weather[0].icon,
//         humidity: data.current.humidity,
//         wind: data.current.wind_speed
//       });
//       setSearchInput('');
//     } catch (err) {
//       setError(err.message);
//       setWeatherData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <WeatherCard>
//       <Title>Weather Management App</Title>

//       <SearchForm onSubmit={handleSearch}>
//         <SearchInput
//           type="text"
//           placeholder="Search for a city..."
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//         />
//         <SearchButton type="submit">Search</SearchButton>
//       </SearchForm>

//       {loading && <LoadingText>Fetching weather data...</LoadingText>}
//       {error && <ErrorMessage>{error}</ErrorMessage>}

//       {weatherData && !loading && (
//         <WeatherInfo>
//           <CityName>{weatherData.name}</CityName>

//           <WeatherIcon
//             src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
//             alt={weatherData.description}
//           />

//           <Temperature>{Math.round(weatherData.temp)}°C</Temperature>
//           <Condition>{weatherData.description}</Condition>

//           <DetailsContainer>
//             <DetailText><strong>Humidity:</strong> {weatherData.humidity}%</DetailText>
//             <DetailText><strong>Wind:</strong> {weatherData.wind} m/s</DetailText>
//           </DetailsContainer>
//         </WeatherInfo>
//       )}
//     </WeatherCard>
//   );
// }

// export default Weather;

import { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

// --- GLOBAL STYLES ---
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body, html {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #0f172a; /* Mörk bas för att ljusa färger ska poppa */
  }
`;

// --- ANIMATIONER ---
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.6; transform: scale(0.98); }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

// --- STYLED COMPONENTS ---

// En djup, levande norrskens-liknande vädergradient över hela skärmen
const AppContainer = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #0284c7 80%, #0d9488 100%);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

const WeatherCard = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px); /* Kraftig glaseffekt */
  -webkit-backdrop-filter: blur(16px);
  padding: 40px 30px;
  border-radius: 30px; /* Ännu mjukare, modernare hörn */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Ljus kant för glaseffekten */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(2, 132, 199, 0.2); /* Neon-blå glöd */
  text-align: center;
  width: 100%;
  max-width: 380px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.6), 0 0 50px rgba(2, 132, 199, 0.4);
  }
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 25px;
  color: #1e293b;
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #1e3a8a, #0284c7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* Titeln får en snygg färggradient */
`;

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 14px 18px;
  border: 2px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  font-size: 16px;
  outline: none;
  background-color: rgba(248, 250, 252, 0.8);
  color: #1e293b;
  font-weight: 500;
  transition: all 0.3s ease;

  &:focus {
    border-color: #0284c7;
    background-color: white;
    box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.2);
  }
`;

const SearchButton = styled.button`
  padding: 14px 24px;
  background: linear-gradient(135deg, #0284c7, #0d9488); /* Intensiv blå-grön gradient */
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(2, 132, 199, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #0369a1, #0f766e);
    box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const CityName = styled.h3`
  margin: 10px 0 0 0;
  color: #0f172a;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
`;

const WeatherIcon = styled.img`
  width: 130px;
  height: 130px;
  margin: 0 auto;
  filter: drop-shadow(0 12px 16px rgba(2, 132, 199, 0.2)); /* Glödande skugga under molnet */
  animation: ${float} 4s ease-in-out infinite;
`;

const Temperature = styled.p`
  font-size: 76px;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #0284c7, #0369a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* Temperaturen matchar titeln med gradient */
  letter-spacing: -4px;
  line-height: 1;
`;

const Condition = styled.p`
  text-transform: capitalize;
  color: #475569;
  font-size: 19px;
  margin: 10px 0 30px 0;
  font-weight: 700;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.08), rgba(13, 94, 136, 0.08)); /* Tonad panel */
  border: 1px solid rgba(2, 132, 199, 0.1);
  padding: 18px 20px;
  border-radius: 20px;
  margin-top: 20px;
`;

const DetailText = styled.p`
  margin: 0;
  font-size: 15px;
  color: #334155;
  text-align: center;
  flex: 1;
  font-weight: 600;

  &:first-child {
    border-right: 1px solid rgba(2, 132, 199, 0.2);
  }

  strong {
    color: #0284c7; /* Färgade rubriker för detaljerna */
    display: block;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
    font-weight: 800;
  }
`;

const ErrorMessage = styled.p`
  color: white;
  font-weight: 600;
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  padding: 14px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
  margin: 20px 0;
  animation: ${fadeIn} 0.4s ease-out;
`;

const LoadingText = styled.p`
  color: #0284c7;
  font-weight: 800;
  text-align: center;
  margin: 30px 0;
  font-size: 17px;
  letter-spacing: 0.5px;
  animation: ${pulse} 1.2s infinite ease-in-out;
`;

// Din verifierade API-nyckel
const API_KEY = 'a0382fa2b6d51c7b0306f5839d9e8099';

// --- MAIN COMPONENT ---
function Weather() {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        // Startar med Syria direkt
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=Syria&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();
        if (!geoData || geoData.length === 0) return;

        const { lat, lon, name } = geoData[0];
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&lang=en&appid=${API_KEY}`
        );

        if (!weatherResponse.ok) {
          const fallbackResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Syria&appid=${API_KEY}&units=metric&lang=en`
          );
          if (!fallbackResponse.ok) return;
          const fallbackData = await fallbackResponse.json();
          setWeatherData({
            name: fallbackData.name,
            temp: fallbackData.main.temp,
            description: fallbackData.weather[0].description,
            icon: fallbackData.weather[0].icon,
            humidity: fallbackData.main.humidity,
            wind: fallbackData.wind.speed
          });
          return;
        }

        const data = await weatherResponse.json();
        setWeatherData({
          name: name,
          temp: data.current.temp,
          description: data.current.weather[0].description,
          icon: data.current.weather[0].icon,
          humidity: data.current.humidity,
          wind: data.current.wind_speed
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialWeather();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;

    setLoading(true);
    setError(null);

    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (!geoData || geoData.length === 0) {
        throw new Error('City not found. Please check the spelling.');
      }

      const { lat, lon, name } = geoData[0];
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&lang=en&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        const fallbackResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${API_KEY}&units=metric&lang=en`
        );
        if (!fallbackResponse.ok) throw new Error('City not found.');
        const fallbackData = await fallbackResponse.json();
        setWeatherData({
          name: fallbackData.name,
          temp: fallbackData.main.temp,
          description: fallbackData.weather[0].description,
          icon: fallbackData.weather[0].icon,
          humidity: fallbackData.main.humidity,
          wind: fallbackData.wind.speed
        });
        setSearchInput('');
        return;
      }

      const data = await weatherResponse.json();
      setWeatherData({
        name: name,
        temp: data.current.temp,
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
        humidity: data.current.humidity,
        wind: data.current.wind_speed
      });
      setSearchInput('');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle /> {/* <--- Rensar alla vita kanter i webbläsaren! */}
      <AppContainer>
        <WeatherCard>
          <Title>Weather Management App</Title>

          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search for a city..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <SearchButton type="submit">Search</SearchButton>
          </SearchForm>

          {loading && <LoadingText>Fetching weather data...</LoadingText>}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {weatherData && !loading && (
            <WeatherInfo>
              <CityName>{weatherData.name}</CityName>

              <WeatherIcon
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData.description}
              />

              <Temperature>{Math.round(weatherData.temp)}°C</Temperature>
              <Condition>{weatherData.description}</Condition>

              <DetailsContainer>
                <DetailText><strong>Humidity</strong> {weatherData.humidity}%</DetailText>
                <DetailText><strong>Wind</strong> {weatherData.wind} m/s</DetailText>
              </DetailsContainer>
            </WeatherInfo>
          )}
        </WeatherCard>
      </AppContainer>
    </>
  );
}

export default Weather;
