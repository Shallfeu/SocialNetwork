import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { componentRender } from 'shared/config/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
    test('should have value from state', () => {
        componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
        const valueTitle = screen.getByTestId('value-title');

        expect(valueTitle).toHaveTextContent('10');
    });

    test('increment', () => {
        componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
        const incBtn = screen.getByTestId('increment-btn');
        const valueTitle = screen.getByTestId('value-title');

        userEvent.click(incBtn);
        expect(valueTitle).toHaveTextContent('11');
    });

    test('decrement', () => {
        componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
        const decBtn = screen.getByTestId('decrement-btn');
        const valueTitle = screen.getByTestId('value-title');

        userEvent.click(decBtn);
        expect(valueTitle).toHaveTextContent('9');
    });
});
