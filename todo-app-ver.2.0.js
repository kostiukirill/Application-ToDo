(function () {

    let todoItems = [],
    toDoItemName = '';

    function createToDoTitle(title) {
        let todoTitle = document.createElement('h2');
        todoTitle.innerHTML = title;
        return todoTitle;
    }
    
    function createToDoForm () {
        let todoForm = document.createElement('form');
        let todoInput = document.createElement('input');
        let todoBtn = document.createElement('button');
        let todoBtnWrapper = document.createElement('div');
    
        todoForm.classList.add('input-group', 'mb-3');
        todoInput.classList.add('form-control');
        todoInput.placeholder = 'Введите навзание нового дела';
        todoBtnWrapper.classList.add('input-group-append');
        todoBtn.classList.add('btn', 'btn-primary');
        todoBtn.disabled = true;
        todoBtn.textContent = 'Добавить дело';
        todoBtnWrapper.append(todoBtn);
        todoForm.append(todoInput);
        todoForm.append(todoBtnWrapper);
    
        todoInput.addEventListener('input', function () {
            if(todoInput.value !== "") {
                todoBtn.disabled = false;
            } else {
                todoBtn.disabled = true;
            }
        })
    
        return {
            todoBtn,
            todoInput,
            todoForm,
        };
    }
    
    
    function createToDoList () {
        let todoList = document.createElement('ul');
        todoList.classList.add('list-group');
        return todoList;
    }
    
    
    function createToDoItem (obj) {
        let todoItem = document.createElement('li');
        let itemBtnBlock = document.createElement('div');
        let itemDoneBtn = document.createElement('button');
        let itemDelBtn = document.createElement('button');
        todoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        todoItem.textContent = obj.name;
        
        itemBtnBlock.classList.add('btn-group', 'btn-group-sm');
        itemDoneBtn.classList.add('btn', 'btn-success');
        itemDoneBtn.textContent = 'Готово';
        itemDelBtn.classList.add('btn', 'btn-danger');
        itemDelBtn.textContent = 'Удалить';
    
        if(obj.done == true) {
            todoItem.classList.add('list-group-item-success');
        }
        
        itemDoneBtn.addEventListener('click', function () {
            if(obj.done == false) {
                todoItem.classList.add('list-group-item-success');
            } else {
                todoItem.classList.remove('list-group-item-success');
            }
            const itemName = todoItem.firstChild.textContent;
            for (const item of todoItems) {
                if(item.name == itemName) {
                    item.done = !item.done;
                }
            }
            localStorage.setItem(toDoItemName, JSON.stringify(todoItems));
            console.log(todoItems);
        })
        
        
        itemDelBtn.addEventListener('click', function () {
            if(confirm('Вы уверены?')) {
                todoItem.remove();
                const itemName = todoItem.firstChild.textContent;
                for (let i = 0; i < todoItems.length; ++i) {
                    if(todoItems[i].name == itemName) {
                        todoItems.splice(i, 1);
                    }
                }
            }
            localStorage.setItem(toDoItemName, JSON.stringify(todoItems));
            console.log(todoItems);
        })
        
        itemBtnBlock.append(itemDoneBtn);
        itemBtnBlock.append(itemDelBtn);
        
        todoItem.append(itemBtnBlock);
        
        return {
            todoItem,
            itemDoneBtn,
            itemDelBtn,
        };
    
    }

    function createToDoApp(todoPage, title, memberName, firstDo, secondDo) {
        toDoItemName = memberName;
    
        let todoPageTitle = createToDoTitle(title);
        let todoItemForm = createToDoForm();
        let todoPageList = createToDoList();

            todoPage.append(todoPageTitle);
            todoPage.append(todoItemForm.todoForm);
            todoPage.append(todoPageList);

        
        todoItems.push(firstDo);
        todoItems.push(secondDo);
        todoList.append(createToDoItem(firstDo).todoItem);
        todoList.append(createToDoItem(secondDo).todoItem);
        

        
        todoItemForm.todoForm.addEventListener('submit', function (e) {
    
            e.preventDefault();
    
            if(!todoItemForm.todoInput.value) {
                return;
            } 
            
            let newDo = {
                name: todoItemForm.todoInput.value,
                done: false
            }
            
            todoItemBlock = createToDoItem(newDo);
        
            todoList.append(todoItemBlock.todoItem);
            todoItems.push(newDo);
            localStorage.setItem(toDoItemName, JSON.stringify(todoItems));
            console.log(todoItems);
            
            todoItemForm.todoBtn.disabled = true;
            todoItemForm.todoInput.value = '';    

            })
            let restoreToDoes = JSON.parse(localStorage.getItem(toDoItemName));
            if(restoreToDoes != null) {
            for(let toDo = 0; toDo < restoreToDoes.length; ++toDo) {
                if(restoreToDoes[toDo].name != firstDo.name && restoreToDoes[toDo].name != secondDo.name) {
                    
                    todoItems.push(restoreToDoes[toDo]);
                    todoList.append(createToDoItem(restoreToDoes[toDo]).todoItem);
                }
            } 
        }
            console.log(restoreToDoes);
        }
        window.createToDoApp = createToDoApp;
}) ();
