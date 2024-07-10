import axios from '@/modules/service/axios'

// 增加违规信息
export const aaprogress = () => axios.post('/progress')