<template>
    <div class="head_bg">
        <!-- <nav class="navbar navbar-expand navbar-dark bg-dark">
            <a href class="navbar-brand" @click.prevent>Spin and win</a>
            <div class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">
                        <font-awesome-icon icon="home" />Home
                    </router-link>
                </li>
                <li v-if="showAdminBoard" class="nav-item">
                    <router-link to="/admin" class="nav-link">Admin Board</router-link>
                </li>
                <li v-if="showModeratorBoard" class="nav-item">
                    <router-link to="/mod" class="nav-link">Moderator Board</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
                </li>
            </div>

            <div v-if="!currentUser" class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/register" class="nav-link">
                        <font-awesome-icon icon="user-plus" />Sign Up
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/login" class="nav-link">
                        <font-awesome-icon icon="sign-in-alt" />Login
                    </router-link>
                </li>
            </div>

            <div v-if="currentUser" class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/profile" class="nav-link">
                        <font-awesome-icon icon="user" />
                        {{ currentUser.username }}
                    </router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href @click.prevent="logOut">
                        <font-awesome-icon icon="sign-out-alt" />LogOut
                    </a>
                </li>
            </div>
        </nav> -->
        <div class="container">
            <nav class="navbar navbar-expand-lg ">
                <router-link to="/">
                    <img src="/assets/image/head_logo.png" class="img-responsive" alt="Responsive image">
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fa fa-bars"></i><span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav m-auto">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">
                                Home
                            </router-link>                           
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Shipping</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contact Us</a>
                        </li>
                    </ul>
                    <div v-if="!currentUser"  class="right_button">
                        <button class="btn my-2 my-sm-0" type="submit">
                            <router-link to="/login" >Log In</router-link>
                        </button>
                        <button class="btn my-2 my-sm-0" type="submit">
                            <router-link to="/register" >
                                Sign Up
                            </router-link>
                        </button>        
                    </div>
                    <div v-if="currentUser" class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/profile" class="nav-link">
                                <font-awesome-icon icon="user" />
                                {{ currentUser.username }}
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href @click.prevent="logOut">
                                <font-awesome-icon icon="sign-out-alt" />LogOut
                            </a>
                        </li>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Header',
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        showAdminBoard() {
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes('ROLE_ADMIN');
            }
            return false;
        },
        showModeratorBoard() {
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes('ROLE_MODERATOR');
            }

            return false;
        }
    },
    
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }
}
</script>
<style type="text/css">

</style>