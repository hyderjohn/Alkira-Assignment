import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getGameInfo, getTeamInfo } from "../../Api/apiList";
import LoadingUI from "./Common/LoadingUI";
import "./teaminfomodal.css";

interface TeamInfoProps {
  visible: boolean;
  handleClose: () => void;
  id: number;
}

const TeamInfo = ({ visible, handleClose, id }: TeamInfoProps) => {
  const [teamInfoData, setTeamInfoData] = useState<any>();
  const [gameInfoData, setGameInfoData] = useState<any>();

  useEffect(() => {
    const teamInfo = async () => {
      const data = await getTeamInfo(id);
      if (data) {
        setTeamInfoData(data);
      }
    };
    teamInfo();
  }, []);

  useEffect(() => {
    const gameInfo = () => {
      let id = Math.floor(Math.random() * 46911 + 1);
      const data = getGameInfo(id);
      if (data) {
        setGameInfoData(data);
      }
    };
    gameInfo();
  }, []);

  //   style={{
  //     position: "fixed",
  //     margin: "auto",
  //     width: "320px",
  //     height: "100%",
  //   }}

  return (
    <div>
      {teamInfoData !== undefined ? (
        <Modal show={visible} onHide={handleClose}>
          <Modal.Header closeButton style={{ backgroundColor: "#d8dfe4" }}>
            <Modal.Title>{teamInfoData?.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>Team Full Name : {teamInfoData?.full_name}</div>
          </Modal.Body>
        </Modal>
      ) : (
        <LoadingUI />
      )}
    </div>
  );
};

export default TeamInfo;
