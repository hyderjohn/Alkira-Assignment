import { Button } from "react-bootstrap";
import { SortIconUp, SortIconDown } from "./Icons";
import Styles from "../../Styles/style.module.css";
import { useState } from "react";

interface SortButtonProps {
  handleSort: (arg: string) => void;
  isSorted: boolean;
  sortKey: string;
}

const SortButton = ({ sortKey, isSorted, handleSort }: SortButtonProps) => {
  const [filterStatus, setFilterStatus] = useState(false);
  return (
    <Button
      className={Styles.sortbutton}
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
