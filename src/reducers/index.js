import {combineReducers} from 'redux';
import {findItemById, findItems, deleteItemById, addItem, editItem} from './items';
import {findUnitById, findUnits, deleteUnitById, addUnit, editUnit} from './units';

export default combineReducers({
    deleteItemById,
    findItemById,
    findItems,
    addItem,
    editItem,
    
    deleteUnitById,
    findUnitById,
    findUnits,
    addUnit,
    editUnit,

});