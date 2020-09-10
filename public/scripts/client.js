/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  const orderedTweets = tweets.sort((a, b) => { a.created_at - b.created_at });
  for (let tweet of orderedTweets) {
    const newTweet = createTweetElement(tweet);
    $('#tweet-holder').prepend(newTweet);
  }
}

const timeAgo = function(tweet) {
  const createdAt = new Date(tweet.created_at);
  const currentTime = Date.now();
  let seconds = Math.round(currentTime - createdAt);
  if (seconds <= 60) {
    return "just now";
  } else {
    let minutes = seconds / 60;
    if (minutes <= 60) {
      if (minutes == 1) {
        return "one minute ago";
      } else {
        return minutes + " minutes ago";
      }
    } else {
      let hours = minutes / 60;
      if (hours <= 24) {
        if (hours == 1) {
          return "an hour ago";
        } else {
          return hours + " hrs ago";
        }
      } else {
        let days = hours / 24;
        if (days <= 7) {
          if (days == 1) {
            return "yesterday";
          } else {
            return days + " days ago";
          }
        } else {
          let weeks = days / 7;
          if (weeks <= 4.3) {
            if (weeks == 1) {
              return "a week ago";
            } else {
              return weeks + " weeks ago";
            }
          } else {
            let months = weeks / 4;
            if (months <= 12) {
              if (months == 1) {
                  return "a month ago";
              } else {
                  return months + " months ago";
              }
            } else {
              let years = months / 12;
              if (years == 1) {
                return "one year ago";
              } else {
                return years + " years ago";
              }
            }
          }  
        } 
      }
    }
  }
} 

const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => { 
 let $tweet =
  <article class="tweet-holder">
    <header>
      <div class="tweet-header">
        <img src= ${escape(tweet.user.avatars)}">
         <p class="tweeter-username">${escape(tweet.user.name)}</p>
      </div> 
        <p class="tweeter-handle">${escape(tweet.user.handle)}</p>
     </header>
        <div class="tweet-content">
        <p>${escape(tweet.content.text)}</p>
        </div>
      <footer class="tweet-foot">
        <div class="timeAgo">${timeAgo(tweet)}</div>
        <div id="icons">
          <i class="fa fa-heart"></i>
          <i class="fa fa-flag"></i>
          <i class="fa fa-retweet"></i>
        </div>
      </footer>
  </article>
  return $tweet;
};

$(document).ready(() => {
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then((response) => {
     $('tweet-holder').empty();
     renderTweets(response);
    })
  }
  
  loadTweets();
  $('form').submit(function(event) {
    event.preventDefault();
    const serialized = $(this).serialize();
  })
  
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: serialized
  }).then((response) => {
    console.log("Success!")
    loadTweets();
    $('#error').css('display', 'none');
    $('tweet-holder').val('');
    $('.counter').val('140');
  });
});
