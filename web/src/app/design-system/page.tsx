import { withBasePath } from '@/lib/site';
import { Showcase } from '@editonny/design-system/showcase';
import photo from '@editonny/design-system/assets/imagery/matheus-gomes.jpeg';
import br from '@editonny/design-system/assets/flags/br.svg';
import es from '@editonny/design-system/assets/flags/es.svg';
import us from '@editonny/design-system/assets/flags/us.svg';
import city from '../../../../skills/editonny/visuals/assets/visuals/img/city.jpg';

const GUIDE = [
  { label: 'Home', href: withBasePath('/en') },
  { label: 'Create a request', href: withBasePath('/en/create') },
  { label: 'Catalog', href: withBasePath('/en/catalog') },
  { label: 'Examples', href: withBasePath('/en/examples') },
  { label: 'Installation', href: withBasePath('/en/install') },
];

export default function DesignSystemPage() {
  return (
    <>
      <a className="sc-skip" href="#sc-main">Skip to content</a>
      <Showcase image={city.src} photo={photo.src} flags={{ br: br.src, es: es.src, us: us.src }} guide={GUIDE} />
    </>
  );
}
