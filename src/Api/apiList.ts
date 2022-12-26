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
    // showErrorToast("Error in API");
    alert("Error");
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
  }
};
