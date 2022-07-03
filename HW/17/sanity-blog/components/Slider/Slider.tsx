// import Swiper core and required modules
import {Autoplay, A11y, EffectFade, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Post} from "../../typings";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import Link from "next/link";
import {urlFor} from '../../sanity';

// @ts-ignore
export default ({posts}) => {
    return (
        <Swiper
            modules={[EffectFade,  A11y, Autoplay, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay
            pagination={{clickable: true}}
            onSwiper={(swiper) => {
            }}
            onSlideChange={() => {
            }}
            effect="fade"
            loop
        >
            {posts.slice(0, 4).map((post: Post) => {
                if (!!(urlFor(post.mainImage).url()) && !!(urlFor(post.author.image).url())) {
                    return (
                        <SwiperSlide key={post._id}>
                            <Link href={`/post/${post.slug.current}`}>
                                <div className="relative top-0 left-0 cursor-pointer ">
                                    <div>
                                        <img className="md:rounded-tl-[10rem] md:rounded-br-[10rem] md:rounded-tr-[1rem] md:rounded-bl-[1rem]" alt={post.title} src={`${urlFor(post.mainImage).url()!}`}/>
                                    </div>

                                    <div className="absolute top-4 sm:bottom-5 left-5 flex flex-col-reverse gap-5 text-white  ">
                                        <Link href={`/author/${post.author.slug.current}`}>
                                            <div className="hidden sm:flex  flex-row gap-4 items-center hover:opacity-70">
                                                <img className="w-10 h-10 sm:w-15 sm:h-15 md:w-20 md:h-20 rounded-full "
                                                     alt={post.author.name}
                                                     src={`${urlFor(post.author.image).url()!}`}/>
                                                <h4 className="w-10 md:w-auto text-l sm:text-xl md:text-3xl">{post.author.name}</h4>
                                            </div>
                                        </Link>
                                        <h2 className="text-3xl sm:text-4xl md:text-6xl drop-shadow-md md:drop-shadow-2xl">{post.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                }
            })}

        </Swiper>
    );
};