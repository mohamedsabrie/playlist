import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";
import CreatePlaylistModal from "@/components/ui/CreatePlaylistModal";
import { toast } from "react-toastify";
import { playlistAtom, playlistsAtom } from "@/atoms/playlistAtoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

type Props = {
  mode?: string;
};
export default function useCreatePlaylist(props?: Props) {
  const playlistData = useRecoilValue<any>(playlistAtom);
  console.log(playlistData);
  const spotifyApi = useSpotify();
  const setPlaylists = useSetRecoilState(playlistsAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const setPlaylist = useSetRecoilState<any>(playlistAtom);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    const getPlaylistsData = () => {
      spotifyApi
        .getUserPlaylists()
        .then((data: any) => {
          setPlaylists(data?.body?.items);
        })
        .catch((err: any) => {});
    };
    const getPlaylistData = ()=>{
        spotifyApi
      .getPlaylist(playlistData?.id)
      .then((data: any) => {
        setPlaylist(data?.body);
      })
      .catch((err: any) => {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    }
  
    if (props?.mode == "edit") {
      spotifyApi
        .changePlaylistDetails(playlistData?.id, {
          name: name,
          description: desc,
          public: true,
        })
        .then(
          function (data: any) {
            getPlaylistsData();
            getPlaylistData()
            toast.success("Edits applied successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
          },
          function (err: any) {
            toast.error("Something went wrong!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        )
        .finally(() => closeModal());
    } else {
      spotifyApi
        .createPlaylist(name, {
          description: desc,
          public: true,
        })
        .then(
          function (data: any) {
            getPlaylistsData();
            toast.success("Created playlist!", {
              position: toast.POSITION.TOP_CENTER,
            });
          },
          function (err: any) {
            toast.error("Something went wrong!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        )
        .finally(() => closeModal());
    }
  };
  useEffect(() => {
    if (props?.mode == "edit") {
      setName(playlistData?.name);
      setDesc(playlistData?.description);
    }
  }, [playlistData, props?.mode]);
  const modal = isOpen ? (
    <CreatePlaylistModal
      description={desc}
      name={name}
      handleSave={handleSave}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setName={setName}
      setDesc={setDesc}
      isBtnDisabled={!name}
    />
  ) : null;

  return {
    createPlaylistModal: modal,
    openCreatePlaylist: () => setIsOpen(true),
  };
}
