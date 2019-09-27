/*
  window.onload()
  
  This function is called when the webpage loads.
*/
window.onload = function() {
	var articles = ['a', 'an', 'the'];
	/*
	  summarize()
	  
	  This function will summarize a block of text, by removing articles and
	  discarding less common (in the block of text) words.
	*/
	function summarize() {
		var text = ' ' + document.getElementById('input').value + ' ';
		for(var i=0;i<articles.length;i++) {
			while(text.indexOf(' ' + articles[i] + ' ') !== -1) {
				text = text.replace(' ' + articles[i] + ' ', ' ');
			}
		}	
		var words = text.split(' ').map(function(v) {
			if(v.charAt(v.length - 1) === '.') { v = v.substring(0, v.length - 1); }
			return v;
		});	
		var prevelance = {};
		for(var i=0;i<words.length;i++) {
			if(typeof prevelance[words[i].toLowerCase()] === 'undefined') {
				prevelance[words[i].toLowerCase()] = 0;
			}
			else {
				prevelance[words[i].toLowerCase()]++;
			}
		}
		// https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript/25500461
		var items = Object.keys(prevelance).map(function(key) {
			return [key, prevelance[key]];
		});
		items.sort(function(a, b) { return b[1] - a[1]; });
		var compressionRate = (100 - document.getElementById('compressionRate').value) / 100;
		var minPrevelance = items[Math.ceil((items.length - 1) * compressionRate)][1];
		for(var i=0;i<words.length;i++) {
			if(prevelance[words[i].toLowerCase()] < minPrevelance) { words.splice(i--, 1); }
		}
		document.getElementById('output').innerHTML = words.join(' ').trim();
	}
	/*
	  document.getElementById('go').onclick()
	  
	  This function is called when the "Summarize" button is clicked.
	  It will call the summarize function.
	*/
	document.getElementById('go').onclick = function() { summarize(); }
};
