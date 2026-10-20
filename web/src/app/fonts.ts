import localFont from 'next/font/local';

// Latin WOFF2 subsets of the engine's licensed fonts (see ./fonts/README.md). Each loader exposes a --font-*-face
// variable that design-system/tokens/typography.css maps onto the font tokens; only Figtree is preloaded.
const figtree = localFont({ src: './fonts/figtree-latin.woff2', weight: '300 900', variable: '--font-figtree-face', display: 'swap' });
const anton = localFont({ src: './fonts/anton-latin.woff2', weight: '400', variable: '--font-anton-face', display: 'swap', preload: false });
const montserrat = localFont({ src: './fonts/montserrat-latin.woff2', weight: '100 900', variable: '--font-montserrat-face', display: 'swap', preload: false });
const caveat = localFont({ src: './fonts/caveat-latin.woff2', weight: '400 700', variable: '--font-caveat-face', display: 'swap', preload: false });
const marker = localFont({ src: './fonts/permanent-marker-latin.woff2', weight: '400', variable: '--font-marker-face', display: 'swap', preload: false });

/** Class names that define every font variable; put them on `<html>`. */
export const fontVariables = [figtree, anton, montserrat, caveat, marker].map(font => font.variable).join(' ');
