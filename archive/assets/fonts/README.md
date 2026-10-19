# Self-hosted fonts

The main pages load these files through `../../css/fonts.css` (relative to this directory). The loader pages load Eczar through their own stylesheet. The other font files were downloaded from the Google Fonts CSS API as WOFF2 subsets on 2026-10-18. Their Open Font License texts are stored here beside the files.

| Family | Files | CSS weight range | License |
| --- | --- | --- | --- |
| Inter | `inter-*.woff2` | 400–800 | `inter-OFL.txt` |
| JetBrains Mono | `jetbrains-mono-*.woff2` | 400–600 | `jetbrains-mono-OFL.txt` |
| Plus Jakarta Sans | `plus-jakarta-sans-*.woff2` | 700–800 | `plus-jakarta-sans-OFL.txt` |
| Caveat | `caveat-*.woff2` | 600 | `caveat-OFL.txt` |
| Eczar | `eczar-800-*` | 800 | `eczar-OFL.txt` |

The Google Fonts version of Plus Jakarta Sans does not provide weight 900. The existing 900-weight heading uses the closest available 800 face. Segoe UI and other system fallbacks are not redistributed.
