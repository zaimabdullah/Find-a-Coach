<template>
  <section>
    <base-card>
      <div id="oopss">
        <div id="error-text">
          <h2>Page Not Found</h2>
          <p class="p-a">The page you were looking for could not be found .</p>
          <base-button link to="/coaches" class="button"> Return To Home </base-button>
        </div>
      </div>
    </base-card>
  </section>
</template>

<style scoped>
#oopss {
  left: 0px;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 1.5em;
  z-index: 9999;
}
#oopss #error-text {
  font-size: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
}
#oopss #error-text span {
  position: relative;
  font-size: 3.3em;
  font-weight: 900;
  margin: 85px auto 50px;
}
#oopss #error-text p.p-a {
  font-size: 19px;
  margin: 30px 0 15px 0;
}
.button {
  border: 1px solid #3a0061;
  background: #3a0061;
  outline: none;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  margin: 20px 0;
}
.button:hover {
  background-color: white;
  color: #555;
  cursor: pointer;
}
</style>
