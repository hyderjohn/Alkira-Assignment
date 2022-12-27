import { TeamDataTypes } from "../Types/TeamTypes";

// search table items based on keywords in search input
export const search = (item: TeamDataTypes, searchKeyword: string) => {
  if (
    item?.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item?.city.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item?.abbreviation.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item?.division.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item?.conference.toLowerCase().includes(searchKeyword.toLowerCase())
  ) {
    return true;
  } else {
    return false;
  }
};
