import { defineStore } from 'pinia'
import axios from 'axios'

interface IIPData {
  status: 'success' | 'fail'
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon :number
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

interface IState {
  ipData: IIPData[]
  failIpSearch: string[]
}

export const useIpStore = defineStore('ipStore', {
  state: (): IState => ({
    ipData: [],
    failIpSearch: []
  }),
  actions: {
    async fetchData (ip: string) {
      try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`)
        if (response.data.status === 'success') {
          this.ipData.push(response.data)

          return response.data
        } else {
          this.failIpSearch.push(ip)
        }
      } catch (error) {
        this.failIpSearch.push(ip)
        console.error(`Failed to fetch data for IP: ${ip}`, error)
      }
    },
    async fetchIpData(ipList: string[]) {
      this.ipData = [];

      ipList.forEach(ip => {
        this.fetchData(ip)
      })
    },
    removeIp(index: number) {
      this.ipData.splice(index, 1)
    },
    sortIpData(prop: number) {
      this.ipData.sort((a, b) => (a[prop] > b[prop] ? 1 : -1))
    },
    async findIp(ip: string) {
      if (!this.ipData.length) {
        await this.fetchData(ip)
      }

      const ipFinded = this.ipData.find((ipValue) => ipValue.query === ip)

      return ipFinded
    }
  }
})