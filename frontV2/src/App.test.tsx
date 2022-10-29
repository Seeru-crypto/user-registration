import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { render } from './test.utils';

describe('App component', () => {
    it('should be rendered', () => {
        const badRoute = '/some/bad/route';

        render(
            <MemoryRouter initialEntries={[badRoute]}>
                <App />
            </MemoryRouter>,
        );
    });
});
