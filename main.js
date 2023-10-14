const outputsTab = document.querySelector('.outputs-tab'),
    taskData = document.querySelector('.task-data'),
    taskCount = document.querySelector('.task-count'),
    completeCount = document.querySelector('.complete-count'),
    taskInput = document.getElementById('task-input'),
    addTask = document.getElementById('add-task'),

    filterTab = document.querySelector('.filter'),
    filterAll = document.querySelector('.filter-all'),
    filterComplete = document.querySelector('.filter-complete'),
    filterIncomplete = document.querySelector('.filter-incomplete'),
    filterActive = document.querySelector('.filter-active'),
    taskStore = [];
;



addTask.addEventListener('click', e => {

    // validate input
    const setError = (element, message) => {
        const inputcontrol = element.parentElement;
        errorDisplay = inputcontrol.querySelector('.error');
    
        errorDisplay.innerText = message;
        inputcontrol.classList.add('error');
        inputcontrol.classList.remove('success');
    }

    const setSuccess = element => {
        const inputcontrol = element.parentElement;
        errorDisplay = inputcontrol.querySelector('.error');
    
        errorDisplay.innerText = '';
        inputcontrol.classList.remove('error');
        inputcontrol.classList.add('success');
    }

    if(taskInput.value != '') {
        // set success state 
        setSuccess (taskInput);

        // create output elements
        const task = document.createElement('div');
        task.classList = 'task';

        const checkBtn = document.createElement('span');
        checkBtn.id = 'check-btn';

        const taskoutput = document.createElement('p');
        taskoutput.id = 'task-output';

        const deleteBtn = document.createElement('span');
        deleteBtn.id = 'delete-btn';
        deleteBtn.innerText = 'X';


        // append children to task bar
        task.appendChild(checkBtn);
        task.appendChild(taskoutput);
        task.appendChild(deleteBtn);

        // append taskbar to outputs tab in DOM
        outputsTab.appendChild(task);

        // get input value and display in output tab
        let taskDts = taskInput.value;
        taskoutput.innerText = taskDts;

        // clear inputab
        taskInput.value = '';


        // add task count
        let toDo = Array.from(document.querySelectorAll('.task'));
        taskCount.innerText = `${toDo.length} task added`;


        // add task to local storage
        taskStore.push(taskDts);
        localStorage.setItem('task', JSON.stringify(taskStore));

    }
    
    else {
       setError (taskInput, 'field cannot be empty'); 
    }

});



let parsedTask = JSON.parse(localStorage.getItem('task'));

//console.log(parsedTask)
//console.log(localStorage)

if (parsedTask) {
    parsedTask.forEach(todo => {
        // create output elements
        const task = document.createElement('div');
        task.classList = 'task';

        const checkBtn = document.createElement('span');
        checkBtn.id = 'check-btn';

        const taskoutput = document.createElement('p');
        taskoutput.id = 'task-output';

        const deleteBtn = document.createElement('span');
        deleteBtn.id = 'delete-btn';
        deleteBtn.innerText = 'X';


        // append children to task bar
        task.appendChild(checkBtn);
        task.appendChild(taskoutput);
        task.appendChild(deleteBtn);

        // append taskbar to outputs tab in DOM
        outputsTab.appendChild(task);

        // get input value and display in output tab
        let taskDts = taskInput.value;
        taskoutput.innerText = todo;
    })
}


outputsTab.addEventListener('click', e => {
    let target = e.target.parentElement;

    // delete event
    if(e.target.matches('#delete-btn')) {
        target.classList.add('deleted');

        setTimeout(() => {
            outputsTab.removeChild(target)
        }, 800);

        // remove from task count
        let toDo = Array.from(document.querySelectorAll('.task'));
        let finished = Array.from(document.querySelectorAll('.completed'));

        taskCount.innerText = `${toDo.length -1}  task added`;

        if(target.classList.contains('completed')) {
            completeCount.innerText = `${finished.length -1}  completed`;
        }
    } 


    // completed event
    else if (e.target.matches('#check-btn')) {
        // add complete state to task
        target.classList.add('completed');

        // create div for completed task count
        let finished = Array.from(document.querySelectorAll('.completed'));
        completeCount.innerText = `${finished.length}  completed`;
        
    }
    else {
        let finished = Array.from(document.querySelectorAll('.completed'));
        target.classList.remove('completed');
        completeCount.innerText = `${finished.length -1}  completed`;
    }
    
    
})




// filter items
filterTab.addEventListener('click', e => {
    let complete = document.querySelector('.completed');
    let task = Array.from(document.querySelectorAll('.task'));

    if(e.target.classList.contains('filter-complete')) {

        task.forEach(todo => {
            if(todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            } 
            else {
                todo.style.display = 'none';
                //outputsTab.removeChild(todo);
            }
        });
        
    }

    if(e.target.classList.contains('filter-incomplete')) {

        task.forEach(todo => {
            if(todo.classList.contains('completed')) {
                //outputsTab.removeChild(todo);
                todo.style.display = 'none';
            } 
            else {
                todo.style.display = 'flex';
            }
        });
        
    } 

    if (e.target.classList.contains('filter-all')){
        task.forEach(todo => {
            todo.style.display = 'flex';
        });
    }
   

})


