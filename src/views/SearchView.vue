<template>
    <div class="search-view">
        <el-card>
            <el-form>
                <h1 class="search-view__title">Search IP address</h1>
                <el-input
                    v-model="ipAddresses"
                    type="textarea"
                    placeholder="ip"
                    rows="10"
                    
                    @input="onIpInput"
                />
                <el-button
                    type="primary"
                    class="search-view__action"
                    @click="fetchIpData"
                >
                    Поиск
                </el-button>
            </el-form>
        </el-card>
        <IpTable v-if="ipStore.ipData.length" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useIpStore } from '../stores/ipStore'
import { useRouter, useRoute } from 'vue-router'
import IpTable from '../components/IpTable.vue'
import debounce from 'lodash/debounce'

const ipStore = useIpStore()
const router = useRouter()
const route = useRoute()

const ipAddresses = ref('')

const fetchIpData = () => {
    const ipList = ipAddresses.value
        .split('\n')
        .filter(ip => ip.trim() !== '')

    ipStore.fetchIpData(ipList)
};

const updateQueryParams = debounce((newVal) => {
    router.replace({ query: { ips: newVal } })
}, 500);

const onIpInput = (event) => {
    ipAddresses.value = event
    updateQueryParams(event)
};

onMounted(() => {
    if (!!route.query.ips) {
        ipAddresses.value = route.query.ips
        fetchIpData()
    }
});
</script>
  
<style scoped>
    .el-card {
        margin: 20px;
    }

    .search-view {
        width: 1000px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .search-view__title {
        font-weight: 700;
        font-size: 22px;
        text-align: center;
    }

    .search-view__action {
        margin-top: 16px;
    }
</style>
