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
		var raw_sentences = document.getElementById('input').value.split('.').map(
			function(v) {
				return v.split('?').map(
					function(w) {
						return w.split('!');
					}
				);
			}
		);
		var sentences = [];
		for(var i=0;i<raw_sentences.length;i++) {
			for(var j=0;j<raw_sentences[i].length;j++) {
				for(var k=0;k<raw_sentences[i][j].length;k++) {
					sentences.push(raw_sentences[i][j][k].trim());
				}
			}
		}
		var sentences_map = [];
		var j = 0;
		sentences.forEach(function(v) {
			var words = v.split(' ').map(function(w) { return w.trim(); });
			var totPrev = 0;
			for(var i=0;i<words.length;i++) { totPrev += prevelance[words[i]] || 0; }
			sentences_map.push([v, totPrev, j]);
			j++;
		});
		sentences_map.sort(function(a, b) { return b[1] - a[1]; });
		
		var compressionRate = (100 - document.getElementById('compressionRate').value) / 100;
		var minPrevelance = sentences_map[Math.ceil((sentences_map.length - 1) * compressionRate)][1];
		for(var i=0;i<sentences_map.length;i++) {
			if(sentences_map[i][1] < minPrevelance) {
				sentences_map.splice(i--, 1);
			}
		}
		sentences_map.sort(function(a, b) { return b[2] - a[2]; });
		document.getElementById('output').innerHTML = sentences_map.map(function(v) { return v[0]; }).join('. ').trim() + '.';
	}
	/*
	  document.getElementById('go').onclick()
	  
	  This function is called when the "Summarize" button is clicked.
	  It will call the summarize function.
	*/
	document.getElementById('go').onclick = function() { summarize(); }
};
