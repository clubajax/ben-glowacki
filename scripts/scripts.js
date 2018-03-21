

$(document).ready(function(){
  $('#frmSubscribe').on('submit', function(e){
    e.preventDefault();
    var len = $('#txtName').val().length;
    if (len < 3) {
      alert("Please enter your name.");
      $('#txtName').focus();
      return false;
    }
    if (!isValidEmailAddress($('#txtEmail').val())) {
      alert("Please enter a valid email address.");
      $('#txtEmail').focus();
      return false;
    }
    this.submit();
  });
});

function isValidEmailAddress(emailAddress) {
  if (emailAddress.length < 4) {
    return false;
  }
  var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
  return pattern.test(emailAddress);
};
