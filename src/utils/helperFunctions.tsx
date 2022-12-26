import { Toast } from "react-bootstrap";
import { TeamDataTypes } from "../Types/TeamTypes";

export const showErrorAlert = () => {
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>Error!</strong> Something went wrong
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export const search = (currentItem: TeamDataTypes, keyword: string) => {
  if (
    currentItem?.name.toLowerCase().includes(keyword.toLowerCase()) ||
    currentItem?.abbreviation.toLowerCase().includes(keyword.toLowerCase()) ||
    currentItem?.division.toLowerCase().includes(keyword.toLowerCase()) ||
    currentItem?.conference.toLowerCase().includes(keyword.toLowerCase())
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
