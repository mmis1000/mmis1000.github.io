<template>
  <section class="contact page">
    <h2 class="title">To Contact <i class="fa fa-reply"></i></h2>
    <div class="method-wrapper">
      <section class="contact-method github">
        <div class="method-icon">
          <i class="fa fa-github fa-5x"></i>
        </div>
        <div class="method-data">
          <h3>Github</h3>
          <!-- <p>GitHub is a Web-based Git repository hosting service. It offers all of the distributed revision control and
            source code management (SCM) functionality of Git as well as adding its own features.
          </p> -->
          <p>
            <a href="https://github.com/mmis1000">Mmis1000</a>
          </p>
        </div>
      </section>
      <section class="contact-method facebook">
        <div class="method-icon">
        <i class="fa fa-facebook fa-5x"></i>
      </div>
        <div class="method-data">
          <h3>Facebook</h3>
          <!-- <p>Facebook is an online social networking service headquartered in Menlo Park, California. Its website was
            launched on February 4, 2004, by Mark Zuckerberg with his Harvard College roommates and fellow students
            Eduardo
            Saverin, Andrew McCollum, Dustin Moskovitz and Chris Hughes.
          </p> -->
          <p>
            <a href="https://www.facebook.com/mmis1000">Mmis1000</a>
          </p>
        </div>
      </section>
      <section class="contact-method email">
        <div class="method-icon">
          <i class="fa fa-envelope fa-5x"></i>
        </div>
        <div class="method-data">
          <h3>Email</h3>
          <!-- <p>Electronic mail, most commonly referred to as email or e-mail since around 1993, is a method of exchanging
            digital messages from an author to one or more recipients. Email operates across the Internet or other
            computer
            networks.
          </p> -->
          <p>
            <a href="mailto:mmis1000@yahoo.com.tw">Mmis1000</a>
          </p>
      </div>
      </section>
    </div>
  </section>
</template>
<style scoped>
.title {
  text-align: center;
  margin-bottom: 2em;
}
.contact {
  color: #f7f7f7;
  background: #0277BD;
  text-align: left;

  padding-top: 2em;
  padding-bottom: 2em;
}

.contact .contact-method {
  vertical-align: top;
  /* width: 95%; */
  position: relative;
  display: flex;
  align-items: center;
  padding: 2em 4em;
}

.contact .contact-method::after {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 2em;
  right: 2em;
  border-top: 1px solid white;
}

.method-icon {
  width: 6em;
  text-align: center;
}

.method-data {
  margin-left: 1em;
}
@media screen and (min-width: 600px) {
  .contact {
    padding: 2em;
  }

  .method-wrapper {
    display: flex;
    align-items: center;
  }

  .contact .contact-method::after {
    display: none;
  }
  .contact .contact-method {
    margin: 8px;
    padding: 0;
    flex-direction: column;
    flex-grow: 1;
  }
}
</style>