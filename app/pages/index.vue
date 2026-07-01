<script setup lang="ts">
import { socials } from '~/data/socials'
import { friends } from '~/data/friends'

// Hitokoto
interface HitokotoData {
  hitokoto: string
  from?: string
  from_who?: string
}

const { data: hitokotoData, refresh: refreshHitokoto } = await useFetch<HitokotoData>('https://v1.hitokoto.cn/', {
  query: { c: 'f' }
})

// Weather
interface WeatherData {
  city: string
  weather: string
  temperature: string
}

const { data: weather } = await useFetch<WeatherData>('https://ymbit.cn/api/weather/today', {
  server: false
})

// IP Location
interface IpData {
  query: string
}

const { data: ipData } = await useFetch<IpData>('https://ymbit.cn/api/ip/location', {
  server: false
})

// Weather icon mapping
function getWeatherIcon(weather: string): string {
  if (weather.includes('晴')) return 'i-lucide-sun'
  if (weather.includes('云') || weather.includes('阴')) return 'i-lucide-cloud'
  if (weather.includes('雨')) return 'i-lucide-cloud-rain'
  if (weather.includes('雪')) return 'i-lucide-snowflake'
  if (weather.includes('雾') || weather.includes('霾')) return 'i-lucide-cloud-fog'
  if (weather.includes('风')) return 'i-lucide-wind'
  return 'i-lucide-cloud-sun'
}

// 动画：渐变 + 从下往上显现
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Background Image -->
    <div
      class="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
      style="background-image: url('https://t.alcy.cc/moez/')"
    >
      <div class="absolute inset-0 bg-black/30 dark:bg-black/60" />
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 py-12 space-y-16">
      <!-- Hero Section -->
      <section :class="['flex flex-col items-center text-center space-y-6', 'fade-up', 'delay-1', { visible: isVisible }]">
        <UAvatar
          src="https://avatar.ymbit.cn/"
          alt="烟墨"
          size="3xl"
          class="ring-4 ring-white/50 shadow-xl"
        />

        <div class="space-y-3">
          <h1 class="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
            烟墨的小破站
          </h1>
          <p class="text-lg text-white/90 max-w-lg mx-auto drop-shadow">
            一个热爱技术的开发者，喜欢折腾各种有趣的东西
          </p>
        </div>

        <!-- Hitokoto & Weather -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <!-- Weather & IP -->
          <UTooltip text="API 文档">
            <a
              v-if="weather"
              href="https://blog.ymbit.cn/otherApi"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-2.5 flex flex-col items-center gap-1 hover:bg-white/30 transition-colors"
            >
              <div class="flex items-center gap-2">
                <UIcon
                  :name="getWeatherIcon(weather.weather)"
                  class="w-4 h-4 text-white/80"
                />
                <span class="text-sm text-white/90">{{ weather.city }}</span>
                <span class="text-sm text-white/90">{{ weather.temperature }}°C</span>
                <span class="text-sm text-white/70">{{ weather.weather }}</span>
              </div>
              <div
                v-if="ipData"
                class="flex items-center gap-2"
              >
                <UIcon
                  name="i-lucide-map-pin"
                  class="w-4 h-4 text-white/80"
                />
                <span class="text-sm text-white/90">{{ ipData.query }}</span>
              </div>
            </a>
          </UTooltip>

          <!-- Hitokoto -->
          <div
            v-if="hitokotoData"
            class="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-2.5 flex flex-col items-center gap-1 cursor-pointer hover:bg-white/30 transition-colors max-w-md"
            @click="refreshHitokoto()"
          >
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-quote"
                class="w-4 h-4 text-white/80 shrink-0"
              />
              <p class="text-sm text-white/90 truncate">
                {{ hitokotoData.hitokoto }}
              </p>
              <UIcon
                name="i-lucide-refresh-cw"
                class="w-3 h-3 text-white/60 shrink-0"
              />
            </div>
            <p
              v-if="hitokotoData.from || hitokotoData.from_who"
              class="text-xs text-white/60"
            >
              —— {{ hitokotoData.from_who ? `${hitokotoData.from_who}「${hitokotoData.from}」` : hitokotoData.from }}
            </p>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex items-center gap-3">
          <UButton
            v-for="social in socials"
            :key="social.name"
            :to="social.url"
            target="_blank"
            :icon="social.icon"
            :aria-label="social.name"
            color="neutral"
            variant="ghost"
            size="lg"
            class="text-white hover:bg-white/20"
          />
        </div>
      </section>

      <!-- Personal Links Section -->
      <section :class="['space-y-8', 'fade-up', 'delay-2', { visible: isVisible }]">
        <div class="text-center space-y-2">
          <h2 class="text-2xl font-bold text-white drop-shadow-lg">
            个人链接
          </h2>
        </div>

        <div class="flex flex-wrap justify-center gap-3">
          <a
            v-for="friend in friends"
            :key="friend.name"
            :href="friend.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 hover:bg-white/30 transition-colors"
            style="margin-bottom: 20px; font-size: 26px;"
          >
            <component
              :is="friend.icon"
              class="w-6 h-6 text-white/90 shrink-0"
            />
            <span class="text-white/90">{{ friend.name }}</span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<!-- 我不知道为什么 WebStorm 一定要说他没用 但是真注释了又跑不来 -->
<!--suppress CssUnusedSymbol -->
<style scoped>
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 交错动画延迟 */
.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.2s; }
.delay-3 { transition-delay: 0.3s; }
.delay-4 { transition-delay: 0.4s; }
.delay-5 { transition-delay: 0.5s; }
.delay-6 { transition-delay: 0.6s; }
</style>
