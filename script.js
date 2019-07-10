	var accionEscritores = function(){
		var evento = $(this);
		var div = $('<div></div>').addClass('container');
		$.ajax({
					method: "GET",
					url: "http://dataserverdaw.herokuapp.com/escritores/frases",
					dataType:"json",
					success:function(json){
					for(var i = 0;i<json["frases"].length;i++){
						if(json["frases"][i]["id_autor"] == evento.attr("id")){
							div.text(json["frases"][i]["texto"]);
							
						}

					}
						
					}
				});
		console.log($(this));
		
		
		if($(this).parent().attr("id") == "activado"){
					 $(this).parent().attr("id","");
					 $(this).parent().next().remove();
					 $(this).attr("atributo","");
					 
				 }else{
					 $(this).parent().attr("id","activado");
					 $(this).parent().after( div );
					 $(this).attr("atributo","seleccionado");
				 }
		
	}
	
	
	
	var cargarEscritores = function(){
		 $.ajax({
		dataType: "json",	 
        url: "http://dataserverdaw.herokuapp.com/escritores",
		
        success: function(respuesta) {
			var row = $('<div></div>').addClass('row');
				for (var i=0;i<respuesta["escritores"].length;i++){
					if(i%5 == 0){
						row = $('<div></div>').addClass('row');
						
					}
					
					var div = $('<div></div>').addClass('col-md-2');
					  div.addClass('escritor');
					 div.text(respuesta["escritores"][i]["nombre"]+" "+respuesta["escritores"][i]["id"]);
					 div.attr("id",respuesta["escritores"][i]["id"]);
					 //div.on("click",accionEscritores);
					 
					 
					 row.append(div);
					 $("#escritores").append(row);
					 
					
					
					
				}
			}
		});
		$("body").on("click",".escritor",accionEscritores)
	}
	
	var app = new Vue ({
			el: '#escritores',
			data: {
				message: cargarEscritores()
			},
			
		});
			
	