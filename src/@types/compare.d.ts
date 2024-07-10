export interface BusinessInfo {
  /**
   * 法定代表人
   */
  legalPersonName: string

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
   * 企业类型
   */
  companyOrgType: string

  /**
   * 行业
   */

  industry: string

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

  /**
   * 企业名
   */
  name: string
}

export interface Principal {
  name: string
  id: number
  type: number
  typeJoin: string[]
}

export interface Shareholder {
  name: string
  capitalPercent: string
}

export interface Final {
  name: string
  percent: string
}

// export interface Qualification {
//
// }

export interface EngerpriseBGInfo {
  principal: {
    total: number
    list: Principal[]
    pageDto: {
      page: number
      rows: number
    }
  }
  shareholder: {
    total: number
    list: Shareholder[]
    pageDto: {
      page: number
      rows: number
    }
  }
  final: {
    total: number
    list: Final[]
    pageDto: {
      page: number
      rows: number
    }
  }
  // qualification: {
  //   tptal: number
  //   list: Qualification[]
  //   pageDto: {
  //     page: number
  //     rows: number
  //   }
  // }
  qualification: {
    any
  }
}
