'use client'
import React from 'react'
import { type Lang, t } from '@/lib/i18n'

// ── Types ────────────────────────────────────────────────────────────────────

export type RichBlock =
  | { type: 'heading';    text: Record<string,string> }
  | { type: 'para';       text: Record<string,string>; accent?: boolean }
  | { type: 'warning';    text: Record<string,string>; title?: Record<string,string> }
  | { type: 'info';       text: Record<string,string>; title?: Record<string,string> }
  | { type: 'success';    text: Record<string,string>; title?: Record<string,string> }
  | { type: 'steps';      items: Array<{ title: Record<string,string>; body: Record<string,string> }> }
  | { type: 'checklist';  title?: Record<string,string>; items: Array<Record<string,string>> }
  | { type: 'compare';    left: { title: Record<string,string>; items: Array<Record<string,string>> }; right: { title: Record<string,string>; items: Array<Record<string,string>> } }
  | { type: 'table';      headers: Array<Record<string,string>>; rows: Array<Array<Record<string,string>>> }
  | { type: 'law';        ref: string; text: Record<string,string> }
  | { type: 'process';    items: Array<{ icon: string; title: Record<string,string>; body: Record<string,string> }> }
  | { type: 'stats';      items: Array<{ value: string; label: Record<string,string>; sub?: Record<string,string> }> }
  | { type: 'divider' }

// ── Check icon ───────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-coral-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
  </svg>
)

const AlertIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
  </svg>
)

const InfoIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
)

const SuccessIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
)

const LawIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
  </svg>
)

// ── Individual block renderers ───────────────────────────────────────────────

function HeadingBlock({ block, lang }: { block: Extract<RichBlock, {type:'heading'}>, lang: Lang }) {
  return (
    <h2 className="font-sans text-2xl font-bold text-ink-900 mt-10 mb-4 pb-3 block"
      style={{borderBottom:'2px solid',borderImage:'linear-gradient(90deg,#EE7849 0%,rgba(232,90,60,.15) 60%,transparent 100%) 1'}}>
      {t(block.text, lang)}
    </h2>
  )
}

function ParaBlock({ block, lang }: { block: Extract<RichBlock, {type:'para'}>, lang: Lang }) {
  return (
    <p className={`text-sm leading-relaxed mb-1 ${block.accent ? 'text-ink-800 font-medium' : 'text-ink-600'}`}>
      {t(block.text, lang)}
    </p>
  )
}

function WarningBlock({ block, lang }: { block: Extract<RichBlock, {type:'warning'}>, lang: Lang }) {
  const isRTL = lang === 'ar'
  return (
    <div className={`flex gap-0 rounded-xl overflow-hidden my-5 ${isRTL ? 'flex-row-reverse' : ''}`}
      style={{background:'#fffbf0',border:'1px solid rgba(201,162,39,.25)'}}>
      <div style={{width:3,flexShrink:0,background:'#EE7849'}} />
      <div className={`flex gap-3 px-4 py-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
        <span className="shrink-0 mt-0.5" style={{color:'#E85A3C'}}><AlertIcon /></span>
        <div className="min-w-0">
          {block.title && <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{color:'#8a6a00'}}>{t(block.title, lang)}</p>}
          <p className="text-sm leading-relaxed" style={{color:'#5a4800', fontWeight:300}}>{t(block.text, lang)}</p>
        </div>
      </div>
    </div>
  )
}

function InfoBlock({ block, lang }: { block: Extract<RichBlock, {type:'info'}>, lang: Lang }) {
  const isRTL = lang === 'ar'
  return (
    <div className={`flex gap-3 bg-ink-50 border border-ink-200 rounded-xl px-4 py-4 my-4 ${isRTL ? 'border-r-4 border-r-ink-400 flex-row-reverse text-right' : 'border-l-4 border-l-ink-400'}`}>
      <span className="text-ink-400 mt-0.5"><InfoIcon /></span>
      <div className="min-w-0">
        {block.title && <p className="text-ink-700 text-xs font-bold uppercase tracking-wide mb-1">{t(block.title, lang)}</p>}
        <p className="text-ink-600 text-sm leading-relaxed">{t(block.text, lang)}</p>
      </div>
    </div>
  )
}

function SuccessBlock({ block, lang }: { block: Extract<RichBlock, {type:'success'}>, lang: Lang }) {
  const isRTL = lang === 'ar'
  return (
    <div className={`flex gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-4 my-4 ${isRTL ? 'border-r-4 border-r-green-500 flex-row-reverse text-right' : 'border-l-4 border-l-green-500'}`}>
      <span className="text-green-500 mt-0.5"><SuccessIcon /></span>
      <div className="min-w-0">
        {block.title && <p className="text-green-800 text-xs font-bold uppercase tracking-wide mb-1">{t(block.title, lang)}</p>}
        <p className="text-green-700 text-sm leading-relaxed">{t(block.text, lang)}</p>
      </div>
    </div>
  )
}

function LawBlock({ block, lang }: { block: Extract<RichBlock, {type:'law'}>, lang: Lang }) {
  const isRTL = lang === 'ar'
  return (
    <div className={`rounded-xl overflow-hidden my-5 ${isRTL ? '' : ''}`}
      style={{background:'#0C1A27',border:'1px solid rgba(232,90,60,.15)'}}>
      <div className="px-5 py-2.5 flex items-center gap-2"
        style={{background:'rgba(232,90,60,.12)',borderBottom:'1px solid rgba(232,90,60,.2)'}}>
        <span style={{color:'#EE7849',flexShrink:0}}><LawIcon /></span>
        <span className="text-[10px] font-bold uppercase tracking-[.12em]" style={{color:'#EE7849'}}>{block.ref}</span>
      </div>
      <div className={`px-5 py-4 ${isRTL ? 'text-right' : ''}`}
        style={{borderLeft: isRTL ? 'none' : '3px solid #EE7849', borderRight: isRTL ? '3px solid #EE7849' : 'none'}}>
        <p className="text-sm leading-[1.8]" style={{color:'#b8cde0',fontStyle:'italic',fontWeight:300}}>{t(block.text, lang)}</p>
      </div>
    </div>
  )
}

function StepsBlock({ block, lang }: { block: Extract<RichBlock, {type:'steps'}>, lang: Lang }) {
  const isRTL = lang === 'ar'
  return (
    <div className="my-6 space-y-0">
      {block.items.map((item, i) => (
        <div key={i} className={`flex gap-4 relative ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* connector line */}
          {i < block.items.length - 1 && (
            <div className={`absolute top-8 ${isRTL ? 'right-[19px]' : 'left-[19px]'} w-px h-[calc(100%-1.5rem)] bg-coral-400/30`} />
          )}
          {/* number circle */}
          <div className="shrink-0 w-10 h-10 rounded-full bg-ink-900 border-2 border-coral-400 flex items-center justify-center z-10">
            <span className="font-sans font-bold text-coral-400 text-sm">{i + 1}</span>
          </div>
          <div className={`pb-6 min-w-0 ${isRTL ? 'text-right' : ''}`}>
            <p className="font-semibold text-ink-900 text-sm mb-1">{t(item.title, lang)}</p>
            <p className="text-ink-600 text-sm leading-relaxed">{t(item.body, lang)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ChecklistBlock({ block, lang }: { block: Extract<RichBlock, {type:'checklist'}>, lang: Lang }) {
  const isRTL = lang === 'ar'
  return (
    <div className="my-5 rounded-xl overflow-hidden" style={{border:'1px solid #e8ecf5'}}>
      {block.title && (
        <div className={`px-5 py-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
          style={{background:'#0C1A27',borderBottom:'1px solid rgba(232,90,60,.15)'}}>
          <div style={{width:3,height:14,background:'#EE7849',borderRadius:2,flexShrink:0}} />
          <p className="text-coral-400 text-[10px] font-bold uppercase tracking-[.12em]">{t(block.title, lang)}</p>
        </div>
      )}
      <ul dir={isRTL ? 'rtl' : 'ltr'} style={{background:'#fafbff'}}>
        {block.items.map((item, i) => (
          <li key={i} className={`flex items-start gap-3 px-5 py-3 ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{borderBottom: i < block.items.length - 1 ? '1px solid #f0f2f8' : 'none'}}>
            <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
              style={{background:'rgba(29,158,117,.1)',border:'1px solid rgba(29,158,117,.3)',flexShrink:0}}>
              <svg className="w-2.5 h-2.5" fill="none" stroke="#1d9e75" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </span>
            <span className="text-sm leading-relaxed" style={{color:'#2a3a5a',fontWeight:300}}>{t(item, lang)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CompareBlock({ block, lang }: { block: Extract<RichBlock, {type:'compare'}>, lang: Lang }) {
  return (
    <div className="my-6 grid sm:grid-cols-2 gap-4">
      {/* Left column */}
      <div className="rounded-2xl border border-ink-200 overflow-hidden">
        <div className="bg-ink-900 px-5 py-3">
          <p className="text-coral-400 text-xs font-bold uppercase tracking-wider">{t(block.left.title, lang)}</p>
        </div>
        <ul className="divide-y divide-ink-100">
          {block.left.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 px-5 py-3">
              <CheckIcon />
              <span className="text-sm text-ink-700 leading-relaxed">{t(item, lang)}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Right column */}
      <div className="rounded-2xl border border-coral-400/40 overflow-hidden">
        <div className="bg-coral-400 px-5 py-3">
          <p className="text-ink-900 text-xs font-bold uppercase tracking-wider">{t(block.right.title, lang)}</p>
        </div>
        <ul className="divide-y divide-coral-400/20 bg-coral-400/5">
          {block.right.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 px-5 py-3">
              <span className="text-coral-600 mt-0.5 shrink-0">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </span>
              <span className="text-sm text-ink-700 leading-relaxed">{t(item, lang)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function TableBlock({ block, lang }: { block: Extract<RichBlock, {type:'table'}>, lang: Lang }) {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-ink-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-ink-900">
            {block.headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3 text-coral-400 text-xs font-bold uppercase tracking-wider">
                {t(h, lang)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {block.rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-ink-50'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-ink-700 leading-relaxed">
                  {t(cell, lang)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ProcessBlock({ block, lang }: { block: Extract<RichBlock, {type:'process'}>, lang: Lang }) {
  const isRTL = lang === 'ar'
  return (
    <div className="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {block.items.map((item, i) => (
        <div key={i} className={`bg-ink-50 rounded-xl border border-ink-100 p-5 ${isRTL ? 'text-right' : ''}`}>
          <div className="text-2xl mb-3">{item.icon}</div>
          <p className="font-semibold text-ink-900 text-sm mb-2">{t(item.title, lang)}</p>
          <p className="text-ink-600 text-xs leading-relaxed">{t(item.body, lang)}</p>
        </div>
      ))}
    </div>
  )
}

function StatsBlock({ block, lang }: { block: Extract<RichBlock, {type:'stats'}>, lang: Lang }) {
  return (
    <div className="my-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
      {block.items.map((item, i) => (
        <div key={i} className="rounded-xl p-5 text-center"
          style={{background:'#f7f9ff',border:'1px solid #e8ecf5'}}>
          <div className="font-sans font-bold text-coral-400 mb-1" style={{fontSize:38,lineHeight:1}}>{item.value}</div>
          <div className="text-ink-900 text-xs font-semibold mb-0.5">{t(item.label, lang)}</div>
          {item.sub && <div className="text-ink-400 text-xs font-light">{t(item.sub, lang)}</div>}
        </div>
      ))}
    </div>
  )
}

function DividerBlock() {
  return <div className="h-px bg-gradient-to-r from-transparent via-coral-400/40 to-transparent my-8" />
}

// ── Main renderer ────────────────────────────────────────────────────────────

interface Props {
  blocks: RichBlock[]
  lang: Lang
}

export default function RichContent({ blocks, lang }: Props) {
  if (!blocks || blocks.length === 0) return null
  return (
    <div className="rich-content space-y-1">
      {blocks.map((block, i) => {
        let node: React.ReactNode = null
        switch (block.type) {
          case 'heading':   node = <HeadingBlock   block={block} lang={lang} />; break
          case 'para':      node = <ParaBlock      block={block} lang={lang} />; break
          case 'warning':   node = <WarningBlock   block={block} lang={lang} />; break
          case 'info':      node = <InfoBlock      block={block} lang={lang} />; break
          case 'success':   node = <SuccessBlock   block={block} lang={lang} />; break
          case 'law':       node = <LawBlock       block={block} lang={lang} />; break
          case 'steps':     node = <StepsBlock     block={block} lang={lang} />; break
          case 'checklist': node = <ChecklistBlock block={block} lang={lang} />; break
          case 'compare':   node = <CompareBlock   block={block} lang={lang} />; break
          case 'table':     node = <TableBlock     block={block} lang={lang} />; break
          case 'process':   node = <ProcessBlock   block={block} lang={lang} />; break
          case 'stats':     node = <StatsBlock     block={block} lang={lang} />; break
          case 'divider':   node = <DividerBlock />; break
          default:          node = null
        }
        return node ? <React.Fragment key={i}>{node}</React.Fragment> : null
      })}
    </div>
  )
}
