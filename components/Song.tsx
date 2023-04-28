import { currentTrackIdAtom, isPlayingAtom } from "@/atoms/playlistAtoms";
import useSpotify from "@/hooks/useSpotify";
import { millisToMinutesAndSeconds } from "@/lib/transformTime";
import Image from "next/image";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import SongControls from "./SongControls";
import useAddToPlaylist from "@/hooks/useAddToPlaylist";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import handleErrors from "@/lib/handleErrors";
import { useRouter } from "next/router";

function Song({ track, order }: any) {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const setIsPlaying = useSetRecoilState(isPlayingAtom);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdAtom);

  const playSong = () => {
    spotifyApi
      .play({
        uris: [track?.uri],
      })
      .then(() => {
        setCurrentTrackId(track?.id);
        setIsPlaying(true);
      })
      .catch((err: any) => {
        handleErrors({ err, router });
      });
  };
  return (
    <>
      <div className="cursor-pointer grid grid-cols-2 text-gray-500 hover:bg-gray-900 py-3 px-5 rounded-lg">
        <div className="flex items-center space-x-5">
          <p>
            {currentTrackId == track?.id ? (
              <MusicalNoteIcon className="text-primary h-5" />
            ) : (
              order + 1
            )}
          </p>
          <Image
            onClick={playSong}
            alt="song-image"
            src={track?.album?.images?.[0]?.url}
            height={40}
            width={40}
          />
          <div>
            <p
              onClick={playSong}
              className={`${
                currentTrackId == track?.id
                  ? "text-primary font-semibold"
                  : "text-white"
              }`}
            >
              {track?.name}
            </p>
            <p onClick={playSong} className={`text-sm `}>
              {track?.artists?.[0]?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="hidden md:inline-flex">{track?.album?.name}</p>
          <div className="flex items-center space-x-2">
            <p>{millisToMinutesAndSeconds(track?.duration_ms)}</p>
            <SongControls uri={track?.uri} />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Song;
