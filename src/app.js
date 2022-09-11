import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Columns from './components/columns/columns'

const App = () => {
  const [countries, setCountries] = useState([
    {
      name: {
        common: 'Central African Republic',
      },
      continents: ['Africa'],
      timezones: ['UTC+01:00'],
      cca3: 'CAF',
      ccn3: '140',
    },
    {
      name: {
        common: 'Peabody, KS',
      },
      continents: ['South America'],
      timezones: ['UTC-05:00'],
      cca3: 'USA',
      ccn3: '840',
    },
    {
      name: {
        common: 'Thailand',
      },
      continents: ['Asia'],
      timezones: ['UTC+07:00'],
      cca3: 'THA',
      ccn3: '764',
    },
    {
      name: {
        common: 'Canberra ACT',
      },
      continents: ['Autralia'],
      timezones: ['UTC+08:00'],
      cca3: 'AUS',
      ccn3: '036',
    },
    {
      name: {
        common: 'Embsay, Skipton, UK',
      },
      continents: ['Europe'],
      timezones: ['UTC'],
      cca3: 'GBR',
      ccn3: '826',
    },
  ])

  useEffect(() => {
    const fetchCountriesInfo = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all')
      setCountries(response.data)
    }
    fetchCountriesInfo()
  }, [])

  return <Columns countries={countries} />
}

export default App
