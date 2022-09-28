import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filter, onFilterChange }) => {
    return (
      <div className={css.SearchBox}>
            <span className={css.SearchBox_label}>Find contacts by name</span>
            <input
            className={css.SearchBox_input}
            type="text"
            onChange={event => onFilterChange(event.currentTarget.value)}
            value={filter}
            placeholder="Please enter name"
            >
            </input>
      </div>
    );
  };
  


Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};