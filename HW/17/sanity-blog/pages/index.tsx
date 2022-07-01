import Head from 'next/head'
import Header from "../components/Header/Header";
import {sanityClient, urlFor} from "../sanity"
import {Post} from "../typings";
import Slider from "../components/Slider/Slider";

interface Props {
    posts: [Post],

}

export default function Home({posts}: Props) {
    return (
        <div className="flex flex-col items-center justify-start">
            <Head>
                <title>Taghavi Blog</title>
                <link rel="icon" href={"/favicon.ico"}/>
            </Head>
            <Header/>
            <div className={"w-full md:p-6 max-w-screen-xl"}>
                <Slider posts={posts}/>
            </div>
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
  image
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