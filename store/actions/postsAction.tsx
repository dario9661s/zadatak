import * as types from "../types"
import {Dispatch} from "redux";

interface Action  {
    type: string, 
    payload: []
}


export const setPosts = (amount: []) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: types.GET_POSTS,
            payload: amount
        })
    }
}
