<template>
  <div class="center">
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th sort @click="users = $vs.sortData($event, users, 'name')">
            Name
          </vs-th>
          <vs-th sort @click="users = $vs.sortData($event, users, 'email')">
            Email
          </vs-th>
          <vs-th sort @click="users = $vs.sortData($event, users, 'id')">
            Id
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in $vs.getSearch(users, search)"
          :data="tr">
          <vs-td>
            {{ tr.name }}
          </vs-td>
          <vs-td>
            {{ tr.email }}
          </vs-td>
          <vs-td>
            {{ tr.id }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
  name: "BoardList",

  data() {
    return {};
  },
};
</script>

<style></style>
