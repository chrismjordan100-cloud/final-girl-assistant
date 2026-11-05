#!/usr/bin/env bash
# One-off setup for the How-to video builder: the offline British voice and
# its model files (about 350 MB, kept out of git in .cache/). Needs python3 + ffmpeg.
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$HERE/.cache"
pip install --break-system-packages -q kokoro-onnx soundfile pillow numpy 2>/dev/null || pip install -q kokoro-onnx soundfile pillow numpy
BASE=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
[ -s "$HERE/.cache/kokoro.onnx" ] || curl -sSL -o "$HERE/.cache/kokoro.onnx" "$BASE/kokoro-v1.0.onnx"
[ -s "$HERE/.cache/voices.bin" ]  || curl -sSL -o "$HERE/.cache/voices.bin"  "$BASE/voices-v1.0.bin"
command -v ffmpeg >/dev/null || { echo "ffmpeg is needed"; exit 1; }
echo "How-to video builder ready."
