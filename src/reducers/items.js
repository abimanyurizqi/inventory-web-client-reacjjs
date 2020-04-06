import {
    FIND_ITEM_REQUEST,
    FIND_ITEM_SUCCESS,
    FIND_ITEM_FAILURE,
    FIND_ITEMS_REQUEST,
    FIND_ITEMS_SUCCESS,
    FIND_ITEMS_FAILURE,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_FAILURE,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_REQUEST,
    ADD_ITEM_FAILURE,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_FAILURE
} from "../actions/constants";

const defaultState = { data: null, loading: false, error: null }


export function deleteItemById(state = defaultState, action) {

    switch (action.type) {
        case DELETE_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_ITEM_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case DELETE_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function addItem(state = defaultState, action) {

    switch (action.type) {
        case ADD_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_ITEM_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case ADD_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function editItem(state = defaultState, action) {

    switch (action.type) {
        case UPDATE_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_ITEM_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case UPDATE_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}


export function findItemById(state = defaultState, action) {
    switch (action.type) {
        case FIND_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_ITEM_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function findItems(state = defaultState, action) {
    switch (action.type) {
        case FIND_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_ITEMS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}
