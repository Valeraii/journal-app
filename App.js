import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Text style={styles.title}>Daily Journal</Text>
        <View style={styles.circular}></View>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.loginWrapper}
      >
        <TextInput style={styles.username} placeholder={'Username'}/>
        <TextInput style={styles.password} placeholder={'Password'} secureTextEntry={true}/>
        <TouchableOpacity >
          <Text style={styles.signinText}>SIGN IN</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity >
          <Text style={styles.signup}>SIGN UP</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  logoWrapper: {
    paddingTop: 100,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  circular: {
    width: 200,
    height: 200,
    borderColor: '#C0C0C0',
    borderWidth: 2,
    borderRadius: 100,
  },
  loginWrapper: {
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  username: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    marginBottom: 15,
  },
  password: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,   
    marginBottom: 15,
  },
  signinText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 15,
  },
  text: {
    marginBottom: 15,
  },
  signup: {

  },
});
