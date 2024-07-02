import { ReactNode, ButtonHTMLAttributes } from "react";

interface IProms extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    children: ReactNode;
    width?:"w-full" | "w-fit"
}

const Button = ({ className, children,width='w-full', ...rest }: IProms) => {
    return (
        <button className={`${className} p-2 ${width} rounded-md text-white`} {...rest}>
            {children}
        </button>
    );
};

export default Button;

