import React from 'react';
import {connect, useSelector} from 'react-redux';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { vh, vw } from '../utils/units';
import TaskList from '../components/TaskList';
import moment from 'moment';

const ToDoListScreen = (props) => {
    const auth = useSelector((state) => state.auth);
    const state = useSelector((state) => state);
    console.log('statestatestatestate : ',state)
    const filterResultsByStatus = (status) => {
        return props.tasks.filter(item => {
            return item[1].ID === auth.uid && item[1].status === status;
        });
    };
    const isExpired = (item) => {
        if (item[1].status === 'pending') {
            return moment(item[1].deadline, "MM/DD/YYYY").isBefore(moment().format('MM/DD/YYYY'))
        }
        return false
    }
    const getPendingTasks= () => {
        const pendingTasks = filterResultsByStatus('pending')
        return pendingTasks.filter(item=>{
            return !isExpired(item)
        })
    }
    const getExpiredTasks = () => {
        const pendingTasks = filterResultsByStatus('pending')
        return pendingTasks.filter(item=>{
            return isExpired(item)
        })
    }
    return (
        <View>

            <ImageBackground source={require('../assets/images/glitter.jpg')} style={styles.backgroundImage}>
                <TouchableOpacity onPress={() => props.navigation.navigate('ToDoScreen')}>
                    <Icon name="chevron-left" size={25} color={'white'} style={styles.backIconStyle}/>
                </TouchableOpacity>
                <Text style={styles.headingStyle}>All</Text>
            </ImageBackground>

            <View style={styles.taskContainerStyle}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TaskList navigation={props.navigation} title="Late" results={getExpiredTasks()} />
                    <TaskList navigation={props.navigation} title="Assigned" results={getPendingTasks()} />
                    <TaskList navigation={props.navigation} title="Done" results={filterResultsByStatus('completed')} />
                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: 100 * vw,
        height: 30 * vh
    },
    headingStyle: {
        fontSize: 30,
        color: 'white',
        paddingLeft: 40,
        paddingTop: 30,
        fontFamily: 'Poppins-Bold'
    },
    subHeadingStyle: {
        fontSize: 18,
        color: 'white',
        paddingLeft: 40,
        fontFamily: 'Poppins-Bold'
    },
    taskContainerStyle: {
        backgroundColor: '#fdf5fc',
        height: 73 * vh,
        width: 100 * vw,
        bottom: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        alignItems: 'center'
    },
    backIconStyle: {
        marginTop: 10, 
        marginLeft: 10
    }
});

const mapStateToProp = (state) => {
    return{
        tasks: state.create.list
    };
};

export default connect(mapStateToProp)(ToDoListScreen);