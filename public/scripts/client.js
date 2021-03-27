/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  const renderTweets = function(tweets) {

    for (const item of tweets) {
      $('#all-tweets').prepend(createTweetElement(item));
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
      renderTweets(data);
    });
  }

  loadTweets();

  $("form").on( "submit", function( event ) {
    event.preventDefault();

    const sendData = {
        name : $(".topHeader .name h2").html(),
        avatars : $(".topHeader img").attr("src"),
        text : $("textarea").val()
    };
    //console.log($(sendData).serialize());
   
    if (sendData.text === "") {
      alert("Please write something to tweet!")
    } else if (sendData.text.length > 140) {
      alert("Your tweet exceeds the 140 character limit")
    } else {
      $.ajax({
        url: '/tweets',
        dataType: 'text',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: sendData
      }).then(function(){
        loadTweets();
        $("textarea").val('');
      })
    }

  });
  

});