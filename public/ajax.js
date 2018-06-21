// This is initial route but we do not need it because on this page only we will
//add all other functionality and hence we render the data here with our express route

// $.get('/todos',function(data){
//     debugger;
// })

// $('form').submit(function(event){
//     event.preventDefault();
//     var formData=$(this).serialize();
//     $.post('/todos', formData, function(data){
//         console.log(data);
//     });
// });

$('form').submit(function(event){
    event.preventDefault();
    var formData=$(this).serialize();
    $.post('/todos',formData,function(data){
        $('#todo-list').append(
            `
            <li class="list-group-item">
            
       		<form action="/todos/${data._id}" method="POST" id="edit-form">
				<div class="form-group">
					<label for="${data._id}">Item Text</label>
					<input type="text" value="${data.text}" name="todo[text]" class="form-control" id="${data._id}">
				</div>
				<button class="btn btn-primary">Update Item</button>
			</form>
        
				<span class="lead">
					${data.text}
				</span>
				<div class="pull-right">
					<button class="btn btn-sm btn-warning edit-button">Edit</button>
					<form style="display: inline" method="POST" action="/todos/${data._id}" class="delete-form">
						<button type="submit" class="btn btn-sm btn-danger">Delete</button>
					</form>
				</div>
				<div class="clearfix"></div>
			</li>
            `
            );
        $('#new-todo-form').find('.form-control').val('');
    });
});

$('#todo-list').on('click','.edit-button',function(){
	$(this).parent().siblings('#edit-form').toggle();	
});

$('#todo-list').on('submit','#edit-form',function(event){
	event.preventDefault();
	var todoItem=$(this).serialize();
	var actionUrl=$(this).attr('action');
	$originalItem=$(this).parent('.list-group-item');
	
	$.ajax({
		url: actionUrl,
		data: todoItem,
		type: 'PUT',
		originalItem: $originalItem,
		success: function(data){
			this.originalItem.html(
			`
				<form action="/todos/${data._id}" method="POST" id="edit-form">
					<div class="form-group">
						<label for="${data._id}">Item Text</label>
						<input type="text" value="${data.text}" name="todo[text]" class="form-control" id="${data._id}">
					</div>
					<button class="btn btn-primary">Update Item</button>
				</form>
	
				<span class="lead">
					${data.text}
				</span>
				<div class="pull-right">
					<button class="btn btn-sm btn-warning edit-button">Edit</button>
					<form style="display: inline" method="POST" action="/todos/${data._id}" class="delete-form">
						<button type="submit" class="btn btn-sm btn-danger">Delete</button>
					</form>
				</div>
				<div class="clearfix"></div>
			`
			);
		}
	});
});

$('#todo-list').on('submit','.delete-form',function(event){
	event.preventDefault();
	var confirmResponse=confirm('Are you sure?');
	if(confirmResponse){
		var actionUrl=$(this).attr('action');
		$itemToDelete=$(this).closest('.list-group-item');
		
		$.ajax({
			url: actionUrl,
			type: 'DELETE',
			itemToDelete: $itemToDelete,
			success: function(data){
				this.itemToDelete.remove();
			}
		});
	}else{
		$(this).find('button').blur();
	}
});

// $('form').submit(function(event){
//     event.preventDefault();
//     var formData=$(this).serialize();
//     var formAction=$(this).attr('action');
    
//     $.ajax({
//         url: formAction,
//         data: formData,
//         type: 'PUT',
//         success: function(data){
//             console.log(data);
//         }
//     });
// });

// $('form').submit(function(event){
//     event.preventDefault();
//     var formAction=$(this).attr('action');
//     $.ajax({
//         url: formAction,
//         type: 'DELETE',
//         success: function(data){
//             console.log(data);
//         }
//     });
// });