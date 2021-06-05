import { Card, Button, Row, Col, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import React from "react";
import "../index.css";
import Tabuleiro from "./Tabuleiro";

export default class App extends React.Component {
  state = {
    show_info: true,
    show_game: false,
    loading: false,
  };

  inverte_exibicao = () => {
    const { show_info, show_game } = this.state;

    this.setState({
      show_info: !show_info,
      show_game: !show_game,
    });
  };

  render() {
    const { show_info, show_game } = this.state;
    return (
      <Row justify="center" align="middle" className="row">
        <Col>
          <Card
            bordered={false}
            style={{
              width: 700,
              borderRadius: "8px",
              boxShadow: "1px 1px 1px 2px #ccc",
            }}
          >
            <Row
              style={{ marginTop: "25px", marginBottom: "65px", width: "100%" }}
              justify="center"
            >
              <Col className="title">Jogo da Velha</Col>
            </Row>

            {show_info && (
              <>
                <div style={{ color: "#000000" }}>
                  <p>
                    Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta
                    quium dia nois paga. Interessantiss quisso pudia ce receita
                    de bolis, mais bolis eu num gostis. Praesent vel viverra
                    nisi. Mauris aliquet nunc non turpis scelerisque, eget. Suco
                    de cevadiss deixa as pessoas mais interessantis.
                  </p>
                  <p>
                    Mais vale um bebadis conhecidiss, que um alcoolatra
                    anonimis. Si u mundo tá muito paradis? Toma um mé que o
                    mundo vai girarzis! Paisis, filhis, espiritis santis.
                    Detraxit consequat et quo num tendi nada.
                  </p>
                  <p>
                    Casamentiss faiz malandris se pirulitá. Nec orci ornare
                    consequat. Praesent lacinia ultrices consectetur. Sed non
                    ipsum felis. Leite de capivaris, leite de mula manquis sem
                    cabeça. A ordem dos tratores não altera o pão duris.{" "}
                  </p>
                </div>
                <Button onClick={() => this.inverte_exibicao()}>
                  Iniciar o Jogo
                </Button>
              </>
            )}

            {show_game && (
              <>
                <Row justify="center">
                  <Tabuleiro />
                </Row>
                <Row justify="space-between" style={{ marginTop: "25px" }}>
                  <Col>
                    <Button onClick={() => this.inverte_exibicao()}>
                      Instruções
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => {
                        Modal.confirm({
                          title: `Iihhh alá o cagão`,
                          icon: <ExclamationCircleOutlined />,
                          content: `Vai peidar mesmo?`,
                          okText: "Sim, sou peidão mesmo :(",
                          onOk: () => window.close(),
                          cancelText: "Que cagão o que sô",
                        });
                      }}
                    >
                      Abandonar partida
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
    );
  }
}
