import Sidebar from "@/components/Sidebar";
import { getSession, useSession } from "next-auth/react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Songs from "@/components/Songs";
import Player from "@/components/Player";
import Controls from "@/components/Controls";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div className="relative  grid h-screen  bg-black">
      <Header />
      <div className="flex   overflow-y-scroll scrollbar-hide  ">
        <Sidebar />
        <main className="flex-1 pb-32 ">
          <Hero />
          <Controls />
          <Songs />
        </main>
      </div>

      <div className="w-full flex-1 ">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
