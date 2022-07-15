import Image from "next/image"
import doubleRight from "../../public/doubleright.svg"
import doubleLeft from "../../public/doubleleft.svg"
import right from "../../public/right.svg"
import left from "../../public/left.svg"
import Link from "next/link";

export default function List() {
    return (
        <div className="flex flex-col gap-4 mb-4">
            <h3 className=" text-sm font-medium">
                لیست درخواست های ایجاد شده
            </h3>
            <div className="flex flex-col gap-2 items-start justify-between scroll">
                <div
                    className="flex flex-row items-center justify-between py-3 px-4  w-[984px] lg:w-full text-[10px] lg:text-[14px] font-normal">
                    <div className="w-1/4 flex items-center justify-start">
                        <p>
                            موضوع
                        </p>
                    </div>
                    <div className="w-1/4 flex items-center justify-center">
                        <p>
                            واحد پشتیبانی
                        </p>
                    </div>
                    <div className="w-1/4 flex items-center justify-center">
                        <p>
                            وضعیت
                        </p>
                    </div>
                    <div className="w-1/4 flex items-center justify-end">
                        <p>
                            مشاهده
                        </p>
                    </div>
                </div>
                <div
                    className="flex flex-row items-center justify-between py-3 px-4  w-[984px] lg:w-full bg-[#313A56] rounded-lg text-xs font-medium">
                    <div className="w-1/4 flex items-center justify-start text-[#EBBA07]">
                        <p>
                            پیگیری سفارش
                        </p>
                    </div>
                    <div className="w-1/4 flex items-center justify-center">
                        <p>
                            واحد پشتیبانی
                        </p>
                    </div>
                    <div className="w-1/4 flex items-center justify-center">
                        <p>
                            وضعیت
                        </p>
                    </div>
                    <div className="w-1/4 flex items-center justify-end">
                        {/*<Link>*/}
                        <p>
                            مشاهده
                        </p>
                        {/*</Link>*/}
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-12">
                <div className="flex flex-row items-center justify-center gap-4">
                    <button className="w-4 h-4 bg-transparent flex items-center justify-center">
                        <Image src={doubleRight} alt={"doubleRight"}/>
                    </button>
                    <button className="w-3 h-3 bg-transparent flex items-center justify-center">
                        <Image src={right} alt={"right"}/>
                    </button>
                </div>
                <div>
                    <p className="text-xs leading-4">
                        0
                    </p>
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                    <button className="w-3 h-3 bg-transparent flex items-center justify-center">
                        <Image src={left} alt={"left"}/>
                    </button>
                    <button className="w-4 h-4 bg-transparent flex items-center justify-center">
                        <Image src={doubleLeft} alt={"doubleLeft"}/>
                    </button>
                </div>
            </div>
        </div>
    );
}