"use client";
import css from "./NotesPage.module.css";
import { useState } from "react";

import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import NoteList from "@/components/NoteList/NoteList";
import { useParams } from "next/navigation";

const NotesClient = () => {
  const params = useParams();
  console.log(params);
  const filterTag = (params.slug || [])[0];

  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [query] = useDebounce(search, 1000);

  const noteQuery = useQuery({
    queryKey: ["getNotes", page, query, filterTag],
    queryFn: () =>
      getNotes({
        page,
        search: query,
        tag: filterTag === "all" ? undefined : filterTag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notesList = noteQuery.data?.notes || [];
  const totalPages = noteQuery.data?.totalPages ?? 0;
  const loading = noteQuery.isLoading;
  const isError = noteQuery.isError;

  const handleModalClick = () => {
    setIsOpenModal(true);
  };

  const handleSubmit = () => {
    setPage(1);
    setIsOpenModal(false);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={setSearch} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} setPage={setPage} page={page} />
        )}
        <button className={css.button} onClick={handleModalClick}>
          Create note +
        </button>
      </header>
      <main>{notesList.length > 0 && <NoteList notesList={notesList} />}</main>
      {/* {loading && <Loader />}
      {isError && <ErrorMessage error={noteQuery.error} />} */}
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <NoteForm onSubmit={handleSubmit} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
