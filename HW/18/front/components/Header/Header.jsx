import Image from 'next/image'
import headerPic from '../../public/Vector.svg'
export default function Header() {
  return (
    <header className="w-full p-5 flex flex-row items-center gap-5 border-b border-solid border-[#313A55]">
        <Image alt={"Logo"} src={headerPic}/>
      <h1 className="text-white">پشتیبانی</h1>
    </header>
  );
}
