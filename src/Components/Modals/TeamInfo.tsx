import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { getGameInfo, getTeamInfo } from "../../Api/apiList";
import { GameTypes, TeamTypesById } from "../../Types/TeamTypes";
import { formatDate } from "../../utils/helperFunctions";
import "./teaminfomodal.css";

interface TeamInfoProps {
  visible: boolean;
  handleClose: () => void;
  id: number;
}

const TeamInfo = ({ visible, handleClose, id }: TeamInfoProps) => {
  const [teamInfoData, setTeamInfoData] = useState<TeamTypesById>();
  const [gameInfoData, setGameInfoData] = useState<GameTypes>();

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
    const gameInfo = async () => {
      let randomId = Math.floor(Math.random() * 46911 + 1);
      const data = await getGameInfo(randomId);
      if (data) {
        setGameInfoData(data);
      }
    };
    gameInfo();
  }, []);

  return (
    <div>
      <Modal show={visible} onHide={handleClose} animation>
        <Modal.Header closeButton style={{ backgroundColor: "#d8dfe4" }}>
          <Modal.Title>{teamInfoData?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <div className="mb-3">Team Full Name </div>
            </Col>
            <Col>{teamInfoData?.full_name}</Col>
          </Row>
          <Row>
            <Col>
              <div className="mb-3">Total Games Played in 2021 </div>
            </Col>
            <Col>
              {gameInfoData &&
                gameInfoData?.home_team_score +
                  gameInfoData?.visitor_team_score}
            </Col>
          </Row>

          <Row>
            <div className="mb-3">
              <h6>Random Game Details:</h6>
            </div>
          </Row>
          <Row>
            <Col>
              <div className="mb-3">
                <p className="font-weight-bold">Date</p>
              </div>
            </Col>
            <Col> {gameInfoData && formatDate(gameInfoData?.date)}</Col>
          </Row>
          <Row>
            <Col>
              <div className="mb-3">
                <p className="font-weight-bold">Home Team</p>
              </div>
            </Col>
            <Col> {gameInfoData?.home_team?.name}</Col>
          </Row>
          <Row>
            <Col>
              <div className="mb-3">
                <p className="font-weight-bold">Home Team Score</p>
              </div>
            </Col>
            <Col> {gameInfoData?.home_team_score}</Col>
          </Row>
          <Row>
            <Col>
              <div className="mb-3">
                <p className="font-weight-bold">Visitor Team</p>
              </div>
            </Col>
            <Col>{gameInfoData?.visitor_team?.name}</Col>
          </Row>
          <Row>
            <Col>
              <div className="mb-3">
                <p className="font-weight-bold">Visitor Team Score</p>
              </div>
            </Col>
            <Col>{gameInfoData?.visitor_team_score}</Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeamInfo;
