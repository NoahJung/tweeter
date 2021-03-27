/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
        <p>${escape(tweet.content.text)}</p>
        <footer>
          <span>OOdays ago</span>
          <span>icons</span>
        </footer>
      </article>
    </a>`
    
    return $tweet;
  }

  const loadTweets = function() {
    // $.ajax('/tweets', { method: 'GET' })
    // .then(function() {
    //   renderTweets(data);
    // });
    $.getJSON( "/tweets", function(data){
      renderTweets(data);
    });

  }

  loadTweets();

  $("form").on( "submit", function( event ) {
    event.preventDefault();

    const text = $('textarea').val();
    const errAlert = $('.errorM');
    errAlert.css("display","none");
   
    if (text.length === 0 || !text.trim()) {
      errAlert.text("Please write something to tweet!")
              .css("display","block").hide().slideDown();
    } else if (text.length > 140) {
      errAlert.text("Your tweet exceeds the 140 character limit")
              .css("display","block").hide().slideDown();
    } else {
      $.ajax({
        url: '/tweets',
        dataType: 'text',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: $(this).serialize()
      }).then(function(){
        loadTweets();
        $("textarea").val('');
      })
    }

  });
  

});