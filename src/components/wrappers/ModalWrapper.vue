<template>
    <div class="fixed inset-0  flex items-center justify-center" @click="$emit('closeModal')">
        <div class="border border-amber-50 bg-amber-50/20 backdrop-blur-md p-4 rounded-3xl">
            <slot></slot>
        </div>
    </div>
</template>