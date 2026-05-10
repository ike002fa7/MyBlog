(function () {
  var SUPABASE_URL = 'https://eiakfxsvzmtvvfojtkln.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_g6uC-elVHyXAGaI-zy7bKQ_SoXsodpc';

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
          c.querySelector('.views-count').textContent = data[0].views || 0;
          c.querySelector('.likes-count').textContent = data[0].likes || 0;
          c.querySelector('.comments-count').textContent =
            data[0].comments || 0;
        }
      });
  });
})();
