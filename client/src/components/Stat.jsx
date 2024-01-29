import React from "react";

const Stat = (props) => {
    const { info, whiteOut, isMealCard} = props
    //separate tracked value from untracked value
    return (
        <div className="stat-info">

            <div>{info.name}</div>
            <div style={whiteOut?{color: 'whiteSmoke'}:{color: 'whiteSmoke'}}>{info.value}</div>

        </div>
    )
}

export default Stat