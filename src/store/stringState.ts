import { InjectionKey } from "vue";
import { createStore, Store, useStore as useBasicStore } from "vuex";

export type StringState = {
    data: string
}
export const key: InjectionKey<Store<StringState>> = Symbol()

const stringState = createStore<StringState>({
    state() {
        return {data: ''}
    },
    mutations: {
        change(state, value: string){
            state.data = value
        },
        append(state, value: string){
            state.data += value
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})

export const useString = () => useBasicStore(key)

export default stringState;