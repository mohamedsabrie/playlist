import React from "react";

function ControlsOptions({ openCreatePlaylist }: any) {
  return (
    <>
      <div className="text-white">
        <div onClick={openCreatePlaylist}>
          <p className="text-white px-5 py-2 hover:bg-gray-500 cursor-pointer">
            Edit details
          </p>
        </div>
      </div>
    </>
  );
}

export default ControlsOptions;
