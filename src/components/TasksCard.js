import moment from 'moment';
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { vh, vw } from '../utils/units';


const TasksCard = (props) => {
    const { id, title, description, deadline, status } =  props.item[1];

    const isExpired = () => {
        if (status === 'pending') {
            return moment(deadline, "MM/DD/YYYY").isBefore(moment().format('MM/DD/YYYY'))
        }
        return false
    }
    const statusColor = () => {

        switch (status) {
            case 'pending': {
                if (isExpired()) {
                    return styles.statusExpiredgStyle;
                }
                else {
                    return styles.statusPendingStyle;
                }
            }
            case 'completed':
                return styles.statusCompletedStyle;
        }
    };

    return (
        <View style={styles.itemStyle}>

            <View style={styles.itemLeftColumnStyle}>

                <Text style={styles.taskNameStyle} >{title}</Text>

                <Text style={styles.descriptionStyle} >{description}</Text>

            </View>

            <View style={styles.itemRightColumnStyle}>

                <Text style={styles.dateStyle}>{deadline}</Text>

                <View style={[styles.statusContainerStyle, statusColor()]}>

                    <Text style={statusColor()}>{isExpired() ? 'Expired' : status}</Text>
                </View>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    itemStyle: {
        backgroundColor: 'white',
        height: 100,
        width: 330,
        marginVertical: 5,
        top: 20,
        paddingTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 15
    },
    itemLeftColumnStyle: {
        width: 200,
        height: 70
    },
    taskNameStyle: {
        fontFamily: 'Poppins-Bold',
        color: '#423562'
    },
    descriptionStyle: {
        fontFamily: 'Poppins-Bold',
        color: '#dcdbe0'
    },
    dateStyle: {
        color: '#cfcdd4'
    },
    itemRightColumnStyle: {
        paddingRight: 20,
        height: 70,
        width: 110,
        alignItems: 'center'
    },
    statusContainerStyle: {
        backgroundColor: '#ffd9ff',
        height: vh * 4,
        width: vw * 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    statusPendingStyle: {
        color: '#f286ef',
        backgroundColor: '#ffd9ff',
    },
    statusExpiredgStyle: {
        color: '#ffa985',
        backgroundColor: '#ffd3c1',
    },
    statusCompletedStyle: {
        color: '#4bd97e',
        backgroundColor: '#c5ffda',
    }
});

export default TasksCard;