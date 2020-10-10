  

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
   
   function clearProduct(){
   hh = '';//heading
   pp = '';//price
   bb = '';//brand
   ca = '';//categories
   ii = [];//images
   dd = '';//description
   cc = '';//comments
   }
   
   function fetch_field(text,elements,names){
	   var vv = '';
	   for(var b=0;b<elements.length;b++){
		  
		   var headings = text.split[elements[b]];
      if(headings){
	 for(var a=0;a<headings.length;a++){
		 
		var narrow = (headings[a].length>100?headings[a].substring(0,100):headings[a]);
		
		 for(var c=0;c<names;c++){
			 if(narrow.indexOf(names[c])!==-1){
            
            vv = narrow.substring (narrow.indexOf('>')+1 , narrow.indexOf('<'));
            break;
				 
        		 }
		 } 
      }
	}   
		   
	   }
	   return vv;
   }

 function fetch_field_2(text,elements,names){
	   var vv = '';
	   for(var b=0;b<elements.length;b++){
		  
		   var headings = text.split[elements[b]];
      if(headings){
	 for(var a=0;a<headings.length;a++){
		 
		var narrow = (headings[a].length>1000?headings[a].substring(0,1000):headings[a]);
		
		 for(var c=0;c<names;c++){
			 if(narrow.indexOf(names[c])!==-1){
            
            vv += narrow.substring (narrow.indexOf('>')+1 , narrow.indexOf('<'))+';;';
       			 
        		 }
		 } 
      }
	}   
		   
	   }
	   return vv;
   }

   function fetch_product(url,text){
      
      e('log').innerHTML += '('+url+') Fetch Product<br>';

     hh = fetch_field(text,['<h','<span'],['heading','title','name']);
     pp = fetch_field(text,['<span','<div'],['price']);
     bb = fetch_field(text,['<span','<div'],['brand']);
     ca = fetch_field(text,['<span','<div'],['category']);
	   
//-----------------------------------
	   
	   
      var images = text.split['<img'];
      
	   if(images){
	      for(var a=0;a<images.length;a++){
		      var narrow = images[a].substring(0,100);
		      
         if(narrow.includes('product')){
            
            ii[ii.length] = narrow.substring (narrow.indexOf('src="') +5, narrow.indexOf('" '));
           
         }
      }
	      }
      
	   dd = fetch_field_2(text,['<div','<p'],['description']);
	   cc = fetch_field_2(text,['<div','<p'],['comment','review']);
	  
   //heading
   //price
   //brand
   //category
   //images
   //description
   //comments
   
	  if(hh && pp && bb && ca && ii.length && dd && cc){
	  showProduct();
	  saveProduct(url);
	  clearProduct();
	  }else{
		  e('log').innerHTML += '('+hh +' | '+ pp +' | '+ bb +' | '+ ca +' | '+ ii.length +' | '+ dd +' | '+ cc+') Error Fetch Product<br>';  
	  }
   }
