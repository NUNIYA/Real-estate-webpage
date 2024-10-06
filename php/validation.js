const form = document.getElementById('form');
const msg = document.getElementById('error-msg');
const err = document.getElementsByClassName('main-error')[0];
const sent = document.getElementsByClassName('sent-message')[0];

function validateName() {
  const Name = document.getElementById('name').value;
  const regex = /^[a-zA-Z\s]+$/;
  if (!regex.test(Name)) {
    msg.innerText = "Name can only contain letters and spaces";
    msg.classList.remove('d-none');
    return false;
  }
  return true;
}

function validateDescription() {
  const description = document.getElementById('message').value;
  if (description.length < 10) {
    msg.innerText = "Description must be at least 10 characters long";
    msg.classList.remove('d-none');
    return false;
  }
  return true;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();  
  
  msg.classList.add('d-none');
  err.classList.add('d-none');
  sent.classList.add('d-none');

  if (!validateName() || !validateDescription()) {
    err.classList.remove('d-none');
  } else {
    sent.classList.remove('d-none');

    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(data => {
      sent.classList.remove('d-none');
      form.reset();
    })
    .catch(error => {
      err.classList.remove('d-none');
    });
  }
});
