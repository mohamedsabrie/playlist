import { isPlayingAtom } from "@/atoms/playlistAtoms";
import useSpotify from "@/hooks/useSpotify";
import {
  EllipsisHorizontalIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import ControlsOptions from "./ControlsOptions";
import { useOutsideClick } from "@/hooks/useOutsideClick";

function Controls() {
  const spotifyApi = useSpotify();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);
  const [show, setShow] = useState(false);
  const optionsRef = useRef(null);
  useOutsideClick({ ref: optionsRef, show, setShow });

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };
  return (
    <div className="px-10 flex items-center space-x-5">
      {isPlaying ? (
        <PauseCircleIcon
          onClick={handlePlayPause}
          className="text-primary h-16 cursor-pointer"
        />
      ) : (
        <PlayCircleIcon
          onClick={handlePlayPause}
          className="text-primary h-16 cursor-pointer"
        />
      )}
      <div className="relative">
        <EllipsisHorizontalIcon
          onClick={() => setShow(true)}
          className="h-10 text-gray-400 cursor-pointer"
        />
        <div className="absolute -right-40 top-0     bg-dark2" ref={optionsRef}>
          {show && <ControlsOptions />}
        </div>
      </div>
    </div>
  );
}

export default Controls;
