document.addEventListener("DOMContentLoaded", function() {
  var popup = document.querySelector(".popup");
  var popupText = document.getElementById("popupText");

  // 定义要显示的文字列表
  var texts = ["📢：这是LCRstem的个人主页","🔔：可切换模式风格","♥喜欢就右键赞赏一下吧！","本网站是开源的","🤔？","🎶右下角可以播放音乐！","左侧栏有网页菜单！"];
  var currentIndex = 0;
  function updatePopupText() {
      popupText.innerHTML = texts[currentIndex];
      currentIndex = (currentIndex + 1) % texts.length;
  }
  updatePopupText();
  function showPopup() {
      popup.style.top = "20px";
  }
  function hidePopup() {
      popup.style.top = "-100px";
  }
  setInterval(function() {
      showPopup();
      setTimeout(function() {
          hidePopup();
      }, 3000); // 弹出时间为3秒
      updatePopupText(); 
  }, 4000); // 设置时间间隔为4秒
});
