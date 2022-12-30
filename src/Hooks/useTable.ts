import { useState } from "react";

const useTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSorted, setIsSorted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return {
    currentPage,
    setCurrentPage,
    searchKeyword,
    handleSearch,
    isSorted,
    setIsSorted,
    loading,
    setLoading,
  };
};

export default useTable;
