import { createAsyncThunk } from '@reduxjs/toolkit';
// toastify
import { toast } from 'react-toastify';
import { toastifyOptions } from 'utils/toastifyOptions';

import * as api from 'services/API';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.getAllContacts();
      console.log('Прочитали get data', data);
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(
        `Ooops! Wrong... Try again or update browser`
      );
    }
  }
);

const isDublicate = (contacts, { name, number }) => {
  const normalizedName = name.toLowerCase().trim();
  const normalizedNumber = number.trim();

  const dublicate = contacts.some(
    contact =>
      contact.name.toLowerCase().trim() === normalizedName ||
      contact.number.trim() === normalizedNumber
  );
  console.log('dublicate', dublicate, contacts);
  return dublicate;
};

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue }) => {
    try {
      const { data: result } = await api.addContact(data);
      console.log('data  fro add', data);
      toast.success('Add contact', {
        position: 'bottom-right',
      });
      return result;
    } catch ({ response }) {
      console.log('data  err', data);
      return rejectWithValue(`Ooops! Wrong... Try again or update browser`);
    }
  },

  {
    condition: (data, { getState }) => {
      const {
        contacts: { items },
      } = getState();
      console.log('contacts from getState', items, data);
      if (isDublicate(items, data)) {
        toast.error(`This contact is already in contacts`, toastifyOptions);
        console.log('This contact is already in contacts', items, data);
        return false;
      }
    },
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteContact(id);
      toast.success('Contact delete', {
        position: 'bottom-right',
      });
      return id;
    } catch ({ response }) {
      return rejectWithValue(`Ooops! Wrong... Try again or update browser`);
    }
  }
);

export const changeContact = createAsyncThunk(
  'contacts/editContact',
  async (data, { rejectWithValue }) => {
    try {
      const { data: result } = await api.editContact(data);
      toast.success('Contact update', {
        position: 'bottom-right',
      });

      return result;
    } catch ({ response }) {
      return rejectWithValue(`Ooops! Wrong... Try again or update browser`);
    }
  }
);
