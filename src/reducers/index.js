import { combineReducers } from 'redux';
import { findItemById, findItems, deleteItemById, addItem, editItem , findItemImage, uploadItemImage} from './items';
import { findUnitById, findUnits, deleteUnitById, addUnit, editUnit } from './units';
import {
    deleteStockById,
    findStockById,
    findStocks,
    addStock,
    editStock,
    summaryStocks
} from './stocks';

import {
    deleteTransactionById,
    findTransactionById,
    findTransactions,
    addTransaction,
    editTransaction,
} from './transactions'


export default combineReducers({
    deleteItemById,
    findItemById,
    findItems,
    addItem,
    editItem,
    findItemImage,
    uploadItemImage,

    deleteUnitById,
    findUnitById,
    findUnits,
    addUnit,
    editUnit,

    deleteStockById,
    findStockById,
    findStocks,
    addStock,
    editStock,
    summaryStocks,

    deleteTransactionById,
    findTransactionById,
    findTransactions,
    addTransaction,
    editTransaction,


});