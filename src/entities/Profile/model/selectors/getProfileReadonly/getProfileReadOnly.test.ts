import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileReadonly } from './getProfileReadOnly';

describe('getProfileReadonly.test', () => {
    test('should return', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                readonly: true,
            },
        };
        expect(getProfileReadonly(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {},
        };
        expect(getProfileReadonly(state as StateSchema)).toEqual(undefined);
    });
});
