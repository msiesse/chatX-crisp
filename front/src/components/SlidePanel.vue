<template>
  <TransitionRoot as="template" :show="props.show">
    <Dialog as="div" class="relative z-10" @close="changeOpen">
      <div class="fixed inset-0"/>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
                             enter-from="translate-x-full" enter-to="translate-x-0"
                             leave="transform transition ease-in-out duration-500 sm:duration-700"
                             leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-base font-semibold leading-6 text-gray-900">{{
                          props.title
                        }}
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button"
                                class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                @click="changeOpen">
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
                        </button>
                      </div>
                    </div>
                  </div>
                  <ul class="relative mt-6 flex-1 px-4 sm:px-6">
                    <li v-for="user in props.users"> {{ user.username }}</li>
                  </ul>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {XMarkIcon} from '@heroicons/vue/24/outline'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  users: {
    type: Object,
    required: true
  },
  show: Boolean
});

const emits = defineEmits(['update:show']);

const changeOpen = () => {
  emits('update:show', false);
}
</script>