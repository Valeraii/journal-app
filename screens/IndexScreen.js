import {useState, React, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import firebase from '@firebase/app-compat';

const IndexScreen = () => {
  const navigation = useNavigation()
  const userID = auth.currentUser?.uid

  const [currDate, setCurrDate] = useState('')
  const [q1a1, setQ1a1] = useState('')
  const [q1a2, setQ1a2] = useState('')
  const [q1a3, setQ1a3] = useState('')
  const [q2a1, setQ2a1] = useState('')
  const [q2a2, setQ2a2] = useState('')
  const [q2a3, setQ2a3] = useState('')
  const [q3a1, setQ3a1] = useState('')
  const [q3a2, setQ3a2] = useState('')
  const [q3a3, setQ3a3] = useState('')
  const [q4a1, setQ4a1] = useState('')

  let month = moment().format('MMMM')
  let day = moment().format('D')
  let day1 = moment().add(1, 'days').format('D')
  let day2 = moment().add(2, 'days').format('D')
  let leftArrow = '<'
  let rightArrow = '>'

  const ref = firebase.firestore().collection(userID)

  useEffect(() => {
    const unsubscribe = ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setQ1a1(doc.data().q1a1)
        setQ1a2(doc.data().q1a2)
        setQ1a3(doc.data().q1a3)
        setQ2a1(doc.data().q2a1)
        setQ2a2(doc.data().q2a2)
        setQ2a3(doc.data().q2a3)
        setQ3a1(doc.data().q3a1)
        setQ3a2(doc.data().q3a2)
        setQ3a3(doc.data().q3a3)
        setQ4a1(doc.data().q4a1)
      })
    })
    return unsubscribe
  }, [])

  const handleSignout = () => {
    auth.signOut()
    .then(() => {
      navigation.navigate("Home")
    })
    .catch(error => alert(error.message))
  }

  async function handleSave() {
    await ref.doc(day).set({
      date: day,
      q1a1: q1a1,
      q1a2: q1a2,
      q1a3: q1a3,
      q2a1: q2a1,
      q2a2: q2a2,
      q2a3: q2a3,
      q3a1: q3a1,
      q3a2: q3a2,
      q3a3: q3a3,
      q4a1: q4a1
    })
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity>
          <Ionicons style={styles.options} name="cog-outline" size={32}/>
        </TouchableOpacity>
        <View style={styles.monthWrapper}>
          <Text style={styles.month}>{month}</Text>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity >
            <Text style={styles.leftArrow}>{leftArrow}</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>{day -2}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>{day - 1}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>{day}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>{day1}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>{day2}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={styles.rightArrow}>{rightArrow}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lineWrapper}>
            <View style={styles.line}></View>
        </View>

        <View style={styles.journalWrapper}>
          <View style={styles.journal}>
            <Text style={styles.question}>3 Things I am grateful for: </Text>
            <View style={styles.answer}>
              <Ionicons style={styles.bulletIcon} name="caret-forward-outline"/>
              <TextInput style={styles.input} value={q1a1} onChangeText={text => setQ1a1(text)}/>
            </View>
            <View style={styles.answer}>
              <Ionicons style={styles.bulletIcon} name="caret-forward-outline"/>
              <TextInput style={styles.input} value={q1a2} onChangeText={text => setQ1a2(text)}/>
            </View>
            <View style={styles.answer}>
              <Ionicons style={styles.bulletIcon} name="caret-forward-outline"/>
              <TextInput style={styles.input} value={q1a3} onChangeText={text => setQ1a3(text)}/>
            </View>

            <Text style={styles.question}>What would make today great: </Text>
            <View style={styles.answer}>
              <Ionicons style={styles.bulletIcon} name="caret-forward-outline"/>
              <TextInput style={styles.input} value={q2a1} onChangeText={text => setQ2a1(text)}/>
            </View>
            <View style={styles.answer}>
              <Ionicons style={styles.bulletIcon} name="caret-forward-outline"/>
              <TextInput style={styles.input} value={q2a2} onChangeText={text => setQ2a2(text)}/>
            </View>
            <View style={styles.answer}>
              <Ionicons style={styles.bulletIcon} name="caret-forward-outline"/>
              <TextInput style={styles.input} value={q2a3} onChangeText={text => setQ2a3(text)}/>
            </View>

            <Text style={styles.question}>3 things that went well today: </Text>
            <View style={styles.answer}>
              <Ionicons style={styles.bulletIcon} name="caret-forward-outline"/>
              <TextInput style={styles.input} value={q3a1} onChangeText={text => setQ3a1(text)}/>
            </View>
            <View style={styles.answer}>
              <Ionicons style={styles.bulletIcon} name="caret-forward-outline"/>
              <TextInput style={styles.input} value={q3a2} onChangeText={text => setQ3a2(text)}/>
            </View>
            <View style={styles.answer}>
              <Ionicons style={styles.bulletIcon} name="caret-forward-outline"/>
              <TextInput style={styles.input} value={q3a3} onChangeText={text => setQ3a3(text)}/>
            </View>

            <Text style={styles.question}>1 thing I learned today: </Text>
            <View style={styles.answer}>
              <Ionicons style={styles.bulletIcon} name="caret-forward-outline"/>
              <TextInput style={styles.input} value={q4a1} onChangeText={text => setQ4a1(text)} />
            </View>

            <View style={styles.saveWrapper}>
              <TouchableOpacity style={styles.saveButton} onPress={() => handleSave()}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      
        <TouchableOpacity
          onPress={handleSignout}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
    </View>
  )
}

export default IndexScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  options: {
    padding: 20,
  },
  monthWrapper: {
    paddingBottom: 30,
    alignItems: 'center'
  },
  month: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    /*vertical*/
    justifyContent: 'center',
    /*horizontal*/
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  leftArrow: {
    marginTop: 20,
    paddingLeft: 30,
  },
  rightArrow: {
    marginTop: 20,
    paddingRight: 30,
  },
  lineWrapper: {
    paddingTop: 30,
    alignItems: 'center',
  },
  line: {
    width:'80%',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  journalWrapper: {
    paddingTop: 30,
    alignItems: 'center',
  },
  question: {
    marginTop: 20,
    marginBottom: 10,
  },
  journal: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 60,
    paddingBottom: 20,
    paddingTop: 20,
    paddingRight: 50,
    paddingLeft: 50
  },
  journalText: {
   
  },
  answer: {
    flexDirection: 'row',
  },
  input: {
    width: '90%',
  },
  bulletIcon: {
    padding: 5,
  },
  saveWrapper: {
    marginTop: 30,
    alignItems: 'center'
  },
  saveButton: {
    width: '50%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  saveText: {
    fontWeight: '700',
    fontSize: 16
  },
  button: {
    backgroundColor: '#0783F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  }
})



