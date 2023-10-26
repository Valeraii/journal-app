import { useNavigation } from '@react-navigation/core'
import {useState, react, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import {auth} from "../firebase"

const HomeScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    {/* If there is user, navigate to index screen */}
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Index")
            }
        })
        return unsubscribe
    }, [])

    const redirectToSignup = () => {
        navigation.navigate("Signup")
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => alert(error.message))
    }
    return (
        <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Text style={styles.title}>Daily Journal</Text>
          <View style={styles.circular}></View>
        </View>
        
        <View style={styles.loginWrapper}>
          <TextInput style={styles.email} 
            placeholder={'Email'} 
            value={email} 
            onChangeText={text => setEmail(text)}
            />
          <TextInput style={styles.password} 
            placeholder={'Password'} 
            secureTextEntry={true}
            value={password} 
            onChangeText={text => setPassword(text)}
            />
          <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
            <Text style={styles.signinText}>SIGN IN</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Don't have an account?</Text>
          <TouchableOpacity onPress={redirectToSignup}>
            <Text style={styles.signup}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
  
      </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
      },
      logoWrapper: {
        paddingTop: 150,
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
        marginTop: 10,
        marginBottom: 10
      },
      loginWrapper: {
        paddingTop: 20,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      email: {
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
})