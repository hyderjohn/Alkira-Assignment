import { useMemo } from "react";

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: any) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      //   return range(1, totalPageCount);
    }

    // Our implementation logic will go here
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
