import App from './App';

test('show number, + button, - button', () => {
  const app = new App();
  document.body.appendChild(app);

  const $number = document.querySelector('.number');
  const $plus = document.querySelector('.plus');
  const $minus = document.querySelector('.minus');

  expect($number.innerHTML).toBe('0');
  expect($plus.innerHTML).toBe('+');
  expect($minus.innerHTML).toBe('-');
});

test('plus', () => {
  const app = new App();
  document.body.appendChild(app);

  const $number = document.querySelector('.number');
  const $plusButton = app.querySelector('.plus');

  expect($number.innerHTML).toBe('0');
  $plusButton.dispatchEvent(new Event('click'));

  // not working
  return Promise.resolve().then(() => {
    const $changedNumber = document.querySelector('.number');
    expect($changedNumber.innerHTML).toBe('1');
  });
});
