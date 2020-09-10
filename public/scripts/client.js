/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//helper function

const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  let createdDate = new Date(tweet.created_at);
  let today = Date.now();
  let difference = Math.round((today - createdDate) / 1000 / 60 / 60 / 24);
  const $tweet = `
  <article class="tweet-holder">
    <header>
      <div class="tweet-top">
        <img src= ${escape(tweet.user.avatars)}">
         <p class="tweeter-username">${escape(tweet.user.name)}</p>
      </div> 
        <p class="tweeter-handle">${escape(tweet.user.handle)}</p>
     </header>
        <div class="tweet-content">
        <p>${escape(tweet.content.text)}</p>
        </div>
      <footer class="tweet-foot">
        <div class="timeAgo">${difference} days ago</div>
        <div id="icons">
          <i class="fa fa-heart"></i>
          <i class="fa fa-flag"></i>
          <i class="fa fa-retweet"></i>
        </div>
      </footer>
  </article>
`
return $tweet;
};

const renderTweets = function(tweets) {
  for (let tweet of tweets.reverse()) {
    $('.tweets').prepend(createTweetElement(tweet));
  }
};

const loadTweets = () => {
  const $form = $('form');
  $('tweet-holder').empty();
      $.ajax({
      url: "/tweets",
      method: "GET"
    }).then((response) => {
    //  $('tweet-holder').empty();
     renderTweets(response);
    })
};

$(document).ready(() => {
  loadTweets();
  $('form').submit((event) => {
    event.preventDefault();
    const serialized = $(event.target).serialize();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serialized
    }).then((response) => {
      $('#error').css('display', 'none');
      $('.tweets').empty();
      $('#formulating-thought').val('');
      loadTweets();
    })
  })
})