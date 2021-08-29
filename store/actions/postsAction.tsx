import * as types from "../types"
import {Dispatch} from "redux";

interface Action  {
    type: string, 
    payload: []
}

interface Login  {
    type: string, 
    payload: boolean
}

interface NewPost  {
    type: string, 
    payload: boolean
}



export const setPosts = (amount: []) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: types.GET_POSTS,
            payload: amount
        })
    }
}

export const setLogin = (amount: boolean) => {
    return (dispatch: Dispatch<Login>) => {
        dispatch({
            type: types.SET_LOGIN,
            payload: amount
        })
    }
}

export const newPost = (amount: boolean) => {
    return (dispatch: Dispatch<NewPost>) => {
        console.log(amount);
        
        dispatch({
            type: types.NEW_POST,
            payload: amount
        })
    }
}


