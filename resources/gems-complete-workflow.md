# GEMS 完整工作流程圖 (Complete Workflow)

## 🌟 GEMS 全角色運行流程總覽

```mermaid
graph TB
    subgraph "🎯 迭代規劃階段 (Iteration Planning)"
        A[👤 Vibe CEO<br/>提供願景和需求] --> B[🔍 全棧分析師<br/>Full-Stack Analyst<br/>需求分析和技術評估]
        B --> C[🏗️ 系統結構師<br/>Pragmatic System Architect<br/>架構設計和技術選型]
        C --> D[📋 產品策略師<br/>Product Strategist PS<br/>MVP Blueprint v3]
    end
    
    subgraph "⚡ Sprint 規劃階段 (Sprint Planning)"
        D --> E[🎯 敏捷大師<br/>Scrum Master SM<br/>Sprint Plan]
    end
    
    subgraph "🔧 開發執行階段 (Development Execution)"
        E --> F[💻 開發者<br/>Developer DEV<br/>程式碼實作]
        F --> G{🚨 例外處理<br/>需要嗎?}
        G -->|戰略性阻礙| H[🎯 敏捷大師<br/>Sprint Change Proposal]
        G -->|正常進行| I[💻 開發者<br/>Sprint Fillback]
        H --> I
        I --> I1{🚀 有隱性迭代<br/>或戰術修正?}
        I1 -->|是| I2[🎯 敏捷大師<br/>Change Proposal 記錄]
        I1 -->|否| I3[✅ 進入 QA 階段]
        I2 --> I3
    end
    
    subgraph "🔍 品質驗收階段 (Quality Assurance)"
        I3 --> J[🛡️ 品管師<br/>Quality Assurance QA<br/>QA Consolidated Report]
    end
    
    subgraph "📊 總結分析階段 (Summary & Analysis)"
        J --> K[🎯 敏捷大師<br/>Sprint Summary Report]
        K --> L[📋 產品策略師<br/>Iteration Closing Report]
    end
    
    subgraph "📚 文檔更新階段 (Documentation Update)"
        L --> M[📝 產品文檔師<br/>Product Documentarian PD<br/>Product Report Update]
        M --> N[🔄 程式碼備份<br/>Iteration Backup]
    end
    
    subgraph "🔄 下次迭代準備 (Next Iteration Prep)"
        N --> O{🎯 開始新迭代?}
        O -->|是| D
        O -->|否| P[✅ 專案完成]
    end
    
    style A fill:#ffebee
    style B fill:#e8f5e8
    style C fill:#e3f2fd
    style D fill:#fff3e0
    style E fill:#f3e5f5
    style F fill:#e0f2f1
    style J fill:#fce4ec
    style K fill:#f3e5f5
    style L fill:#fff3e0
    style M fill:#fff8e1
```

## 🎭 GEMS 7 大角色詳細流程

```mermaid
flowchart TD
    subgraph "角色 1: 全棧分析師 (Full-Stack Analyst)"
        A1[📥 接收 Vibe CEO 需求]
        A2[🔍 技術可行性分析]
        A3[📊 資源評估和風險分析]
        A4[📋 需求規格書產出]
        A1 --> A2 --> A3 --> A4
    end
    
    subgraph "角色 2: 系統結構師 (Pragmatic System Architect)"
        B1[📥 接收需求規格書]
        B2[🏗️ 系統架構設計]
        B3[🔧 技術棧選型]
        B4[📐 資料模型設計]
        B5[📋 架構藍圖產出]
        B1 --> B2 --> B3 --> B4 --> B5
    end
    
    subgraph "角色 3: 產品策略師 (Product Strategist PS)"
        C1[📥 接收架構藍圖]
        C2[📋 Epic 和 Story 規劃]
        C3[🎯 迭代目標設定]
        C4[📊 風險和約束分析]
        C5[📄 MVP Blueprint v3 產出]
        C1 --> C2 --> C3 --> C4 --> C5
        
        C6[📥 接收 Sprint Summary]
        C7[🔍 迭代成果分析]
        C8[📊 架構演進評估]
        C9[🎯 下次迭代候選項目]
        C10[📄 Iteration Closing 產出]
        C6 --> C7 --> C8 --> C9 --> C10
    end
    
    subgraph "角色 4: 敏捷大師 (Scrum Master SM)"
        D1[📥 接收 MVP Blueprint]
        D2[📋 Story 轉 Task 分解]
        D3[⏰ 時間估算和依賴分析]
        D4[📄 Sprint Plan 產出]
        D1 --> D2 --> D3 --> D4
        
        D5[📥 接收例外情況]
        D6[🔍 變更影響分析]
        D7[📊 風險評估]
        D8[📄 Sprint Change Proposal 產出]
        D5 --> D6 --> D7 --> D8
        
        D9[📥 接收 QA Report]
        D10[🔍 四方交叉比對稽核]
        D11[📊 技術影響分析]
        D12[📄 Sprint Summary 產出]
        D9 --> D10 --> D11 --> D12
    end
    
    subgraph "角色 5: 開發者 (Developer DEV)"
        E1[📥 接收 Sprint Plan]
        E2[💻 程式碼實作]
        E3[🧪 自動化測試]
        E4[📝 技術架構追蹤]
        E5[📄 Sprint Fillback 更新]
        E1 --> E2 --> E3 --> E4 --> E5
        
        E6{🚨 遇到問題?}
        E7[🔧 戰術性修正]
        E8[🚀 隱性迭代優化]
        E9[🚨 戰略性阻礙上報]
        E10[📝 完成 Sprint Fillback]
        E11{📊 需要變更記錄?}
        E12[🎯 提交 Change Proposal]
        E6 --> E7
        E6 --> E8
        E6 --> E9
        E7 --> E10
        E8 --> E10
        E10 --> E11
        E11 -->|有 TACTICAL_FIX 或<br/>IMPLICIT_ITERATION| E12
        E11 -->|無變更| F1
    end
    
    subgraph "角色 6: 品管師 (Quality Assurance QA)"
        F1[📥 接收 Sprint Fillback]
        F2[🔍 驗收標準驗證]
        F3[🧪 必要測試驗證]
        F4[📊 技術架構驗證]
        F5[📋 開發日誌審查]
        F6[📄 QA Consolidated Report 產出]
        F1 --> F2 --> F3 --> F4 --> F5 --> F6
    end
    
    subgraph "角色 7: 產品文檔師 (Product Documentarian PD)"
        G1[📥 接收 Iteration Closing]
        G2[🔍 專案結構掃描]
        G3[📊 程式碼模組分析]
        G4[📈 品質指標統計]
        G5[📄 Product Report 更新]
        G1 --> G2 --> G3 --> G4 --> G5
    end
    
    A4 --> B1
    B5 --> C1
    C5 --> D1
    D4 --> E1
    E5 --> F1
    E9 --> D5
    D8 --> F1
    F6 --> D9
    D12 --> C6
    C10 --> G1
    
    style A1 fill:#e8f5e8
    style B1 fill:#e3f2fd
    style C1 fill:#fff3e0
    style D1 fill:#f3e5f5
    style E1 fill:#e0f2f1
    style F1 fill:#fce4ec
    style G1 fill:#fff8e1
```

## 🔄 GEMS 工作流程時序圖

```mermaid
sequenceDiagram
    participant CEO as 👤 Vibe CEO
    participant FSA as 🔍 全棧分析師
    participant PSA as 🏗️ 系統結構師
    participant PS as 📋 產品策略師
    participant SM as 🎯 敏捷大師
    participant DEV as 💻 開發者
    participant QA as 🛡️ 品管師
    participant PD as 📝 產品文檔師
    
    Note over CEO,PD: 🎯 迭代開始
    
    CEO->>FSA: 💡 提供產品願景和需求
    FSA->>FSA: 🔍 需求分析和技術評估
    FSA->>PSA: 📋 需求規格書
    
    PSA->>PSA: 🏗️ 系統架構設計
    PSA->>PS: 📐 架構藍圖
    
    PS->>PS: 📋 Epic 和 Story 規劃
    PS->>SM: 📄 MVP Blueprint v3
    
    Note over CEO,PD: ⚡ Sprint 開始
    
    SM->>SM: 📋 Story 轉 Task 分解
    SM->>DEV: 📄 Sprint Plan
    
    loop 開發循環
        DEV->>DEV: 💻 程式碼實作
        DEV->>DEV: 🧪 自動化測試
        
        alt 正常進行
            DEV->>DEV: 📝 更新 Sprint Fillback
        else 戰術性問題
            DEV->>DEV: 🔧 戰術性修正 (TACTICAL_FIX)
        else 隱性迭代
            DEV->>DEV: � 隱性性迭代優化 (IMPLICIT_ITERATION)
        else 戰略性阻礙
            DEV->>SM: � 戰略性阻礙上報C
            SM->>SM: 🔍 變更影響分析
            SM->>DEV: 📄 Sprint Change Proposal
        end
    end
    
    DEV->>DEV: 📝 完成 Sprint Fillback
    
    alt 有變更記錄
        DEV->>SM: 🚀 提交 TACTICAL_FIX 或 IMPLICIT_ITERATION
        SM->>SM: 📊 分析變更影響和價值
        SM->>QA: 📄 Sprint Change Proposal (事後記錄)
    else 無變更
        DEV->>QA: 📄 Sprint Fillback (直接進入 QA)
    end
    
    QA->>QA: 🔍 驗收標準驗證
    QA->>QA: 🧪 技術架構驗證
    QA->>SM: 📄 QA Consolidated Report
    
    SM->>SM: 🔍 四方交叉比對稽核
    SM->>PS: 📄 Sprint Summary Report
    
    Note over CEO,PD: 📊 迭代結束
    
    PS->>PS: 🔍 迭代成果分析
    PS->>PD: 📄 Iteration Closing Report
    
    PD->>PD: 🔍 專案結構掃描
    PD->>CEO: 📄 Product Report (更新)
    
    Note over CEO,PD: 🔄 下次迭代準備
    
    CEO->>PS: 🎯 開始新迭代?
```

## 📋 GEMS 角色職責矩陣

| 階段 | 主要角色 | 輸入文件 | 核心任務 | 輸出文件 | 協作角色 |
|------|----------|----------|----------|----------|----------|
| **需求分析** | 🔍 全棧分析師 | Vibe CEO 需求 | 技術可行性分析 | 需求規格書 | 👤 Vibe CEO |
| **架構設計** | 🏗️ 系統結構師 | 需求規格書 | 系統架構設計 | 架構藍圖 | 🔍 全棧分析師 |
| **迭代規劃** | 📋 產品策略師 | 架構藍圖 | Epic/Story 規劃 | MVP Blueprint v3 | 🏗️ 系統結構師 |
| **Sprint 規劃** | 🎯 敏捷大師 | MVP Blueprint v3 | Task 分解和估算 | Sprint Plan | 📋 產品策略師 |
| **開發執行** | 💻 開發者 | Sprint Plan | 程式碼實作和測試 | Sprint Fillback | 🎯 敏捷大師 |
| **變更記錄** | 🎯 敏捷大師 | Sprint Fillback | 隱性迭代和戰術修正分析 | Sprint Change Proposal | 💻 開發者 |
| **例外處理** | 🎯 敏捷大師 | 戰略性阻礙上報 | 緊急變更影響分析 | Sprint Change Proposal | 💻 開發者 |
| **品質驗收** | 🛡️ 品管師 | Sprint Fillback | 驗收和技術驗證 | QA Consolidated Report | 💻 開發者 |
| **Sprint 總結** | 🎯 敏捷大師 | QA Report | 四方交叉比對 | Sprint Summary Report | 🛡️ 品管師 |
| **迭代結束** | 📋 產品策略師 | Sprint Summary | 成果分析和規劃 | Iteration Closing Report | 🎯 敏捷大師 |
| **文檔更新** | 📝 產品文檔師 | Iteration Closing | 專案文檔維護 | Product Report | 📋 產品策略師 |

## 🎯 GEMS 決策流程圖

```mermaid
flowchart TD
    A[👤 Vibe CEO 提供願景] --> B{🔍 技術可行性?}
    
    B -->|可行| C[🏗️ 架構設計]
    B -->|不可行| D[🔄 需求調整]
    D --> A
    
    C --> E[📋 迭代規劃]
    E --> F[🎯 Sprint 規劃]
    F --> G[💻 開發執行]
    
    G --> H{🚨 遇到問題?}
    H -->|戰術性問題| I[🔧 開發者自行解決]
    H -->|隱性迭代機會| I1[🚀 開發者優化實作]
    H -->|戰略性阻礙| J[🎯 敏捷大師分析]
    H -->|正常進行| K1[📝 完成 Sprint Fillback]
    
    I --> K1
    I1 --> K1
    K1 --> K2{� 有變更 記錄?}
    K2 -->|有 TACTICAL_FIX<br/>或 IMPLICIT_ITERATION| K3[🎯 敏捷大師記錄變更]
    K2 -->|無變更| K[🛡️ QA 驗收]
    K3 --> K
    
    J --> L{📊 變更影響?}
    L -->|可接受| M[📄 變更提案批准]
    L -->|不可接受| N[🔄 重新規劃]
    
    M --> K
    N --> F
    
    K --> O{✅ QA 通過?}
    O -->|通過| P[📊 Sprint 總結]
    O -->|失敗| Q[🔄 返回開發]
    
    Q --> G
    P --> R[📋 迭代結束]
    R --> S{🎯 繼續迭代?}
    
    S -->|是| T[🔄 下次迭代規劃]
    S -->|否| U[✅ 專案完成]
    
    T --> E
    
    style A fill:#ffebee
    style C fill:#e3f2fd
    style E fill:#fff3e0
    style G fill:#e0f2f1
    style K fill:#fce4ec
    style P fill:#f3e5f5
    style R fill:#fff3e0
    style U fill:#c8e6c9
```

## � 隱E性迭代和變更管理流程

```mermaid
flowchart TD
    A[💻 開發者完成程式碼] --> B{🔍 開發過程中有變更?}
    
    B -->|無變更| C[📝 直接完成 Sprint Fillback]
    B -->|有變更| D{📊 變更類型分析}
    
    D -->|🔧 TACTICAL_FIX| E[戰術性修正<br/>- Bug 修復<br/>- 小範圍調整<br/>- 技術問題解決]
    D -->|🚀 IMPLICIT_ITERATION| F[隱性迭代<br/>- UI/UX 優化<br/>- 效能提升<br/>- 程式碼重構<br/>- 新增便利功能]
    D -->|🚨 STRATEGIC_BLOCKER| G[戰略性阻礙<br/>- 影響 Sprint 目標<br/>- 需求理解偏差<br/>- 重大技術問題]
    
    E --> H[📝 記錄在 Sprint Fillback<br/>logType: TACTICAL_FIX]
    F --> I[📝 記錄在 Sprint Fillback<br/>logType: IMPLICIT_ITERATION]
    G --> J[🚨 立即上報敏捷大師<br/>暫停開發]
    
    H --> K[📝 完成 Sprint Fillback]
    I --> K
    C --> K
    
    K --> L{📊 需要變更提案記錄?}
    L -->|有 TACTICAL_FIX 或<br/>IMPLICIT_ITERATION| M[🎯 敏捷大師分析]
    L -->|無變更記錄| N[✅ 直接進入 QA]
    
    M --> O[📄 產出 Sprint Change Proposal<br/>- 變更分類和影響分析<br/>- 價值評估<br/>- 風險評估]
    O --> P[📋 變更記錄歸檔]
    P --> N
    
    J --> Q[🎯 敏捷大師緊急分析]
    Q --> R{📊 影響評估}
    R -->|可接受| S[📄 緊急變更提案]
    R -->|不可接受| T[🔄 重新規劃 Sprint]
    S --> N
    T --> U[📋 回到 Sprint Planning]
    
    style E fill:#fff3e0
    style F fill:#e8f5e8
    style G fill:#ffebee
    style M fill:#f3e5f5
    style Q fill:#f3e5f5
```

## 🔧 GEMS 工具和自動化

```mermaid
graph LR
    subgraph "🛠️ 開發工具"
        A1[Git 版本控制]
        A2[Vitest 測試框架]
        A3[TypeScript 類型檢查]
        A4[ESLint 程式碼檢查]
    end
    
    subgraph "📊 管理工具"
        B1[YAML 文件管理]
        B2[迭代備份腳本]
        B3[專案結構掃描]
        B4[品質指標統計]
    end
    
    subgraph "🔄 自動化流程"
        C1[GEMS 工作流程規範]
        C2[角色提示詞系統]
        C3[技術串接追蹤]
        C4[四方交叉比對]
    end
    
    A1 --> B1
    A2 --> B4
    A3 --> B4
    A4 --> B4
    
    B1 --> C1
    B2 --> C1
    B3 --> C3
    B4 --> C4
```

---

## 🎯 GEMS 工作流程特色

### ✨ 核心優勢
1. **🔄 完整閉環**：從需求到交付的完整追蹤
2. **🎭 角色分工**：7 個專業角色各司其職
3. **🔍 品質保證**：多層次的驗證和稽核機制
4. **📊 數據驅動**：基於實際執行數據的決策
5. **🚀 持續改進**：每次迭代都有學習和優化
6. **💡 變更管理**：完善的隱性迭代和戰術修正追蹤機制

### 🎯 適用場景
- 中小型軟體專案開發
- 敏捷開發團隊管理
- 技術債務控制
- 品質驅動的開發流程
- 迭代式產品開發

### 🚀 隱性迭代管理特色

**GEMS 獨特的三層變更管理機制**：

1. **🔧 TACTICAL_FIX** - 戰術性修正
   - 開發過程中的 Bug 修復和小範圍調整
   - 開發者權限內可自行處理
   - 需在 Sprint Fillback 中記錄

2. **🚀 IMPLICIT_ITERATION** - 隱性迭代
   - 超越原始需求的價值創造（如 UI 優化、效能提升）
   - 體現開發者的主動性和用戶導向思維
   - 需在 Sprint Fillback 中記錄並產生 Change Proposal

3. **🚨 STRATEGIC_BLOCKER** - 戰略性阻礙
   - 影響 Sprint 目標的重大問題
   - 需立即上報並暫停開發
   - 由敏捷大師進行影響分析和決策

**變更記錄流程**：
```
Sprint Fillback 完成 → 檢查變更記錄 → 產生 Change Proposal → 進入 QA 階段
```

**🌟 GEMS = 高效能 × 高品質 × 高可追溯性 × 完善變更管理的完美結合！**