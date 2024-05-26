import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import GitHubUser from './types';
import {getNextUrl} from './helpers';
const BASE_URL = 'https://api.github.com/users?per_page=10';

export const getGitHubUser = async (url?: string) => {
  try {
    const response = await fetch(url ?? BASE_URL);
    getNextUrl(response);
    return response.json();
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const fetchGithubUser = createAsyncThunk(
  'githubUser/all',
  async (url?: string) => {
    const response = await getGitHubUser(url);
    return response;
  },
);
export const fetchMoreGithubUser = createAsyncThunk(
  'githubUser/more',
  async (url?: string) => {
    const response = await getGitHubUser(url);
    return response;
  },
);

export interface GitHubUserState {
  githubUser: GitHubUser[];
  nextUrl: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: GitHubUserState = {
  githubUser: [],
  nextUrl: '',
  loading: 'idle',
};

export const githubUserSlice = createSlice({
  name: 'githubUser',
  initialState,
  reducers: {
    getNextUrl_action: (state, action) => {
      state.nextUrl = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchGithubUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.githubUser = action.payload;
    });
    builder.addCase(fetchGithubUser.pending, state => {
      state.loading = 'pending';
    });
    builder.addCase(fetchGithubUser.rejected, state => {
      state.loading = 'failed';
    });
    builder.addCase(fetchMoreGithubUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.githubUser = [...state.githubUser, ...action.payload];
    });
    builder.addCase(fetchMoreGithubUser.pending, state => {
      state.loading = 'pending';
    });
    builder.addCase(fetchMoreGithubUser.rejected, state => {
      state.loading = 'failed';
    });
  },
});

export const {getNextUrl_action} = githubUserSlice.actions;
