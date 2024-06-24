<template>
  <fwb-footer :style="navbarStyle">
    <fwb-footer-copyright
      by="Dmytro™"
      href="https://flowbite.com/"
      copyright-message="All Rights Reserved."
    />
    <fwb-footer-link-group>
      <fwb-footer-link href="/"> Home </fwb-footer-link>
      <fwb-footer-link href="/sessions"> All sessions </fwb-footer-link>
      <fwb-footer-link href="https://t.me/dmytro_vue"> Author's contact </fwb-footer-link>
      <fwb-footer-link href="https://github.com/kokhanevych-dmytro"> Github </fwb-footer-link>
    </fwb-footer-link-group>
  </fwb-footer>
</template>

<script setup lang="ts">
import {
  FwbFooter,
  FwbFooterCopyright,
  FwbFooterLink,
  FwbFooterLinkGroup
} from 'flowbite-vue'

const navbarStyle = {
  background: 'rgb(0 0 0 / 20%)'
}
</script>
