$(function() {
  $('.dl').on('click', e => {
    let url = e.target.src;
    if ($(e.target).data('original')) {
      url = $(e.target).data('original');
    }
    let name = url.replace(/.*\//, '');
    if ($(e.target).data('check')) {
      if (!$('#agree').prop("checked")) {
        alert('You have to agree the copyright above.');
        return;
      }
    }
    saveAs(url, name);
  });
});