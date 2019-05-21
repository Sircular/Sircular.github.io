// Scrolling Header
// Inspired by running header from Steve Losh's blog

// Conversion to ems, plus a padding
var CONTENT_WIDTH = 17 * 40 + 50;
var HEADER_WIDTH  = 160;
var CONTAINER_ID  = "content";
var FADING_SPACE  = 20;

var MIN_WINDOW_WIDTH = CONTENT_WIDTH+(HEADER_WIDTH*2) + 30;

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
  var aboveHeaders = headers.filter(function (h) {
    return h.getBoundingClientRect().top < labelElement.getBoundingClientRect().top;
  });
  if (aboveHeaders.length > 0) {
    return aboveHeaders[aboveHeaders.length-1];
  } else {
    return null;
  }
}

// set up all the data required
window.addEventListener('load', function() {
  var container    = document.getElementById(CONTAINER_ID);
  var headers      = getContentHeaders(container);
  var labelElement = createLabelElement();
  var enabled      = true;

  var scrollListen = function() {
    labelElement.style.visibility = enabled ? "visible" : "hidden";
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
    var dims = getWindowDimensions();

    // position the running header
    labelElement.style.right = (dims.width+CONTENT_WIDTH)/2 + "px";
    enabled                  = (dims.width >= MIN_WINDOW_WIDTH);
    scrollListen();
  };
  window.addEventListener('resize', resizeListen);
  resizeListen();

  container.appendChild(labelElement);
});
