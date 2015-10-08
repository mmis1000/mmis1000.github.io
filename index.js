if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}

function GhostType (targetId, options) {
  this.options = options || {
    interval : 50,
    delay : 2000
  };
  this.targetId = targetId;
  this.target = $(this.targetId);
  
  this.playing = false;
  
  this.timeoutId = null;
  this.data = {
    $originalText : null,
    $remainingTexts : null, //array of text
    $currentText : null,
  };
  
  this.actions = {
    delay : function (args, next, typer) {
      var waitTime = parseInt(args[1], 10)
      if (!isNaN(waitTime)) {
        typer.setTimeout(next, waitTime);
      } else {
        next();
      }
    },
    setTypeInterval : function (args, next, typer) {
      var interval = parseInt(args[1], 10)
      if (!isNaN(interval)) {
        typer.options.interval = interval;
      }
      next();
    },
    removeText:function (args, next, typer) {
      var length = parseInt(args[1], 10)
      if (!isNaN(length)) {
        typer.data.$remainingTexts.splice(0, length);
      }
      next();
    },
    type :function (args, next, typer) {
      var text = args.slice(1).join(' ');
      typer.data.$remainingTexts.splice.apply(typer.data.$remainingTexts, [0, 0].concat(text.split('')));
      next();
    },
    deleteLine: function (args, next, typer) {
      var lines, length = parseInt(args[1] || '1', 10)
      if (isNaN(length)) {
        length = 1
      }
      lines = typer.data.$currentText.split(/<br\/?>/);
      while (length--) {
        lines.pop();
      }
      typer.data.$currentText = lines.join('<br>');
      next();
    },
    clear: function (args, next, typer) {
      typer.data.$currentText = '';
      next();
    },
    reset: function (args, next, typer) {
      typer.reset();
    }
  };
  this.handles = {
    start: function () {},
    stop: function () {}
  }
}

GhostType.prototype.start = function start() {
  this.reset();
  
  this.data.$originalText = 
    this.data.$originalText || 
    $(this.targetId).html();
  this.data.$remainingTexts = this.data.$originalText.replace(/\s+/g, ' ').split("");
  this.data.$currentText = "";
  
  $(this.targetId).html('');
  
  this.playing = true;
  
  this.handles.start.call(this);
  
  this.setTimeout(this.tick_.bind(this), this.options.delay);
}
/* control timeout */
GhostType.prototype.setTimeout = function setTimeout_(func, delay) {
  if (this.timeoutId) {
    clearTimeout(this.timeoutId);
    if (window.console && window.console.error) {
      window.console.error(new Error('setTimeout during timeout exist'), func);
    } else {
      window.alert(new Error('setTimeout during timeout exist'), func);
    }
  }
  this.timeoutId = setTimeout(function () {
    this.clearTimeout();
    func();
  }.bind(this), delay);
}

GhostType.prototype.clearTimeout = function clearTimeout_() {
  clearTimeout(this.timeoutId);
  this.timeoutId = null;
}


/* control the tick loop */
GhostType.prototype.stop = function stop() {
  this.clearTimeout();
  this.playing = false;
  
  this.handles.stop.call(this);
}

GhostType.prototype.resume = function stop() {
  this.tick_();
}

/* reset content */
GhostType.prototype.reset = function reset() {
  this.stop();
  if (this.data.$originalText !== null) {
    this.target.html(this.data.$originalText);
  }
}
/* parse and decide next action */
GhostType.prototype.tick_ = function tick_() {
  var i, commetInner, action, args;
  if (this.data.$remainingTexts.length === 0) {
    this.playing = false;
    return;
  }
  if (this.data.$remainingTexts.slice(0, 4).join('') !== "<!--") {
    this.type(this.data.$remainingTexts.shift());
    this.setTimeout(this.tick_.bind(this), this.options.interval);
  } else {
    for (var i = 0; i < this.data.$remainingTexts.length; i++) {
      if (this.data.$remainingTexts.slice(i, i + 3).join('') === "-->") {
        commetInner = this.data.$remainingTexts.slice(4, i).join('');
        this.data.$remainingTexts.splice(0, i + 3);
        commetInner = commetInner.replace(/^\s+|\s+$/g, '');
        break;
      }
    }
    if (commetInner && commetInner[0] === "$") {
      args = commetInner.split(' ');
      args[0] = args[0].slice(1);
      if (this.actions[args[0]]) {
        this.actions[args[0]](args, this.tick_.bind(this), this)
        return;
      }
    }
    
    this.type(this.data.$remainingTexts.shift());
    this.setTimeout(this.tick_.bind(this), this.options.interval);

  }
}

GhostType.prototype.type = function type(char) {
  this.data.$currentText += char;
  this.target.html(this.data.$currentText);
}

var typer = new GhostType(".about-inner p");

typer.actions.who = function (args, next, typer) {
  var question = args.slice(1).join(' ');
  var name = typer.data.visitorName || window.prompt(question, 'visitor') || 'visitor';
  typer.data.visitorName = name;
  typer.data.$remainingTexts.splice.apply(typer.data.$remainingTexts, [0, 0].concat(name.split('')));
  next();
};
typer.actions.setStyle = function (args, next, typer) {
  var style = args[1];
  var prop = args[2] || '';
  typer.target.css(style, prop);
  next();
};
typer.actions.animate = function (args, next, typer) {
  var called = false;
  var selector = args[1];
  
  var props = {};
  var style = args[2];
  var val = args[3] || '';
  
  props[style] = val;
  
  var duration = parseInt(args[4]) || 500;
  $(selector).animate(props, duration, 'swing', function () {
    if (called) return;
    called = true;
    next();
    console.log(args);
  });
}
typer.actions.alert = function (args, next, typer) {
  var text = args.slice(1).join(' ');
  alert(text);
  next();
}
typer.actions.scrollTo = function (args, next, typer) {
  var called = false;
  var target = $(args[1]);
  console.log(target);
  var yPos = target.offset().top;
  var time = parseInt(args[2]);
  if (isNaN(time)) {
    time = 1000;
  }
  $('html,body').animate({scrollTop: yPos}, time, 'swing', function () {
    if (called) return;
    called = true;
    next();
  });
  
}
$(".control").removeClass("hide");
$(".control").on("click", function () {
  if (!typer.playing) {
    typer.reset();
    typer.start();
    $(this).removeClass('play').addClass('stop');
  } else {
    typer.reset();
    $(this).removeClass('stop').addClass('play');
  }
});
typer.handles.start = function () {
  $(".control").removeClass('play').addClass('stop');
}
typer.handles.stop = function () {
  $(".control").removeClass('stop').addClass('play');
}
//typer.start();



/* fix ie 8 checked */
$('#toggle-menu').on('change', function () {
  var _ = $(this);
  if (_.is(':checked')) {
    _.addClass('checked');
  } else {
    _.removeClass('checked');
  }
  if ($('html').hasClass('ie-8')) {
    if (_.is(':checked')) {
      $('.nav .overlay').css('display', 'block');
    } else {
      $('.nav .overlay').css('display', 'none');
    }
  }
})
$('label').on('click', function () {
  var id = '#' + $(this).attr('for');
  if ($('html').hasClass('ie-8')) {
    $(id).prop('checked', !$(id).prop('checked'));
  }
  $(id).trigger('change');
})

/* make nav color transform */
;(function () {
  function throttle (func, delay) {
    var id = null;
    return function () {
      if (!id) {
        id = setTimeout(function () {
          id = null;
          func();
        }, delay)
      }
    }
  }
  if (!window.console) {
    window.console = {
      log : window.alert
    };
  }
  var navHeight = $('nav').height();
  var header = $('header');
  var headerBottom = $('header').offset().top + $('header').outerHeight() - navHeight;
  var color = [92, 92, 92];
  var initAlpha = 0;
  var finalAlpha = 0.7;
  var ie8 = '#606060';
  var handle = throttle(function (ev) {
    var alpha;
    var currentScroll = $(window).scrollTop();
    //console.log(navHeight, headerBottom, currentScroll);
    if (currentScroll < headerBottom - navHeight) {
      alpha = initAlpha;
    } else if (headerBottom < currentScroll) {
      alpha = finalAlpha;
    } else {
      alpha = ((headerBottom - currentScroll) * initAlpha +
               (currentScroll - headerBottom + navHeight) * finalAlpha)
        / navHeight;
    }
    //alert('rgba(' + color.concat([alpha]).join('') + ')');
    var bg = 'rgba(' + color.concat([alpha]).join(',') + ')';
    if ($('html').hasClass('ie-8') && headerBottom < currentScroll) {
      bg = ie8;
    }
    $('nav').css('background', bg);
    //console.log(alpha, bg);
  }, 100);
  $(document).on('scroll', handle);
  $(window).scroll(handle);
  $(window).on('resize', function () {
    navHeight = $('nav').height();
    headerBottom = $('header').offset().top + $('header').outerHeight() - navHeight;
    $(document).trigger('scroll');
    $(window).trigger('scroll');
  })
} ());

/* make scroll smooth */

/**
* Check a href for an anchor. If exists, and in document, scroll to it.
* If href argument ommited, assumes context (this) is HTML Element,
* which will be the case when invoked by jQuery after an event
*/
;(function () {
  function scroll_if_anchor(href) {
    var ev = typeof(href) == "string" ? null : href;
    href = typeof(href) == "string" ? href : $(this).attr("href");

    // You could easily calculate this dynamically if you prefer
    var fromTop = 0;

    // If our Href points to a valid, non-empty anchor, and is on the same page (e.g. #foo)
    // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174
    if(href.indexOf("#") == 0) {
      var $target = $(href);
      // Older browser without pushState might flicker here, as they momentarily
      // jump to the wrong position (IE < 10)
      if($target.get().length) {
        if (ev) {ev.preventDefault();}
        $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
        if(history && "pushState" in history) {
          history.pushState({}, document.title, window.location.pathname + href);
          return false;
        }
      }
    }
  }    

  // When our page loads, check to see if it contains and anchor
  scroll_if_anchor(window.location.hash);

  // Intercept all anchor clicks
  $("body").on("click", "a", scroll_if_anchor);

}());

/* link scrollspy */
;(function () {
  var spyLinks = [
    "#about-wrapper",
    "#from",
    "#learning",
    "#contact",
    "#copyright"
  ];
  var offsets = 40;
  var linkContainers = spyLinks.map(function (val) {
    return $('a[href=' + val + ']').parent();
  });
  var elements = spyLinks.map(function (val) {
    return $(val);
  });
  var areas = null;
  function getAreas() {
    areas = elements.map(function (el) {
      return [
        el.offset().top,
        el.offset().top + el.outerHeight()
      ]
    })
  }
  getAreas();
  
  //console.log(linkContainers, elements, areas);
  var scrollHandle = function () {
    var currentScroll = $(window).scrollTop() + offsets;
    var max = areas.length - 1;
    var foundIndex = null;
    var index;
    for (index = 0; index < max + 1; index++) {
      if (currentScroll < areas[index][1]) {
        break;
      }
    }
    //console.log(currentScroll, areas, index);
    index = index > max ? max : index;
    linkContainers.map(function (el) {
      el.removeClass('selected');
    })
    linkContainers[index].addClass('selected');
  }
  $(document).on('scroll', scrollHandle);
  $(window).scroll(scrollHandle);
  $(window).on('resize', function () {
    getAreas();
    $(document).trigger('scroll');
    $(window).trigger('scroll');
  });
}());

/* force anything related to scroll init */
$(document).trigger('scroll');
$(window).trigger('scroll');