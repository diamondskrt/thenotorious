import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './modules/firebase';
import { StateMain, Abonement } from '@/models'
import { loadState, saveState, clearState } from '@/utils/persistedState';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    abonements:
      loadState<Array<Abonement>>('abonements')
        ? loadState<Array<Abonement>>('abonements')
        : [],
  },
  mutations: {
    addAbonement(state: Pick<StateMain, 'abonements'>, abonement: Abonement) {
      if (state.abonements) {
        const findAbonement = state.abonements.find((el: Abonement) => el.id === abonement.id)
        if (findAbonement) {
          findAbonement.counter++;
          findAbonement.total = findAbonement.price * findAbonement.counter;
        } else {
          state.abonements?.push(abonement)
        }
        saveState<Array<Abonement>>('abonements', state.abonements)
      }
    },
    clearAbonements(state: Pick<StateMain, 'abonements'>) {
      state.abonements = []
      clearState('abonements')
    },
    incrementAbonement(state: Pick<StateMain, 'abonements'>, abonement: Abonement) {
      if (state.abonements) {
        const findAbonement = state.abonements.find((el: Abonement) => el.id === abonement.id);
        if (findAbonement && findAbonement.counter < 5) {
          findAbonement.counter++;
          findAbonement.total = findAbonement.price * findAbonement.counter;
        }
        saveState<Array<Abonement>>('abonements', state.abonements)
      }
    },
    decrementAbonement(state: Pick<StateMain, 'abonements'>, abonement: Abonement) {
      if (state.abonements) {
        const findAbonement = state.abonements.find((el: Abonement) => el.id === abonement.id);
        if (findAbonement && findAbonement.counter > 1) {
          findAbonement.counter--;
          findAbonement.total = findAbonement.price * findAbonement.counter;
        }
        saveState<Array<Abonement>>('abonements', state.abonements)
      }
    },
    removeAbonement(state: Pick<StateMain, 'abonements'>, abonement: Abonement) {
      if (state.abonements) {
        state.abonements = state.abonements.filter((el: Abonement) => el.id !== abonement.id);
        saveState<Array<Abonement>>('abonements', state.abonements)
      }
    }
  },
  modules: {
    firebase,
  },
});
