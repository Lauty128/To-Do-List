import { managementData, storage, styleValidateContentLength } from "./managementData.js"

//Management DataBase
let manage = new managementData()   // Gestor de LocalStorage 


storage.clear()   // Cleans Local Storage to avoid storage errors 
storage.setItem("data", "[]")
manage.resetScreen()

document.querySelector(".modalWindow").addEventListener("click",e=>{
    if(e.target.classList.contains("modalWindow_open") || e.target.getAttribute("id") == "exit_modalWindow"){ 
        manage.close_modalWindow() 
    }
})

document.querySelector(".tasks").addEventListener("click", e=>{
    // Open form to add task
    if(e.target.getAttribute("id") == "addTask")   manage.open_modalWindow()  //The form opens if you click on "add Task"

    // Open form to modify task
    if(e.target.classList.contains("taskEditButton")) manage.open_modalWindow_toModify(e.target) //The form opens if you click on "modification icon"

    // Delete Task
    if(e.target.classList.contains("taskDeleteButton")) manage.deleteTask({
        id: e.target.parentNode.parentNode.getAttribute("id"),
        title: e.target.parentNode.parentNode.children[0].textContent,
        description: e.target.parentNode.parentNode.children[1].textContent
        })
    
})

document.getElementById("addTask_buttonForm").addEventListener("click",e=>{
    e.preventDefault()

    // Add task
    if(document.getElementById("id_input").value == "-1"){
        manage.addTask({
            title: document.getElementById("title_input").value,
            description: document.getElementById("description_input").value
        })
        return
    }
    // if id != -1 then the task will be modified
    //if(manage.validateContentLength())  
    manage.modifyTask({
       id: document.getElementById("id_input").value,
            title: document.getElementById("title_input").value,
            description: document.getElementById("description_input").value
        })
})

document.querySelector(".form_modalWindow").addEventListener("keyup",e=>{
    switch(e.target.getAttribute("id")){
        case "title_input":
             if(!manage.wordsValidation.title.test(e.target.value)){
                 styleValidateContentLength(e.target.getAttribute("id"), false)
                 return
             }
             styleValidateContentLength(e.target.getAttribute("id"), true)
            
        break;
        case "description_input":
            if(!manage.wordsValidation.description.test(e.target.value)){
                styleValidateContentLength(e.target.getAttribute("id"), false)
                return
            }
            styleValidateContentLength(e.target.getAttribute("id"), true)
        break;
    }

})


// Implement Intersection Observer API

