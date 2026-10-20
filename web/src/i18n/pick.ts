type Tree = { [key: string]: string | Tree };

/** Copies the listed groups out of a message catalog; dotted paths such as `Home.bento` pick nested groups. */
export function pickMessages(messages: Tree, groups: string[]): Tree {
  const picked: Tree = {};
  for (const group of groups) {
    const keys = group.split('.');
    let source: string | Tree | undefined = messages;
    let target = picked;
    keys.forEach((key, i) => {
      source = typeof source === 'object' ? source[key] : undefined;
      if (source === undefined) throw new Error(`Unknown message group: ${group}`);
      if (i === keys.length - 1) target[key] = source;
      else target = (target[key] ??= {}) as Tree;
    });
  }
  return picked;
}
