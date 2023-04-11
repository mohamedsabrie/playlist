import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdAtom } from "@/atoms/playlistAtoms";
import useSpotify from "./useSpotify";

export default function useSongInfo() {
  const spotifyApi = useSpotify();
  const [songInfo, setSongInfo] = useState();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdAtom);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());

        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [spotifyApi, currentTrackId]);

  return songInfo;
}
