import {useState, React, useEffect, useCallback} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import firebase from '@firebase/app-compat';

const IndexScreen = () => {
  const navigation = useNavigation()
  const userID = auth.currentUser?.uid

  const [currDate, setCurrDate] = useState(moment().format('D'))
  const [currMonth, setCurrMonth] = useState(moment().format('MMMM'))
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

  let leftArrow = '<'
  let rightArrow = '>'

  const ref = firebase.firestore().collection(userID)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [switchDate])

  function switchDate(date) {
    console.log('here ' + date)
    let one = 1;
    if(date > 1 && date < moment().daysInMonth()) {
      setCurrDate(date)
    } else if (date === one.toString()) {
      console.log("one")
      setCurrDate(one.toString())
    } else {
      setCurrDate(moment().daysInMonth().toString())
    }
    // if(date === 1 && getNextDate() >= 1) {
    //   setCurrMonth(moment().add(1, "month").format('MMMM'))
    // }
    // if(date === 1 && getYesterday() === moment().daysInMonth() - 1) {
    //   setCurrMonth(moment().subtract(1, "month").format('MMMM'))
    // }
    fetchData()
    console.log(currDate)
  }

  const fetchData = () => {
    console.log('fetching ' + currDate)
    ref.doc(currDate).get().then((querySnapshot) => {
      if(querySnapshot.exists) { 
        setQ1a1(querySnapshot.data().q1a1)
        setQ1a2(querySnapshot.data().q1a2)
        setQ1a3(querySnapshot.data().q1a3)
        setQ2a1(querySnapshot.data().q2a1)
        setQ2a2(querySnapshot.data().q2a2)
        setQ2a3(querySnapshot.data().q2a3)
        setQ3a1(querySnapshot.data().q3a1)
        setQ3a2(querySnapshot.data().q3a2)
        setQ3a3(querySnapshot.data().q3a3)
        setQ4a1(querySnapshot.data().q4a1)
      } else {
        setQ1a1('')
        setQ1a2('')
        setQ1a3('')
        setQ2a1('')
        setQ2a2('')
        setQ2a3('')
        setQ3a1('')
        setQ3a2('')
        setQ3a3('')
        setQ4a1('')
      }
    })
  }

  const handleSignout = () => {
    auth.signOut()
    .then(() => {
      navigation.navigate("Home")
    })
    .catch(error => alert(error.message))
  }

  async function handleSave() {
    await ref.doc(currDate).set({
      date: currDate,
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

  function getMonth() {
    return currMonth
  }

  function getNextDate() {
    let one = 1;
    if(currDate === moment().daysInMonth().toString()) {
      return one.toString()
    } else {
      return (Number(currDate) + 1).toString()
    }
  }

  function getNextNextDate() {   
    let one = 1;
    let two = 2;
    if(Number(currDate) + 1 === moment().daysInMonth()) {
      return one.toString()
    }
    if (Number(currDate) + 2 > moment().daysInMonth()) {
      return two.toString()
    }
    return (Number(currDate) + 2).toString()
  }

  function getYesterday() {
    let one = 1;
    if(currDate === one.toString()) {
      return moment().daysInMonth().toString()
    } else {
      return (Number(currDate) - 1).toString()
    }
  }

  function getYesterdayYesterday() {
    if(Number(currDate) - 1 === 1) {
      return moment().daysInMonth().toString()
    }
    if (Number(currDate) - 2 < 1) {
      return (moment().daysInMonth() - 1).toString()
    }
    return (Number(currDate) - 2).toString()
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <ImageBackground style={styles.bg} source={require('../assets/ocean-bg.png')}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons style={styles.options} name="cog-outline" size={32}/>
          </TouchableOpacity>
          <Ionicons style={styles.logoutIcon} name="log-out-outline" size={32} onPress={handleSignout}/>
        </View>

        <View style={styles.monthWrapper}>
          <Text style={styles.month}>{getMonth()}</Text>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => switchDate(getYesterday())}>
            <Text style={styles.leftArrow}>{leftArrow}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => switchDate(getYesterdayYesterday())}>
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>{getYesterdayYesterday()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => switchDate(getYesterday())}>
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>{getYesterday()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => switchDate(currDate)}>
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>{currDate}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => switchDate(getNextDate())}>
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>{getNextDate()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => switchDate(getNextNextDate())}>
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>{getNextNextDate()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => switchDate(getNextDate())}>
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
      </ImageBackground>
    </View>
    </ScrollView>
  )
}

export default IndexScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  bg: {
    resizeMode: 'cover',
    height: '100vh'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  options: {
    padding: 20,
    color: 'white'
  },
  logoutIcon: {
    padding: 20,
    color: 'white',
  },
  monthWrapper: {
    paddingBottom: 20,
    alignItems: 'center'
  },
  month: {
    fontFamily: 'notoserif',
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white'
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateWrapper: {
    width: 50,
    height: 50,
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
    paddingLeft: 20,
    color: 'white'
  },
  rightArrow: {
    marginTop: 20,
    paddingRight: 20,
  },
  lineWrapper: {
    paddingTop: 30,
    alignItems: 'center',
    color: 'white'
  },
  line: {
    width:'80%',
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  journalWrapper: {
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 20
  },
  question: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'notoserif',
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
    fontFamily: 'notoserif',
  },
  bulletIcon: {
    padding: 5,
  },
  saveWrapper: {
    marginTop: 10,
    alignItems: 'center'
  },
  date: {
    fontFamily: 'notoserif',
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
})



