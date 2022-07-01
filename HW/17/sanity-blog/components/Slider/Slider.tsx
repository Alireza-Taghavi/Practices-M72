// import Swiper core and required modules
import { Autoplay, Scrollbar, A11y,EffectFade, Pagination  } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Post} from "../../typings";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
export default ({posts}) => {
    console.log(posts)
    return (
        <Swiper
            modules={[EffectFade, Scrollbar, A11y,Autoplay,Pagination ]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) =>{}}
            onSlideChange={() => {}}
            effect="fade"
            loop

        >
            {posts.map((post)=>{
                <SwiperSlide>
                    <div>
                       <img src={post.mainImage}/>
                    </div>
                </SwiperSlide>
            })}

        </Swiper>
    );
};