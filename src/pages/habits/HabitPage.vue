<template>
    <div 
        v-if="habit"
        class="flex flex-col gap-6 p-5"
    >
        <div class="flex items-center gap-2 w-fit mx-auto mb-2">
            <span class="text-2xl">{{ habit.icon }}</span>
            <h1 class="text-2xl font-medium">{{ habit.title }}</h1>
        </div>

        <card-wrapper>
            <div class="pb-2 border-b border-gray-400 flex gap-6">
                <div 
                    class="w-25 aspect-square border-2 border-dashed bg-gray-300 rounded-lg flex items-center justify-center"
                    :class="colorStore.borderClass"
                    @click="toggleIcon = true"
                >
                    <span class="text-4xl">{{ habit.icon }}</span> 
                </div>
                <div class="w-full">
                    <input class="py-1 border-b border-gray-400 w-full" type="text" v-model="habit.title">
                    <input class="py-1 w-full" type="text" v-model="habit.description" placeholder="Description (Optional)">
                </div>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-400">
                <span>Color</span>
                <button @click="toggleColor = true">
                    <div 
                        class="w-10 h-5 rounded-full" 
                        :class=colorStore.bgClass
                    >
                    </div>
                </button>
            </div>
            <div class="flex justify-between py-2">
                <span>Group</span>
                <button @click="toggleGroup = true">
                    {{ habit.group }}
                </button>
            </div>
        </card-wrapper>

        <card-wrapper>
            <div class="flex flex-col gap-2">
                <span>Periodicity</span>
                <div class="flex gap-4 mt-2">
                    <button
                        v-for="option in periodicityOptions"
                        :key="option"
                        class="text-sm py-1 px-4 rounded-full"
                        :class="selectedPeriodicity === option ? [colorStore.bgClass, 'text-white'] : 'bg-gray-300'"
                        @click="updatePeriodicity(option)"
                    >
                        {{ option }}
                    </button>
                </div>
            </div>
        </card-wrapper>

        <Transition name="scale">
            <IconSelectorModal 
                v-if="toggleIcon"
                @close-modal="toggleIcon = false"
                @selected-icon="habit.icon = $event"
            />
        </Transition>
        <Transition name="scale">
            <ColorSelectorModal 
                v-if="toggleColor" 
                @close-modal="toggleColor = false"
                @selected-color="colorStore.setColor"
            />
        </Transition>
        <Transition name="scale">
            <GroupSelectorModal 
                v-if="toggleGroup" 
                @close-modal="toggleGroup = false"
                @selected-group="habit.group = $event"
                :default-group="habit.group"
                :color="colorStore.borderClass"
            />
        </Transition>
    </div>
    <div v-else>
        <p class="text-center text-gray-600">Loading...</p>
    </div>
</template>

<script setup>
import CardWrapper from '@/components/wrappers/CardWrapper.vue';
import IconSelectorModal from '@/components/modals/IconSelectorModal.vue';
import ColorSelectorModal from '@/components/modals/ColorSelectorModal.vue';
import GroupSelectorModal from '@/components/modals/GroupSelectorModal.vue';
import { useColorStore } from '@/stores/colorStore';
import { useIconStore } from '@/stores/iconStore';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const id = useRoute().params.id;
const habit = ref(null)

const toggleColor = ref(false)
const toggleGroup = ref(false)
const toggleIcon = ref(false)
const selectedPeriodicity = ref(null)

const colorStore = useColorStore();

const periodicityOptions = [
    'Daily',
    'Weekly',
    'Monthly'
]

const updatePeriodicity = (option) => {
    if (habit.value) {
        habit.value.periodicity = option
    }
    selectedPeriodicity.value = option
}

async function fetchHabitWithId(id) {
    try {
        const response = await axios.get(`https://6994c147b081bc23e9c140ad.mockapi.io/habits/${id}`)
        habit.value = response.data
        console.log('Fetched habit: ', habit.value)
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}

onMounted(() => {
    fetchHabitWithId(id)
})

</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
    transition: all 0.2s ease;
}

.scale-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.scale-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.scale-enter-to {
    opacity: 1;
    transform: scale(1);
}

.scale-leave-from {
    opacity: 1;
    transform: scale(1);
}
</style>