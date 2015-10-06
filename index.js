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

function GhostType (targetId, options) {
  this.options = options || {
    interval : 50,
    delay : 2000
  }
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
}

GhostType.prototype.resume = function stop() {
  this.tick_();
}

/* reset content */
GhostType.prototype.reset = function reset() {
  this.clearTimeout();
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
  var name = window.prompt(question, 'visitor') || 'visitor';
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
  
  var selector = args[1];
  
  var props = {};
  var style = args[2];
  var val = args[3] || '';
  
  props[style] = val;
  
  var duration = parseInt(args[4]) || 500;
  $(selector).animate(props, duration, 'swing', function () {
    next();
  });
}
typer.actions.alert = function (args, next, typer) {
  var text = args.slice(1).join(' ');
  alert(text);
  next();
}
typer.start();