  
   var hh;//heading
   var pp;//price
   var bb;//brand
   var ca;//category
   var ii = [];//images
   var dd = '';//description
   var cc = '';//comments
   
   function showProduct(){
    e('log').innerHTML += hh+'<br>';
    e('log').innerHTML += pp+'<br>';
	e('log').innerHTML += bb+'<br>';
	e('log').innerHTML += ca+'<br>';
	for(var a=0;a<ii.length;a++){
	 e('log').innerHTML += '<img src="'+ii[a]+'" width=100px /><br>';
	}
	
    e('log').innerHTML += dd+'<br>';
    e('log').innerHTML += cc+'<br><br>';
   }
   
   function saveProduct(url){
   var f = new FormData();
   
   f.append('url',url);
   f.append('heading',hh);
   f.append('price',pp);
   f.append('brand',bb);
   f.append('category',ca);
   var images = "";
   for(var a=0;a<ii.length;a++){
	 images += ii[a]+';;';
	}
   f.append('images',images);
   f.append('description',dd);
   f.append('comments',cc);
   
   sendform('feature/aggregation/lite/newProduct.php',f);
   }

   function saveProduct_3(url,hh,pp,bb,ca,ii,dd,cc){
   var f = new FormData();
   
   f.append('url',url.value);
   f.append('heading',hh.value);
   f.append('price',pp.value);
	 
   f.append('brand',(bb?bb.value:'auto'));
   f.append('category',(ca?ca.value:'auto'));
	 
   var ii_ =  getImage(ii);
   var images = "";
   for(var a=0;a<3;a++){
	 images += ii_[a]+';;';
	}
   f.append('images',images);
	   
   f.append('description',dd.value);
   f.append('comments',(cc?cc.value:'auto'));
   
   sendform('feature/aggregation/lite/newProduct.php',f);
   }
   
   function clearProduct(){
   hh = '';//heading
   pp = '';//price
   bb = '';//brand
   ca = '';//categories
   ii = [];//images
   dd = '';//description
   cc = '';//comments
   }
   
   function fetch_field(text,elements,names,size){
	   var vv = '';
	   for(var b=0;b<elements.length && !vv;b++){
		  
		   var headings = text.split(elements[b]);
      if(headings){

	 for(var a=0;a<headings.length && !vv;a++){
		
		
		var narrow = (headings[a].length>200?headings[a].substring(0,200):headings[a]);
		 
		 for(var c=0;c<names.length;c++){
			 
		//	  e('log').innerHTML += '<textarea>'+narrow+'</textarea> '+names[c]+'<br>';	
			 
			 if(narrow.indexOf(names[c])!=-1){
                    
		// narrow.search(/$(>.*<)/);narrow.search(/>[A-Za-z0-9]{15,40}</); narrow.indexOf('>')+1
				 
        var start =  narrow.indexOf('>')+1;
				 
	var endElement = elements[b].substring(0,1)+'/'+elements[b].substring(1,elements[b].length);
				 	 
	var ss = narrow.substring (start, narrow.indexOf(endElement,start)).trim();
    
				if(ss.length>size && ss.indexOf('>')==-1){
				   
		  vv = ss;		 
					
		e('log').innerHTML += '<textarea id='+names[c]+'_'+ind+' onblur="if(confirm(\'remove\')){this.remove();}"   >'+vv+'</textarea> '+getFieldFetch(names[c]);	
					
			 
				 }
        		 }
		 } 
      }
	}   
		   
	   }
	   return vv;
   }

function getFieldFetch(name_){
	return '<a href=# onclick="saveProduct_3(e(\'link_'+ind+'\'),'+
			'getName([\'name\',\'heading\',\'title\'],'+ind+'),'+
			'e(\'price_'+ind+'\'),'+
			'e(\'brand_'+ind+'\'),'+
			'e(\'category_'+ind+'\'),'+
			'document.getElementsByClassName(\'image_'+ind+'\'),'+
			'e(\'description_'+ind+'\'),'+
			'getName([\'comment\',\'review\'],'+ind+'));return false;" >'+name_+'</a><br>';
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

function getImage(texts){
	var ll = [];
	for(var a=0;a<texts.length;a++){
		ll[ll.length] = texts[a].value;
	}
	return ll;
}


 function fetch_field_2(text,elements,names,size){
	 var ss = '';  
	 var vv = '';
	   for(var b=0;b<elements.length;b++){
		  
		   var headings = text.split(elements[b]);
      if(headings){
	 for(var a=0;a<headings.length;a++){
		 
		var narrow = headings[a];//(headings[a].length>3000?headings[a].substring(0,3000):headings[a]);
		
		 for(var c=0;c<names.length;c++){
			 if(narrow.indexOf(names[c])!=-1){
		
            //e('log').innerHTML += '<textarea>'+narrow+'</textarea> description<br>';
	   //narrow.search(/>[A-Za-z\s]{100,1000}</); 
	    var start = narrow.indexOf('>');
	    var endElement = elements[b].substring(0,1)+'/'+elements[b].substring(1,elements[b].length);
				 
				 ss += narrow.substring( start, narrow.indexOf(endElement,start)).trim()+';;';
				 		 
			 }
	        } 
      }
	}   
	   }
	 
	  if(ss.length>size){    
		  vv = ss;		 
		e('log').innerHTML += '<textarea id='+names[0]+'_'+ind+' >'+vv+'</textarea> '+getFieldFetch(names[0]);	
	  }
	   return vv;
   }

function image_List(ll){
	var i_l = ll.split(',');
	for(var a=0;a<i_l.length;a++){
		var ss =  i_l[a].substring(1,(i_l[a].length-1));
		// e('log').innerHTML += '<textarea>'+ss+'</textarea> image<br>';	
		 if(ss.indexOf('https://')==0 ){
			  e('log').innerHTML += '<textarea  class=image_'+ind+' >'+ss+'</textarea> image<br>';	
		    	ii[ii.length] = ss;
		    }else if(ss.indexOf('//')==0 ){
			    ss = 'https:'+ss; 
			     e('log').innerHTML += '<textarea class=image_'+ind+' >'+ss+'</textarea> image<br>';	
			ii[ii.length] = ss;  
		    }
	}
}

function fetch_images(text){
	var images = text.split('<img');
      
	   if(images){
	      for(var a=0;a<images.length;a++){
		   
	    var narrow = images[a];// (images[a].length>1000?images[a].substring(0,1000):images[a]);
		      
		      //  e('log').innerHTML += '<textarea>'+narrow+'</textarea> image RAW<br>';
		      
        if(narrow.indexOf('product')!=-1){
	    
	    var image_list = narrow.indexOf('imageList')!=-1;
		
	    var start = (image_list? (narrow.indexOf('imageList = [') +13) : narrow.indexOf('src="')+5);
		
            var ss = narrow.substring(start, narrow.indexOf((image_list?']':'"'),start)).trim();
		
		 if(image_list){
		    image_List(ss);
       		 }else{
		// e('log').innerHTML += '<textarea>'+ss+'</textarea> image<br>';	
		    if(ss.indexOf('https://')==0 ){
			   e('log').innerHTML += '<textarea  class=image_'+ind+' >'+ss+'</textarea> image<br>';	
		    	ii[ii.length] = ss;
		    }else if(ss.indexOf('//')==0 ){
			    ss = 'https:'+ss;
			 e('log').innerHTML += '<textarea class=image_'+ind+' >'+ss+'</textarea> image<br>';	
			ii[ii.length] = ss;
		    }
	         }
        }
      }
   }
}

   function fetch_product(url,text){
      
      e('log').innerHTML += '<textarea id=link_'+ind+' >'+url+'</textarea> Fetch Product<br>';

     hh = fetch_field(text,['<h','<span'],['name','heading','title'],17);
     pp = fetch_field(text,['<span','<div'],['price'],2);
     bb = fetch_field(text,['<span','<div'],['brand'],4);
     ca = fetch_field(text,['<span','<div'],['category'],6);
	   
        fetch_images(text);
      
     dd = fetch_field_2(text,['<div','<p'],['description'],200);
     cc = fetch_field_2(text,['<div','<p'],['comment','review'],200);
   
	  if(hh && pp && bb && ca && ii.length && dd && cc){
	  showProduct();
	  saveProduct(url);
	  clearProduct();
	  }else{
		  e('log').innerHTML += 'Error<br>';  
	  }
   }
