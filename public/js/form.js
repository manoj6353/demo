let firstname = document.getElementById("firstName");
let lastname = document.getElementById("lastName");
let contact = document.getElementById("contact");
let address = document.getElementById("address");
let email = document.getElementById("email");
let firsterror = document.getElementById("firsterror");
let lasterror = document.getElementById("lasterror");
let contacterror = document.getElementById("contacterror");
let addresserror = document.getElementById("addresserror");
let emailerror = document.getElementById("emailerror");
const namepattern = /^[a-zA-Z ]{2,30}$/gm;
const contactpattern = /^\(?([0-9]{3})\)?([0-9]{3})([0-9]{4})$/;
const addressPattern = /^[a-zA-Z0-9\s,'-\/"]*$/;
const emailPattern = /\S+@\S+\.\S+/;
function validation() {
  let c = 0;
  try {
    if (firstname.value != "") {
      if (firstname.value.match(namepattern)) {
        firstname.classList.remove("error");
        firsterror.innerHTML = "";
        firsterror.classList.remove("error");
        c++;
      } else {
        firstname.classList.add("error");
        firsterror.classList.add("error");
        firsterror.innerHTML = "Please enter a valid first name";
      }
    }
    if (lastname.value != "") {
      if (lastname.value.match(namepattern)) {
        lastname.classList.remove("error");
        lasterror.innerHTML = "";
        lasterror.classList.remove("error");
        c++;
      } else {
        lastname.classList.add("error");
        lasterror.classList.add("error");
        lasterror.innerHTML = "Please enter a valid last name";
      }
    }
    if (email.value != "") {
      if (email.value.match(emailPattern)) {
        email.classList.remove("error");
        emailerror.innerHTML = "";
        emailerror.classList.remove("error");
        c++;
      } else {
        email.classList.add("error");
        emailerror.classList.add("error");
        emailerror.innerHTML = "Please enter a valid email";
      }
    }
    if (contact.value != "") {
      if (contact.value.match(contactpattern)) {
        contact.classList.remove("error");
        contacterror.innerHTML = "";
        contacterror.classList.remove("error");
        c++;
      } else {
        contact.classList.add("error");
        contacterror.classList.add("error");
        contacterror.innerHTML = "Please enter a valid contact";
      }
    }
    if (address.value.match(addressPattern)) {
      address.classList.remove("error");
      addresserror.innerHTML = "";
      addresserror.classList.remove("error");
      c++;
    } else {
      address.classList.add("error");
      addresserror.classList.add("error");
      addresserror.innerHTML = "Please enter a valid Address";
    }
    if (c == 5) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

function toupper() {
  try {
    if (firstname.value != "") {
      let firstName = firstname.value;
      let firstChar = firstName.charAt(0);
      let firstUpper = firstChar.toUpperCase();
      let removeChar = firstName.slice(1);
      firstUpper += removeChar;
      firstname.value = firstUpper;
    }
    if (lastname.value != "") {
      let lastName = lastname.value;
      let firstChar = lastName.charAt(0);
      let firstUpper = firstChar.toUpperCase();
      let removeChar = lastName.slice(1);
      firstUpper += removeChar;
      lastname.value = firstUpper;
    }
  } catch (err) {
    console.log(err);
  }
}
