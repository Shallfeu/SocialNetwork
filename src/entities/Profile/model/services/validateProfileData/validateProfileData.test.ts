import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../types/profile';

describe('ValidateProfileError.test', () => {
    const data = {
        first: '123',
        lastname: 'Ульби',
        age: 123,
        currency: Currency.EUR,
        country: Country.Armenia,
        city: 'Moscow',
        username: 'admin213',
    };
    test('success ValidateProfileError', async () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });

    test('1 error ValidateProfileError', async () => {
        const result = validateProfileData({ ...data, first: '' });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('2 error ValidateProfileError', async () => {
        const result = validateProfileData({ ...data, country: undefined });

        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });

    test('3 error ValidateProfileError', async () => {
        const result = validateProfileData({ ...data, age: 0 });

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('4 error ValidateProfileError', async () => {
        const result = validateProfileData({ ...data, first: '', age: 0 });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });
});
