import { HTMLAttributes } from "react"

interface IProms extends HTMLAttributes<HTMLSpanElement>{
    color:string
}
const CirclerColor=({color,...rest}:IProms)=>{
    return (
<span className="block w-5 h-5 rounded-full" style={{backgroundColor:color}} {...rest}></span>
    )
}
export default CirclerColor
