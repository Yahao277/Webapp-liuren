  
export const keysPropsMap = <T>(o:T): (keyof T)[] => {
  return Object.keys(o) as (keyof T)[];
}