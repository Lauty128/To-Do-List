export { managementData, storage }

let storage = localStorage;

class managementData {

    constructor(){
        this.object = {
            id:"",
            title:"",
            description:""
        }
        this.wordsValidation = {
            title: [5,20], // Regular Expression
            description:[20, 80]  // Regular Expression
        }
    }

    #getData = ()=> JSON.parse(storage.getItem("data"))

    #changesContentToModify = ({id,title,description})=>{             
        // Checks that the div content hasn't been modified
        let storedTaskData = this.#getData().filter(element => element.id == id)
        return  title == storedTaskData[0].title && description == storedTaskData[0].description ? false : true
    }

    //-------------------- ON-SCREEN DATA HANDLING

    #printData = ()=>{
        let addTaskButton = document.querySelector("#addTask")
        let storedData = this.#getData()
        if(storedData.length > 0){
            storedData.forEach(task=>{
                let taskData = ` <div class="task" id="${task.id}">
                <h3>${task.title}</h3>
                <p class="description">${task.description}</p>
                <div class="taskOptions">
                    <i class="fa-solid fa-pen-to-square taskEditButton"></i>
                    <i class="fa-solid fa-trash-can taskDeleteButton"></i>
                </div>
                `
                addTaskButton.insertAdjacentHTML("afterend", taskData)
            })
        } 
    }

    resetScreen = ()=>{
        document.querySelector(".tasks").innerHTML = 
        `<div id="addTask">
            <div class="icon_addTask">
                <i></i>
                <i></i>
            </div>
        </div>`
        this.close_modalWindow()
        this.#printData()
    }

    printMessage = (message,type)=>{
        // print error message with color and message sent
        document.querySelector(type).firstElementChild.textContent = message
        document.querySelector(type).classList.add("message_show")
        setTimeout(()=>{ document.querySelector(type).classList.remove("message_show") }, 3000)
    }

    //-------------------------- MODAL WINDOW

    open_modalWindow =()=>{
        document.querySelector(".modalWindow").classList.add("modalWindow_open")
        setTimeout(()=>{ document.querySelector(".form_modalWindow").classList.add("form_modalWindow_open") }, 5)
    }

    close_modalWindow = ()=>{
        document.getElementById("id_input").value = "-1"
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
        document.getElementById("id_input").value = task.getAttribute("id")
        this.open_modalWindow()
    }

    //-------------------------- ADD / DELETE / MODIFY

    addTask = ({ title, description })=>{
        let storedData = this.#getData()
        //Takes the data and creates an object with it
        this.object.id = storedData.length == 0 ? 0 : storedData[storedData.length - 1].id + 1;
        this.object.title = title
        this.object.description = description
        //Adds the created object to local storage
        storedData.push(this.object)
        storage.setItem("data", JSON.stringify(storedData))  
        this.printMessage("Tarea agregada correctamente", ".successMessage")
        this.resetScreen()
    }

    deleteTask = ({ id,title,description })=>{
        try{
            if(!this.#changesContentToModify({ id, title, description })){
                let storedData = this.#getData()
                // Removes all elements that match the id
                storedData = storedData.filter((data=> data.id != id))
                // Adds the new object to the Local Storage
                storage.setItem("data", JSON.stringify(storedData))
                this.printMessage("Tarea eliminada correctamente", ".successMessage")
                this.resetScreen()
                return
            }
            throw "error";
        }
        catch{
            // Returns an error message
            this.printMessage("Ocurrio un error. Porfavor reinicie la pagina", ".errorMessage")
        }
    }

    modifyTask = ({ id, title, description })=>{
        //Checks that there is a change in the task
        try{
            if(this.#changesContentToModify({ id, title, description })){ 
                // if there is error in #changesContentToModify, then it means that someone tried to modify the system 
                let storedData = this.#getData()
                storedData.map((element=>{
                    if(element.id == id) {
                        element.title = title
                        element.description = description
                    }
                }))
                storage.setItem("data", JSON.stringify(storedData))
                this.printMessage("Tarea editada correctamente", ".successMessage")
                this.resetScreen()
                return   
            }
            // if there is no error in #changesContentTomodify and it is false, then it means that there is no change
            throw "unchanged";
        }
        catch(error){
            let message = error == "unchanged" ? "No se ha realizado ningun cambio en la tarea" : "Ocurrio un error. Porfavor reinicie la pagina";
            document.getElementById("addTask_buttonForm").style.animation = "tiembla 0.1s ease 0s 3"
            setTimeout(()=>{ document.getElementById("addTask_buttonForm").style.animation = "" },300)
            this.printMessage(message, ".errorMessage")
        }
    }

    

}
