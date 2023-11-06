import {useState, React, useEffect, useCallback} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ImageBackground, Modal, Pressable } from 'react-native';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import firebase from '@firebase/app-compat';

const IndexScreen = () => {
  const navigation = useNavigation()
  const userID = auth.currentUser?.uid

  {/* DB connection */}
  const ref = firebase.firestore().collection(userID)

  const [currDate, setCurrDate] = useState(moment().format('D'))
  const [currMonth, setCurrMonth] = useState(moment().format('MMMM'))
  const [highestStreak, setHighestStreak] = useState()

  const [modalVisible, setModalVisible] = useState(false)

  {/* Holds users answers */}
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

  {/* Fetches user response once on page load */}
  useEffect(() => {
    fetchData()
  }, [])

  {/* Constantly checks if current date has been updated */}
  useEffect(() => {
    fetchData()
  }, [currDate])

  {/* Get month in number form */}
  let month = '';
  switch(currMonth.toString()) {
    case 'January':
      month = '0' + 1;
      break;
    case 'February':
      month = '0' + 2;
      break;
    case 'March':
      month = '0' + 3;
      break;
    case 'April':
      month = '0' + 4;
      break;
    case 'May':
      month = '0' + 5;
      break;
    case 'June':
      month = '0' + 6;
      break;
      case 'July':
    month = '0' + 7;
    break;
  case 'August':
    month = '0' + 8;
    break;
  case 'September':
    month = '0' + 9;
    break;
  case 'October':
    month = 10;
    break;
  case 'November':
      month = 11;
      break;
  case 'December':
    month = 12;
    break;
  }

  {/* Reassigns currDate depending on which date the user clicks */}
  function switchDate(date) {
    month = moment().year().toString() + '-' + month
    if(date > 1 && date < moment().daysInMonth()) {
      setCurrDate(date)
    } else if (date === '1') {
      setCurrDate('1')
    } else {
      setCurrDate(moment().daysInMonth().toString())
    }
    {/* Cycle months */}
    if((currDate === moment().daysInMonth().toString() || currDate === (moment().daysInMonth() - 1).toString()) && (date === '1' || date === '2')) {
      setCurrMonth(moment(month).add(1, "month").format('MMMM'))
    }
    if((currDate === '1' || currDate === '2') && (date === moment().daysInMonth().toString() || date === (moment().daysInMonth() - 1).toString())) {
      setCurrMonth(moment(month).subtract(1, "month").format('MMMM'))
    }
    fetchData()
  }

  {/* Get highest streak */}
  function getHighestStreak() {
    ref.get().then((querySnapshot) => {
      if(querySnapshot.size > 0) {
        let data = querySnapshot.docs.map((doc) => ({id: doc.id}));
        let chunks = []
        let prev = undefined
        data.forEach((current) => {
          if(prev === undefined || current.id - prev != 1) {
            chunks.push([])
          }
          chunks[chunks.length - 1].push(current.id)
          prev=current.id
        })
        chunks.sort((a, b) => b.length - a.length);
        setHighestStreak(chunks[0].length)
      } else {
        setHighestStreak(0);
      }
    })
  }

  {/* Fetches user responses from the DB */}
  const fetchData = () => {
    ref.doc(currDate).get().then((querySnapshot) => {
      {/* If user has responses on currDate, fetch responses */}
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
        {/* If currDate has no responses, set text inputs to blank */}
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

  {/* Sign out */}
  const handleSignout = () => {
    auth.signOut()
    .then(() => {
      navigation.navigate("Home")
    })
    .catch(error => alert(error.message))
  }

  {/* Saves user responses into DB */}
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

  {/* Getter for currMonth */}
  function getMonth() {
    return currMonth
  }

  {/* Gets the following day after currDate */}
  function getNextDate() {
    let one = 1;
    if(currDate === moment().daysInMonth().toString()) {
      return one.toString()
    } else {
      return (Number(currDate) + 1).toString()
    }
  }

  {/* Gets the day following tomorrow from currDate */}
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

  {/* Gets yesterday relative to currDate */}
  function getYesterday() {
    let one = 1;
    if(currDate === one.toString()) {
      return moment().daysInMonth().toString()
    } else {
      return (Number(currDate) - 1).toString()
    }
  }

  {/* Gets the day before yesterday relative to currDate */}
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
      {/* Options modal */}
      <Modal 
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modal}>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.close}>x</Text>
            </Pressable>
            <View style={styles.accountWrapper}>
              <View style={styles.email}>
                <Text style={styles.modalText}> Email: {auth.currentUser?.email}</Text>
              </View>
              <View style={styles.password}>
                <Text style={styles.modalText}> Password: ********</Text>
              </View>
            </View>
            <Text style={styles.modalText}> Longest Streak: {highestStreak}</Text>

          </View>
        </View>
      </Modal>

      {/* Background image */}
      <ImageBackground style={styles.bg} source={require('../assets/bg.jpg')}>
        {/* Header containing signout and options */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons style={styles.options} name="cog-outline" size={32} onPress={() => {setModalVisible(true); getHighestStreak()}}/>
          </TouchableOpacity>
          <Ionicons style={styles.logoutIcon} name="log-out-outline" size={32} onPress={handleSignout}/>
        </View>

        {/* Displays currMonth */}
        <View style={styles.monthWrapper}>
          <Text style={styles.month}>{getMonth()}</Text>
        </View>

        {/* Displays 2 days before currDate, currDate, and 2 days after currDate */}
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

        {/* Line */}
        <View style={styles.lineWrapper}>
            <View style={styles.line}></View>
        </View>

        {/* Takes user inputs and displays them */}
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

            {/* Save button */}
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
    paddingTop: 15,
  },
  options: {
    paddingLeft: 15,
  },
  logoutIcon: {
    paddingRight: 15,
  },
  accountWrapper: {
    flexDirection: 'column',
  },
  email: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingTop: 35
  },
  password: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  editButton: {
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 20,
    marginLeft: 'auto'
  },
  text: {
    fontWeight: 'bold'
  },
  buttonText: {
    fontWeight: 'bold',
    padding: 5
  },
  monthWrapper: {
    paddingBottom: 10,
    alignItems: 'center'
  },
  month: {
    fontFamily: 'notoserif',
    fontSize: 48,
    fontWeight: 'bold',
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
    borderColor: 'black',
    borderWidth: 1,
  },
  leftArrow: {
    marginTop: 5,
    paddingLeft: 20,
    fontSize: 28,
  },
  rightArrow: {
    marginTop: 5,
    paddingRight: 20,
    fontSize: 28,
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
    paddingLeft: 50,
    borderWidth: 1,
    borderColor: 'black'
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
  modalWrapper: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop:  50
  },
  modal: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingBottom: 50,
    width: '60vw'
  },
  modalText: {
    fontWeight: 'bold',
    padding: 15
  },
  close:{
    paddingRight: 15,
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 'auto'
  }
})



