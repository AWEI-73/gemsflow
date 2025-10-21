# GEMS 技術串接改進提案

## 問題分析

當前 GEMS 工作流程在技術架構追蹤方面存在斷層：

### 現狀分析
- ✅ **MVP Blueprint**: 完整的 `architecture.dataModels` 和 `affectedDataModels`
- ✅ **Sprint Plan**: 有 `affectedDataModels` 追蹤
- ❌ **Sprint Fillback**: 只有 `changedFiles`，缺乏資料庫層面追蹤
- ❌ **QA Report**: 完全沒有技術架構相關欄位
- ❌ **Sprint Summary**: 沒有 `affectedDataModels` 或架構追蹤
- ✅ **Iteration Closing**: 有完整的 `asBuiltArchitecture.dataModels`

### 斷層影響
1. 無法追蹤資料庫變更的實際執行情況
2. QA 無法驗證資料庫相關的驗收標準
3. Sprint Summary 缺乏技術架構的完整視圖
4. 迭代結束時難以準確分析架構演進

## 改進方案

### 方案 1：最小化改進（推薦）

#### 1.1 Sprint Fillback 增強
在 `developerLog` 中新增：
```yaml
developerLog:
  - logType: "PROGRESS"
    taskId: "1.1-T1"
    description: "撰寫 SQL 遷移腳本：擴展 roster_type CHECK 約束"
    developerNotes: "使用 DROP + ADD CONSTRAINT 確保約束正確更新"
    changedFiles: ["database/migrations/001_extend_class_management.sql"]
    # 新增以下欄位
    affectedDataModels: ["tbl_class_management"]
    databaseChanges:
      - table: "tbl_class_management"
        changeType: "ALTER_CONSTRAINT"
        description: "擴展 roster_type 支援 EXT"
```

#### 1.2 QA Report 增強
在 `storyReports` 中新增：
```yaml
storyReports:
  - reportId: "QA-STORY-1.1"
    storyId: "STORY-1.1"
    # 現有欄位...
    # 新增以下區塊
    technicalVerification:
      affectedDataModels: ["tbl_class_management"]
      databaseVerification:
        - table: "tbl_class_management"
          verificationMethod: "SCHEMA_CHECK"
          qaResult: "PASS"
          qaFinding: "✅ roster_type CHECK 約束已正確擴展支援 'EXT'"
```

#### 1.3 Sprint Summary 增強
在 `storyOutcomes` 中新增：
```yaml
storyOutcomes:
  - storyId: "STORY-1.1"
    # 現有欄位...
    # 新增以下區塊
    technicalImpact:
      affectedDataModels: ["tbl_class_management"]
      architecturalChanges:
        - component: "Database Schema"
          changeType: "CONSTRAINT_EXTENSION"
          description: "擴展 roster_type 支援 EXT 類型"
          verificationStatus: "VERIFIED"
```

### 方案 2：完整改進

#### 2.1 建立技術追蹤標準
定義統一的技術追蹤格式：
```yaml
technicalImpact:
  affectedDataModels: []
  databaseChanges: []
  serviceChanges: []
  componentChanges: []
  apiChanges: []
```

#### 2.2 各階段完整整合
- Sprint Fillback: 開發者記錄實際技術變更
- QA Report: 品管師驗證技術變更
- Sprint Summary: 敏捷大師整合技術影響分析
- Iteration Closing: 產品策略師產出完整架構視圖

## 實施建議

### 階段 1：立即改進（本週）
1. 更新 Sprint Fillback 的 DEV 提示詞
2. 更新 QA Report 的 QA 提示詞
3. 測試新格式的可行性

### 階段 2：完整整合（下週）
1. 更新 Sprint Summary 的 SM 提示詞
2. 建立技術追蹤的自動化驗證
3. 完善文檔和範例

### 階段 3：優化改進（未來）
1. 建立技術變更的自動掃描工具
2. 整合到 GEMS 工作流程自動化中
3. 建立技術債務追蹤機制

## 預期效益

1. **完整追蹤**: 從計畫到交付的完整技術變更追蹤
2. **品質保證**: QA 能夠驗證資料庫和架構變更
3. **決策支援**: 為下次迭代提供準確的技術現狀
4. **風險管控**: 及早發現技術債務和架構問題