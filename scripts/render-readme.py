"""Render the original README motion cover with bundled fonts and Pillow.

Run: skills/editonny/engine/.venv/bin/python scripts/render-readme.py
The animation is editorial artwork, not a recording of the product UI.
"""
from pathlib import Path
import math
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/assets/readme'
FONT = ROOT / 'skills/editonny/engine/assets/fonts/figtree/Figtree-Variable.ttf'
W, H, FPS, SECONDS = 1200, 660, 15, 12
# The cover uses the existing DESIGN.md paper, ink, orange and sky palette.
PAPER, INK, AMBER, SKY = '#f4f3ed', '#17171b', '#e8a838', '#4dc3ff'
FONTS = {}


def font(size, bold=True):
    key = size, bold
    if key not in FONTS:
        face = ImageFont.truetype(str(FONT), size)
        face.set_variation_by_axes([800 if bold else 500])
        FONTS[key] = face
    return FONTS[key]


def text(draw, xy, value, size, color=INK, bold=True):
    draw.text(xy, value, font=font(size, bold), fill=color, anchor='lt')


def ease(value):
    value = max(0, min(1, value))
    return 1 - (1 - value) ** 3


def scene(index, age):
    im = Image.new('RGB', (W, H), AMBER if index == 1 else PAPER)
    d = ImageDraw.Draw(im)
    # A pair of crop corners becomes the brand's frame motif.
    d.line([(48, 76), (48, 38), (86, 38)], fill=INK, width=6)
    d.line([(91, 48), (91, 86), (53, 86)], fill=INK, width=6)
    text(d, (111, 43), 'fassa frame', 38)
    text(d, (810, 52), 'EDIÇÃO POR CONVERSA', 22, bold=False)
    d.line((48, 113, 1152, 113), fill=INK, width=1)
    label, lines, note = [
        ('01 / A IDEIA', ('Tem uma', 'história aí.'), 'Comece com o que você quer contar.'),
        ('02 / A EDIÇÃO', ('Dê ritmo.', 'Dê forma.'), 'Cortes, legendas e movimento.'),
        ('03 / O SEU OLHAR', ('Veja. Ajuste.', 'Faça seu.'), 'Você participa de cada versão.'),
    ][index]
    offset = int(28 * (1 - ease(age / .65)))
    text(d, (50, 153), label, 23, bold=False)
    for n, line in enumerate(lines):
        text(d, (45, 213 + n * 90 + offset), line, 79)
    text(d, (50, 428 + offset), note, 26, bold=False)
    # A moving poster inside a frame: original graphic artwork, no stock footage.
    art = Image.new('RGB', (438, 370), INK)
    a = ImageDraw.Draw(art)
    shift = int(28 * math.sin(age * 1.1 + index))
    a.ellipse((125 + shift, -115, 520 + shift, 280), fill=SKY)
    a.ellipse((-150, 160 + shift, 265, 575 + shift), fill=AMBER if index != 1 else PAPER)
    for n in range(5):
        x = 225 + n * 38 + int(10 * math.sin(age))
        a.line((x, 195, x + 125, 370), fill=PAPER, width=2)
    if index == 0:
        a.rectangle((18, 24, 365, 144), fill=INK)
        text(a, (26, 35), 'uma ideia', 46, PAPER)
        text(a, (26, 87), 'em movimento', 40, PAPER)
        a.polygon([(187, 190), (187, 264), (250, 227)], fill=PAPER)
    elif index == 1:
        # Words arrive on the beat, then remain long enough to read.
        a.rectangle((18, 24, 270, 181), fill=INK)
        text(a, (26, 35), 'MENOS', 65, PAPER)
        if age > .45:
            text(a, (26, 104), 'RUÍDO.', 65, PAPER)
        if age > .9:
            a.rectangle((21, 228, 414, 306), fill=INK)
            text(a, (33, 241), 'MAIS HISTÓRIA.', 44, PAPER)
    else:
        a.rounded_rectangle((23, 27, 414, 104), radius=12, fill=PAPER)
        text(a, (40, 49), '“Destaque a mensagem.”', 28)
        a.rectangle((16, 157, 426, 315), fill=INK)
        size = round(40 + 14 * ease((age - .5) / .8))
        text(a, (24, 172), 'SUA HISTÓRIA.', size, PAPER)
        text(a, (24, 239), 'SEU JEITO.', size, PAPER)
    im.paste(art, (704, 161))
    d = ImageDraw.Draw(im)
    for x, y, dx, dy in [(693,150,1,1),(1153,150,-1,1),(693,542,1,-1),(1153,542,-1,-1)]:
        d.line([(x, y + dy * 22), (x, y), (x + dx * 22, y)], fill=INK, width=3)
    # Timeline lends the piece a recognizable editing rhythm.
    text(d, (50, 553), 'DA INTENÇÃO AO VÍDEO', 20, bold=False)
    for n, word in enumerate(('CONTE', 'CONSTRUA', 'REFINE')):
        x = 50 + n * 369
        d.rounded_rectangle((x, 594, x + 355, 630), radius=5, fill=INK if index == n else '#e8ebdf')
        text(d, (x + 15, 603), word, 17, PAPER if index == n else INK)
    progress = (index * 4 + age) / SECONDS
    x = int(50 + 1093 * progress)
    d.line((x, 586, x, 637), fill=SKY, width=4)
    return im


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    frames = []
    for frame in range(FPS * SECONDS):
        t = frame / FPS
        index, age = int(t // 4), t % 4
        im = scene(index, age)
        # Short directional wipe, including the seam back to the opening.
        if age > 3.6:
            next_im = scene((index + 1) % 3, 0)
            edge = round(W * ease((age - 3.6) / .4))
            im.paste(next_im.crop((0, 0, edge, H)), (0, 0))
        frames.append(im)
    palette = frames[0].quantize(colors=128)
    indexed = [f.quantize(palette=palette, dither=Image.Dither.NONE) for f in frames]
    durations = [round((i + 1) * 100 / FPS) * 10 - round(i * 100 / FPS) * 10 for i in range(len(frames))]
    indexed[0].save(OUT / 'fassa-frame-motion.gif', save_all=True, append_images=indexed[1:],
                    duration=durations, loop=0, optimize=True, disposal=1)
    frames[20].save(OUT / 'fassa-frame-poster.png')
    contact = Image.new('RGB', (1200, 440))
    for n, moment in enumerate((1, 2.5, 5, 6.5, 9, 10.5)):
        contact.paste(frames[int(moment * FPS)].resize((400, 220)), ((n % 3) * 400, (n // 3) * 220))
    contact.save('/tmp/fassa-frame-motion-contact.png')
    with Image.open(OUT / 'fassa-frame-motion.gif') as gif:
        assert gif.size == (W, H) and gif.n_frames >= FPS * SECONDS - 3
        duration = 0
        for n in range(gif.n_frames):
            gif.seek(n)
            duration += gif.info['duration']
        assert duration == SECONDS * 1000
    print(f'Checked {len(frames)} frames, {SECONDS}s, {(OUT / "fassa-frame-motion.gif").stat().st_size:,} bytes')


if __name__ == '__main__':
    main()
