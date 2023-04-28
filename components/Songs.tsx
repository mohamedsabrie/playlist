import { pageOffsetAtom, playlistAtom } from "@/atoms/playlistAtoms";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Song from "./Song";
import ReactPaginate from "react-paginate";

function Songs() {
  const playlist: any = useRecoilValue(playlistAtom);
  const tracks = playlist?.tracks?.items;
  console.log(playlist, "playlist");
  const [offset, setOffset] = useRecoilState(pageOffsetAtom);
  const handlePageClick = (event: any) => {
    console.log("I changed ");
    setOffset((event.selected * 20) % playlist?.tracks?.total);
  };
  console.log(offset);
  console.log(Math.ceil(playlist?.tracks?.total / playlist?.tracks?.limit));
  return (
    <div className="text-white flex flex-col overflow-y-auto scrollbar-hide">
      {tracks?.map((track: any, i: number) => (
        <Song
          key={track?.track?.id}
          track={track?.track ?? track}
          order={i + offset}
        />
      ))}
      {tracks?.length && (
        <ReactPaginate
          forcePage={Math.ceil(offset / playlist?.tracks?.limit) || 0}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(
            playlist?.tracks?.total / playlist?.tracks?.limit
          )}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="flex items-center justify-center my-10 space-x-3"
          pageClassName="bg-dark2 text-white p-2"
          activeClassName="bg-primary"
          disabledClassName="text-gray-400"
        />
      )}
    </div>
  );
}

export default Songs;
