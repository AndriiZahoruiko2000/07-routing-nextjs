import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getNotes } from "@/lib/api";
import NotesClient from "@/components/NotesPage/NotesPage";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getNotes", 1, ""],
    queryFn: () => getNotes({ page: 1, search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Page;
