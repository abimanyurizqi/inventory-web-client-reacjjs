import {
    FIND_TRANSACTION_REQUEST,
    FIND_TRANSACTION_SUCCESS,
    FIND_TRANSACTION_FAILURE,
    FIND_TRANSACTIONS_REQUEST,
    FIND_TRANSACTIONS_SUCCESS,
    FIND_TRANSACTIONS_FAILURE,
    DELETE_TRANSACTION_REQUEST,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_FAILURE,
    ADD_TRANSACTION_REQUEST,
    ADD_TRANSACTION_SUCCESS,
    ADD_TRANSACTION_FAILURE,
    UPDATE_TRANSACTION_REQUEST,
    UPDATE_TRANSACTION_SUCCESS,
    UPDATE_TRANSACTION_FAILURE,
    SUMMARY_TRANSACTIONS_REQUEST,
    SUMMARY_TRANSACTIONS_FAILURE,
    SUMMARY_TRANSACTIONS_SUCCESS
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
        dispatch({ type: DELETE_TRANSACTION_REQUEST });

        commonAxios.delete(`transactions/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(deleteTransactionSuccess(data));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(deleteTransactionFailure(error));
                Swal.fire(
                    'Ops!',
                    'Delete process went wrong.',
                    'error'
                )
            });
    };


export const findById = (id) =>
    (dispatch) => {

        dispatch({ type: FIND_TRANSACTION_REQUEST });

        commonAxios.get(`transactions/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findTransactionSuccess(data));
            })
            .catch(error => {
                console.log(error)
                dispatch(findTransactionFailure(error));
            });
    };

export const add = ({typeTransaction, amount, description}) =>
    (dispatch) => {

        dispatch({ type: ADD_TRANSACTION_REQUEST });

        commonAxios.post(`transactions`, {typeTransaction: typeTransaction
        , amount: amount, description: description})
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(addTransactionSuccess(data));

            })
            .catch(error => {
                console.log(error)
                dispatch(addTransactionFailure(error));

            });
    };

export const edit = ({id, typeTransaction, amount, description}) =>
    (dispatch) => {

        dispatch({ type: UPDATE_TRANSACTION_REQUEST });

        commonAxios.put(`transactions/${id}`, {typeTransaction: typeTransaction, amount: amount, description: description})
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(editTransactionSuccess(data));

            })
            .catch(error => {
                console.log(error)
                dispatch(editTransactionFailure(error));

            });
    };



export const findAll = ({ search, sort = 'asc', page = 0, size = 10 } = {}) =>
    (dispatch) => {
        dispatch({
            type: FIND_TRANSACTIONS_REQUEST
        });
        commonAxios.get('transactions', {
            params: { ...search, sort, page, size }
        })
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findTransactionsSuccess(data));
            })
            .catch(error => {
                dispatch(findTransactionsFailure(error));
            });
    };

    export const summary = ({year, month, date } = {}) =>
    (dispatch) => {
        dispatch({
            type: SUMMARY_TRANSACTIONS_REQUEST
        });
        commonAxios.get('transactions/summary',
        {params: { year, month, date }}
        )
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(summaryTransactionsSuccess(data));
            })
            .catch(error => {
                dispatch(summaryTransactionsFailure(error));
            });
    };

function findTransactionSuccess(data) {
    return {
        type: FIND_TRANSACTION_SUCCESS,
        data: data
    }
}

function findTransactionsSuccess(data) {
    return {
        type: FIND_TRANSACTIONS_SUCCESS,
        data: data
    }
}

function findTransactionFailure(error) {
    return {
        type: FIND_TRANSACTION_FAILURE,
        error: error
    }
}

function findTransactionsFailure(error) {
    return {
        type: FIND_TRANSACTIONS_FAILURE,
        error: error
    }
}

function deleteTransactionFailure(error) {
    return {
        type: DELETE_TRANSACTION_FAILURE,
        error: error
    }
}

function deleteTransactionSuccess(data) {
    return {
        type: DELETE_TRANSACTION_SUCCESS,
        data: data
    }
}

function addTransactionFailure(error) {
    return {
        type: ADD_TRANSACTION_FAILURE,
        error: error
    }
}

function addTransactionSuccess(data) {
    return {
        type: ADD_TRANSACTION_SUCCESS,
        data: data
    }
}

function editTransactionFailure(error) {
    return {
        type: UPDATE_TRANSACTION_FAILURE,
        error: error
    }
}

function editTransactionSuccess(data) {
    return {
        type: UPDATE_TRANSACTION_SUCCESS,
        data: data
    }
}

function summaryTransactionsFailure(error) {
    return {
        type: SUMMARY_TRANSACTIONS_FAILURE,
        error: error
    }
}

function summaryTransactionsSuccess(data) {
    return {
        type: SUMMARY_TRANSACTIONS_SUCCESS,
        data: data
    }
}





