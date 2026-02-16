import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getNotes } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const Page = async ({ params }: PageProps) => {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const tag = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["getNotes", 1, ""],
    queryFn: () =>
      getNotes({
        page: 1,
        search: "",
        tag: tag === "all" ? undefined : tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient filterTag={tag} />
    </HydrationBoundary>
  );
};

export default Page;
