import { managementData } from "./managementData.js"

let manage = new managementData()   // Gestor de LocalStorage 

manage.useValidateData()

let storage = localStorage
storage.setItem("persona",[])
storage.setItem("persona",{nombre:"JUAN", apellido:"Silverii"})
storage.setItem("persona",{nombre:"JUAN", apellido:"Silverii"})

// APRENDIENDO A USAR LOCALSTORAGE

