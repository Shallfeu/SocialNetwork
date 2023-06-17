import { StateSchema } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
    const data = {
        first: '123',
        lastname: 'Ульби',
        age: 123,
        currency: Currency.EUR,
        country: Country.Armenia,
        city: 'Moscow',
        username: 'admin213',
    };

    test('should return', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {},
        };
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
