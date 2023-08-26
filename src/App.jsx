import Loader from '@assets/loader';
import formatTime from '@utils/format-time';
import pickCountries from '@utils/pick-countries';
import React, { useEffect, useState } from 'react';
import {
  title,
  gridWrapper,
  gridItem,
  countryName,
  time,
} from './App.module.css';

// const { log } = console;

function App() {
  const [states, dispatch] = useState({
    loading: false,
    countries: [],
    currentTime: new Date(),
  });

  useEffect(() => {
    dispatch((prv) => ({ ...prv, loading: true }));
    pickCountries().then((selection) => {
      dispatch((prv) => ({ ...prv, countries: selection }));
    });
    dispatch((prv) => ({ ...prv, loading: false }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch((prv) => ({ ...prv, currentTime: new Date() }));
    }, 59000);
    return () => clearInterval(interval);
  }, [states.currentTime]);

  return (
    <>
      <h1 className={title}>ClockSync</h1>
      <ul className={gridWrapper}>
        {states.loading ? (
          <Loader />
        ) : (
          states.countries.map(({ name, cca3, timezone }) => (
            <li key={cca3} className={gridItem}>
              <h2 className={countryName}>{name}</h2>
              <p className={time}>{formatTime(states.currentTime, timezone)}</p>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default App;
