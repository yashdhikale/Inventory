// src/redux/reducers.jsx

import { ADD_ITEM, REMOVE_ITEM, SET_EDIT_MODE, UPDATE_ITEM } from './actions';

const initialState = {
  items: [],
  editItemId: null // Add this if not already present in your state
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case SET_EDIT_MODE:
      return {
        ...state,
        editItemId: action.payload
      };
    case UPDATE_ITEM:
      const { itemId, updatedItem } = action.payload;
      const updatedItems = state.items.map(item =>
        item.id === itemId ? { ...item, ...updatedItem } : item
      );
      return {
        ...state,
        items: updatedItems,
        editItemId: null 
      };
    default:
      return state;
  }
};

export default itemsReducer;
