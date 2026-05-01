<template>
  <div v-if="habitData" class="flex flex-col gap-6 p-5">
    <div
      class="relative mx-auto mb-2 flex w-full items-center justify-center gap-2"
    >
      <button @click="router.back()" class="absolute left-0">
        <SvgIcon
          name="chevron-left"
          class="size-6 transition-all hover:scale-110 hover:cursor-pointer"
        />
      </button>
      <span class="text-2xl">{{ habitData.icon }}</span>
      <h1 class="text-2xl font-medium">{{ habitData.title }}</h1>
    </div>

    <card-wrapper>
      <div class="flex gap-6 border-b border-gray-400 pb-2">
        <button
          class="flex aspect-square w-25 items-center justify-center rounded-lg border-2 border-dashed bg-gray-300 hover:cursor-pointer"
          :class="borderClass"
          @click="toggleIcon = true"
        >
          <span class="text-4xl">{{ habitData.icon }}</span>
        </button>
        <div class="w-full">
          <input
            class="w-full border-b border-gray-400 py-1"
            type="text"
            v-model="habitData.title"
          />
          <input
            class="w-full py-1"
            type="text"
            v-model="habitData.description"
            placeholder="Description (Optional)"
          />
        </div>
      </div>
      <div class="flex justify-between border-b border-gray-400 py-2">
        <span>Color</span>
        <button @click="toggleColor = true">
          <div class="h-5 w-10 rounded-full" :class="bgClass"></div>
        </button>
      </div>
      <div class="flex justify-between py-2">
        <span>Group</span>
        <button @click="toggleGroup = true">
          {{ habitData.group }}
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
            v-model="habitData.target"
            class="w-16 rounded-full bg-gray-300 px-2 py-1 text-center text-sm"
          />
          <button
            class="rounded-full bg-gray-300 px-4 py-1 text-sm text-gray-600"
            @click="toggleUnit = true"
          >
            {{ habitData.unit }}
          </button>
        </div>
      </div>
      <p class="mt-2 text-xs text-amber-600">
        *Complete {{ habitData.target }} {{ habitData.unit }} each day
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
      :class="bgClass + ' w-full rounded-full py-2 text-white'"
    >
      <span v-if="isSending">Adding...</span>
      <span v-else>Add habit</span>
    </button>

    <Transition name="scale">
      <IconSelectorModal
        v-if="toggleIcon"
        @close-modal="toggleIcon = false"
        @selected-icon="habitData.icon = $event"
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
        @selected-group="habitData.group = $event"
        :default-group="habitData.group"
        :color="borderClass"
      />
    </Transition>
    <Transition name="scale">
      <UnitSelectorModal
        v-if="toggleUnit"
        @close-modal="toggleUnit = false"
        @selected-unit="habitData.unit = $event"
      />
    </Transition>
    <Transition name="scale">
      <DateSelectorModal
        v-if="toggleCalendar"
        :date-picker-config="datePickerConfig"
        @close-modal="toggleCalendar = false"
      />
    </Transition>
    <Transition name="scale">
      <ShowResultMessageModal
        v-if="showResultMessage"
        :type="resultMessage.type"
        :message="resultMessage.message"
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
import { getBgClass, getBorderClass } from "@/utils/colors/colorHelpers";
import { useRoute } from "vue-router";
import { onMounted, ref, provide, computed } from "vue";
import router from "@/app/router";
import { habitsApi } from "@/api/habits";
import { Habit, ResultMessage, DateSelectorMode, EndDate } from "@/types";

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;
const habitData = ref<Habit | null>(null);

const toggleColor = ref<boolean>(false);
const toggleGroup = ref<boolean>(false);
const toggleIcon = ref<boolean>(false);
const toggleUnit = ref<boolean>(false);
const toggleCalendar = ref<boolean>(false);

const currentColor = ref<string>("blue-400");
const borderClass = computed(() => getBorderClass(currentColor.value));
const bgClass = computed(() => getBgClass(currentColor.value));

const isSending = ref<boolean>(false);
const showResultMessage = ref<boolean>(false);
const resultMessage = ref<ResultMessage>({
  type: "success",
  message: "",
});

const startDate = ref<Date>(new Date());
const endDate = ref<EndDate>("No End Date");

const datePickerConfig = ref({
  mode: "startDate" as DateSelectorMode,
  value: null as Date | null,
});

const openStartDatePicker = () => {
  datePickerConfig.value = {
    mode: "startDate",
    value: startDate.value,
  };
  toggleCalendar.value = true;
};

const openEndDatePicker = () => {
  datePickerConfig.value = {
    mode: "endDate",
    value: endDate.value === "No End Date" ? null : endDate.value,
  };
  toggleCalendar.value = true;
};

const handleDateSelection = (
  result: Date | "No End Date" | null,
  mode: DateSelectorMode,
) => {
  if (mode === "startDate" && result instanceof Date) {
    startDate.value = result;
  } else if (mode === "endDate") {
    if (result === "No End Date") {
      endDate.value = "No End Date";
    } else if (result instanceof Date) {
      endDate.value = result;
    }
  }
};

provide("selected-date", handleDateSelection);

async function fetchHabitWithId(habitId: string) {
  try {
    const response = await habitsApi.getGlobalHabitById(habitId);
    habitData.value = response.data;
    console.log("Fetched habit: ", habitData.value);
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

onMounted(() => {
  fetchHabitWithId(id);
});

function setColorTheme(colorKey: string): void {
  currentColor.value = colorKey;
  if (habitData.value) {
    habitData.value.color = colorKey;
  }
}

const prepareHabitForSubmit = () => {
  if (!habitData.value) return null;

  return {
    ...habitData.value,
    color: currentColor.value,
    startDate: startDate.value.toISOString(),
    endDate:
      endDate.value === "No End Date" ? null : endDate.value.toISOString(),
  };
};

const validateDates = (): boolean => {
  if (endDate.value !== "No End Date" && endDate.value < startDate.value) {
    resultMessage.value = {
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

    const response = await habitsApi.createUserHabit(habitToSubmit);
    console.log("Habit added: ", response.data);

    resultMessage.value = {
      type: "success",
      message: "Habit added!",
    };

    showResultMessage.value = true;
  } catch (error) {
    console.log("Error: ", error);
    resultMessage.value = {
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
