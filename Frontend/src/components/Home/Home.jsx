import React from "react";
import MainHeader from "../layout/MainHeader";
import HotelService from "../common/HotelService";
import RoomCarousel from "../common/roomCarousel";
import Parallax from "../common/Parallax";

const Home = ()=>{
    return (
        <section>
            <MainHeader />

            <section className="container">
                <RoomCarousel/>
                <Parallax />
                <RoomCarousel/>
                <HotelService />
                <Parallax />
                <RoomCarousel/>
            </section>
        </section>
    )
}

export default Home;