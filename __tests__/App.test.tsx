/**
 * @format
 */

import 'react-native';
import React from 'react';

import Base from '../src';
import {Provider} from 'react-redux';
import store from '../src/api/store';
import {render, screen, cleanup, waitFor} from '@testing-library/react-native';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {github_user as USER} from '../__mocks__/user.mock';

describe('Github users page render', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Base />
      </Provider>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Flatlist renders correctly', () => {
    expect(screen.getByTestId('user_list')).toBeTruthy();
  });

  it('shows empty list initially', () => {
    expect(screen.queryAllByTestId(/^user_item_*/)).toEqual([]);
  });

  it('show list of users after a query', async () => {
    const thunkActionCreator = createAsyncThunk('githubUser/all', async () => [
      USER,
    ]);

    await waitFor(() => store.dispatch(thunkActionCreator()));

    const state = store.getState().githubUser.githubUser;

    expect(state).toEqual([USER]);

    expect(screen.getByTestId(`user_item_${state[0].id}`)).toBeDefined();
  });
});
