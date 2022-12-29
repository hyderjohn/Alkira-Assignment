import { Button } from "react-bootstrap";
import { SortIconUp, SortIconDown } from "./Icons";
import Styles from "../../Styles/style.module.css";
import { useState } from "react";

interface SortButtonProps {
  handleSort: (arg: string) => void;
  sortKey: string;
}

const SortButton = ({ sortKey, handleSort }: SortButtonProps) => {
  const [filterStatus, setFilterStatus] = useState(false);
  return (
    <Button
      className={Styles.sortbutton}
      cy-data={sortKey}
      variant="link"
      size="sm"
      onClick={() => {
        handleSort(sortKey);
        setFilterStatus(!filterStatus);
      }}
    >
      {filterStatus ? <SortIconUp /> : <SortIconDown />}
    </Button>
  );
};

export default SortButton;
