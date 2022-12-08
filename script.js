'use strict';

///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// BANKIST APP

//Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    InterestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davies',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    InterestRate: 1.5, 
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    InterestRate: 0.7, 
    pin: 3333,
};

const account4 = {
    owner: 'Steven Smith',
    movements: [430, 1000, 700, 50, 90,],
    InterestRate: 1, 
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.sumary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.sum__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.form__btn--sort');

const inputLoginUsername =document.querySelector('.login__input--user');
const inputLoginPin =document.querySelector('.login__input--pin');
const inputLoginTo =document.querySelector('.login__input--to');
const inputLoginAmount =document.querySelector('.login__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan--amount');
const inputLoanUser = document.querySelector('.form__input--user');
const inputLoanClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements) {
    containerMovements.innerHTML = '';
    // .textContent = 0


    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}"> ${
            i + 1
        } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
        `;

        containerMovements.insertAdjacentHTML
        ('afterbegin', html);
    });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
    const balance = movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${balance}€`;
};

const calcDisplaySummary = function(movements) {
    const incomes = movements
     .filter(mov => mov > 0)
     .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}€`;

    const out = movements
      .filter(mov => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}`;

    const interest =movements
      .filter(mov => mov > 0)
      .map(deposit => (deposit * 1.2) / 100)
      .filter((int, i, arr) => {
        console.log(arr);
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}`
    };

const createUsernames = function (accs) {
    accs.forEach(function(acc) {
     acc.username = acc.owner
     .toLowerCase()
     .split(' ')
     .map(name => name[0])
     .join('');
    });
};
createUsernames(accounts);

// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
    //Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
        );
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `welcome back, ${currentAccount.owner.split(' ') [0]}`;
        containerApp.getElementsByClassName.opacity = 100;

        // Display movements
        displayMovements(currentAccount.movements)

        // Display Balance
        calcDisplayBalance(currentAccount.movements)

        // Display summary
        calcDisplaySummary(currentAccount.movements)

    }
})

////////////////////////////////////////////////
///////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
const currency = new Map([
    ['USD', 'United States Dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound Sterling']
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


////////////////////////////////////////////////
// Simple Array Methods
let arr = ['a', 'b', 'c', 'd', 'e',];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log(...arr);

// SPLICE
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e',];
const arr2 = ['j', 'i', 'h', 'g', 'j']
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) 
for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
        console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
        console.log(`Movement ${i + 1}: You witdrew ${Math.abs(movement)}`);
    }
}

console.log('---- FOREACH ----');
movements.forEach(function(mov, i, arr) {
    if (mov > 0) {
        console.log(`Movement ${i + 1}: You deposited ${mov}`);
    } else {
        console.log(`Movement ${i + 1}: You witdrew ${Math.abs(mov)}`);
    }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

const currencies = new Map([
    ['USD', 'United States Dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound Sterling']
]);

currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD','GBP','USD','EUR','EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
    console.log(`${value}: ${value}`);
});


const eurToUsd = 1.1;

//const movementsUSD = movements.map(function (mov) {
//    return mov *eurToUsd;
//});

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : ''} ${Math.abs(mov)}`
);
console.log(movementsDescription);

const deposits = movements.filter(function(mov, i, arr) {
    return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = []
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);


console.log(movements);

// accumulator -> SNOWBALL
// const balance = movements.reduce(function(acc, cur, i, arr) {
//     console.log(`Iteration ${i}: ${acc}`);
//     return acc + cur
// }, 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov
console.log(balance2);

// Maximum value
const max =movements.reduce((acc, mov) => {
    if (acc > mov)
      return acc;
    else
    return mov;
}, movements[0]);
console.log(max);

const eurToUsd = 1.1;
console.log(movements);

//PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
  //  console.log(arr);
   return mov * eurToUsd
})
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davies');
console.log(account);
*/