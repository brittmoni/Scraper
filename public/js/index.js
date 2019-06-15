$.getJSON('/articles', function(data){
  data.forEach(function(){
    $('#article-display').append(`<p data-id='${data[i]._id}> ${data[i].title} <br/> ${data[i].link}</p>`);
  });
})

  $(document).on('click', 'p', function() {
    $('#notes-display').empty();
    var tagID = $(this).attr('p-id')

    $.ajax({
      method: 'GET',
      url: '/articles' + tagID
    }).then(function(data) {
      $('#notes-display').append(`<h2>${data.title}</h2>`)
      $('#notes-display').append(`<input id='note-title' name='note-title'>`)
      $('#notes-display').append(`<textarea id='note-text' name='note'></textarea>`)
      $('#notes-display').append(`<button data-id='${data._id}' id='save'>Save</button`)   
    })

    if (data.newNote) {
      $('#note-title').val(data.newNote.noteName);
      $('#note-text').val(data.newNote.note);
    }
  })

  $(document).on('click', '#save', function() {
    var newId = $(this).attr('new-id')

    $.ajax({
      method: 'POST',
      url: '/articles/' + newId,
      data: {
        noteName: $('#note-title').val(),
        note: $('#note-text').val()
      }
    }).then(function(data){
      $('#notes-display').empty();
    })
  })

  $('#note-title').val('');
  $('#note-text').val('');
});