import React from "react";

const MainHeader = ()=>{
    return (
        <header className="header-banner" >
            <div className="overlay"></div>
            <div className="animated-texts overlay-content"></div>
            <h1>
                Welcome to <span className="hotel-color">Bookify Hotel</span>
            </h1>
            <h4>Experience the Best Hospitality in Town</h4>
        </header>
    )
}

export default MainHeader;