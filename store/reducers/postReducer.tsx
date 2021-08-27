import * as types  from '../types'

const initilalState = {
    posts: []
}

export const postReducer = (state=initilalState, action:{payload:{},type:string} )=> {
    switch(action.type){
        case types.GET_POSTS: 
            return {
                ...state,
                posts: action.payload,
            }
        default:
            return state
    }
}