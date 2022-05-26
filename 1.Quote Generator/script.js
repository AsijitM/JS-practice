const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading

function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading

function completeLoading() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}


//Show New Quote

function newQuote() {
  showLoading();
  //Pick a random number of quotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check If Author field is Blank
  if (!quote.author) {
    authorText.textContent = 'unknown';
  } else {
    authorText.textContent = quote.author;
  }

  //Check quote length
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  }
  else {
    quoteText.classList.remove('long-quote');
  }
  
  //set quote,hide loader
  quoteText.textContent = quote.text;
  completeLoading();
}
//Get quotes from API

async function getQuotes() {
  showLoading();
  const apiURL = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (e) {
    alert(e);
  }
}


//Tweet Quotes
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);



//on Load

getQuotes();

