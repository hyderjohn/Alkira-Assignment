import { Button } from "react-bootstrap";
import { SortIconUp, SortIconDown } from "./Icons";
import Styles from "../../Styles/style.module.css";

interface SortButtonProps {
  handleSort: (arg: string) => void;
  isSorted: boolean;
  sortKey: string;
}

const SortButton = ({ sortKey, isSorted, handleSort }: SortButtonProps) => {
  return (
    <Button
      className={Styles.sortbutton}
      variant="link"
      size="sm"
      onClick={() => handleSort(sortKey)}
    >
      {isSorted === true ? <SortIconUp /> : <SortIconDown />}
    </Button>
  );
};

export default SortButton;
