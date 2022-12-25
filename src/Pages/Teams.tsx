import { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { getTeamList } from "../Api/apiList";
import LoadingUI from "../Components/Modals/Common/LoadingUI";
import TablePagination from "../Components/Modals/Common/Pagination";
import TeamInfo from "../Components/Modals/TeamInfo";
import { TeamApiDataTypes, TeamDataTypes } from "../Types/TeamTypes";

const Teams = () => {
  const idRef = useRef<number>();
  const [teamsData, setTeamsData] = useState<TeamApiDataTypes | undefined>();
  const [showTeamInfoModal, setShowTeamInfoModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>("");
  const [teamInfo, setTeamInfo] = useState<TeamDataTypes>();
  const search = (keyword: string) => {
    setKeyword(keyword);
  };

  console.log(currentPage, "Team");

  useEffect(() => {
    const teamsList = async () => {
      const data = await getTeamList({
        page: currentPage,
        size: recordsPerPage,
      });
      if (data) {
        setTeamsData(data);
      }
    };
    teamsList();
  }, [currentPage]);

  const handleViewTeam = (data: TeamDataTypes) => {
    idRef.current = data?.id;
    setTeamInfo(data);
    setShowTeamInfoModal(true);
  };

  //   const indexOfLastRecord = currentPage * recordsPerPage;
  //   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  //   const currentRecords = teamsData?.data?.slice(
  //     indexOfFirstRecord,
  //     indexOfLastRecord
  //   );
  const nPages =
    teamsData && Math.ceil(teamsData?.meta?.total_count / recordsPerPage);

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
                    <tr onClick={() => handleViewTeam(item)}>
                      <td>{item?.name}</td>
                      <td>{item?.city}</td>
                      <td>{item?.abbreviation}</td>
                      <td>{item?.conference}</td>
                      <td>{item?.division}</td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </Table>
      ) : (
        <LoadingUI />
      )}
      <div style={{ display: "flex", justifyContent: "end" }}>
        <TablePagination
          nPages={nPages as number}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {showTeamInfoModal && (
        <TeamInfo
          visible={showTeamInfoModal}
          handleClose={() => setShowTeamInfoModal(false)}
          id={idRef.current as number}
          teamInfo={teamInfo as TeamDataTypes}
        />
      )}
    </>
  );
};

export default Teams;
