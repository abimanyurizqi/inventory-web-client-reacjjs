import {
    FIND_STOCK_REQUEST,
    FIND_STOCK_SUCCESS,
    FIND_STOCK_FAILURE,
    FIND_STOCKS_REQUEST,
    FIND_STOCKS_SUCCESS,
    FIND_STOCKS_FAILURE,
    DELETE_STOCK_SUCCESS,
    DELETE_STOCK_REQUEST,
    DELETE_STOCK_FAILURE,
    ADD_STOCK_SUCCESS,
    ADD_STOCK_REQUEST,
    ADD_STOCK_FAILURE,
    UPDATE_STOCK_SUCCESS,
    UPDATE_STOCK_REQUEST,
    UPDATE_STOCK_FAILURE,
    SUMMARY_STOCKS_REQUEST,
    SUMMARY_STOCKS_SUCCESS,
    SUMMARY_STOCKS_FAILURE,
} from "../actions/constants";

const defaultState = { data: null, loading: false, error: null }


export function deleteStockById(state = defaultState, action) {

    switch (action.type) {
        case DELETE_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_STOCK_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case DELETE_STOCK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function addStock(state = defaultState, action) {

    switch (action.type) {
        case ADD_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_STOCK_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case ADD_STOCK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function editStock(state = defaultState, action) {

    switch (action.type) {
        case UPDATE_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_STOCK_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case UPDATE_STOCK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}


export function findStockById(state = defaultState, action) {
    switch (action.type) {
        case FIND_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_STOCK_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_STOCK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function findStocks(state = defaultState, action) {
    switch (action.type) {
        case FIND_STOCKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_STOCKS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_STOCKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}


export function summaryStocks(state = defaultState, action) {
    switch (action.type) {
        case SUMMARY_STOCKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SUMMARY_STOCKS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case SUMMARY_STOCKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}
