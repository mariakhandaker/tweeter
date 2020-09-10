/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
].

const renderTweets = function(tweets) {
  const orderedTweets = tweets.sort((a, b) => { a.created_at - b.created_at });
  for (let tweet of orderedTweets) {
    const newTweet = createTweetElement(tweet);
    $('#tweet-holder').append(newTweet);
  }
}

const timeAgo = function(tweet) {
  const time_ago = tweet.created_at/1000;
  const currentTime = new Date;
  let seconds = currentTime - time_ago;
  if (seconds <= 60) {
    return "just now";
  } else {
    let minutes = Math.round(seconds / 60);
    if (minutes <= 60) {
      if (minutes == 1) {
        return "one minute ago";
      } else {
        return minutes + " minutes ago";
      }
    } else {
      let hours = Math.round(seconds / 3600);
      if (hours <= 24) {
        if (hours == 1) {
          return "an hour ago";
        } else {
          return hours + " hrs ago";
        }
      } else {
        let days = Math.round(seconds / 86400);
        if (days <= 7) {
          if (days == 1) {
            return "yesterday";
          } else {
            return days + " days ago";
          }
        } else {
          let weeks = Math.round(seconds / 604800);
          if (weeks <= 4.3) {
            if (weeks == 1) {
              return "a week ago";
            } else {
              return weeks + " weeks ago";
            }
          } else {
            let months = Math.round(seconds / 2600640);
            if (months <= 12) {
              if (months == 1) {
                  return "a month ago";
              } else {
                  return months + " months ago";
              }
            } else {
              let years = Math.round(seconds / 31207680);
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
   

const createTweetElement = function(tweet) {
  
  
 let $tweet =
  <article class="tweet-holder">
    <header>
          <div class="tweet-top">
            <img src="${tweet.user.avatars}">
            <p id="tweeter-username">${tweet.user.name}</p>
          </div>
          <p id="tweeter-handle">${tweet.user.handle}</p>
        </header>
        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        </div>
      <span class="tweet-foot">
         <p>3 min ago</p>
        <div class="icons">
          <i class="fa fa-heart"></i>
          <i class="fa fa-flag"></i>
          <i class="fa fa-retweet"></i>
        </div>
        </span>
return $tweet;
};

renderTweets(data);
