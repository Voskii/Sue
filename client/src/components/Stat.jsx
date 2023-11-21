import React from "react";

const Stat = (props) => {
    const { info } = props
    //separate tracked value from untracked value
    return (
        <div className="stat-info">

            <div>{info.name}</div>
            <div>{info.value}</div>

        </div>
    )
}

export default Stat