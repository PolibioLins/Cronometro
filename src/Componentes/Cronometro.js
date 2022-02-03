import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Cronometro extends Component {
  // ========== States ==========
  state = {
    arrayVoltas: [],
    arrayCount: [],
    botao1: 'Vai!',
    botao2: 'Zerar',
    ss: 0,
    mm: 0,
    hh: 0,
    timer: null,
    contadorVolta: 1,
  };

  // ========== "Funções" ==========

  iniciar = () => {
    // Muda o state para parado.
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
      this.setState({botao1: 'Vai!'});
      this.setState({botao2: 'Zerar'});
    }
    // Muda o state para contaondo.
    else {
      this.setState({botao1: 'Pausar'});
      this.setState({botao2: 'Salvar e Zerar'});
      this.timer = setInterval(() => {
        this.setState({ss: this.state.ss + 0.1});
        if (this.state.ss >= 60) {
          this.setState({ss: 0});
          this.setState({mm: this.state.mm + 1});
        }
        if (this.state.mm >= 60) {
          this.setState({mm: 0});
          this.setState({hh: this.state.hh + 1});
        }
      }, 100);
    }
  };

  zerar = () => {
    // Salva a Volta
    if (this.timer != null) {



      let {arrayCount} = this.state;
      arrayCount.push(
        <Text style={estilo.contVoltas}>{this.state.contadorVolta}</Text>,
      );

      let {arrayVoltas} = this.state;
      arrayVoltas.push(
        <Text style={estilo.contVoltas}>
          {this.state.hh}h {this.state.mm}m {this.state.ss.toFixed(1)}s
        </Text>,
      );
  
      this.setState({contadorVolta: this.state.contadorVolta +1});

      this.setState({arrayCount: [arrayCount]});

      this.setState({arrayVoltas: [arrayVoltas]});



    } 

    // Limpa os dados das voltas e Zera o Cronometro
    
    else {
      this.setState({ss: 0});
      this.setState({mm: 0});
      this.setState({hh: 0});
      this.setState({contadorVolta: 1});

      this.setState({
        arrayCount: this.state.arrayCount.splice(
          this.state.arrayCount.length,
        ),
      });

      this.setState({
        arrayVoltas: this.state.arrayVoltas.splice(
          this.state.arrayVoltas.length,
        ),
      });
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  // ========== "Views" ==========

  render() {
    return (
      <View style={estilo.alinhar}>

        <Text style={estilo.titulo}>Super Sport</Text>
        <Image
          style={estilo.imagem}
          source={require('../Imagens/imgCron.jpg')}
        />
        <Text style={estilo.contador}>
          {this.state.hh}h {this.state.mm}m {this.state.ss.toFixed(1)}s
        </Text>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={estilo.botao} onPress={this.iniciar}>
            <Text style={estilo.textoBotao}>{this.state.botao1}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilo.botao} onPress={this.zerar}>
            <Text style={estilo.textoBotao}>{this.state.botao2}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={estilo.scrol}>

          <View style={{flexDirection: 'row'}}>

            <View style={estilo.coluna1}>
              <Text>Nº Registro</Text>
              {this.state.arrayCount}
            </View>

            <View style={estilo.coluna2}>
              <Text>Tempo</Text>
              {this.state.arrayVoltas}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// ========== Estilos ==========

const estilo = StyleSheet.create({
  alinhar: {
    alignItems: 'center',
    backgroundColor:'#fff',
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },

  titulo:{
    color:'#047a40',
    fontSize:50,
    fontWeight: 'bold',
    marginBottom: 10
  },

  imagem: {
    width: 200,
    height: 200,
    marginBottom:0
  },

  contador: {
    color:'#047a40',
    fontSize: 45,
    fontWeight: 'bold',
  },

  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b998c',
    height: 40,
    borderColor: '#0b998c',
    borderRadius: 30,
    borderWidth: 0.5,
    margin: 10,
    flex: 1,
  },

  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },

  scrol: {
    margin: 10,
  },

coluna1:{
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: 40,
},

coluna2:{
  flexDirection: 'column',
  alignItems: 'center',
  marginLeft: 40,
},

  contVoltas: {
    fontSize: 14,
  },
});
