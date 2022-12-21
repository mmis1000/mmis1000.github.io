<template>
  <section class="contact page">
    <h2>To Contact <i class="fa fa-reply"></i></h2>
    <section class="contact-method github">
      <i class="fa fa-github fa-5x"></i>
      <h3>Github</h3>
      <p>GitHub is a Web-based Git repository hosting service. It offers all of the distributed revision control and
        source code management (SCM) functionality of Git as well as adding its own features.</p>
      <p><a href="https://github.com/mmis1000">Mmis1000</a></p>
    </section>
    <section class="contact-method facebook">
      <i class="fa fa-facebook fa-5x"></i>
      <h3>Facebook</h3>
      <p>Facebook is an online social networking service headquartered in Menlo Park, California. Its website was
        launched on February 4, 2004, by Mark Zuckerberg with his Harvard College roommates and fellow students Eduardo
        Saverin, Andrew McCollum, Dustin Moskovitz and Chris Hughes.</p>
      <p><a href="https://www.facebook.com/mmis1000">Mmis1000</a></p>
    </section>
    <section class="contact-method email">
      <i class="fa fa-envelope fa-5x"></i>
      <h3>Email</h3>
      <p>Electronic mail, most commonly referred to as email or e-mail since around 1993, is a method of exchanging
        digital messages from an author to one or more recipients. Email operates across the Internet or other computer
        networks.</p>
      <p><a href="mailto:mmis1000@yahoo.com.tw">Mmis1000</a></p>
    </section>
  </section>
</template>
<style scoped>
.contact {
  color: #f7f7f7;
  background: #0277BD;
  text-align: center;
  
  padding-top:2em;
  padding-bottom:2em;
}

.contact .contact-method {
  vertical-align:top;
  width: 95%;
  display: inline-block;
  /*height: 200px;*/
  border-top: #777777 solid 1px;
  padding-top:1em;
  padding-bottom:1em;
}

@media screen and (min-width: 600px) {
  .contact .contact-method {
    border-top: none;
  }
}
</style>