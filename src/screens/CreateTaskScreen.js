import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { vh, vw } from '../utils/units';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../components/Input';
import Button from '../components/Button';
import { createTask, fetch } from '../redux/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Notification from '../../Notification';

const CreateTaskScreen = (props) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const [date, setDate] = useState(new Date());
    const [mode, setMdoe] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, seletedDate) => {
        const currentDate = seletedDate || date;
        setShow(Platform.OS === 'ios');
        if(event.type == 'set') {
            setDate(currentDate);
        } else {
            return null
        }
        let temp = moment(seletedDate).format('MM/DD/YYYY')
        setDeadline(temp);
    };
    const onCreate = () => {

        if (title === '' || description === '' || deadline === '') {
            return alert("Please fill all the fields");
        }
        const createTodo = {
            ID: auth.uid,
            title: title,
            description: description,
            deadline: deadline,
            status: 'pending'
        }
        dispatch(createTask(createTodo)).then((res) => {
            dispatch(fetch(auth.uid)).then((res) => {
                setNotification();
                props.navigation.navigate('ToDoListScreen');
            })
        });
    }
    const setNotification = () => {

        const data = {
            date,
            title
        }
        Notification.scheduleNotification(data);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMdoe(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const calendarIonc = <Icon name="calendar" size={20} />
    return (
        <View>
            <ImageBackground source={require('../assets/images/glitter.jpg')} style={styles.backgroundImage}>
                <TouchableOpacity onPress={() => props.navigation.navigate('ToDoScreen')}>
                    <Icon name="chevron-left" size={25} color={'white'} style={styles.backIconStyle} />
                </TouchableOpacity>
                <Text style={styles.textStyle}>Create a New Task</Text>
            </ImageBackground>

            <View style={styles.taskContainerStyle}>

                <Input
                    label="Title"
                    value={title}
                    placeholder="Enter task title"
                    onChangeText={setTitle}
                />
                <Input
                    label="Description"
                    value={description}
                    placeholder="Enter task description"
                    onChangeText={setDescription}
                />
                {show &&
                    (<DateTimePicker neutralButtonLabel="clear" testID="dateTimePicker" minimumDate={new Date()}  mode={mode} value={date} is24Hour={true} onChange={onChange} />)
                }

                <Text style={styles.deadlineLabelStyle}>Deadline</Text>
                <TouchableOpacity onPress={showDatepicker}>
                    <View style={styles.deadlineInputStyle}>
                        <Text placeholder="Select task deadline" onChangeText={setDeadline}>{deadline}</Text>
                        <Icon name="calendar" size={20} style={styles.calendarIconStyle} />
                    </View>
                </TouchableOpacity>

                <View style={{ width: 100 * vw, alignItems: 'center' }}>
                    <Button text="Create" onPress={onCreate} />
                </View>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: 100 * vw,
        height: 30 * vh
    },
    textStyle: {
        fontSize: 25,
        color: 'white',
        paddingLeft: 40,
        paddingTop: 40,
        fontFamily: 'Poppins-Bold'
    },
    deadlineInputStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        width: 330, 
        marginLeft: 20, 
        marginBottom: 40, 
        borderBottomColor: '#d6bfed', 
        borderBottomWidth: 1
    },
    deadlineLabelStyle: {
        color: '#423562',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 20,
    },
    backIconStyle: {
        marginTop: 10,
        marginLeft: 10
    },
    calendarIconStyle: {
        marginBottom: 10
    },
    taskContainerStyle: {
        backgroundColor: '#fdf5fc',
        top: 30,
        height: 650,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 30,
        alignItems: 'flex-start',
        marginTop: -10 * vh
    },
    createButtonStyle: {
        backgroundColor: 'red',
        margin: 20
    },

});

export default CreateTaskScreen;