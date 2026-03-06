import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useColorStore = defineStore('color', () => {
    const currentColor = ref('blue-500')

    const colorMap = {
        'red-500': {name: 'red', borderClass: 'border-red-500', bgClass: 'bg-red-500'},
        'green-500': {name: 'green', borderClass: 'border-green-500', bgClass: 'bg-green-500'},
        'blue-500': {name: 'blue', borderClass: 'border-blue-500', bgClass: 'bg-blue-500'},
        'yellow-500': {name: 'yellow', borderClass: 'border-yellow-500', bgClass: 'bg-yellow-500'},
        'purple-500': {name: 'purple', borderClass: 'border-purple-500', bgClass: 'bg-purple-500'},
        'pink-500': {name: 'pink', borderClass: 'border-pink-500', bgClass: 'bg-pink-500'},
        'indigo-500': {name: 'indigo', borderClass: 'border-indigo-500', bgClass: 'bg-indigo-500'},
        'teal-500': {name: 'teal', borderClass: 'border-teal-500', bgClass: 'bg-teal-500'},
        'cyan-500': {name: 'cyan', borderClass: 'border-cyan-500', bgClass: 'bg-cyan-500'},
        'orange-500': {name: 'orange', borderClass: 'border-orange-500', bgClass: 'bg-orange-500'},
        'amber-500': {name: 'amber', borderClass: 'border-amber-500', bgClass: 'bg-amber-500'},
        'lime-500': {name: 'lime', borderClass: 'border-lime-500', bgClass: 'bg-lime-500'},
        'emerald-500': {name: 'emerald', borderClass: 'border-emerald-500', bgClass: 'bg-emerald-500'},
        'fuchsia-500': {name: 'fuchsia', borderClass: 'border-fuchsia-500', bgClass: 'bg-fuchsia-500'},
        'violet-500': {name: 'violet', borderClass: 'border-violet-500', bgClass: 'bg-violet-500'},
        'rose-500': {name: 'rose', borderClass: 'border-rose-500', bgClass: 'bg-rose-500'},
        'sky-500': {name: 'sky', borderClass: 'border-sky-500', bgClass: 'bg-sky-500'},
        'stone-500': {name: 'stone', borderClass: 'border-stone-500', bgClass: 'bg-stone-500'},
        'neutral-500': {name: 'neutral', borderClass: 'border-neutral-500', bgClass: 'bg-neutral-500'},
        'zinc-500': {name: 'zinc', borderClass: 'border-zinc-500', bgClass: 'bg-zinc-500'},
        'slate-500': {name: 'slate', borderClass: 'border-slate-500', bgClass: 'bg-slate-500'},
        'gray-500': {name: 'gray', borderClass: 'border-gray-500', bgClass: 'bg-gray-500'},
        'red-400': {name: 'red-400', borderClass: 'border-red-400', bgClass: 'bg-red-400'},
        'green-400': {name: 'green-400', borderClass: 'border-green-400', bgClass: 'bg-green-400'},
        'blue-400': {name: 'blue-400', borderClass: 'border-blue-400', bgClass: 'bg-blue-400'},
        'yellow-400': {name: 'yellow-400', borderClass: 'border-yellow-400', bgClass: 'bg-yellow-400'},
        'purple-400': {name: 'purple-400', borderClass: 'border-purple-400', bgClass: 'bg-purple-400'},
        'red-600': {name: 'red-600', borderClass: 'border-red-600', bgClass: 'bg-red-600'},
        'green-600': {name: 'green-600', borderClass: 'border-green-600', bgClass: 'bg-green-600'},
        'blue-600': {name: 'blue-600', borderClass: 'border-blue-600', bgClass: 'bg-blue-600'}
    }

    const availableColors = computed(() => Object.keys(colorMap))

    const currentColorData = computed(() => colorMap[currentColor.value])

    const borderClass = computed(() => colorMap[currentColor.value]?.borderClass || 'border-blue-500')
    const bgClass = computed(() => colorMap[currentColor.value]?.bgClass || 'bg-blue-500')

    function setColor(colorKey) {
        if (colorMap[colorKey]) {
            currentColor.value = colorKey
        }
    }

    return {
        currentColor,
        availableColors,
        currentColorData,
        borderClass,
        bgClass,
        colorMap,
        setColor
    }
})

