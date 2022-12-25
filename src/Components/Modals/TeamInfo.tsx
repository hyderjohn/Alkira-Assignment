import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { getGameInfo } from "../../Api/apiList";
import { GameTypes, TeamDataTypes } from "../../Types/TeamTypes";
import { formatDate } from "../../utils/helperFunctions";
import LoadingUI from "./Common/LoadingUI";
import "./teaminfomodal.css";

interface TeamInfoProps {
  visible: boolean;
  handleClose: () => void;
  id: number;
  teamInfo: TeamDataTypes;
}

const TeamInfo = ({ visible, handleClose, id, teamInfo }: TeamInfoProps) => {
  const [gameInfoData, setGameInfoData] = useState<GameTypes>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const gameInfo = async () => {
      setLoading(true);
      let randomId = Math.floor(Math.random() * 46911 + 1);
      const data = await getGameInfo(randomId);
      setLoading(false);
      if (data) {
        setGameInfoData(data);
      }
    };
    gameInfo();
  }, []);

  return (
    <div>
      <Modal show={visible} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: "#d8dfe4" }}>
          <Modal.Title>
            <strong>{teamInfo?.name}</strong>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <div className="mb-3">Team Full Name </div>
            </Col>
            <Col>{teamInfo?.full_name}</Col>
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
          {!loading && (
            <>
              <Row>
                <div className="mb-3">
                  <p>
                    <strong>Random Game Details:</strong>
                  </p>
                </div>
              </Row>
              <Row>
                <Col>
                  <div className="mb-3">
                    <p>
                      <strong>Date</strong>
                    </p>
                  </div>
                </Col>
                <Col>
                  <p>
                    <strong>
                      {gameInfoData &&
                        gameInfoData?.date.toLocaleString().slice(0, 10)}
                    </strong>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="mb-3">
                    <p>
                      <strong>Home Team</strong>
                    </p>
                  </div>
                </Col>
                <Col>
                  <p>
                    <strong>{gameInfoData?.home_team?.name}</strong>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="mb-3">
                    <p>
                      <strong>Home Team Score</strong>
                    </p>
                  </div>
                </Col>
                <Col>
                  <p>
                    <strong>{gameInfoData?.home_team_score}</strong>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="mb-3">
                    <p>
                      <strong>Visitor Team</strong>
                    </p>
                  </div>
                </Col>
                <Col>
                  <p>
                    <strong>{gameInfoData?.visitor_team?.name}</strong>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="mb-3">
                    <p>
                      <strong>Visitor Team Score</strong>
                    </p>
                  </div>
                </Col>
                <Col>
                  <p>
                    <strong>{gameInfoData?.visitor_team_score}</strong>
                  </p>
                </Col>
              </Row>
            </>
          )}
          {loading && <LoadingUI />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeamInfo;
