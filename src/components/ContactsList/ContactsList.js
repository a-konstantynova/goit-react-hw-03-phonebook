import React from 'react';
import s from './ContactsList.module.css';
import PropTypes from 'prop-types';

export default function ContactsList({ contactsList, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contactsList.map(({ id, name, number }) => (
        <li className={s.item} key={id}>
          {name}: {number}
          <button className={s.deleteBtn} onClick={() => onDeleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactsList.propTypes = {
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func,
};
