import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getUsername';

describe('getLoginUsername.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'Igor',
            },
        };
        expect(getLoginUsername(state as StateSchema)).toEqual('Igor');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {},
        };
        expect(getLoginUsername(state as StateSchema)).toEqual('');
    });
});
