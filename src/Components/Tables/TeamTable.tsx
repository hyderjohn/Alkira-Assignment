import { Table } from "react-bootstrap";
import { ColumnKeys, TeamDataTypes } from "../../Types/TeamTypes";
import { search } from "../../utils/helperFunctions";
import Styles from "../../Styles/style.module.css";
import SortButton from "../Common/SortButton";
import { useState } from "react";
import ViewTeam from "../Modals/ViewTeam";

interface TeamTableProps {
  handleSort: (arg: string) => void;
  isSorted: boolean;
  teamsData: any;
  searchKeyword: string;
}

const TeamTable = ({
  handleSort,
  isSorted,
  teamsData,
  searchKeyword,
}: TeamTableProps) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [teamInfo, setTeamInfo] = useState<TeamDataTypes>();
  const [showTeamInfoModal, setShowTeamInfoModal] = useState(false);

  const handleViewTeam = (data: TeamDataTypes) => {
    setTeamInfo(data);
    setShowTeamInfoModal(true);
  };

  return (
    <>
      <Table hover>
        <thead className={Styles.head}>
          <tr>
            <th>
              <div className={Styles.columhead}>
                Team Name
                <SortButton
                  isSorted={isSorted}
                  sortKey={ColumnKeys.NAME}
                  handleSort={handleSort}
                />
              </div>
            </th>
            <th>
              <div className={Styles.columhead}>
                City
                <SortButton
                  isSorted={isSorted}
                  sortKey={ColumnKeys.CITY}
                  handleSort={handleSort}
                />
              </div>
            </th>
            <th>
              <div className={Styles.columhead}>
                Abbreviation
                <SortButton
                  isSorted={isSorted}
                  sortKey={ColumnKeys.ABR}
                  handleSort={handleSort}
                />
              </div>
            </th>
            <th>
              <div className={Styles.columhead}>
                Conference
                <SortButton
                  isSorted={isSorted}
                  sortKey={ColumnKeys.CONF}
                  handleSort={handleSort}
                />
              </div>
            </th>
            <th>
              <div className={Styles.columhead}>
                Division
                <SortButton
                  isSorted={isSorted}
                  sortKey={ColumnKeys.DIV}
                  handleSort={handleSort}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {teamsData &&
            teamsData?.data?.map((item: TeamDataTypes) => {
              if (search(item, searchKeyword)) {
                return (
                  <tr
                    className={Styles.row}
                    onClick={() => {
                      handleViewTeam(item);
                      setSelectedRow(item.id);
                    }}
                    style={{
                      background: selectedRow === item.id ? "#F2F2F2" : "unset",
                    }}
                    key={item.id}
                  >
                    <td>{item?.name}</td>
                    <td>{item?.city}</td>
                    <td>{item?.abbreviation}</td>
                    <td>{item?.conference}</td>
                    <td>{item?.division}</td>
                  </tr>
                );
              } else {
                return <></>;
              }
            })}
        </tbody>
      </Table>
      {showTeamInfoModal && (
        <ViewTeam
          visible={showTeamInfoModal}
          handleClose={() => setShowTeamInfoModal(false)}
          teamInfo={teamInfo as TeamDataTypes}
          setSelectedRow={setSelectedRow}
        />
      )}
    </>
  );
};

export default TeamTable;
