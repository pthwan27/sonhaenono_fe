<template>
  <div class="center">
    <b-table
      id="my-table"
      :items="aptDeals"
      :per-page="perPage"
      :current-page="currentPage"
      small></b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"></b-pagination>
  </div>
</template>

<script>
export default {
  name: "DetailDealTable",
  props: {
    deals: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      page: 5,
      max: 5,
    };
  },
  computed: {
    aptDeals: function () {
      return this.deals.map((deal) => ({
        가격: `${deal.dealAmount}만원`,
        층: deal.floor,
        면적: deal.area,
        거래일: `${deal.dealYear}.${deal.dealMonth}.${deal.dealDay}`,
      }));
    },
    rows() {
      return this.deals.length;
    },
  },
};
</script>

<style>
.vs-table__th {
  width: 100px !important;
}
</style>
