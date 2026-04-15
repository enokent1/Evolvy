import axios from "axios";

const BASE_URL = "https://6994c147b081bc23e9c140ad.mockapi.io"

export const habitsApi = {
    getAll() {
        return axios.get(`${BASE_URL}/habits`)
    },

    getUserHabits() {
        return axios.get(`${BASE_URL}/user-habits`)
    },

    getById(id) {
        return axios.get(`${BASE_URL}/habits/${id}`)
    },

    create(habit) {
        return axios.post(`${BASE_URL}/user-habits`, habit)
    }
}