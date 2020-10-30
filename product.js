  
   var values = [];
   
   function showProduct(){
	   e('log').innerHTML += 'Show Product::<br>';
	  var fields = e('parameters').getElementsByClassName('field');
	   for(var a=0;a<fields.length;a++){
		   e('log').innerHTML += fields[a].getElementsByTagName('input')[0].value+'::<textarea>'+values[a]+'</textarea><br>';
	   }
   }
   
   function saveProduct(url){
   var f = new FormData();
	    f.append('url',url);
	   
   var fields = e('parameters').getElementsByClassName('field');
	   
	   for(var a=0;a<fields.length;a++){
		   f.append(fields[a].getElementsByTagName('input')[0].value,values[a]);
	   }
   sendform('feature/aggregation/lite/newProduct.php',f);
   }


   function saveProduct_2(url,index){
   var f = new FormData();
	   
     f.append('url',url.value); 
     f.append('brand','auto');
     f.append('category','auto');
     f.append('comments','auto');  
	   
	   var fields = e('parameters').getElementsByClassName('field');
	   for(var a=0;a<fields.length;a++){
		     f.append(fields[a].getElementsByTagName('input')[0].value,
			      getName(fields[a].getElementsByTagName('input')[3].value.split(','),index).value);
	   }   
														       
   sendform('feature/aggregation/lite/newProduct.php',f);
   }

   function saveProduct_3(url,hh,pp,bb,ca,ii,dd,cc){
   var f = new FormData();
   
   f.append('url',url.value);
   f.append('heading',hh.value);
   f.append('price',pp.value);
	 
   f.append('brand',(bb?bb.value:'auto'));
   f.append('category',(ca?ca.value:'auto'));
	
   f.append('images',ii);
   f.append('description',dd.value);
   f.append('comments',(cc?cc.value:'auto'));
   
   sendform('feature/aggregation/lite/newProduct.php',f);
   }
   
   function clearProduct(){
   values = [];
   }
   
   function fetch_field(text,index,elements,names,size){
	   var vv = '';
	   for(var b=0;b<elements.length && !vv;b++){
		  
		   var headings = text.split(elements[b]);
      if(headings){

	 for(var a=0;a<headings.length && (index=='-1'?true:(a>parseInt(index.split('-')[0]) && a<parseInt(index.split('-')[1])?true:false));a++){
		
		
		var narrow = (headings[a].length>300?headings[a].substring(0,300):headings[a]);
		 
		 for(var c=0;c<names.length;c++){
			 
		//	  e('log').innerHTML += '<textarea>'+narrow+'</textarea> '+names[c]+'<br>';	
			 
			 if(narrow.indexOf(names[c])!=-1){
                    
		// narrow.search(/$(>.*<)/);narrow.search(/>[A-Za-z0-9]{15,40}</); narrow.indexOf('>')+1
				 
        var start =  narrow.indexOf('>',0)+1;
				 
	var endElement = elements[b].substring(0,1)+'/'+elements[b].substring(1,elements[b].length);
				 	 
	var ss = narrow.substring (start, narrow.indexOf(endElement,start)); //.trim();
    
				if(ss.length>size){ // && ss.indexOf('>')==-1
				   
		  vv = ss;		 
			
		  e('log').innerHTML += '<div>('+a+')<textarea>'+narrow+'</textarea> '+names[c]+'<br><a href=# onclick="this.parentNode.className=\'block\';if(confirm(\'remove\')){this.parentNode.remove();}return false;" >xx</a></div>';	
			
		e('log').innerHTML += '<div><textarea id='+names[c]+'_'+ind+' >'+vv+'</textarea> '+getFieldFetch(names[c])+'<a href=# onclick="this.parentNode.className=\'block\';if(confirm(\'remove\')){this.parentNode.remove();}return false;" >xx</a></div>';	
					
			 
				 }
        		 }
		 } 
      }
	}   
		   
	   }
	   return vv;
   }

function getFieldFetch(name_){
	var fff = '';
	 var fields = e('parameters').getElementsByClassName('field');
	   for(var a=0;a<fields.length;a++){
		  fff += 'getName(fields[a].getElementsByTagName(\'input\')[3].value.split(\',\'),'+ind+'),';
	   }
	
		    if(fields.length==7){
 return '<a href=# onclick="saveProduct_3(e(\'link_'+ind+'\'),'+fff+');return false;" >'+name_+'</a><br>';
		    }else{
 return '<a href=# onclick="saveProduct_2(e(\'link_'+ind+'\'),'+ind+');return false;" >'+name_+'</a><br>';    
		    }
}

	
function getName(names,ind){
	var ii = 0;
	var nn = e(names[ii]+'_'+ind);
	while(!nn && ii<names.length){
		ii++;
		nn = e(names[ii]+'_'+ind);
	      }
	return nn;
}

 function fetch_field_2(text,index,elements,names,size){
	 var ss = '';  
	 var vv = '';
	   for(var b=0;b<elements.length;b++){
		  
		   var headings = text.split(elements[b]);
      if(headings){
	      
	for(var a=0;a<headings.length && (index=='-1'?true:(a>parseInt(index.split('-')[0]) && a<parseInt(index.split('-')[1])?true:false));a++){
		 
		var narrow = headings[a];//(headings[a].length>3000?headings[a].substring(0,3000):headings[a]);
		
		 for(var c=0;c<names.length;c++){
			 if(narrow.indexOf(names[c])!=-1){
		
            //e('log').innerHTML += '<textarea>'+narrow+'</textarea> description<br>';
	   //narrow.search(/>[A-Za-z\s]{100,1000}</); 
	    var start = narrow.indexOf('>');
	    var endElement = elements[b].substring(0,1)+'/'+elements[b].substring(1,elements[b].length);
				 
				 ss += '('+a+')'+narrow.substring( start, narrow.indexOf(endElement,start)).trim()+';;';
				 		 
			 }
	        } 
      }
	}   
	   }
	 
	  if(ss.length>size){    
		  vv = ss;		 
		e('log').innerHTML += '<textarea id='+names[0]+'_'+ind+' >'+vv.replace(/"/g,'')+'</textarea> '+getFieldFetch(names[0]);	
	  }
	   return vv;
   }


   function fetch_product(url,text){
      
      e('log').innerHTML += '<textarea id=link_'+ind+' >'+url+'</textarea> Fetch Product<br>';

	   var fields = e('parameters').getElementsByClassName('field');
	   
	   for(var a=0;a<fields.length;a++){
		   var vv;
		   
		   if(fields[a].getElementsByTagName('input')[5].checked){
		      vv= fetch_field_2(text,
		    fields[a].getElementsByTagName('input')[1].value,
		    fields[a].getElementsByTagName('input')[2].value.split(','),
		    fields[a].getElementsByTagName('input')[3].value.split(','),
		    fields[a].getElementsByTagName('input')[4].value);	
		      }else{
		      vv= fetch_field(text,
		    fields[a].getElementsByTagName('input')[1].value,
		    fields[a].getElementsByTagName('input')[2].value.split(','),
		    fields[a].getElementsByTagName('input')[3].value.split(','),
		    fields[a].getElementsByTagName('input')[4].value);	
		      }
		  
		   if(vv){
			   values[values.length] = vv;   
		      }
	   }
	   
	  if(values.length == fields.length){
	  showProduct();
	  saveProduct(url);
	  clearProduct();
	  }else{
		  e('log').innerHTML += 'Error<br>';  
	  }
   }
