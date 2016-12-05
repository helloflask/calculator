$(document).ready(function() {
  var clearData = function() {
    $('#num1').val('');
    $('#operator').val('');
    $('#num2').val('');
    $('#temp').val('');
  };

  var clearOutput = function() {
    $('#output').html('');
    $('#output2').html('');
  };

  $('.nums').click(function() {
    if (('+-*/').indexOf($('#output').html()) != -1) {
      $('#output').html('');
    }

    if ($('#output').html() == '0' || $('#output2').html() == 'Reach Digit Limit') {
      clearOutput()
    }

    if ($('#temp').val() !== '') {
      clearOutput()
      clearData();
    }

    $('#output').append($(this).val());
    $('#output2').append($(this).val());
    if ($('#output').html().length > 12) {
      $('#output').html('0');
      $('#output2').html('Reach Digit Limit');
    }
  });

  $('#clearButton').click(function() {
    $('#output').html('0');
    $('#output2').html('');
    clearData();
  });

  $('.btn-operate').click(function() {
    var operator = $(this).val();
    if ($('#num1').val() !== '' && $('#operator').val() !== '') {
      $('#num2').val($('#output').html());
      $.getJSON($SCRIPT_ROOT + '/_calculate', {
        num1: $('#num1').val(),
        operator: $('#operator').val(),
        num2: $('#num2').val()
      }, function(data) {
        if (data.result.toString().length > 16) {
          $('#output').html('0');
          $('#output2').html('Reach Digit Limit');
          $('#temp').val(0);
        } else {
          $('#output').html(operator);
          $('#output2').append(operator);
          $('#num1').val(data.result);
          $('#operator').val(operator);
        }
      });
    } else {
      $('#num1').val($('#output').html());
      $('#operator').val($(this).val());
      $('#output').html(operator);
      $('#output2').append($(this).val());
    }
  });

  $('#resultButton').click(function() {
    $('#num2').val($('#output').html());
    $.getJSON($SCRIPT_ROOT + '/_calculate', {
      num1: $('#num1').val(),
      operator: $('#operator').val(),
      num2: $('#num2').val()
    }, function(data) {
      if (data.result.toString().length > 16) {
        $('#output').html('0');
        $('#output2').html('Reach Digit Limit');
        $('#temp').val(0);
      } else {
        $('#output').html(data.result);
        $('#output2').html('');
        $('#temp').val(data.result);
      }
    });
  });
});