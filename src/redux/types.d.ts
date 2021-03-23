interface ILiuren {
  id: number,
  _id?: any,
  status: string
  content?: import('../core/liuren/liuren').Liuren,
  dayGan: string,
  dayZhi: string,
  hour: string,
  yueJiang: string,
  title: string,
  description?: string
}

type LiurenState = {
  items: ILiuren[],
  loading:boolean,
  error:any
}

type LiurenAction = {
  type: string
  payload: ILiuren | ILiuren[]
  error?:any
}

type AppState = ReturnType<typeof rootReducer>;

type DispatchType = (args: LiurenAction) => LiurenAction

