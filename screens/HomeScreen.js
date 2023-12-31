import { useNavigation } from '@react-navigation/core'
import {useState, react, useEffect} from "react";
import { StyleSheet, StatusBar, SafeAreaView, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import {auth} from "../firebase"
import { Image } from 'react-native';

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

    {/* Go to SignupScreen */}
    const redirectToSignup = () => {
      navigation.navigate("Signup")
    }

    {/* Log in */}
    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => alert("Email or password is incorrect"))
    }

    return (
        <SafeAreaView style={styles.container}>
          {/* Background */}
          {/* href="https://www.vecteezy.com/free-photos">Free Stock photos by Vecteezy */}
          <ImageBackground style={styles.bg} source={require('../assets/bg.jpg')}>
        
            {/*Title and logo */}
            <View style={styles.logoWrapper}>
              <Text style={styles.title}>Daily Journal</Text>
              <View style={styles.circular}>
                <Image style={styles.image} source={require('../assets/logo.png')}/>
              </View>
            </View>
            
            <View style={styles.loginWrapper}>
              {/* Email input */}
              <TextInput style={styles.email} 
                placeholder={'Email'} 
                value={email} 
                onChangeText={text => setEmail(text)}
              />
              {/* Password input */}
              <TextInput style={styles.password} 
                placeholder={'Password'} 
                secureTextEntry={true}
                value={password} 
                onChangeText={text => setPassword(text)}
              />
              {/* Sign in button */}
              <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
                <Text style={styles.signinText}>SIGN IN</Text>
              </TouchableOpacity>

              {/* Sign up button */}
              <Text style={styles.text}>Don't have an account?</Text>
              <TouchableOpacity onPress={redirectToSignup}>
                <Text style={styles.signup}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
        <StatusBar translucent backgroundColor='transparent' />
        </ImageBackground>
    
      </SafeAreaView>
      
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
      },
      bg: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        height: '100%'
      },
      logoWrapper: {
        paddingTop: 150,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      title: {
        fontSize: 48,
        fontWeight: 'bold',
        paddingBottom: 20,
        fontFamily: 'notoserif',
      },
      circular: {
        width: 200,
        height: 200,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
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
      image: {
        width: '100%',
        height: '100%'
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
        color: 'white'
      },
      signup: {
        paddingBottom: 100,
        color: 'white'
      },
})