export { managementData }

class managementData {

    deleteData = storage =>{
        //Clean Local Storage to remove unnecessary data and so avoid errors
        storage.clear()
    }

    #validateContent = ()=>{             
        // Checks that the div content hasn't been modified
                                
    }

    #useValidateData = ()=>{
        
    }

    deleteTasks_onScreen = ()=>{
        // Clean the screen to correctly execute the function "printData"
    }

    printData = ()=>{
        // Print the data stored in the local Storage
    }

    open_modalWindow =()=>{
        document.querySelector(".modalWindow").classList.add("modalWindow_open")
        setTimeout(()=>{ document.querySelector(".form_modalWindow").classList.add("form_modalWindow_open") }, 5)
    }

    close_modalWindow = ()=>{
        document.querySelector(".form_modalWindow").classList.remove("form_modalWindow_open")
        setTimeout(()=>{
            document.querySelector(".modalWindow").classList.remove("modalWindow_open") 
            document.getElementById("title_input").value = ""
            document.getElementById("description_input").value = ""
        }, 300)

    }

    open_modalWindow_toModify = icon =>{
        //Clean the <inputs>
        let task = icon.parentNode.parentNode;
        let tittleTask = task.firstElementChild.textContent
        let descriptionTask = task.children[1].textContent
        document.getElementById("title_input").value = tittleTask
        document.getElementById("description_input").value = descriptionTask
        this.open_modalWindow()
    }

    addTask = id=>{

    }

    deleteTask = id=>{

    }

    modifyTask = id=>{

    }

    

}
