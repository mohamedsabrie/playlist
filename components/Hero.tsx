import {
  playlistAtom,
  playlistIdAtom,
  playlistsAtom,
} from "@/atoms/playlistAtoms";
import useSpotify from "@/hooks/useSpotify";
import Image from "next/image";

import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

function Hero() {
  const [playlist, setPlaylist] = useRecoilState<any>(playlistAtom);
  const [playlistId, setPlaylistId] = useRecoilState<any>(playlistIdAtom);
  const playlists = useRecoilValue(playlistsAtom);
  const spotifyApi = useSpotify();

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data: any) => {
        setPlaylist(data?.body);
      })
      .catch((err: any) => {
        console.log("something went wrong", err);
      });
  }, [playlistId, setPlaylist, spotifyApi]);


  return (
    <div className="flex flex-col justify-end bg-gradient-to-b from-gray-800 to-black h-80 text-white p-8">
      {playlist ? (
        <div className="flex space-x-4">
          <Image
            width={192}
            height={192}
            alt="playlist-image"
            src={playlist?.images?.[0]?.url}
          />
          <div className="flex flex-col justify-between">
            <h3 className="text-sm font-semibold">Playlist</h3>
            <h1 className="text-5xl font-bold">{playlist?.name}</h1>
            <div className="flex flex-col space-y-1">
              <p className="text-gray-300 font-semibold text-sm">
                {playlist?.description}
              </p>
              <p className="text-gray-300 font-semibold text-sm">
                Created by:{" "}
                <span className=" text-white">
                  {playlist?.owner?.display_name}
                </span>
                {" .  "}
                <span>{playlist?.tracks?.total} songs</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-warp  space-x-4">
          {playlists?.map((item:any) => (
            <Image
              className="cursor-pointer"
              onClick={() => setPlaylistId(item?.id)}
              key={item?.id}
              width={192}
              height={192}
              alt="playlist-image"
              src={item?.images?.[0]?.url}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Hero;