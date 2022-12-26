import { useState } from "react";

const useTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return {
    currentPage,
    setCurrentPage,
    searchKeyword,
    handleSearch,
  };
};

export default useTable;
