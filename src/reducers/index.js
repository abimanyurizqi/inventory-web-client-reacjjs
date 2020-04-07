import { combineReducers } from 'redux';
import { findItemById, findItems, deleteItemById, addItem, editItem , findItemImage, uploadItemImage, deleteItemImage} from './items';
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
    summaryTransactions
} from './transactions'


export default combineReducers({
    deleteItemById,
    findItemById,
    findItems,
    addItem,
    editItem,
    findItemImage,
    uploadItemImage,
    deleteItemImage,

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
    summaryTransactions


});