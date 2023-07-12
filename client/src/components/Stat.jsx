import React from "react";

const Stat = (props) => {
    const {info} = props
    return (
        <div>
            <h3>{info.name}</h3>
        </div>
    )
}

export default Stat