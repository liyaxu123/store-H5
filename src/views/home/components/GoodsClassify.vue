<template>
  <Grid clickable>
    <GridItem v-for="item in gridList" :key="item.text">
      <Image width="30" height="30" :src="item.icon" />
      <span class="mt-2">{{ item.text }}</span>
    </GridItem>
  </Grid>
</template>

<script setup lang="ts">
import { Grid, GridItem, Image } from 'vant'
import sj from '@/assets/imgs/sj.png'
import dsj from '@/assets/imgs/dsj.png'
import kt from '@/assets/imgs/kt.png'
import xyj from '@/assets/imgs/xyj.png'
import sjk from '@/assets/imgs/sjk.png'
import sjm from '@/assets/imgs/sjm.png'
import cdq from '@/assets/imgs/cdq.png'
import cdb from '@/assets/imgs/cdb.png'

const gridList = [
  {
    text: '手机',
    icon: sj,
  },
  {
    text: '电视',
    icon: dsj,
  },
  {
    text: '空调',
    icon: kt,
  },
  {
    text: '洗衣机',
    icon: xyj,
  },
  {
    text: '保护套',
    icon: sjk,
  },
  {
    text: '保护膜',
    icon: sjm,
  },
  {
    text: '充电器',
    icon: cdq,
  },
  {
    text: '充电宝',
    icon: cdb,
  },
]
</script>

<style scoped></style>
