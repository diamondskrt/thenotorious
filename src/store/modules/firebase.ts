import {
  StateFirebase,
  User,
  FBError,
} from '@/models';
import { loadState, saveState, clearState } from '@/utils/persistedState'

const state = (): StateFirebase => ({
  fbError: null,
  user: loadState<User>('user'),
})

const mutations = {
  setFBError(state: Pick<StateFirebase, 'fbError'>, error: FBError): void {
    state.fbError = error;
  },
  clearFBError(state: Pick<StateFirebase, 'fbError'>): void {
    state.fbError = null
  },
  setUser(state: Pick<StateFirebase, 'user'>, user: User): void {
    state.user = user;
    saveState<User>('user', state.user);
  },
  clearUser(state: Pick<StateFirebase, 'user'>): void {
    state.user = null;
    clearState('user');
  },
}

const getters = {
  user: (state: Pick<StateFirebase, 'user'>): User | null => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}
