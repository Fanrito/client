<template>
  <div class="side-navigation">
    <n-menu :options="menuOptions"/>
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
        'a',
        {
          href: '/search?id=1',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        goodsTypes[0]
      ),
    key: '0',
    icon: renderIcon(PhonePortraitOutline)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '/search?id=1',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        goodsTypes[1]
      ),
    key: '1',
    icon: renderIcon(Pencil)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        goodsTypes[2]
      ),
    key: '2',
    icon: renderIcon(BookOutline)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        goodsTypes[3]
      ),
    key: '3',
    icon: renderIcon(AccessibilityOutline)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        goodsTypes[4]
      ),
    key: '4',
    icon: renderIcon(LocalHospitalOutlined)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        goodsTypes[5]
      ),
    key: '5',
    icon: renderIcon(FastFoodOutline)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        goodsTypes[6]
      ),
    key: '6',
    icon: renderIcon(GameControllerOutline)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        goodsTypes[7]
      ),
    key: '7',
    icon: renderIcon(SmileTwotone)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        goodsTypes[8]
      ),
    key: '8',
    icon: renderIcon(Bicycle)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        goodsTypes[9]
      ),
    key: '9',
    icon: renderIcon(NightlifeRound)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        goodsTypes[10]
      ),
    key: '10',
    icon: renderIcon(ComputerFilled)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
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
