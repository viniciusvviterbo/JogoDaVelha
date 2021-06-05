import { Modal, Button, Row, Col } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo.png";
import React from "react";
import "../index.css";

export default class App extends React.Component {
  state = {
    posicoes: [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ],
    count_turn: 0
  };

  // Testa se todos os componentes da linha informada são ou 'true' ou 'false'  
  arrayCompleto = (linha) => {
    const primeiroVal = linha[0]
    let linhaEstaCompleta = primeiroVal !== undefined
    
    for(let i = 1; i < linha.length && linhaEstaCompleta; i++) {
      linhaEstaCompleta = linhaEstaCompleta && (primeiroVal === linha[i])
    }

    return linhaEstaCompleta
  }

  // Testa se a partida teve seu fim
  endGame = () => {
    console.log('endGame?')
    const { posicoes, count_turn } = this.state;
    console.log('posicoes', posicoes)
    const diagonalPrincipal = [
      posicoes[0][0],
      posicoes[1][1],
      posicoes[2][2]
    ]
    const diagonalSecundaria = [
      posicoes[0][2],
      posicoes[1][1],
      posicoes[2][0]
    ]

    const colunaCompleta =
      this.arrayCompleto(posicoes.map(row => row[0])) ||
      this.arrayCompleto(posicoes.map(row => row[1])) ||
      this.arrayCompleto(posicoes.map(row => row[2]))
    // console.log(posicoes.map(row => row[0]))
    // console.log(posicoes.map(row => row[1]))
    // console.log(posicoes.map(row => row[2]))

    const linhaCompleta = 
      this.arrayCompleto(posicoes[0]) ||
      this.arrayCompleto(posicoes[1]) ||
      this.arrayCompleto(posicoes[2])
    // console.log(posicoes[0])
    // console.log(posicoes[1])
    // console.log(posicoes[2])

    const diagonalCompleta =
      this.arrayCompleto(diagonalPrincipal) ||
      this.arrayCompleto(diagonalSecundaria)
    // console.log(diagonalPrincipal)
    // console.log(diagonalSecundaria)

    if (colunaCompleta || linhaCompleta || diagonalCompleta) {
      const jogador = count_turn % 2 === 0
      ? 1
      : 2

      Modal.confirm({
        title: `Fim de Jogo`,
        icon: <ExclamationCircleOutlined />,
        content: `O jogador ${jogador} venceu o jogo!`,
        okText: 'Nova Partida',
        onOk: this.reiniciarPartida,
      });
    } else if(count_turn > 8) {
      Modal.confirm({
        title: `Fim de Jogo`,
        icon: <ExclamationCircleOutlined />,
        content: `O jogo alcançou um EMPATE!`,
        okText: 'Nova Partida',
        onOk: this.reiniciarPartida,
      });
    }
  }

  // Demarca a posição indicada pelo jogador com a sua marcação
  jogada = (row, col, new_val) => {
    const { posicoes, count_turn } = this.state;
    let new_posicoes = []
    let new_count_turn = count_turn

    Object.assign(new_posicoes, posicoes)
    
    if(new_posicoes[row][col] === undefined) {
      new_posicoes[row][col] = new_val
      new_count_turn++

      console.log('jogada')

      this.setState({
        posicoes: new_posicoes,
        count_turn: count_turn + 1,
      }, () => this.endGame())
    }
  }

  // Retorna o ícone correspondente de acordo com o valor informado
  getSimbolo = (val, props) => {
    let sign = <MinusCircleOutlined style={{ fontSize: 56 }} {...props} />;
    
    if (val === true) {
      sign = <CheckCircleOutlined style={{ color: '#00FF00', fontSize: 56 }} {...props} />;
    } else if (val === false) {
      sign = <CloseCircleOutlined style={{ color: '#FF0000', fontSize: 56 }} {...props} />;
    }

    return sign
  }

  // Gera o botão representante da posição
  generateField = (row, col, marcacao) => {
    const { posicoes, count_turn } = this.state;

    const jogador = count_turn % 2 === 0
      ? true
      : false

    const props = {
      size: 'large',
      onClick: () => { 
        this.jogada(row, col, jogador)
      }
    }

    return (
      <Col span={8} style={{ marginTop: '35px' }} align='center'>
        <a>
          {this.getSimbolo(posicoes[row][col], props)}          
        </a>
      </Col>
    );
  };

  // Restaura 'this.state' para os valores original
  reiniciarPartida = () => {
    this.setState({
      posicoes: [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ],
      count_turn: 0
    })
  };

  render() {
    const { posicoes } = this.state;

    return (
      <Row justify="center" style={{ width: '300px' }}>
        {posicoes.map((arr, row) =>
          arr.map((val, col) =>
            this.generateField(row, col, undefined)
          )
        )}
      </Row>
    );
  }
}
