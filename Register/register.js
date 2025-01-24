import { createUserWithEmailAndPassword, auth, db, doc, setDoc } from "../Firebase/firebase.mjs";
import { checkUser } from "../utils/utils.mjs";

let email = document.getElementById("email")
let password = document.getElementById("password")
let registerBtn = document.getElementById("registerBtn")
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let country = document.getElementById("country")


let register = async () => {
    if (!email.value || !password.value || !firstName || !lastName || !country) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please enter all fields",
          });
    } else {
      
        try {
            let  userCredential =await  createUserWithEmailAndPassword(auth, email.value, password.value)

            const user =  userCredential.user;
            console.log("Register USer ====> ", user)

            // await setDoc(doc(db, "registerDatas", user.uid), {
            //     userEmail: email.value,
            //     userFirstName: firstName.value,
            //     userLastName: lastName.value,
            //     userCountry: country.value
            // });

        } catch (error) {
            // Logging the full error object
            console.log("Full error object:", error);
            console.log("Error Code:", error.code); // This will print the error code
            console.log("Error Message:", error.message); // This will print the error message
            
            alert(error.message);
        }

    }
}


checkUser()
registerBtn.addEventListener('click', register)
