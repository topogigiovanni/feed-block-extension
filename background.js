$jq = jQuery.noConflict();
//var terms = ['bbb', 'Novela', 'praia', 'pessoas', 'pessoa'];
var terms = '';
var $fb = $jq('#facebook');
var $tag = $fb.get(0);
var removeds = 0;
var $host = window.location.host;
var tagName = '';
var _debug = true;
if($tag){
	tagName = $tag.tagName;
	tagName = tagName.toLowerCase();
}

	
if($fb){
	chrome.storage.local.get('itens', function(tags) {
		//alert('enbtrou');
		console.log('tags',tags);
		if(tags.itens != undefined){
			terms = tags.itens;
			if( tagName == "html" && $host.indexOf('facebook.com') != -1 ){
				filterFeed();
			}
			if(_debug == true)
			console.log('terms',terms);
		}
	})
	chrome.storage.onChanged.addListener(function(changes, namespace) {
		//alert('changeee');
		location.reload();
	});
	
}
function objBlock(num){
	var var_ = '<div data-g-show="'+num+'" class="g-show" style="background:#f6f9ff;cursor:pointer;color:#4B67A1;"><h4 style="color:#4B67A1;">FeedBlock - Bloqueado, click para ver</h4></div>';
	return var_;
}
function filterFeed(){
	if(_debug==true)
	console.log('myapp','runfun');
	
	var cont = $fb.find('#contentArea'),
		result = cont.find('div[data-ft]').not('.g-used');
	
	if(_debug==true)
	console.log(result,'length',result.length);

	result.each(function(){
		var $this = $jq(this);
		
		//remove do node text {titulo do post , comentários}
		var head_remove = $this.find('h5').text().toLowerCase();
		var comments_remove = $this.find('ul.UFIList').text().toLowerCase();
		var txt = $this.text().toLowerCase();
		
		txt = txt.replace(head_remove,'');
		txt = txt.replace(comments_remove,'');
		
		if(_debug == true){
			$this.append(txt);
			$this.css('background','red').addClass('g-used');
		}
		var control_ = false;
		terms.filter(function(item){
			if(txt.indexOf(item.toLowerCase()) != -1 && control_== false){
				removeds++;
				$this.before(objBlock(removeds));
				$this.hide();
				$this.addClass('g-blocked').css('background','#f2dcdc').attr('data-g-block',removeds);
				control_ = true;
				//$this.remove();
			}
		})
			
	})
	
	if(_debug==true)
	console.log('removeds',removeds);
	
	window.setTimeout(filterFeed, 1400);
}



$jq(document).ready(function(){
	$jq('body').on('click','.g-show',function(){
		var thisId = $jq(this).attr('data-g-show');
		$jq('.g-blocked[data-g-block="'+thisId+'"]').toggle();
	})
	
})


