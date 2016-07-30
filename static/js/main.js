$( document ).ready(() => {
  console.log('document ready');
  const URL = "http://127.0.0.1:3030/";

  $('a.light').click(function(event) {
    var pin = parseInt($(this).data('pin'));
    var value = parseInt($(this).data('value')) ? 0 : 1;

    console.log('pin', pin, 'value', value);
    $(this).data('value', value);
    $(this).toggleClass('btn-primary');

    function success(data) {
      console.log('success', data);
    }

    $.ajax({
      type: "GET",
      url: URL + 'pin/' + pin + "/" + value,
      data: {},
      success: success,
      dataType: 'json'
    });

    event.preventDefault();
  });

  $('a.switch').click(function(event) {
    var value = parseInt($(this).data('value')) ? 0 : 1;

    console.log('value', value);
    $(this).data('value', value);
    $(this).toggleClass('btn-primary');

    function success(data) {
      console.log('success', data);
    }

    var command = value ? 'turn-on' : 'turn-off';

    $.ajax({
      type: "GET",
      url: URL + 'pin/' + command,
      data: {},
      success: success,
      dataType: 'json'
    });

    event.preventDefault();
  });

});
