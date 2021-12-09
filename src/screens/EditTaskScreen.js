import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { vh, vw } from '../utils/units';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../components/Input';
import Button from '../components/Button';
import { editTask, fetch } from '../redux/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const EditTaskScreen = (props) => {
    const create = useSelector((state) => state.create);
    const { item } = props.route.params;
    const { ID, title, description, deadline, status} = item[1];
    const dispatch = useDispatch();
    const [editTitle, setTitle] = useState(title);
    const [editDescription, setDescription] = useState(description);
    const [editDeadline, setDeadline] = useState(deadline);

    const [newdate, setDate] = useState(new Date());
    const [mode, setMdoe] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, seletedDate) => {
        const currentDate = seletedDate || newdate;
        setShow(Platform.OS === 'ios');
        if(event.type == 'set') {
            setDate(currentDate);
        } else {
            return null
        }

        let temp = moment(seletedDate).format('MM/DD/YYYY')
        setDeadline(temp);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMdoe(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const onEdit = () => {
        const editData = {
            key: item[0],
            ID, 
            title: editTitle, 
            description: editDescription, 
            deadline: editDeadline,
            status
        };
        dispatch(editTask(editData)).then((res) => {
            dispatch(fetch(ID)).then((res) => {
                props.navigation.navigate('ToDoListScreen');
            })
        });
    };

    const calendarIonc = <Icon name="calendar" size={20} />

    return (
        <View>
            <ImageBackground source={require('../assets/images/glitter.jpg')} style={styles.backgroundImage}>
                <TouchableOpacity onPress={() => props.navigation.navigate('ToDoScreen')}>
                    <Icon name="chevron-left" size={25} color={'white'} style={styles.backIconStyle} />
                </TouchableOpacity>
                <Text style={styles.textStyle}>Edit Task</Text>
            </ImageBackground>
            <View style={styles.taskContainerStyle}>
                <Input
                    label="Title"
                    value={editTitle}
                    placeholder="title"
                    onChangeText={setTitle}
                />
                <Input
                    label="Description"
                    value={editDescription}
                    placeholder="description"
                    onChangeText={setDescription}
                />
                {show &&
                    (<DateTimePicker testID="dateTimePicker" mode={mode} value={newdate} is24Hour={true} onChange={onChange} />)
                }
                <Text style={styles.deadlineLabelStyle}>Deadline</Text>
                <TouchableOpacity onPress={showDatepicker}>
                    <View style={styles.deadlineInputStyle}>
                        <Text onChangeText={setDeadline}>{editDeadline}</Text>
                        <Icon name="calendar" size={20} style={styles.calendarIconStyle} />
                    </View>
                </TouchableOpacity>
                <View style={styles.btnContainerStyle}>
                    <Button text="Save" onPress={onEdit}/>
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
    backIconStyle: {
        marginTop: 10, 
        marginLeft: 10
    },
    deadlineLabelStyle: {
        color: '#423562',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 20,
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
    btnContainerStyle: {
        width: 100 * vw, 
        alignItems: 'center' 
    },
});
export default EditTaskScreen;