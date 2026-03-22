<template>
    <div 
        class="flex justify-between p-2 rounded-lg relative overflow-hidden"
        :class="colorData.bgLightClass"
    >
        <div
            class="absolute top-0 left-0 h-full transition-all duration-300"
            :class="colorData.bgClass"
            :style="{width: fillPercentage + `%`}"
        ></div>
        <div class="flex items-stretch gap-5 z-10">
            <div 
                class="flex justify-center items-center w-10 rounded-lg"
                :class="colorData.bgLightClass"
            >
                <span class="text-xl">{{ habit.icon }}</span>
            </div>
            <div>
                <h2 class="font-medium">{{ habit.title }}</h2>
                <span 
                    class="text-sm py-0.5 px-3 rounded-lg border"
                    :class="[colorData.borderClass, colorData.bgLightClass]"
                >
                    {{ currentCount }} / {{ habit.target }} {{ habit.unit }}
                </span>
            </div>
        </div>
        <button 
            class="p-2 bg-gray-200 rounded-lg"
            @click.prevent="addCound"
        >
            +
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    habit: {
        type: Object,
        required: true
    }
})

import { useColorStore } from '@/stores/colorStore';
import { ref, computed } from 'vue';

const colorStore = useColorStore()
const colorData = computed(() => colorStore.getColorData(props.habit.color))

const currentCount = ref(0)

function addCound() {
    if (currentCount.value < props.habit.target) {
        currentCount.value ++
    }
}

const fillPercentage = computed(() => {
    return (currentCount.value / props.habit.target) * 100
})
</script>
