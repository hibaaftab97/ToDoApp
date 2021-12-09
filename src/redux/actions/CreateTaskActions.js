import database from '@react-native-firebase/database';
import { CREATE, DONE, EDIT, DELETE } from '../types';

export const createTask = (createTodo) => {
    return async dispatch => {
        const {ID} = createTodo
        return database()
            .ref(`tasks/${ID}`)
            .push(createTodo)
            .then((res) =>{
            }).catch((error) => {
        })
    }
};

export const fetch = (ID) => {
    return async dispatch => {
        return database().ref(`tasks/${ID}`).on('value', snapshot =>{
            if(snapshot.val() === null)
            {
                dispatch({type: 'fetch', payload: []})
            } else {
                const a = Object.entries(snapshot.val());
                dispatch({type: 'fetch', payload: a})
            }
        })
    }
}

export const doneTask = (data) => {

    return async dispatch => {
        const {ID, key} = data;
        return database()
            .ref(`tasks/${ID}/${key}`)
            .update({status: "completed"})
            .then((res) => {
                
                //dispatch({ type: DONE, payload: ID });
            }).catch((error) => {
                
        })
    }
};

export const editTask = (editData) => {

    return async dispatch => {
        const { key, ID } = editData;
        return database()
            .ref(`tasks/${ID}/${key}`)
            .update(editData)
            .then((res) => {
            }).catch ((error) => {
        });
    }
};

export const deleteTask = (deletData) => {

    return async dispatch => {
        const {ID, key} = deletData;
        try {
            await database()
                .ref(`tasks/${ID}/${key}`)
                .remove()    
        } catch (e) {
            console.log(e);
        }
    }
};