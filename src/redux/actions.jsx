

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SET_EDIT_MODE = 'SET_EDIT_MODE';
export const UPDATE_ITEM = 'UPDATE_ITEM';


export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (itemId) => ({
  type: REMOVE_ITEM,
  payload: itemId,
});
export const setEditMode = (itemId) => ({
  type: 'SET_EDIT_MODE',
  payload: itemId
});

export const updateItem = (itemId, updatedItem) => ({
  type: 'UPDATE_ITEM',
  payload: { itemId, updatedItem }
});