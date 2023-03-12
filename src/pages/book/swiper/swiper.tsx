import React, { useState } from 'react';
import styled from 'styled-components';
import SwiperCore, { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HOST } from '../../../constants/api';
import { ImageBook } from '../../../store/description-slice';

import './swiper.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ThumbWrapper = styled.div`
  @media screen and (min-width: 576px) and (max-width: 900px) {
    display: none;
  }
  @media screen and (max-width: 575px) {
    display: none;
  }
`;

export const SwiperSlider = ({ img }: { img: ImageBook[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  return (
    <React.Fragment>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className='mySwiper2'
        pagination={{
          clickable: true,
        }}
        data-test-id='slide-big'
      >
        {img.map((x) => (
          <SwiperSlide key={`${x.url}`}>
            <img src={`${HOST}${x.url}`} alt={x.url} />
          </SwiperSlide>
        ))}
      </Swiper>
      <ThumbWrapper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper'
        >
          {img.map((x) => (
            <SwiperSlide key={`${x.url}`} data-test-id='slide-mini'>
              <img src={`${HOST}${x.url}`} alt={x.url} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ThumbWrapper>
    </React.Fragment>
  );
};
