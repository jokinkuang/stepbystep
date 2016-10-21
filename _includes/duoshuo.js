<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', '{{ site.google_analytics_id }}', 'auto');
  ga('send', 'pageview');
</script>
<script type="text/javascript">
  var duoshuoQuery = {short_name:"{{ site.duoshuo_short_name }}"};
  var duoshuoDir = "{{ site.duoshuo_url }}";
  duoshuoDir = duoshuoDir.substring(0, duoshuoDir.lastIndexOf("/")+1);
  //console.log(duoshuoDir);
  var duoshuoShortName = "{{ site.duoshuo_short_name }}";
  var duoshuoUserName = "{{ site.duoshuo_user_name }}";
</script>
<script src="{{ site.duoshuo_url }}"></script>
<style type="text/css">
/**************override duoshuo css*************/
#ds-share #ds-reset.ds-share-inline {
  margin: 0 7px;
}
#ds-thread {
  margin: 5px 10px 5px 5px;
}
#ds-thread #ds-reset .ds-login-buttons .ds-social-links {
	width: auto;
}
#ds-notify {
  bottom: 5px;
  right: 5px;
}
#ds-thread #ds-reset a.ds-user-name[data-user-id='{{ site.duoshuo_user_uid }}']:after {
	content: "博主";
	margin-left: 6px;
	font-size: 12px;
	color: #ffffff;
	background: rgba(62, 46, 46, 0.35);
	border-radius: 4px;
	padding: 1px 3px;
}
#ds-thread #ds-reset span.ds-user-name:after {
  content: "游客";
  margin-left: 6px;
  font-size: 12px;
  color: #bbb6ae;
  /* background: rgba(62, 46, 46, 0.35); */
  border-radius: 4px;
  padding: 1px 3px;
}
/* hot comments */
#ds-thread #ds-reset #ds-hot-posts {
  border-radius: 10px;
}
/* share checkbox */
#ds-thread #ds-reset .ds-post-options .ds-sync {
  display: none;
}
/* comments */
#ds-thread #ds-reset li.ds-tab a.ds-current {
  border: 0px;
}
/* smiles */
#ds-smilies-tooltip {
  width: initial;
  max-width: 600px;
  margin-right: 15px;
}
#ds-smilies-tooltip ul.ds-smilies-tabs {
  width: 80px;
}
#ds-smilies-tooltip .ds-smilies-container {
  margin-left: 80px;
}
/* likes */
#ds-thread #ds-reset a.ds-like-thread-button {
  background: none;
  border: none;
}
/* image */
#ds-thread #ds-reset .ds-replybox .ds-avatar img {
  margin-left: -8px;
}
</style>
<!--多说的通知区域是从脚本插入的，要覆盖它的样式，也需要在脚本里覆盖，暂时不做 @2016-8-2-->
