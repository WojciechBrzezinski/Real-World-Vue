<script setup>
import EventCard from '@/components/EventCard.vue'
import EventsService from '@/services/events'
import { onMounted, ref } from 'vue'

const events = ref(null)

onMounted(() => {
  EventsService.getEvents()
    .then((response) => {
      events.data = response.data.events
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>