import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

const ServerSidePagination = ({
  page,
  pageCount,
}: {
  currentPage: number;
  page: number;
  pageCount: number;
}) => {
  const isFirstPage = page <= 1;
  const isLastPage = page >= pageCount;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious
            href={isFirstPage ? undefined : `?page=${page - 1}`}
            aria-disabled={isFirstPage}
            className={isFirstPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        <div className="max-w-[260px] gap-4 overflow-hidden flex-row flex w-full">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p} className="cursor-pointer">
              <PaginationLink
                href={`?page=${p}`}
                className="!size-9"
                isActive={page === p}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>

        <PaginationItem className="cursor-pointer">
          <PaginationNext
            href={isLastPage ? undefined : `?page=${page + 1}`}
            aria-disabled={isLastPage}
            className={isLastPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ServerSidePagination;
