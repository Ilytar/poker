import React from "react";
import CarouselItem from "./carouselItem/CarouselItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// Пользовательские стили
import "./carousel.scss";
import NavButtons from "./navButtons/NavButtons";

const Carousel = ({ opponentsList }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={3}
            loop={true}
            speed={1500}
            centeredSlides
        >
            {opponentsList.map((opponent, _) => (
                <SwiperSlide className="slide-wrapper" key={opponent.id}>
                    <CarouselItem
                        slide={opponent}
                        key={opponent.id + "_item"}
                    />
                </SwiperSlide>
            ))}
            <NavButtons />
        </Swiper>
    );
};

export default Carousel;
