
import Appview from "../../components/appview";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Navbar from "../../components/navbar";
const Appviewpage = async () => {
  const season = await getServerSession(authOptions);
  if (!season) return redirect("/login");
  return (
    <>
      <Navbar session={season} />
      <Appview />
    </>
  )
}
export default Appviewpage;
