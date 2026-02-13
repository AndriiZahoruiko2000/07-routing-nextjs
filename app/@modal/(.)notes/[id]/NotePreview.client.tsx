"use client";

import { useParams } from "next/navigation";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

const NoteDetailsClient = () => {
  const { id } = useParams();

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
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{notesDetailsQuery.data?.title}</h2>
        </div>
        <p className={css.content}>{notesDetailsQuery.data?.content}</p>
        <p className={css.date}>{notesDetailsQuery.data?.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
