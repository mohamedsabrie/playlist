import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdAtom, playlistsAtom } from "../atoms/playlistAtoms";
import Image from "next/image";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import useCreatePlaylist from "@/hooks/useCreatePlaylist";
function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useRecoilState(playlistsAtom);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdAtom);
  const {createPlaylistModal, openCreatePlaylist} = useCreatePlaylist()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data?.body?.items);
      }).catch((err:any) => {});
    }
  }, [spotifyApi, session]);

  return (
    <>
    {createPlaylistModal}
    <div className="bg-black p-5  min-h-screen col-span-2">
      <Image className="mb-5" alt="spotify-logo" width={200} height={100} src="/svgs/spotify-white.png" />
      <div>
        <div  onClick={openCreatePlaylist} className=" cursor-pointer flex items-center space-x-2 text-white">
          <PlusCircleIcon className="h-5 w-5 " />
          <p>Create Playlist</p>
        </div>
      </div>
      <br className="bg-gray-200" />
      <div className="flex flex-col  space-y-2">
        {playlists?.map((item: any) => (
          <p
            key={item?.id}
            onClick={() => setPlaylistId(item?.id)}
            className="text-gray-400 cursor-pointer hover:text-gray-300"
          >
            {item?.name}
          </p>
        ))}
      </div>
    </div>
    </>
  );
}

export default Sidebar;