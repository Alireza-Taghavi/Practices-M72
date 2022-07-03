import {urlFor} from "../../sanity";
import Link from "next/link";

// @ts-ignore
export default function Article({post}) {
    return (
        <Link key={`link-${post.slug.current}`} href={`/post/${post.slug.current}`}>
        <article className="flex flex-col items-center shadow-md rounded-lg  cursor-pointer grayscale hover:grayscale-[30%] group">
            <div className="overflow-hidden rounded-t-lg">
                <img className="rounded-t-lg group-hover:scale-105 transition-transform duration-200 ease-in-out" alt={post.title} src={`${urlFor(post.mainImage).url()!}`}/>
            </div>
            <div className="p-4 border-slate-200 text-xl font-medium">
                <h4>{post.title}</h4>
            </div>
            <div className="p-4 border-y-2 w-full border-slate-200 h-20 flex flex-row">
                <p className="text-ellipsis overflow-hidden">
                    {post.description}
                </p>
            </div>
            <div className="p-5 border-slate-200 flex self-start items-center gap-2 h-8">
               <span className="text-sm">By </span>{post.author.name}
            </div>
        </article>
        </Link>
    )
}