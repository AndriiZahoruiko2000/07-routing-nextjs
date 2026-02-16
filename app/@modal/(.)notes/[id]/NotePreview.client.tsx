"use client";

import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

import Modal from "@/components/Modal/Modal";

interface NoteDetailsClientProps {}

const NoteDetailsClient = ({}: NoteDetailsClientProps) => {
  const { id } = useParams();

  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const notesDetailsQuery = useQuery({
    queryKey: ["getNoteDetail", id],
    queryFn: () => fetchNoteById(id as string),
    refetchOnMount: false,
  });

  const isLoading = notesDetailsQuery.isLoading;
  const isError = notesDetailsQuery.isError;

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{notesDetailsQuery.data?.title}</h2>
          </div>
          <p className={css.content}>{notesDetailsQuery.data?.content}</p>
          <p className={css.date}>{notesDetailsQuery.data?.createdAt}</p>
          <p className={css.tag}>{notesDetailsQuery.data?.tag}</p>
          <button className={css.backBtn} onClick={handleClose}>
            close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NoteDetailsClient;
