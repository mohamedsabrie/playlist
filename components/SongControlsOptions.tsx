import {
  currentTrackIdAtom,
  playlistAtom,
  playlistIdAtom,
} from "@/atoms/playlistAtoms";
import useSpotify from "@/hooks/useSpotify";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";

function SongControlsOptions({ uri, closeMenu, openAddModal }: any) {
  const spotifyApi = useSpotify();
  const playListId = useRecoilValue(playlistIdAtom);
  const setPlayList = useSetRecoilState(playlistAtom);
  console.log(playListId, "playListId");

  // Remove all occurrence of a track
  const handleRemoveSongFromPlaylist = () => {
    const tracks = [{ uri }];
    spotifyApi
      .removeTracksFromPlaylist(playListId, tracks)
      .then(
        function (data: any) {
          toast.success("Track removed from playlist!", {
            position: toast.POSITION.TOP_CENTER,
          });
          spotifyApi
            .getPlaylist(playListId)
            .then((data: any) => {
              setPlayList(data?.body);
            })
            .catch((err: any) => {
              toast.error("Something went wrong!", {
                position: toast.POSITION.TOP_CENTER,
              });
            });
        },
        function (err: any) {
          toast.error("something went wrong!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      )
      .finally(() => closeMenu());
  };

  return (
    <>
      <div className="text-white ">
        <div onClick={() => {}}>
          <p
            className="text-white px-5 py-2 hover:bg-gray-500"
            onClick={() => {
              openAddModal();
              closeMenu();
            }}
          >
            Add to playlist
          </p>
          <p
            className="text-white px-5 py-2 hover:bg-gray-500"
            onClick={handleRemoveSongFromPlaylist}
          >
            Remove from playlist
          </p>
        </div>
      </div>
    </>
  );
}

export default SongControlsOptions;
