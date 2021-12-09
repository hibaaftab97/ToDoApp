import {CREATE, GET, DONE, EDIT, DELETE} from '../types';

const INITIAL_STATE = {list:[], isSignedIn: false, key:[]};

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        // case CREATE:
        //     return {...state, list: [...state.list, action.payload]};
        case CREATE:
            return {...state, key: [...state.key, action.payload]}
        case 'fetch':
            return{...state, isSignedIn: true, list: action.payload}    
        case DONE:
            let array=state.list;
            let index = array.findIndex((item)=> item.ID===action.payload);
            array[index].status = "completed";
            //state.list[index].status="completed";
            return {...state, list: [array]};

        case EDIT:
            const editArray=state.list;
            const editIndex=editArray.findIndex((todo)=>todo.ID===action.payload.ID);
            state.list[editIndex].title=action.payload.title;
            state.list[editIndex].description=action.payload.description;
            state.list[editIndex].deadline=action.payload.deadline;
            state.list[editIndex].status=action.payload.status;
            return {...state, list:[...state.list]};
            
        case DELETE:
            state.list = state.list.filter((item) => item.ID != action.payload);
            return {...state, list:[...state.list]};
            
        default:
            return state;
    }
};