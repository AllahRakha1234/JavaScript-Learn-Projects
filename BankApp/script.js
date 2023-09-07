'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// ******************************************** Application Started Here ********************************************

const displayMovements = function (movements, sort = false) {
  containerMovements.textContent = '';         // equal to ===> .textcontect = 0 ;
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html =
      `      
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
    </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // insertAdjacentHTML takes 2 argument (1st is the location and 2nd is the html element as a string to insert)
  });
}
const calcDiplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${acc.balance}€`;
}
const calcDisplaySummary = function (acc) {
  const incomeIn = acc.movements.filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomeIn}€`;
  const incomeOut = acc.movements.filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(incomeOut)}€`;
  const interst = acc.movements.filter(mov => mov > 0)
    .map(deposit => ((deposit * acc.interestRate) / 100))
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interst}€`
}
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ')
      .map(name => name[0]).join('');
  })
  return accs;
}
createUsername(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDiplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);

}

// Event Handler
let currentAccount;
btnLogin.addEventListener('click', function (event) {
  // Prevent form from submitting
  event.preventDefault();
  // Diplaying the UI and message
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {  // && is use to check whether account exists or not
  if (currentAccount?.pin === Number(inputLoginPin.value)) {                // ? is use to check whether account exists or not
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    // Clear input fiels
    inputLoginUsername.value = inputLoginPin.value = '';
    updateUI(currentAccount);
  }
})

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0
    && receiverAcc
    && currentAccount.balance >= amount
    && receiverAcc?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
  console.log(amount, receiverAcc);
})

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(acc => acc.username === inputCloseUsername.value);
    //.indexOf(value) is use to find index of value in array but above function can be use to find index on basis of certain condition
    // Deleting the account
    accounts.splice(index, 1);
    // Hidding the UI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

let sortedState = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE Method (Not change the original array)

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice()); // To creater a shallow copy
// console.log([...arr]);   // To creater a shallow copy

// SPLICE Method (change the original array)

// console.log(arr.splice(2));
// console.log(arr.splice(-1));
// console.log(arr);

// REVERSE Method (change the original array)

// let arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2);
// console.log(arr2.reverse());
// console.log(arr2);

//  CONCAT Method (change the original array)
// let letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

//  JOIN Method (returns the string)
// console.log(letters.join(' _ '));

// FOROF LOOP
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const mov of movements) {
//   if (mov > 0) {
//     console.log(`You deposited ${mov}`);
//   }
//   else {
//     console.log(`You withdraw ${Math.abs(mov)}`);
//   }
// }
// // To get index as well
// for (const [i, mov] of movements.entries()) {
//   if (mov > 0) {
//     console.log(`Mov ${i + 1}: You deposited ${mov}`);
//   }
//   else {
//     console.log(`Mov ${i + 1}: You withdraw ${Math.abs(mov)}`);
//   }
// }
// // FOREACH LOOP (It is a highorder function and requires a CALLBACK function)(IMPORTANT: Does not supprt break, continue etc)
// console.log('---- ForEach Loop ----');
// movements.forEach(function (mov) {
//   if (mov > 0) {
//     console.log(`You deposited ${mov}`);
//   }
//   else {
//     console.log(`You withdraw ${Math.abs(mov)}`);
//   }
// });
// // To get index as well (Here names can be any but order is important)(1st is element, 2nd is index, 3rd is array)
// movements.forEach(function (mov, i, /*arr&*/) {
//   if (mov > 0) {
//     console.log(`Mov ${i + 1}: You deposited ${mov}`);
//   }
//   else {
//     console.log(`Mov ${i + 1}: You withdraw ${Math.abs(mov)}`);
//   }
// });

// FOREACH On Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });

// FOREACH On Set (Here value and key parameter are same)( _ means unnecessary variable)(To avoid from ambuity)
// const currenciesUnique = new Set(['USD', 'EUR', 'USD', 'GBP', 'EUR']);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value} : ${value}`);
//   console.log(`${_} : ${value}`);
// });
/////////////////////////////////////////////////////////////////////////////////////
// Challenge # 1

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// const checkDogs = function (juliasData, katesData) {
//   let juliasDataCorrected = juliasData.slice();     // Creates a shallow copy
//   juliasDataCorrected.splice(0, 1);
//   juliasDataCorrected.splice(-2);             // Or below method can also be used for this
//   // juliasDataCorrected = juliasDataCorrected.slice(1, -2);
//   // console.log(juliasDataCorrected);
//   const jointArray = juliasDataCorrected.concat(katesData);
//   jointArray.forEach(function (dogAge, key) {
//     if (dogAge > 2) {
//       console.log(`Dog number ${key + 1} is adult, and ${dogAge} years old.`);
//     }
//     else {
//       console.log(`Dog number ${key + 1} is still a puppy.`);
//     }
//   });
// }
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
/////////////////////////////////////////////////////////////////////////////////////////
// MAP Method
// const eurToUSD = 1.1;
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const movementsUSD = movements.map(element => element * eurToUSD) // Here after => the part is returned
// console.log(movements);
// console.log(movementsUSD);
// // Another use of map method
// const movementsDesc = movements.map((mov, i) => `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdraw'} ${Math.abs(mov)}`)
// console.log(movementsDesc);

// FILTER Method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(deposits);
// console.log(withdrawals);

// REDUCE Method (acculmulate is like SNOWBALL)(Takes 2 arguments, 1st is the function and 2nd is the accumlator initial value)
// Use of Reduce
// const balance = movements.reduce((acc, mov) => acc + mov, 0)
// console.log(balance);
// const balance1 = movements.reduce(function (acc, mov, i) {
//   console.log(`Iteration ${i + 1}: ${mov}`);
//   return acc + mov
// }, 0)
// console.log(balance1);
// Use of Reduce
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0])
// console.log(max);
/////////////////////////////////////////////////////////////////////////
// Coding Challenge # 2
// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
// const calcAverageAgeHuman = function (arr) {
//   // Calculating Age According to Formula
//   const dogAgeInHumanYears = arr.map(dogAge => dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4);
//   // Reducing the array for adults
//   const adultDogs = dogAgeInHumanYears.filter(age => age >= 18);
//   // Calulating Average Age
//   const average = adultDogs.reduce((acc, age) => acc + age, 0);
//   console.log(`The average age of the dogs is : ${average / adultDogs.length}`);
// }
// calcAverageAgeHuman([5, 2, 4, 1, 15, 8, 3]);
// calcAverageAgeHuman([16, 6, 10, 5, 6, 1, 4]);
/////////////////////////////////////////////////////////////////////////////////
// PIPELINE / CHAINING ALL THOSE METHODS
// const eurToUSD = 1.1;
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter(mov => mov > 0).map((mov, i, arr) => {
//   console.log(arr);
//   return mov * eurToUSD;
// }).reduce((acc, mov) => acc + mov, 0);
// console.log(`The total deposits are ${deposits}`);
////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge # 3
// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
// const calcAverageAgeHumanUpdate = function (arr) {
//   // All methods in a chain
//   const average = arr.map(dogAge => dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4).filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0)
//   console.log(`The average age of the dogs is : ${average}`);
// }
// calcAverageAgeHumanUpdate([5, 2, 4, 1, 15, 8, 3]);
// calcAverageAgeHumanUpdate([16, 6, 10, 5, 6, 1, 4]);
////////////////////////////////////////////////////////////////////////////////////
// FIND METHOD (differ from filter in 2 ways => 1. return an element not array 2. return the first element that matches condition)
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(accounts);
// console.log(account);
// SOME METHOD (similar to includes but it is used to defin a certain condition and returns a boolean value)
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.includes(-130));            // Used for equlaity ===
// console.log(movements.some(mov => mov === -130)); // similar to above
// console.log(movements.some(mov => mov > 1000)); // To check if there is any deposit greater than 1000
// EVERY METHOD (similar to some method but it returns true if condition is true for all values)
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.every(mov => mov === -130));
// console.log(account4.movements.every(mov => mov > 0)); 
// FLAT METHOD (to bring out the elements of nested array in the parent array)
// const arr = [[1, 2, 3], [4, 5, 6], [7, 8], 9];
// console.log(arr.flat());
// const arrDeep = [[[1, 2, 3]], [4, 5, 6], [7, 8], [[9]]];
// console.log(arrDeep.flat(2));
// const overallBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);
// FLATMAP METHOD (it map as well as flat the element)
// const overallBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance2);

// SORTING METHOD (simply used to sort the strings)
// for strings
// const names = ['Ali', "Zaman", "Hafiz", "Babar"];
// console.log(names.sort());
// // for numbers
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.sort());
// //  return < 0, A,B (keep order)
// //  return > 0, A,B (swap)
// // Ascending
// console.log(movements.sort((a, b) => {
//   if (a > b) return 1
//   if (a < b) return -1
// }));
// // Descending
// console.log(movements.sort((a, b) => {
//   if (a > b) return -1
//   if (a < b) return 1
// }));
// // shortcuts of above
// console.log(movements.sort((a, b) => a - b));
// console.log(movements.sort((a, b) => b - a));

//  ARRAY METHOD + FILL METHOD

// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(arr);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));
// const emptyArr = new Array(7);
// console.log(emptyArr);
// emptyArr.map(() => 6);
// console.log("Still Empty:", emptyArr);
// console.log("Now filled by fill method: ", emptyArr.fill(1, 3, 5));  // fill(value to fill, start from, end here)
// console.log("Now filled by fill method: ", emptyArr.fill(1));
// const arr2 = new Array(7).fill(1);
// console.log(arr2);

// ARRAY.FROM() Function (to create the array programmatically)(Here ARRAY is the constructor not any filled array) (from takes 2 arguments 1. length of the array OR array like structure e.g array get by querySelector, 2. call back function to fill the array)
// const arr3 = Array.from({ length: 10 }, (_, i) => i + 1);   // _ means an unnecessary argument
// console.log(arr3);

// labelBalance.addEventListener('click', function () {
//   // On movs which is array of elements a map method can be applied separately OR in an Array.from() as a second argument : Array.from() is the only method use to do so, other array methods can't convert these elements to an array
//   const movs = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', "")));
//   console.log(movs);
//   // const movsUpdate = movs.map(mov => Number(mov.textContent.replace('€', "")))  
//   // console.log(movsUpdate);
//   // const movs2 = [...document.querySelectorAll('.movements__value')].map(el => Number(el.textContent.replace('€', ''))) // Other way to do the above
//   // console.log(movs2);
// })
///////////////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge # 4
// TEST DATA:
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] }
// ];
// // Point 1
// dogs.forEach(dog => dog.recFood = Math.trunc((dog.weight) ** 0.75 * 28))
// console.log(dogs);
// // Point 2
// // dogs.forEach(dog => {
// //   if (dog.owners.includes('Sarah')) {
// //     if (dog.curFood > dog.recFood * 1.10) console.log(`Sarah's dog eats too much.`);
// //     else if (dog.curFood < dog.recFood * 0.90) console.log(`Sarah's dog eats too little.`);
// //   }
// // })
// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(`Sarah's dog eats ${dogSarah.curFood > dogSarah.recFood ? 'too much.' : 'too little.'}`);
// // Point 3
// const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch);
// const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);

// // Point 4
// console.log(`${ownersEatTooMuch.join("'s and ")}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join("'s and ")}'s dogs eat too little!`);
// // Point 5
// const dogExactFood = dogs.some(dog => dog.curFood === dog.recFood);
// console.log(dogExactFood);
// // Point 6
// const chkDogsOkayFood = dog => dog.curFood > dog.recFood * 0.90 && dog.curFood < dog.recFood * 1.10;
// const dogOkayFood = dogs.some(chkDogsOkayFood);
// console.log(dogOkayFood);
// // Point 7
// const dogsOkayFood = dogs.filter(chkDogsOkayFood);
// console.log(dogsOkayFood);
// // Point 8
// const sortedDogsRecFoodArray = dogs.slice().map(dog => dog.recFood).sort((a, b) => b - a);
// console.log(sortedDogsRecFoodArray);
// const sortedDogsArray = dogs.slice().sort((a, b) => a.recFood - b.recFood);
// console.log(sortedDogsArray);