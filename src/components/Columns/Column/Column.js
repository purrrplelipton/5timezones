import React, {useState, useEffect} from "react";

import classes from "./Column.module.css";

const Column = (props) => {
    const [hhDiff,] = props.timezone.split(/:/)
    let d = new Date()
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000)
    let offset = Number(hhDiff.replace(/[^\d-]/g, ""))
    const currentTime = new Date(utc + (3.6e+6 * offset))
    let hh = currentTime.getHours()
    let mm = currentTime.getMinutes()
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let diem = hh < 12 ? "AM" : "PM"
    const DotW = weekDays[currentTime.getDay()]
    hh = hh > 12 ? String(hh - 12).padStart(2,0) : String(hh).padStart(2,0)
    mm = String(mm).padStart(2,0)
    const [dateTime, setDateTime] = useState({
        time: {
            hh: hh,
            mm: mm,
            diem: diem
        },
        day_date: {
            day: DotW,
            date: `${currentTime.getDate()} ${months[currentTime.getMonth()]} ${currentTime.getFullYear()}`
        }
    })

    useEffect(() => {
        setTimeout(() => {
                setDateTime(dateTime => ({
                ...dateTime,
                time: {
                    ...dateTime.time,
                    hh: hh,
                    mm: mm,
                    diem: diem
                },
                day_date: {
                    ...dateTime.day_date,
                    day: DotW,
                    date: `${currentTime.getDate()} ${months[currentTime.getMonth()]} ${currentTime.getFullYear()}`
                }
            }))
        }, 61000)
        return () => {
            console.log(
                // `${props.name} : ${props.timezone}`
            )
        }
    })

    const brightBg = () => {
        return (
            "hsl(" + (Math.random() * 360) + ", " +
            (Math.random() * 70 + 15) + "%, " +
            (Math.random() * 70 + 25) + "%)"
        );
    };
    
    const style = {backgroundColor: brightBg()};

    return (
        <li className={classes.Column} style={style}>
            <p className={classes.Region}>{props.continent}|{props.name}</p>
            <h1 className={classes.Time}>{
                `${dateTime.time.hh}:${dateTime.time.mm}`
                }<span className={classes.Diem}>{
                dateTime.time.diem
                }</span>
            </h1>
            <p className={classes.Date}>{
            `${dateTime.day_date.day}, ${dateTime.day_date.date}`
            }</p>
        </li>
    );
};

export default Column;