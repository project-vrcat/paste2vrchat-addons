<template>
  <main class="py-10 text-center text-gray-700 dark:text-gray-200">
    <div class="flex justify-center">
      <div class="flex-col w-160 p-8 border border-ccc-50 rounded-sm">
        <div class="text-center text-2xl font-bold">Paste2VRChat Addons</div>

        <div class="font-bold mt-5 text-center">
          <input
            v-model="pauseAllVideo"
            type="checkbox"
            class="border border-gray-400 rounded py-1 px-3 w-10 align-middle"
            id="pause-all-video"
          />
          <label for="pause-all-video" class="align-middle select-none">
            Pause all videos
          </label>
        </div>

        <div class="mt-5 text-center">
          <button
            bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
            text="white"
            p="y-2 x-4"
            border="rounded"
            @click="saveOptions"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const pauseAllVideo = ref(false);

chrome.storage.local.get(["pauseAllVideo"], (res) => {
  pauseAllVideo.value = res.pauseAllVideo === "true";
});

const saveOptions = ref(() => {
  chrome.storage.local.set({
    pauseAllVideo: pauseAllVideo.value ? "true" : "false",
  });
});
</script>
