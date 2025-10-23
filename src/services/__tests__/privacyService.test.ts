import { generateStudentCode, validateStudentCode, parseStudentCode } from '../privacyService'

describe('PrivacyService', () => {
  // 單元測試
  describe('Unit Tests', () => {
    describe('generateStudentCode', () => {
      test('應正確生成標準學員代號', () => {
        const result = generateStudentCode(113, 1, 'ABCDEF', 5)
        expect(result).toBe('113-1-ABCDEF-05')
      })

      test('邊界測試: 年度下限 100', () => {
        const result = generateStudentCode(100, 1, 'ABCDEF', 1)
        expect(result).toBe('100-1-ABCDEF-01')
      })

      test('邊界測試: 年度上限 999', () => {
        const result = generateStudentCode(999, 99, 'ABCDEF', 99)
        expect(result).toBe('999-99-ABCDEF-99')
      })

      test('應拒絕無效的年度格式 - 小於 100', () => {
        expect(() => generateStudentCode(99, 1, 'ABCDEF', 5))
          .toThrow('Invalid year format: must be between 100 and 999')
      })

      test('應拒絕無效的年度格式 - 大於 999', () => {
        expect(() => generateStudentCode(1000, 1, 'ABCDEF', 5))
          .toThrow('Invalid year format: must be between 100 and 999')
      })

      test('應拒絕無效的序號 - 小於 1', () => {
        expect(() => generateStudentCode(113, 0, 'ABCDEF', 5))
          .toThrow('Invalid sequence: must be between 1 and 99')
      })

      test('應拒絕無效的序號 - 大於 99', () => {
        expect(() => generateStudentCode(113, 100, 'ABCDEF', 5))
          .toThrow('Invalid sequence: must be between 1 and 99')
      })

      test('應拒絕無效的姓名碼 - 長度不足', () => {
        expect(() => generateStudentCode(113, 1, 'ABCDE', 5))
          .toThrow('Invalid name code: must be 6 uppercase letters')
      })

      test('應拒絕無效的姓名碼 - 包含小寫字母', () => {
        expect(() => generateStudentCode(113, 1, 'abcdef', 5))
          .toThrow('Invalid name code: must be 6 uppercase letters')
      })

      test('應拒絕無效的姓名碼 - 包含數字', () => {
        expect(() => generateStudentCode(113, 1, 'ABCDE1', 5))
          .toThrow('Invalid name code: must be 6 uppercase letters')
      })

      test('應拒絕無效的子序號 - 小於 1', () => {
        expect(() => generateStudentCode(113, 1, 'ABCDEF', 0))
          .toThrow('Invalid sub sequence: must be between 1 and 99')
      })

      test('應拒絕無效的子序號 - 大於 99', () => {
        expect(() => generateStudentCode(113, 1, 'ABCDEF', 100))
          .toThrow('Invalid sub sequence: must be between 1 and 99')
      })
    })

    describe('validateStudentCode', () => {
      test('應驗證正確格式的代號', () => {
        const result = validateStudentCode('113-1-ABCDEF-05')
        expect(result.valid).toBe(true)
        expect(result.error).toBeUndefined()
      })

      test('應拒絕錯誤格式 - 缺少分隔符', () => {
        const result = validateStudentCode('1131ABCDEF05')
        expect(result.valid).toBe(false)
        expect(result.error).toBe('Invalid format: must be YYY-XX-XXXXXX-XX')
      })

      test('應拒絕錯誤格式 - 年度不足3位', () => {
        const result = validateStudentCode('13-1-ABCDEF-05')
        expect(result.valid).toBe(false)
        expect(result.error).toBe('Invalid format: must be YYY-XX-XXXXXX-XX')
      })

      test('應拒絕錯誤格式 - 姓名碼不足6位', () => {
        const result = validateStudentCode('113-1-ABCDE-05')
        expect(result.valid).toBe(false)
        expect(result.error).toBe('Invalid format: must be YYY-XX-XXXXXX-XX')
      })

      test('應拒絕年度超出範圍 - 小於 100', () => {
        const result = validateStudentCode('099-1-ABCDEF-05')
        expect(result.valid).toBe(false)
        expect(result.error).toBe('Invalid year: must be between 100 and 999')
      })

      test('應拒絕年度超出範圍 - 大於 999', () => {
        const result = validateStudentCode('1000-1-ABCDEF-05')
        expect(result.valid).toBe(false)
        expect(result.error).toBe('Invalid year: must be between 100 and 999')
      })

      test('應拒絕序號超出範圍 - 小於 1', () => {
        const result = validateStudentCode('113-00-ABCDEF-05')
        expect(result.valid).toBe(false)
        expect(result.error).toBe('Invalid sequence: must be between 1 and 99')
      })

      test('應拒絕序號超出範圍 - 大於 99', () => {
        const result = validateStudentCode('113-100-ABCDEF-05')
        expect(result.valid).toBe(false)
        expect(result.error).toBe('Invalid sequence: must be between 1 and 99')
      })
    })

    describe('parseStudentCode', () => {
      test('應正確解析有效代號', () => {
        const result = parseStudentCode('113-1-ABCDEF-05')
        expect(result).toEqual({
          year: 113,
          sequence: 1,
          nameCode: 'ABCDEF',
          subSequence: 5
        })
      })

      test('應返回 null 對於無效代號', () => {
        const result = parseStudentCode('invalid-code')
        expect(result).toBeNull()
      })

      test('應正確解析邊界值', () => {
        const result = parseStudentCode('100-1-ABCDEF-01')
        expect(result).toEqual({
          year: 100,
          sequence: 1,
          nameCode: 'ABCDEF',
          subSequence: 1
        })
      })
    })
  })

  // 整合測試
  describe('Integration Tests', () => {
    test('完整流程: 生成→驗證→解析', () => {
      // 生成代號
      const code = generateStudentCode(113, 1, 'ABCDEF', 5)
      expect(code).toBe('113-1-ABCDEF-05')

      // 驗證代號
      const validation = validateStudentCode(code)
      expect(validation.valid).toBe(true)

      // 解析代號
      const parsed = parseStudentCode(code)
      expect(parsed).toEqual({
        year: 113,
        sequence: 1,
        nameCode: 'ABCDEF',
        subSequence: 5
      })
    })

    test('批量生成和驗證', () => {
      const testCases = [
        { year: 100, seq: 1, name: 'ABCDEF', sub: 1 },
        { year: 500, seq: 50, name: 'XYZABC', sub: 50 },
        { year: 999, seq: 99, name: 'DEFGHI', sub: 99 }
      ]

      testCases.forEach(({ year, seq, name, sub }) => {
        const code = generateStudentCode(year, seq, name, sub)
        const validation = validateStudentCode(code)
        const parsed = parseStudentCode(code)

        expect(validation.valid).toBe(true)
        expect(parsed).toEqual({ year, sequence: seq, nameCode: name, subSequence: sub })
      })
    })
  })

  // E2E 測試
  describe('E2E Tests', () => {
    test('端對端學員註冊流程', () => {
      // 模擬學員註冊流程
      const studentData = {
        year: 113,
        sequence: 1,
        nameCode: 'ABCDEF',
        subSequence: 5
      }

      // 生成學員代號
      const studentCode = generateStudentCode(
        studentData.year,
        studentData.sequence,
        studentData.nameCode,
        studentData.subSequence
      )

      // 驗證生成的代號
      const validation = validateStudentCode(studentCode)
      expect(validation.valid).toBe(true)

      // 解析並確認資料一致性
      const parsedData = parseStudentCode(studentCode)
      expect(parsedData).toEqual(studentData)

      // 確認代號格式正確
      expect(studentCode).toMatch(/^\d{3}-\d{2}-[A-Z]{6}-\d{2}$/)
    })

    test('錯誤處理流程', () => {
      // 測試各種錯誤情況的處理
      const invalidInputs = [
        { year: 99, seq: 1, name: 'ABCDEF', sub: 5 },
        { year: 113, seq: 0, name: 'ABCDEF', sub: 5 },
        { year: 113, seq: 1, name: 'abc', sub: 5 },
        { year: 113, seq: 1, name: 'ABCDEF', sub: 0 }
      ]

      invalidInputs.forEach(({ year, seq, name, sub }) => {
        expect(() => generateStudentCode(year, seq, name, sub)).toThrow()
      })
    })
  })
})

// Console 可執行函式
function runPrivacyServiceTests() {
  console.log('🧪 開始 PrivacyService 測試...')
  
  try {
    // 測試生成功能
    const result1 = generateStudentCode(113, 1, 'ABCDEF', 5)
    console.assert(result1 === '113-1-ABCDEF-05', '❌ 標準代號生成失敗')
    
    // 測試驗證功能
    const result2 = validateStudentCode('113-1-ABCDEF-05')
    console.assert(result2.valid === true, '❌ 代號驗證失敗')
    
    // 測試解析功能
    const result3 = parseStudentCode('113-1-ABCDEF-05')
    console.assert(result3?.year === 113, '❌ 代號解析失敗')
    
    console.log('✅ 所有測試通過')
    return { passed: 3, failed: 0, total: 3 }
  } catch (error) {
    console.error('❌ 測試失敗:', error)
    return { passed: 0, failed: 3, total: 3 }
  }
}

if (typeof window !== 'undefined') {
  window.runPrivacyServiceTests = runPrivacyServiceTests
}