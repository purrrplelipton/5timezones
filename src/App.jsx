import Loader from '@assets/loader';
import formatTime from '@utils/format-time';
import pickCountries from '@utils/pick-countries';
import React from 'react';
import {
  countryName,
  countryRegion,
  date,
  gridItem,
  gridWrapper,
  regionCountry,
  time,
  timeDate,
  scrollingText,
} from './App.module.css';

const { log } = console;

function App() {
  const [states, dispatch] = React.useState({
    loading: false,
    countries: [],
    currentTime: new Date(),
  });
  const [shouldScroll, setShouldScroll] = React.useState(false);

  React.useEffect(() => {
    const fetchCountries = async () => {
      dispatch((prv) => ({ ...prv, loading: true }));

      try {
        const selection = await pickCountries();
        dispatch((prv) => ({ ...prv, countries: selection }));
      } catch (error) {
        log(...error);
        dispatch((prv) => ({ ...prv, countries: [] }));
      } finally {
        dispatch((prv) => ({ ...prv, loading: false }));
      }
    };

    fetchCountries();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch((prv) => ({ ...prv, currentTime: new Date() }));
    }, 59000);
    return () => clearInterval(interval);
  }, [states.currentTime]);

  React.useEffect(() => {
    const countryNameElement = document.querySelector(`.${countryName}`);
    if (countryNameElement) {
      setShouldScroll(
        countryNameElement.scrollWidth > countryNameElement.clientWidth,
      );
    }
  }, [states]);

  return (
    <ul className={gridWrapper}>
      {states.loading ? (
        <Loader />
      ) : (
        states.countries.map((country) => (
          <li key={country.cca3} className={gridItem}>
            <div className={regionCountry}>
              <h2 className={countryRegion}>{country.region}</h2>
              <p
                className={`${countryName}${
                  shouldScroll ? ` ${scrollingText}` : ''
                }`}
              >
                {country.name}
              </p>
            </div>
            <div className={timeDate}>
              <p className={time}>
                {formatTime(states.currentTime, country.timezone).time}
              </p>
              <p className={date}>
                {formatTime(states.currentTime, country.timezone).date}
              </p>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default App;
