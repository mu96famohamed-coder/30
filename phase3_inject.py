#!/usr/bin/env python3
"""
POA in 30 — Phase 3: Enrich remaining 14 weak pages
Unique angle: speed (30 min), WhatsApp-first, no office visit
EN+AR only — no ru/zh/es
"""
import json, copy

with open("data/content.json", encoding="utf-8") as f:
    data = json.load(f)
pc = data["page_content"]

def ml(en, ar):
    return {"en": en, "ar": ar}

def ml_items(pairs):
    return [ml(e, a) for e, a in pairs]

def faq(q_en, q_ar, a_en, a_ar):
    return {"q": ml(q_en, q_ar), "a": ml(a_en, a_ar)}

# ═══════════════════════════════════════════════════════════════
# 1. / — Homepage
# Currently: 0 blocks, 5 FAQs
# Add rich blocks — POA types grid, process, trust signals, 5 more FAQs
# ═══════════════════════════════════════════════════════════════
home = pc["/"]

home["rich_blocks"] = [
    {
        "type": "para",
        "text": ml(
            "Every power of attorney we issue goes through Dubai Courts or the UAE Ministry of Justice "
            "via a video call — fully notarized, delivered by email, valid across all UAE authorities. "
            "No office visit. No travel. No waiting room. "
            "Send us a WhatsApp message with what you need. We draft, notarize, and deliver — "
            "in 30 minutes for standard POAs, same day for everything else.",
            "كل وكالة نُصدرها تمر عبر محاكم دبي أو وزارة العدل الإماراتية بمكالمة فيديو — "
            "موثَّقة بالكامل، تُسلَّم بالبريد الإلكتروني، صالحة لدى جميع الجهات الإماراتية. "
            "بدون زيارة مكتب. بدون سفر. بدون انتظار. "
            "أرسل لنا رسالة واتساب بما تحتاجه. نصيغ ونوثِّق ونسلِّم — "
            "في 30 دقيقة للوكالات القياسية، ونفس اليوم لكل شيء آخر."
        )
    },
    {
        "type": "checklist",
        "title": ml("Every POA Type. One Service.", "كل أنواع الوكالات. خدمة واحدة."),
        "items": ml_items([
            ("General POA — manage your UAE affairs while abroad: bank accounts, utilities, government dealings",
             "الوكالة العامة — إدارة شؤونك الإماراتية من الخارج: حسابات بنكية ومرافق ومعاملات حكومية"),
            ("Property Sale or Purchase POA — complete DLD transfers without attending the Trustee Office",
             "وكالة بيع أو شراء عقار — إتمام نقل ملكية الدائرة دون حضور مكتب الأمانة"),
            ("Vehicle Sale, Export, or Management POA — handle RTA in your name from anywhere",
             "وكالة مركبة بيعاً أو تصديراً أو إدارةً — التعامل مع الهيئة باسمك من أي مكان"),
            ("Court POA — authorize a legal representative before Dubai Courts, DIFC, or RDC",
             "وكالة قضائية — تفويض ممثل قانوني أمام محاكم دبي أو مركز دبي المالي أو مركز النزاعات"),
            ("MOHRE POA — handle work permits, WPS, and labour disputes at the Ministry",
             "وكالة وزارة الموارد البشرية — إتمام تصاريح العمل ونظام حماية الأجور والنزاعات العمالية"),
            ("Company POA — share transfers, MOA signings, corporate filings",
             "وكالة شركات — نقل الحصص وتوقيع عقد التأسيس والإيداعات التجارية"),
            ("POA Cancellation — revoke any active POA before it is misused",
             "إلغاء الوكالة — إلغاء أي وكالة نشطة قبل إساءة استخدامها"),
        ])
    },
    {
        "type": "steps",
        "items": [
            {
                "title": ml("WhatsApp us your requirement", "أرسل لنا متطلبك عبر واتساب"),
                "body": ml(
                    "Tell us what the POA needs to cover — the type, the agent's name, and the specific authority. "
                    "We respond in minutes, confirm the scope, and start drafting.",
                    "أخبرنا ما تحتاج الوكالة أن تشمله — النوع واسم الوكيل والصلاحية المحددة. "
                    "نرد في دقائق ونؤكد النطاق ونبدأ الصياغة."
                )
            },
            {
                "title": ml("Review your draft — live on WhatsApp", "راجع مسودتك — مباشرةً على واتساب"),
                "body": ml(
                    "We send the bilingual draft (Arabic + English) for your review before the notarization session. "
                    "Any changes are made instantly. You only proceed when you are satisfied.",
                    "نُرسل المسودة الثنائية اللغة (عربي + إنجليزي) لمراجعتك قبل جلسة التوثيق. "
                    "أي تعديلات تُنجَز فوراً. لا تمضي إلا حين تكون راضياً."
                )
            },
            {
                "title": ml("Video call — 30 minutes — document delivered", "مكالمة الفيديو — 30 دقيقة — الوثيقة تُسلَّم"),
                "body": ml(
                    "You appear before a licensed UAE Notary Public through Dubai Courts or the UAE Ministry of Justice "
                    "via a video call. Identity verified by passport + OTP. "
                    "The notarized POA arrives in your inbox immediately after the session.",
                    "تمثل أمام كاتب عدل إماراتي مرخَّص عبر محاكم دبي أو وزارة العدل الإماراتية "
                    "بمكالمة فيديو. تُتحقق الهوية بجواز السفر ورمز OTP. "
                    "تصل الوكالة الموثَّقة إلى صندوق بريدك فور انتهاء الجلسة."
                )
            }
        ]
    },
    {
        "type": "warning",
        "title": ml(
            "One Thing to Know About UAE POAs",
            "شيء واحد مهم تعرفه عن الوكالات الإماراتية"
        ),
        "text": ml(
            "A Power of Attorney is only as useful as it is specific. Vague language gets POAs rejected — "
            "at DLD, at RTA, at banks, and before courts. "
            "Every POA we draft names the exact authority, the exact asset (where required), "
            "and the exact scope — nothing more, nothing less. "
            "That specificity is why our POAs are accepted the first time.",
            "الوكالة القانونية لا تكون مفيدة إلا بقدر ما تكون محددة. الصياغة المبهمة تُفضي لرفض الوكالات — "
            "في دائرة الأراضي وفي الهيئة وفي البنوك وأمام المحاكم. "
            "كل وكالة نصيغها تُسمِّي الصلاحية بالضبط والأصل المحدد (حيثما يُشترط) "
            "والنطاق الدقيق — لا أكثر ولا أقل. "
            "هذا التحديد هو السبب في قبول وكالاتنا من أول مرة."
        )
    },
    {
        "type": "info",
        "title": ml("Notarization happens through official UAE channels — only", "التوثيق عبر القنوات الإماراتية الرسمية — فقط"),
        "text": ml(
            "Every POA we facilitate is notarized through Dubai Courts or the UAE Ministry of Justice "
            "via a video call — not through private or unlicensed channels. "
            "The notarized document carries the official seal of the UAE notary registry "
            "and is electronically verifiable by any authority in the UAE.",
            "كل وكالة نُيسِّرها موثَّقة عبر محاكم دبي أو وزارة العدل الإماراتية "
            "بمكالمة فيديو — وليس عبر قنوات خاصة أو غير مرخَّصة. "
            "تحمل الوثيقة الموثَّقة الختم الرسمي لسجل كتابة العدل الإماراتي "
            "وهي قابلة للتحقق إلكترونياً من أي جهة في الإمارات."
        )
    }
]

home["faq"].extend([
    faq(
        "How quickly can I get a notarized POA?",
        "كم يستغرق الحصول على وكالة موثَّقة؟",
        "For standard POAs (General, Special, Property, Vehicle): 30 minutes from the moment you send us "
        "the details on WhatsApp to the moment the notarized document arrives in your email. "
        "For complex POAs requiring custom drafting (corporate, multi-party, court): same day — "
        "typically 2–4 hours. "
        "For urgent or out-of-hours requests: contact us directly on WhatsApp and we confirm availability.",
        "للوكالات القياسية (العامة والخاصة والعقارية والمركبات): 30 دقيقة من اللحظة التي ترسل فيها "
        "التفاصيل عبر واتساب حتى وصول الوثيقة الموثَّقة لبريدك الإلكتروني. "
        "للوكالات المعقدة التي تستلزم صياغة مخصصة (الشركات وتعدد الأطراف والمحاكم): نفس اليوم — "
        "عادةً ٢-٤ ساعات. "
        "للطلبات العاجلة أو خارج أوقات العمل: تواصل معنا مباشرةً على واتساب ونؤكد التوفر."
    ),
    faq(
        "Why do you use WhatsApp instead of a form or a booking system?",
        "لماذا تستخدمون واتساب بدلاً من نموذج أو نظام حجز؟",
        "Because no two POAs are identical. A form cannot capture the nuance of your specific situation — "
        "the exact scope of authority, the right legal terminology for your case, "
        "whether a General or Special POA applies, which authority will receive it. "
        "A direct conversation on WhatsApp takes 5 minutes and produces a POA "
        "that works the first time. A form takes longer and often produces something "
        "that gets rejected.",
        "لأنه لا توجد وكالتان متطابقتان. لا يستطيع أي نموذج استيعاب دقائق وضعك المحدد — "
        "النطاق الدقيق للصلاحية والمصطلحات القانونية الصحيحة لقضيتك "
        "وما إذا كانت وكالة عامة أم خاصة هي المناسبة وأي جهة ستستقبلها. "
        "محادثة مباشرة على واتساب تستغرق 5 دقائق وتُنتج وكالة "
        "تُقبَل من أول مرة. نموذج يستغرق أطول وكثيراً ما يُنتج شيئاً "
        "يُرفض."
    ),
    faq(
        "Is a UAE video-call POA legally the same as one signed in person?",
        "هل الوكالة الإماراتية عبر مكالمة الفيديو قانونياً مماثلة للموقَّعة شخصياً؟",
        "Yes. The UAE's e-notarization system (through Dubai Courts and the UAE Ministry of Justice) "
        "was introduced and regulated under UAE law — video-call notarized documents carry "
        "exactly the same legal weight as in-person notarized ones. "
        "The notarized document is entered into the official UAE notary registry "
        "and is electronically verifiable by any UAE authority. "
        "DLD, RTA, banks, courts, MOHRE — all accept e-notarized documents.",
        "نعم. نظام التوثيق الإلكتروني الإماراتي (عبر محاكم دبي ووزارة العدل الإماراتية) "
        "أُدخل وخُضع للتنظيم بموجب القانون الإماراتي — الوثائق الموثَّقة بمكالمة الفيديو "
        "تحمل نفس الثقل القانوني بالضبط للوثائق الموثَّقة شخصياً. "
        "تُدخَل الوثيقة الموثَّقة في سجل كتابة العدل الرسمي الإماراتي "
        "وهي قابلة للتحقق إلكترونياً من أي جهة إماراتية. "
        "الدائرة والهيئة والبنوك والمحاكم والوزارة — جميعها تقبل الوثائق الموثَّقة إلكترونياً."
    ),
])

print(f"Homepage: {len(home['rich_blocks'])} blocks, {len(home['faq'])} FAQs")


# ═══════════════════════════════════════════════════════════════
# 2. /e-notary
# Currently: 3 blocks (info + heading + checklist) + 3 FAQs — thin
# Fix: QR code mention is in existing content — needs fixing
# Add: process steps, how it works, acceptance, 4 more FAQs
# ═══════════════════════════════════════════════════════════════
enotary = pc["/e-notary"]

# Fix existing info block — QR code mention
for rb in enotary["rich_blocks"]:
    if rb.get("type") == "info":
        en = rb["text"]["en"]
        ar = rb["text"]["ar"]
        if "QR" in en:
            rb["text"]["en"] = en.replace(
                "secure QR code",
                "electronic verification code"
            ).replace("verification QR on every document", "electronic verification on every document")
        if "QR" in ar:
            rb["text"]["ar"] = ar.replace("رمز QR", "رمز التحقق الإلكتروني")

# Add blocks
enotary["rich_blocks"].extend([
    {
        "type": "compare",
        "left": {
            "title": ml("E-Notary (Video Call)", "التوثيق الإلكتروني (مكالمة الفيديو)"),
            "items": ml_items([
                ("No office visit — done from your home, office, or anywhere with internet",
                 "بدون زيارة مكتب — من منزلك أو مكتبك أو أي مكان بإنترنت"),
                ("30 minutes total — drafting, session, delivery",
                 "٣٠ دقيقة إجمالاً — صياغة وجلسة وتسليم"),
                ("Notarized by a licensed UAE Notary Public — full legal validity",
                 "موثَّق من كاتب عدل إماراتي مرخَّص — صلاحية قانونية كاملة"),
                ("Document delivered by email immediately after the session",
                 "تُسلَّم الوثيقة بالبريد الإلكتروني فور انتهاء الجلسة"),
                ("Accepted by DLD, RTA, courts, MOHRE, banks, and all UAE authorities",
                 "مقبول من الدائرة والهيئة والمحاكم والوزارة والبنوك وجميع الجهات الإماراتية"),
            ])
        },
        "right": {
            "title": ml("In-Person Notary", "التوثيق الشخصي"),
            "items": ml_items([
                ("Requires visiting a notary office — appointment, travel, waiting",
                 "يستلزم زيارة مكتب كتابة العدل — حجز وتنقل وانتظار"),
                ("Typically half a day or more from start to finish",
                 "عادةً نصف يوم أو أكثر من البداية إلى النهاية"),
                ("Same legal validity as e-notarization — both are official UAE notarization",
                 "نفس الصلاحية القانونية للتوثيق الإلكتروني — كلاهما توثيق إماراتي رسمي"),
                ("Physical document — must be collected or couriered",
                 "وثيقة ورقية — تستلزم الاستلام أو الشحن"),
                ("Suitable if you prefer in-person or for complex multi-party signings",
                 "مناسب إذا كنت تفضل الحضور الشخصي أو للتوقيعات المعقدة متعددة الأطراف"),
            ])
        }
    },
    {
        "type": "steps",
        "items": [
            {
                "title": ml("Send us the document or describe what you need", "أرسل لنا الوثيقة أو صف ما تحتاجه"),
                "body": ml(
                    "WhatsApp us the document (if already drafted) or describe what the POA needs to cover. "
                    "We confirm scope, prepare the bilingual draft, and send it for your review.",
                    "أرسل لنا الوثيقة عبر واتساب (إذا كانت مصاغة بالفعل) أو صف ما تحتاج الوكالة أن تشمله. "
                    "نؤكد النطاق ونُعدّ المسودة الثنائية ونرسلها لمراجعتك."
                )
            },
            {
                "title": ml("We book your notarization slot", "نحجز موعد توثيقك"),
                "body": ml(
                    "Once you approve the draft, we book you directly into the Dubai Courts or UAE Ministry of "
                    "Justice e-notarization system and send you the meeting link.",
                    "بعد موافقتك على المسودة، نحجز لك مباشرةً في نظام التوثيق الإلكتروني لمحاكم دبي "
                    "أو وزارة العدل ونرسل لك رابط الاجتماع."
                )
            },
            {
                "title": ml("Video call — 15–30 minutes — document in your inbox", "مكالمة الفيديو — ١٥-٣٠ دقيقة — الوثيقة في بريدك"),
                "body": ml(
                    "You appear before the notary via video call. Identity verified by passport + OTP. "
                    "The notarized document is emailed to you immediately — ready to use.",
                    "تمثل أمام كاتب العدل عبر مكالمة الفيديو. تُتحقق الهوية بجواز السفر ورمز OTP. "
                    "تُرسَل الوثيقة الموثَّقة بالبريد الإلكتروني فوراً — جاهزة للاستخدام."
                )
            }
        ]
    },
    {
        "type": "checklist",
        "title": ml(
            "What You Need for the Video Call Session",
            "ما تحتاجه لجلسة مكالمة الفيديو"
        ),
        "items": ml_items([
            ("Valid Emirates ID or passport — original, not a copy — to show to the camera",
             "بطاقة هوية إماراتية أو جواز سفر ساري — الأصل لا نسخة — لعرضه أمام الكاميرا"),
            ("Smartphone, tablet, or laptop with a working camera and microphone",
             "هاتف ذكي أو جهاز لوحي أو حاسوب محمول بكاميرا وميكروفون يعملان"),
            ("Stable internet connection — 4G or Wi-Fi both work",
             "اتصال إنترنت مستقر — الجيل الرابع أو واي-فاي كلاهما مناسب"),
            ("Active mobile number for the OTP verification message",
             "رقم هاتف نشط لاستلام رسالة التحقق بالرمز"),
            ("15–30 minutes of uninterrupted availability",
             "١٥-٣٠ دقيقة من التوفر دون انقطاع"),
        ])
    }
])

enotary["faq"].extend([
    faq(
        "Does the e-notarized document look different from a physically stamped one?",
        "هل تبدو الوثيقة الموثَّقة إلكترونياً مختلفة عن المختومة ورقياً؟",
        "Yes — instead of a wet-ink stamp, the document carries the official electronic seal of Dubai Courts "
        "and an electronic verification code. Both formats are legally identical. "
        "Receiving institutions (banks, DLD, courts) scan or verify the code against "
        "the official UAE notary registry — the verification is instant and accepted.",
        "نعم — بدلاً من الختم الحبري، تحمل الوثيقة الختم الإلكتروني الرسمي لمحاكم دبي "
        "ورمز التحقق الإلكتروني. كلا الشكلين متطابقان قانونياً. "
        "تُفحص الجهات المستقبِلة (البنوك والدائرة والمحاكم) الرمز أو تتحقق منه بمقارنته "
        "بسجل كتابة العدل الرسمي — التحقق فوري ومقبول."
    ),
    faq(
        "Can the e-notarization be done outside UAE business hours?",
        "هل يمكن إجراء التوثيق الإلكتروني خارج أوقات العمل الإماراتية؟",
        "The Dubai Courts and UAE Ministry of Justice e-notarization systems operate during "
        "official working hours (Sunday to Thursday, 8am–3pm for courts; extended hours for MOJ). "
        "We coordinate bookings in advance and can often schedule early-morning or end-of-day slots. "
        "For urgent out-of-hours needs: WhatsApp us and we advise on the earliest available option.",
        "تعمل أنظمة التوثيق الإلكتروني لمحاكم دبي ووزارة العدل الإماراتية خلال "
        "أوقات العمل الرسمية (الأحد إلى الخميس، ٨ص-٣م للمحاكم؛ ساعات ممتدة للوزارة). "
        "ننسق الحجوزات مسبقاً ويمكننا في أغلب الأحيان تحديد مواعيد صباح الباكر أو نهاية اليوم. "
        "للاحتياجات العاجلة خارج أوقات العمل: راسلنا على واتساب ونرشدك للأوقات المتاحة في أقرب وقت."
    ),
])

print(f"E-Notary: {len(enotary['rich_blocks'])} blocks, {len(enotary['faq'])} FAQs")


# ═══════════════════════════════════════════════════════════════
# 3. /why-poa-rejected-dubai — enrich with 8 rejection reasons
# ═══════════════════════════════════════════════════════════════
rejected = pc["/why-poa-rejected-dubai"]

# Insert rejection reasons block after existing info block
rejected["rich_blocks"].insert(1, {
    "type": "checklist",
    "title": ml(
        "8 Reasons UAE Authorities Reject a Power of Attorney",
        "٨ أسباب لرفض الجهات الإماراتية للوكالة القانونية"
    ),
    "items": ml_items([
        ("Missing identifier — DLD requires the Title Deed number; RTA requires chassis AND plate number. "
         "'My property' or 'my car' is insufficient.",
         "معرِّف مفقود — تشترط دائرة الأراضي رقم سند الملكية؛ وتشترط الهيئة رقم الهيكل ورقم اللوحة. "
         "عبارة 'عقاري' أو 'سيارتي' غير كافية."),
        ("Wrong or missing authority word — 'manage' is not the same as 'sell'. "
         "DLD will reject a sale transaction if the word 'sell' (بيع) does not appear explicitly.",
         "كلمة الصلاحية خاطئة أو مفقودة — 'إدارة' ليست مرادفاً لـ'بيع'. "
         "ستُرفض معاملة البيع في الدائرة إذا لم تظهر كلمة 'بيع' صراحةً."),
        ("Expired POA — banks apply their own internal thresholds (some reject POAs over 6 months old). "
         "DLD may reject foreign POAs older than 2 years (Circular 29/R/2025).",
         "وكالة منتهية الصلاحية — تُطبِّق البنوك حدودها الداخلية (بعضها يرفض الوكالات الأكبر من ٦ أشهر). "
         "قد ترفض الدائرة الوكالات الأجنبية الأكبر من سنتين (التعميم 29/R/2025)."),
        ("Agent details don't match — the agent's name, nationality, or ID number in the POA "
         "must match their documents exactly. Any discrepancy triggers rejection.",
         "بيانات الوكيل غير متطابقة — يجب أن يتطابق اسم الوكيل وجنسيته ورقم هويته في الوكالة "
         "مع وثائقه بالضبط. أي تباين يُفضي للرفض."),
        ("Language issue — UAE mainland authorities require Arabic (or bilingual with Arabic prevailing). "
         "An English-only POA is rejected by DLD, banks, and MOHRE.",
         "مشكلة اللغة — تشترط جهات البر الرئيسي الإماراتي العربية (أو ثنائية اللغة مع سيادة العربية). "
         "وكالة بالإنجليزية فقط تُرفض من الدائرة والبنوك والوزارة."),
        ("Missing notarization — an unnotarized POA (even if correctly drafted) carries no legal weight "
         "before any UAE authority. Notarization is mandatory.",
         "غياب التوثيق — الوكالة غير الموثَّقة (حتى لو صيغت بشكل صحيح) لا قيمة قانونية لها "
         "أمام أي جهة إماراتية. التوثيق إلزامي."),
        ("Foreign POA without attestation chain — a POA issued outside the UAE must complete "
         "the full attestation chain (local MoFA → UAE Embassy → UAE MoFA) to be accepted.",
         "وكالة أجنبية بدون سلسلة تصديق — الوكالة الصادرة خارج الإمارات يجب أن تستكمل "
         "سلسلة التصديق الكاملة (وزارة خارجية محلية ← سفارة الإمارات ← وزارة الخارجية الإماراتية) لتُقبَل."),
        ("Scope too broad or too vague — 'handle all my affairs' without specifying the authority "
         "is rejected by institutions that need named, specific powers.",
         "النطاق واسع أو مبهم جداً — 'التعامل مع جميع شؤوني' دون تحديد الصلاحية "
         "تُرفض من الجهات التي تشترط صلاحيات محددة مسمَّاة."),
    ])
})

rejected["rich_blocks"].insert(2, {
    "type": "info",
    "title": ml(
        "Most Rejections Are Fixed the Same Day",
        "معظم حالات الرفض تُصلَّح في نفس اليوم"
    ),
    "text": ml(
        "A returned POA is not a failed transaction — it is a procedural correction. "
        "Once we know the exact rejection reason (send us the rejection note), "
        "we identify whether the fix requires a supplementary amendment or a full redraft. "
        "Most standard POA corrections are completed and re-notarized within hours. "
        "Send us the returned POA and the rejection note on WhatsApp.",
        "الوكالة المُعادَة ليست معاملة فاشلة — بل هي تصحيح إجرائي. "
        "بمجرد معرفة سبب الرفض بالضبط (أرسل لنا مذكرة الرفض)، "
        "نحدد ما إذا كان الإصلاح يستلزم تعديلاً تكميلياً أو إعادة صياغة كاملة. "
        "معظم تصحيحات الوكالات القياسية تُنجَز وتُوثَّق مجدداً في غضون ساعات. "
        "أرسل لنا الوكالة المُعادَة ومذكرة الرفض عبر واتساب."
    )
})

rejected["faq"].extend([
    faq(
        "Can a rejected POA be amended, or must it be redrafted from scratch?",
        "هل يمكن تعديل وكالة مرفوضة أم يجب إعادة صياغتها من الصفر؟",
        "A notarized document cannot be directly amended — its contents are legally locked from the "
        "date of notarization. "
        "The correct approach depends on the rejection type: "
        "for minor procedural issues (missing identifier, scope addition), a supplementary amendment "
        "addendum is notarized alongside the original POA — this is faster and cheaper than a full redraft. "
        "For fundamental issues (wrong agent, wrong language, wrong authority type), "
        "a full new POA must be drafted and notarized. "
        "Send us the rejection note and we advise which applies.",
        "لا يمكن تعديل وثيقة موثَّقة مباشرةً — محتواها مُقفَل قانونياً من تاريخ التوثيق. "
        "النهج الصحيح يعتمد على نوع الرفض: "
        "للمشكلات الإجرائية البسيطة (معرِّف مفقود أو إضافة نطاق)، يُوثَّق ملحق تعديل تكميلي "
        "جانباً للوكالة الأصلية — هذا أسرع وأقل تكلفةً من إعادة الصياغة الكاملة. "
        "للمشكلات الجوهرية (وكيل خاطئ أو لغة خاطئة أو نوع صلاحية خاطئ)، "
        "يجب صياغة وكالة جديدة كاملة وتوثيقها. "
        "أرسل لنا مذكرة الرفض ونرشدك للخيار المناسب."
    ),
    faq(
        "Why do some banks reject notarized POAs that DLD or RTA have accepted?",
        "لماذا تُرفض وكالات موثَّقة قبلتها الدائرة أو الهيئة في بعض البنوك؟",
        "Banks apply their own internal compliance requirements on top of UAE law requirements. "
        "Common bank-specific rejection reasons: the POA is older than the bank's internal threshold "
        "(some banks reject POAs over 3–6 months old); the POA does not name the specific bank or account; "
        "the language is not precise enough for the bank's legal team; "
        "or the agent did not bring the original notarized document (banks typically reject copies). "
        "Best practice: always call the specific bank before relying on a POA for a banking transaction "
        "to confirm their exact requirements.",
        "تُطبِّق البنوك متطلبات الامتثال الداخلية الخاصة بها فوق متطلبات القانون الإماراتي. "
        "أسباب الرفض الخاصة بالبنوك الشائعة: الوكالة أقدم من الحد الداخلي للبنك "
        "(بعض البنوك ترفض الوكالات الأكبر من ٣-٦ أشهر)؛ الوكالة لا تُسمِّي البنك أو الحساب المحدد؛ "
        "اللغة غير دقيقة بما يكفي للفريق القانوني بالبنك؛ "
        "أو الوكيل لم يحضر الوثيقة الموثَّقة الأصلية (ترفض البنوك عموماً النسخ). "
        "أفضل الممارسات: اتصل دائماً بالبنك المحدد قبل الاعتماد على وكالة لمعاملة بنكية "
        "لتأكيد متطلباته بالضبط."
    ),
])

print(f"Why Rejected: {len(rejected['rich_blocks'])} blocks, {len(rejected['faq'])} FAQs")


# ═══════════════════════════════════════════════════════════════
# 4. /document-rejection — enrich
# ═══════════════════════════════════════════════════════════════
doc_rej = pc["/document-rejection"]

doc_rej["rich_blocks"].insert(1, {
    "type": "checklist",
    "title": ml(
        "Most Common Document Return Reasons in Dubai",
        "أكثر أسباب إعادة الوثائق شيوعاً في دبي"
    ),
    "items": ml_items([
        ("Scope mismatch — the authority granted does not match the transaction being attempted",
         "عدم تطابق النطاق — الصلاحية الممنوحة لا تتطابق مع المعاملة المقصودة"),
        ("Missing specific identifier — property, vehicle, or account not named precisely",
         "معرِّف محدد مفقود — العقار أو المركبة أو الحساب غير مُسمَّى بدقة"),
        ("Expired document — past the receiving institution's internal acceptance window",
         "وثيقة منتهية الصلاحية — تجاوزت نافذة القبول الداخلية للجهة المستقبِلة"),
        ("Language or format requirement — wrong language, missing bilingual version, or wrong template",
         "اشتراط اللغة أو الصيغة — لغة خاطئة أو نسخة ثنائية اللغة مفقودة أو نموذج غير صحيح"),
        ("Agent identity mismatch — name, ID, or nationality discrepancy",
         "تباين هوية الوكيل — تناقض في الاسم أو الهوية أو الجنسية"),
        ("Missing supporting document — power of attorney missing alongside another required instrument",
         "وثيقة مكملة مفقودة — وكالة مفقودة إلى جانب وثيقة أخرى مطلوبة"),
    ])
})

doc_rej["rich_blocks"].insert(3, {
    "type": "steps",
    "items": [
        {
            "title": ml("Send us the document + the return note", "أرسل لنا الوثيقة + مذكرة الإعادة"),
            "body": ml(
                "WhatsApp us a photo of the returned document and the rejection/return note. "
                "We diagnose the exact issue within minutes.",
                "أرسل لنا صورة الوثيقة المُعادَة ومذكرة الرفض/الإعادة عبر واتساب. "
                "نُشخِّص المشكلة بالضبط في دقائق."
            )
        },
        {
            "title": ml("We confirm: amendment or full redraft", "نؤكد: تعديل أم إعادة صياغة كاملة"),
            "body": ml(
                "Minor procedural issue: supplementary amendment + notarization — hours, not days. "
                "Fundamental issue: full new document drafted and notarized — same day.",
                "مشكلة إجرائية بسيطة: تعديل تكميلي + توثيق — ساعات لا أيام. "
                "مشكلة جوهرية: وثيقة جديدة كاملة تُصاغ وتُوثَّق — نفس اليوم."
            )
        },
        {
            "title": ml("Corrected document — same day", "الوثيقة المصحَّحة — نفس اليوم"),
            "body": ml(
                "Once you approve the corrected draft, we book the notarization slot and "
                "deliver the corrected notarized document to your inbox.",
                "بعد موافقتك على المسودة المصحَّحة، نحجز موعد التوثيق "
                "ونُسلِّم الوثيقة الموثَّقة المصحَّحة لبريدك الإلكتروني."
            )
        }
    ]
})

print(f"Document Rejection: {len(doc_rej['rich_blocks'])} blocks, {len(doc_rej['faq'])} FAQs")


# ═══════════════════════════════════════════════════════════════
# 5. /what-is-tableegh — enrich
# ═══════════════════════════════════════════════════════════════
tableegh = pc["/what-is-tableegh"]

tableegh["rich_blocks"].insert(1, {
    "type": "checklist",
    "title": ml(
        "Why Tableegh Matters — What It Produces",
        "لماذا التبليغ مهم — ما الذي يُنتجه"
    ),
    "items": ml_items([
        ("Court-admissible proof of delivery — the document that starts the legal clock for "
         "eviction notices, debt demands, and contract terminations",
         "إثبات تسليم مقبول أمام المحكمة — الوثيقة التي تُبدأ العدّاد القانوني "
         "لإشعارات الإخلاء ومطالبات الديون وإنهاء العقود"),
        ("Refusal-proof — if the recipient refuses to sign, the officer logs and certifies the refusal. "
         "The legal notice is still considered served.",
         "مقاوم للرفض — إذا رفض المستلم التوقيع، يُسجِّل الموظف الرفض ويُصادق عليه. "
         "يُعدّ الإشعار القانوني مُسلَّماً على أي حال."),
        ("Absence-proof — if the recipient is absent, officers attempt multiple times and "
         "the delivery is logged as attempted with certified timestamp",
         "مقاوم للغياب — إذا كان المستلم غائباً، يُحاول الموظفون مرات متعددة "
         "وتُسجَّل المحاولة بطابع زمني مصادَق عليه"),
        ("Required before RDC filing — the Rental Disputes Settlement Centre will not accept "
         "an eviction or payment case without proof of a Tableegh-served notice first",
         "مطلوب قبل الإيداع في مركز تسوية النزاعات الإيجارية — لن يقبل المركز "
         "قضية إخلاء أو دفع بدون إثبات إشعار مُسلَّم عبر التبليغ أولاً"),
        ("Starts grace periods — the notice period (7, 14, 30 days) legally begins from "
         "the Tableegh delivery date, not from when you drafted the notice",
         "يُبدأ فترات السماح — تبدأ فترة الإشعار (٧ أو ١٤ أو ٣٠ يوماً) قانونياً من "
         "تاريخ التسليم عبر التبليغ لا من تاريخ صياغة الإشعار"),
    ])
})

tableegh["rich_blocks"].insert(2, {
    "type": "warning",
    "title": ml(
        "WhatsApp, Email, and SMS Are Not Valid Notice Delivery",
        "واتساب والبريد الإلكتروني والرسائل ليست وسائل تسليم إشعار صالحة"
    ),
    "text": ml(
        "UAE courts do not accept WhatsApp messages, emails, or SMS as proof of legal notice delivery "
        "for eviction proceedings, debt recovery, or contract termination. "
        "These channels may serve as supporting evidence for the existence of a dispute — "
        "but they do not start the legal clock and they cannot replace a Tableegh-served notice. "
        "Using WhatsApp to 'notify' a tenant or debtor and then filing at RDC or court "
        "will result in case rejection at the first stage.",
        "لا تقبل المحاكم الإماراتية رسائل واتساب أو البريد الإلكتروني أو الرسائل النصية "
        "كإثبات تسليم إشعار قانوني لإجراءات الإخلاء أو استرداد الديون أو إنهاء العقود. "
        "قد تُشكِّل هذه القنوات أدلة داعمة على وجود نزاع — "
        "لكنها لا تُبدأ العدّاد القانوني ولا تُعوِّض عن إشعار مُسلَّم عبر التبليغ. "
        "استخدام واتساب لـ'إخطار' مستأجر أو مدين ثم الإيداع في المركز أو المحكمة "
        "سيُفضي إلى رفض القضية في المرحلة الأولى."
    )
})

print(f"What is Tableegh: {len(tableegh['rich_blocks'])} blocks, {len(tableegh['faq'])} FAQs")


# ═══════════════════════════════════════════════════════════════
# 6. /rdc-support — enrich
# ═══════════════════════════════════════════════════════════════
rdc = pc["/rdc-support"]

rdc["rich_blocks"].insert(1, {
    "type": "steps",
    "items": [
        {
            "title": ml("Step 1 — Notarized notice via Tableegh (mandatory first step)",
                        "الخطوة ١ — إشعار موثَّق عبر التبليغ (خطوة أولى إلزامية)"),
            "body": ml(
                "Before any RDC filing, the other party must receive a formally notarized legal notice "
                "delivered through Dubai Courts' Tableegh service. "
                "We draft, notarize, and coordinate Tableegh delivery as one step.",
                "قبل أي إيداع في المركز، يجب أن يتلقى الطرف الآخر إشعاراً قانونياً موثَّقاً رسمياً "
                "مُسلَّماً عبر خدمة التبليغ لمحاكم دبي. "
                "نصيغ ونوثِّق وننسِّق التسليم عبر التبليغ كخطوة واحدة."
            )
        },
        {
            "title": ml("Step 2 — RDC case filing", "الخطوة ٢ — إيداع القضية في المركز"),
            "body": ml(
                "Once the notice period expires without resolution, we file the RDC case with the full file: "
                "Ejari contract, Tableegh delivery proof, payment records, and supporting correspondence.",
                "بعد انتهاء مهلة الإشعار بدون تسوية، نُودع قضية المركز بالملف الكامل: "
                "عقد إيجاري وإثبات التسليم عبر التبليغ وسجلات الدفع والمراسلات الداعمة."
            )
        },
        {
            "title": ml("Step 3 — Mediation and hearing (we represent you)",
                        "الخطوة ٣ — الوساطة والجلسة (نمثلك)"),
            "body": ml(
                "The RDC schedules a mediation session first. Most disputes resolve here. "
                "If not resolved, the case escalates to a judge. "
                "We attend on your behalf via an authorized representative under a court POA — "
                "you do not need to appear in person.",
                "يحدد المركز جلسة وساطة أولاً. تُسوَّى معظم النزاعات هنا. "
                "إذا لم تُسوَّ، تصعد القضية لقاضٍ. "
                "نحضر نيابةً عنك عبر ممثل مفوَّض بموجب وكالة محكمة — "
                "لا تحتاج للحضور شخصياً."
            )
        },
    ]
})

rdc["rich_blocks"].insert(3, {
    "type": "info",
    "title": ml("What the RDC Handles", "ما يتولاه مركز تسوية النزاعات الإيجارية"),
    "text": ml(
        "The RDC (Rental Disputes Settlement Centre) is the dedicated Dubai court for landlord-tenant disputes. "
        "Cases handled: eviction disputes; non-payment of rent; deposit return; unlawful eviction; "
        "maintenance obligations; rent increase disputes (RERA Smart Rental Index violations); "
        "breach of tenancy contract. "
        "The RDC is a faster and cheaper alternative to the main Dubai Courts for tenancy matters — "
        "most cases resolve within 1–2 months.",
        "مركز تسوية النزاعات الإيجارية هو محكمة دبي المخصصة لنزاعات الملاك والمستأجرين. "
        "القضايا التي يتولاها: نزاعات الإخلاء وعدم سداد الإيجار واسترداد التأمين والإخلاء غير القانوني "
        "والتزامات الصيانة ونزاعات زيادة الإيجار (مخالفات مؤشر الإيجار الذكي لمؤسسة التنظيم العقاري) "
        "ومخالفة عقد الإيجار. "
        "المركز بديل أسرع وأقل تكلفةً من محاكم دبي الرئيسية لقضايا الإيجار — "
        "معظم القضايا تُسوَّى في غضون ١-٢ شهر."
    )
})

print(f"RDC Support: {len(rdc['rich_blocks'])} blocks, {len(rdc['faq'])} FAQs")


# ═══════════════════════════════════════════════════════════════
# 7. /legal-notice — enrich (already has info + docs + 2-step process + 3 FAQs)
# Add: types of legal notices, when to use, 3 more FAQs
# ═══════════════════════════════════════════════════════════════
ln = pc["/legal-notice"]

ln["rich_blocks"].insert(1, {
    "type": "checklist",
    "title": ml("Types of Legal Notices We Draft and Serve", "أنواع الإنذارات القانونية التي نصيغها ونُبلِّغها"),
    "items": ml_items([
        ("Eviction notice (Dubai Law No. 33 of 2008) — 12-month notice for sale/renovation/personal use, "
         "30-day for non-payment",
         "إشعار الإخلاء (قانون دبي رقم 33 لسنة 2008) — إشعار ١٢ شهراً للبيع/التجديد/الاستخدام الشخصي، "
         "٣٠ يوماً لعدم السداد"),
        ("Debt recovery notice — formally demands payment of an overdue amount before court action",
         "إشعار استرداد الدين — يطالب رسمياً بسداد مبلغ متأخر قبل اتخاذ إجراء قضائي"),
        ("Contract breach notice — notifies the other party of a specific breach and demands remedy",
         "إشعار مخالفة العقد — يُخطر الطرف الآخر بمخالفة محددة ويطالب بالتصحيح"),
        ("POA cancellation notice — formally serves the agent with the revocation after the Notary Deed",
         "إشعار إلغاء الوكالة — يُبلِّغ الوكيل رسمياً بالإلغاء بعد سند التوثيق"),
        ("Commercial dispute notice — demand letter before arbitration or commercial court",
         "إشعار النزاع التجاري — خطاب مطالبة قبل التحكيم أو المحكمة التجارية"),
        ("Employment notice — formal notice to employer or employee before labour authority filing",
         "إشعار العمالة — إشعار رسمي لصاحب العمل أو الموظف قبل الإيداع في جهة العمل"),
    ])
})

ln["faq"].extend([
    faq(
        "How long after sending a legal notice can I file a case?",
        "بعد كم من الوقت من إرسال الإنذار القانوني يمكنني رفع قضية؟",
        "It depends on the notice type and the grace period stated in the notice itself. "
        "For eviction notices: the grace period is the notice period (12 months or 30 days). "
        "For debt recovery notices: the grace period is typically 7–14 days as stated in the notice. "
        "For contract breach notices: the grace period is what the notice specifies — "
        "usually 7–30 days to remedy the breach. "
        "Once the stated grace period expires without compliance, you can file immediately at the relevant court or authority.",
        "يعتمد على نوع الإشعار وفترة السماح المذكورة فيه. "
        "لإشعارات الإخلاء: فترة السماح هي مدة الإشعار (١٢ شهراً أو ٣٠ يوماً). "
        "لإشعارات استرداد الديون: فترة السماح عادةً ٧-١٤ يوماً كما يُذكر في الإشعار. "
        "لإشعارات مخالفة العقد: فترة السماح هي ما يُحدده الإشعار — "
        "عادةً ٧-٣٠ يوماً لتصحيح المخالفة. "
        "بعد انتهاء فترة السماح المذكورة بدون امتثال، يمكنك الإيداع فوراً في المحكمة أو الجهة المختصة."
    ),
    faq(
        "Does a legal notice need to be notarized before Tableegh delivery?",
        "هل يجب توثيق الإنذار القانوني قبل التسليم عبر التبليغ؟",
        "For most legal notices in Dubai (eviction, debt recovery, contract breach): yes — "
        "the notice should be notarized by a UAE Notary Public before being submitted to Tableegh for delivery. "
        "The notarization authenticates the sender's identity and the document's content, "
        "giving it full evidentiary weight in court. "
        "An unnotarized notice served through Tableegh may be accepted procedurally — "
        "but notarization significantly strengthens its standing if challenged before a judge.",
        "لمعظم الإنذارات القانونية في دبي (الإخلاء واسترداد الديون ومخالفة العقد): نعم — "
        "يجب توثيق الإشعار من كاتب عدل إماراتي قبل تقديمه للتبليغ للتسليم. "
        "يُصادق التوثيق على هوية المُرسِل ومحتوى الوثيقة "
        "مانحاً إياها كامل الثقل الإثباتي في المحكمة. "
        "قد يُقبَل الإشعار غير الموثَّق المُسلَّم عبر التبليغ إجرائياً — "
        "لكن التوثيق يُعزز مكانته بشكل ملحوظ إذا طُعن فيه أمام قاضٍ."
    ),
])

print(f"Legal Notice: {len(ln['rich_blocks'])} blocks, {len(ln['faq'])} FAQs")


# ═══════════════════════════════════════════════════════════════
# 8. /mobile-notary — enrich
# ═══════════════════════════════════════════════════════════════
mobile = pc["/mobile-notary"]

mobile["rich_blocks"].insert(1, {
    "type": "checklist",
    "title": ml("When to Request a Mobile Notary", "متى تطلب كاتب العدل المتنقل"),
    "items": ml_items([
        ("Hospital or care facility — patient cannot attend an office or complete a video call independently",
         "المستشفى أو دار الرعاية — المريض لا يستطيع الحضور في مكتب أو إجراء مكالمة الفيديو باستقلالية"),
        ("Multi-party signings at one location — all signatories in one place (board meetings, closings)",
         "التوقيعات متعددة الأطراف في موقع واحد — جميع الموقِّعين في مكان واحد (اجتماعات مجلس أو إغلاقات)"),
        ("Elderly or mobility-restricted principal — unable to travel to a notary office",
         "موكِّل مسنّ أو محدود الحركة — غير قادر على السفر لمكتب كتابة العدل"),
        ("Witness required at a specific location — property closing, asset handover, or business transaction",
         "شاهد مطلوب في موقع محدد — إغلاق عقار أو تسليم أصول أو معاملة تجارية"),
        ("Corporate preference — company requires notarization at its premises for confidentiality",
         "تفضيل الشركة — تشترط الشركة التوثيق في مقرها للحفاظ على السرية"),
    ])
})

mobile["rich_blocks"].insert(2, {
    "type": "info",
    "title": ml(
        "Mobile Notary vs Video Call — Which One Do You Need?",
        "كاتب العدل المتنقل مقابل مكالمة الفيديو — أيهما تحتاج؟"
    ),
    "text": ml(
        "For most POAs and notarized documents, the video call (e-notarization) route is faster, "
        "cheaper, and equally valid — no travel required for anyone. "
        "Request a Mobile Notary when: in-person presence is legally required for the specific document type; "
        "the principal cannot physically operate a device for a video call; "
        "or multiple parties must sign simultaneously in the same room. "
        "Not sure which applies to your situation? Send us a WhatsApp and we advise in minutes.",
        "لمعظم الوكالات والوثائق الموثَّقة، مسار مكالمة الفيديو (التوثيق الإلكتروني) أسرع "
        "وأقل تكلفةً وصالح بنفس القدر — لا سفر مطلوب لأي طرف. "
        "اطلب كاتب العدل المتنقل عندما: يُشترط الحضور الشخصي قانونياً لنوع الوثيقة المحدد؛ "
        "أو الموكِّل لا يستطيع تشغيل جهاز لمكالمة الفيديو جسدياً؛ "
        "أو يجب أن يوقِّع أطراف متعددون في آنٍ واحد في الغرفة ذاتها. "
        "غير متأكد مما ينطبق على وضعك؟ أرسل لنا واتساب ونرشدك في دقائق."
    )
})

print(f"Mobile Notary: {len(mobile['rich_blocks'])} blocks, {len(mobile['faq'])} FAQs")


# ═══════════════════════════════════════════════════════════════
# 9. /emergency-notary — enrich
# ═══════════════════════════════════════════════════════════════
emerg = pc["/emergency-notary"]

emerg["rich_blocks"].insert(1, {
    "type": "checklist",
    "title": ml("When You Need a Same-Day or Urgent POA", "متى تحتاج وكالة في نفس اليوم أو عاجلة"),
    "items": ml_items([
        ("Property transaction closing tomorrow — sale or purchase completion requiring the POA today",
         "إغلاق معاملة عقارية غداً — إتمام بيع أو شراء يستلزم الوكالة اليوم"),
        ("Imminent flight or relocation — leaving the UAE today and need to grant authority before departure",
         "رحلة طيران وشيكة أو انتقال — مغادرة الإمارات اليوم وتحتاج لمنح صلاحية قبل المغادرة"),
        ("Bank account freeze — urgent POA needed to grant authority to resolve a banking issue",
         "تجميد حساب بنكي — وكالة عاجلة مطلوبة لمنح صلاحية حل مشكلة مصرفية"),
        ("Active court deadline — court filing due today or tomorrow requiring a signed authorization",
         "موعد محكمة نشط — إيداع في المحكمة مستحق اليوم أو غداً يستلزم تفويضاً موقَّعاً"),
        ("Medical emergency — granting authority to a family member or legal representative urgently",
         "طارئ طبي — منح صلاحية لأحد أفراد الأسرة أو الممثل القانوني بشكل عاجل"),
        ("Corporate transaction deadline — board resolution or share transfer POA needed same day",
         "موعد معاملة تجارية — قرار مجلس إدارة أو وكالة نقل حصص مطلوبة في نفس اليوم"),
    ])
})

emerg["rich_blocks"].insert(2, {
    "type": "steps",
    "items": [
        {
            "title": ml("WhatsApp us now — we respond in minutes", "راسلنا الآن على واتساب — نرد في دقائق"),
            "body": ml(
                "Describe your urgency and deadline. We immediately assess what is needed "
                "and confirm whether same-day notarization is feasible.",
                "صف حالتك الطارئة والموعد النهائي. نُقيِّم فوراً ما هو مطلوب "
                "ونؤكد ما إذا كان التوثيق في نفس اليوم ممكناً."
            )
        },
        {
            "title": ml("We draft and send for review in under 30 minutes",
                        "نصيغ ونُرسل للمراجعة في أقل من ٣٠ دقيقة"),
            "body": ml(
                "For standard urgent POA types (General, Property, Vehicle, Court): "
                "draft ready within 30 minutes. "
                "You review and approve before the notarization session is booked.",
                "لأنواع الوكالات القياسية العاجلة (العامة والعقارية والمركبات والمحاكم): "
                "المسودة جاهزة في غضون ٣٠ دقيقة. "
                "تُراجع وتوافق قبل حجز جلسة التوثيق."
            )
        },
        {
            "title": ml("Video call — document in your inbox the same day",
                        "مكالمة الفيديو — الوثيقة في بريدك اليوم"),
            "body": ml(
                "We book the earliest available notarization slot and confirm the time with you. "
                "The notarized POA is delivered to your email immediately after the session — "
                "ready to use within the hour.",
                "نحجز أقرب موعد توثيق متاح ونؤكد لك الوقت. "
                "تصل الوكالة الموثَّقة لبريدك الإلكتروني فور انتهاء الجلسة — "
                "جاهزة للاستخدام في غضون الساعة."
            )
        }
    ]
})

print(f"Emergency Notary: {len(emerg['rich_blocks'])} blocks, {len(emerg['faq'])} FAQs")


# ═══════════════════════════════════════════════════════════════
# 10. /last-will-testament-dubai — enrich
# ═══════════════════════════════════════════════════════════════
will = pc["/last-will-testament-dubai"]

will["rich_blocks"].insert(1, {
    "type": "compare",
    "left": {
        "title": ml("DIFC Will (Non-Muslims)", "وصية DIFC (غير المسلمين)"),
        "items": ml_items([
            ("Registered with the DIFC Wills Service Centre — governed by English common law",
             "مسجَّلة في مركز خدمات الوصايا بـDIFC — تخضع للقانون الإنجليزي العام"),
            ("Covers UAE assets (property, bank accounts, business interests, guardianship)",
             "تشمل الأصول الإماراتية (عقارات وحسابات بنكية ومصالح تجارية والحضانة)"),
            ("Full Will: covers all UAE assets — recommended for most expatriates",
             "وصية كاملة: تشمل جميع الأصول الإماراتية — موصى بها لمعظم المغتربين"),
            ("Property Will: covers UAE real estate only — lower cost option",
             "وصية عقارية: تشمل العقارات الإماراتية فقط — خيار أقل تكلفةً"),
            ("Guardianship Will: names guardian for minor children in the UAE",
             "وصية الحضانة: تُسمِّي الولي للأطفال القاصرين في الإمارات"),
        ])
    },
    "right": {
        "title": ml("Dubai Courts Will (Muslims and Non-Muslims)", "وصية محاكم دبي (المسلمون وغير المسلمون)"),
        "items": ml_items([
            ("Registered with the Dubai Personal Status Court — governs assets under UAE law",
             "مسجَّلة في محكمة الأحوال الشخصية بدبي — تحكم الأصول وفق القانون الإماراتي"),
            ("Available to Muslims and non-Muslims; Islamic inheritance rules apply for Muslims",
             "متاحة للمسلمين وغير المسلمين؛ تسري أحكام الميراث الإسلامي للمسلمين"),
            ("Lower registration cost than DIFC — suitable for simpler estate structures",
             "تكلفة تسجيل أقل من DIFC — مناسبة للتركات الأبسط"),
            ("For non-Muslims: Federal Decree-Law No. 41 of 2024 allows home-country law to govern",
             "لغير المسلمين: يُتيح المرسوم بقانون الاتحادي رقم 41 لسنة 2024 تطبيق قانون الموطن"),
            ("Can be notarized through Dubai Courts or the UAE Ministry of Justice via a video call",
             "يمكن توثيقها عبر محاكم دبي أو وزارة العدل الإماراتية بمكالمة فيديو"),
        ])
    }
})

will["rich_blocks"].insert(2, {
    "type": "warning",
    "title": ml(
        "Dying Without a UAE Will — What Happens to Your Assets",
        "الوفاة بدون وصية إماراتية — ماذا يحدث لأصولك"
    ),
    "text": ml(
        "For Muslim expatriates and UAE nationals: UAE Sharia inheritance law applies automatically — "
        "assets are distributed according to Islamic rules regardless of any foreign will. "
        "For non-Muslim expatriates: without a UAE-registered will, UAE courts apply the law of the "
        "deceased's home country to UAE assets — but this process can take months or years, "
        "freezing UAE bank accounts and real estate in the meantime. "
        "A UAE-registered will eliminates the freeze, names your executor, and ensures "
        "your UAE assets go where you intend.",
        "للمغتربين المسلمين والمواطنين الإماراتيين: يسري قانون الميراث الإسلامي الإماراتي تلقائياً — "
        "تُوزَّع الأصول وفق الأحكام الإسلامية بصرف النظر عن أي وصية أجنبية. "
        "للمغتربين غير المسلمين: بدون وصية مسجَّلة إماراتياً، تُطبِّق المحاكم الإماراتية قانون "
        "بلد المتوفى الأصلي على الأصول الإماراتية — لكن هذه العملية قد تستغرق أشهراً أو سنوات "
        "يتجمد خلالها الحساب البنكي الإماراتي والعقارات. "
        "وصية مسجَّلة إماراتياً تُلغي التجميد وتُسمِّي منفِّذ الوصية وتضمن "
        "توزيع أصولك الإماراتية وفق رغبتك."
    )
})

print(f"Last Will: {len(will['rich_blocks'])} blocks, {len(will['faq'])} FAQs")


# ═══════════════════════════════════════════════════════════════
# 11. /legal-notice/poa-cancellation — enrich
# ═══════════════════════════════════════════════════════════════
lpoa = pc["/legal-notice/poa-cancellation"]

lpoa["rich_blocks"].insert(1, {
    "type": "info",
    "title": ml(
        "Revoking at the Notary is Step 1 — Serving the Agent is Step 2",
        "الإلغاء لدى كاتب العدل هو الخطوة ١ — تبليغ الوكيل هو الخطوة ٢"
    ),
    "text": ml(
        "Notarizing a Revocation Deed cancels the POA legally from the date of notarization. "
        "But if the agent acts in good faith before being notified — "
        "signing a contract, completing a transaction — those actions may still bind you. "
        "Step 2 is serving the agent with a formal POA Cancellation Notice through Tableegh — "
        "creating an official, court-admissible record of exactly when the agent's authority ended. "
        "We handle both steps as one service.",
        "توثيق سند الإلغاء يُلغي الوكالة قانونياً من تاريخ التوثيق. "
        "لكن إذا تصرف الوكيل بحسن نية قبل إخطاره — "
        "توقيع عقد أو إتمام معاملة — قد تبقى تلك التصرفات ملزمةً لك. "
        "الخطوة ٢ هي تبليغ الوكيل بإشعار إلغاء وكالة رسمي عبر التبليغ — "
        "مُنشئاً سجلاً رسمياً مقبولاً أمام المحكمة بالضبط متى انتهت صلاحية الوكيل. "
        "نتولى الخطوتين كخدمة واحدة."
    )
})

print(f"Legal Notice POA Cancellation: {len(lpoa['rich_blocks'])} blocks, {len(lpoa['faq'])} FAQs")


# ═══════════════════════════════════════════════════════════════
# SAVE
# ═══════════════════════════════════════════════════════════════
with open("data/content.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("\n✅ Phase 3 complete — content.json saved")
