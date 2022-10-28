<template>

<div>
  <b-tabs content-class="mt-3" align="center">
    <b-tab title="Общехозяйственные" active><p>я Общехозяйственные вкладка</p></b-tab>
    <b-tab title="Ремонтные"><p>я Ремонтные вкладка</p></b-tab>
    <b-tab title="С покупателем" active><p>я покупателем вкладка</p></b-tab>
    <b-tab title="С поставщиком"><p>я поставщиком вкладка</p></b-tab>
    <b-tab title="Финансовые" ><p>я Финансовые вкладка!</p></b-tab>
  </b-tabs>
</div>

</template>

<script>
export default {
    name: 'ContractTable'
}
</script>