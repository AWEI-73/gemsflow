# 技術串接改進範例

以 **STORY-1.1: 擴展 tbl_class_management 表支援 EXT 和新增欄位** 為例

## 🎯 原始計畫 (Sprint Plan)

```yaml
- storyId: "STORY-1.1"
  storyTitle: "擴展 tbl_class_management 表支援 EXT 和新增欄位"
  
  acceptanceCriteria:
    - id: "AC-1.1.1"
      description: "擴展 roster_type 支援 'EXT' 類型"
    - id: "AC-1.1.2"
      description: "新增 training_start_date, training_end_date, meal_rule 欄位"
    - id: "AC-1.1.3"
      description: "確保所有欄位名稱為小寫 snake_case"
  
  affectedDataModels: ["tbl_class_management"]  # ← 計畫階段的資料庫追蹤
```

## 🔧 開發執行 (Sprint Fillback) - 改進後

```yaml
stories:
  - storyId: "STORY-1.1"
    acceptanceCriteriaStatus:
      - id: "AC-1.1.1"
        status: "Fulfilled"
        verificationNote: "Vibe CEO 已驗證：roster_type CHECK 約束已擴展支援 'EXT'"
    
    developerLog:
      - logType: "PROGRESS"
        taskId: "1.1-T1"
        description: "撰寫 SQL 遷移腳本：擴展 roster_type CHECK 約束"
        status: "Done"
        developerNotes: "使用 DROP + ADD CONSTRAINT 確保約束正確更新"
        changedFiles: ["database/migrations/001_extend_class_management.sql"]
        testFiles: ["database/tests/test_migrations.sql"]
        
        # 🆕 新增：技術架構追蹤
        affectedDataModels: ["tbl_class_management"]
        databaseChanges:
          - table: "tbl_class_management"
            changeType: "ALTER_CONSTRAINT"
            description: "擴展 roster_type CHECK 約束支援 'YCB', 'ZZB', 'EXT'"
            migrationFile: "database/migrations/001_extend_class_management.sql"
        
      - logType: "PROGRESS"
        taskId: "1.1-T2"
        description: "撰寫 SQL 遷移腳本：新增欄位"
        status: "Done"
        developerNotes: "新增 training_start_date, training_end_date, meal_rule 欄位"
        changedFiles: ["database/migrations/001_extend_class_management.sql"]
        testFiles: []
        
        # 🆕 新增：技術架構追蹤
        affectedDataModels: ["tbl_class_management"]
        databaseChanges:
          - table: "tbl_class_management"
            changeType: "ADD_COLUMN"
            description: "新增 training_start_date DATE, training_end_date DATE, meal_rule VARCHAR(20)"
            migrationFile: "database/migrations/001_extend_class_management.sql"
```

## 🔍 品質驗證 (QA Report) - 改進後

```yaml
storyReports:
  - reportId: "QA-STORY-1.1"
    storyId: "STORY-1.1"
    storyTitle: "擴展 tbl_class_management 表支援 EXT 和新增欄位"
    overallResult: "PASS"
    
    acceptanceCriteriaVerification:
      - id: "AC-1.1.1"
        description: "擴展 roster_type 支援 'EXT' 類型"
        devStatus: "Fulfilled"
        qaResult: "PASS"
        qaFinding: "✅ Vibe CEO 已驗證：roster_type CHECK 約束已擴展支援 'EXT'"
    
    # 🆕 新增：技術架構驗證
    technicalVerification:
      affectedDataModels: ["tbl_class_management"]
      databaseVerification:
        - table: "tbl_class_management"
          expectedChange: "擴展 roster_type 支援 'EXT' 類型"
          actualChange: "ALTER_CONSTRAINT: 支援 'YCB', 'ZZB', 'EXT'"
          verificationMethod: "SCHEMA_CHECK"
          qaResult: "PASS"
          qaFinding: "✅ 資料庫 schema 檢查通過，CHECK 約束正確擴展"
        
        - table: "tbl_class_management"
          expectedChange: "新增 training_start_date, training_end_date, meal_rule 欄位"
          actualChange: "ADD_COLUMN: 3 個新欄位已新增"
          verificationMethod: "SCHEMA_CHECK"
          qaResult: "PASS"
          qaFinding: "✅ 新欄位已正確新增，資料類型符合預期"
```

## 📊 衝刺總結 (Sprint Summary) - 改進後

```yaml
storyOutcomes:
  - storyId: "STORY-1.1"
    storyTitle: "擴展 tbl_class_management 表支援 EXT 和新增欄位"
    finalStatus: "Done"
    
    acceptanceCriteriaOutcome:
      - id: "AC-1.1.1"
        qaResult: "PASS"
        qaFinding: "✅ Vibe CEO 已驗證：roster_type CHECK 約束已擴展支援 'EXT'"
    
    # 🆕 新增：技術影響分析
    technicalImpact:
      affectedDataModels: ["tbl_class_management"]
      architecturalChanges:
        - component: "Database Schema"
          changeType: "MODIFY"
          plannedChange: "擴展 roster_type 支援 EXT，新增 3 個欄位"
          actualChange: "成功擴展約束，新增 training_start_date, training_end_date, meal_rule"
          verificationStatus: "VERIFIED"
          impact: "HIGH"
      
      crossReferenceAnalysis: |
        此故事的執行完全符合計畫預期。所有 3 個驗收標準都達成，
        QA 審計全部通過，沒有任何偏差。資料庫變更已通過 schema 驗證，
        是標準的成功交付案例。四方比對（計畫→執行→QA→總結）完全一致。
```

## 🎯 迭代結束 (Iteration Closing) - 現有

```yaml
asBuiltArchitecture:
  dataModels:
    - modelName: "tbl_class_management"
      status: "✅ 已擴展"
      changes: "新增 training_start_date, training_end_date, meal_rule 欄位，擴展 roster_type 支援 EXT"
```

---

## 🔄 技術串接對比

### ❌ 改進前的問題：
```
Sprint Plan (affectedDataModels) → Sprint Fillback (只有 changedFiles) → QA (無技術驗證) → Summary (無架構分析)
```
**結果**：無法追蹤資料庫變更是否符合計畫，QA 無法驗證技術實作

### ✅ 改進後的完整串接：
```
Sprint Plan (affectedDataModels) 
    ↓ 
Sprint Fillback (affectedDataModels + databaseChanges)
    ↓ 
QA Report (technicalVerification: 計畫 vs 實際)
    ↓ 
Sprint Summary (technicalImpact + crossReferenceAnalysis)
    ↓ 
Iteration Closing (asBuiltArchitecture)
```
**結果**：完整的技術變更追蹤鏈，確保資料庫和程式的依賴關係清晰可見

---

## 💡 關鍵改進點

1. **DEV 階段**：不只記錄檔案變更，還記錄具體的資料庫變更類型
2. **QA 階段**：可以驗證計畫的資料庫變更是否正確實作
3. **SM 階段**：提供完整的技術影響分析和四方交叉比對
4. **PS 階段**：基於準確的技術現狀進行下次迭代規劃

這樣就解決了「DATABASE 跟程式的依賴接不太起來」的問題！