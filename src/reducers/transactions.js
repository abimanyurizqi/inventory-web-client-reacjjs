import {
    FIND_TRANSACTION_REQUEST,
    FIND_TRANSACTION_SUCCESS,
    FIND_TRANSACTION_FAILURE,
    FIND_TRANSACTIONS_REQUEST,
    FIND_TRANSACTIONS_SUCCESS,
    FIND_TRANSACTIONS_FAILURE,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_REQUEST,
    DELETE_TRANSACTION_FAILURE,
    ADD_TRANSACTION_SUCCESS,
    ADD_TRANSACTION_REQUEST,
    ADD_TRANSACTION_FAILURE,
    UPDATE_TRANSACTION_SUCCESS,
    UPDATE_TRANSACTION_REQUEST,
    UPDATE_TRANSACTION_FAILURE
} from "../actions/constants";

const defaultState = { data: null, loading: false, error: null }


export function deleteTransactionById(state = defaultState, action) {

    switch (action.type) {
        case DELETE_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_TRANSACTION_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case DELETE_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function addTransaction(state = defaultState, action) {

    switch (action.type) {
        case ADD_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_TRANSACTION_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case ADD_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function editTransaction(state = defaultState, action) {

    switch (action.type) {
        case UPDATE_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_TRANSACTION_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case UPDATE_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}


export function findTransactionById(state = defaultState, action) {
    switch (action.type) {
        case FIND_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_TRANSACTION_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function findTransactions(state = defaultState, action) {
    switch (action.type) {
        case FIND_TRANSACTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_TRANSACTIONS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_TRANSACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}
