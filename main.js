const outputsTab = document.querySelector('.outputs-tab'),
    taskData = document.querySelector('.task-data'),
    taskCount = document.querySelector('.task-count'),
    completeCount = document.querySelector('.complete-count'),
    taskInput = document.getElementById('task-input'),
addTask = document.getElementById('add-task');
let storedTask = [ ];



addTask.addEventListener('click', e => {

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

        // add task values to local storage
       /* if(toDo.length > -1) {
            storedTask.push(taskDts);
        }

        localStorage.setItem('store',JSON.stringify(storedTask)); */
    }
    
    else {
       setError (taskInput, 'field cannot be empty'); 
    }

});


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




