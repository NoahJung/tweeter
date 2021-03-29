/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  // for preventing script text from tweets
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // tweet list rendering
  const renderTweets = function(tweets) {
    for (const item of tweets) {
      $('#all-tweets').prepend(createTweetElement(item));
    }
  }

  // print a tweet article
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

  // Get tweet data as json, invoke renderTweets
  const loadTweets = function() {
    $.getJSON( "/tweets", function(data){
      renderTweets(data);
    });
  }

  loadTweets();   // load tweet when index page is ready.


  // new-tweet submit event
  $("form").on( "submit", function( event ) {
    event.preventDefault();

    const text = $('textarea').val();
    const errAlert = $('.errorM');
    errAlert.css("display","none");
   
    if (text.length === 0 || !text.trim()) {              // when the tweet text is whitespace
      errAlert.text("Please write something to tweet!")
              .css("display","block").hide().slideDown();
    } else if (text.length > 140) {                           // when the tweet text is over 140 characters limit
      errAlert.text("Your tweet exceeds the 140 character limit")
              .css("display","block").hide().slideDown();
    } else {
      // post submit data 
      $.ajax({
        url: '/tweets',
        dataType: 'text',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: $(this).serialize()                       // data formating : query string
      }).then(function(){
        loadTweets();                     // reload tweet list with new tweet data
        $("textarea").val('');            // clear textarea
        $("output").text("140");          // reset counter
      })
    }

  });


  // compose button on nav
  $(".composeBT").on( "click", function( event ){
    event.preventDefault();

    $(".new-tweet").css("display","block");
    $('textarea').focus();
  });
  

});