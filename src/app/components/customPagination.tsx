'use client'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";


const CustomPagination = ({
  setPage,
  page,
  pageCount,
}: {
  setPage: (page: number) => void;
  page: number;
  pageCount: number;
}) => {
  const paginationRef = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(useGSAP);
  const slideWidth = 52;
  useGSAP(() => {});
  useGSAP(() => {
    const allPaginationButtons = paginationRef.current?.children;

    if (allPaginationButtons) {
      gsap.to(allPaginationButtons, {
        translateX: -slideWidth * (page - 1),
        duration: 0.3,
      });
    }
  }, [page, paginationRef.current, pageCount]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) setPage(page - 1);
            }}
            aria-disabled={page === 1}
          />
        </PaginationItem>
        <div
          ref={paginationRef}
          className="max-w-[260px]   gap-4 overflow-hidden flex-row flex w-full"
        >
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p} className="cursor-pointer">
              <PaginationLink
                className="!size-9"
                isActive={page === p}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>
        <PaginationItem className="cursor-pointer">
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (page < pageCount) setPage(page + 1);
            }}
            aria-disabled={page === pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
