import { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { getTeamList } from "../Api/apiList";
import LoadingUI from "../Components/Modals/Common/LoadingUI";
import TablePagination from "../Components/Modals/Common/Pagination";
import SearchIcon from "../Components/Modals/Common/SearchIcon";
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
  const [sortedData, setSortedData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const teamsList = async () => {
      setLoading(true);
      const data = await getTeamList({
        page: currentPage,
        size: recordsPerPage,
      });
      setLoading(false);
      if (data) {
        setTeamsData(data);
      }
    };
    teamsList();
  }, [currentPage]);

  // useEffect(() => {
  //   if (teamsData) {
  //     const data = teamsData.data?.map((item: any) => {
  //       return item.sort(()=>{});
  //     });
  //     setSortedData(data);
  //   }
  // }, [teamsData]);

  const handleViewTeam = (data: TeamDataTypes) => {
    idRef.current = data?.id;
    setTeamInfo(data);
    setShowTeamInfoModal(true);
  };
  const pageCount = teamsData && teamsData?.meta?.total_pages;

  // const sorted = teamsData?.data.sort((a: any, b: any) => {
  //   return a.city > b.city ? -1 : 1;
  // });
  // console.log(sorted);

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
        <p className="h2 font-weight-bold">
          <strong>NBA TEAMS</strong>
        </p>
      </div>
      {!loading && (
        <>
          <div style={{ width: "50%" }}>
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="basic-addon1"
                style={{ backgroundColor: "transparent" }}
              >
                <SearchIcon />
              </InputGroup.Text>
              <Form.Control
                className="shadow-none"
                aria-label="search"
                aria-describedby="basic-addon1"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </InputGroup>
          </div>

          <Table hover className="sortable">
            <thead style={{ backgroundColor: "#054684", color: "white" }}>
              <tr>
                <th>Team Name</th>
                <th
                // style={{
                //   display: "flex",
                //   justifyContent: "space-between",
                //   alignContent: "center",
                // }}
                >
                  City
                  {/* {
                    <span>
                      <Button
                        variant="link"
                        size="sm"
                        // onClick={() => handleSort}
                      >
                        A
                      </Button>
                    </span>
                  } */}
                </th>
                <th>Abbreviation</th>
                <th>Conference</th>
                <th>Division</th>
              </tr>
            </thead>
            <tbody>
              {teamsData &&
                teamsData?.data?.map((item: TeamDataTypes) => {
                  if (search(item, searchKeyword)) {
                    return (
                      <tr
                        onClick={() => handleViewTeam(item)}
                        key={item.id}
                        style={{ cursor: "pointer", fontWeight: "bold" }}
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
