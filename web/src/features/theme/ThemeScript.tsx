import { THEME_KEY } from './theme';

// Runs before the first paint so a saved light theme never flashes dark. Mirrors parseTheme and guards blocked storage.
const SCRIPT = `try{var t=JSON.parse(localStorage.getItem(${JSON.stringify(THEME_KEY)}));if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
