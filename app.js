import { auth, signInWithEmailAndPassword, GoogleAuthProvider, provider, signInWithPopup, doc, setDoc } from "./Firebase/firebase.mjs"
import { checkUser } from "./utils/utils.mjs"

//dom//
let email = document.getElementById("email")
let password = document.getElementById("password")
let loginBtn = document.getElementById("loginBtn")
let google = document.getElementById("google")

// custom login //
let login = async () => {
    if(!email.value || !password.value){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter all required fields",
            
          });
    }else{
        try {
            let data = await signInWithEmailAndPassword(auth, email.value, password.value)
            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your are successfuly login",
                showConfirmButton: false,
              });
            
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
                
              });
        };
    }
    
}

let googleLogin = async () => {
    try {
        let data = await signInWithPopup(auth, provider)
        const credential = await GoogleAuthProvider.credentialFromResult(data);
        const token = await credential.accessToken;
        const user = data.user;
        console.log(user)


        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your are successfuly login",
            showConfirmButton: false,
          });

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode)
        alert(errorMessage)
    }
}

// function call //
checkUser()
loginBtn.addEventListener("click", login)
google.addEventListener('click', googleLogin)

