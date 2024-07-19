import { defineStore } from 'pinia'
import axios from 'axios'

export const useIpStore = defineStore('ipStore', {
  state: () => ({
    ipData: [],
  }),
  actions: {
    async fetchIpData(ipList) {
      this.ipData = [];
      const fetchData = async (ip) => {
        try {
          const response = await axios.get(`http://ip-api.com/json/${ip}`)
          if (response.data.status === 'success') {
            this.ipData.push(response.data)
          }
        } catch (error) {
          console.error(`Failed to fetch data for IP: ${ip}`, error)
        }
      }

      ipList.forEach(ip => {
        fetchData(ip)
      })
    },
    removeIp(index) {
      this.ipData.splice(index, 1)
    },
    sortIpData(prop) {
      this.ipData.sort((a, b) => (a[prop] > b[prop] ? 1 : -1))
    }
  }
})