<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: 'https://avatar.ymbit.cn/' }
  ],
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

const title = '烟墨的小破站'
const description = '烟墨的个人网站，分享技术与生活'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp class="flex flex-col min-h-screen">
    <UHeader class="liquid-glass-header">
      <template #left>
        <NuxtLink
          to="/"
          class="flex items-center gap-2"
        >
          <UAvatar
            src="https://avatar.ymbit.cn/"
            alt="烟墨的小破站"
            size="sm"
          />
          <span class="font-bold text-lg">烟墨的小破站</span>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain class="flex-1">
      <NuxtPage />
    </UMain>

    <UFooter class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-t border-white/20 mt-auto">
      <template #left>
        <p class="text-sm text-muted">
          © 2020-{{ new Date().getFullYear() }} ltzXiaoYanMo
        </p>
      </template>

      <template #right>
        <div class="flex flex-col sm:flex-row items-end gap-1 text-xs text-muted">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors"
          >
            浙ICP备2024084850号-1
          </a>
          <span class="hidden sm:inline">|</span>
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=33038102332470"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors"
          >
            浙公网安备33038102332470号
          </a>
          <span class="hidden sm:inline">|</span>
          <a
            href="https://icp.gov.moe/?keyword=20240848"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors"
          >
            萌ICP备20240848号
          </a>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>

<style>
.liquid-glass-header {
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.72) 0%,
    rgba(255, 255, 255, 0.58) 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

:is(.dark) .liquid-glass-header {
  background: linear-gradient(
    180deg,
    rgba(20, 20, 25, 0.72) 0%,
    rgba(20, 20, 25, 0.58) 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
</style>
