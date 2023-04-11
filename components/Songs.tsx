import { playlistAtom } from "@/atoms/playlistAtoms";
import React from "react";
import { useRecoilValue } from "recoil";
import Song from "./Song";

function Songs() {
  const playlist:any = useRecoilValue(playlistAtom);
  const tracks = playlist?.tracks?.items;

  return (
    <div className="text-white flex flex-col">
      {tracks?.map((track:any, i:number) => (
        <Song key={track?.track?.id} track={track} order={i} />
      ))}
    </div>
  );
}

export default Songs;
