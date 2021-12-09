import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);