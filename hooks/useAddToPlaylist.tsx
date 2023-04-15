import { useState } from "react";
import AddTrackModal from "@/components/ui/AddTrackModal";
export default function useAddToPlaylist({ uri }: { uri: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const modal = isOpen ? (
    <AddTrackModal isOpen={isOpen} setIsOpen={setIsOpen} uri={uri} />
  ) : null;

  return {
    addModal: modal,
    openAddModal: () => setIsOpen(true),
  };
}
