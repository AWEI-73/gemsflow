# GEMS 技術串接 PROMPT 修正完成

## ✅ 修正完成的 PROMPT

### 1. 開發者 (Developer, DEV) ✅
**修正位置**: `organized-workspace/resources/prompts/roles/5.開發者 (Developer,DEV).txt`

**新增內容**:
- `developerLog` 中新增技術架構追蹤欄位
- `affectedDataModels`: 從 sprint_plan 繼承，記錄實際影響的資料表
- `databaseChanges`: 記錄具體的資料庫變更（表、變更類型、描述、遷移檔案）
- `serviceChanges`: 記錄服務層變更
- `componentChanges`: 記錄組件層變更
- 提供完整的範例（資料庫、服務層、戰術性修正）

### 2. 品管師 (Quality Assurance, QA) ✅
**修正位置**: `organized-workspace/resources/prompts/roles/6.品管師 (Quality Assurance, QA).txt`

**新增內容**:
- 新增 `3.5 技術架構驗證` 規則
- `technicalVerification` 區塊包含：
  - `databaseVerification`: 驗證計畫 vs 實際的資料庫變更
  - `serviceVerification`: 驗證服務層實作
- 具體的驗證規則和 qaResult 判定邏輯

### 3. 敏捷大師 (Scrum Master, SM) ✅
**修正位置**: `organized-workspace/resources/prompts/roles/4.敏捷大師 (Scrum Master, SM).txt`

**新增內容**:
- 四方交叉比對中新增技術架構交叉比對
- `technicalImpact` 區塊包含：
  - `affectedDataModels`: 整合計畫與實際的資料模型影響
  - `architecturalChanges`: 詳細的架構變更分析
  - `crossReferenceAnalysis`: 技術層面的四方交叉比對結論

### 4. 產品策略師 (Product Strategist, PS) ✅
**維持現狀**: 已有完善的 `asBuiltArchitecture` 機制，會從 Sprint Summary 獲取技術分析

---

## 🔄 完整的技術串接流程

```
MVP Blueprint (architecture.dataModels + affectedDataModels)
    ↓ 繼承
Sprint Plan (affectedDataModels)
    ↓ 實際執行
Sprint Fillback (affectedDataModels + databaseChanges + serviceChanges + componentChanges) ← 🆕
    ↓ 交叉驗證
QA Report (technicalVerification: databaseVerification + serviceVerification) ← 🆕
    ↓ 四方比對
Sprint Summary (technicalImpact + architecturalChanges + crossReferenceAnalysis) ← 🆕
    ↓ 架構分析
Iteration Closing (asBuiltArchitecture.dataModels + codebaseStructure)
```

---

## 💡 關鍵改進點

### 1. 資料庫變更追蹤
- **DEV**: 記錄具體的資料庫變更類型（ALTER_CONSTRAINT, CREATE_TABLE, ADD_COLUMN 等）
- **QA**: 驗證計畫的資料庫變更是否正確實作
- **SM**: 分析資料庫變更對系統架構的影響

### 2. 服務層變更追蹤
- **DEV**: 記錄服務層的新增、修改、重構
- **QA**: 驗證服務層實作是否符合預期
- **SM**: 分析服務層變更的架構影響

### 3. 四方交叉比對強化
- 不只比對功能完成度，還比對技術實作的一致性
- 確保計畫→執行→驗證→總結在技術層面完全閉環

### 4. 架構演進追蹤
- 從計畫架構到竣工架構的完整演進記錄
- 為下次迭代提供準確的技術現狀基礎

---

## 🎯 解決的問題

✅ **DATABASE 跟程式的依賴接不太起來**
- 現在有完整的資料庫變更追蹤鏈

✅ **MVP 有做 SPRINT PLAN 就沒了**
- Sprint Plan 的 affectedDataModels 現在會被後續階段持續追蹤

✅ **SUMMARY 沒有，迭代報告又有**
- Sprint Summary 現在有完整的 technicalImpact 分析

✅ **各自提示詞內容的 YAML 部分技術串接**
- 所有階段都有對應的技術追蹤欄位，確保資訊不斷層

---

## 🚀 立即效益

1. **完整追蹤**: 從資料庫設計到實際交付的完整技術變更鏈
2. **品質保證**: QA 可以驗證資料庫 schema 和服務實作
3. **決策支援**: Sprint Summary 提供完整的技術影響分析
4. **風險管控**: 及早發現計畫與實際的技術偏差
5. **架構演進**: 清楚記錄系統架構的演進過程

技術串接問題已完全解決！🎉