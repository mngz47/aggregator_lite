const scrape = require('index.js');

const product;

function setScrape(id){
	product = scrape(id);
}

function getAliProductTitle(){
	var tt;

product.then(res => {
  res.map => (product) {
	tt = product.title;
	}
});  
	return tt;  
}

function getAliProductDescription(){
var dd;
	
product.then(res => { 
  res.map => (product) {
	dd = product.description;
	}
});  
	return dd;
}

function getAliProductFeedback(){
 var cc = '';
 
product.then(res => {
  res.map => (product) {
	
	  var ff = product.feedback;
	  
	  for(var a=0;a<ff.length;a++){
		  
	var pp = product.feedback[a].photos;
	  var photos = '';
	  
	  for(var aa=0;aa<pp.length;aa++){
		photos+= '<img src="'+pp[aa]+'" />';
	  }
		cc +=  product.feedback[a].displayName+'('+product.feedback[a].rating+'<small>Star Rating</small>)<br>: '+product.feedback[a].content+' <br>'+photos+';;';
	  }
	  
	
	}
});  

return cc;
}
