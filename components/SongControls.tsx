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
import SongControlsOptions from "./SongControlsOptions";
import useAddToPlaylist from "@/hooks/useAddToPlaylist";

function SongControls({uri}:any) {
  const spotifyApi = useSpotify();
  const [show, setShow] = useState(false);
  const songOptionsRef = useRef(null);
  const {addModal, openAddModal} =  useAddToPlaylist({uri})
  useOutsideClick({ ref: songOptionsRef, show, setShow });
const closeMenu = ()=>{
  setShow(false);
}
  return (
    <>
    {addModal}
    <div className="px-10 flex items-center space-x-5">
      <div className="relative">
        <EllipsisHorizontalIcon
          onClick={() => setShow(true)}
          className="h-10 text-gray-400 cursor-pointer"
        />
        <div className="absolute right-0 top-0  min-w-[200px]    bg-dark2" ref={songOptionsRef}>
          {show && <SongControlsOptions  openAddModal={openAddModal} closeMenu={closeMenu}  uri={uri} />}
        </div>
      </div>
    </div>
    </>
  );
}

export default SongControls;
