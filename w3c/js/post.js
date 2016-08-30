//
// Only For Post
//

$(document).ready(function(){

  $.ajax({
    type: "get",
    url: sitefile,
    dataType: "json",
    success: function (data) {
      loadSiteData(data);
      loadDuoshuoData();
      loadShuoshuoData();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Sitefile的JSON格式化错误" + errorThrown);
    }
  });

  var loadSiteData = function(data) {
    $("#totalPosts").text(data.site.totalPosts);
    $("#totalWords").text(data.site.totalWords);
  }

  //Duoshuo
  var loadDuoshuoData = function() {
    $PC("http://"+duoshuoShortName+".duoshuo.com/api/posts/list.json", function(data){
      $("#totalComments").text(data.cursor.total);
    });
    $.Duoshuo.settings = { shortName: duoshuoShortName };
    $(".post-data").duoshuo();
  }

  // Shuoshuo
  var loadShuoshuoData = function() {
    $PC("http://"+duoshuoShortName+".duoshuo.com/api/threads/listPosts.json?thread_key=shuoshuo", function(data){
      try {
        var message = data.parentPosts[data.response[0]].message;
        $("#shuoshuo").html(message);
        // if you want to show data with html tag, use html()
        // else if you only want to show plain text even has html tag, use text()
        // others if you want to change the input or checkbox value, use val()
      }catch(e){}
    });
  }

});
