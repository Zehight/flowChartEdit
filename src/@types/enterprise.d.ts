export interface CompanyInfo {
  id: string
  creditCode: string
  name: string
  regStatus: string
  legalPersonName: string
  regCapital: string
  estiblishTime: string
}

export interface ViolateItemInfo {
  id: string
  cid: string
  companyName: string
  companyCode: string
  violationCate: string
  violationDetail: string
  type: 0 | 1
  delStatus: number
  remark: null | string
  createBy: string
  createName: string
  createTime: string
  updateBy: string
  updateTime: string
}
