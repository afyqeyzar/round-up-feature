# Starling Bank Engineering Technical Challenge

by Nor Afyq Eyzar bin Abu Zaharoff (norafyqe@gmail.com)

### Developed a "round-up" feature for costumers using Starling Bank's public developer API. The amount rounded up will be calculated from a customer's transactions for a week beginning with a date selected from the customer. This amount will then be transfered to their [Savings Goal](https://www.starlingbank.com/blog/introducing-goals/).

<img width="1680" alt="mainPage" src="https://user-images.githubusercontent.com/83950596/229376362-53b485ec-b408-41e3-8376-077f3847de23.png">

## Requirements

node.js version 16 or higher

## Assumptions made:

1. User is a Personal Account holder
2. User only has a ONE GBP PRIMARY Account
3. User already has a Savings Account with a goal
4. User has one ONE Savings Account
5. No pending transactions (all transactions are SETTLED)

## Preliminaries:

1. [Sign-up](https://developer.starlingbank.com/signup) for Starling Bank's developer account.
2. [Create a Application](https://developer.starlingbank.com/application/list)
3. [Create a sandbox customer](https://developer.starlingbank.com/sandbox/select)
4. Click Auto-simulate at the bottom of the page to simulate the customer's transaction
5. Copy the customer's Access Token and paste it in the '.env' file

## Running the webpage:

1. Clone this repository

```bash
git clone git@github.com:afyqeyzar/starlingbanktest.git
```

2. Make sure the Access Token is pasted in the '.env' file
3. Run the file with

```bash
npm start
```

## Note on webpage:

Given that the sandbox customer is a brand new customer, they would NOT have a savings account. The webpage will then display a button to make a savings account.
<img width="1677" alt="makeSavingsGoal" src="https://user-images.githubusercontent.com/83950596/229376210-14af9aca-5ae4-42d2-b319-d90c848b2c6e.png">
Click this button to make a savings account. The webpage will then refresh to display the main page.

## Limitations / Improvements to be made:

1. A more secure transferring method of money to the Savings Account (Two-Factor Authentication)
2. Display additional current and savings accounts in EUR.
3. Be able to make use this "round-up" feature for EUR accounts.
4. Incorporate pending transactions into the calculation of the rounded-up total.
