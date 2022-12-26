import { useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { getTeamList } from "../Api/apiList";
import LoadingUI from "../Components/Common/LoadingUI";
import TablePagination from "../Components/Common/TablePagination";
import useTable from "../Hooks/useTable";
import { TeamApiDataTypes, TeamDataTypes } from "../Types/TeamTypes";
import Styles from "../Styles/style.module.css";
import { SearchIcon } from "../Components/Common/Icons";
import TeamTable from "../Components/Tables/TeamTable";
import ViewTeam from "../Components/Modals/ViewTeam";

const recordsPerPage = 10;
const Teams = () => {
  const { currentPage, setCurrentPage, searchKeyword, handleSearch } =
    useTable();

  const idRef = useRef<number>();
  const [teamsData, setTeamsData] = useState<TeamApiDataTypes | undefined>();
  const [showTeamInfoModal, setShowTeamInfoModal] = useState(false);
  const [teamInfo, setTeamInfo] = useState<TeamDataTypes>();
  const [isSorted, setIsSorted] = useState(false);
  const [loading, setLoading] = useState(false);

  const pageCount = teamsData && teamsData?.meta?.total_pages; // total pages data from api.

  useEffect(() => {
    const teamsList = async () => {
      setLoading(true);
      const newData = await getTeamList({
        page: currentPage,
        size: recordsPerPage,
      });
      setLoading(false);
      if (newData) {
        if (isSorted === false) {
          setTeamsData(newData);
        } else {
          setTeamsData({
            ...newData,
            data: newData?.data,
          });
        }
      }
    };
    teamsList();
  }, [currentPage]);

  const handleViewTeam = (data: TeamDataTypes) => {
    idRef.current = data?.id;
    setTeamInfo(data);
    setShowTeamInfoModal(true);
  };

  const handleSort = () => {
    if (isSorted === false) {
      const data = teamsData?.data.sort(
        (a: { city: string }, b: { city: string }) => {
          return a.city > b.city ? -1 : 1;
        }
      );
      if (data && teamsData) {
        setTeamsData({
          ...teamsData,
          data: data,
        });
        setIsSorted(true);
      }
    } else if (isSorted === true) {
      const data = teamsData?.data.sort(
        (a: { city: string }, b: { city: string }) => {
          return a.city > b.city ? 1 : -1;
        }
      );
      if (data && teamsData) {
        setTeamsData({
          ...teamsData,
          data: data,
        });
        setIsSorted(false);
      }
    }
  };

  return (
    <>
      <div className={Styles.tablepage}>
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

          <TeamTable
            handleSort={handleSort}
            isSorted={isSorted}
            teamsData={teamsData}
            searchKeyword={searchKeyword}
            handleViewTeam={handleViewTeam}
          />
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
        <ViewTeam
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
