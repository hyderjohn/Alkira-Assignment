import { useEffect, useState } from "react";
import { getTeamList } from "../Api/apiList";
import LoadingUI from "../Components/Common/LoadingUI";
import TablePagination from "../Components/Common/TablePagination";
import useTable from "../Hooks/useTable";
import { TeamApiDataTypes } from "../Types/TeamTypes";
import Styles from "../Styles/style.module.css";
import TeamTable from "../Components/Tables/TeamTable";
import SearchInput from "../Components/Common/SearchInput";

const recordsPerPage = 10;

const Teams = () => {
  const { currentPage, setCurrentPage, searchKeyword, handleSearch } =
    useTable();

  const [teamsData, setTeamsData] = useState<TeamApiDataTypes | undefined>();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSort = (label: string) => {
    const data = teamsData?.data.sort((a: any, b: any) => {
      if (isSorted) {
        return a[label] > b[label] ? 1 : -1;
      } else {
        return a[label] > b[label] ? -1 : 1;
      }
    });
    if (data && teamsData) {
      setTeamsData({
        ...teamsData,
        data: data,
      });
      setIsSorted(!isSorted);
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
          <SearchInput handleSearch={handleSearch} />
          <TeamTable
            handleSort={handleSort}
            isSorted={isSorted}
            teamsData={teamsData}
            searchKeyword={searchKeyword}
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
    </>
  );
};

export default Teams;
