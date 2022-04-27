import React from "react";

import Column from "./Column/Column";
import "./Columns.css";

const Columns = (props) => props.regions.map(
    (region, index) => (
        <Column
         time={props.time} 
         region={region}
        />
    )
)

export default Columns;