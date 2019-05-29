$.getJSON('/articles', function(data){
  data.forEach(function(data){
    $('article-display').append(`<p data-id='${data[i]._id}> ${data[i].title} <br/> ${data[i].link}</p>`);
  });
});