import { useState } from "react";

const useTable = ({ pageCount }: { pageCount?: number }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  //   const nextPage = () => {
  //     if (currentPage !== pageCount) setCurrentPage(currentPage + 1);
  //   };

  //   const prevPage = () => {
  //     if (currentPage !== 1) setCurrentPage(currentPage - 1);
  //   };

  return {
    currentPage,
    setCurrentPage,
    // prevPage,
    // nextPage,
    searchKeyword,
    handleSearch,
  };
};

export default useTable;
