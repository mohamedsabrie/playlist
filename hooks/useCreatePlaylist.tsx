import { useState } from "react";
import Modal from "../components/ui/Modal";
import useSpotify from "./useSpotify";
import CreatePlaylistModal from "@/components/ui/CreatePlaylistModal";
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
    <CreatePlaylistModal
      handleSave={handleSave}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setName={setName}
      setDesc={setDesc}
      isBtnDisabled = {!name}
    />
  ) : null;

  return {
    createPlaylistModal: modal,
    openCreatePlaylist: () => setIsOpen(true),
  };
}
