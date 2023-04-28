import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import useSpotify from "./useSpotify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageOffsetAtom, playlistAtom } from "@/atoms/playlistAtoms";

export default function useSearch({ value }: { value: string }) {
  const spotifyApi = useSpotify();
  const setPlaylist: any = useSetRecoilState(playlistAtom);
  const pageOffset = useRecoilValue(pageOffsetAtom);

  useEffect(() => {
    debounce(() => {
      // if (value.trim()) {
      spotifyApi.searchTracks(value, { offset: pageOffset }).then(
        function (data: any) {
          setPlaylist(data.body);
          console.log("Search value", data.body);
        },
        function (err: any) {
          console.error(err);
        }
      );
    }, 1000)();
  }, [pageOffset, value]);
}
