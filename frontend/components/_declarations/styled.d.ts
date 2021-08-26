import 'styled-components';

declare module "styled-components" {
	export interface DefaultTheme {
		palette: {
			primary: string;
			secondary: string;
		};
		element: {
			primary: string;
			secondary: string;
		};
		interactive: {
			normal: string;
			disabled: string;
		};
		text: {
			primary: string;
			secondary: string;
		}
	}
}