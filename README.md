# GEMS 敏捷開發工作區

基於迭代版本管理的敏捷開發檔案組織架構，支援分片機制和模組化開發流程。

## 📁 檔案結構

```
organized-workspace/
├─ README.md                          # 專案說明文件
│
├─ /iterations/                       # 所有迭代產出集中這裡
│   ├─ /iter-01/                      # 第 1 次迭代
│   │   ├─ mvp_blueprint.yaml         # MVP 藍圖
│   │   ├─ sprint_plan.yaml           # 衝刺計畫
│   │   ├─ sprint_fillback.yaml       # 衝刺回填
│   │   ├─ qa_consolidated.yaml       # QA 報告
│   │   ├─ sprint_summary.yaml        # 衝刺總結
│   │   ├─ iteration_closing.yaml     # 迭代結束報告
│   │   ├─ sprint_change_proposal.yaml # 變更提案（如果有）
│   │   └─ strategic_blocker.yaml     # 阻礙報告（如果有）
│   │
│   ├─ /iter-02/                      # 第 2 次迭代
│   └─ ...
│
├─ /code/                             # 程式碼按迭代分類
│   ├─ /iter-01/
│   ├─ /iter-08/
│   └─ /shared/                       # 跨迭代共用程式碼
│
├─ /product-specs/                    # 產品規格書
│   └─ gems_product_report.yaml       # 完整產品規格（產品文檔師產出）
│
├─ /resources/                        # 資源文件
│   ├─ /prompts/                      # AI 角色 prompt
│   │   └─ /roles/
│   │       ├─ 1.全棧分析師 (Full-Stack Analyst).txt
│   │       ├─ 2.務實的系統結構師 (Pragmatic System Architect).txt
│   │       ├─ 3.產品策略師 (Product Strategist, PS).txt
│   │       ├─ 4.敏捷大師 (Scrum Master, SM).txt
│   │       ├─ 5.開發者 (Developer,DEV).txt
│   │       ├─ 6.品管師 (Quality Assurance, QA).txt
│   │       └─ 7.產品文檔師 (Product Documentarian, PD).txt
│   │
│   └─ /references/                   # 參考資料
│       └─ (通用參考文件)
│
├─ /templates/                        # 模板
│   └─ /iteration-template/           # 新迭代的模板資料夾
│
└─ /tools/                            # 工具腳本
    └─ gems-cli.js                    # GEMS CLI 工具
```

## 🚀 快速開始

### 使用 GEMS CLI

```bash
# 建立新迭代
$ gems create 9

# 驗證 YAML 檔案
$ gems validate 8

# 列出所有迭代
$ gems list

# 顯示說明
$ gems help
```

## 📋 檔案說明

### /iterations/ - 迭代產出
所有迭代的產出文件都集中在這裡，按迭代編號分類。每個迭代包含完整的工作流程文件。

### /code/ - 程式碼
按迭代分類的程式碼檔案，方便追蹤每個迭代的程式碼變更。

### /product-specs/ - 產品規格書
整合所有迭代資訊的完整產品規格書，由產品文檔師（PD）產出和維護。

### /resources/ - 資源文件
- **prompts/roles/** - 7 個 AI 角色的完整 prompt（包含 GEMS 標籤規範）
- **references/** - 通用參考文件

### /templates/ - 模板
新迭代的模板檔案，用於快速建立新迭代資料夾。

### /tools/ - 工具腳本
- **gems-cli.js** - 命令列工具，用於管理迭代

## 📝 檔案命名規範

### 迭代資料夾
- `iter-01`, `iter-02`, ..., `iter-NN` - 迭代編號自動補零

### YAML 檔案
- `mvp_blueprint.yaml` - MVP 藍圖（v1/v2/v3 由內容區分）
- `sprint_plan.yaml` - 衝刺計畫
- `sprint_fillback.yaml` - 衝刺回填
- `qa_consolidated.yaml` - QA 綜合報告
- `sprint_summary.yaml` - 衝刺總結
- `iteration_closing.yaml` - 迭代結束報告
- `sprint_change_proposal.yaml` - 變更提案（可選）
- `strategic_blocker.yaml` - 策略阻礙報告（可選）

### 程式碼檔案
- Google Apps Script: `{ModuleName}.gs`
- HTML 檔案: `{PageName}.html`
- 測試檔案: `{ModuleName}Tests.gs`

## ✨ 核心特色

### 迭代導向版本管理
- 按迭代次序組織檔案，而非傳統版本號
- 每個迭代包含完整的交付物集合
- 便於追蹤專案演進和回顧分析
- 支援迭代容量管理（每次迭代 2-3 個模塊為主）

### 分片機制支援
- 每個 YAML 報告都是獨立的文件
- 可以單獨使用，不依賴其他報告
- 支援模組化的工作流程
- 便於個別角色的獨立作業

### AI 驅動工作流程
- 7 個 AI 角色協作（分析師、架構師、策略師、敏捷大師、開發者、品管師、文檔師）
- 完整的 prompt 規範（包含 GEMS 標籤 v5.0）
- 支援 Gemini API 整合（免費）

### CLI 工具支援
- 快速建立新迭代
- 自動驗證 YAML 格式
- 列出所有迭代
- 可擴展的命令列介面

## 🔄 工作流程

```
1. 全棧分析師 (BA)  → MVP Blueprint v1 (專案定義)
2. 系統結構師 (SA)  → MVP Blueprint v2 (架構設計)
3. 產品策略師 (PS)  → MVP Blueprint v3 (迭代規劃)
4. 敏捷大師 (SM)    → Sprint Plan (衝刺計畫)
5. 開發者 (DEV)     → Sprint Fillback (開發回填)
6. 品管師 (QA)      → QA Consolidated (品質報告)
7. 敏捷大師 (SM)    → Sprint Summary (衝刺總結)
8. 產品策略師 (PS)  → Iteration Closing (迭代結束)
9. 產品文檔師 (PD)  → Product Report (產品規格書)
```

## 📚 相關文件

- **GEMS 標籤規範** - 請參考 `resources/prompts/roles/5.開發者 (Developer,DEV).txt`
- **角色 Prompt** - 請參考 `resources/prompts/roles/` 資料夾
- **產品規格書** - 請參考 `product-specs/gems_product_report.yaml`