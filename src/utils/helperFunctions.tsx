import moment from "moment";

export const formatDate = (date: string) => {
  if (!date) return "";
  try {
    const formatDate = moment(date).format("llll");
    return formatDate;
  } catch (error) {
    console.log(error);
  }
  return "--";
};
