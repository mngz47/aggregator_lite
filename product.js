  

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
   
   
   function fetch_product(url,text){
      
	  e('log').innerHTML += '('+url+') <br>';

      var headings = text.split['<h'];
      
      for(var a=0;a<headings.length;a++){
         if(headings[a].substring(0,100).includes('heading') || headings[a].substring(0,100).includes('tilte')){
            
            hh = headings[a].substring (headings[a].indexOf('>') , headings[a].indexOf('<'));
            break;
         }
      }
      
      var headings_1 = text.split['<span'];
      
       for(var a=0;a<headings_1.length;a++){
         if(headings_1[a].substring(0,100).includes('heading') || headings_1[a].substring(0,100).includes('tilte')){
            
            hh = headings_1[a].substring (headings_1[a].indexOf('>') , headings_1[a].indexOf('<'));
            break;
         }
      }
      
      var prices = text.split['<span'];
      
      for(var a=0;a<prices.length;a++){
         if(prices[a].substring(0,100).includes('price')){
            
            pp = prices[a].substring (prices[a].indexOf('>')+1 , prices[a].indexOf('<'));
            break;
         }
      }
      
	  var brands = text.split['<span'];
      
      for(var a=0;a<brands.length;a++){
         if(brands[a].substring(0,100).includes('brand')){
            
            bb = brands[a].substring (brands[a].indexOf('>')+1 , brands[a].indexOf('<'));
            break;
         }
      }
	  
	  var categories = text.split['<span'];
      
      for(var a=0;a<categories.length;a++){
         if(categories[a].substring(0,100).includes('category')){
            
            ca = categories[a].substring (categories[a].indexOf('>')+1 , categories[a].indexOf('<'));
            break;
         }
      }
	  
      var images = text.split['<img'];
      
      for(var a=0;a<images.length;a++){
         if(images[a].substring(0,100).includes('product')){
            
            ii[ii.length] = images[a].substring (images[a].indexOf('src="') +5, images[a].indexOf('"'));
            break;
         }
      }
     
	 var narrow_size_1 = 100;
	 var narrow_size_2 = 1000;
	 
      var descriptions = text.split['<p'];
      
      for(var a=0;a<descriptions.length;a++){
         if(descriptions[a].substring(0,100).includes('description')){
            
            var narrow = (descriptions[a].length>1000? descriptions[a].substring(0,1000):descriptions[a]);
            
             dd += narrow.substring (narrow.indexOf('>')+1 , narrow.indexOf('<'))+'<br>';
            
         }
      }
      
      var descriptions_1 = text.split['<div'];
      
      for(var a=0;a<descriptions_1.length;a++){
         if(descriptions_1[a].substring(0,100).includes('description')){
            
			 var narrow = (descriptions_1[a].length>1000? descriptions_1[a].substring(0,1000):descriptions_1[a]);
            
             dd += narrow.substring (narrow.indexOf('>')+1 , narrow.indexOf('<'))+'<br>';
            
         }
      }
      
      var comments = text.split['<p'];
      
      for(var a=0;a<comments.length;a++){
         if(comments[a].substring(0,100).includes('comment') || comments[a].substring(0,100).includes('review')){
            
			var narrow = (comments[a].length>1000? comments[a].substring(0,1000):comments[a]);
			 
			cc += narrow.substring (narrow.indexOf('>')+1 , narrow.indexOf('<'))+';;';
            
			
         }
      }
      
      var comments_1 = text.split['<div'];
      
      for(var a=0;a<comments_1.length;a++){
         if(comments_1[a].substring(0,100).includes('comment') || comments[a].substring(0,100).includes('review')){
            
             var narrow = (comments_1[a].length>1000? comments_1[a].substring(0,1000):comments_1[a]);
			 
			cc += narrow.substring (narrow.indexOf('>')+1 , narrow.indexOf('<'))+';;';
            
         }
      }
	  
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
	  }
   }