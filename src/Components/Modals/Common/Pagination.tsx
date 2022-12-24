import Pagination from "react-bootstrap/Pagination";

const TablePagination = ({ current, totalCount, nextPage, perPage }: any) => {
  let active = 1;
  let items = [];

  let pageCount = totalCount / perPage;

  for (let page = 1; page <= pageCount; page++) {
    items.push(
      <Pagination.Item key={page} active={page === active}>
        {page}
      </Pagination.Item>
    );
  }

  return (
    <Pagination size="sm">
      {current !== 1 && <Pagination.Prev />}
      {items}
      <Pagination.Next />
    </Pagination>
  );
};

export default TablePagination;
