import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/actions.jsx';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search items"
      className="filter"
      onChange={handleChange}
    />
  );
};

export default Filter;
