import { pageOffsetAtom, playlistAtom, searchValueAtom } from "@/atoms/playlistAtoms";
import useSearch from "@/hooks/useSearch";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

function SearchSong() {
  const [pageOffset, setPageOffset] = useRecoilState(pageOffsetAtom);
  const [searchValue, setSeachValue] = useRecoilState<string>(searchValueAtom);
  useSearch({ value: searchValue });

  return (
    <div className="flex items-center space-x-2 bg-dark2 text-white p-2">
      <MagnifyingGlassIcon className="h-6" />
      <input
        placeholder="search ..."
        value={searchValue}
        onChange={(e) => {
          setPageOffset(0);
          setSeachValue(e.target.value);
        }}
        className="border-none outline-none bg-transparent  "
      />
    </div>
  );
}

export default SearchSong;
