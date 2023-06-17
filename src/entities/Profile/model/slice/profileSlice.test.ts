import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
import { profileActions, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

describe('profileSLice.test', () => {
    const data = {
        first: '123',
        lastname: 'Ульби',
        age: 123,
        currency: Currency.EUR,
        country: Country.Armenia,
        city: 'Moscow',
        username: 'admin213',
    };

    test('readonly ', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
        };
        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({
            readonly: true,
        });
    });

    test('cancel', () => {
        const state: DeepPartial<ProfileSchema> = {
            data,
            form: { ...data, age: 0 },
        };
        expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({
            readonly: true,
            data,
            form: data,
        });
    });

    test('update', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: data,
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.updateProfile({ ...data, age: 1 }),
            ),
        ).toEqual({
            form: { ...data, age: 1 },
        });
    });

    test('update profile data pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('update profile data fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };
        expect(
            profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, '')),
        ).toEqual({
            isLoading: false,
            data,
            form: data,
            validateError: undefined,
            readonly: true,
        });
    });
});
