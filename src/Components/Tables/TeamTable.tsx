import { Table, Button } from "react-bootstrap";
import { SortIconUp, SortIconDown } from "../Common/Icons";
import { TeamDataTypes } from "../../Types/TeamTypes";
import { search } from "../../utils/helperFunctions";
import Styles from "../../Styles/style.module.css";

interface TeamTableProps {
  handleSort: () => void;
  isSorted: boolean;
  teamsData: any;
  searchKeyword: string;
  handleViewTeam: (data: TeamDataTypes) => void;
}

const TeamTable = ({
  handleSort,
  isSorted,
  teamsData,
  searchKeyword,
  handleViewTeam,
}: TeamTableProps) => {
  return (
    <Table hover className="sortable">
      <thead className={Styles.head}>
        <tr>
          <th>Team Name</th>
          <th>
            <div className={Styles.columhead}>
              City
              <Button
                className={Styles.sortbutton}
                variant="link"
                size="sm"
                onClick={() => handleSort()}
              >
                {isSorted === true ? <SortIconUp /> : <SortIconDown />}
              </Button>
            </div>
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
                  className={Styles.row}
                  onClick={() => handleViewTeam(item)}
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
  );
};

export default TeamTable;
