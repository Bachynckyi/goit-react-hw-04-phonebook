import { ContactItem } from "./ContactItem/ContactItem";
import PropTypes from 'prop-types';
import css from './ContactList.module.css';
  
export const ContactList = ({data, onDeleteContact}) => {
  return (
    <ul className={css.contactList}>
        {data.length !== 0 ? (
          data.map(dataItem => {
          return (
          <ContactItem
              key={dataItem.id}
              id={dataItem.id}
              name={dataItem.name}
              number={dataItem.number}
              onDeleteContact={onDeleteContact}   
          />
          )}))
          : (<li>There is no one contact</li>)}
    </ul>
  )
}


  ContactList.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })),
    onDeleteContact: PropTypes.func.isRequired,
  }