# 💸 Term Deposit Calculator 💸 - README

## Project Overview

This project is a simple **Term Deposit Calculator** built using **React.js**. It allows users to input an initial deposit amount, interest rate, investment term, and interest frequency (monthly, quarterly, annually, or at maturity). The calculator then computes the final balance at the end of the term using either simple interest or compound interest, depending on the selected frequency.

### Assumptions

1. **Deposit Amount**:

   - Must be between $1,000 and $1,500,000.
   - Invalid deposit amounts (e.g., negative values) will show an error message.

2. **Interest Rate**:

   - The valid range is between 0% and 15%.
   - Invalid interest rates (e.g., negative or excessive values) will trigger an error.

3. **Investment Term**:

   - The term must be between 3 months and 60 months (5 years).
   - Invalid term durations will display an error.

4. **Interest Frequency**:

   - You can select monthly, quarterly, annually, or at maturity.
   - Interest at maturity is a special case where interest is calculated only once at the end of the term (simple interest).

5. **Calculation Formula**:

   - For compounding interest (monthly, quarterly, annually):  
     $$ A = P \times (1 + \frac{r}{n})^{(n \times t)} $$
   - For interest at maturity:  
     $$ A = P \times (1 + r \times t) $$

   Where:

   - `P` is the principal amount (initial deposit).
   - `r` is the annual interest rate (in decimal form).
   - `n` is the number of times interest is compounded per year.
   - `t` is the investment term in years.
   - `A` is the final balance.

### Project Structure

- **src/components/Calculator.js**: The main component implementing the Term Deposit Calculator.
- **src/components/Calculator.test.js**: The test file that verifies the functionality of the calculator using unit tests with `@testing-library/react`.

## Installation & Setup

### Prerequisites

- **Node.js** (>= 18.x.x)
- **npm** (or **yarn**)

### Steps to Install and Run the Project

1. **Clone the Repository**

   ```
   git clone https://github.com/rushabhBhagat/tdc.git
   cd tdc
   ```

2. **Install Dependencies**
   Using npm:

   ```
   npm install
   ```

   Or using yarn:

   ```
   yarn install
   ```

3. **Start the Development Server**

   ```
   npm start
   ```

   Or using yarn:

   ```
   yarn start
   ```

   The application will be running on `http://localhost:3000`.

## Running Tests

Unit tests are written using `@testing-library/react` to verify the behavior of the calculator under various scenarios.

### To Run the Tests:

1. **Run Tests in Watch Mode** (automatically runs when files change):

   ```
   npm test
   ```

   Or using yarn:

   ```
   yarn test
   ```

2. **Run Tests Once**:
   ```
   npm test -- --watchAll=false
   ```
   Or using yarn:
   ```
   yarn test --watchAll=false
   ```

### Test Scenarios

The test cases check:

- The correct rendering of the component with initial values.
- Correct updates when user inputs change (e.g., deposit amount, rate, etc.).
- Calculations for different interest frequencies: monthly, quarterly, annually, and at maturity.
- Proper error handling for invalid inputs (e.g., negative deposit or invalid term).

## How to Use the Calculator

1. **Deposit**: Enter the starting deposit amount (between $1,000 and $1,500,000).
2. **Interest Rate**: Set the annual interest rate (between 0% and 15%).
3. **Term**: Enter the investment term in months (between 3 and 60 months).
4. **Interest Frequency**: Choose how often interest is compounded (monthly, quarterly, annually, or at maturity).
5. **Calculate**: Click the "Calculate" button to compute the final balance.

### Example Usage

- Deposit: `$10,000`
- Interest Rate: `5%`
- Term: `12 months`
- Interest Frequency: `Monthly`

Click **Calculate**, and the final balance will be displayed on the screen.

## Future Enhancements

1. **Graphical Representation**: Add a chart to visually represent the growth of the deposit over time with compound interest. Show interest earned per year/month for better user insight.
2. **Better UX**: Create a better UI/UX for all devices.
3. **Better Errors**: Instead of using the input validation, show all the errors onSubmit handler for all the fields.

## Conclusion

This project provides a straightforward way to calculate the future value of a term deposit, including support for both simple and compound interest calculations. It includes comprehensive tests to ensure correct functionality under various scenarios.
