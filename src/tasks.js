const content = document.getElementById("content");
import { compareAsc, format } from "date-fns";
import PubSub from 'pubsub-js'

class Card {
    constructor (name,description,dueDate,project,priority){
        this._name = name;
        this._description = description;
        this._dueDate = dueDate;
        this._project = project.toUpperCase();
        this._priority = priority;
        createdCard(this);
    }
    set name(name){
        this._name = name;
        publishCard(this);
    }

}
function publishCard(card){
    PubSub.publish('Card Changed', card);
}
function createdCard(card){
    PubSub.publish('Card Created', card);
}
export {Card};