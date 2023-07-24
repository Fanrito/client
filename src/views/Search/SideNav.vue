<template>
  <div class="side-navigation">
    <n-menu :options="menuOptions" />
  </div>
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { PhonePortraitOutline, Pencil, BookOutline, AccessibilityOutline, FastFoodOutline, GameControllerOutline, Bicycle } from '@vicons/ionicons5'
import { LocalHospitalOutlined, NightlifeRound, ComputerFilled, OtherHousesOutlined } from '@vicons/material'
import { SmileTwotone } from '@vicons/antd'
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const goodsTypes = ['数码', '文具', '图书', '服装', '医疗', '食品', '娱乐', '美妆', '代步', '生活', '虚拟', '其他']

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 0
            }
          }
        },
        goodsTypes[0]
      ),
    key: '0',
    icon: renderIcon(PhonePortraitOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 1
            }
          }
        },
        goodsTypes[1]
      ),
    key: '1',
    icon: renderIcon(Pencil)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 2
            }
          }
        },
        goodsTypes[2]
      ),
    key: '2',
    icon: renderIcon(BookOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 3
            }
          }
        },
        goodsTypes[3]
      ),
    key: '3',
    icon: renderIcon(AccessibilityOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 4
            }
          }
        },
        goodsTypes[4]
      ),
    key: '4',
    icon: renderIcon(LocalHospitalOutlined)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 5
            }
          }
        },
        goodsTypes[5]
      ),
    key: '5',
    icon: renderIcon(FastFoodOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 6
            }
          }
        },
        goodsTypes[6]
      ),
    key: '6',
    icon: renderIcon(GameControllerOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 7
            }
          }
        },
        goodsTypes[7]
      ),
    key: '7',
    icon: renderIcon(SmileTwotone)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 8
            }
          }
        },
        goodsTypes[8]
      ),
    key: '8',
    icon: renderIcon(Bicycle)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 9
            }
          }
        },
        goodsTypes[9]
      ),
    key: '9',
    icon: renderIcon(NightlifeRound)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 10
            }
          }
        },
        goodsTypes[10]
      ),
    key: '10',
    icon: renderIcon(ComputerFilled)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'search',
            query: {
              goodsCategoryId: 11
            }
          }
        },
        goodsTypes[11]
      ),
    key: '11',
    icon: renderIcon(OtherHousesOutlined)
  }
]
</script>

<style scoped>
.side-navigation {
  width: 140px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 20px;
}
</style>
