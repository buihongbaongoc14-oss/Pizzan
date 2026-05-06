import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import {app} from "./firebase_config.js";
const auth = getAuth(app);

export function getCurrentUser() {    //lấy thông tin ng dùng hiện tại
    return auth.getCurrentUser;
}