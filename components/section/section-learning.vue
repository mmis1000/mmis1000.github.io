<template>
  <section id="learning" class="page learning">
    <h2>What am I learning?</h2>
    <section class="skill">
      <div class="skill-inner">
        <i class="fa fa-html5 fa-5x" style="color: #ff7755"></i>
        <h3>HTML</h3>
        <p class="text">
          <em>H</em>yper <em>T</em>ext <em>M</em>arkup <em>L</em>anguage
        </p>
        <p class="text">
          It's text, but hyper than text. Allow images, audios, videos and other to be embedded with markups.
        </p>
        <p class="text">
          HTML describes the structure of a website semantically along with cues for presentation, making it a markup
          language, rather than a programming language.
        </p>
      </div>
    </section>
    <section class="skill">
      <div class="skill-inner">
        <i class="fa fa-css3 fa-5x" style="color: #5577ff"></i>
        <h3>CSS</h3>
        <p class="text">
          <em>C</em>ascading <em>S</em>tyle <em>S</em>heets
        </p>
        <p class="text">
          Use it to decorate the HTML, give it a new look!
        </p>
        <p class="text">
          CSS is a style sheet language used for describing the presentation of a document written in a markup language
        </p>
      </div>
    </section>
    <section class="skill">
      <div class="skill-inner">
        <div class="js-icon">

        </div>
        <h3>JS</h3>
        <p class="text"><em>J</em>ava<em>S</em>cript</p>
        <p class="text">
          The programming language running in the browser (but no only in browser). Make all magic happend!
        </p>
        <p class="text">
          JavaScript is a high level, dynamic, untyped, and interpreted programming language. It has been standardized
          in the ECMAScript language specification.
        </p>
      </div>
    </section>
  </section>
</template>
<style scoped>


.learning {
  text-align:center;
  background: #ffffff;
  
  padding-top: 2em;
  padding-bottom: 2em;
}
.learning .skill {
  width: 100%;
  display: inline-block;
  position:relative;
  vertical-align:top;
}
.learning .skill .skill-inner {
  margin-left:auto;
  margin-right:auto;
  background: #ffffff;
  width: 95%;
  margin-bottom:0.5em;
  overflow:hidden;
  padding-top:1em;
  
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.26);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.26);
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.26);

}
.learning .skill .skill-inner .text {
  padding: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
.learning .skill .skill-inner .js-icon {
  width :80px;
  height: 80px;
  display: inline-block;
  position:relative;
  vertical-align:top;

}
.learning .skill .skill-inner .js-icon:before {
  display:block;
  position: absolute;
  left: 5px;
  top:5px;
  bottom: 5px;
  right:5px;
  background: #ffff77;
  content:"";
}

.learning .skill .skill-inner .js-icon:after {
  display:block;
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 40px;
  color: #d2f2f2;
  content:"JS";
}


@media screen and (min-width: 600px) {
  .learning .skill, .contact .contact-method {
    width: 33%;
  }
}
@media screen and (min-width: 1000px) {
  .learning .skill, .contact .contact-method {
    width: 330px;
  }
}
</style>