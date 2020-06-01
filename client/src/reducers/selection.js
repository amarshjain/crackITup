import {ADD_LIST, GET_LIST, DELETE_LIST, GET_LISTS} from '../actions/types'

const initialState = {
    selections: [],
    selection: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {

    const {type, payload} = action;

    switch(type) {

        case GET_LIST:
            return {
                ...state,
                selection: payload,
                loading: false
            }

        case GET_LISTS:
            return {
                ...state,
                selections: payload,
                loading: false
            }

        case ADD_LIST:
            return {
                ...state,
                selections: [payload, ...state.selections],
                loading: false
            }

        case DELETE_LIST:
            return {
                ...state,
                selections: state.selections.filter(selection => selection._id != payload),
                loading: false
            }

        default:
            return state;

    }

}