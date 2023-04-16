import useSpotify from "./useSpotify";
import { toast } from "react-toastify";

export default function useSpotifyActions() {
  const spotifyApi = useSpotify();
  const createPlayList = ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    spotifyApi
      .createPlaylist(name, {
        description: description,
        public: true,
      })
      .then(
        function (data: any) {
          console.log("Created playlist!");
        },
        function (err: any) {
          toast.error("Something went wrong!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      );
  };

  return { createPlayList };
}
