import { StateSchema } from 'app/providers/StoreProvider';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from './articleDetails';

describe('getProfileData.test', () => {
    test('data', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetials: {
                data: {
                    id: '1',
                },
            },
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual({
            id: '1',
        });
    });

    test('error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetials: {
                error: 'string',
            },
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual('string');
    });

    test('loading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetials: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
    });

    test('data', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetials: {},
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });

    test('error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetials: {},
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });

    test('loading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetials: {},
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(undefined);
    });
});
