'use strict';

//Validation forms
let validateForm = selector => {
  Array.from(document.querySelectorAll(selector)).forEach(item => {
    item.addEventListener('input', e => {
      if (e.target.value === '') item.dataset.touched = false;
    });
    item.addEventListener('invalid', () => {
      item.dataset.touched = true;
    });
    item.addEventListener('blur', () => {
      if (item.value !== '') item.dataset.touched = true;
    });
  });
};

validateForm('.js-form .form-field');

let form = document.querySelector('.js-form');
let formName = '.js-form';

form.addEventListener('submit', e => {
  submitForm(e, formName);
});

let showSnack = type => {
  let snackSuccess = $("#snackbar-success");
  let snackError = $("#snackbar-error");
  if (type === 'success') {
    snackSuccess.addClass('show');
    setTimeout(function(){ snackSuccess.removeClass('show'); }, 3000);
  } else {
    snackError.addClass('show');
    setTimeout(function(){ snackError.removeClass('show'); }, 3000);
  }
};

let submitForm = (e, formName) => {
  e.preventDefault();
  let name = $(formName + ' .js-field-name').val();
  let email = $(formName + ' .js-field-email').val();
  let message = $(formName + ' .js-field-message').val();
  let data = { name, email, message };

  $.ajax({
    type: "POST",
    url: 'http://localhost:3002/api/send-mail',
    data,
    success () {
      console.log('success');
      showSnack();
      form.reset();
    },
    error () {
      console.log('error');
    }
  });
};