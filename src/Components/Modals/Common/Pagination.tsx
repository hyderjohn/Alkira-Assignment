import Pagination from "react-bootstrap/Pagination";

const TablePagination = ({
  nPages,
  currentPage,
  setCurrentPage,
}: {
  nPages: number;
  currentPage: number;
  setCurrentPage: (agr0: number) => void;
}) => {
  const pageNumbers = Array.from(Array(nPages && nPages + 1).keys()).slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  console.log(currentPage);

  return (
    <Pagination size="sm">
      <Pagination.Prev onClick={prevPage} href="#" />
      {pageNumbers.map((pgNumber) => (
        <li
          key={pgNumber}
          className={`page-item ${currentPage == pgNumber ? "active" : ""} `}
        >
          <a
            onClick={() => setCurrentPage(pgNumber)}
            className="page-link"
            href="#"
          >
            {pgNumber}
          </a>
        </li>
      ))}
      <Pagination.Next onClick={nextPage} href="#" />
    </Pagination>
  );
};

export default TablePagination;
