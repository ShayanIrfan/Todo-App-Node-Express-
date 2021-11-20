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
    delBtn.setAttribute("onclick", "delTodo(this)");
    delBtn.appendChild(delTxt);
    li.appendChild(delBtn);

    ul.appendChild(li);
}

const submit = () => {
    let todo = document.getElementById("todo-input");
    axios.post('http://localhost:8080/submit', { todo: todo.value }).then(res => {
        if (res) {
            todo.value = ""
            axios.get('http://localhost:8080/todos').then(res => {
                if (res) {
                    console.log(res.data[res.data.length-1].todo);
                    create_fn(res.data[res.data.length-1].todo);
                }
            })
        }
    })
}