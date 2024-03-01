document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('addTaskButton');
    addTaskButton.addEventListener('click', function() {
        
        if (document.activeElement.className === 'new-task-input') {
            return;
        }

        const todoList = document.querySelector('.todo-list');

        const newInputLi = document.createElement('li');
        newInputLi.className = 'task-item';

        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        const newInput = document.createElement('textarea');
        newInput.className = 'new-task-input';
        newInput.placeholder = 'Enter new task';
        newInput.setAttribute('rows', '1');
        taskContent.appendChild(newInput);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-complete-checkbox';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-task-button';
        deleteButton.innerHTML = '&#10005;';

        deleteButton.addEventListener('click', function() {
            todoList.removeChild(newInputLi);
        });

        newInputLi.appendChild(checkbox);
        newInputLi.appendChild(taskContent);
        newInputLi.appendChild(deleteButton);
        todoList.appendChild(newInputLi);

        newInput.focus();

        newInput.addEventListener('input', function() {
            newInput.style.height = 'auto';
            newInput.style.height = newInput.scrollHeight + 'px';
        });

        newInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); 
                if (newInput.value.trim() !== '') {
                    const taskTextSpan = document.createElement('span');
                    taskTextSpan.className = 'task-text';
                    taskTextSpan.textContent = newInput.value;
                    taskContent.innerHTML = ''; 
                    taskContent.appendChild(taskTextSpan);
                    newInput.remove();
                }
            }
        });

        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                taskContent.querySelector('.task-text').style.textDecoration = 'line-through';
            } else {
                taskContent.querySelector('.task-text').style.textDecoration = 'none';
            }
        });
    });
});
