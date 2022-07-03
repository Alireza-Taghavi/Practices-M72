import React from "react";
import {sanityClient, urlFor} from "../../sanity";
import Header from "../../components/Header/Header";
import {GetStaticProps} from "next";
import {Post} from "../../typings"
import Link from "next/link";
import PortableText from "react-portable-text"
import Footer from "../../components/Footer/Footer";
interface Props {
    post: Post;
}

export default function Posts({post}: Props) {
    console.log(post)
    return (
        <main className="flex flex-col justify-between h-screen">
            <div  className="flex flex-col">
            <Header/>
            <div className="flex flex-col gap-6 max-w-7xl p-0 lg:p-6 mx-auto ">
                <img className="md:rounded-tl-[10rem] md:rounded-br-[10rem] md:rounded-tr-[1rem] md:rounded-bl-[1rem]" alt="Header" src={urlFor(post.mainImage).url()!}/>
                <article className="flex flex-col gap-6 grayscale p-6 lg:p-0">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium">{post.title}</h2>
                    <Link href={`/author/${post.author.slug.current}`}>
                    <div className="flex flex-row gap-2 items-center">
                        <h4 className=" sm:text-l md:text-xl lg:text-2xl h-10 font-normal text-gray-600">By <span className="cursor-pointer hover:underline underline-offset-3">{post.author.name}</span></h4>
                        <img className="w-10 h-10 md:w-16 md:h-16 rounded-full" alt="Author pic" src={urlFor(post.author.image).url()!}/>
                    </div>
                    </Link>
                    <div>
                        <PortableText
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.body}
                        className="text-l md:text-xl lg:text-2xl"
                        serializers={
                            {
                                h1: (props : any) => {
                                    <h1 className="text-2xl font-bold my-5" {...props} />
                                },
                                h2: (props : any) => {
                                    <h2 className="text-xl font-bold my-5" {...props} />
                                },
                                li: (children : any) => {
                                    <li className="ml-4 list-disc">{children}</li>
                                },
                                link: ({href, children}: any)=>{
                                    <a className="text-blue-500 hover:underline" href={href}>{children}</a>
                                }
                            }
                        }
                        />
                    </div>
                </article>

            </div>
            </div>
            <Footer/>
        </main>

    )
}
export const getStaticPaths = async () => {
    const query = `*[_type == "post"]{
  _id,
  slug{
  current
},
}`;
    const posts = await sanityClient.fetch((query));
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }));
    return ({
        paths,
        fallback: 'blocking'
    })
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  _createdAt,
  title,
  author->{
  name,
  image,
  slug
},
description,
mainImage,
slug,
body
}`
    const post = await sanityClient.fetch(query, {
        slug: params?.slug
    });
    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
        },
        revalidate: 60,
    }
}