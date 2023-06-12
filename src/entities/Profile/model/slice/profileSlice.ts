import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProfileData.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(
            fetchProfileData.fulfilled,
            (state, { payload }: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = payload;
            },
        );
        builder.addCase(fetchProfileData.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        });
    },
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
