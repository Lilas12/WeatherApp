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
    background-color: #0f172a;
  }
`;

//ANIMATIONS
const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.6; transform: scale(0.98); }
`;

const float = keyframes`
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-12px) scale(1.05); }
  100% { transform: translateY(0px) scale(1); }
`;

const buttonGlow = keyframes`
  0% { box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4); }
  50% { box-shadow: 0 4px 25px rgba(13, 148, 136, 0.7); }
  100% { box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4); }
`;

// STYLED COMPONENTS
const AppContainer = styled.div`
  background: linear-gradient(-45deg, #0f172a, #1e3a8a, #0284c7, #0d9488);
  background-size: 400% 400%;
  animation: ${gradientMove} 15s ease infinite;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

const WeatherCard = styled.div`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 40px 30px;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-align: center;
  width: 100%;
  max-width: 390px;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 25px;
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const SearchForm = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  font-size: 16px;
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-weight: 500;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  }
`;

const SearchButton = styled.button`
  padding: 15px 24px;
  background: linear-gradient(135deg, #0284c7, #0d9488);
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  animation: ${buttonGlow} 3s infinite ease-in-out;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const WeatherInfo = styled.div`
  margin-top: 10px;
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const CityName = styled.h3`
  margin: 10px 0 0 0;
  color: #ffffff;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const EmojiIcon = styled.div`
  font-size: 95px;
  line-height: 1;
  margin: 15px auto;
  display: block;
  user-select: none;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
  animation: ${float} 4.5s ease-in-out infinite;
`;

const Temperature = styled.p`
  font-size: 80px;
  font-weight: 900;
  margin: 0;
  color: #ffffff;
  letter-spacing: -3px;
  line-height: 1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const Condition = styled.p`
  text-transform: capitalize;
  color: rgba(255, 255, 255, 0.85);
  font-size: 18px;
  margin: 8px 0 25px 0;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 18px 20px;
  border-radius: 24px;
  backdrop-filter: blur(10px);
  box-shadow: inset 0 1px 10px rgba(0, 0, 0, 0.05);
`;

const DetailText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  flex: 1;
  font-weight: 600;

  &:first-child {
    border-right: 1px solid rgba(255, 255, 255, 0.15);
  }

  strong {
    color: #38bdf8;
    display: block;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
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
  color: #38bdf8;
  font-weight: 800;
  text-align: center;
  margin: 30px 0;
  font-size: 17px;
  letter-spacing: 0.5px;
  animation: ${pulse} 1.2s infinite ease-in-out;
`;

const API_KEY = 'a0382fa2b6d51c7b0306f5839d9e8099';

//COMPONENT
function Weather() {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeatherEmoji = (iconCode) => {
    if (!iconCode) return '🌤️';
    const code = iconCode.replace('n', 'd');
    switch(code) {
      case '01d': return '☀️';
      case '02d': return '⛅';
      case '03d': return '☁️';
      case '04d': return '☁️';
      case '09d': return '🌧️';
      case '10d': return '🌦️';
      case '11d': return '⛈️';
      case '13d': return '❄️';
      case '50d': return '🌫️';
      default: return '🌤️';
    }
  };

  useEffect(() => {
    const fetchInitialWeather = async () => {
      setLoading(true);
      setError(null);
      try {
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
      <GlobalStyle />
      <AppContainer>
        <WeatherCard>
          <Title>Weather App</Title>

          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search city..."
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

              <EmojiIcon role="img" aria-label={weatherData.description}>
                {getWeatherEmoji(weatherData.icon)}
              </EmojiIcon>

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
