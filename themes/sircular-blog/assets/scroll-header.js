// Scrolling Header
// Inspired by running header from Steve Losh's blog

var HEADER_WIDTH       = 160;
var HEADER_PADDING     = 0;
var CONTAINER_SELECTOR = "#content";
var CONTENT_SELECTOR   = ".container"

// helper function because things are inconsistent
// why is this the accepted method
function getWindowDimensions() {
  return {
    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  };
}

function getContentHeaders(container) {
  var nodes = container.querySelectorAll("h2");
  return Array.from(nodes);
}

function createLabelElement() {
  var element = document.createElement("div");
  element.id = "scrolling-header";
  // we're gonna rely on a stylesheet for the rest of the style
  element.style.width = HEADER_WIDTH+"px";
  element.style.transition = "opacity 0.15s"; // for nice fading
  return element;
}

// get the header that is right above the running header
function getCurrentHeader(labelElement, headers) {
  if (labelElement == null || headers == null || headers.length == 0) {
    return null;
  }
  // iterate backwards to find the closest one above
  for (var i = headers.length-1; i >= 0; i--) {
    var h = headers[i];
    if (h.getBoundingClientRect().top < labelElement.getBoundingClientRect().top) {
      return h;
    }
  }
  return null;
}

// set up all the data required
window.addEventListener('load', function() {
  var container    = document.querySelector(CONTAINER_SELECTOR);
  var content      = container.querySelector(CONTENT_SELECTOR);
  var headers      = getContentHeaders(container);
  var labelElement = createLabelElement();

  var scrollListen = function() {
    var header = getCurrentHeader(labelElement, headers);
    if (header == null) {
      labelElement.style.opacity = 0;
    } else {
      labelElement.innerText = header.innerText;
      labelElement.style.opacity = 1;
    }
  };
  window.addEventListener('scroll', scrollListen);

  var resizeListen = function() {
    var windowWidth = getWindowDimensions().width;
    var contentWidth = content.clientWidth;

    var minWindowWidth = contentWidth + (HEADER_WIDTH+HEADER_PADDING)*2;

    // position the running header
    labelElement.style.right      = (windowWidth + contentWidth)/2 + HEADER_PADDING + "px";
    labelElement.style.visibility = (windowWidth >= minWindowWidth) ? "visible" : "hidden";
    scrollListen();
  };
  window.addEventListener('resize', resizeListen);
  resizeListen();

  container.appendChild(labelElement);
});
