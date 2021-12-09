import { ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import { SIGNIN, SIGNUP, SIGNOUT} from '../types';
import { fetch } from './CreateTaskActions';

export const signin = (loginCredentials) => {
    return async (dispatch) => {
        return auth().signInWithEmailAndPassword(loginCredentials.email, loginCredentials.password).then(response => {
            const {uid} = response.user;
            ToastAndroid.show("Sign in Successfully", ToastAndroid.SHORT)
            dispatch({ type: SIGNIN, payload: uid});
            dispatch(fetch(uid));
            return Promise.resolve('sign in ressolve');
        }).catch((error) => {
            if (error.code === 'auth/invalid-email') {
                ToastAndroid.show("That email address is invalid!", ToastAndroid.SHORT);
            }
            else if(error.code === 'auth/wrong-password') {
                ToastAndroid.show("Password in invalid", ToastAndroid.SHORT)
            }
            else if(error.code === 'auth/user-not-found') {
                ToastAndroid.show("User is not registered", ToastAndroid.SHORT)
            }
            return Promise.reject('sign in reject');
        });
    };
};
export const signup = (registrationData) => {
    return async (dispatch) => {
        return auth().createUserWithEmailAndPassword(registrationData.email, registrationData.password).then((response) => {
            console.log('res', );
            const {uid} = response.user;
            ToastAndroid.show("Sign up successfully", ToastAndroid.SHORT);
            dispatch({ type: SIGNUP, payload:uid});
            return Promise.ressolve('Sign up ressolve');
        }).catch((error) => {
            if(error.code === 'auth/email-already-in-use') {
                ToastAndroid.show("Email address is already in use!", ToastAndroid.SHORT);
                return Promise.reject('Sign up reject');
            }
            else if (error.code === 'auth/invalid-email') {
                ToastAndroid.show("That email address is invalid!", ToastAndroid.SHORT);
                return Promise.reject('Sign up reject');
            }
            else if (error.code === 'auth/weak-password') {
                ToastAndroid.show("Password should be atleast 6 characters long!", ToastAndroid.SHORT);
                return Promise.reject('Sign up reject');
            }
        });
    };
};

export const signout = () => {
    return async (dispatch) => {
        auth().signOut().then((res) => {
            dispatch({ type: SIGNOUT});
            ToastAndroid.show("Sign Out successfully", ToastAndroid.SHORT);
        }).catch((error) => {
            ToastAndroid.show("Sign Out Failed", ToastAndroid.SHORT);
        })
    }
};