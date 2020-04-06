import {
    FIND_STOCK_REQUEST, 
    FIND_STOCK_SUCCESS, 
    FIND_STOCK_FAILURE, 
    FIND_STOCKS_REQUEST, 
    FIND_STOCKS_SUCCESS, 
    FIND_STOCKS_FAILURE, 
    SUMMARY_STOCKS_REQUEST, 
    SUMMARY_STOCKS_SUCCESS, 
    SUMMARY_STOCKS_FAILURE, 
    DELETE_STOCK_REQUEST, 
    DELETE_STOCK_SUCCESS, 
    DELETE_STOCK_FAILURE,
    ADD_STOCK_REQUEST,
    ADD_STOCK_SUCCESS,
    ADD_STOCK_FAILURE,
    UPDATE_STOCK_REQUEST,
    UPDATE_STOCK_SUCCESS,
    UPDATE_STOCK_FAILURE
} from './constants';
import { commonAxios } from '../utils/apiUtil';
import Swal from 'sweetalert2';

function sleep(delay, value) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay, value);
    });
}

export const deleteById = (id) =>

    (dispatch) => {
        dispatch({ type: DELETE_STOCK_REQUEST });

        commonAxios.delete(`stocks/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(deleteStockSuccess(data));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(deleteStockFailure(error));
                Swal.fire(
                    'Ops!',
                    'Delete process went wrong.',
                    'error'
                )
            });
    };


export const findById = (id) =>
    (dispatch) => {

        dispatch({ type: FIND_STOCK_REQUEST });

        commonAxios.get(`stocks/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findStockSuccess(data));
            })
            .catch(error => {
                console.log(error)
                dispatch(findStockFailure(error));
            });
    };

export const add = (stock) =>
    (dispatch) => {

        dispatch({ type: ADD_STOCK_REQUEST });

        commonAxios.post(`stocks`,{itemId: stock.item.id, unitId:stock.unit.id,  quantity: stock.quantity} )
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(addStockSuccess(data));
                Swal.fire(
                    'Added!',
                    'Your file has been added.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(addStockFailure(error));
                Swal.fire(
                    'Ops!',
                    `Adding process went wrong.`,
                    'error'
                );
            });
    };

    export const edit = (stock) =>
    (dispatch) => {

        dispatch({ type: UPDATE_STOCK_REQUEST });

        commonAxios.put(`stocks/${stock.id}`, {itemId: stock.item.id, unitId:stock.unit.id,  quantity: stock.quantity} )
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(editStockSuccess(data));
                Swal.fire(
                    'Edited!',
                    'Your file has been edited.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(editStockFailure(error));
                Swal.fire(
                    'Ops!',
                    'Adding process went wrong.',
                    'error'
                );
            });
    };    



export const findAll = ({ search, sort = 'asc', page = 0, size = 10 } = {}) =>
    (dispatch) => {
        dispatch({
            type: FIND_STOCKS_REQUEST
        });
        commonAxios.get('stocks', {
            params: { ...search, sort, page, size }
        })
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findStocksSuccess(data));
            })
            .catch(error => {
                dispatch(findStocksFailure(error));
            });
    };

    export const summary = () =>
    (dispatch) => {
        dispatch({
            type: SUMMARY_STOCKS_REQUEST
        });
        commonAxios.get('stocks/summary')
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(summaryStocksSuccess(data));
            })
            .catch(error => {
                dispatch(summaryStocksFailure(error));
            });
    };

function findStockSuccess(data) {
    return {
        type: FIND_STOCK_SUCCESS,
        data: data
    }
}

function findStocksSuccess(data) {
    return {
        type: FIND_STOCKS_SUCCESS,
        data: data
    }
}

function summaryStocksSuccess(data) {
    return {
        type: SUMMARY_STOCKS_SUCCESS,
        data: data
    }
}

function summaryStocksFailure(error) {
    return {
        type: SUMMARY_STOCKS_FAILURE,
        error: error
    }
}

function findStockFailure(error) {
    return {
        type: FIND_STOCK_FAILURE,
        error: error
    }
}

function findStocksFailure(error) {
    return {
        type: FIND_STOCKS_FAILURE,
        error: error
    }
}

function deleteStockFailure(error) {
    return {
        type: DELETE_STOCK_FAILURE,
        error: error
    }
}

function deleteStockSuccess(data) {
    return {
        type: DELETE_STOCK_SUCCESS,
        data: data
    }
}

function addStockFailure(error) {
    return {
        type: ADD_STOCK_FAILURE,
        error: error
    }
}

function addStockSuccess(data) {
    return {
        type: ADD_STOCK_SUCCESS,
        data: data
    }
}

function editStockFailure(error) {
    return {
        type: UPDATE_STOCK_FAILURE,
        error: error
    }
}

function editStockSuccess(data) {
    return {
        type: UPDATE_STOCK_SUCCESS,
        data: data
    }
}





