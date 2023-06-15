import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://648a1d425fa58521cab0d768.mockapi.io/contacts',
});

export const getAllContacts = () => contactsInstance.get('/');

export const deleteContact = id => {
  return contactsInstance.delete(`/${id}`);
};

export const addContact = data => {
  console.log('data from API', data);
  return contactsInstance.post('/', data);
};

export const editContact = data => {
  return contactsInstance.put(`/${data.id}`, {
    avatar: data.avatar,
    name: data.name,
    number: data.number,
  });
};
