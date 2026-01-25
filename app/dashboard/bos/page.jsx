import { getServerSession } from "next-auth";
import Crud from "../../components/dashboard";
import Navbar from "../../components/navbar";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Bospage from "../../components/bos";

export default async function Bos() {
  const season = await getServerSession(authOptions);
  if (!season) redirect("/login");
  return (
    <div className="w-full bg-white">
      <Navbar session={season} />
      <Bospage />
    </div>
  );
}
