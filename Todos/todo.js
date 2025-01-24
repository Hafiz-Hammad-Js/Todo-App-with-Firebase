// import//
import { doc, query, where, db, addDoc, collection, getDocs, updateDoc,deleteDoc } from "../Firebase/firebase.mjs"
import { checkUser, logOut } from "../utils/utils.mjs"

// dom get //
let todoItem = document.getElementById("todoItem")
let todoList = document.getElementById('todoList')
let logoutUser = document.getElementById("logoutUser")
let btnParent = document.getElementById("btnParent")
let loder =document.getElementById("loder")

// local storage //
let getCurrentUserId = localStorage.getItem("currentUserTodo")

// default show button //
btnParent.innerHTML = `<button class='saveBTN' onclick="addTodos()">Save Items</button>`

// add Data //
let addTodos = async () => {
    if (!todoItem.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter all required fields",
            
          });
    } else {
        try {
            let dateSetting = new Date()
            let date = dateSetting.toLocaleTimeString()

            const docRef = await addDoc(collection(db, "todoItems"), {
                userTodo: todoItem.value,
                userId: getCurrentUserId,
                createdAt: date
            });

           

            console.log(docRef.id)
            Swal.fire({
                title: "Your todo has saved!",
                icon: "success",
                draggable: true
              });
            getData()
            todoItem.value =""

        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }
}

// get data //

let getData = async () => {
    loder.style.display ="block"
    try {
        todoList.innerHTML = "";
        const q = query(collection(db, "todoItems"), where("userId", "==", getCurrentUserId));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let { createdAt, userTodo } = doc.data()
            todoList.innerHTML += `
           <li class='dataRender'>
           ${userTodo} 
            <div>
              <button class="updateBTn" onclick="updateValue('${userTodo}', '${doc.id}')"> <i class="fa-solid fa-pen"></i></button>
              <button class="delBTn" onclick="delData('${doc.id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
           </li>
           `
        });

        loder.style.display ="none"
    } catch (error) {
        console.log(error)
        alert(error.message)
    }

}

// show Update Value ..:- //

let updateValue = (todo, id) => {
    todoItem.value = todo
    console.log("heloo")
    btnParent.innerHTML = `<button class="updateWork" onclick="updateData('${id}')">Update Todo</button>`
}

// update Function //
let updateData = async (id) => {
    console.log(id)
    const updateRef = doc(db, "todoItems", id);

    await updateDoc(updateRef, {
        userTodo: todoItem.value,
    });
    Swal.fire({
        title: "Your todo has updated!",
        icon: "success",
        draggable: true
      });
    btnParent.innerHTML = `<button class='saveBTN' onclick="addTodos()">Save Items</button>`
    todoItem.value = ""
    getData()

}

// delete data //
let delData = async (id) => {
    await deleteDoc(doc(db, "todoItems", id));
    Swal.fire({
        title: "Your todo has deleted!",
        icon: "success",
        draggable: true
      });
    getData()
}
// function Call //
window.delData = delData
window.updateData = updateData
window.updateValue = updateValue
window.addTodos = addTodos
logoutUser.addEventListener('click', logOut)

checkUser()
getData()
