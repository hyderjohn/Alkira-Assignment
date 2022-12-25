import moment from "moment";
import { TeamDataTypes } from "../Types/TeamTypes";

export const formatDate = (date: string) => {
  if (!date) return "";
  try {
    const formatDate = moment(date).format("YYYY-MM-DD");
    return formatDate;
  } catch (error) {
    console.log(error);
  }
  return "--";
};

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
  // for (let label in currentItem) {
  //   console.log(currentItem, keyword);
  //   // console.log(currentItem[label]);
  //   if (currentItem[label].toLoweCase().includes(keyword.toLowerCase())) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // if (key !== "city" && key !== "id" && key !== "full_name") {
  //   if (currentItem[key].toLoweCase().includes(keyword.toLowerCase())) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // return true;
  // }
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
