import * as types  from '../types'

const initilalState = {
    posts: [],
    logedIn:false,
    newPost: false
}

export const postReducer = (state=initilalState, action:{payload:{},type:string | boolean} )=> {
    switch(action.type){
        case types.GET_POSTS: 
            return {
                ...state,
                posts: action.payload,
            }
            case types.SET_LOGIN: 
            return {
                ...state,
                logedIn: action.payload,
            }
            case types.NEW_POST: 
            return {
                ...state,
                newPost: action.payload,
            }
        default:
            return state
    }
}