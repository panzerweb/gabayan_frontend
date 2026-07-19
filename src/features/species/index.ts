import type { RouteRecordRaw } from 'vue-router'
import SpeciesView from './view/SpeciesView.vue'
import SpeciesDetailView from './view/SpeciesDetailView.vue'

export const speciesRoutes: RouteRecordRaw[] = [
  {
    path: '/species',
    name: 'species',
    component: SpeciesView,
  },
  {
    path: '/species/:id',
    name: 'species-detail',
    component: SpeciesDetailView,
    props: true,
  },
]

export default speciesRoutes
