import { THEME_KEY } from './theme';

// Runs before the first paint so an explicit saved theme is applied before hydration. Mirrors parseTheme and guards blocked storage.
const SCRIPT = `try{var t=JSON.parse(localStorage.getItem(${JSON.stringify(THEME_KEY)}));if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
