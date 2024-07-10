export enum IMenuType {
  folder = 'folder',
  menu = 'menu'
}

export interface IMenu {
  title: string
  type: IMenuType // 目录，菜单，等等
  routerName?: string
  children?: IMenu[]
}

// export enum sifaColumn {
//   '111'= {
//
//   }
// }