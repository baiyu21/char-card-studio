# 人物卡片出图小工具 Implementation Plan

> **For agentic workers:** 按任务顺序实现；步骤用 checkbox 跟踪。

**Goal:** 独立 Vite+React 小应用，侧栏快改人物卡，导出 1920×1080 PNG。

**Architecture:** 预览画布固定 1920×1080 + CSS scale 适配视口；侧栏改 `CardState`；`html-to-image` 只截画布节点。样式从主站人物 Teaser 裁剪拷贝，不链主站。

**Tech Stack:** Vite, React 19, TypeScript, html-to-image

**Spec:** `docs/superpowers/specs/2026-09-17-char-card-studio-design.md`

## Global Constraints

- 路径：`e:\quartash\char-card-studio\`
- 第一期仅 16:9 / 1920×1080；无组织 Tab、无多人物动效、不回写主站
- 背景装饰字固定 `OASIAS`
- 导出不含侧栏与顶栏控件

---

### Task 1: 脚手架

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/vite-env.d.ts`, `README.md`

- [ ] **Step 1:** `npm create vite@latest . -- --template react-ts`（若目录非空则手写等价文件）
- [ ] **Step 2:** 安装 `html-to-image`
- [ ] **Step 3:** README 写清 `npm i` / `npm run dev` / 导出说明
- [ ] **Step 4:** `npm run build` 空壳通过

---

### Task 2: 类型、默认数据、App 壳

**Files:**
- Create: `src/types.ts`, `src/defaults.ts`, `src/App.tsx`, `src/App.css`

**Produces:**
- `CardState { nameZh, nameEn, summary, bio, orgNote, standeeUrl, accent }`
- `DEFAULT_CARD: CardState`

- [ ] **Step 1:** 定义类型与默认示例（赫柏风格占位文案）
- [ ] **Step 2:** App 布局：顶栏 + 预览区 + 侧栏占位
- [ ] **Step 3:** 目视：左右分栏可用

---

### Task 3: 预览画布（视觉裁剪）

**Files:**
- Create: `src/components/PreviewStage.tsx`, `src/styles/char-card.css`
- Copy: `public/logo.png`, `public/fonts/*`（或 link 主站 public 字体路径说明）、示例立绘

**Consumes:** `CardState`  
**Produces:** `PreviewStage` + `ref` 指向导出根节点（1920×1080）

- [ ] **Step 1:** 从主站 `SectionTeaser.css` 裁剪人物层到 `char-card.css`（去导航/CTA/动效）
- [ ] **Step 2:** `PreviewStage` 渲染静态一屏；外层 scale 适配
- [ ] **Step 3:** 目视对比主站人物段观感

---

### Task 4: 侧栏编辑

**Files:**
- Create: `src/components/EditorSidebar.tsx`

**Consumes/Produces:** `value: CardState`, `onChange: (next: CardState) => void`

- [ ] **Step 1:** 表单字段绑定
- [ ] **Step 2:** 立绘 `<input type="file">` → object URL；卸载时 revoke
- [ ] **Step 3:** 「重置为默认」按钮
- [ ] **Step 4:** 改字段预览即时更新

---

### Task 5: 导出 PNG

**Files:**
- Create: `src/components/ExportBar.tsx`
- Modify: `App.tsx`

- [ ] **Step 1:** `document.fonts.ready` 后启用导出
- [ ] **Step 2:** `toPng(node, { width: 1920, height: 1080, pixelRatio: 1 })`
- [ ] **Step 3:** 下载 `char-{slug}.png`
- [ ] **Step 4:** 手测导出尺寸与无侧栏残留

---

### Task 6: 收尾

- [ ] **Step 1:** `npm run build` 通过
- [ ] **Step 2:** README 补截图步骤与已知限制（mask/字体）
