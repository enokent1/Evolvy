<template>
    <div 
        class="fixed inset-0 flex items-center justify-center"
        @click="$emit('closeModal')"
    >
        <div class="border border-amber-50 bg-amber-50/20 backdrop-blur-md p-4 rounded-3xl">
            <div class="grid grid-cols-5 gap-4">
                <button
                    v-for="iconKey in iconStore.availableIcons"
                    :key="iconKey"
                    @click="$emit('selectedIcon', iconStore.iconMap[iconKey].icon)"
                >
                    <span class="text-2xl">
                        {{ iconStore.iconMap[iconKey].icon }}
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useIconStore } from '@/stores/iconStore';

const iconStore = useIconStore()
</script>
