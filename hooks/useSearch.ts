import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import useSpotify from "./useSpotify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  pageOffsetAtom,
  playlistAtom,
  playlistIdAtom,
} from "@/atoms/playlistAtoms";

export default function useSearch({ value }: { value: string }) {
  const spotifyApi = useSpotify();
  const setPlaylist: any = useSetRecoilState(playlistAtom);
  const pageOffset = useRecoilValue(pageOffsetAtom);
  const setPlaylistId = useSetRecoilState(playlistIdAtom);

  useEffect(() => {
    debounce(() => {
      if (value.trim()) {
        spotifyApi.searchTracks(value, { offset: pageOffset }).then(
          function (data: any) {
            setPlaylist(data.body);
            setPlaylistId("");

            console.log("Search value", data.body);
          },
          function (err: any) {
            console.error(err);
          }
        );
      }
    }, 1000)();
  }, [pageOffset, value]);
}
