import {
   getAuth,
   createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

let emailEl = document.getElementById("Email");
let passEl = document.getElementById("password");
let pass1El = document.getElementById("password1");
let regBtnEl = document.getElementById("register-btn");

let emailErrEl = document.getElementById("email-error");
let passErrEl = document.getElementById("pass-error");
let pass1ErrEl = document.getElementById("pass1-error");

function validate(email, password, password1) {
    let isValid = true;
    let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailErrEl.textContent = "";
    passErrEl.textContent = "";
    pass1ErrEl.textContent = "";


    if (!email_regex.test(email)) {
        emailErrEl.textContent = "(*) Invalid email.";
        isValid = false;
    }

    if (password === "") {
        passErrEl.textContent = "(*) Password required.";
        isValid = false;
    }

    if (password1 === "") {
        pass1ErrEl.textContent = "(*) Confirm password required.";
        isValid = false;
    }

    if (password1 !== password) {
        pass1ErrEl.textContent = "(*) Password does not match.";
        isValid = false;
    }

    return isValid;
}

function handleRegister(event) {
   event.preventDefault();
   let email = emailEl.value.trim();  
   let password = passEl.value.trim();
   let password1 = pass1El.value.trim();

    if (validate(email, password, password1)) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email,password) //thực hiện phương thức đăng ký cùng auth,email, password từ firebase
         .then((userCredential) => {                   //nếu hợp lệ thì xuống đăng nhập thành công
            // Signed up
            const user = userCredential.user;
            console.log("Registration successful:",user);
            window.location.href = "login.html";         //redirect to login.html
         })
         .catch((error) =>{                             //bắt lỗi,báo lỗi
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("error during signup:", errorCode, errorMessage);
            passErrorElement.textContent = "(*)" + errorMessage;
         });   
}
}    


regBtnEl.addEventListener("click", handleRegister);

