let myName = prompt("Enter your name: ");
let ul = document.getElementById('todo-list');

const create_fn = (data) => {
    var li = document.createElement("li");
    var liTxt = document.createTextNode(data);
    li.appendChild(liTxt);

    var editBtn = document.createElement("button");
    var editTxt = document.createTextNode("Edit");
    editBtn.setAttribute("onclick", "editTodo(this)");
    editBtn.appendChild(editTxt);
    li.appendChild(editBtn);

    var delBtn = document.createElement("button");
    var delTxt = document.createTextNode("Delete");
    delBtn.setAttribute("onclick", "deleteTodo(this)");
    delBtn.appendChild(delTxt);
    li.appendChild(delBtn);

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