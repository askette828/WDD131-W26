const theForm = document.querySelector('#checkoutForm');
const paymentSelect = document.querySelector('#paymentMethod');
const creditCardContainer = document.querySelector('#creditCardNumberContainer');
const paypalContainer = document.querySelector('#paypalUsernameContainer');
const creditInput = document.querySelector('#creditCardNumber');
const paypalInput = document.querySelector('#paypalUsername');

function togglePaymentDetails(e) {
  let value = e.target.value;

  paypalContainer.classList.add('hide');
  creditCardContainer.classList.add('hide');
  paypalInput.required = false;
  creditInput.required = false;

  if (value === 'creditCard') {
    creditCardContainer.classList.remove('hide');
    creditInput.required = true;
  } else if (value === 'paypal') {
    paypalContainer.classList.remove('hide');
    paypalInput.required = true;
  }

  paymentSelect.setAttribute('aria-expanded',
    value === 'creditCard' || value === 'paypal' ? 'true' : 'false'
  );
}

paymentSelect.addEventListener('change', togglePaymentDetails);

function displayError(msg) {
  document.querySelector('.errors').textContent = msg;
}

function isCardNumberValid(number) {
  return number === '1234123412341234';
}

function submitHandler(event) {
  event.preventDefault();
  let errorMsg = '';
  displayError('');

  if (paymentSelect.value === 'creditCard') {
    const cardNum = creditInput.value.trim();

    if (!/^\d{16}$/.test(cardNum)) {
      errorMsg += 'Card number must be 16 digits\n';
    } else if (!isCardNumberValid(cardNum)) {
      errorMsg += 'Card number is not valid\n';
    }

    const expYear = Number(document.querySelector('#year').value);
    const expMonth = Number(document.querySelector('#month').value);
    const currentDate = new Date();

    if (
      2000 + expYear < currentDate.getFullYear() ||
      (2000 + expYear === currentDate.getFullYear() && expMonth <= currentDate.getMonth())
    ) {
      errorMsg += 'Card is expired\n';
    }
  }

  if (errorMsg !== '') {
    displayError(errorMsg);
    return;
  }

  const formContainer = document.getElementById('checkoutForm');
  formContainer.innerHTML = '<h2>Thank you for your purchase.</h2>';
}

theForm.addEventListener('submit', submitHandler);
