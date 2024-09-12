import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Calculator from './Calculator';

// Helper function to enter values into inputs
const setupInputs = ({ deposit, rate, term, frequency }) => {
	if (deposit) {
		const depositInput = screen.getByTestId('deposit');
		fireEvent.change(depositInput, { target: { value: deposit } });
	}

	if (rate) {
		const rateInput = screen.getByTestId('rate');
		fireEvent.change(rateInput, { target: { value: rate } });
	}

	if (term) {
		const termInput = screen.getByTestId('term');
		fireEvent.change(termInput, { target: { value: term } });
	}

	if (frequency) {
		const frequencySelect = screen.getByTestId('frequency');
		fireEvent.change(frequencySelect, { target: { value: frequency } });
	}
};

// Test cases for Calculator component
describe('Calculator Component', () => {
	test('renders correctly with initial values', () => {
		render(<Calculator />);
		expect(screen.getByText(/Term Deposit Calculator/i)).toBeInTheDocument();

		// Check default values
		expect(screen.getByTestId('deposit').value).toBe('10000');
		expect(screen.getByTestId('rate').value).toBe('1.1');
		expect(screen.getByTestId('term').value).toBe('36');
		expect(screen.getByTestId('frequency').value).toBe('maturity');
	});

	test('updates deposit value on input change', () => {
		render(<Calculator />);
		const depositInput = screen.getByTestId('deposit');
		fireEvent.change(depositInput, { target: { value: '15000' } });
		expect(depositInput.value).toBe('15000');
	});

	test('updates rate value on input change', () => {
		render(<Calculator />);
		const rateInput = screen.getByTestId('rate');
		fireEvent.change(rateInput, { target: { value: '2.5' } });
		expect(rateInput.value).toBe('2.5');
	});

	test('updates term value on input change', () => {
		render(<Calculator />);
		const termInput = screen.getByTestId('term');
		fireEvent.change(termInput, { target: { value: '48' } });
		expect(termInput.value).toBe('48');
	});

	test('updates frequency value on select change', () => {
		render(<Calculator />);
		const frequencySelect = screen.getByTestId('frequency');
		fireEvent.change(frequencySelect, { target: { value: 'monthly' } });
		expect(frequencySelect.value).toBe('monthly');
	});

	test('calculates final balance with annually compounding interest', () => {
		render(<Calculator />);
		setupInputs({
			deposit: '10000',
			rate: '5',
			term: '12',
			frequency: 'annually',
		});
	});

	test('calculates final balance with monthly compounding interest', () => {
		render(<Calculator />);

		setupInputs({
			deposit: '10000',
			rate: '5',
			term: '12',
			frequency: 'monthly',
		});

		const calculateButton = screen.getByTestId('calculate');
		fireEvent.click(calculateButton);

		const result = screen.getByText(/Final Balance:/i);
		expect(result).toBeInTheDocument();
		expect(result).toHaveTextContent('$10511.62');
	});
	test('calculates final balance with quarterly compounding interest', () => {
		render(<Calculator />);

		setupInputs({
			deposit: '15000',
			rate: '4',
			term: '18',
			frequency: 'quarterly',
		});

		const calculateButton = screen.getByTestId('calculate');
		fireEvent.click(calculateButton);

		const result = screen.getByText(/Final Balance:/i);
		expect(result).toBeInTheDocument();
		expect(result).toHaveTextContent('$15922.80');
	});

	test('calculates final balance with interest at maturity', () => {
		render(<Calculator />);

		setupInputs({
			deposit: '20000',
			rate: '3',
			term: '24',
			frequency: 'maturity',
		});

		const calculateButton = screen.getByTestId('calculate');
		fireEvent.click(calculateButton);

		const result = screen.getByText(/Final Balance:/i);
		expect(result).toBeInTheDocument();
		expect(result).toHaveTextContent('$21200.00');
	});

	test('handles invalid deposit values gracefully', () => {
		render(<Calculator />);

		setupInputs({
			deposit: '-10000', // Invalid negative value
			rate: '5',
			term: '12',
			frequency: 'monthly',
		});

		const calculateButton = screen.getByTestId('calculate');
		fireEvent.click(calculateButton);

		// Should not display incorrect result
		const result = screen.queryByText(/Final Balance:/i);
		expect(result).not.toBeInTheDocument();
	});

	test('handles invalid rate values gracefully', () => {
		render(<Calculator />);

		setupInputs({
			deposit: '10000',
			rate: '52', // Invalid rate value
			term: '12',
			frequency: 'monthly',
		});

		const calculateButton = screen.getByTestId('calculate');
		fireEvent.click(calculateButton);

		// Should not display incorrect result
		const result = screen.queryByText(/Final Balance:/i);
		expect(result).not.toBeInTheDocument();
	});

	test('handles invalid term values gracefully', () => {
		render(<Calculator />);

		setupInputs({
			deposit: '10000',
			rate: '2',
			term: '1', // Invalid term value, 1 month
			frequency: 'monthly',
		});

		const calculateButton = screen.getByTestId('calculate');
		fireEvent.click(calculateButton);

		// Should not display incorrect result
		const result = screen.queryByText(/Final Balance:/i);
		expect(result).not.toBeInTheDocument();
	});
});
