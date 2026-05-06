import {
   getAuth,
   signInWithEmailAndPassword,
   GoogleAuthProvider,
   signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

//lấy
const emailElement = document.getElementById("email");
const passElement = document.getElementById("password");
//lấy
const emailErrorElement = document.getElementById("email-error");
const passErrorElement = document.getElementById("password-error");
const loginbutton = document.getElementById("login-btn");
const googleBtn = document.getElementById("google-login-btn");

let userList = [
   {
      email: "admin@gmail.com",
      password: "111111",
   },
   {
      email: "datnt@gmail.com",
      password: "abcabc",
   },
];

if (localStorage.getItem("userList")) {
   userList = JSON.parse(localStorage.getItem("userList"));
}else{
   localStorage.setItem("userList",JSON.stringify(userList));
}

function checkExistUser(email) {
   result = null;
   userList.forEach((user)=> {
      if (user.email == email) {
         result = user;
      }
   });
   return result;
}
function handleLoginClick(event) {                     //khai báo nhận tham số event
   event.preventDefault();                             //ngăn chặn reload
   let email = emailElement.value.trim();  
   let password = passElement.value.trim();            //lấy từ input (trim để xóa khoản trắng ở cuối)

   if(validate(email,password) === true) {             //kiểm tra hợp lệ nếu true thì xuống
      const auth = getAuth();                          //auth import từ firebase
      signInWithEmailAndPassword(auth, email,password) //thực hiện phương thức đăng nhập cùng auth,email, password từ firebase
         .then((userCredential) => {                   //nếu hợp lệ thì xuống đăng nhập thành công
            // Signed in
            const user = userCredential.user;
            console.log("Login successful:",user);
            window.location.href = "food.html";         //redirect to food.html
         })
         .catch((error) =>{                             //bắt lỗi,báo lỗi
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("error during login:", errorCode, errorMessage);
            passErrorElement.textContent = "(*)" + errorMessage;
         });
   }
}



function validate(email, password) {
   let isValid = true;
   let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   // Reset error messages
   emailErrorElement.textContent = "";
   passErrorElement.textContent = "";

   // Validation
   if (!email_regex.test(email)) {
      emailErrorElement.textContent = "(*) Invalid email format.";
      isValid = false;
   }
   if (password === "") {
      passErrorElement.textContent =
         "(*) Password must be at least 6 characters.";
      isValid = false;
   }

   return isValid;
}


//gắn sự kiện click cho buttonvaf hàm xử lý sự kiện đó
loginbutton.addEventListener("click", handleLoginClick);

googleBtn.addEventListener("click", handleGoogleLogin);

function handleGoogleLogin() {
   const auth = getAuth();

   // Tạo provider Google
   const provider = new GoogleAuthProvider();

   // Mở popup đăng nhập
   signInWithPopup(auth, provider)
      .then((result) => {
         const user = result.user;

         console.log("Google login success:", user);

         // chuyển trang
         window.location.href = "food.html";
      })
      .catch((error) => {
         console.error("Google login error:", error.message);
      });
}