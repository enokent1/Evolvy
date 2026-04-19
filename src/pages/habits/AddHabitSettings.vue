<template>
  <div v-if="habit" class="flex flex-col gap-6 p-5">
    <div
      class="relative mx-auto mb-2 flex w-full items-center justify-center gap-2"
    >
      <button @click="router.back()" class="absolute left-0">
        <SvgIcon
          name="chevron-left"
          class="size-6 transition-all hover:scale-110 hover:cursor-pointer"
        />
      </button>
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
      <div class="flex items-center justify-between">
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
        *Complete {{ habit.target }} {{ habit.unit }} each day
      </p>
    </card-wrapper>

    <card-wrapper>
      <span> Timeframe </span>
      <div>
        <span> Start date: </span>
        <button @click="openStartDatePicker">
          {{ startDate.toLocaleDateString() }}
        </button>
      </div>
      <div>
        <span> End date: </span>
        <button @click="openEndDatePicker">
          {{
            endDate === "No End Date"
              ? "No End Date"
              : endDate.toLocaleDateString()
          }}
        </button>
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
        :date-selector-params="dateSelectorProps"
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
import SvgIcon from "@/assets/icons/SvgIcon.vue";
import { useColorStore } from "@/stores/colorStore";
import { useRoute } from "vue-router";
import { onMounted, ref, provide } from "vue";
import router from "@/app/router";
import { habitsApi } from "@/api/habits";

type Habit = {
  id: string;
  icon: string;
  title: string;
  description?: string;
  color?: string;
  group: string;
  target: number;
  unit: string;
  startDate: string;
  endDate: string | null;
};

type ResultMessage = {
  type: "success" | "error";
  message: string;
};

type DateSelectorMode = "start" | "end";
type EndDateValue = Date | "No End Date";

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

const isSending = ref<boolean>(false);
const showResultMessage = ref<boolean>(false);
const resultMessageData = ref<ResultMessage>({
  type: "success",
  message: "",
});

const colorStore = useColorStore();

const startDate = ref<Date>(new Date());
const endDate = ref<EndDateValue>("No End Date");

const dateSelectorProps = ref({
  mode: "start" as DateSelectorMode,
  value: null as Date | null,
});

const openStartDatePicker = () => {
  dateSelectorProps.value = {
    mode: "start",
    value: startDate.value,
  };
  toggleCalendar.value = true;
};

const openEndDatePicker = () => {
  dateSelectorProps.value = {
    mode: "end",
    value: endDate.value === "No End Date" ? null : endDate.value,
  };
  toggleCalendar.value = true;
};

const setSelectedDate = (
  result: Date | "No End Date" | null,
  mode: DateSelectorMode,
) => {
  if (mode === "start" && result instanceof Date) {
    startDate.value = result;
  } else if (mode === "end") {
    if (result === "No End Date") {
      endDate.value = "No End Date";
    } else if (result instanceof Date) {
      endDate.value = result;
    }
  }
};

provide("selected-date", setSelectedDate);

async function fetchHabitWithId(habitId: string) {
  try {
    const response = await habitsApi.getById(habitId);
    habit.value = response.data;
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

const prepareHabitForSubmit = () => {
  if (!habit.value) return null;

  return {
    ...habit.value,
    color: "blue-500",
    startDate: startDate.value.toISOString(),
    endDate:
      endDate.value === "No End Date" ? null : endDate.value.toISOString(),
  };
};

const validateDates = (): boolean => {
  if (endDate.value !== "No End Date" && endDate.value < startDate.value) {
    resultMessageData.value = {
      type: "error",
      message: "End date cannot be earlier than start date",
    };
    showResultMessage.value = true;
    return false;
  }
  return true;
};

async function addHabit() {
  try {
    isSending.value = true;

    if (!validateDates()) return;

    const habitToSubmit = prepareHabitForSubmit();
    if (!habitToSubmit) return;

    const response = await habitsApi.create(habitToSubmit);
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
  } finally {
    isSending.value = false;
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
