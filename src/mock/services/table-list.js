import Mock from 'mockjs'
import { builder, getBody } from '../util'

const tableList = (_params) => {
  const params = getBody(_params)
  const data = Mock.mock({
    'list|10': [
      {
        'id|+1': 101,
        'age|18-22': 1,
        'gender|0-1': 0,
        name: '小E',
        'height|158-175': 160,
        birthday: Mock.Random.date('yyyy-MM-dd'),
        eatDinnerTime: ['11:30', '12:30'],
        workingTime: ['08:30', '18:00'],
        single: true,
        'loveHistory|0-1': 0,
        'occupation|0-1': 0,
        desc: Mock.Random.paragraph(),
        createTime: `@datetime`
      }
    ],
    pageSize: 10,
    currentPage: params.currentPage || 1,
    totalPage: 3,
    total: 30
  })
  return builder(data, 'success', 0)
}
const useMockTableList = () => {
  Mock.mock(/\/api\/table\/list/, 'post', tableList)
}

export default useMockTableList
