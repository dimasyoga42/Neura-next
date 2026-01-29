import Banner from "./components/banner";
import Xtallpage from "./components/xtal";
import Navhome from "./components/navhome";
export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#0f141a]">
      <section className="w-full">
        <Navhome />
        <Banner />
      </section>
      <section className="w-full mt-10">
        <Xtallpage />
      </section>

    </main>
  );
}
