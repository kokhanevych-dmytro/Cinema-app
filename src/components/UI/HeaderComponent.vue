<template>
  <fwb-navbar :style="navbarStyle">
    <template #logo>
      <fwb-navbar-logo alt="NOTFLIX logo" image-url="/images/NOTFLIX-logo.png" link="/">
      </fwb-navbar-logo>
    </template>
    <template #default="{ isShowMenu }">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <fwb-navbar-link link="/"> Home </fwb-navbar-link>
        <fwb-navbar-link link="/sessions"> All sessions </fwb-navbar-link>
        <fwb-navbar-link link="https://t.me/dmytro_vue"> Author's contact </fwb-navbar-link>
        <fwb-navbar-link link="https://github.com/kokhanevych-dmytro"> Github </fwb-navbar-link>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>

<script setup lang="ts">
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink, FwbNavbarLogo } from 'flowbite-vue'

const navbarStyle = {
  background: 'rgb(0 0 0 / 20%)'
}
</script>
