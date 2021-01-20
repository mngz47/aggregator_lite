  
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
	    f.append('url',(url.includes('aliexpress')?pushAliExpress(url):url));
	   
   var fields = e('parameters').getElementsByClassName('field');
	   
	   for(var a=0;a<fields.length;a++){
		   f.append(fields[a].getElementsByTagName('input')[0].value,values[a]);
	   }
   sendform('feature/aggregation/lite/newProduct.php',f);
   }


   function saveProduct_2(url,index){
   var f = new FormData();
	   
     f.append('url',(url.value.includes('aliexpress')?pushAliExpress(url.value):url.value)); 
     f.append('brand','auto');
     f.append('category',(e('category').value?e('category').value:'auto'));
     f.append('comments','auto');  
	   
	   var fields = e('parameters').getElementsByClassName('field');
	   for(var a=0;a<fields.length;a++){
		     f.append(fields[a].getElementsByTagName('input')[0].value,
			      getName(fields[a].getElementsByTagName('input')[3].value.split(','),index).value);
	  

	  }   
														       
   sendform('feature/aggregation/lite/newProduct.php',f);
   }
   
   function saveProduct_Ali(url,index){
   var f = new FormData();
	   
     f.append('url',(url.value.includes('aliexpress')?pushAliExpress(url.value):url.value)); 
     f.append('brand','auto');
     f.append('category',(e('category').value?e('category').value:'auto'));
     f.append('comments','auto');  
	   
	   var fields = e('parameters').getElementsByClassName('field');
	   for(var a=0;a<fields.length;a++){
		   
		   var ff = e(aliexpress[a]+'_'+index);
		 try{
			 
			 var format = field_format(fields[a].getElementsByTagName('input')[0].value,ff.value);
			 
			 alert(format);
		  
		     f.append(fields[a].getElementsByTagName('input')[0].value,
			    format);
		 }catch(e){
			 alert('missing '+(aliexpress[a]+'_'+index));
		  
		     f.append(fields[a].getElementsByTagName('input')[0].value,
			    'missing');
		 }
		 
	  

	  }   
														       
   sendform('feature/aggregation/lite/newProduct.php',f);
   }

function crop_ali_fields(ind){
	for(var aa=0;aa<aliexpress.length;aa++){	
		var fields = document.getElementsByClassName(aliexpress[aa]+'_'+ind);
		
		for(var a=1;a<(fields.length);a++){
			fields[a].parentNode.remove();
		}
	}
}

function rinse_ali_fields(ind){
	for(var aa=0;aa<aliexpress.length;aa++){
			
		var fields = document.getElementsByClassName(aliexpress[aa]+'_'+ind);
		
		for(var a=0;a<(fields.length);a++){
			if(fields[a].nextElementSibling.innerHTML=='attrValue'){
				   if(/"[A-Za-z0-9\s\/&-\(\)]*"/.test(fields[a].value)){
				   var ffields = document.getElementsByClassName('description_'+ind);  
				   ffields[0].value+=fields[a].value+'<br>';
				   }
			}else if(fields[a].nextElementSibling.innerHTML=='ogTitle'){
				   var ffields = document.getElementsByClassName('description_'+ind);  
				   ffields[0].value+=fields[a].value+'<br>';
				   
			}else if(fields[a].nextElementSibling.innerHTML=='description'){
				   if(/"[A-Za-z0-9\s\/&]{15,30}"/.test(fields[a].value)){
				   var ffields = document.getElementsByClassName('ogTitle_'+ind);  
				   ffields[0].value+=fields[a].value;
				   }   
			 }else if(fields[a].nextElementSibling.innerHTML=='skuPropertyImagePath'){
				   var ffields = document.getElementsByClassName('skuPropertyImagePath_'+ind);  
				   ffields[0].value+=fields[a].value+';;';
			 }
			
		}
		
		/* remove similar fields with less content in length
		for(var a=0;a<(fields.length-1);a++){
			
			if(fields[a].value.length>fields[a+1].value.length){
				fields[a+1].parentNode.remove();
		    	}else{
				fields[a].parentNode.remove();
			}
		}
		*/
		}
}

function field_format(field_name,vv){
	
	while(vv.includes('"') || vv.includes('[')){
		vv = vv.replace('"','');
		vv = vv.replace('[','');
	}
	
	if(field_name=='price'){
		vv = parseInt(vv.split('$')[1])*20;
		vv = (vv + Math.round(vv*0.34));
		
	}else if(field_name=='url'){
		vv = pushAliExpress(vv);
	}
	
	return vv;
}

function pushAliExpress(url){
	
	return url+'?pvid=cdb1c202-bf70-4257-8858-fbb2ad1e5554&aff_platform=portals-billboard-hp&sk=_97IYzV&aff_trace_key=97a7a0066df24930ba2ef09ca9f08915-1610873699785-06619-_97IYzV&scm=1007.29079.163715.0&terminal_id=6b52420b6f1a4edbb256dc2b77ab1c9a&tmLog=new_Detail';
	
}

   function saveProduct_3(url,hh,pp,bb,ca,ii,dd,cc){
   var f = new FormData();
   
   f.append('url',(url.value.includes('aliexpress')?pushAliExpress(url.value):url.value));
   f.append('heading',hh.value);
   f.append('price',pp.value);
	 
   f.append('brand',(bb?bb.value:'auto'));
   f.append('category',(ca?ca.value:(e('category').value?e('category').value:'auto')));
	
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

	 for(var a=(index=='-1'?0:parseInt(index.split('-')[0]));a<(index=='-1'?headings.length:parseInt(index.split('-')[1]));a++){
		
		
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
// return '<a href=# onclick="saveProduct_2(e(\'link_'+ind+'\'),'+ind+');return false;" >'+name_+'</a><br>';    

 return '<a href=# onclick="saveProduct_Ali(e(\'link_'+ind+'\'),'+ind+');return false;" >'+name_+'</a><br>';    
		 
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
	      
	for(var a=(index=='-1'?0:parseInt(index.split('-')[0]));a<(index=='-1'?headings.length:parseInt(index.split('-')[1]));a++){
		 
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

var aliexpress = ['ogTitle','formatedPrice','description','attrValue','skuPropertyImagePath','ogurl'];
//  title formatedAmount subject   attrValue    imagePath ogurl
var aliexpress_2 = ['title','formatedAmount','subject ','attrValue','imagePath','ogurl'];

   function fetch_Ali_product_2(url,text){
	  
	  e('log').innerHTML += '<textarea id=link_'+ind+' >'+url+'</textarea><a href=# onclick="getUrlText(e(\'link_'+ind+'\').value);ind=(layer_urls.length-2);return false;" >Fetch Product</a><br>';

	 // e('log').innerHTML += '<textarea id=text_'+ind+'>'+text+'</textarea><a href=# onclick="fetch_product(e(\'link_'+ind+'\').value,e(\'text_'+ind+'\').value);return false;" >Product Text</a><br>';
	   
	  e('log').innerHTML += '<a href=# onclick="rinse_ali_fields('+ind+');return false;" >Rinse</a>-'; 
	  e('log').innerHTML += '<a href=# onclick="crop_ali_fields('+ind+');return false;" >Crop</a><br>'; 
	   
	  
	 var fields = e('parameters').getElementsByClassName('field');
	 var scripts = text.split('<script');
	  
	  for (var b=0;b<scripts.length;b++){
		  
		  if(scripts[b].includes('data: {"actionModule":{')){
			  
			  alert('found ali data');
			  //data: {
				  //data: {"actionModule":
			  var start = scripts[b].indexOf('data: {"actionModule":{')+26;
			  
	var data = scripts[b].substring(start,scripts[b].indexOf('};',start));

	var attr = data.split(',');
	
	alert(attr.length);
	
   
	for(var aa=0;aa<attr.length;aa++){
	
	for (var a=0;a<fields.length;a++){	
	
	//attr[aa].split(':')[0].substring(1,-1);
	//attr[aa].includes(aliexpress[a])
	
	
	if(attr[aa].toLowerCase().includes(aliexpress[a].toLowerCase()) || attr[aa].toLowerCase().includes(aliexpress_2[a].toLowerCase())){
			
	//alert(attr[aa]);
		var vv = 	(attr[aa].split(':').length>2?attr[aa].split(':')[1]+':'+attr[aa].split(':')[2]:attr[aa].split(':')[1]);
		
	 e('log').innerHTML += '<div><textarea class="'+(aliexpress[a]+'_'+ind)+'" id="'+(aliexpress[a]+'_'+ind)+'" >'+vv+'</textarea>'+getFieldFetch(aliexpress[a])+'<a href=# onclick="this.parentNode.className=\'block\';if(confirm(\'remove\')){this.parentNode.remove();}return false;" >xx</a></div>';	
   
   	// e('log').innerHTML += '<div><textarea id="'+(field_names[a]+'_'+ind)+'" >'+vv+'</textarea>'+getFieldFetch(field_names[a])+'<a href=# onclick="this.parentNode.className=\'block\';if(confirm(\'remove\')){this.parentNode.remove();}return false;" >xx</a></div>';	
	// e('log').innerHTML += '<div><textarea id='+names[c]+'_'+ind+' >'+vv+'</textarea> '+getFieldFetch(names[c])+'<a href=# onclick="this.parentNode.className=\'block\';if(confirm(\'remove\')){this.parentNode.remove();}return false;" >xx</a></div>';		
	// e('log').innerHTML += '<div>('+aa+')<textarea>'+attr[aa]+'</textarea> '+fields[a].getElementsByTagName('input')[0].value+'<br><a href=# onclick="this.parentNode.className=\'block\';if(confirm(\'remove\')){this.parentNode.remove();}return false;" >xx</a></div>';	
	// e('log').innerHTML += '<div><textarea id='+attr[aa]+'_'+ind+' >'+attr[aa].split(':')[1]+'</textarea> '+getFieldFetch(attr[aa])+'<a href=# onclick="this.parentNode.className=\'block\';if(confirm(\'remove\')){this.parentNode.remove();}return false;" >xx</a></div>';	
				
			values[values.length] = vv;
			
		}
	}
	}		    
		  }  
	  }
	  
	if(values.length >= fields.length){
	  //showProduct();
	  saveProduct(url);
	  clearProduct();
	  }else{
		  e('log').innerHTML += 'Error<br>';  
	  }  
	  
   }

   function fetch_product(url,text){
      
      e('log').innerHTML += '<textarea id=link_'+ind+' >'+url+'</textarea> <a hrf=# onclick="getUrlText(e(\'link_'+ind+'\').value);ind=(layer_urls.length-1);return false;" >Fetch Product</a><br>';
    
	// e('log').innerHTML += '<div style="height:200px;overflow-y:auto;" id=text_'+ind+' >'+text+'</div><strong>EE Product Text</strong><br>';
	 
	  e('log').innerHTML += '<textarea>'+text+'</textarea>Product Text<br>';
	   
	 

	   var fields = e('parameters').getElementsByClassName('field');
	   
	   for(var a=0;a<fields.length;a++){
		   var vv;
		   
		   if(fields[a].getElementsByTagName('input')[5].checked){
		      vv= fetch_field_2(text,
		    fields[a].getElementsByTagName('input')[1].value,
			
		    (fields[a].getElementsByTagName('input')[2].value.includes(',')?fields[a].getElementsByTagName('input')[2].value.split(','):[''+fields[a].getElementsByTagName('input')[2].value]),
			(fields[a].getElementsByTagName('input')[3].value.includes(',')?fields[a].getElementsByTagName('input')[3].value.split(','):[''+fields[a].getElementsByTagName('input')[3].value]),
			
		    fields[a].getElementsByTagName('input')[4].value);	
		      }else{
		      vv= fetch_field(text,
		    fields[a].getElementsByTagName('input')[1].value,
			(fields[a].getElementsByTagName('input')[2].value.includes(',')?fields[a].getElementsByTagName('input')[2].value.split(','):[''+fields[a].getElementsByTagName('input')[2].value]),
			(fields[a].getElementsByTagName('input')[3].value.includes(',')?fields[a].getElementsByTagName('input')[3].value.split(','):[''+fields[a].getElementsByTagName('input')[3].value]),
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
