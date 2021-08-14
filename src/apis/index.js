import http from '@/config/http'
// 权限管理
export const getGroups = () => {
  return http({
    url: '/v1/Ads/space/get-space-list',
    method: 'get',
    params: {action: 'get_groups'}
  })
}
