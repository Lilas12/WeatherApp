import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './index.css';

// Animations
const moveUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gentleFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// --- Styled Components ---
const Wrapper = styled.div`
  height: 100vh;
  height: 100dvh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  box-sizing: border-box;

  &::before {
    content: '☀️';
    position: absolute;
    font-size: clamp(130px, 22vw, 260px);
    top: -50px;
    right: -50px;
    opacity: 0.12;
    animation: ${spinSlow} 30s linear infinite;
    pointer-events: none;
  }
`;

const Card = styled.div`
  background: var(--card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: clamp(30px, 6.5vw, 44px);
  padding: clamp(22px, 5.5vw, 36px);
  width: 100%;
  max-width: 460px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  position: relative;
  z-index: 1;
  animation: ${moveUp} 0.4s ease-out;
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 4.5vw, 26px);
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;

    .logoIcon {
      font-size: clamp(24px, 5vw, 32px);
      animation: ${spinSlow} 12s linear infinite;
    }

    h1 {
      font-size: clamp(21px, 5vw, 26px);
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent), var(--accent-2), var(--accent-3));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      letter-spacing: -0.5px;
    }
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: clamp(11px, 3vw, 15px) 18px;
  border: 2px solid var(--border);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.8);
  color: var(--text);
  font-size: clamp(13px, 3.5vw, 16px);
  font-weight: 500;
  outline: none;
  transition: all 0.2s;
  min-width: 0;

  &:focus {
    border-color: var(--accent);
    background: white;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const SearchBtn = styled.button`
  padding: 0 clamp(18px, 4vw, 26px);
  background: linear-gradient(135deg, var(--accent-2), var(--accent-3));
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: clamp(13px, 3.5vw, 15px);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    transform: scale(0.96);
  }
`;

const WeatherDisplay = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CityWrapper = styled.div`
  width: 100%;

  h2 {
    font-size: clamp(24px, 6vw, 34px);
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &::before {
      content: '📍';
      font-size: clamp(18px, 4.5vw, 24px);
    }
  }
`;

const DateText = styled.p`
  color: var(--text-secondary);
  font-size: clamp(11px, 3vw, 13px);
  font-weight: 600;
  margin-top: 4px;
  opacity: 0.8;
`;

const IconArea = styled.div`
  margin: clamp(10px, 4vw, 18px) 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .weatherIcon {
    font-size: clamp(66px, 16vw, 96px);
    animation: ${gentleFloat} 3.5s ease-in-out infinite;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.08));
    line-height: 1;
  }

  .tempValue {
    font-size: clamp(50px, 13vw, 72px);
    font-weight: 800;
    color: var(--text);
    letter-spacing: -2px;
    line-height: 1;
    margin-top: 4px;

    span {
      font-size: clamp(22px, 5vw, 30px);
      font-weight: 600;
      color: var(--accent);
      margin-left: 2px;
    }
  }
`;

const ConditionTag = styled.p`
  color: white;
  font-size: clamp(12px, 3.2vw, 14px);
  font-weight: 600;
  margin-bottom: 4px;
  text-transform: capitalize;
  padding: 6px 20px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border-radius: 50px;
  box-shadow: 0 4px 10px rgba(14, 165, 233, 0.2);
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(6px, 2vw, 14px);
  width: 100%;
  margin-top: 14px;
`;

const StatItem = styled.div`
  background: rgba(14, 165, 233, 0.06);
  padding: clamp(9px, 3vw, 15px) 4px;
  border-radius: 18px;
  border: 1px solid rgba(14, 165, 233, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;

  .label {
    font-size: clamp(8px, 2vw, 10px);
    font-weight: 700;
    color: var(--text-secondary);
    display: block;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .value {
    font-size: clamp(13px, 3.8vw, 18px);
    font-weight: 800;
    color: var(--text);
    white-space: nowrap;
  }

  .unit {
    font-size: clamp(9px, 2.2vw, 11px);
    font-weight: 600;
    color: var(--text-secondary);
    margin-left: 1px;
  }
`;

const ErrorBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 10px;
  border-radius: 50px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
`;

const LoadingBox = styled.div`
  text-align: center;
  padding: 20px;
  width: 100%;

  .loader {
    width: 34px;
    height: 34px;
    border: 3px solid rgba(14, 165, 233, 0.2);
    border-top: 3px solid var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 10px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const API_KEY = 'a0382fa2b6d51c7b0306f5839d9e8099';

const getWeatherIcon = (code) => {
  if (!code) return '🌤️';
  const icons = {
    '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };
  return icons[code] || '🌤️';
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

function Weather() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const loadDefault = async () => {
      setIsFetching(true);
      try {
        const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=Damascus&limit=1&appid=${API_KEY}`);
        const geoData = await geoRes.json();
        if (!geoData.length) return;

        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${API_KEY}&units=metric`);
        const data = await weatherRes.json();

        setWeatherInfo({
          name: geoData[0].name,
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          description: data.weather[0].description,
          iconCode: data.weather[0].icon,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };
    loadDefault();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsFetching(true);
    setErrMsg(null);

    try {
      const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${API_KEY}`);
      const geoData = await geoRes.json();
      if (!geoData.length) throw new Error('City not found');

      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${API_KEY}&units=metric`);
      const data = await weatherRes.json();

      setWeatherInfo({
        name: geoData[0].name,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        iconCode: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
      });

      setSearchTerm('');
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Header>
          <div className="brand">
            <span className="logoIcon">☀️</span>
            <h1>WeatherWise</h1>
          </div>
        </Header>

        <SearchForm onSubmit={handleFormSubmit}>
  <SearchInput
    type="text"
    placeholder="Search city..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <SearchBtn type="submit">Search</SearchBtn>
</SearchForm>

        {isFetching && (
          <LoadingBox>
            <div className="loader"></div>
            <p>Loading weather...</p>
          </LoadingBox>
        )}

        {errMsg && <ErrorBox>{errMsg}</ErrorBox>}

        {weatherInfo && !isFetching && (
          <WeatherDisplay>
            <CityWrapper>
              <h2>{weatherInfo.name}</h2>
              <DateText>{getCurrentDate()}</DateText>
            </CityWrapper>

            <IconArea>
              <div className="weatherIcon">{getWeatherIcon(weatherInfo.iconCode)}</div>
              <div className="tempValue">{weatherInfo.temp}<span>°C</span></div>
            </IconArea>

            <ConditionTag>{weatherInfo.description}</ConditionTag>

            <StatsContainer>
              <StatItem>
                <span className="label">💧 Humid</span>
                <span className="value">{weatherInfo.humidity}<span className="unit">%</span></span>
              </StatItem>
              <StatItem>
                <span className="label">💨 Wind</span>
                <span className="value">{weatherInfo.windSpeed}<span className="unit">m/s</span></span>
              </StatItem>
              <StatItem>
                <span className="label">🌡️ Feels</span>
                <span className="value">{weatherInfo.feelsLike}<span className="unit">°C</span></span>
              </StatItem>
            </StatsContainer>
          </WeatherDisplay>
        )}
      </Card>
    </Wrapper>
  );
}

export default Weather;
