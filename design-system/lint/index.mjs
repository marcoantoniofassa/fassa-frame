// ESLint plugin enforcing design-system adherence in CSS (language "css/css" from @eslint/css).
// Ported from the export's _adherence.oxlintrc.json, which checked inline style literals in JSX.

const COLOR_FUNCTIONS = new Set(['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'color']);
const NAMED_COLORS = new Set(('aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen').split(' '));
const COLOR_PROPERTY = /^(color|background(-color)?|border(-(top|right|bottom|left|block|inline)(-(start|end))?)?(-color)?|outline(-color)?|fill|stroke|(box|text)-shadow|caret-color|accent-color|text-decoration(-color)?|column-rule(-color)?|-webkit-text-stroke(-color)?)$/;
const SPACING_PROPERTY = /^(padding|margin)(-(top|right|bottom|left|block|inline)(-(start|end))?)?$|^(row-|column-)?gap$/;
const RADIUS_PROPERTY = /^border(-(top|bottom|start|end)-(left|right|start|end))?-radius$/;
const RAW_COLOR = /#[0-9a-f]{3,8}\b|\b(rgba?|hsla?|hwb|oklch|oklab|lab|lch|color)\(/i;
const SYSTEM_FONT_VALUES = new Set(['inherit', 'initial', 'unset', 'revert']);
// Identifiers the `font` shorthand accepts besides a family name.
const FONT_KEYWORDS = new Set([...SYSTEM_FONT_VALUES, 'normal', 'italic', 'oblique', 'bold', 'bolder', 'lighter', 'small-caps', 'ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded', 'xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', 'xxx-large', 'smaller', 'larger', 'caption', 'icon', 'menu', 'message-box', 'small-caption', 'status-bar']);

/** Named colors in a custom-property value, ignoring var() references. @param {string} raw */
const namedColor = raw => raw.replace(/var\([^)]*\)/g, '').toLowerCase().match(/[a-z]+/g)?.find(word => NAMED_COLORS.has(word));

/** Walk a CSSTree value node; var() references are tokens by definition, so their contents are skipped. */
function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  visit(node);
  if (node.type === 'Function' && node.name.toLowerCase() === 'var') return;
  for (const child of node.children ?? []) walk(child, visit);
}

const tokens = {
  meta: {
    type: 'problem',
    docs: { description: 'Require design-system tokens for color, font family and size, spacing, and radius.' },
    schema: [{
      type: 'object',
      properties: { color: { type: 'boolean' }, font: { type: 'boolean' }, fontSize: { type: 'boolean' }, spacing: { type: 'boolean' }, radius: { type: 'boolean' } },
      additionalProperties: false,
    }],
    messages: {
      color: 'Raw color "{{value}}" — use a design-system color token via var() (see DESIGN.md).',
      font: 'Font family "{{value}}" is not a token — use var(--font-*) (Figtree, Anton, Montserrat, Caveat, Permanent Marker, and the editorial stacks).',
      fontSize: 'Raw font size "{{value}}" — use a var(--size-*) token.',
      spacing: 'Raw spacing "{{value}}" — use a var(--space-*) token.',
      radius: 'Raw radius "{{value}}" — use a var(--radius-*) token, 50%, or an em-relative value.',
    },
  },
  create(context) {
    const options = { color: true, font: true, fontSize: true, spacing: true, radius: true, ...context.options[0] };
    const source = context.sourceCode;
    const report = (node, messageId, value) => context.report({ node, messageId, data: { value } });
    return {
      Declaration(node) {
        const property = node.property.toLowerCase();
        if (property.startsWith('--')) {
          const raw = source.getText(node.value);
          const named = namedColor(raw);
          if (options.color && RAW_COLOR.test(raw)) report(node, 'color', raw.match(RAW_COLOR)[0]);
          else if (options.color && named) report(node, 'color', named);
          return;
        }
        walk(node.value, value => {
          if (options.color && value.type === 'Hash') report(value, 'color', `#${value.value}`);
          else if (options.color && value.type === 'Function' && COLOR_FUNCTIONS.has(value.name.toLowerCase())) report(value, 'color', `${value.name}()`);
          else if (options.color && value.type === 'Identifier' && COLOR_PROPERTY.test(property) && NAMED_COLORS.has(value.name.toLowerCase())) report(value, 'color', value.name);
          else if (value.type === 'Dimension' && value.unit.toLowerCase() === 'px') {
            const text = `${value.value}px`;
            if (options.fontSize && (property === 'font-size' || property === 'font')) report(value, 'fontSize', text);
            else if (options.spacing && SPACING_PROPERTY.test(property)) report(value, 'spacing', text);
            else if (options.radius && RADIUS_PROPERTY.test(property)) report(value, 'radius', text);
          }
          if (options.font && (property === 'font-family' || property === 'font')) {
            if (value.type === 'String') report(value, 'font', value.value);
            else if (value.type === 'Identifier' && !(property === 'font' ? FONT_KEYWORDS : SYSTEM_FONT_VALUES).has(value.name.toLowerCase())) report(value, 'font', value.name);
          }
        });
      },
    };
  },
};

export default { meta: { name: 'editonny-design-system' }, rules: { tokens } };
