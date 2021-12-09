import { REHYDRATE } from "redux-persist/es/constants";
import {SIGNIN, SIGNUP, SIGNOUT} from '../types'; 

const INITIAL_STATE = { user: null, uid:'', isSignedIn: false};

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case REHYDRATE:{
            return{
                ...state
            }
        }
        case SIGNIN:
            return {
                ...state,
                uid: action.payload, 
                isSignedIn: true
            }
        case SIGNUP:
            return {
                ...state,
                isSignedIn: true,
                uid: action.payload
            }
        case SIGNOUT:
            return {
                ...state, 
                uid: '',
                isSignedIn: false
            }
        default: 
            return state;
    }
};