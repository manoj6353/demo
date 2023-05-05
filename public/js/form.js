let firstname = document.getElementById("firstName");
let lastname = document.getElementById("lastName");
let contact = document.getElementById("contact");
let address = document.getElementById("address");
let email = document.getElementById("email");
let company = document.getElementById("cname");
let desig = document.getElementById("wdesig");
let city = document.getElementById("city");
let dob = document.getElementById("dateOfBirth");
let sdate = document.getElementById("sdate");
let edate = document.getElementById("edate");
let age = document.getElementById("age");
let image = document.getElementById("image");
let firsterror = document.getElementById("firsterror");
let lasterror = document.getElementById("lasterror");
let contacterror = document.getElementById("contacterror");
let addresserror = document.getElementById("addresserror");
let emailerror = document.getElementById("emailerror");
let companyerror = document.getElementById("companyerror");
let desigerror = document.getElementById("desigerror");
let ageerror = document.getElementById("ageerror");
let imageerror = document.getElementById("imageerror");
const namepattern = /^[a-zA-Z ]{2,30}$/gm;
const agepattern = /^[0-9]{2,2}$/gm;
const exppattern = /^[a-zA-Z0-9\s,'-\/"]*$/;
const contactpattern = /^\(?([0-9]{3})\)?([0-9]{3})([0-9]{4})$/;
const addressPattern = /^[a-zA-Z0-9\s,'-\/"]*$/;
const emailPattern = /\S+@\S+\.\S+/;
const imagepattern = /\.(jpg|jpeg|png|img)$/i;
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
    // if (email.value != "") {
    //   if (email.value.match(emailPattern)) {
    //     email.classList.remove("error");
    //     emailerror.innerHTML = "";
    //     emailerror.classList.remove("error");
    //     c++;
    //   } else {
    //     email.classList.add("error");
    //     emailerror.classList.add("error");
    //     emailerror.innerHTML = "Please enter a valid email";
    //   }
    // }
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
    if (city.value != "") {
      c++;
    }
    if (dob.value != "") {
      c++;
    }
    if (image.value != "") {
      if (image.value.match(imagepattern)) {
        image.classList.remove("error");
        imageerror.innerHTML = "";
        imageerror.classList.remove("error");
        c++;
      } else {
        image.classList.add("error");
        imageerror.classList.add("error");
        imageerror.innerHTML =
          "Please enter a valid image format(jpg/jpeg/png/img";
      }
    } else {
      c++;
    }
    if (age.value != "") {
      if (age.value.match(agepattern)) {
        age.classList.remove("error");
        ageerror.innerHTML = "";
        ageerror.classList.remove("error");
        c++;
      } else {
        age.classList.add("error");
        ageerror.classList.add("error");
        ageerror.innerHTML = "Please enter a valid age";
      }
    }
    if (c == 8) {
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
      if (company.value.match(exppattern)) {
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
      if (desig.value.match(exppattern)) {
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
    if (sdate.value != "") {
      c++;
    }
    if (edate.value !== "") {
      c++;
    }
    console.log(c);
    if (c == 4) {
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
      let lower = removeChar.toLowerCase();
      firstUpper += lower;
      firstname.value = firstUpper;
    }
    if (lastname.value != "") {
      let lastName = lastname.value;
      let firstChar = lastName.charAt(0);
      let firstUpper = firstChar.toUpperCase();
      let removeChar = lastName.slice(1);
      let lower = removeChar.toLowerCase();
      firstUpper += lower;
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
    } else if (n == 1 && !expriencevalidation() && currentTab == 1) {
      CommonError.classList.add("error");
      CommonError.innerHTML = "Please fill the Company details";
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
