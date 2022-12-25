import { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { getTeamList } from "../Api/apiList";
import LoadingUI from "../Components/Modals/Common/LoadingUI";
import TablePagination from "../Components/Modals/Common/Pagination";
import TeamInfo from "../Components/Modals/TeamInfo";
import useTable from "../Hooks/useTable";
import { TeamApiDataTypes, TeamDataTypes } from "../Types/TeamTypes";
import { search } from "../utils/helperFunctions";
const recordsPerPage = 10;
const Teams = () => {
  const { currentPage, setCurrentPage, searchKeyword, handleSearch } =
    useTable();

  const idRef = useRef<number>();
  const [teamsData, setTeamsData] = useState<TeamApiDataTypes | undefined>();
  const [showTeamInfoModal, setShowTeamInfoModal] = useState(false);
  const [teamInfo, setTeamInfo] = useState<TeamDataTypes>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const teamsList = async () => {
      try {
      } catch (error) {}

      setLoading(true);
      const data = await getTeamList({
        page: currentPage,
        size: recordsPerPage,
      });
      if (data) {
        setTeamsData(data);
        setLoading(false);
      }
    };
    teamsList();
  }, [currentPage]);

  const handleViewTeam = (data: TeamDataTypes) => {
    idRef.current = data?.id;
    setTeamInfo(data);
    setShowTeamInfoModal(true);
  };
  const pageCount = teamsData && teamsData?.meta?.total_pages;

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
      {!loading && (
        <>
          <div className="input-group mb-3">
            <input
              type={"search"}
              placeholder="Search"
              style={{ width: "50%" }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

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
                    search(item, searchKeyword)
                    // item?.name
                    //   .toLowerCase()
                    //   .includes(searchKeyword.toLowerCase()) ||
                    // item?.city
                    //   .toLowerCase()
                    //   .includes(searchKeyword.toLowerCase()) ||
                    // item?.abbreviation
                    //   .toLowerCase()
                    //   .includes(searchKeyword.toLowerCase()) ||
                    // item?.division
                    //   .toLowerCase()
                    //   .includes(searchKeyword.toLowerCase()) ||
                    // item?.conference
                    //   .toLowerCase()
                    //   .includes(searchKeyword.toLowerCase())
                  ) {
                    return (
                      <tr
                        onClick={() => handleViewTeam(item)}
                        key={item.id}
                        style={{ cursor: "pointer" }}
                      >
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
          <div style={{ display: "flex", justifyContent: "end" }}>
            <TablePagination
              pageCount={pageCount as number}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
      {loading && <LoadingUI />}
      {/* ) : (
        <LoadingUI />
      )} */}

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
