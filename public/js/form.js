let hindi = document.getElementById("hindi");
let php = document.getElementById("php");
document.getElementById("hread").disabled = true;
document.getElementById("hwrite").disabled = true;
document.getElementById("hspeak").disabled = true;
document.getElementById("rating").disabled = true;
function check() {
  if (hindi.checked == true) {
    document.getElementById("hread").disabled = false;
    document.getElementById("hwrite").disabled = false;
    document.getElementById("hspeak").disabled = false;
  } else {
    document.getElementById("hread").disabled = true;
    document.getElementById("hwrite").disabled = true;
    document.getElementById("hspeak").disabled = true;
  }
  if (php.checked == true) {
    document.getElementById("rating").disabled = false;
  } else {
    document.getElementById("rating").disabled = true;
  }
}

let firstname = document.getElementById("firstName");
let lastname = document.getElementById("lastName");
let contact = document.getElementById("contact");
let address = document.getElementById("address");
let email = document.getElementById("email");
let board = document.getElementById("board");
let year = document.getElementById("year");
let per = document.getElementById("per");
let company = document.getElementById("cname");
let desig = document.getElementById("wdesig");
let rating = document.getElementById("rating");
let firsterror = document.getElementById("firsterror");
let lasterror = document.getElementById("lasterror");
let contacterror = document.getElementById("contacterror");
let addresserror = document.getElementById("addresserror");
let emailerror = document.getElementById("emailerror");
let boarderror = document.getElementById("boarderror");
let yearerror = document.getElementById("yearerror");
let pererror = document.getElementById("pererror");
let companyerror = document.getElementById("companyerror");
let desigerror = document.getElementById("desigerror");
let ratingerror = document.getElementById("ratingerror");
let languageerror = document.getElementById("languageerror");
const namepattern = /^[a-zA-Z ]{2,30}$/gm;
const boardpattern = /^[a-zA-Z0-9\s,'-\/"]*$/;
const contactpattern = /^\(?([0-9]{3})\)?([0-9]{3})([0-9]{4})$/;
const addressPattern = /^[a-zA-Z0-9\s,'-\/"]*$/;
const emailPattern = /\S+@\S+\.\S+/;
const yearpattern = /^(20[0-4]\d|2023)$/;
const ratingpattern = /^([1-9]|10)$/;
const perpattern = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/;
function basicvalidation() {
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
function educationvalidation() {
  let c = 0;
  try {
    if (board.value.match(boardpattern)) {
      board.classList.remove("error");
      boarderror.classList.remove("error");
      boarderror.innerHTML = "";
      c++;
    } else {
      board.classList.add("error");
      boarderror.classList.add("error");
      boarderror.innerHTML = "Please enter a valid board/university name";
    }
    if (year.value != "") {
      if (year.value.match(yearpattern)) {
        year.classList.remove("error");
        yearerror.classList.remove("error");
        yearerror.innerHTML = "";
        c++;
      } else {
        year.classList.add("error");
        yearerror.classList.add("error");
        yearerror.innerHTML = "Please enter a valid year";
      }
    }
    if (per.value != "") {
      if (per.value.match(perpattern)) {
        per.classList.remove("error");
        pererror.classList.remove("error");
        pererror.innerHTML = "";
        c++;
      } else {
        per.classList.add("error");
        pererror.classList.add("error");
        pererror.innerHTML = "Please enter a valid percentage";
      }
    }
    if (c == 3) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

function expriencevalidation() {
  let c = 0;
  try {
    if (company.value != "") {
      if (company.value.match(boardpattern)) {
        company.classList.remove("error");
        companyerror.classList.remove("error");
        companyerror.innerHTML = "";
        c++;
      } else {
        company.classList.add("error");
        companyerror.classList.add("error");
        companyerror.innerHTML = "Please enter a valid company name";
      }
    }
    if (desig.value != "") {
      if (desig.value.match(boardpattern)) {
        desig.classList.remove("error");
        desigerror.classList.remove("error");
        desigerror.innerHTML = "";
        c++;
      } else {
        desig.classList.add("error");
        desigerror.classList.add("error");
        desigerror.innerHTML = "Please enter a valid designation";
      }
    }
    if (c == 2) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

function languagevalidation() {
  let c = 0;
  try {
    if (hindi.checked == true) {
      c++;
    }
    if (c == 1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

function technologyvalidation() {
  let c = 0;
  try {
    if (rating.value != "") {
      if (rating.value.match(ratingpattern)) {
        rating.classList.remove("error");
        ratingerror.classList.remove("error");
        ratingerror.innerHTML = "";
        c++;
      } else {
        rating.classList.add("error");
        ratingerror.classList.add("error");
        ratingerror.innerHTML = "Please enter a valid rating";
      }
    }
    if (c == 1) {
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

var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  try {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "block";
    }
    if (n == x.length - 1) {
      document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
      document.getElementById("nextBtn").innerHTML = "Next";
    }
  } catch (err) {
    console.log(err);
  }
}

let CommonError = document.getElementById("fullError");

function nextPrev(n) {
  try {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !basicvalidation() && currentTab == 0) {
      CommonError.classList.add("error");
      CommonError.innerHTML = "Please fill the Basic details";
      return false;
    } else if (n == 1 && !educationvalidation() && currentTab == 1) {
      CommonError.classList.add("error");
      CommonError.innerHTML = "Please fill the Education details";
      return false;
    } else if (n == 1 && !expriencevalidation() && currentTab == 2) {
      CommonError.classList.add("error");
      CommonError.innerHTML = "Please fill the Exprience details";
      return false;
    } else if (n == 1 && !languagevalidation() && currentTab == 3) {
      CommonError.classList.add("error");
      CommonError.innerHTML = "Please fillss the Language details";
      return false;
    } else if (n == 1 && !technologyvalidation() && currentTab == 4) {
      CommonError.classList.add("error");
      CommonError.innerHTML = "Please fill the Technology details";
      return false;
    } else {
      CommonError.classList.remove("error");
      CommonError.innerHTML = "";
      x[currentTab].style.display = "none";
      currentTab = currentTab + n;
      if (currentTab >= x.length) {
        document.getElementById("regForm").submit();
        return false;
      }
      showTab(currentTab);
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}
