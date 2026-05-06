import {
    getFirestore,
    setDoc,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import {getCurrentUser} from "./auth.js";
import {app} from "./firebase_config.js";

const db = getFirestore(app);

export async function addToCart(productId) { //lay id san pham bo vo gio hang
    const user = getCurrentUser();

    //1. kiem tra dang nhap
    if (!user) {
        alert("Pls login to continue!");
        window.location.href ="login.html";
    }
    const uid = user.uid;
    const cartRef = doc(db, "carts", uid);   //lay gio hang cua ng dung dua tren id

    try{
        //lay gio hang hien tai cua user thong qua dia chi gio hang(cartRef)
        const docSnap = await getDoc(cartRef);
        //2.Neu chx co gio hang => tao moi luon
        if (!docSnap.exists()){
            //tao ra gio hang moi voi san pham dau tien
            const newCart = {
                items: [
                    {
                        productId: productId,
                        quantity: 1,
                    },
                ],
            };
            await setDoc(cartRef, newCart);
            alert("Da tao gio hang va tham san pham!");
            return;
        }
        //3.Neu da co gio hang
        let items = docSnap.data().items || [];

        //4. kiem tra san pham da co chx
        const index = items.findIndex((item)=> item.productId === productId);

        if(index !== -1){
            //da co => tang so luong
            items[index].quantity +=1;
        }else{
            //chua co => them moi
            items.push({
                productId:productId,
                quantity:1
            });
        }
        //5.cap nhat lai firestore
        await setDoc(cartRef, {items});
        alert("da cap nhat gio hang")
    }catch (error) {
        console.error("Loi them gio hang: ", error);
        alert("Co loi xay ra")
    } 
}