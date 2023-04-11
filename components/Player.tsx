import { currentTrackIdAtom, isPlayingAtom } from "@/atoms/playlistAtoms";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import {
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdAtom);
  const [volume, setVolume] = useState<number>(50);
  const songInfo:any = useSongInfo();
  console.log(songInfo);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data:any) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };
  const handleVolumeRange = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err: any) => {});
    }, 500),
    []
  );

  const fetchCurrentSong = () => {
    spotifyApi.getMyCurrentPlayingTrack().then((data:any) => {
      setCurrentTrackId(data?.body?.item?.id);
    });
    spotifyApi.getMyCurrentPlaybackState().then((data:any) => {
      setIsPlaying(data?.body?.is_playing);
    });
  };
  useEffect(() => {
    if (volume > 0 && volume < 100) {
      handleVolumeRange(volume);
    }
  }, [volume]);
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className="h-24 text-white  bg-gradient-to-t from-black to-gray-900 grid grid-cols-3 px-2 md:px-8 text-xs md:text-base">
      <div className="flex items-center space-x-3">
        <Image
          height={50}
          width={50}
          className="hidden md:inline"
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
        />
        <div className="flex flex-col">
          <p className="font-semibold">{songInfo?.name}</p>
          <p className="text-gray-400 text-xs font-medium">
            {songInfo?.artists?.[0]?.name}
          </p>
        </div>
      </div>

      <div className="flex justify-center  items-center space-x-10">
        <ArrowsRightLeftIcon className="playBtn" />
        <BackwardIcon
          onClick={() =>
            spotifyApi.skipToPrevious().then(
              function () {
                console.log("Skip to previous");
              },
              function (err:any) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log("Something went wrong!", err);
              }
            )
          }
          className="playBtn"
        />
        {isPlaying ? (
          <PauseCircleIcon
            onClick={handlePlayPause}
            className="playBtn w-10 h-10"
          />
        ) : (
          <PlayCircleIcon
            onClick={handlePlayPause}
            className="playBtn w-10 h-10"
          />
        )}

        <ForwardIcon
          onClick={() =>
            spotifyApi.skipToNext().then(
              function () {
                console.log("Skip to next");
              },
              function (err:any) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log("Something went wrong!", err);
              }
            )
          }
          className="playBtn "
        />
        <ArrowPathRoundedSquareIcon className="playBtn" />
      </div>
      <div className="flex justify-end items-center space-x-4">
        <SpeakerWaveIcon
          onClick={() =>
            setVolume((prev:any) => {
              if (prev > 0 && prev < 100) {
                return prev + 10;
              }
            })
          }
          className="playBtn"
        />
        <input
          value={volume}
          type="range"
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Player;
