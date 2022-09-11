import React from 'react'

import Column from './column/column'
import classes from './columns.module.css'

const Columns = (props) => {
  const countries = props.countries
  const slctedCntry = []
  for (let i = 0; slctedCntry.length < 5; i++) {
    const rngCntry = countries[Math.floor(Math.random() * countries.length)]
    const details = {
      name: rngCntry.name.common,
      continent: rngCntry.continents[0],
      timezone: rngCntry.timezones[0],
      uniqueId: `${rngCntry.cca3}-${rngCntry.ccn3}`,
    }
    if (!slctedCntry.find((cntry) => cntry.continent === details.continent)) {
      slctedCntry.push(details)
    }
  }
  return (
    <ul className={classes.Columns}>
      {slctedCntry.map((country) => (
        <Column
          key={country.uniqueId}
          continent={country.continent}
          name={country.name}
          timezone={country.timezone}
        />
      ))}
    </ul>
  )
}

export default Columns
