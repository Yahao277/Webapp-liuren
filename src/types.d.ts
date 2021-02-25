interface ILiuren {
  id: number
  title: string
  body: string
}

type LiurenState = {
  articles: IArticle[]
}

type LiurenAction = {
  type: string
  article: IArticle
}

type DispatchType = (args: LiurenAction) => LiurenAction