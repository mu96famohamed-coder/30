#!/usr/bin/env python3
"""
SEO sanity check for data/content.json.
Run from repo root: python3 scripts/validate-seo.py
Exits non-zero if any issue is found.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
content_path = ROOT / 'data' / 'content.json'

with content_path.open() as f:
    data = json.load(f)

pc = data['page_content']
new_pages = sorted(k for k in pc if not k.endswith('_old'))

issues = []

for path in new_pages:
    p = pc[path]
    h_en = p.get('h1_en', '')
    h_ar = p.get('h1_ar', '')
    t_en = p.get('title_en', '')
    t_ar = p.get('title_ar', '')
    m_en = p.get('meta_en', '')
    m_ar = p.get('meta_ar', '')

    # H1 — must contain Dubai/دبي or POA in 30 brand
    if 'Dubai' not in h_en and 'POA in 30' not in h_en:
        issues.append(f"{path}: h1_en missing Dubai/POA in 30 — {h_en!r}")
    if 'دبي' not in h_ar and 'POA in 30' not in h_ar:
        issues.append(f"{path}: h1_ar missing دبي/POA in 30 — {h_ar!r}")

    # H1 length
    if len(h_en) > 70:
        issues.append(f"{path}: h1_en too long ({len(h_en)} chars)")
    if len(h_ar) > 70:
        issues.append(f"{path}: h1_ar too long ({len(h_ar)} chars)")

    # Title length
    if len(t_en) > 60:
        issues.append(f"{path}: title_en too long ({len(t_en)} chars)")
    if len(t_ar) > 60:
        issues.append(f"{path}: title_ar too long ({len(t_ar)} chars)")
    if not t_en:
        issues.append(f"{path}: title_en empty")
    if not t_ar:
        issues.append(f"{path}: title_ar empty")

    # Brand in title
    if 'POA in 30' not in t_en:
        issues.append(f"{path}: title_en missing brand — {t_en!r}")

    # Meta length (Google truncates ~160; allow up to 165 to absorb shorter
    # Arabic equivalents and avoid forcing trims)
    if len(m_en) > 165:
        issues.append(f"{path}: meta_en too long ({len(m_en)} chars)")
    if len(m_ar) > 175:
        issues.append(f"{path}: meta_ar too long ({len(m_ar)} chars)")
    if len(m_en) < 100:
        issues.append(f"{path}: meta_en too short ({len(m_en)} chars)")
    if len(m_ar) < 80:
        issues.append(f"{path}: meta_ar too short ({len(m_ar)} chars)")

    # seo subkey mirror check
    seo = p.get('seo')
    if seo:
        if seo.get('h1', {}).get('en') != h_en:
            issues.append(f"{path}: seo.h1.en out of sync with h1_en")
        if seo.get('h1', {}).get('ar') != h_ar:
            issues.append(f"{path}: seo.h1.ar out of sync with h1_ar")
        if seo.get('meta_title', {}).get('en') != t_en:
            issues.append(f"{path}: seo.meta_title.en out of sync with title_en")
        if seo.get('meta_title', {}).get('ar') != t_ar:
            issues.append(f"{path}: seo.meta_title.ar out of sync with title_ar")

    # FAQ presence
    if not p.get('faq'):
        # Not a hard fail — some standalone pages legitimately have no FAQ
        pass

if issues:
    print(f"\n❌ {len(issues)} SEO issues found:\n")
    for i in issues:
        print(f"  - {i}")
    sys.exit(1)

print(f"\n✅ All {len(new_pages)} pages pass SEO sanity check.")
print(f"   - 0 H1s missing Dubai/brand")
print(f"   - 0 titles >60 chars")
print(f"   - 0 titles missing 'POA in 30'")
print(f"   - 0 meta descriptions outside 100-165 (EN) / 80-175 (AR)")
print(f"   - seo.h1.* and seo.meta_title.* mirror top-level fields")
sys.exit(0)
