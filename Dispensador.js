import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import AndroidOpenSettings from 'react-native-android-open-settings';
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import BluetoothSerial from "react-native-bluetooth-serial-next";
import Firebase from "./firebase";
import { getDatabase, ref, onValue, get } from "firebase/database";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const auth = Firebase.auth();

export default class Dispensador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      raciones:0,
      disable: false,
      foto: '',
      status: "🔄️ Actualizando estado...",
      connectionOptions: {
        DELIMITER: "9",
      },
      MAC_ADDRESS: ""
    };
    this.darComida = this.darComida.bind(this);
  }
  
  darComida = async () => {
    try {   
      await BluetoothSerial.writeToDevice("This is the test message");
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  componentDidMount() {
    const uid = auth.currentUser.uid;
    const db = getDatabase();
    this.subscription = RNBluetoothClassic.onDeviceDisconnected(
      this.onDeviceDisconnected
    );
    Firebase.database()
      .ref("mascotas/" + uid)
      .once("value", (snapshot) => {
        const rec = snapshot.val();
        if(rec != null){
          this.setState({
            nombre: rec.nombre,
            foto: rec.foto,
            raciones: rec.raciones
          });
        }else{
          this.setState({disable: true});
        }

      });
  }

  render() {
    const {navigate} = this.props.navigation;  
    return (
      <View style={styles.container}>
        <Image
          style={styles.imagen}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2221/2221877.png",
          }}
        />
        <Text style={styles.titulo}>Dispensador PRO 5000</Text>
        <View
          style={{
            backgroundColor: "rgba(40, 110, 156,0.7)",
            position: "absolute",
            top: 180,
            left: 35,
            right: 35,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <View style={{display:'flex'}}>
            <Text>            <Ionicons
              name={"paw"}
              size={15}
              color={"white"}
              style={{ top: 0, left: 0 }}
            /> {this.state.nombre}</Text>
          </View>

          
        </View>
        <View>
          <View
            style={{
              backgroundColor: "rgba(20, 670, 206,0.7)",
              position: "absolute",
              top: 240,
              flex: 1,
              justifyContent: 'space-between',
              display: 'flex',
              paddingTop:10,
              paddingLeft: 20,
              left: 35,
              width: '40%',
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white', fontSize: 15 }}>
              Peso en kg:           
            </Text>
            <TextInput
                keyboardType={'numeric'}
                style={{textAlign:'center',backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10, marginBottom:10,width: '50%'}}
                value={this.state.peso}
                step="0.01"
                placeholderTextColor={"rgba(255,255,255,1.0)"}
                onChangeText={text => this.setState({peso: text})}
              />
          </View>
        </View>
        <TouchableOpacity
        onPress={()=>this.darComida()}
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            alignItems: "center",
            borderRadius: 15,
            position: "absolute",
            top: 500,
            left: 35,
            right: 35,
          }}
        >
          <Image
            style={{ width: 250, height: 250, borderRadius: 15 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2221/2221877.png",
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontFamily: "Roboto",
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            Dar alimento
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              paddingTop: 15,
              paddingBottom: 15,
              fontFamily: "Roboto",
            }}
          >
            Dispensador al: {this.state.status} %
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9232DB",
  },
  mail: {
    width: Dimensions.get("window").width - 55,
    height: 40,
    borderRadius: 30,
    borderColor: "rgba(255,255,255,1.0)",
    fontSize: 18,
    paddingLeft: 75,

    backgroundColor: "rgba(0,0,0,0.0)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
  },
  botonInicio: {
    position: "absolute",
    borderColor: "white",
    borderWidth: 2,
    width: Dimensions.get("window").width - 55,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    borderRadius: 30,
    top: 30,
    backgroundColor: "rgba(0,0,0,0.0)",
  },
  botonRegistrarse: {
    position: "absolute",
    borderColor: "white",
    borderWidth: 2,
    width: Dimensions.get("window").width - 55,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    borderRadius: 30,
    top: 85,
    backgroundColor: "rgba(0,0,0,0.0)",
  },
  pass: {
    position: "absolute",
    width: Dimensions.get("window").width - 55,
    borderRadius: 30,
    fontSize: 18,
    height: 40,
    top: 10,
    paddingLeft: 45,
    backgroundColor: "rgba(0,0,0,0.1)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
  },
  titulo: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 15,
    position: "absolute",
    color: "#FFFFFF",
    textShadowColor: "#585858",
    textShadowOffset: { width: 10, height: 10 },
    textShadowRadius: 10,
    left: 35,
    fontSize: 50,
    top: 50,
    zIndex: 1,
    fontFamily: "sans-serif-thin",
  },
  imagen: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
});
