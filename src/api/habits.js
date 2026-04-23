import axios from "axios";

const BASE_URL = "https://6994c147b081bc23e9c140ad.mockapi.io"

export const habitsApi = {
    getAllGlobalHabits() {
        return axios.get(`${BASE_URL}/habits`)
    },

    getAllUserHabits() {
        return axios.get(`${BASE_URL}/user-habits`)
    },

    getGlobalHabitById(id) {
        return axios.get(`${BASE_URL}/habits/${id}`)
    },

    createUserHabit(habit) {
        return axios.post(`${BASE_URL}/user-habits`, habit)
    }
}