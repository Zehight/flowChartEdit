export interface BaseInfo {
  /**
   * 法定代表人
   */
  legalPersonName: string

  /**
   * 法定代表人公司列表
   */
  legalPersonCompany: Array<string>
  /**
   * 经营状态
   */
  regStatus: string

  /**
   * 成⽴⽇期
   */
  estiblishTime: string

  /**
   * 注册资本
   */
  regCapital: string

  /**
   * 实际注册资金
   */
  actualCapital: string

  /**
   * 统一社会信用代码
   */
  creditCode: string

  /**
   * 纳税人识别号
   */
  taxNumber: string

  /**
   * 注册号
   */
  regNumber: string

  /**
   * 组织机构代码
   */
  orgNumber: string

  /**
   * 经营开始时间
   */
  fromTime: string

  /**
   * 经营结束时间
   */
  toTime: string

  /**
   * 企业类型
   */
  companyOrgType: string

  /**
   * 注册地址
   */
  regLocation: string

  /**
   * 曾⽤名
   */
  historyNames: string

  /**
   * 行业
   */
  industry: string

  /**
   * 登记机关
   */
  regInstitute: string

  /**
   * 英⽂名
   */
  property3: string

  /**
   * 核准日期
   */
  approvedTime: string

  /**
   * 人员规模
   */
  staffNumRange: string

  /**
   * 参保人数
   */
  socialStaffNum: string

  /**
   * 经营范围
   */
  businessScope: string
}
