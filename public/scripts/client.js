/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  const renderTweets = function(tweets) {
    
    for (const item of tweets) {
      $('#all-tweets').append(createTweetElement(item));
    }

  }

  const createTweetElement = function(tweet) {
    let $tweet = `<a class="effect">
      <article class="tweet">
        <header>
          <div>
            <img src="${tweet.user.avatars}"/>
            <span>${tweet.user.name}</span>
          </div>
          <span class="userID">${tweet.user.handle}</span>
        </header>
        <p>${tweet.content.text}</p>
        <footer>
          <span>OOdays ago</span>
          <span>icons</span>
        </footer>
      </article>
    </a>`
    return $tweet;
  }

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      console.log(data);
      renderTweets(data);
    });
  }

  loadTweets();

  $("form").on( "submit", function( event ) {
    event.preventDefault();
    const result = $(this).serialize();
    console.log(result);
    console.log(typeof result);
    return result["text"];
  });

  

});