import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;

        colors: {
            greenPrimary: string;
            greenSecundary: string;
            whitePrimary: string;
            bluePrimary: string;
            blueSecundary: string;
            yellowPrimary: string;

            textGray1: string;
            textGray2: string;
            textGray3: string;
            textGray4: string;
            textGray5: string;
            textWhite: string;
            textRed: string;
            textBlue: string;
            backgroundWhite: string;
            backgroundGreen: string;
            backgroundRed: string;
        }
    }
}