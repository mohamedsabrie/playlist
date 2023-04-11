import useSpotify from "./useSpotify";

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
          console.log("Something went wrong!", err);
        }
      );
  };

  return { createPlayList };
}
