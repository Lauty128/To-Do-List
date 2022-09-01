import { managementData } from "./managementData.js"

let manage = new managementData()   // Gestor de LocalStorage 

let storage = localStorage

manage.deleteData(storage)

// APRENDIENDO A USAR LOCALSTORAGE



document.querySelector(".modalWindow").addEventListener("click",e=>{
    if(e.target.classList.contains("modalWindow_open") || e.target.getAttribute("id") == "exit_modalWindow"){ 
        manage.close_modalWindow() 
    }
})

document.querySelector(".tasks").addEventListener("click", e=>{
    if(e.target.getAttribute("id") == "addTask")   manage.open_modalWindow()  //The form opens if you click on "add Task"

    if(e.target.classList.contains("taskEditButton")) manage.open_modalWindow_toModify(e.target) //The form opens if you click on "modification icon"
})

