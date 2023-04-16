import { isPlayingAtom, playlistAtom } from "@/atoms/playlistAtoms";
import useSpotify from "@/hooks/useSpotify";
import {
  EllipsisHorizontalIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ControlsOptions from "./ControlsOptions";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useCreatePlaylist from "@/hooks/useCreatePlaylist";
import { toast } from "react-toastify";

function Controls() {
  const spotifyApi = useSpotify();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);
  const [show, setShow] = useState(false);
  const optionsRef = useRef(null);
  const { createPlaylistModal, openCreatePlaylist } = useCreatePlaylist({
    mode: "edit",
  });
  const playlist: any = useRecoilValue(playlistAtom);

  useOutsideClick({ ref: optionsRef, show, setShow });

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play().catch((err: any) => {
          toast.error(err.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
        setIsPlaying(true);
      }
    });
  };
  return (
    <>
      {createPlaylistModal}
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
        {!!playlist && (
          <div className="relative">
            <EllipsisHorizontalIcon
              onClick={() => setShow(true)}
              className="h-10 text-gray-400 cursor-pointer"
            />
            <div
              className="absolute left-0 top-0  min-w-[200px]    bg-dark2"
              ref={optionsRef}
            >
              {show && (
                <ControlsOptions
                  openCreatePlaylist={() => {
                    openCreatePlaylist();
                    setShow(false);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Controls;
