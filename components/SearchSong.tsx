import {
  pageOffsetAtom,
  playlistAtom,
  searchValueAtom,
} from "@/atoms/playlistAtoms";
import useSearch from "@/hooks/useSearch";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { debounce } from "lodash";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

function SearchSong() {
  const [pageOffset, setPageOffset] = useRecoilState(pageOffsetAtom);
  const [searchValue, setSeachValue] = useRecoilState<string>(searchValueAtom);
  useSearch({ value: searchValue });
  const handleSearch = (e: any) => {
    setPageOffset(0);
    setSeachValue(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2 bg-dark2 text-white p-2">
      <MagnifyingGlassIcon className="h-6" />
      <input
        placeholder="search ..."
        onChange={debounce(handleSearch, 700)}
        className="border-none outline-none bg-transparent  "
      />
    </div>
  );
}

export default SearchSong;
