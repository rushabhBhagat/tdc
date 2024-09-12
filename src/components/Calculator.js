import React, { useState } from 'react';

const Calculator = () => {
	const [deposit, setDeposit] = useState(10000);
	const [rate, setRate] = useState(1.1);
	const [term, setTerm] = useState(36);
	const [interestFrequency, setInterestFrequency] = useState('maturity');
	const [finalBalance, setFinalBalance] = useState(null);
	const [error, setError] = useState({
		deposit: false,
		rate: false,
		term: false,
	});

	const frequencies = {
		monthly: 12,
		quarterly: 4,
		annually: 1,
		maturity: 0, // special case where interest is only compounded once at the end
	};

	const handleCalculation = () => {
		// Validate input
		if (isNaN(deposit) || deposit <= 1000 || deposit >= 1500000) {
			setError({ ...error, deposit: true });
			return;
		}
		if (isNaN(rate) || rate <= 0 || rate >= 15) {
			setError({ ...error, rate: true });
			return;
		}
		if (isNaN(term) || term < 3 || term > 60) {
			setError({ ...error, term: true });
			return;
		}

		/*
		 P = Principal amount (initial deposit)
		 r = Annual interest rate (decimal)
		 n = Number of times interest is compounded per year
		 t = Investment term (years)
		 A = Final balance after t years
		 The formula is A = P * (1 + r / n) ^ (n * t) for compounding annually, quarterly, or monthly.
		 If interest is paid only at maturity, we use this formula A = P * (1 + r * t).
		 * */
		const P = parseFloat(deposit);
		const r = parseFloat(rate) / 100;
		const n = frequencies[interestFrequency];
		const t = parseFloat(term) / 12;

		let A;
		if (n === 0) {
			// Interest compounded at maturity
			A = P * (1 + r * t);
		} else {
			// Compound interest formula
			A = P * Math.pow(1 + r / n, n * t);
		}

		setFinalBalance(A.toFixed(2));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleCalculation();
	};

	return (
		<div style={{ border: '1px solid', margin: '3em', padding: '2em' }}>
			<h2>Term Deposit Calculator</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Start Deposit Amount: </label>
					<input
						type='number'
						value={deposit}
						name='Deposit'
						htmlFor='Start Deposit Amount'
						min={1000}
						max={1500000}
						onChange={(e) => setDeposit(e.target.value)}
						data-testid='deposit'
					/>
					{error.deposit && (
						<div style={{ color: 'red' }}>
							Deposit amount must be between $1,000 and $1,500,000.
						</div>
					)}
				</div>

				<div>
					<label>Interest Rate (%): </label>
					<input
						type='number'
						step='0.10'
						min={0}
						max={15}
						value={rate}
						onChange={(e) => setRate(e.target.value)}
						data-testid='rate'
					/>
					{error.rate && (
						<div style={{ color: 'red' }}>
							Interest rate must be between 0% and 15%.
						</div>
					)}
				</div>

				<div>
					<label>Investment Term (months): </label>
					<input
						type='number'
						value={term}
						min={3}
						max={60}
						onChange={(e) => setTerm(e.target.value)}
						data-testid='term'
					/>
					{error.term && (
						<div style={{ color: 'red' }}>
							Investment term must be between 3 and 60 months.
						</div>
					)}
				</div>

				<div>
					<label>Interest Paid: </label>
					<select
						value={interestFrequency}
						onChange={(e) => setInterestFrequency(e.target.value)}
						data-testid='frequency'
					>
						<option value='monthly'>Monthly</option>
						<option value='quarterly'>Quarterly</option>
						<option value='annually'>Annually</option>
						<option value='maturity'>At Maturity</option>
					</select>
				</div>

				<button type='submit' data-testid='calculate'>
					Calculate
				</button>
			</form>

			{finalBalance && finalBalance > 0 && (
				<div>
					<h3>Final Balance: ${finalBalance}</h3>
				</div>
			)}
		</div>
	);
};

export default Calculator;
