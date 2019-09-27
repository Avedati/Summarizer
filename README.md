# SummaryBuilder
Summary Builder is a hobby project of mine. It is a simple website that will take some text which the user types into an input field, and summarize it.

## Theory
The Summary Builder will first strip any articles ("a", "an", or "the") from the input text. Next, it will convert the text to words. Then, it will record the frequency of each word in the text. For example, if a certain word ("therefore", for example) appears 3 times in the text, it will have a frequency of three. Then, the Summary Builder will strip words from the text that have a frequency lower than the specified amount. The user can change this value by dragging the "Summarization Rate" slider. A low summarization rate will result in longer output text (meaning that fewer words were cut out from the input text), whereas a higher summarization rate will result in shorter output text (meaning that more words were cut out from the input text).

## Getting Started
You can view the code for Summary Builder here on github, or you can view the website at:
https://Avedati.github.io/SummaryBuilder
