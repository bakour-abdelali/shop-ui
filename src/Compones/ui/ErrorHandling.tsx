interface IProms{
    msg:string
}
const ErrorHandling=({msg}:IProms)=>{
    return  (
   msg?  <span className="block text-red-700  text-sm ">{msg}</span>:null
    )
}
export default ErrorHandling
