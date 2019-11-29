window.onload = function() {
	function getWords(text) {
		text = text.toLowerCase();
		text = text.replace(',', '');
		text = text.replace('.', '');
		text = text.replace('?', '');
		text = text.replace('!', '');
		text = text.replace(/\s[\s]+/, ' ');
		return text.split(' ');
	}

	function getSentences(text) {
		text = text.replace('.', '.______');
		text = text.replace('?', '?______');
		text = text.replace('!', '!______');
		var result = text.split('______');
		return result.slice(0, result.length - 1);
	}

	function summarize() {
		var sampleParagraph = document.getElementById('input').value;
		var words = getWords(sampleParagraph);
		var wordLengths = {};
		var wordFrequencies = {};
		for(var i=0;i<words.length;i++) {
			if(typeof wordLengths[words[i]] === 'undefined') {
				wordLengths[words[i]] = words[i].length;
			}
			if(typeof wordFrequencies[words[i]] === 'undefined') {
				wordFrequencies[words[i]] = 0
			}
			wordFrequencies[words[i]]++;
		}
		var wordLengthMax = Math.max.apply(
			Object.keys(wordLengths).map(function(v) { return wordLengths[v]; })
		) + 1;
		var wordFrequencyMax = Math.max.apply(
			Object.keys(wordFrequencies).map(function(v) { return wordFrequencies[v]; })
		) + 1;
		var scores = [];
		var sentences = getSentences(sampleParagraph);
		if(wordLengthMax > 0 && wordFrequencyMax > 0) {
			for(var j=0;j<sentences.length;j++) {
				var score = 0;
				var sentence_words = getWords(sentences[j]);
				for(var i=0;i<sentence_words.length;i++) {
					if(typeof wordLengths[sentence_words[i]] !== 'undefined' && typeof wordFrequencies[sentence_words[i]] !== 'undefined') {
						score += wordLengths[sentence_words[i]] / wordLengthMax;
						score += wordFrequencies[sentence_words[i]] / wordFrequencyMax;
					}
				}
				scores.push(score);
			}
		}
		var avgScore = 0;
		for(var i=0;i<scores.length;i++) {
			avgScore += scores[i];
		}
		avgScore /= scores.length;
		for(var i=0;i<scores.length;i++) {
			if(scores[i] < avgScore) {
				sentences[i] = '';
			}
		}
		final_sentences = [];
		for(var i=0;i<sentences.length;i++) {
			if(sentences[i].length > 0) {
				final_sentences.push(sentences[i]);
			}
		}
		document.getElementById('output-text').innerHTML = final_sentences.join('.').trim();
	}

	document.getElementById('test-btn').onclick = function() {
		if(document.getElementById('explanation').classList.contains('shown')) {
			document.getElementById('explanation').classList.remove('shown');
		}
		document.getElementById('test').classList.add('shown');
	}

	document.getElementById('expl-btn').onclick = function() {
		if(document.getElementById('test').classList.contains('shown')) {
			document.getElementById('test').classList.remove('shown');
		}
		document.getElementById('explanation').classList.add('shown');
	}

	document.getElementById('go').onclick = function() {
		summarize();
		document.getElementById('output').classList.add('shown');
	};

	document.getElementById('stop').onclick = function() {
		document.getElementById('output').classList.remove('shown');
	};
}
