const form = document.querySelector("form");
const projectList = document.querySelector("#projects")
const allProjects = document.getElementById("all");
const content = document.getElementById("content");
const addTaskForm = document.getElementById("addTaskForm");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    getFormData();
});
allProjects.addEventListener('click', () => {
    clearUI();
    initializeArrayUI("", true);
})
showAddTaskForm();
function showAddTaskForm() {
    console.log("new")
    form.elements["date"].valueAsDate = new Date();
    addTaskForm.style.visibility == "visible" ? addTaskForm.style.visibility = "hidden" : addTaskForm.style.visibility = "visible";
}
function addTasktoUI(data) {
    const hillUI = createCardUI(data, cardArray.length - 1).container;
    content.append(hillUI);
}
function initializeArrayUI(filter, ary) {
    let filteredArray = ary;
    if (filter != "") {
        filteredArray = ary.filter(function (el) {
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
function initializeProjectUI(array) {
    projectArray.forEach(element => {
        const btn = document.createElement("button");
        btn.textContent = element;
        array.append(btn);
        btn.addEventListener('click', () => {
            clearUI();
            PubSub.publish('Project Filtered', arrayIndex);
        })
    });
}
function clearProjectUI() {
    while (projectList.firstChild && projectList.lastChild.id != "all") {
        projectList.removeChild(projectList.lastChild);
    }
}

export{initializeArrayUI, initializeProjectUI,}