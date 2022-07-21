// import { CSSObject } from "@emotion/serialize";
// import { BreakPoint } from "../@types/styles";

// const breakpoints = {
// 	$sm: 576,
// 	$md: 768,
// 	$lg: 992,
// 	$xl: 1200,
// 	$xxl: 1400,
// 	$xxxl: 1800,

// 	between(min: BreakPoint, max: BreakPoint, css: CSSObject) {
// 		return {
// 			[`@media only screen and (min-width: ${this[`$${min}`] + 1}px) and (max-width: ${this[`$${max}`] + 1}px)`]:
// 				css,
// 		};
// 	},

// 	xxs(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (max-width: 300px)`]: css };
// 	},

// 	xs(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (max-width: ${this.$sm}px)`]: css };
// 	},

// 	smDown(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (max-width: ${this.$md}px)`]: css };
// 	},

// 	sm(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (min-width: ${this.$sm + 1}px) and (max-width: ${this.$md}px)`]: css };
// 	},

// 	smUp(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (min-width: ${this.$sm + 1}px)`]: css };
// 	},

// 	mdDown(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (max-width: ${this.$lg}px)`]: css };
// 	},

// 	md(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (min-width: ${this.$md + 1}px) and (max-width: ${this.$lg}px)`]: css };
// 	},

// 	mdUp(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (min-width: ${this.$md + 1}px)`]: css };
// 	},

// 	lgDown(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (max-width: ${this.$xl}px)`]: css };
// 	},

// 	lg(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (min-width: ${this.$lg + 1}px) and (max-width: ${this.$xl}px)`]: css };
// 	},

// 	lgUp(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (min-width: ${this.$lg + 1}px)`]: css };
// 	},

// 	xlDown(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (max-width: ${this.$xxl}px)`]: css };
// 	},

// 	xl(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (min-width: ${this.$xl + 1}px) and (max-width: ${this.$xxl}px)`]: css };
// 	},

// 	xlUp(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (min-width: ${this.$xl + 1}px)`]: css };
// 	},

// 	xxlDown(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (max-width: ${this.$xxxl}px)`]: css };
// 	},

// 	xxl(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (min-width: ${this.$xxl + 1}px)`]: css };
// 	},

// 	xxlUp(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (min-width: ${this.$xxl + 1}px)`]: css };
// 	},

// 	xxxl(css: CSSObject): CSSObject {
// 		return { [`@media only screen and (min-width: ${this.$xxxl + 1}px)`]: css };
// 	},

// 	// sm: "@media (min-width: 640px)",
// 	// md: "@media (min-width: 768px)",
// 	// lg: "@media (min-width: 1024px)",
// 	// xl: "@media (min-width: 1280px)",
// 	// xxl: "@media (min-width: 1536px)",
// };

// export default breakpoints;
export {};
