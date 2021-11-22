// let myName = prompt("Enter your name: ");
let myName = "Shayan";
let ul = document.getElementById('todo-list');

const makeSpan = (data_icon, width = "20", height = "20") => {
    var span = document.createElement("span");
    span.setAttribute("class", "iconify");
    span.setAttribute("data-icon", data_icon);
    span.setAttribute("data-width", width);
    span.setAttribute("data-height", height);
    return span;
}

const create_fn = (data) => {
    var li = document.createElement("li");
    var todoSpan = makeSpan("carbon:task", "25", "25");
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
    var editSpan = makeSpan("carbon:edit");
    editBtn.appendChild(editSpan);
    btnsDiv.appendChild(editBtn);

    var delBtn = document.createElement("button");
    delBtn.setAttribute("class", "ripple");
    delBtn.setAttribute("onclick", "deleteTodo(this)");
    var delSpan = makeSpan("carbon:delete");
    delBtn.appendChild(delSpan);
    btnsDiv.appendChild(delBtn);
    li.appendChild(btnsDiv);

    ul.appendChild(li);
}

axios.get('http://localhost:8080/todos').then(res => {
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
    axios.post('http://localhost:8080/submit', { name: myName, todo: todo.value }).then(res => {
        if (res) {
            todo.value = ""
            axios.get('http://localhost:8080/todos').then(res => {
                if (res) {
                    console.log(res.data[res.data.length - 1].todo);
                    create_fn(res.data[res.data.length - 1].todo);
                }
            })
        }
    })
}

const editTodo = (e) => {
    var newVal = prompt("Enter New ToDo: ", e.parentNode.firstChild.nodeValue);
    axios.put('http://localhost:8080/updateTodo', { name: myName, oldTodo: e.parentNode.firstChild.nodeValue, newTodo: newVal }).then(res => {
        if (res) {
            e.parentNode.firstChild.nodeValue = res.data.todo;
        }
    })
}

const deleteTodo = (e) => {
    console.log(e.parentNode.firstChild.nodeValue)
    axios.delete('http://localhost:8080/deleteTodo', {
        data: {
            name: myName,
            todo: e.parentNode.firstChild.nodeValue
        }
    }).then(res => {
        if (res) {
            e.parentNode.remove();
            console.log(res.data)
        }
    })
}