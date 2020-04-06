import {
    FIND_ITEM_REQUEST,
    FIND_ITEM_SUCCESS,
    FIND_ITEM_FAILURE,
    FIND_ITEM_IMAGE_REQUEST,
    FIND_ITEM_IMAGE_SUCCESS,
    FIND_ITEM_IMAGE_FAILURE,
    FIND_ITEMS_REQUEST,
    FIND_ITEMS_SUCCESS,
    FIND_ITEMS_FAILURE,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
    UPLOAD_ITEM_IMAGE_REQUEST,
    UPLOAD_ITEM_IMAGE_SUCCESS,
    UPLOAD_ITEM_IMAGE_FAILURE
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
        dispatch({ type: DELETE_ITEM_REQUEST });

        commonAxios.delete(`items/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(deleteItemSuccess(data));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            })
            .catch(error => {
                console.log(error)
                dispatch(deleteItemFailure(error));
                Swal.fire(
                    'Ops!',
                    'Delete process went wrong.',
                    'error'
                )
            });
    };


export const findById = (id) =>
    (dispatch) => {

        dispatch({ type: FIND_ITEM_REQUEST });

        commonAxios.get(`items/${id}`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findItemSuccess(data));
            })
            .catch(error => {
                console.log(error)
                dispatch(findItemFailure(error));
            });
    };

export const findImage = (id) =>
    (dispatch) => {

        dispatch({ type: FIND_ITEM_IMAGE_REQUEST });

        commonAxios.get(`items/${id}/images`)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findItemImageSuccess(data));
            })
            .catch(error => {
                console.log(error)
                dispatch(findItemImageFailure(error));
            });
    };

    export const uploadImage = (id,image) =>
    (dispatch) => {

        dispatch({ type: UPLOAD_ITEM_IMAGE_REQUEST });
        
        const fd = new FormData();
        fd.append("image", image);
        commonAxios.post(`items/${id}/images`, fd, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(uploadItemImageSuccess(data));
            })
            .catch(error => {
                console.log(error)
                dispatch(uploadItemImageFailure(error));
            });
    };

export const add = (item) =>
    (dispatch) => {

        dispatch({ type: ADD_ITEM_REQUEST });

        commonAxios.post(`items`, item)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(addItemSuccess(data));

            })
            .catch(error => {
                console.log(error)
                dispatch(addItemFailure(error));

            });
    };

export const edit = (item) =>
    (dispatch) => {

        dispatch({ type: UPDATE_ITEM_REQUEST });

        commonAxios.put(`items/${item.id}`, item)
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(editItemSuccess(data));

            })
            .catch(error => {
                console.log(error)
                dispatch(editItemFailure(error));

            });
    };



export const findAll = ({ search, sort = 'asc', page = 0, size = 10 } = {}) =>
    (dispatch) => {
        dispatch({
            type: FIND_ITEMS_REQUEST
        });
        commonAxios.get('items', {
            params: { ...search, sort, page, size }
        })
            .then(data => sleep(1000, data))
            .then(data => {
                dispatch(findItemsSuccess(data));
            })
            .catch(error => {
                dispatch(findItemsFailure(error));
            });
    };

function findItemSuccess(data) {
    return {
        type: FIND_ITEM_SUCCESS,
        data: data
    }
}

function findItemImageSuccess(data) {
    return {
        type: FIND_ITEM_IMAGE_SUCCESS,
        data: data[0]
    }
}

function findItemsSuccess(data) {
    return {
        type: FIND_ITEMS_SUCCESS,
        data: data
    }
}

function findItemFailure(error) {
    return {
        type: FIND_ITEM_FAILURE,
        error: error
    }
}

function findItemImageFailure(error) {
    return {
        type: FIND_ITEM_IMAGE_FAILURE,
        error: error
    }
}

function findItemsFailure(error) {
    return {
        type: FIND_ITEMS_FAILURE,
        error: error
    }
}

function deleteItemFailure(error) {
    return {
        type: DELETE_ITEM_FAILURE,
        error: error
    }
}

function deleteItemSuccess(data) {
    return {
        type: DELETE_ITEM_SUCCESS,
        data: data
    }
}

function addItemFailure(error) {
    return {
        type: ADD_ITEM_FAILURE,
        error: error
    }
}

function addItemSuccess(data) {
    return {
        type: ADD_ITEM_SUCCESS,
        data: data
    }
}

function editItemFailure(error) {
    return {
        type: UPDATE_ITEM_FAILURE,
        error: error
    }
}

function editItemSuccess(data) {
    return {
        type: UPDATE_ITEM_SUCCESS,
        data: data
    }
}

function uploadItemImageFailure(error) {
    return {
        type: UPLOAD_ITEM_IMAGE_FAILURE,
        error: error
    }
}

function uploadItemImageSuccess(data) {
    return {
        type: UPLOAD_ITEM_IMAGE_SUCCESS,
        data: data.data
    }
}





