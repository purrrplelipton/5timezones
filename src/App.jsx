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
  scrollingText,
  time,
  timeDate,
} from './App.module.css';

const { log } = console;

function App() {
  const [states, dispatch] = React.useState({
    loading: false,
    countries: [],
    currentTime: new Date(),
  });
  const [scrollingIndexes, setScrollingIndexes] = React.useState([]);

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
    const updatedIndexes = states.countries
      .map((_, index) => {
        const countryNameElement = document.getElementById(
          `country-name${index}`,
        );

        if (
          countryNameElement &&
          countryNameElement.scrollWidth > countryNameElement.offsetWidth
        ) {
          return index;
        }
        return -1;
      })
      .filter((index) => index !== -1);

    setScrollingIndexes(updatedIndexes);
  }, [states, states.currentTime, states.countries, states.loading]);

  return (
    <ul className={gridWrapper}>
      {states.loading ? (
        <Loader />
      ) : (
        states.countries.map((country, index) => (
          <li key={country.cca3} className={gridItem}>
            <div className={regionCountry}>
              <h2 className={countryRegion}>{country.region}</h2>
              <p
                id={`country-name${index}`}
                className={`${countryName}${
                  scrollingIndexes.includes(index) ? ` ${scrollingText}` : ''
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
