import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ToastAndroid } from 'react-native';
import { vh, vw } from '../utils/units';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { deleteTask, doneTask, fetch } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const TaskDetailScreen = (props) => {
    const { item } = props.route.params;
    const { ID, title, description, deadline, status} = item[1];
    const create = useSelector((state) => state.create);
    const dispatch = useDispatch();
    const editIcon = <Icon name="edit" size={20} style={styles.editIconStyle} />
    const deleteIcon = <Icon name="trash-alt" size={20} style={styles.deleteIconStyle} />

    const onCompleteTask = () => {
        
        let data = {
            ID,
            key: item[0]
        }
        dispatch(doneTask(data)).then((res) => {
            dispatch(fetch(ID)).then((res) => {
                ToastAndroid.show("completed", ToastAndroid.SHORT);
                props.navigation.navigate('ToDoListScreen');
            });
        });
    }
    const onDeleteTask = () => {
        let deletData = {
            ID,
            key: item[0]
        }
        dispatch(deleteTask(deletData)).then((res) => {
            dispatch(fetch(ID)).then((res) => {
                props.navigation.navigate('ToDoScreen');
            })
        });
    }
    return (
        <View>

            <ImageBackground source={require('../assets/images/glitter.jpg')} style={styles.backgroundImage}>
                <View >

                    <TouchableOpacity onPress={() => props.navigation.navigate('ToDoListScreen')}>
                        <Icon name="chevron-left" size={25} color={'white'} style={styles.backIconStyle} />
                    </TouchableOpacity>

                </View>

                <View>
                    <Text style={styles.headingStyle}>{title}</Text>
                    <Text style={styles.subHeadingStyle}>{deadline}</Text>
                </View>
                {status === "pending" ? 
                <View style={styles.headerRightContainer}>
                    <View style={styles.iconStyle} >
                        <TouchableOpacity style={styles.checkIconContainer} onPress={onCompleteTask}>
                            <Icon name="check" color={'white'} size={30} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.checkIconTextstyle}>Mark as Completed</Text>
                </View>
                : <View></View>}

            </ImageBackground>

            <View style={styles.taskContainerStyle}>

                <View style={styles.taskContainerHeaderStyle}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('EditTaskScreen', {
                        // ID,
                        // status,
                        // key: item[0]
                        item: item
                    })}>
                        {editIcon}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onDeleteTask}>
                        {deleteIcon}
                    </TouchableOpacity>
                </View>

                <Text style={styles.taskContainerHeadingStyle}>Description </Text>
                <Text style={styles.taskContainerTextStyle}>{description}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: 100 * vw,
        height: 40 * vh,
        flexDirection: 'row'
    },
    taskContainerStyle: {
        backgroundColor: '#fdf5fc',
        height: 63 * vh,
        width: 100 * vw,
        bottom: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 40,
        alignItems: 'center'
    },
    backIconStyle: {
        marginTop: 10,
        marginLeft: 10
    },
    headingStyle: {
        width: 60 * vw,
        height: 18 * vh,
        fontSize: 25,
        color: 'white',
        paddingTop: 35,
        fontFamily: 'Poppins-Bold',
        marginTop: 50
    },
    subHeadingStyle: {
        width: 60 * vw,
        height: 8 * vh,
        fontSize: 15,
        color: 'white',
        paddingTop: 8,
        fontFamily: 'Poppins-Bold'
    },
    checkIconContainer: {
        backgroundColor: '#fe8cbb',
        height: vw * 15,
        width: vw * 15,
        borderRadius: (vw * 15) / 2,
        alignItems: 'center',
        justifyContent: "center",
    },
    checkIconTextstyle: {
        height: 60,
        width: 40 * vw,
        paddingTop: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    taskContainerHeaderStyle: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end'
    },
    taskContainerHeadingStyle: {
        color: '#423562',
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        marginRight: 50 * vw,
        marginTop: 2 * vh
    },
    taskContainerTextStyle: {
        color: '#928a91',
        fontSize: 15,
        marginRight: 73 * vw,
        marginTop: 3 * vh
    },
    editIconStyle: {
        marginRight: '5%'
    },
    deleteIconStyle: {
        marginRight: '5%'
    },
    headerRightContainer: {
        width: 40 * vw,
        height: 26 * vh,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: "center"
    }
});

export default TaskDetailScreen;