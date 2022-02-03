<template>
  <main class="py-10 text-center text-gray-700 dark:text-gray-200">
    <div class="flex justify-center">
      <div class="flex-col w-160 p-8 border border-ccc-50 rounded-sm">
        <div class="text-center text-2xl font-bold">Paste2VRChat Addons</div>

        <div class="font-bold mt-5 text-center">
          <input
            v-model="pressEnter"
            type="checkbox"
            class="border border-gray-400 rounded py-1 px-3 w-10 align-middle"
            id="press-enter"
          />
          <label for="press-enter" class="align-middle select-none">Press Enter</label>
        </div>

        <div class="font-bold mt-5 text-center">
          <input
            v-model="pauseAllVideo"
            type="checkbox"
            class="border border-gray-400 rounded py-1 px-3 w-10 align-middle"
            id="pause-all-video"
          />
          <label for="pause-all-video" class="align-middle select-none">Pause all videos</label>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const pauseAllVideo = ref(false);
const pressEnter = ref(false);

watch(pauseAllVideo, (newValue) => {
  chrome.storage.local.set({ pauseAllVideo: newValue ? "true" : "false" });
});
watch(pressEnter, (newValue) => {
  chrome.storage.local.set({ pressEnter: newValue ? "true" : "false" });
});

chrome.storage.local.get(["pauseAllVideo", "pressEnter"], (res) => {
  pauseAllVideo.value = res.pauseAllVideo === "true";
  pressEnter.value = res.pressEnter === "true";
});
</script>
