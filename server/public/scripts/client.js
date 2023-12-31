console.log( 'js' );

$( document ).ready( function(){
    console.log( 'JQ' );
$('#addButton').on('click', clicklisteners)
$('#viewTasks').on('click', '.deleteButton', deleteTask)
$('#viewTasks').on('click', '.markAsDoneBtn', checkComp)
$('#viewTasks').on('click', '.markAsDoneBtn', markDone)


    getTasks();
});


function checkComp(event){
    event.preventDefault();
   // const checkTask = $(this).data( 'id' );
    //console.log(checkTask.itemDone);

    $(this).parent().parent().addClass("done")
  
}


function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/toDoItems'
    }).then( function(response) {
        render(response);
    }).catch(function(err) {
        alert('Error getting tasks')
    })
}

function clicklisteners() {
    
        console.log ('in addButton on click');

        let taskToSend = {
            itemName: $('#nameIn').val(),
            itemDone: false
        }
        console.log(taskToSend);
        $.ajax({
            type: 'POST',
            url: '/toDoItems',
            data: taskToSend
        }).then ( function (response) {
            console.log('back from post:', response)
            $('#nameIn').val(''),
            $('#completeIn').val('')
            getTasks();
        }).catch(function (err){
            alert('error adding function')
        })
    }


 function render(Tasks){
     let el = $('#viewTasks');
     el.empty();

     for( let i=0; i<Tasks.length; i++){
         el.append(`
         <tr class=${Tasks[i].itemDone ? 'done' : ''}>
         <td>${Tasks[i].itemName}</td> 
         <td>${Tasks[i].itemDone}</td>
         <td ><button class="markAsDoneBtn"
         data-id="${Tasks[i].id}"
         data-marking="${Tasks[i].marking}">
         Complete Task
         </button></td>
        <td> <button class="deleteButton" data-id="${Tasks[i].id}">Delete</button></td>
         </tr>
         `)
     }
    
 }

 function deleteTask(){
    const id = $(this).data('id');
    console.log('in deleteTask:', id);
    $.ajax({
        type: 'DELETE',
        url: `/toDoItems/${id}`
    }).then(function (response) {
        console.log('back from delete', response);
        getTasks();
    }).catch(function (err) {
        alert('Error with delete:', err);
    })
 }

 function markDone(){
    const markid= $(this).data( 'id' );

    console.log( 'in markDone:', markid);
    $.ajax({
        type: 'PUT',
        url: `/toDoItems/${markid}`,
    }).then(function (response) {
        console.log('back from PUT:', response);
        getTasks();
    }).catch(function (err) {
        alert ('error updating:', err);
    })
 }

// function getTasks(){
//     console.log('in getTasks')
//     $('#viewTasks').empty();
//     $.ajax({
//         type: 'GET',
//         url: '/toDoItems'
//     }).then( function ( response ) {
//         for (let i = 0; i < response.length; i++){
//             let newTask = $(`
//             <li>
//          ${response[i].itemName} ${response[i].itemDone}
//          <button class="markAsDoneBtn"> Mark as Done
//          </button>
//          <button class="deleteButton">Delete</button>
//          </li>
//             `)
//             newTask.data('id',response[i].id)
//             $('#viewTasks').append(newTask)
//         }
//     })
// }

// function markDone(){
//     const id= $(this).data( 'id' );
//     const markStatus = $(this).data('marking');
//     console.log( 'in markDone:', id, markStatus);
//     $.ajax({
//         type: 'PUT',
//         url: `/toDoItems/${id}`,
//         data: {newMarking: !markStatus}
//     }).then(function (response) {
//         console.log('back from PUT:', response);
//         getTasks();
//     }).catch(function (err) {
//         alert ('error updating:', err);
//     })
//  }




// { <td><button class="markAsDoneBtn"
//          data-id="${Tasks[i].id}"
//          data-marking="${Tasks[i].marking}">
//          Complete Task
//          </button></td> }