import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
    {
      title: 'Cumple del jefe',
      start: moment().toDate(),
      end: moment().add(2, 'hour').toDate(),
      notes: 'Comprar el pastel',
      user: {
        _id: 123,
        name: 'Carles',
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return { ...state, activeEvent: action.payload };
    case types.eventAddNew:
      return { ...state, event: [...state.events, action.payload] };
    default:
      return state;
  }
};
