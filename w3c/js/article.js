$(document).ready(function(){

  //Get URL Parameters
  function getUrlParam(name) {
      var re = /<meta.*charset=([^"]+).*?>/i;
      var charset = document.documentElement.innerHTML.match(re)[1];
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        //console.log(unescape(r[2]));
        //console.log(decodeURIComponent(r[2]));
        if (charset == "utf-8") {
          // alert("document charset utf-8");
          return decodeURIComponent(r[2]);
        }
        else {
          // alert("document charset gbk");
          return unescape(r[2]);
        }
      }
      return null;
  }

  function isInArray(item, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == item) {
        return true;
      }
    }
    return false;
  }

  var g_category = getUrlParam('category');
  //console.log(g_category);

  $.ajax({
    type: "get",
    url: postfile,
    dataType: "json",
    success: function (data) {
      var posts = getPostsWithCategory(data, g_category);
      loadPosts(posts);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Postfile的JSON格式化错误" + errorThrown);
    }
  });

  //TimeAgo
  var showTimeAgo = function() {
    $("span.time").each(function(){
        $(this).text( $.timeago($(this).attr('date-time')) );
    });
  }

  //Activative
  var showActivedCategory = function(category) {
    if (category == null || category == "" || category == "All") {
      $("li[data='All']").addClass("active");
    } else {
      //console.log(category);
      $("li[data='" + category + "']").addClass("active");
    }
  }

  //Duoshuo
  var showDuoshuoData = function() {
    $.Duoshuo.settings = { shortName: duoshuoShortName };
    $(".post-data").duoshuo();
  }

  var getPostsWithCategory = function(data, category) {
    if (category == null || category == "" || category == "All") {
      return data;
    }
    var tmp = data; // this is a reference, if need copy use $.extend
    for (var i = 0; i < tmp.posts.length; i++) {
      if (! isInArray(category, tmp.posts[i].categories)) {
        tmp.posts.splice(i, 1);
        i--;  //while delete, the index should not increase
      }
    }
    return tmp;
  }

  var loadPosts = function(posts) {
    //console.log(posts);
    var text = baidu.template('post-list', posts);
    //console.log(text);
    $(".article-list").html(text);
    $("#middle-panel").css("margin-top", $("#top-menu").height()+20);
    showTimeAgo();
    showActivedCategory(g_category);
    showDuoshuoData();
  }

/* Handle Window Scroll Event */
  var WindowScrollDown = function(top) {
    if (top > 80) {
      $("#top-menu").fadeOut(50);
    }
  }
  var WindowScrollUp = function(top) {
    $("#top-menu").fadeIn(50);
  }

/* Event Listening */

  $(".article-list").ready(function(){
    //showTimeAgo();
  });

  var g_top_pos = 0;
  $(window).scroll(function(event){
    var top = $(window).scrollTop();
    //scroll down
    if (top > g_top_pos) {
      //console.log("down");
      WindowScrollDown(top);
    }
    //scroll up
    else {
      //console.log("up");
      WindowScrollUp(top);
    }
    g_top_pos = top;
  });

});
