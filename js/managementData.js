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
            title: 20,
            description:100
        }
    }

    getData = ()=> JSON.parse(storage.getItem("data"))

    #validateContentToModify = ()=>{             
        // Checks that the div content hasn't been modified                       
        let data = this.getData()
        let check = false;
        let index=0;
        if(data.length > 0){
            //while(index < data.length && !check){     
           // }
            // console.log(data.filter(element => element.id == this.object.id ))
        }else {console.log("No tiene nada")}
        console.log(data.filter(element => element.id == this.object.id ))
    }

    deleteTasks_onScreen = ()=>{
        // Clean the screen to correctly execute the function "printData"
    }

    printData = ()=>{
        let addTaskButton = document.querySelector("#addTask")
        let storedData = this.getData()
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

                addTaskButton.insertAdjacentHTML("beforebegin", taskData)
            })

            return
        }
        
    }

    resetScreen = ()=>{
        document.querySelector(".tasks").innerHTML = `<div id="addTask">
        <div class="icon_addTask">
            <i></i>
            <i></i>
        </div>
    </div>`
        this.close_modalWindow()
        this.printData()
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
        let storedData = this.getData()
        //Takes the data and creates an object with it
        this.object.id = storedData.length;
        this.object.title = title
        this.object.description = description
        //Adds the created object to local storage
        storedData.push(this.object)
        storage.setItem("data", JSON.stringify(storedData))  
        this.resetScreen()  
    }

    deleteTask = id=>{

    }

    modifyTask = id=>{

    }

    

}
