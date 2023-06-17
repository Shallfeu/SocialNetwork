import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
    form: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly(state, { payload }: PayloadAction<boolean>) {
            state.readonly = payload;
        },

        cancelEdit(state) {
            state.readonly = true;
            state.form = state.data;
            state.validateErrors = undefined;
        },

        updateProfile(state, { payload }: PayloadAction<Profile>) {
            state.form = {
                ...state.form,
                ...payload,
            };
        },
    },
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
                state.form = payload;
            },
        );
        builder.addCase(fetchProfileData.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        });

        builder.addCase(updateProfileData.pending, (state) => {
            state.validateErrors = undefined;
            state.isLoading = true;
        });
        builder.addCase(
            updateProfileData.fulfilled,
            (state, { payload }: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = payload;
                state.form = payload;
                state.readonly = true;
            },
        );
        builder.addCase(updateProfileData.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.validateErrors = payload;
        });
    },
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
