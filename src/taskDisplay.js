//Get the Card Object
//Create DOM element containing Task properties
import { format, compareAsc } from "date-fns";
import PubSub from 'pubsub-js'

function createCardUI(info, arrayIndex) {
    PubSub.subscribe('Card Changed',  (msg, data) =>{
        console.log(msg);
        updateData(data);
    });
    //Constructor
    const container = document.createElement("div");
    container.className="card-container";
    const name = document.createElement("h2");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");
    const project = document.createElement("p");
    const priority = document.createElement("p");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent="Delete";
    deleteBtn.addEventListener('click',()=> {
        PubSub.publish('Delete Pressed', arrayIndex);
    })
    updateData(info);
    container.append(name,description,dueDate,project,priority, deleteBtn);

    function updateData(card){
        name.textContent = card._name;
        description.textContent = card._description;
        dueDate.textContent = format(card._dueDate, "MM/dd/yyyy");
        project.textContent = card._project;
        priority.textContent = card._priority;
    }
    return {
        container
    }
}
export{createCardUI}