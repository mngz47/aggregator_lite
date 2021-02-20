const scrape = require('index.js');

function getAliProductTitle(id){
	var tt;
const product = scrape(id);
product.then(res => {
  res.map => (product) {
	tt = product.title;
	}
});  
	return tt;  
}

function getAliProductDescription(id){
	const product = scrape(id);
var dd;
product.then(res => { 
  res.map => (product) {
	dd = product.description;
	}
});  
	return dd;
}

function get AliProductFeedback(id){
	
 const product = scrape(id);
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
