import axios from 'axios'
import {setAlert} from './alert';
import {
    GET_LIST,
    GET_LISTS,
    ADD_LIST,
    DELETE_LIST,
    LIST_ERROR
} from './types'

// Get selection lists
export const getLists = () => async dispatch => {
    try {
        const res = await axios.get('/api/selection');
        dispatch({
            type: GET_LISTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LIST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Get selection list by ID
export const getList = id => async dispatch => {
    try {
        const res = await axios.get(`/api/selection/${id}`);
        dispatch({
            type: GET_LIST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LIST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Add a selection List
export const addList = (examId, {cutoff}) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post(`/api/selection/${examId}`, {cutoff}, config);
        dispatch({
            type: ADD_LIST,
            payload: res.data
        });

        dispatch(setAlert('Selection List Published', 'success'))

    } catch (err) {
        dispatch({
            type: LIST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Delete a selection List
export const deleteList = id => async dispatch => {
    try {
        
        await axios.delete(`/api/selection/${id}`);
        dispatch({
            type: DELETE_LIST,
            payload: id
        });

        dispatch(setAlert('Selection List Removed', 'success')); 

    } catch (err) {
        dispatch({
            type: LIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}