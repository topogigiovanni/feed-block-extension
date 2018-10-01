var RESULTS = '';
document.addEventListener('DOMContentLoaded', function () {
  load();

});

function saveChanges() {
  d = document.formulario;
  theValue = d.novatag.value;
  // Check that there's some code there.
  if (theValue == '') {
    message('Error: No value specified');
    return false;
  }

 if(RESULTS == ''){
 alert('as11');
	RESULTS = new Array(theValue)
	//RESULTS.t1 = theValue; 
 }else{
 alert('as22');
	RESULTS.push(theValue);
 }

  save();
  
  alert(theValue);
  
  return false;
};

/*
link.addEventListener('click', function () {
  rodaclick();
});
*/
chrome.storage.onChanged.addListener(function(changes, namespace) {
alert('change');
/*
  for (key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
  */
  location.reload();
});

function load(){
  var terms = document.getElementById('terms');
  var form = document.getElementById('form');
  var clearButton = document.getElementById('clear');
	form.addEventListener('submit',function(){
		saveChanges();
	})
	clearButton.addEventListener('click',function(){
	var r = confirm("Você tem certeza que deseja excluir todas as tags?");
		if (r == true){
		  		chrome.storage.local.clear();

		  }
	})

	loadItems();
}

function loadItems(){
Array.prototype.remove = function(start, end) {
  this.splice(start, end);
  return this;
}
	//tags = StorageArea.get();
	//console.log(tags);
	
// Save it using the Chrome extension storage API.
var dataObj = '';
var i='';
  chrome.storage.local.get('itens', function(tags) {
    // Notify that we saved.
   // message('Settings saved');
   if(tags.itens != undefined)
	RESULTS = tags.itens;
	
	console.log('tags',tags);
	console.log('RESULTS',RESULTS, 'length', RESULTS.length);

	 if(tags.itens !=undefined){
	    var li="";
		RESULTS.forEach(function(element, index, array) {
			/*
				var li = document.createElement('li');
				var btntext = document.createTextNode('Esconder/Mostrar');
				li.appendChild(element);
				terms.appendChild(li);
			*/
			li  += '<li><span class="round alert  label">'+element+'<a data-remove="'+index+'" class="delet-tag" title="Deletar"><b>X</b></a></span></li>' ;
			console.log(li);
			
		})
		terms.innerHTML = li;
	}
	
  });
}
function save(){
	chrome.storage.local.set( {'itens': RESULTS}, function() {
    // Notify that we saved.
		message('Settings saved');
	});
}
// ToDo ver pq o quando deleta teste deleta tudo que conter teste tb
function deleteItem (tag){
	if(RESULTS.lastIndexOf(tag) != -1){
		var indice = RESULTS.lastIndexOf(tag);
		//console.log('reuslsindice',RESULTS[indice]);
		if(RESULTS[indice] == tag){
			RESULTS.remove(RESULTS.indexOf(tag), RESULTS.lastIndexOf(tag));
			save();
		}
	}
}
$(document).ready(function(){
	$('body').on('click','.delet-tag',function(){
		var thisVal = $(this).closest('.label').text().replace('X','');
		var removeId = $(this).attr('data-remove');
		alert(RESULTS.length);
		//deleteItem(thisVal);
	})
})
$(document).foundation();