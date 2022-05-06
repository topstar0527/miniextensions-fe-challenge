import { configureStore } from '@reduxjs/toolkit';

import formReducer from '../pages/Form/formSlice';
import appReducer from '../app/appSlice';

const store =  configureStore({
  reducer: {
    form: formReducer,
    app: appReducer
  }
});

export default store;