import React, { useState } from "react";
import Modal from "./Modal";
import Select from "react-select";
import { playlistsAtom } from "@/atoms/playlistAtoms";
import { useRecoilValue } from "recoil";
import useSpotify from "@/hooks/useSpotify";
import { toast } from "react-toastify";

function AddTrackModal({ isOpen, setIsOpen, uri }: any) {
  const spotifyApi = useSpotify();
  const playlists = useRecoilValue(playlistsAtom);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
  const options = playlists.map((item: any) => ({
    label: item?.name,
    value: item?.id,
  }));
  const handleSave = () => {
    // Add tracks to a playlist

    spotifyApi.addTracksToPlaylist(selectedPlaylist?.value, [uri]).then(
      function (data: any) {
        toast.success("Added track to playlist!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsOpen(false);
      },
      function (err: any) {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    );
  };
  return (
    <Modal title="Select a playlist" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col  justify-between space-y-40">
        <Select
          placeholder="Choose playlist"
          onChange={setSelectedPlaylist}
          options={options}
        />
        <button
          disabled={!selectedPlaylist}
          onClick={handleSave}
          className="text-black bg-white px-10 py-2 rounded-3xl w-fit self-end"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

export default AddTrackModal;
