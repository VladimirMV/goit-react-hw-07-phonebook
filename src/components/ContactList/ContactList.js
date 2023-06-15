import s from './ContactList.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { fetchContacts } from 'redux/contacts/contacts-operations';
import {
  selectContacts,
  selectIsLoading,
  selectError,
  selectFilteredContacts,
  selectFilter,
} from 'redux/selectors';

import Loader from 'components/Loader/Loader';
import { deleteContact } from 'redux/contacts/contacts-operations';

function ContactList() {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const result = useSelector(selectFilteredContacts);

  const getFilteredContacts = data => {
    if (filter.toLowerCase() && !data.length) {
      // alert(`No contacts matching your request`);
    }
    return data;
  };

  const filteredContacts = getFilteredContacts(result);

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <>
      {isLoading && contacts?.length === 0 && <Loader />}
      {error && !isLoading && <div>Ooops, error...</div>}
      {!filteredContacts?.length && !error && !isLoading && (
        <div className={s.error}> Contacts not found</div>
      )}
      {!error && !isLoading && filteredContacts?.length > 0 && (
        <ul className={s.list}>
          {filteredContacts.map(({ name, number, id }) => {
            return (
              <li className={s.item} key={id}>
                <p className={s.info}>
                  {name}: {number}
                </p>
                <button
                  className={s.btn}
                  type="button"
                  onClick={() => onDeleteContact(id)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default ContactList;
