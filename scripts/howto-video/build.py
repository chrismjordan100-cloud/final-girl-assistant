"""How-to-play video builder for the Final Girl Rule Assistant.

Every Killer / Location video is made by this one script so they all look and
sound the same. Usage (from the project root):

    bash scripts/howto-video/setup.sh            # once per machine/session
    python3 scripts/howto-video/build.py frames scripts/howto-video/films/volkar.py
    python3 scripts/howto-video/build.py video  scripts/howto-video/films/volkar.py

"frames" draws a still per scene into scripts/howto-video/.cache/<name>/ for
checking; "video" records the voice, renders, burns in subtitles and writes
src/assets/videos/S{season}-{type}-{shortName}-video.mp4 (+ a .srt next to the
film script). House style (do not change per video):
  * 1920x1080, 30 fps, H.264 CRF 20 + AAC; one still per scene, 0.35 s fades
  * British female voice: Kokoro "bf_emma", en-gb, speed 1.14
  * 0.3 s lead-in per scene, 0.22 s between lines, 0.3 s tail
  * Dark blurred jungle/location background, Oswald headings, Source Sans body
  * Subtitles: SubSans Bold 48px, white on a translucent black box, bottom
    centre, kept below all content (content stays above y=900)
  * Accent colour: killer red (214,40,40) / location green (60,170,80)
  * No length limit: rules are explained thoroughly; setup and tips stay brief
"""
import sys, os, subprocess, textwrap, runpy
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
CACHE = os.path.join(HERE, '.cache')
FONTS = os.path.join(HERE, 'fonts')
OSW = os.path.join(FONTS, 'Oswald.ttf')
SRC = os.path.join(FONTS, 'SourceSans3.ttf')
G = os.path.join(ROOT, 'src/assets/games') + '/'
W, H, FPS = 1920, 1080, 30
ACCENT = {'killer': (214, 40, 40), 'location': (60, 170, 80), 'finalgirl': (214, 90, 150)}  # finalgirl: Character Pack videos


def font(path, size, weight=700):
    f = ImageFont.truetype(path, size)
    f.set_variation_by_axes([weight])
    return f


def bg_image(path):
    im = Image.open(path).convert('RGB')
    r = max(W / im.width, H / im.height)
    im = im.resize((int(im.width * r) + 1, int(im.height * r) + 1), Image.LANCZOS)
    im = im.crop((0, 0, W, H)).filter(ImageFilter.GaussianBlur(6))
    return ImageEnhance.Brightness(im).enhance(0.32)


def pdf_page(path):
    """'.../FeatureFilmRules.pdf#12' -> a cached 250 dpi PNG of page 12."""
    pdf, page = path.rsplit('#', 1)
    os.makedirs(os.path.join(CACHE, 'pdf'), exist_ok=True)
    stem = os.path.join(CACHE, 'pdf', f'{os.path.basename(pdf)[:-4]}-{int(page)}')
    if not os.path.exists(stem + '.png'):
        subprocess.run(['pdftoppm', '-r', '250', '-png', '-singlefile', '-f', page, '-l', page, pdf, stem],
                       check=True, stderr=subprocess.DEVNULL)
    return stem + '.png'


def load(path, crop=None):
    """An image from the tracker. `path` may be a PNG/JPG, or a rulebook PDF
    page written 'file.pdf#N'. `crop` is a pixel box, or fractions of the
    image (all values <= 1) such as (0.05, 0.3, 0.5, 0.7)."""
    if '.pdf#' in path:
        path = pdf_page(path)
    im = Image.open(path).convert('RGBA')
    if crop and all(v <= 1 for v in crop):
        crop = (int(crop[0] * im.width), int(crop[1] * im.height), int(crop[2] * im.width), int(crop[3] * im.height))
    return im.crop(crop) if crop else im


def fit(im, bw, bh):
    r = min(bw / im.width, bh / im.height, 2.4)
    return im.resize((max(1, int(im.width * r)), max(1, int(im.height * r))), Image.LANCZOS)


def framed(canvas, im, x, y):
    sh = Image.new('RGBA', (im.width + 40, im.height + 40), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rectangle((20, 20, im.width + 20, im.height + 20), fill=(0, 0, 0, 200))
    canvas.alpha_composite(sh.filter(ImageFilter.GaussianBlur(12)), (x - 14, y - 6))
    ImageDraw.Draw(canvas).rectangle((x - 6, y - 6, x + im.width + 5, y + im.height + 5), fill=(245, 242, 235, 255))
    canvas.alpha_composite(im, (x, y))


def draw_scene(film, bg, i, sc, n):
    c = bg.copy().convert('RGBA')
    d = ImageDraw.Draw(c)
    acc = ACCENT[film['type']]
    hf = font(OSW, 30)
    d.text((80, 44), film['heading'], font=hf, fill=acc + (255,))
    d.text((80 + d.textlength(film['heading'], font=hf) + 20, 50), f"How to play — Final Girl: {film['film']}",
           font=font(SRC, 24, 400), fill=(210, 210, 210, 255))
    for k in range(n):
        x = W - 80 - (n - k) * 30
        d.rounded_rectangle((x, 56, x + 20, 64), 4, fill=acc + (255,) if k <= i else (90, 90, 90, 255))
    if sc.get('kind') == 'intro':
        path, crop = sc['images'][0]
        im = fit(load(path, crop), 900, 700)
        framed(c, im, W - 120 - im.width, 140 + (700 - im.height) // 2)
        fl = fit(load(film['flavour']), 760, 420)
        framed(c, fl, 90, 170)
        d.text((90, 170 + fl.height + 50), 'How to play', font=font(OSW, 86), fill=(255, 255, 255, 255))
        d.text((92, 170 + fl.height + 190), f"Final Girl  ·  Series {film['season']}  ·  {film['film']}",
               font=font(SRC, 32, 600), fill=acc + (255,))
        return c
    d.text((80, 120), sc['title'], font=font(OSW, 76), fill=(255, 255, 255, 255))
    d.rectangle((82, 222, 202, 230), fill=acc + (255,))
    y = 272
    bf = font(SRC, 38, 600)
    for b in sc.get('bullets', []):
        d.ellipse((86, y + 16, 102, y + 32), fill=acc + (255,))
        for ln in textwrap.wrap(b, 34):
            d.text((122, y), ln, font=bf, fill=(240, 240, 240, 255)); y += 50
        y += 18
    ix = 90
    for p in sc.get('icons', []):
        ic = fit(Image.open(p).convert('RGBA'), 110, 110)
        d.ellipse((ix - 8, y + 2, ix + 118, y + 128), fill=(245, 242, 235, 235))
        c.alpha_composite(ic, (ix + (110 - ic.width) // 2, y + 10 + (110 - ic.height) // 2))
        ix += 150
    imgs = sc['images']
    if len(imgs) == 1:
        im = fit(load(*imgs[0]), 940, 720)
        framed(c, im, 900 + (940 - im.width) // 2, 130 + (720 - im.height) // 2)
    else:
        A, B = load(*imgs[0]), load(*imgs[1])
        if B.width / B.height > 2:   # wide second image: stack under the first
            a, b = fit(A, 940, 500), fit(B, 940, 160)
            framed(c, a, 900 + (940 - a.width) // 2, 140)
            framed(c, b, 900 + (940 - b.width) // 2, 140 + a.height + 50)
        else:                         # side by side
            a, b = fit(A, 600, 720), fit(B, 300, 720)
            framed(c, a, 900, 130 + (720 - a.height) // 2)
            framed(c, b, 900 + a.width + 40, 130 + (720 - b.height) // 2)
    return c


import re
# The voice reads the full stop in "Mr." / "Dr." as the end of a sentence and
# pauses. Spell titles out in the SPOKEN text only; subtitles keep "Mr. Floppy".
TITLES = {'Mr': 'Mister', 'Mrs': 'Missus', 'Ms': 'Miz', 'Dr': 'Doctor', 'St': 'Saint', 'Prof': 'Professor'}


def speakable(text):
    return re.sub(r'\b(Mrs|Mr|Ms|Dr|St|Prof)\.(?=\s+[A-Z])', lambda m: TITLES[m.group(1)], text)


def ass_time(t):
    return f'{int(t // 3600)}:{int(t % 3600 // 60):02d}:{t % 60:05.2f}'


def srt_time(t):
    ms = int(round(t * 1000))
    return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}'


def split_cue(text, start, end, maxc=84):
    chunks, cur = [], ''
    for w in text.split():
        if len(cur) + len(w) + 1 > maxc and cur:
            chunks.append(cur); cur = w
        else:
            cur = (cur + ' ' + w).strip()
        if cur.endswith(('.', ':', ';', '?')) and len(cur) > 40:
            chunks.append(cur); cur = ''
    if cur: chunks.append(cur)
    tot = sum(len(c) for c in chunks); out = []; t = start
    for ch in chunks:
        dt = (end - start) * len(ch) / tot
        out.append((t, t + dt, ch)); t += dt
    return out


def main(mode, film_path):
    film = runpy.run_path(film_path)['FILM']
    film['heading'] = film.get('heading', film['name'].upper())
    out = os.path.join(CACHE, f"{film['type']}-{film['shortName']}"); os.makedirs(out, exist_ok=True)
    bg = bg_image(film['background'])
    n = len(film['scenes'])
    if mode == 'frames':
        for i, sc in enumerate(film['scenes']):
            draw_scene(film, bg, i, sc, n).convert('RGB').save(f'{out}/frame{i}.jpg', quality=90)
        print('frames in', out); return
    import soundfile as sf
    from kokoro_onnx import Kokoro
    k = Kokoro(os.path.join(CACHE, 'kokoro.onnx'), os.path.join(CACHE, 'voices.bin'))
    SR = 24000; audio = []; cues = []; t = 0.0; durs = []
    for i, sc in enumerate(film['scenes']):
        st = t
        audio.append(np.zeros(int(0.3 * SR), np.float32)); t += 0.3
        for sub, spoken in sc['lines']:
            a, sr = k.create(speakable(spoken or sub), voice='bf_emma', speed=1.14, lang='en-gb')
            dur = len(a) / SR
            cues += split_cue(sub, t, t + dur)
            audio.append(a.astype(np.float32)); t += dur
            audio.append(np.zeros(int(0.22 * SR), np.float32)); t += 0.22
        audio.append(np.zeros(int(0.3 * SR), np.float32)); t += 0.3
        d = round((t - st) * FPS) / FPS; pad = d - (t - st)
        if pad > 0: audio.append(np.zeros(int(pad * SR), np.float32))
        else: audio[-1] = audio[-1][:len(audio[-1]) + int(pad * SR)]
        t = st + d; durs.append(d)
        draw_scene(film, bg, i, sc, n).convert('RGB').save(f'{out}/s{i}.png')
    print(f'length {t:.1f}s')
    sf.write(f'{out}/voice.wav', np.concatenate(audio), SR)
    srt = os.path.splitext(film_path)[0] + '.srt'
    with open(srt, 'w') as f:
        for j, (a, b, tx) in enumerate(cues, 1):
            f.write(f'{j}\n{srt_time(a)} --> {srt_time(b)}\n{tx}\n\n')
    with open(f'{out}/subs.ass', 'w') as f:
        f.write('[Script Info]\nScriptType: v4.00+\nPlayResX: 1920\nPlayResY: 1080\nWrapStyle: 0\n\n[V4+ Styles]\n'
                'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n'
                'Style: Default,SubSans,48,&H00FFFFFF,&H00FFFFFF,&H00000000,&H90000000,1,0,0,0,100,100,0,0,3,14,0,2,160,160,46,1\n\n'
                '[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n')
        for a, b, tx in cues:
            f.write(f'Dialogue: 0,{ass_time(a)},{ass_time(b)},Default,,0,0,0,,{tx}\n')
    lst = []
    for i, d in enumerate(durs):
        tmp, fin = f'{out}/c{i}.tmp.mp4', f'{out}/c{i}.mp4'
        vf = f'format=yuv420p,loop=-1:1,trim=duration={d:.4f},fade=t=in:st=0:d=0.35,fade=t=out:st={d - 0.35:.4f}:d=0.35'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', '30', '-i', f'{out}/s{i}.png', '-vf', vf,
                        '-c:v', 'libx264', '-crf', '18', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', '30', tmp], check=True)
        os.rename(tmp, fin); lst.append(f"file '{fin}'")
    open(f'{out}/list.txt', 'w').write('\n'.join(lst))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', f'{out}/list.txt', '-c', 'copy', f'{out}/joined.mp4'], check=True)
    final = os.path.join(ROOT, 'src/assets/videos', f"S{film['season']}-{film['type']}-{film['shortName']}-video.mp4")
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{out}/joined.mp4', '-i', f'{out}/voice.wav',
                    '-vf', f'ass={out}/subs.ass:fontsdir={FONTS}', '-c:v', 'libx264', '-crf', '20', '-preset', 'veryfast',
                    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', final + '.tmp.mp4'], check=True)
    os.rename(final + '.tmp.mp4', final)
    print('wrote', final)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
