let myName = prompt("Enter your name: ");
let ul = document.getElementById('todo-list');

const makeSpan = (data_icon, width, height) => {
    var span = document.createElement("span");
    span.setAttribute("class", "iconify");
    span.setAttribute("data-icon", data_icon);
    span.setAttribute("data-width", width);
    span.setAttribute("data-height", height);
    return span;
}

let taskIconSize = "25";
let editIconSize = "21.5"

const create_fn = (data) => {
    var li = document.createElement("li");
    var todoSpan = makeSpan("carbon:task", taskIconSize, taskIconSize);
    todoSpan.classList.add("todo-icon");
    li.appendChild(todoSpan);
    var div = document.createElement("div")
    div.setAttribute("class", "list-content")
    var liTxt = document.createTextNode(data);
    div.appendChild(liTxt)
    li.appendChild(div)

    var btnsDiv = document.createElement("div")
    btnsDiv.setAttribute("class", "list-btns")

    var editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit-btn ripple");
    editBtn.setAttribute("onclick", "editTodo(this)");
    editBtn.setAttribute("onmouseover", "glow(this, '#0062FF', 0)");
    editBtn.setAttribute("onmouseout", "dull(this, 0)");
    var editSpan = makeSpan("carbon:edit", editIconSize, editIconSize);
    editBtn.appendChild(editSpan);
    btnsDiv.appendChild(editBtn);

    var delBtn = document.createElement("button");
    delBtn.setAttribute("class", "ripple");
    delBtn.setAttribute("onclick", "deleteTodo(this)");
    delBtn.setAttribute("onmouseover", "glow(this, '#FF0000', 0)");
    delBtn.setAttribute("onmouseout", "dull(this, 0)");
    var delSpan = makeSpan("carbon:delete", editIconSize, editIconSize);
    delBtn.appendChild(delSpan);
    btnsDiv.appendChild(delBtn);
    li.appendChild(btnsDiv);

    ul.appendChild(li);
}

axios.get('https://todo-app-node-express.herokuapp.com/todos').then(res => {
    if (res) {
        res.data.map(v => {
            if (v.name === myName) {
                create_fn(v.todo);
            }
        })
    }
})

const submit = () => {
    let todo = document.getElementById("todo-input");
    axios.post('https://todo-app-node-express.herokuapp.com/submit', { name: myName, todo: todo.value }).then(res => {
        if (res) {
            todo.value = ""
            axios.get('https://todo-app-node-express.herokuapp.com/todos').then(res => {
                if (res) {
                    create_fn(res.data[res.data.length - 1].todo);
                }
            })
        }
    })
}

const editTodo = (e) => {
    var newVal = prompt("Enter New ToDo: ", e.parentNode.parentNode.childNodes[1].firstChild.nodeValue);
    if (newVal !== e.parentNode.parentNode.childNodes[1].firstChild.nodeValue && newVal) {
        axios.put('https://todo-app-node-express.herokuapp.com/updateTodo', { name: myName, oldTodo: e.parentNode.parentNode.childNodes[1].firstChild.nodeValue, newTodo: newVal }).then(res => {
            if (res) {
                e.parentNode.parentNode.childNodes[1].firstChild.nodeValue = res.data.todo;
            }
        })
    }
}

const deleteTodo = (e) => {
    axios.delete('https://todo-app-node-express.herokuapp.com/deleteTodo', {
        data: {
            name: myName,
            todo: e.parentNode.parentNode.childNodes[1].firstChild.nodeValue
        }
    }).then(res => {
        if (res) {
            e.parentNode.parentNode.remove();
            console.log(res.data)
        }
    })
}

const deleteAll = () => {
    const res = prompt("Do you want to delete all Todos? ", "yes");
    if (res === "yes") {
        axios.delete('https://todo-app-node-express.herokuapp.com/deleteAll', { data: { name: myName } }).then(res => {
            if (res) {
                while (true) {
                    if (ul.childNodes[1]) {
                        ul.childNodes[1].remove();
                    } else {
                        break;
                    }
                }
                console.log(res.data);
            }
        })
    }
}

const glow = (e, color, pos) => {
    e.childNodes[pos].style.filter = `drop-shadow(0px 0px 3px ${color})`;
    if (e.childNodes[3]) {
        e.childNodes[3].style.filter = `drop-shadow(0px 0px 3px ${color})`;
    }
}

const dull = (e, pos) => {
    e.childNodes[pos].style.filter = null;
    if (e.childNodes[3]) {
        e.childNodes[3].style.filter = null;
    }
}

// Media Query
function myFunction(x) {
    if (x.matches) { // If media query matches
        let addIcon = document.getElementById("add-icon");
        addIcon.setAttribute("data-width", "23");
        addIcon.setAttribute("data-height", "23");
        let delIcon = document.getElementById("delete-icon");
        delIcon.setAttribute("data-width", "23");
        delIcon.setAttribute("data-height", "23");
        let asterisk = document.getElementById("asterisk-icon");
        asterisk.setAttribute("data-width", "11");
        asterisk.setAttribute("data-height", "11");
        taskIconSize = "20";
        editIconSize = "18";
    }
}

var x = window.matchMedia("(max-width: 1280px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction);

function myFunction2(y) {
    if (y.matches) { // If media query matches
        let addIcon = document.getElementById("add-icon");
        addIcon.setAttribute("data-width", "20");
        addIcon.setAttribute("data-height", "20");
        let delIcon = document.getElementById("delete-icon");
        delIcon.setAttribute("data-width", "20");
        delIcon.setAttribute("data-height", "20");
        let asterisk = document.getElementById("asterisk-icon");
        asterisk.setAttribute("data-width", "9");
        asterisk.setAttribute("data-height", "9");
        taskIconSize = "18";
        editIconSize = "16";
    }
}

var y = window.matchMedia("(max-width: 359px)");
myFunction2(y); // Call listener function at run time
y.addListener(myFunction2);