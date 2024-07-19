import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import IpTable from '../IpTable.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useIpStore } from '../../stores/ipStore';
import { createRouter, createWebHistory } from 'vue-router';

vi.mock('../../stores/ipStore', () => ({
  useIpStore: () => ({
    ipData: [
      { query: '8.8.8.8', country: 'US', regionName: 'California', city: 'Mountain View' },
      { query: '1.1.1.1', country: 'AU', regionName: 'New South Wales', city: 'Sydney' },
    ],
    removeIp: vi.fn(),
    sortIpData: vi.fn(),
  }),
}));

const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('IpTable', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render the IP data correctly', () => {
    const wrapper = mount(IpTable, {
      global: {
        plugins: [mockRouter],
      },
    });

    console.log(wrapper.text())

    expect(wrapper.text()).toContain('8.8.8.8');
    expect(wrapper.text()).toContain('1.1.1.1');
  });

  it('should call removeIp when delete button is clicked', async () => {
    const store = useIpStore();
    const wrapper = mount(IpTable, {
      global: {
        plugins: [mockRouter],
      },
    });

    await wrapper.findAll('button')[1].trigger('click');

    expect(store.removeIp).toHaveBeenCalled();
  });
});
