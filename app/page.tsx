
import Link from "next/link";
import Banner from "./components/banner"
import Xtallpage from "./components/xtal";
export default function Home() {
  return (
    <>
      <Banner />
      <div className="">
        <Xtallpage />
      </div>
    </>
  );
}
