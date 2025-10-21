# GEMS 技術串接流程圖

## 🔄 完整技術串接流程

```mermaid
graph TB
    subgraph "迭代規劃階段"
        A[MVP Blueprint v3<br/>產品策略師 PS] --> B[Sprint Plan<br/>敏捷大師 SM]
    end
    
    subgraph "開發執行階段"
        B --> C[Sprint Fillback<br/>開發者 DEV]
        C --> D{變更提案<br/>需要嗎?}
        D -->|是| E[Sprint Change Proposal<br/>敏捷大師 SM]
        D -->|否| F[QA Report<br/>品管師 QA]
        E --> F
    end
    
    subgraph "總結分析階段"
        F --> G[Sprint Summary<br/>敏捷大師 SM]
        G --> H[Iteration Closing<br/>產品策略師 PS]
        H --> I[Product Report<br/>產品文檔師 PD]
    end
    
    subgraph "技術追蹤內容"
        J[資料庫架構<br/>dataModels]
        K[服務層變更<br/>serviceChanges]
        L[組件層變更<br/>componentChanges]
        M[技術驗證<br/>technicalVerification]
        N[架構影響分析<br/>technicalImpact]
    end
    
    A -.-> J
    B -.-> J
    C -.-> J
    C -.-> K
    C -.-> L
    F -.-> M
    G -.-> N
    H -.-> J
    
    style A fill:#e1f5fe
    style B fill:#e8f5e8
    style C fill:#fff3e0
    style F fill:#fce4ec
    style G fill:#f3e5f5
    style H fill:#e0f2f1
    style I fill:#fff8e1
```

## 📊 技術資料流向圖

```mermaid
flowchart LR
    subgraph "計畫階段"
        A1[architecture.dataModels<br/>📋 系統架構設計]
        A2[affectedDataModels<br/>📋 影響的資料表]
    end
    
    subgraph "執行階段 🆕"
        B1[affectedDataModels<br/>📝 實際影響表]
        B2[databaseChanges<br/>📝 資料庫變更]
        B3[serviceChanges<br/>📝 服務層變更]
        B4[componentChanges<br/>📝 組件層變更]
    end
    
    subgraph "驗證階段 🆕"
        C1[technicalVerification<br/>🔍 技術驗證]
        C2[databaseVerification<br/>🔍 資料庫驗證]
        C3[serviceVerification<br/>🔍 服務驗證]
    end
    
    subgraph "分析階段 🆕"
        D1[technicalImpact<br/>📊 技術影響分析]
        D2[architecturalChanges<br/>📊 架構變更分析]
        D3[crossReferenceAnalysis<br/>📊 四方交叉比對]
    end
    
    subgraph "總結階段"
        E1[asBuiltArchitecture<br/>🏗️ 竣工架構]
        E2[codebaseStructure<br/>🏗️ 程式碼結構]
    end
    
    A1 --> A2
    A2 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> B4
    
    B1 --> C1
    B2 --> C2
    B3 --> C3
    
    C1 --> D1
    C2 --> D2
    C3 --> D3
    
    D1 --> E1
    D2 --> E2
    
    style A1 fill:#e3f2fd
    style A2 fill:#e3f2fd
    style B1 fill:#fff3e0
    style B2 fill:#fff3e0
    style B3 fill:#fff3e0
    style B4 fill:#fff3e0
    style C1 fill:#fce4ec
    style C2 fill:#fce4ec
    style C3 fill:#fce4ec
    style D1 fill:#f3e5f5
    style D2 fill:#f3e5f5
    style D3 fill:#f3e5f5
    style E1 fill:#e0f2f1
    style E2 fill:#e0f2f1
```

## 🔍 四方交叉比對流程

```mermaid
graph TD
    subgraph "四方交叉比對 (Four-Way Cross Reference)"
        A[Sprint Plan<br/>計畫的 affectedDataModels] 
        B[Sprint Fillback<br/>實際的 databaseChanges]
        C[QA Report<br/>technicalVerification]
        D[Sprint Summary<br/>technicalImpact]
    end
    
    A -->|比對| E{計畫 vs 實際<br/>是否一致?}
    B -->|比對| E
    
    E -->|一致| F[✅ PASS<br/>技術實作符合計畫]
    E -->|不一致| G[❌ DEVIATION<br/>記錄偏差原因]
    
    B -->|驗證| H{實際 vs QA<br/>是否通過?}
    C -->|驗證| H
    
    H -->|通過| I[✅ VERIFIED<br/>QA 驗證通過]
    H -->|失敗| J[❌ FAILED<br/>QA 發現問題]
    
    C -->|整合| K{QA vs 總結<br/>是否完整?}
    D -->|整合| K
    
    K -->|完整| L[✅ COMPLETE<br/>四方比對閉環]
    K -->|缺失| M[⚠️ INCOMPLETE<br/>需要補充分析]
    
    F --> N[最終技術狀態<br/>asBuiltArchitecture]
    I --> N
    L --> N
    
    style E fill:#fff3e0
    style H fill:#fce4ec
    style K fill:#f3e5f5
    style N fill:#e0f2f1
```

## 📋 各階段技術追蹤對比表

| 階段 | 原有內容 | 🆕 新增內容 | 目的 |
|------|----------|-------------|------|
| **MVP Blueprint** | ✅ architecture.dataModels<br/>✅ affectedDataModels | - | 系統架構設計 |
| **Sprint Plan** | ✅ affectedDataModels | - | 計畫階段追蹤 |
| **Sprint Fillback** | ❌ 只有 changedFiles | 🆕 affectedDataModels<br/>🆕 databaseChanges<br/>🆕 serviceChanges<br/>🆕 componentChanges | 實際執行追蹤 |
| **QA Report** | ❌ 無技術驗證 | 🆕 technicalVerification<br/>🆕 databaseVerification<br/>🆕 serviceVerification | 技術實作驗證 |
| **Sprint Summary** | ❌ 無架構分析 | 🆕 technicalImpact<br/>🆕 architecturalChanges<br/>🆕 crossReferenceAnalysis | 技術影響分析 |
| **Iteration Closing** | ✅ asBuiltArchitecture | - | 竣工架構總結 |

## 🎯 技術串接範例：STORY-1.1

```mermaid
sequenceDiagram
    participant PS as 產品策略師<br/>MVP Blueprint
    participant SM as 敏捷大師<br/>Sprint Plan
    participant DEV as 開發者<br/>Sprint Fillback
    participant QA as 品管師<br/>QA Report
    participant SM2 as 敏捷大師<br/>Sprint Summary
    participant PS2 as 產品策略師<br/>Iteration Closing
    
    Note over PS: 📋 計畫階段
    PS->>SM: affectedDataModels: ["tbl_class_management"]
    
    Note over SM: 📋 規劃階段
    SM->>DEV: affectedDataModels: ["tbl_class_management"]
    
    Note over DEV: 🔧 執行階段
    DEV->>DEV: 實作資料庫遷移
    DEV->>QA: affectedDataModels: ["tbl_class_management"]<br/>databaseChanges: ALTER_CONSTRAINT
    
    Note over QA: 🔍 驗證階段
    QA->>QA: 驗證資料庫 schema
    QA->>SM2: technicalVerification: PASS<br/>databaseVerification: PASS
    
    Note over SM2: 📊 分析階段
    SM2->>SM2: 四方交叉比對
    SM2->>PS2: technicalImpact: HIGH<br/>architecturalChanges: VERIFIED
    
    Note over PS2: 🏗️ 總結階段
    PS2->>PS2: 更新 asBuiltArchitecture
```

## 💡 關鍵改進點

### 🔴 改進前的問題
```
MVP Blueprint → Sprint Plan → ❌ 斷層 ❌ → Iteration Closing
```

### 🟢 改進後的完整串接
```
MVP Blueprint → Sprint Plan → Sprint Fillback → QA Report → Sprint Summary → Iteration Closing
     ✅            ✅            🆕             🆕           🆕              ✅
```

### 🎯 解決的核心問題
1. **資料庫變更追蹤**：從計畫到實作到驗證的完整鏈路
2. **技術驗證機制**：QA 可以驗證技術實作是否符合計畫
3. **四方交叉比對**：確保計畫→執行→驗證→總結完全閉環
4. **架構演進記錄**：清楚追蹤系統架構的演進過程

---

**🚀 現在 DATABASE 和程式的依賴關係在整個 GEMS 工作流程中都能被有效追蹤和驗證了！**