import { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { getTeamList } from "../Api/apiList";
import LoadingUI from "../Components/Modals/Common/LoadingUI";
import TeamInfo from "../Components/Modals/TeamInfo";
import { TeamApiDataTypes, TeamDataTypes } from "../Types/TeamTypes";

const Teams = () => {
  const idRef = useRef<number>();
  const [teamsData, setTeamsData] = useState<TeamApiDataTypes>();
  const [showTeamInfoModal, setShowTeamInfoModal] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const search = (keyword: any) => {
    setKeyword(keyword);
  };

  useEffect(() => {
    const teamsList = async () => {
      const data = await getTeamList();
      if (data) {
        setTeamsData(data);
      }
    };
    teamsList();
  }, []);

  const handleViewTeam = (id: number) => {
    idRef.current = id;
    setShowTeamInfoModal(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          color: "#054684",
          margin: "10px",
        }}
      >
        <p className="h2 font-weight-bold">NBA TEAMS</p>
      </div>
      <div className="input-group mb-3">
        <input
          type={"search"}
          placeholder="Search"
          style={{ width: "50%" }}
          onChange={(e) => search(e.target.value)}
        />
      </div>
      {teamsData !== undefined ? (
        <Table hover>
          <thead style={{ backgroundColor: "#054684", color: "white" }}>
            <tr>
              <th>Team Name</th>
              <th>City</th>
              <th>Abbreviation</th>
              <th>Conference</th>
              <th>Division</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teamsData &&
              teamsData?.data?.map((item: TeamDataTypes) => {
                if (
                  item?.name.toLowerCase().includes(keyword.toLowerCase()) ||
                  item?.city.toLowerCase().includes(keyword.toLowerCase()) ||
                  item?.abbreviation
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                  item?.division
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                  item?.conference.toLowerCase().includes(keyword.toLowerCase())
                ) {
                  return (
                    <tr>
                      <td>{item?.name}</td>
                      <td>{item?.city}</td>
                      <td>{item?.abbreviation}</td>
                      <td>{item?.conference}</td>
                      <td>{item?.division}</td>
                      <td>
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => handleViewTeam(item?.id)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </Table>
      ) : (
        <LoadingUI />
      )}

      {showTeamInfoModal && (
        <TeamInfo
          visible={showTeamInfoModal}
          handleClose={() => setShowTeamInfoModal(false)}
          id={idRef.current as number}
        />
      )}
    </>
  );
};

export default Teams;
