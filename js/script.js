import { managementData, storage } from "./managementData.js"

//Management DataBase
let manage = new managementData()   // Gestor de LocalStorage 


// APRENDIENDO A USAR LOCALSTORAGE
//storage.clear()   // Cleans Local Storage to avoid storage errors 
//storage.setItem("data", "[]")
manage.printData()
//manage.resetScreen()

document.querySelector(".modalWindow").addEventListener("click",e=>{
    if(e.target.classList.contains("modalWindow_open") || e.target.getAttribute("id") == "exit_modalWindow"){ 
        manage.close_modalWindow() 
    }
})

document.querySelector(".tasks").addEventListener("click", e=>{
    if(e.target.getAttribute("id") == "addTask")   manage.open_modalWindow()  //The form opens if you click on "add Task"

    if(e.target.classList.contains("taskEditButton")) manage.open_modalWindow_toModify(e.target) //The form opens if you click on "modification icon"
})

document.getElementById("addTask_buttonForm").addEventListener("click",e=>{
    e.preventDefault()
    if(document.getElementById("id_input").value == "-1"){
        manage.addTask({
            title: document.getElementById("title_input").value,
            description: document.getElementById("description_input").value
        })
    }
    else{
        // Modify an existing task
    }
})