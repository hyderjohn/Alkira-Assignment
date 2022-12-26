import { Toast } from "react-bootstrap";
import { TeamDataTypes } from "../Types/TeamTypes";

// search table items based on keywords in search input
export const search = (item: TeamDataTypes, searchKeyword: string) => {
  if (
    item?.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item?.abbreviation.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item?.division.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item?.conference.toLowerCase().includes(searchKeyword.toLowerCase())
  ) {
    return true;
  } else {
    return false;
  }
};

export const showErrorToast = (msg: string) => {
  return (
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Error!</strong>
      </Toast.Header>
      <Toast.Body>{msg}</Toast.Body>
    </Toast>
  );
};
