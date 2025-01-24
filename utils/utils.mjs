import { onAuthStateChanged, auth, signOut, setDoc, db, doc } from "../Firebase/firebase.mjs";

let checkUser = () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {

            const uid = user.uid;
            localStorage.setItem("currentUserTodo", uid)

            await setDoc(doc(db, "RegistersData", user.uid), {
                name: user.displayName,
                Email: user.email,
                userPhoto: user.photoURL
            });


            console.log(location.pathname)
            if (location.pathname === "/index.html" || location.pathname === "/Register/register.html") {
                location.replace("../Todos/todo.html")
            }
        } else {
            if (location.pathname === "/Todos/todo.html") {
                location.replace("../index.html")
            }
        }
    });
}

let logOut = () => {
    signOut(auth).then(() => {
        localStorage.removeItem("currentUserTodo")
        alert("LogOut!")
    }).catch((error) => {
        console.log(error)
        alert(error.message)
    });
}

export {
    checkUser,
    logOut
}