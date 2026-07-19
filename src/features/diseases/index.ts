import type { RouteRecordRaw } from 'vue-router'
import DiseasesView from './view/DiseasesView.vue'
import DiseasesDetailView from './view/DiseasesDetailView.vue'


export const diseasesRoutes: RouteRecordRaw[] = [
  {
    path: '/diseases',
    name: 'diseases',
    component: DiseasesView,
  },
  {
    path: '/diseases/:id',
    name: 'diseases-detail',
    component: DiseasesDetailView,
    props: true,
  },
]

export default diseasesRoutes
