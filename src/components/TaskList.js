import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TasksCard from './TasksCard';

const TaskList = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{props.title}</Text>
            {props.results.length === 0 ? <Text style={styles.emptyListText}>No tasks</Text> :
                props.results.map((item, key) => {
                    return (
                        <View key={key}>
                                <TouchableOpacity onPress={() => {
                                    props.navigation.navigate('TaskDetailScreen', { item: item })
                                }}
                                >
                                    <TasksCard item={item}/>
                                </TouchableOpacity>
                        </View>
                    );
                })
            }
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20
    },
    titleStyle: {
        fontSize: 15,
        color: '#423562',
        fontFamily: 'Poppins-Bold',
        marginTop: 40
    },
    emptyListText: {
        fontSize: 13,
        color: '#423562',
        fontFamily: 'Poppins-Bold',
    }
});

export default TaskList;