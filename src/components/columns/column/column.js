import React, { useState, useEffect } from 'react'

import classes from './column.module.css'

const Column = (props) => {
  let hhDiff = props.timezone.split(/:/)[0],
    d = new Date(),
    utc = d.getTime() + d.getTimezoneOffset() * 59000,
    offset = Number(hhDiff.replace(/[^\d-]/g, '')),
    currentTime = new Date(utc + 3.6e6 * offset),
    hh = currentTime.getHours(),
    mm = currentTime.getMinutes(),
    weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    DotW = weekDays[currentTime.getDay()]
  hh = String(hh).padStart(2, '0')
  mm = String(mm).padStart(2, '0')
  const [dateTime, setDateTime] = useState({
    time: {
      hh: hh,
      mm: mm,
    },
    day_date: {
      day: DotW,
      date: `${currentTime.getDate()} ${
        months[currentTime.getMonth()]
      } ${currentTime.getFullYear()}`,
    },
  })

  useEffect(() => {
    setInterval(() => {
      setDateTime({
        time: {
          hh: hh,
          mm: mm,
        },
        day_date: {
          day: DotW,
          date: `${currentTime.getDate()} ${
            months[currentTime.getMonth()]
          } ${currentTime.getFullYear()}`,
        },
      })
    }, 59000)
  })

  const brightBg = () => `hsl(${Math.random() * 360}, 100%, 75%)`

  return (
    <li className={classes.Column} style={{ backgroundColor: brightBg() }}>
      <div className={classes.Wrapper}>
        <div className={classes.Region}>
          <div className={classes.Continent}>{props.continent}</div>
          <hr
            style={{
              width: '90%',
              height: '2px',
              backgroundColor: '#212121',
              border: 'none',
            }}
          />
          <div className={classes.Name}>{props.name}</div>
        </div>
        <span className={classes.Time}>
          {`${dateTime.time.hh}:${dateTime.time.mm}`}
        </span>
        <span
          className={classes.Date}
        >{`${dateTime.day_date.day}, ${dateTime.day_date.date}`}</span>
      </div>
    </li>
  )
}

export default Column
