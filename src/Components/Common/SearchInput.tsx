import { InputGroup, Form } from "react-bootstrap";
import { SearchIcon } from "./Icons";

const SearchInput = ({
  handleSearch,
}: {
  handleSearch: (keyword: string) => void;
}) => {
  return (
    <div style={{ width: "50%" }}>
      <InputGroup className="mb-3">
        <InputGroup.Text
          id="basic-addon1"
          style={{ backgroundColor: "transparent" }}
        >
          <SearchIcon />
        </InputGroup.Text>
        <Form.Control
          cy-data="search"
          className="shadow-none"
          aria-label="search"
          aria-describedby="basic-addon1"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </InputGroup>
    </div>
  );
};

export default SearchInput;
