import React from "react";

import classes from "./Column.css";

const brightBg = () => {
    return (`hsl(${360*Math.random()}, ${25+70*Math.random()}, ${75+10*Math.random()})`);
};

const Column = (props) => {
    const style = {backgroundColor: brightBg()};

    return (
        <div className={classes.Column} style={style}>
            
        </div>
    );
};

export default Column;