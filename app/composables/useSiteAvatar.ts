// Cravatar（初认头像）直连：https://<host>/avatar/<邮箱小写 MD5>?s=<尺寸>
// d03f4b96830060cab36b44646cf426e3 = md5('yanmo@ymbit.cn')
export const AVATAR_HASH = 'd03f4b96830060cab36b44646cf426e3'

// cn.cravatar.com 是国内源；想换成国际源可改成 https://cravatar.com
export const AVATAR_HOST = 'https://cn.cravatar.com'

// 头像尺寸：站内头像最大是 UAvatar 的 3xl（96px），200 已覆盖 2x 屏
export const AVATAR_SIZE = 200

// 自定义头像地址，留空表示使用上面的 Cravatar 直连
export const AVATAR_URL = ''

// 头像为空（未配置）或加载失败时跳到的兜底地址
export const AVATAR_FALLBACK = 'https://avatar.ymbit.cn'

export function cravatarAvatar(size: number = AVATAR_SIZE) {
  return `${AVATAR_HOST}/avatar/${AVATAR_HASH}?s=${size}`
}

/**
 * 站点头像：头像与网页 favicon 共用同一个地址，保证两者始终一致，
 * 并且只发一次请求（200 尺寸约 7 KB，而不是兜底地址的 165 KB）。
 *
 * 头像为空时使用 Cravatar 直连，加载失败时跳到 AVATAR_FALLBACK；
 * 兜底地址再失败时由 UAvatar 自身显示首字母占位，不会出现空白头像。
 */
export function useSiteAvatar() {
  const src = useState('site-avatar', () => AVATAR_URL.trim() || cravatarAvatar())

  function onAvatarError() {
    if (src.value !== AVATAR_FALLBACK) {
      src.value = AVATAR_FALLBACK
    }
  }

  return { src, onAvatarError }
}
