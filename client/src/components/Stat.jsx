import React from "react";

const Stat = (props) => {
    const {info} = props
    return (
        <div className="stat-info">
            <h3>{info.name}</h3>
            <h3>{info.value}</h3>
        </div>
    )
}

export default Stat