import {
    FIND_UNITS_SUCCESS,
    FIND_UNITS_REQUEST,
    FIND_UNITS_FAILURE,
    FIND_UNIT_REQUEST,
    FIND_UNIT_SUCCESS,
    FIND_UNIT_FAILURE,
    DELETE_UNIT_REQUEST,
    DELETE_UNIT_FAILURE,
    DELETE_UNIT_SUCCESS,
    UPDATE_UNIT_REQUEST,
    UPDATE_UNIT_SUCCESS,
    UPDATE_UNIT_FAILURE,
    ADD_UNIT_REQUEST,
    ADD_UNIT_SUCCESS,
    ADD_UNIT_FAILURE
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
        dispatch({ type: DELETE_UNIT_REQUEST });

        commonAxios.delete(`units/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(deleteUnitSuccess(data));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(deleteUnitFailure(error));
                Swal.fire(
                    'Ops!',
                    'Delete process went wrong.',
                    'error'
                )
            });
    };


export const findById = (id) =>
    (dispatch) => {

        dispatch({ type: FIND_UNIT_REQUEST });

        commonAxios.get(`units/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findUnitSuccess(data));
            })
            .catch(error => {
                console.log(error)
                dispatch(findUnitFailure(error));
            });
    };

export const add = ({name, description}) =>
    (dispatch) => {

        dispatch({ type: ADD_UNIT_REQUEST });

        commonAxios.post(`units`, {name: name, description: description})
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(addUnitSuccess(data));
                Swal.fire(
                    'Added!',
                    'Your file has been added.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(addUnitFailure(error));
                Swal.fire(
                    'Ops!',
                    `Adding process went wrong.`,
                    'error'
                );
            });
    };

export const edit = ({id, name, description}) =>
    (dispatch) => {

        dispatch({ type: UPDATE_UNIT_REQUEST });

        commonAxios.put(`units/${id}`, {name: name, description:description})
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(editUnitSuccess(data));
                Swal.fire(
                    'Edited!',
                    'Your file has been edited.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(editUnitFailure(error));
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
            type: FIND_UNITS_REQUEST
        });
        commonAxios.get('units', {
            params: { ...search, sort, page, size }
        })
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findUnitsSuccess(data));
            })
            .catch(error => {
                dispatch(findUnitsFailure(error));
            });
    };

function findUnitSuccess(data) {
    return {
        type: FIND_UNIT_SUCCESS,
        data: data
    }
}

function findUnitsSuccess(data) {
    return {
        type: FIND_UNITS_SUCCESS,
        data: data
    }
}

function findUnitFailure(error) {
    return {
        type: FIND_UNIT_FAILURE,
        error: error
    }
}

function findUnitsFailure(error) {
    return {
        type: FIND_UNITS_FAILURE,
        error: error
    }
}

function deleteUnitFailure(error) {
    return {
        type: DELETE_UNIT_FAILURE,
        error: error
    }
}

function deleteUnitSuccess(data) {
    return {
        type: DELETE_UNIT_SUCCESS,
        data: data
    }
}

function addUnitFailure(error) {
    return {
        type: ADD_UNIT_FAILURE,
        error: error
    }
}

function addUnitSuccess(data) {
    return {
        type: ADD_UNIT_SUCCESS,
        data: data
    }
}

function editUnitFailure(error) {
    return {
        type: UPDATE_UNIT_FAILURE,
        error: error
    }
}

function editUnitSuccess(data) {
    return {
        type: UPDATE_UNIT_SUCCESS,
        data: data
    }
}





