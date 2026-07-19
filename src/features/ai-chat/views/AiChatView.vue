<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const messages = ref<Message[]>([
  {
    id: 1,
    text: 'Hello! I am Gabayan, your AI assistant for aquaculture. How can I help you today?',
    sender: 'bot',
    timestamp: new Date()
  }
])

const newMessage = ref('')
const isTyping = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  // Add user message
  messages.value.push({
    id: Date.now(),
    text: newMessage.value.trim(),
    sender: 'user',
    timestamp: new Date()
  })

  const userText = newMessage.value.trim()
  newMessage.value = ''
  scrollToBottom()

  // Simulate AI typing
  isTyping.value = true
  scrollToBottom()

  setTimeout(() => {
    isTyping.value = false
    
    // Simple mock responses based on keywords, or generic fallback
    let botReply = "I'm currently a prototype and can only give basic responses. Please ask me about water quality or fish health!"
    const lowerText = userText.toLowerCase()
    
    if (lowerText.includes('salinity') || lowerText.includes('water') || lowerText.includes('ph')) {
      botReply = "Maintaining proper water quality is crucial. Make sure your pH is between 6.5 and 8.5 depending on your species, and keep an eye on ammonia levels!"
    } else if (lowerText.includes('disease') || lowerText.includes('sick')) {
      botReply = "If you notice your fish behaving abnormally, please check the 'Diseases' section on the dashboard for a visual guide on common symptoms and treatments."
    } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
      botReply = "Hello there! How's your farm doing today?"
    }

    messages.value.push({
      id: Date.now(),
      text: botReply,
      sender: 'bot',
      timestamp: new Date()
    })
    scrollToBottom()
  }, 1500)
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="flex flex-col h-dvh bg-gray-50">
    <!-- Header -->
    <header class="flex items-center px-4 py-3 bg-white shadow-sm border-b border-gray-100 z-10 sticky top-0">
      <button 
        @click="goBack" 
        class="p-2 mr-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200 focus:outline-none"
        aria-label="Go back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div class="flex items-center gap-3">
        <div class="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-md">
          <span class="text-xl">🤖</span>
          <span class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-white"></span>
        </div>
        <div>
          <h1 class="text-lg font-bold text-gray-900 leading-tight">Gabayan</h1>
          <p class="text-xs text-green-500 font-medium">Online</p>
        </div>
      </div>
    </header>

    <!-- Chat Area -->
    <main 
      ref="chatContainer"
      class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
    >
      <div 
        v-for="msg in messages" 
        :key="msg.id" 
        class="flex w-full"
        :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div class="flex max-w-[80%] items-end gap-2" :class="msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'">
          <!-- Avatar for bot -->
          <div v-if="msg.sender === 'bot'" class="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm shadow-sm">
            🤖
          </div>
          
          <!-- Message Bubble -->
          <div 
            class="px-4 py-3 rounded-2xl shadow-sm relative group"
            :class="[
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-sm' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
            ]"
          >
            <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ msg.text }}</p>
            <span 
              class="text-[10px] mt-1 block"
              :class="msg.sender === 'user' ? 'text-blue-100 text-right' : 'text-gray-400 text-left'"
            >
              {{ formatTime(msg.timestamp) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="isTyping" class="flex w-full justify-start mt-2">
        <div class="flex items-end gap-2">
          <div class="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm shadow-sm">
            🤖
          </div>
          <div class="px-4 py-3 bg-white border border-gray-100 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1">
            <span class="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
            <span class="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
            <span class="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
          </div>
        </div>
      </div>
    </main>

    <!-- Input Area -->
    <footer class="p-3 bg-white border-t border-gray-200">
      <form @submit.prevent="sendMessage" class="flex items-end gap-2 max-w-4xl mx-auto">
        <div class="flex-1 relative bg-gray-100 rounded-2xl border border-transparent focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200 overflow-hidden">
          <textarea
            v-model="newMessage"
            rows="1"
            placeholder="Ask Gabayan..."
            class="w-full bg-transparent text-sm py-3 px-4 resize-none outline-none max-h-32 text-gray-800 placeholder-gray-400"
            @keydown.enter.prevent="sendMessage"
            style="min-height: 44px;"
          ></textarea>
        </div>
        
        <button 
          type="submit"
          :disabled="!newMessage.trim() || isTyping"
          class="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
          :class="[
            newMessage.trim() && !isTyping
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-90 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </footer>
  </div>
</template>

<style scoped>
/* Custom scrollbar for webkit */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
