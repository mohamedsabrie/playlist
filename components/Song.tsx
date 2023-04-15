import { currentTrackIdAtom, isPlayingAtom } from "@/atoms/playlistAtoms";
import useSpotify from "@/hooks/useSpotify";
import { millisToMinutesAndSeconds } from "@/lib/transformTime";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import SongControls from "./SongControls";
import useAddToPlaylist from "@/hooks/useAddToPlaylist";

function Song({ track, order }: any) {
  const spotifyApi = useSpotify();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdAtom);
   

  const playSong = () => {
    setCurrentTrackId(track?.track?.id);
    setIsPlaying(true);
   


    spotifyApi
      .play({
        uris: [track?.track?.uri],
      })
      .catch((err: any) => {});
  };
  return (
    <>
 
    <div className="cursor-pointer grid grid-cols-2 text-gray-500 hover:bg-gray-900 py-3 px-5 rounded-lg">
      <div className="flex items-center space-x-5">
        <p>{order + 1}</p>
        <Image
          onClick={playSong}
          alt="song-image"
          src={track?.track?.album?.images?.[0]?.url}
          height={40}
          width={40}
        />
        <div>
          <p onClick={playSong} className="text-white">
            {track?.track?.name}
          </p>
          <p onClick={playSong} className=" text-sm">
            {track?.track?.artists?.[0]?.name}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline-flex">{track?.track?.album?.name}</p>
        <div className="flex items-center space-x-2">
          <p>{millisToMinutesAndSeconds(track?.track?.duration_ms)}</p>
          <SongControls uri = {track?.track?.uri}
 />
        </div>
      </div>
      <div></div>
    </div>
    </>
  );
}

export default Song;
