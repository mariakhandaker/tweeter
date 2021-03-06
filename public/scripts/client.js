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
  let minutes = Math.round((today - createdDate) / 1000 / 60)
  let days = Math.round((today - createdDate) / 1000 / 60 / 60 / 24);
  const $tweet = `
  <article class="tweet-holder">
    <header>
      <div class="tweet-top">
        <img src= ${escape(tweet.user.avatars)}">
         <p class="tweeter-username">${tweet.user.name}</p>
      </div> 
        <p class="tweeter-handle">${escape(tweet.user.handle)}</p>
     </header>
        <div class="tweet-content">
        <p>${escape(tweet.content.text)}</p>
        </div>
      <footer class="tweet-foot">
        <p class="timeAgo">${ days < 1 ? (minutes + ' minutes') : (days + ' days')} ago</p>
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
  $('.posted-tweets').empty();
  tweets = tweets.sort(function(a, b) {
    return a.created_at - b.created_at;
  });
  for (let tweet of tweets) {
    $('.posted-tweets').prepend(createTweetElement(tweet));
  }
};

const loadTweets = () => {
      $.ajax({
      url: "/tweets",
      method: "GET"
    }).then((response) => {
     renderTweets(response);
    })
};

$(document).ready(() => {
  loadTweets();
  $('form').submit((event) => {
    event.preventDefault();
    const serialized = $(event.target).serialize();
    if ($('#formulating-thought').val() === "" || $('#formulating-thought').val() === null) {
      $('#error').text('Cannot post an empty tweet.');
      $('#error').slideDown(300);
    } else if ($('#formulating-thought').val().length > 140) {
      $('#error').text('You have exceeded the character limit.');
      $('#error').slideDown(300);
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: serialized
      }).then((response) => {
        loadTweets();
        $('#error').css('display', 'none');
        $('#formulating-thought').val('');
        $('.counter').val('140');
      })
    }}
  )
})