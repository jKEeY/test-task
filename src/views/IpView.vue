<template>
    <main>
        <div class="content-column">
            <div
                v-for="(ip, index) in ipInfo"
                :key="index"
                class="content-column__item"
            >
                    <div class="content-column__item-title">{{ ip.key }}</div>
                    <div class="content-column__item-value">{{ ip.value || '-' }}</div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useIpStore } from '../stores/ipStore'

const ipStore = useIpStore()

const route = useRoute()

const ipInfo = ref([])

const fetchIpInfo = async () => {
    try {
        const response = await ipStore.findIp(route.params.ip)

        console.log(response)

        for (const [key, value] of Object.entries(response)) {
            if (key !== 'status') {
                ipInfo.value.push({ key, value })
            }
        }

    } catch (error) {
        console.error('Error fetching IP info:', error)
    }
}

onMounted(() => {
    fetchIpInfo()
})
</script>

<style scoped>

main {
    width: 1000px;
}

.content-column {
    -moz-column-gap: 16px;
    column-gap: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%
}

@media (max-width: 1180px) {
    .content-column {
        grid-template-columns:1fr
    }
}

.content-column__item {
    border-left: 1px solid rgb(236 240 245);;
    border-right: 1px solid rgb(236 240 245);;
    display: grid;
    gap: 8px;
    grid-template-columns: 150px 1fr;
    grid-template-rows: 1fr;
    min-height: 52px;
    padding: 16px
}

.content-column__item:nth-child(4n+1),.content-column__item:nth-child(4n+2) {
    background-color: rgb(236 240 245);
}

.content-column__item:first-child,.content-column__item:nth-child(2) {
    border-radius: 12px 12px 0 0;
    border-top: 1px solid rgb(236 240 245);
}

.content-column__item:last-child,.content-column__item:nth-last-child(2) {
    border-bottom: 1px solid rgb(236 240 245);;
    border-radius: 0 0 12px 12px
}

@media (max-width: 1180px) {
    .content-column__item:nth-child(odd) {
        order:-1
    }

    .content-column__item:nth-last-child(2) {
        margin-bottom: 16px
    }
}

@media (max-width: 680px) {
    .content-column__item {
        grid-template-columns:16px 1fr 1fr;
        grid-template-rows: 2
    }
}

.content-column__item-title {
    font-weight: 500
}

.content-column__item-value .is-fallback {
    align-items: center;
    display: flex;
    gap: 8px
}   

@media (max-width: 480px) {
    .content-column__item-value {
        grid-column:2/span 2
    }
}

</style>