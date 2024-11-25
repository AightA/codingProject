import React from 'react';
import { render, screen } from '@testing-library/react';
import { SubdivisionDisplay } from './SubdivisionDisplay';

describe('SubdivisionDisplay Component', () => {
	it('renders learn prompt to create display component', () => {
		render(<SubdivisionDisplay />);
		const prompt = screen.getByText('Divisions Data');
		expect(prompt).toBeInTheDocument();
	});
});

/* Tests cases 
    test axios data fetch 
        case for successful response, error and unsuccessful
    test filter function
        case for each Active, Future & build out
    ...
    test sorting function 
*/
