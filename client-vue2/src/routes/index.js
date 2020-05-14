const routes = [
  { path: '/BankList', component: () => import('@/pages/bank/BankList.vue') },
  { path: '/CardList', component: () => import('@/pages/card/CardList.vue') },
  { path: '/TakeList', component: () => import('@/pages/take/TakeList.vue') },
  { path: '/BillToday', component: () => import('@/pages/bill/BillToday.vue') },
  {
    path: '/FenqiList',
    component: () => import('@/pages/fenqi/FenqiList.vue'),
  },
  { path: '/Today', component: () => import('@/pages/Today.vue') },
]

export default routes
