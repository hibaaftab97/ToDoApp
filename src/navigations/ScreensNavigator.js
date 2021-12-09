import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoScreen from '../screens/ToDoScreen';
import ToDoListScreen from '../screens/ToDoListScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import EditTaskScreen from '../screens/EditTaskScreen';

const ScreensStack = createStackNavigator();

const ScreenNavigator = () => {
  return(
    <ScreensStack.Navigator>
        <ScreensStack.Screen name="ToDoScreen" component={ToDoScreen} options={{headerShown: false}}/>
        <ScreensStack.Screen name="ToDoListScreen" component={ToDoListScreen} options={{headerShown: false}}/>
        <ScreensStack.Screen name="TaskDetailScreen" component={TaskDetailScreen} options={{headerShown: false}} />
        <ScreensStack.Screen name="CreateTaskScreen" component={CreateTaskScreen} options={{headerShown: false}}/>
        <ScreensStack.Screen name="EditTaskScreen" component={EditTaskScreen} options={{headerShown: false}} />
    </ScreensStack.Navigator>
  )
};

export default ScreenNavigator;