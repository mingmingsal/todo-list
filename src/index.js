import './style.css';
import { Card } from './tasks';
import { createCardUI } from './taskDisplay';
import { format, compareAsc, add } from "date-fns";
import PubSub from 'pubsub-js'

//Where all the Cards are Stored
const cardArray = [new Card("c", "tacos are good", new Date(2014, 1, 11), "", "any"), new Card("d", "tacos are good", new Date(2014, 1, 11), "", "any"), new Card("e", "tacos are good", new Date(2014, 1, 11), "", "any")];
const projectArray = [];
const form = document.querySelector("form");
const projectList = document.querySelector("#projects")
const allProjects = document.getElementById("all");
allProjects.addEventListener('click', () => {
    clearUI();
    initializeArrayUI("", true);
})
const content = document.getElementById("content");
const addTaskForm = document.getElementById("addTaskForm");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    getFormData();
});
const addTaskButtons = document.querySelectorAll(".addTask");
addTaskButtons.forEach(element => {
    element.addEventListener('click', () => {
        showAddTaskForm();
    })
});
showAddTaskForm();
function showAddTaskForm() {
    console.log("new")
    form.elements["date"].valueAsDate = new Date();
    addTaskForm.style.visibility == "visible" ? addTaskForm.style.visibility = "hidden" : addTaskForm.style.visibility = "visible";
}

//UI Functions for Clearing/Creating/Adding to Card List
function addTasktoUI(data) {
    const hillUI = createCardUI(data, cardArray.length - 1).container;
    content.append(hillUI);
}
function initializeArrayUI(filter, bypass) {
    let filteredArray = cardArray;
    if (!bypass) {
        filteredArray = cardArray.filter(function (el) {
            return el._project == filter;
        });
    }
    for (let i = 0; i < filteredArray.length; i++) {
        const hillUI = createCardUI(filteredArray[i], i).container;
        content.append(hillUI);
    };
}
function clearUI() {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}
function addToProjectArray(proj) {
    const project = proj;
    if (!projectArray.includes(project)) {
        projectArray.push(project);
    }
}
function initializeProjectUI() {
    projectArray.forEach(element => {
        const btn = document.createElement("button");
        btn.textContent = element;
        projectList.append(btn);
        btn.addEventListener('click', () => {
            clearUI();
            initializeArrayUI(element, false)

        })
    });
}
function deleteTask(data) {
    cardArray.splice(data, 1);
}
function clearProjectUI() {
    while (projectList.firstChild && projectList.lastChild.id != "all") {
        projectList.removeChild(projectList.lastChild);
    }
}
//Remove card at data and update UI
PubSub.subscribe('Delete Pressed', (msg, data) => {
    deleteTask(data);
    clearUI();
    initializeArrayUI();
});
//Create new Card and push to array
PubSub.subscribe('Card Created', (msg, data) => {
    addToProjectArray(data._project);
    clearProjectUI();
    initializeProjectUI();
    cardArray.push(data);
    addTasktoUI(data);
});

function getFormData() {
    const name = form.elements["taskName"].value;
    const desc = form.elements["description"].value;
    const date = form.elements["date"].value
    const proj = form.elements["project"].value;
    const prio = form.elements["priority"].value;
    const card = new Card(name, desc, date, proj, prio);
    form.reset();
    showAddTaskForm();
}
initializeArrayUI("", true);