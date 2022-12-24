export const getTeamList = async () => {
  try {
    const response = await fetch("https://www.balldontlie.io/api/v1/teams");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getTeamInfo = async (id: number) => {
  try {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/teams/${id}`
    );
    return await response.json();
  } catch (error) {
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
  }
};
