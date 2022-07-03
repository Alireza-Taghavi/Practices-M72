import Head from 'next/head'
import Header from "../components/Header/Header";
import {sanityClient} from "../sanity"
import {Post} from "../typings";
import Slider from "../components/Slider/Slider";
import Article from "../components/Article/Article";
import Footer from "../components/Footer/Footer";

interface Props {
    posts: [Post],

}

export default function Home({posts}: Props) {
    return (
        <div className="flex flex-col justify-between h-sreen  bg-slate-100">
            <Head>
                <title>Taghavi Blog</title>
                <link rel="icon" href={"/favicon.ico"}/>
            </Head>
            <div className="flex flex-col items-center justify-start">
                <Header/>
                <div className={"w-full pt-0 md:p-6 md:pt-0 max-w-screen-xl grayscale"}>
                    <Slider posts={posts}/>
                </div>
                <div className="w-full mt-5 md:p-6 max-w-screen-xl flex flex-col gap-8">
                    <h1 className="text-3xl py-2 sm:py-6">Top Posts</h1>
                    <section
                        className="grid grid-cols-1 py-2 sm:py-4 px-6 sm:px-0  sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-4">
                        {posts.map((post) => {
                            return <Article key={Math.random() * 100} post={post}/>
                        })}
                    </section>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export const getServerSideProps = async () => {
    const query = `*[_type == "post"]{
  _id,
  title,
  description,
  slug,
  author -> {
  name,
  image,
  slug
},
mainImage,

}`;
    const posts = await sanityClient.fetch(query);
    return {
        props: {
            posts
        }
    }
}