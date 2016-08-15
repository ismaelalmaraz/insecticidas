
$(function() {
    var client = new WindowsAzure.MobileServiceClient('https://grupou.azure-mobile.net/', 'bBFEkJkkODZxJhmWCrxgePpbZvzEEz53'),
        todoItemTable = client.getTable('cultivo');

    function refreshTodoItems() {
        var query = todoItemTable.where({});

	

        query.read().then(function(todoItems) {
			
            var listItems = $.map(todoItems, function(item) {

			
                return $('<li>')
                    .attr('data-cultivo-id', item.id)
                    .append($('<button class="item-delete">Delete</button>'))
                    .append($('<div>').append($('<input class="item-rancho">').val(item.rancho))
									.append($('<input class="item-lote">').val(item.lote))
									.append($('<input class="item-tipo_cultivo">').val(item.tipo_cultivo))
									.append($('<input class="item-dimension">').val(item.dimension))
									.append($('<input class="item-fecha_de_creacion">').val(item.fecha_de_creacion))
									.append($('<input class="item-fecha_actual">').val(item.fecha_actual))
									.append($('<input class="item-dias">').val(item.dias))
									.append($('<input class="item-insecticida">').val(item.insecticida)));
            });

            $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
            $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
        }, handleError);
    }
	
    function handleError(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        $('#errorlog').append($('<li>').text(text));
    }

    function getTodoItemId(formElement) {
        return $(formElement).closest('li').attr('data-cultivo-id');
    }  
		
    // Handle insert
    $('#add-item').submit(function(evt) {
        var textbox = $('#new-item-RANCHO');
            itemrancho = textbox.val().toUpperCase();
        var textbox2 = $('#new-item-LOTE');
            itemlote = textbox2.val().toUpperCase();
        var textbox3 = $('#new-item-CULTIVO');
            itemtipo_cultivo = textbox3.val();
		var textbox4 = $('#new-item-DIMENSIONES');
            itemdimension = textbox4.val();
		var textbox5 = $('#new-item-FECHA_DE_CREACION');
            itemfecha_de_creacion = textbox5.val();	
		var textbox6 = $('#new-item-FECHA_ACTUAL');
            itemfecha_actual = textbox6.val();	
		var textbox7 = $('#new-item-DIAS');
            itemdias = textbox7.val();	
		var textbox8 = $('#new-item-INSECTICIDAS');
            iteminsecticida = textbox8.val();	


 var aFecha1 = itemfecha_de_creacion.split('/'); 
 var aFecha2 = itemfecha_actual.split('/'); 
 var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]); 
 var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]); 
 var dif = fFecha2 - fFecha1;
 var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
 
        if (itemrancho !== '' && itemlote!=='' && itemtipo_cultivo !=='' && itemdimension !=='' && itemfecha_de_creacion !=='' && itemfecha_actual !=='' && itemdias !=='' && iteminsecticida !=='') {
            todoItemTable.insert({ rancho: itemrancho, lote: itemlote, tipo_cultivo: itemtipo_cultivo,dimension: itemdimension,  fecha_de_creacion: itemfecha_de_creacion, fecha_actual: itemfecha_actual, dias: itemdias ,insecticida: iteminsecticida, complete: false }).then(refreshTodoItems, handleError);
        }else{
			alert("Por favor no deje ningun campo vacío");
		}
        textbox.val('').focus();
		textbox2.val('').focus();
		textbox3.val('').focus();
		textbox4.val('').focus();
		textbox5.val('').focus();
		textbox6.val('').focus();
		textbox7.val('').focus();
		textbox8.val('').focus();
        evt.preventDefault();
    });

    // Handle update
    $(document.body).on('change', '.FECHA_ACTUAL', function() {
		var textbox7 = $('#new-item-DIAS');
        var textbox5 = $('#new-item-FECHA_DE_CREACION');
		var textbox6 = $('#new-item-FECHA_ACTUAL');

calcularDias(textbox5.val(),textbox6.val());
            	
			/*var date1 = new Date();
			var date2 = new Date();


			var diffDays = date2 - date1;
			itemdias = textbox7.val(diffDays);*/
 		//alert(diffDays);
 		
    });
    
    $(document.body).on('change', '.item-rancho', function() {
        var newText = $(this).val().toUpperCase();
        todoItemTable.update({ id: getTodoItemId(this), rancho: newText }).then(refreshTodoItems, handleError);
    });
	$(document.body).on('change', '.item-lote', function() {
        var newText = $(this).val();
        todoItemTable.update({ id: getTodoItemId(this), lote: newText }).then(refreshTodoItems, handleError);
    });
	$(document.body).on('change', '.item-tipo_cultivo', function() {
        var newText = $(this).val().toUpperCase();
        todoItemTable.update({ id: getTodoItemId(this), tipo_cultivo: newText }).then(refreshTodoItems, handleError);
    });
	$(document.body).on('change', '.item-dimension', function() {
        var newText = $(this).val().toUpperCase();
        todoItemTable.update({ id: getTodoItemId(this), dimension: newText }).then(refreshTodoItems, handleError);
    });
	$(document.body).on('change', '.item-fecha_de_creacion', function() {
        var newText = $(this).val().toUpperCase();
        todoItemTable.update({ id: getTodoItemId(this), fecha_de_creacion: newText }).then(refreshTodoItems, handleError);
    });
    $(document.body).on('change', '.item-fecha_actual', function() {
        var newText = $(this).val().toUpperCase();
        todoItemTable.update({ id: getTodoItemId(this), fecha_actual: newText }).then(refreshTodoItems, handleError);
    });
    $(document.body).on('change', '.item-dias', function() {
        var newText = $(this).val().toUpperCase();
        todoItemTable.update({ id: getTodoItemId(this), dias: newText }).then(refreshTodoItems, handleError);
    });
    $(document.body).on('change', '.item-insecticida', function() {
        var newText = $(this).val().toUpperCase();
        todoItemTable.update({ id: getTodoItemId(this), insecticida: newText }).then(refreshTodoItems, handleError);
    });
    
    
	//$(document.body).on('change', '.item-dimension', function() {
      //  var isComplete = $(this).prop('checked');
        //todoItemTable.update({ id: getTodoItemId(this), dimension: isComplete }).then(refreshTodoItems, handleError);
    //});
	
    // Handle delete
    $(document.body).on('click', '.item-delete', function () {
        todoItemTable.del({ id: getTodoItemId(this) } ).then(refreshTodoItems, handleError);
    });

    // On initial load, start by fetching the current data
    refreshTodoItems();
});

function isValidDate(day,month,year)
	{
		var dteDate;
		month=month-1;
		dteDate=new Date(year,month,day);
		return ((day==dteDate.getDate()) && (month==dteDate.getMonth()) && (year==dteDate.getFullYear()));
	}
	
function validate_fecha(fecha)
	{
		var patron=new RegExp("^([0-9]{1,2})([/])([0-9]{1,2})([/])(19|20)+([0-9]{2})$");
 
		if(fecha.search(patron)==0)
		{
			var values=fecha.split("/");
			if(isValidDate(values[0],values[1],values[2]))
			{
				return true;
			}
		}
		return false;
	}
	
function calcularDias(fecha1,fecha2)
    {
  
		var fechaInicial=fecha1;
		var fechaFinal=fecha2;
		var resultado="";
		if(validate_fecha(fechaInicial) && validate_fecha(fechaFinal))
		{
			inicial=fechaInicial.split("/");
			final=fechaFinal.split("/");
			// obtenemos las fechas en milisegundos
			var dateStart=new Date(inicial[2],(inicial[1]-1),inicial[0]);
            var dateEnd=new Date(final[2],(final[1]-1),final[0]);
            if(dateStart<dateEnd)
            {
				// la diferencia entre las dos fechas, la dividimos entre 86400 segundos
				// que tiene un dia, y posteriormente entre 1000 ya que estamos
				// trabajando con milisegundos.
				resultado=(((dateEnd-dateStart)/86400)/1000);
			}else{
				resultado="La fecha inicial es posterior a la fecha final";
			}
		}else{
			if(!validate_fecha(fechaInicial))
				resultado="La fecha inicial es incorrecta";
			if(!validate_fecha(fechaFinal))
				resultado="La fecha final es incorrecta";
		}
		var textbox8 = $('#new-item-INSECTICIDAS');
		
		if(resultado>1 && resultado<=20)
		{textbox8.val("INSECTICIDA X");}
		
		if(resultado>21 && resultado<=30)
		{textbox8.val("INSECTICIDA Y");}
		
		if(resultado>31 && resultado<=50)
		{textbox8.val("INSECTICIDA Z");}
		
		if(resultado>51 )
		{textbox8.val("INSECTICIDA N");}
		
		var textbox7 = $('#new-item-DIAS');
		itemdias = textbox7.val(resultado);
    }