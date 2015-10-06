var target = ".about-inner p";
var interval = 50;
var delay = 2000;

var originalText = $(target).text().split("");
$(target).text('');


var currentText = '';
function type() {
  if (originalText.length > 0) {
    currentText += originalText.shift();
    $(target).text(currentText);
    setTimeout(type, interval);
  }
}
setTimeout(type, delay);
