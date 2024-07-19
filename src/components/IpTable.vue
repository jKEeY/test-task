<template>
  <el-card>
    <el-input
      v-model="searchQuery"
      placeholder="Search" />
    <el-table
      :data="filteredIpData"
      @sort-change="sortData"
    >
      <el-table-column
        prop="query"
        label="IP Address"
        sortable
      />
      <el-table-column
        prop="country"
        label="Country"
        sortable
      />
      <el-table-column
        prop="regionName"
        label="Region"
        sortable
      />
      <el-table-column
        prop="city"
        label="City"
        sortable
      />
      <el-table-column
        align="right"
        width="250px"
        label="Actions"
      >
        <template #default="scope">
          <el-button
            size="small"
            @click="viewDetails(scope.row.query)"
          >Подбробнее</el-button>
          <el-button
            size="small"
            type="danger"
            @click="removeRow(scope.$index)"
          >Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useIpStore } from '../stores/ipStore';
import { useRouter } from 'vue-router';

const ipStore = useIpStore();
const searchQuery = ref('');
const router = useRouter();

const filteredIpData = computed(() =>
  ipStore.ipData.filter(ip =>
    Object.values(ip).some(val => {
        return String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
      }
    )
  )
);

const viewDetails = (ip) => {
  router.push({ name: 'ip-info', params: { ip } });
};

const removeRow = (index) => {
  ipStore.removeIp(index);
};

const sortData = ({ prop }) => {
  ipStore.sortIpData(prop);
};
</script>

<style scoped>
  .el-card {
    margin: 20px;
  }
</style>
