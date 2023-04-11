import React from "react";
import Modal from "./Modal";

function CreatePlaylistModal({
  setName,
  setDesc,
  isOpen,
  setIsOpen,
  handleSave,
  isBtnDisabled
}: any) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form className="flex flex-col space-y-5">
        <input
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2  bg-transparent border rounded-lg text-white border-gray-600  outline-none w-full "
          placeholder="Name"
        />
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          rows={5}
          className="bg-[#3E3E3E] px-3 py-2 rounded-lg outline-none w-full h-52  text-white border border-gray-600"
          placeholder="Add an optional description"
        />
        <button
          disabled = {isBtnDisabled}
          onClick={handleSave}
          className="text-black bg-white px-10 py-2 rounded-3xl w-fit self-end"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}

export default CreatePlaylistModal;
