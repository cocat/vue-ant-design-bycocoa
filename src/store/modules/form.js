import router from '../../router';
import request from '../../utils/request';

const state = {
    step: {
        payAccount: "123456"
    }
}

const actions = {
    async submitStepForm({ commit }, { payload }) {
        await request({
            url: "/api/form",
            method: "POST",
            data: payload
        })
        commit("savaStepFormData", payload)
        router.push("/form/step-form")
    }
}

const mutations = {
    savaStepFormData(state, { payload }) {
        state.step = {
            ...state.step,
            ...payload
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}