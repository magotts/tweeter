/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let textArea = document.createElement("textarea");
  textArea.appendChild(document.createTextNode(str));
  return textArea.innerHTML;
};

const createTweetElement = function (dataObj) {
  const article =
    /* Your code for creating the tweet element */
    ` <section class="new-tweet1">
    <div class="userInfo">
         <div class="userImage">
        <img src="${dataObj.user.avatars}" width="50" height="50"></img>
       <p>${dataObj.user.name}</p></div>

        <p>${dataObj.user.handle}</p>
       </div>

      <article class="tweetContainer">${escape(dataObj.content.text)}</article>
     
      <footer class="footer"><p>
      <time class="timeago" datetime="${jQuery.timeago(
        new Date(dataObj.created_at)
      )}">${jQuery.timeago(new Date(dataObj.created_at))}</time>
  </p>
        <p><i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </p>
      </footer>
      </section>`;

  return article;
};

const renderTweets = function (data) {
  $(".tweets").empty();
  for (const dataObj of data) {
    $(".tweets").prepend(createTweetElement(dataObj));
  }
};

const loadTweets = function () {
  $.ajax("/tweets", { method: "GET", datatype: "JSON" }).done((data) => {
    renderTweets(data);
  });
};

$(document).ready(function () {
  loadTweets();

  jQuery(document).ready(function () {
    jQuery("time.timeago").timeago();
  });

  console.log("Hello from client.js");

  $("#tweetPost").submit((event) => {
    console.log("submittted");
    event.preventDefault();
    // const tweetText = $("#tweet-text").text();

    if ($("#counterText").val() < 0) {
       $(".errorBox").slideDown();
    } else if ($("#counterText").val() == 140) {
      $(".errorBox1").slideDown();
    } else {
      $(".errorBox").slideUp();
      $(".errorBox1").slideUp();
      $.ajax("/tweets", {
        method: "POST",
        data: $("#tweet-text").serialize(),
      }).done(() => {
        loadTweets();
        $(".errorBox").slideUp();
        $(".errorBox1").slideUp();
      });

      $("#tweet-text").val("");
      $("#counterText").text("140");
    }

  });
});
