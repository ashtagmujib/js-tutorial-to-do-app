const outputsTab = document.querySelector('.outputs-tab')
const taskInput = document.getElementById('task-input');
const addTask = document.getElementById('add-task');



addTask.addEventListener('click', e => {

    if(taskInput.value != '') {

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

    }
    
    else {
        alert('please enter task')
    }


})


outputsTab.addEventListener('click', e => {
    let target = e.target.parentElement;

    // delete event
    if(e.target.matches('#delete-btn')) {
        target.classList.add('deleted');

        setTimeout(() => {
            outputsTab.removeChild(target)
        }, 800);

    } 


    // completed event
    else if (e.target.matches('#check-btn')) {
        // add complete state to task
        target.classList.add('completed');

        // create check circle
        let done = document.createElement('span');
        done.id = 'check-circle';
        // append to parent
        document.getElementById('check-btn').appendChild(done);
    }
    else {
        target.classList.remove('completed');
    }
    
})




