import Link from "next/link"


const Navhome = () => {
  return (
    <>
      <div className="w-full h-16 flex justify-between justify-items-center items-center text-white">
        <div className="">
          <h1 className="font-extrabold ml-2">Neura Sama</h1>
        </div>
        <div className="flex justify-items-center items-center mr-5 gap-2">
          <Link href="/">xtall</Link>
          <Link href="/home">bos</Link>
        </div>
      </div>
    </>
  )
}
export default Navhome
