import Link from "next/link";

export default function Header() {
const itemsStyle = "cursor-pointer px-3 py-1 leading-8 rounded-tl-lg rounded-br-lg rounded-tr rounded-bl hover:bg-black hover:text-white"
    return (
        <header className="flex w-full items center items-center justify-between p-6 max-w-7xl mx-auto">
                <div>
                    <Link href="/">
                        <h1 className="text-2xl text-center font-semibold cursor-pointer">Alireza Taghavi</h1>
                    </Link>
                </div>
                <div className="hidden sm:inline-flex items-center space-x-5">
                    <h3 className={itemsStyle}>About</h3>
                    <h3 className={itemsStyle}>Contact</h3>
                </div>
        </header>
    );
}
