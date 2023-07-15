import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ScrollSaveSchema, ScrollSchema } from '../types/scrollSaveSchema';

const initialState: ScrollSaveSchema = {
    scroll: {},
};

export const scrollSaveSlice = createSlice({
    name: 'scrollSave',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[payload.path] = payload.position;
        },
    },
    extraReducers: (builder) => {},
});

export const { actions: scrollSaveActions, reducer: scrollSaveReducer } = scrollSaveSlice;