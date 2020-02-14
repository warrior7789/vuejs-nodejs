<template>

    <nav class="navbar navbar-expand-md " id="banner">
        <div class="container">
            <!-- Brand -->
            <a class="navbar-brand" href="#"><span>Logo</span>Here</a>

            <!-- Toggler/collapsibe Button -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar links -->
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/blog" class="nav-link">Blog</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/shipping" class="nav-link">Shipping</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/contact-us" class="nav-link">Contact us</router-link>
                    </li>
                    <!-- Dropdown -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown"> Dropdown link</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Link 1</a>
                            <a class="dropdown-item" href="#">Link 2</a>
                            <a class="dropdown-item" href="#">Link 3</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>
<script>


export default {
  name: 'Header',  
 
}
</script>
<style type="text/css">
	
</style>
