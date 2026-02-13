"use client";

import Modal from "@/components/Modal/Modal";

import { useRouter } from "next/navigation";
import NoteDetailsClient from "./NotePreview.client";

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
