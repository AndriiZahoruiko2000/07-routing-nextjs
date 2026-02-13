"use client";

import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/components/NotePreview/NotePreview";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const close = () => {
    router.back();
  };

  return (
    <Modal onClose={close}>
      <NoteDetailsClient />
    </Modal>
  );
};

export default Page;
