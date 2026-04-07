<template>
  <div v-if="habit" class="flex flex-col gap-6 p-5">
    <div class="mx-auto mb-2 flex w-fit items-center gap-2">
      <span class="text-2xl">{{ habit.icon }}</span>
      <h1 class="text-2xl font-medium">{{ habit.title }}</h1>
    </div>

    <card-wrapper>
      <div class="flex gap-6 border-b border-gray-400 pb-2">
        <div
          class="flex aspect-square w-25 items-center justify-center rounded-lg border-2 border-dashed bg-gray-300"
          :class="colorStore.borderClass"
          @click="toggleIcon = true"
        >
          <span class="text-4xl">{{ habit.icon }}</span>
        </div>
        <div class="w-full">
          <input
            class="w-full border-b border-gray-400 py-1"
            type="text"
            v-model="habit.title"
          />
          <input
            class="w-full py-1"
            type="text"
            v-model="habit.description"
            placeholder="Description (Optional)"
          />
        </div>
      </div>
      <div class="flex justify-between border-b border-gray-400 py-2">
        <span>Color</span>
        <button @click="toggleColor = true">
          <div class="h-5 w-10 rounded-full" :class="colorStore.bgClass"></div>
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
      <div
        class="flex items-center justify-between border-b border-gray-400 pb-3"
      >
        <span>Periodicity</span>
        <div class="flex gap-2">
          <button
            v-for="option in periodicityOptions"
            :key="option.name"
            class="rounded-full px-4 py-1 text-sm"
            :class="
              selectedPeriodicity === option.value
                ? [colorStore.bgClass, 'text-white']
                : 'bg-gray-300'
            "
            @click="updatePeriodicity(option.value)"
          >
            {{ option.name }}
          </button>
        </div>
      </div>
      <div class="flex items-center justify-between pt-3">
        <span>Goal value</span>
        <div class="flex items-center gap-2">
          <input
            type="number"
            placeholder="goal"
            v-model="habit.target"
            class="w-16 rounded-full bg-gray-300 px-2 py-1 text-center text-sm"
          />
          <button
            class="rounded-full bg-gray-300 px-4 py-1 text-sm text-gray-600"
            @click="toggleUnit = true"
          >
            {{ habit.unit }}
          </button>
        </div>
      </div>
      <p class="mt-2 text-xs text-amber-600">
        *Complete {{ habit.target }} {{ habit.unit }} each
        {{ habit.periodicity }}
      </p>
    </card-wrapper>

    <card-wrapper>
      <span> Timeframe </span>
      <div>
        <span> Start date: </span>
        <button @click="toggleCalendar = true">
          {{ startDate.toLocaleDateString() }}
        </button>
      </div>
      <div>
        <span> End date: </span>
        <button @click="toggleCalendar = true">No End Date</button>
      </div>
    </card-wrapper>

    <button
      @click.prevent="addHabit"
      :disabled="isSending"
      :class="colorStore.bgClass + ' w-full rounded-full py-2 text-white'"
    >
      <span v-if="isSending">Adding...</span>
      <span v-else>Add habit</span>
    </button>

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
        @selected-color="setColorTheme($event)"
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
    <Transition name="scale">
      <UnitSelectorModal
        v-if="toggleUnit"
        @close-modal="toggleUnit = false"
        @selected-unit="habit.unit = $event"
      />
    </Transition>
    <Transition name="scale">
      <DateSelectorModal
        v-if="toggleCalendar"
        :default-date="startDate"
        @close-modal="toggleCalendar = false"
      />
    </Transition>
    <Transition name="scale">
      <ShowResultMessageModal
        v-if="showResultMessage"
        :type="resultMessageData.type"
        :message="resultMessageData.message"
        @router-back="router.back()"
        @close-modal="showResultMessage = false"
      />
    </Transition>
  </div>
  <div v-else>
    <p class="text-center text-gray-600">Loading...</p>
  </div>
</template>

<script setup lang="ts">
import CardWrapper from "@/components/wrappers/CardWrapper.vue";
import IconSelectorModal from "@/components/modals/IconSelectorModal.vue";
import ColorSelectorModal from "@/components/modals/ColorSelectorModal.vue";
import GroupSelectorModal from "@/components/modals/GroupSelectorModal.vue";
import UnitSelectorModal from "@/components/modals/UnitSelectorModal.vue";
import DateSelectorModal from "@/components/modals/DateSelectorModal.vue";
import ShowResultMessageModal from "@/components/modals/ShowResultMessageModal.vue";
import { useColorStore } from "@/stores/colorStore";
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted, ref, provide } from "vue";
import router from "@/router";

type Periodicity = "day" | "week" | "month";

type Habit = {
  id: string;
  icon: string;
  title: string;
  description?: string;
  color?: string;
  group: string;
  target: number;
  unit: string;
  periodicity: Periodicity;
};

type ResultMessage = {
  type: "success" | "error";
  message: string;
};

type PeriodicityOption = {
  name: string;
  value: Periodicity;
};

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;
const habit = ref<Habit | null>(null);

const toggleColor = ref<boolean>(false);
const toggleGroup = ref<boolean>(false);
const toggleIcon = ref<boolean>(false);
const toggleUnit = ref<boolean>(false);
const toggleCalendar = ref<boolean>(false);

const selectedPeriodicity = ref<Periodicity>("day");

const isSending = ref<boolean>(false);
const showResultMessage = ref<boolean>(false);
const resultMessageData = ref<ResultMessage>({
  type: "success",
  message: "",
});

const colorStore = useColorStore();

const periodicityOptions: PeriodicityOption[] = [
  { name: "Daily", value: "day" },
  { name: "Weekly", value: "week" },
  { name: "Monthly", value: "month" },
];

const updatePeriodicity = (option: Periodicity): void => {
  if (habit.value) {
    habit.value.periodicity = option;
  }
  selectedPeriodicity.value = option;
};

const startDate = ref<Date>(new Date());
const setStartDate = (date: Date): void => {
  startDate.value = date;
};
provide("selected-date", setStartDate);
provide("default-start-date", startDate);

async function fetchHabitWithId(habitId: string) {
  try {
    const response = await axios.get<Habit>(
      `https://6994c147b081bc23e9c140ad.mockapi.io/habits/${habitId}`,
    );
    habit.value = response.data;
    habit.value.periodicity = selectedPeriodicity.value;
    console.log("Fetched habit: ", habit.value);
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

onMounted(() => {
  fetchHabitWithId(id);
});

function setColorTheme(colorKey: string): void {
  colorStore.setColor(colorKey);
  if (habit.value) {
    habit.value.color = colorKey;
  }
}

async function addHabit() {
  try {
    isSending.value = true;
    const response = await axios.post<Habit>(
      "https://6994c147b081bc23e9c140ad.mockapi.io/user-habits",
      habit.value,
    );
    console.log("Habit added: ", response.data);

    resultMessageData.value = {
      type: "success",
      message: "Habit added!",
    };

    showResultMessage.value = true;
  } catch (error) {
    console.log("Error: ", error);
    resultMessageData.value = {
      type: "error",
      message: "Failed to add habit :(",
    };
    showResultMessage.value = true;
  }
}
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
