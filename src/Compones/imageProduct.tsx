interface IProms{
    src:string,
    alt:string,
    className:string
}
const ImageProduct=({src,alt,className}:IProms)=>{
    return (

<img src={src} alt={alt} className={className} />


    )
}
export default ImageProduct
