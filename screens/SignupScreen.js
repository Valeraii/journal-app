import { useNavigation } from '@react-navigation/core'
import {useState, react, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import {auth} from "../firebase"

function SignupScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    {/* If there is user, navigate to index screen */}
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                   navigation.navigate("Index")
            }
        })
        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => alert(error.message))
    }
  return (
    <View style={styles.container}>
        <View style={styles.titleWrapper}>
            <Text style={styles.title}>Sign Up</Text>
        </View>

         <View style={styles.signupWrapper}>
         <TextInput style={styles.name} 
            placeholder={'Name'} 
            value={name} 
            onChangeText={text => setName(text)}
            />
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
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signup}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    titleWrapper: {
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
    signupWrapper: {
        paddingTop: 20,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    name: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
        marginBottom: 15,
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
    signup: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        marginBottom: 15,
    },
})
