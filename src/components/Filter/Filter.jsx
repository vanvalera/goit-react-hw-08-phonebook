import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from 'redux/filter/filterSlice';
import { selectStatusFilter } from 'redux/selectors';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectStatusFilter);

  const onChange = e => {
    dispatch(setFilter(e.target.value.toLowerCase()));
  };
  return (
    <input
      type="text"
      value={filter}
      onChange={onChange}
      placeholder="Search contacts"
    />
  );
}

Filter.propTypes = {
  filter: PropTypes.string,
  OnChange: PropTypes.func,
};
