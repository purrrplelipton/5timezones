import React from "react";

import Column from "./Column/Column";
import classes from "./Columns.css";

const Columns = (props) => props.regions.map(
    (region, index) => (
        <Column
         time={props.time}
         region={region}
        />
    )
)

export default Columns;