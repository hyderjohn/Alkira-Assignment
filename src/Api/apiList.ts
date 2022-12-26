import { showErrorToast } from "../utils/helperFunctions";

export const getTeamList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  try {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/teams?page=${page}&per_page=${size}`
    );
    return await response.json();
  } catch (error) {
    alert("Something Went Wrong in API Error");
    console.log(error);
  }
};

export const getGameInfo = async (id: number) => {
  try {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/games/${id}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    alert("Something Went Wrong in API Error");
  }
};
