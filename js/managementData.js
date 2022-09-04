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

    addTask = ({ title, description })=>{
        let storedData = this.#getData()
        //Takes the data and creates an object with it
        this.object.id = storedData.length == 0 ? 0 : storedData[storedData.length - 1].id + 1;
        this.object.title = title
        this.object.description = description
        //Adds the created object to local storage
        storedData.push(this.object)
        storage.setItem("data", JSON.stringify(storedData))  
        this.resetScreen()
    }

    deleteTask = ({ id,title,description })=>{
        if(!this.#changesContentToModify({ id, title, description })){
            let storedData = this.#getData()
            // Removes all elements that match the id
            storedData = storedData.filter((data=> data.id != id))
            // Adds the new object to the Local Storage
            storage.setItem("data", JSON.stringify(storedData))
            this.resetScreen()
        }

        // Returns an error message
    }

    modifyTask = ({ id, title, description })=>{
        //Checks that there is a change in the task
        if(this.#changesContentToModify({ id, title, description }) /* &&  (Complys with the regular expression) */){
            //console.log("Son distintos")
            let storedData = this.#getData()
            storedData.map((element=>{
                if(element.id == id) {
                    element.title = title
                    element.description = description
                }
            }))
            storage.setItem("data", JSON.stringify(storedData))
            this.resetScreen()
            return
        }
        //console.log("Son iguales")  **prints an error message
        
    }

    

}
