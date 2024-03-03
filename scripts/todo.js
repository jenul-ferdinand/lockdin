import { start, stop } from '/scripts/effects/confetti.js'

document.addEventListener('DOMContentLoaded', function() {
    // Contains the add task button tag
    const addTaskButton = document.getElementById('addTaskButton');
    // Contains the todo list divider
    const todoList = document.querySelector('.todo-list');


    // Load tasks when DOM is loaded
    loadTasksFromStorage()

    // Setup task and todo system
    taskSetup()


    // FUNCTION: Save tasks strings to chrome storage array
    function saveTaskToStorage(text) {
        chrome.storage.local.get({ tasks: [] }, function (data) {
            const tasks = data.tasks || [];
            tasks.push(text);
            chrome.storage.local.set({ tasks: tasks }, function () {
                console.log('Task saved:', text)
            });
        });
    }
    
    // FUNCTION: Load and create tasks from chrome storage
    function loadTasksFromStorage() {
        chrome.storage.local.get({ tasks: [] }, function (data) {
            const tasks = data.tasks || []
            tasks.forEach(function (text) {
                createTask(text);
            });

            console.log('Loaded tasks:', tasks)
        });
    } 

    // FUNCTION: Remove tasks from chrome storage based on text
    function removeTaskFromStorage(text) {
        chrome.storage.local.get({ tasks: [] }, function (data) {
            // Store the tasks data list
            const tasks = data.tasks;
            var taskIndex = 0;

            // Store the index of the text
            taskIndex = tasks.indexOf(text); 
    

            // Check if the index is found
            if (taskIndex !== -1) {
                // Remove the task
                tasks.splice(taskIndex, 1);

                // Debugging
                console.log("Removed task:", taskIndex);
                
                // Set the chrome storage to the new task list
                chrome.storage.local.set({ tasks: tasks });
            }
        });
    }
    


    // FUNCTION: Set up task and todo system
    function taskSetup() {
        // Adding a task when we press on add task button
        addTaskButton.addEventListener('click', function() {
            // Input line (for the todo list)
            const task = document.createElement('li');
            task.className = 'task-item';
    
            // Task content
            const taskContent = document.createElement('div');
            taskContent.className = 'task-content';
    
            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-task-button';
            deleteButton.innerHTML = '&#10005;';
    
            // Input
            const input = document.createElement('textarea');
            input.className = 'new-task-input';
            input.placeholder = 'Enter Task';
            input.setAttribute('rows', '1');
            
            // Append children
            taskContent.appendChild(input);
            task.appendChild(taskContent);
            task.appendChild(deleteButton);
            todoList.appendChild(task);
    
            // Makes it so that the cursor is focused on the created text box
            input.focus();
    
            // Delete button functionality
            deleteButton.addEventListener('click', function() {
                start(50);
                stop(200);

                removeTaskFromStorage(taskContent.textContent)
                todoList.removeChild(task);
            });
    
    
            // Typing and input height management
            input.addEventListener('input', function() {      
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + 'px';
            });
    
    
            // Submitting the task
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); 
                    if (input.value.trim() !== '') {
                        const taskTextSpan = document.createElement('span');
                        taskTextSpan.className = 'task-text';
                        taskTextSpan.textContent = input.value;
                        taskContent.innerHTML = ''; 
                        taskContent.appendChild(taskTextSpan);
                        input.remove();
                    }
    
                    saveTaskToStorage(input.value)
                }
            });
        });
    }    

    // FUNCTION: Create a singular task (Used in loadTasksFromStorage)
    function createTask(text) {
        // Input line (for the todo list)
        const task = document.createElement('li');
        task.className = 'task-item';

        // Task content
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-task-button';
        deleteButton.innerHTML = '&#10005;';

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = text;
        
        // Append children
        task.appendChild(taskText);
        task.appendChild(taskContent);
        task.appendChild(deleteButton);
        todoList.appendChild(task);

        deleteButton.addEventListener('click', function () {
            console.log("Trying to remove", task)

            start(50);
            stop(200)

            removeTaskFromStorage(text);

            todoList.removeChild(task);
        });
    }
});


