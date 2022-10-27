<template>

<div>
  <b-tabs content-class="mt-3" align="center">
    <b-tab title="First" active><p>я первая вкладка</p></b-tab>
    <b-tab title="Second"><p>я вторая вкладка</p></b-tab>
    <b-tab title="Disabled" disabled><p>я отключенная вкладка!</p></b-tab>
  </b-tabs>
</div>

</template>

<script>
export default {
    name: 'ContractTable'
}
</script>