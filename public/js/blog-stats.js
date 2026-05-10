(function () {
  var SUPABASE_URL = 'https://eiakfxsvzmtvvfojtkln.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_g6uC-elVHyXAGaI-zy7bKQ_SoXsodpc';

  function animateCount(el, target) {
    if (!el) return;
    var current = 0;
    var duration = 600;
    var step = Math.max(1, Math.ceil(target / 30));
    var interval = duration / (target / step);
    el.classList.add('stat-loaded');
    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, interval);
  }

  document.querySelectorAll('.stats-counter').forEach(function (c) {
    var slug = c.getAttribute('data-slug');
    fetch(
      SUPABASE_URL +
        '/rest/v1/blog_stats?slug=eq.' +
        encodeURIComponent(slug) +
        '&select=views,likes,comments',
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: 'Bearer ' + SUPABASE_KEY,
        },
      }
    )
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (data[0]) {
          animateCount(c.querySelector('.views-count'), data[0].views || 0);
          animateCount(c.querySelector('.likes-count'), data[0].likes || 0);
          animateCount(c.querySelector('.comments-count'), data[0].comments || 0);
        } else {
          // 无数据时显示 0
          ['.views-count', '.likes-count', '.comments-count'].forEach(function(sel) {
            var el = c.querySelector(sel);
            if (el) el.textContent = '0';
          });
        }
      })
      .catch(function () {
        // 网络错误时显示 0
        ['.views-count', '.likes-count', '.comments-count'].forEach(function(sel) {
          var el = c.querySelector(sel);
          if (el) el.textContent = '0';
        });
      });
  });
})();
