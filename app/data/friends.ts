import { Newspaper, Link, Open } from '@vicons/ionicons5'

export interface Friend {
  name: string
  url: string
  icon: any
}

export const friends: Friend[] = [
  {
    name: '博客',
    url: 'https://blog.ymbit.cn/',
    icon: Newspaper
  },
  {
    name: 'AList',
    url: 'https://alist.ymbit.cn',
    icon: Link
  },
  {
    name: '站点监测',
    url: 'https://status.ymbit.cn',
    icon: Open
  }
]
