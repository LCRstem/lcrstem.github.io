
var rssContainer = document.querySelector('.rss-container');
var rssItem = document.getElementById('rss-item');
var rssSources = [
  'https://www.gerenzhuye.com/api/webInfo/getSubscribeArticle'
];
var currentRssIndex = 0;
var currentRssItemIndex = 0;
var apiKey = 'iaizwlvnlvypvn1qcjnossrguhsckfdsxlqppbur'; // 替换为你的API密钥
var lastUpdateTimes = {}; // 记录每个RSS源的最后更新时间

function fetchRssItems(url) {
  fetch(url)
    .then(response => response.json())
    .then(response => {
      if (response.code === 200 && response.data) {
        rssItem.innerHTML = ''; // 清空之前的RSS项

        var rssLink = document.createElement('div');
        rssLink.classList.add('rss-link');
        var item = response.data[currentRssItemIndex];
        var pubDate = new Date(item.createTime);
        var formattedDate = pubDate.toLocaleDateString();
        rssLink.innerHTML = `<a href="/article/${item.id}" target="_blank">${item.articleTitle} - ${formattedDate}</a>`;

        rssItem.appendChild(rssLink);

        currentRssItemIndex = (currentRssItemIndex + 1) % response.data.length;
        if (currentRssItemIndex === 0) {
          currentRssIndex = (currentRssIndex + 1) % rssSources.length;
        }
      }
    });
}

// 获取并解析所有RSS信息源的数据
rssSources.forEach(source => {
  fetchRssItems(source);
});

// 页面载入后延迟2秒后弹出效果
setTimeout(function() {
  rssContainer.classList.add('open');
}, 2000);

// 点击关闭按钮后隐藏容器
var closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', function() {
  rssContainer.style.display = 'none';
});

// 每隔8秒变换一次信息
setInterval(function() {
  currentRssIndex = (currentRssIndex + 1) % rssSources.length;
  fetchRssItems(rssSources[currentRssIndex]);
}, 8000);
// 修改检查更新的代码
setInterval(function() {
  rssSources.forEach(source => {
    fetch(source)
      .then(response => response.json())
      .then(response => {
        if (response.code === 200 && response.data && response.data.length > 0) {
          var latestItem = response.data[0];
          var pubDate = new Date(latestItem.createTime);
          if (!lastUpdateTimes[source] || pubDate > lastUpdateTimes[source]) {
            fetchRssItems(source);
            lastUpdateTimes[source] = pubDate;
          }
        }
      });
  });
}, 3600000);
