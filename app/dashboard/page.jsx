import { getServerSession } from "next-auth";
import Crud from "../components/dashboard";
import Navbar from "../components/navbar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const season = await getServerSession(authOptions);
  if (!season) redirect("/login");
  return (
    <div >
      <Navbar session={season} />
      <Crud />
    </div>
  );
}
