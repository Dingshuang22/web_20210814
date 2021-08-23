import http from "@/config/http"

/**
 * 地址
 * @param {object} params
 */
export function getArea(params) {
  return http({
    url: "/address/lists",
    data: params
  })
}

/**
 * 获取地区
 */
export function getCity(params) {
  return http({
    url: "/address/city",
    data: params
  })
}
