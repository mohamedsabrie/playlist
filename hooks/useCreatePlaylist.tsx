import { useState } from "react";
import Modal from "../components/ui/Modal";
import useSpotify from "./useSpotify";
export default function useCreatePlaylist() {
  const spotifyApi = useSpotify();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const handleSave = () => {
    spotifyApi
      .createPlaylist(name, {
        description: desc,
        public: true,
      })
      .then(
        function (data: any) {
          console.log("Created playlist!");
        },
        function (err: any) {
          console.log("Something went wrong!", err);
        }
      );
  };
  const modal = isOpen ? (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-y-20 space-y-5">
        <input
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border text-white border-gray-900  outline-none w-full px-3 py-2 "
          placeholder="Name"
        />
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          rows={5}
          className="bg-[#3E3E3E] outline-none w-full h-52 text-white"
          placeholder="Add an optional description"
        />
        <button
          onClick={handleSave}
          className="text-black bg-white px-5 py-5 rounded-full w-fit"
        >
          Save
        </button>
      </div>
    </Modal>
  ) : null;

  return {
    createPlaylistModal: modal,
    openCreatePlaylist: () => setIsOpen(true),
  };
}
