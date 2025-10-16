<template>
  <nav class="navbar">
    <h1>Beymen Clone</h1>
    <ul class="nav-links">
      <li><router-link to="/">Ana Sayfa</router-link></li>
      <li><router-link to="/cart">Sepet</router-link></li>
    </ul>
  </nav>
</template>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: black;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
 
  position: relative;
  z-index: 9999;

}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-links a:hover {
  color: #ccc;
}
</style>
