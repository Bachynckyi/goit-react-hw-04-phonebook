import PropTypes from 'prop-types';
import  css from './ContactItem.module.css';

export const ContactItem = ({ name, number, id, onDeleteContact }) => {
  return (
    <li className={css.item}>
      <span>{name}:</span>
      <span className={css.number}>{number}</span>
      <button  className={css.butonDelete} type='button' onClick={() => onDeleteContact(id)}>Delete</button>
    </li>
  );
};

ContactItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
}
