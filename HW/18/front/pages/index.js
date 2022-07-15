import Header from "../components/Header/Header";
import Contact from "../components/Contact/Contact";
import Image from 'next/image'
import bellIcon from "../public/bell.svg"
import List from "../components/List/List";

export default function Home() {
    return (
        <div dir={"rtl"} className={"w-full h-full text-white"}>
            <Header/>
            <div className="px-4 py-5 flex flex-col">
                <div className="p-4 flex flex-col gap-4 bg-[#293145] rounded-lg">
                    <div
                        className="border-b border-solid border-[#313A55] flex flex-row justify-between items-center pb-4">
                        <button className="w-6 h-6 flex items-center justify-center bg-transparent relative top-0 right-0 rounded-full bell">
                            <Image alt="bellIcon" src={bellIcon} className="w-4 h-4"/>
                            <div className="w-[10px] h-[10px] bg-[#E95151] rounded-full flex items-center justify-center text-[8px] font-normal absolute top-[0px] right-[0px]">4</div>
                        </button>
                        <p className="text-xs font-normal">تعداد پشتیبان آنلاین : ۸ نفر</p>
                    </div>
                    <div className="flex flex-col gap-4 ">
                        <List/>
                    </div>
                    <Contact/>
                </div>
            </div>

        </div>
    )
}
