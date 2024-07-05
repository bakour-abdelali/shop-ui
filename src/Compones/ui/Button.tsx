import { ReactNode, ButtonHTMLAttributes } from "react";

/**
 * Props for the Button component.
 * 
 * @typedef {Object} IProms
 * @property {string} [className] - Additional classes for the button to allow for custom styling.
 * @property {ReactNode} children - The content inside the button, can be text, icons, or other elements.
 * @property {"w-full" | "w-fit"} [width="w-full"] - The width of the button. "w-full" makes the button take full width of its container, while "w-fit" makes the button fit the content width.
 * @property {ButtonHTMLAttributes<HTMLButtonElement>} [rest] - Any other button attributes such as onClick, disabled, etc.
 */
interface IProms extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Additional classes for the button to allow for custom styling.
     */
    className?: string;

    /**
     * The content inside the button, can be text, icons, or other elements.
     */
    children: ReactNode;

    /**
     * The width of the button. "w-full" makes the button take full width of its container,
     * while "w-fit" makes the button fit the content width.
     */
    width?: "w-full" | "w-fit";
}

/**
 * A customizable button component.
 * 
 * @param {IProms} props - The properties object.
 * @param {string} [props.className] - Additional classes for the button to allow for custom styling.
 * @param {ReactNode} props.children - The content inside the button, can be text, icons, or other elements.
 * @param {"w-full" | "w-fit"} [props.width="w-full"] - The width of the button. "w-full" makes the button take full width of its container, while "w-fit" makes the button fit the content width.
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} [props.rest] - Any other button attributes such as onClick, disabled, etc.
 * 
 * @returns {JSX.Element} The rendered button component.
 */
const Button = ({ className, children, width='w-full', ...rest }: IProms) => {
    return (
        <button className={`${className} p-2 ${width} rounded-md text-white`} {...rest}>
            {children}
        </button>
    );
};

export default Button;
