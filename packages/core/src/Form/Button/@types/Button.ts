// import { CSSObject } from "@emotion/serialize";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	loading?: boolean;
	className?: string;
	children?: any;
	loader?: ReactNode;
	loaderColor?: string;
	loaderSize?: number;
	loaderText?: string;
	variant?: buttonVariant;
	color?: buttonColor;
	icon?: ReactNode;
	disabled?: boolean;
	prependComponent?: ReactNode;
	prependComponentContainerStyle?: any;
	appendComponent?: ReactNode;
	appendComponentContainerStyle?: any;
	size?: buttonSizes;
	to?: string;
	href?: string;
	styles?: any;
	action?(args?: any): void;
	align?: "left" | "right" | "center";
	disabledHelperText?: string;
	router?: "none" | any;
  height?: number;
};

export interface ButtonColorTheme {
	text: string;
	background: string;
	border?: string;
	shadow?: string;
	hover?: Exclude<"hover", ButtonColorTheme>;
};

export type buttonVariant =
	| "outlined"
	| "ghost"
	| "disabled"
	| "flat"
	| "fab"
	| "edge"
	| "text"
	| "default";
export type buttonColor =
	| "red"
	| "transparent"
	| "blue"
	| "green"
	| "teal"
	| "yellow"
	| "purple"
	| "black"
	| "white"
	| "secondary"
	| "warning"
	| "success"
	| "primary"
	| "error"
	| "abstract";
export type buttonSizes = "xs" | "sm" | "md" | "lg";
