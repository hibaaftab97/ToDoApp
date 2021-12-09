import React, {useEffect} from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { signout, fetch } from '../redux/actions';
import { View, Text, StatusBar, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { vh, vw } from '../utils/units';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TaskList from '../components/TaskList';
import moment from 'moment';

const ToDoScreen = (props) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const date = moment().utc().format('LL');
    const isExpired = (item) => {
        if (item[1].status === 'pending') {
            return moment(item[1].deadline, "MM/DD/YYYY").isBefore(moment().format('MM/DD/YYYY'))
        }
        return false
    }
    const isDue = (item) => {
        if (item[1].status === 'pending') {
            return moment(item[1].deadline, "MM/DD/YYYY").isSame(moment().format('MM/DD/YYYY'))
        }
        return false
    }
    const filterResultsByStatus = () => {
        return props.tasks.filter(item => {
            return item[1].ID === auth.uid && item[1].status === 'pending' && isDue(item) && !isExpired(item);
        });
    };

    const logOut = () => {
        dispatch(signout())
    }

    return (
        <View>

            <StatusBar
                barStyle='dark-content'
                backgroundColor={'white'}
            />

            <ImageBackground source={require('../assets/images/glitter.jpg')} style={styles.backgroundImage}>
                <Text style={styles.headingTextStyle}>{"Today, \n"} {date}</Text>
            </ImageBackground>

            <View style={styles.taskContainerStyle}>

                <View style={styles.taskContainerHeader}>
                    <TouchableOpacity onPress={logOut}>
                        <Text style={styles.signOutStyle}>Sign Out</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerMainHeading}>Today</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ToDoListScreen')}>
                        <Text style={styles.headerSideHeading}>View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <TaskList navigation={props.navigation} results={filterResultsByStatus()} />
                </ScrollView>

                <View style={styles.btnContainer} >
                    <TouchableOpacity onPress={() => props.navigation.navigate('CreateTaskScreen')} style={styles.iconContainerStyle}>
                        <Icon name="plus" size={30} color={'white'} />
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: 100 * vw,
        height: 40 * vh,
    },
    signOutStyle: {
        color: '#423562', 
        fontFamily: 'Poppins-Bold', 
        fontSize: 18, 
        marginRight: '15%'
    },
    headingTextStyle: {
        fontSize: 30,
        color: 'white',
        paddingLeft: 40,
        paddingTop: 80,
        fontFamily: 'Poppins-Bold'
    },
    taskContainerStyle: {
        backgroundColor: '#fdf5fc',
        height: 63 * vh,
        width: 100 * vw,
        bottom: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 40,
        alignItems: 'center'
    },
    taskContainerHeader:{
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'flex-end'
    },
    headerMainHeading: {
        color: '#423562', 
        fontFamily: 'Poppins-Bold', 
        fontSize: 18, 
        marginRight: '15%'
    },
    headerSideHeading: {
        color: '#423562', 
        fontFamily: 'Poppins-Bold', 
        fontSize: 18, 
        marginRight: '10%'
    },
    btnContainer: {
        height: vh * 12.5,
        justifyContent: "center",
        position: 'absolute',
        bottom: 0
    },
    iconContainerStyle: {
        backgroundColor: '#9b6dfd',
        height: vw * 15,
        width: vw * 15,
        borderRadius: (vw * 15) / 2,
        alignItems: 'center',
        justifyContent: "center"
    }
});

const mapStateToProp = (state) => {
    return {
        tasks: state.create.list
    };
};
export default connect(mapStateToProp)(ToDoScreen);