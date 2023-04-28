import {
  playlistAtom,
  playlistIdAtom,
  playlistsAtom,
} from "@/atoms/playlistAtoms";
import useSpotify from "@/hooks/useSpotify";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { toast } from "react-toastify";

import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

function Hero() {
  const [playlist, setPlaylist] = useRecoilState<any>(playlistAtom);
  const [playlistId, setPlaylistId] = useRecoilState<any>(playlistIdAtom);
  const playlists = useRecoilValue(playlistsAtom);
  const spotifyApi = useSpotify();
  useEffect(() => {
    if (spotifyApi.getAccessToken() && playlistId) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data: any) => {
          setPlaylist(data?.body);
        })
        .catch((err: any) => {
          toast.error("Something went wrong!", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  }, [playlistId, setPlaylist, spotifyApi]);

  return (
    <div className="flex flex-col justify-end bg-gradient-to-b from-gray-800 to-black h-80 text-white p-8">
      {playlist && playlist?.images?.name ? (
        <div className="flex space-x-4">
          {playlist?.images?.[0]?.url ? (
            <Image
              width={192}
              height={192}
              alt="playlist-image"
              src={playlist?.images?.[0]?.url}
            />
          ) : (
            <div className=" w-[192px] h-[192px] bg-gray-800 flex items-center justify-center">
              <MusicalNoteIcon className="h-10 text-gray-600" />
            </div>
          )}

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
        <div className="flex overflow-x-auto scrollbar-hide   space-x-4">
          {playlists?.map((item: any) => {
            return item?.images?.[0]?.url ? (
              <Image
                className="cursor-pointer"
                onClick={() => setPlaylistId(item?.id)}
                key={item?.id}
                width={192}
                height={192}
                alt="playlist-image"
                src={item?.images?.[0]?.url}
              />
            ) : (
              <div>
                <div
                  onClick={() => setPlaylistId(item?.id)}
                  className="cursor-pointer w-[192px] h-[192px] bg-gray-800 flex items-center justify-center"
                >
                  <MusicalNoteIcon className="h-10 text-gray-600" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Hero;
