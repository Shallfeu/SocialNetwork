import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    scroll: {},
};
export const scrollSaveSlice = createSlice({
    name: 'scrollSave',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});
export const { actions: scrollSaveActions, reducer: scrollSaveReducer } = scrollSaveSlice;
