import type { IStore } from '@/store/IStore'
import type { Store as VuexStore } from 'vuex'
import type { Getters } from './getters'

export type Store = Omit<VuexStore<IStore>, 'getters'> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}
