<template>
  <section id="pages-home" class="section">
    <div class="container">
     <h1> Home page</h1>
     <spinner></spinner>
    </div>
  </section>
</template>
<script>

import spinner from '../partials/spinner'
export default {
  name: 'home',
  components: {
    spinner,    
  },
  mounted () {
    //
  }
}
</script>
