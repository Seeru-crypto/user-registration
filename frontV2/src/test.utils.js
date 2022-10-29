import React from 'react';
import {render as rtlRender} from '@testing-library/react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import userReducer from "./slicers/UserSlice";
import AppReducer from "./slicers/AppSlice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
          app: AppReducer,
          user: userReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };
