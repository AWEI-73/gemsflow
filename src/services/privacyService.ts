/**
 * GEMS: generateStudentCode | P0 | ✓✓ | (year, seq, nameCode, subSeq) → string | Story-1.1 | 生成學員代號
 * GEMS-FLOW: 驗證輸入 → 格式化年度 → 格式化序號 → 組合字串 → 返回結果
 * GEMS-DEPS: []
 * GEMS-TEST: ✓ Unit | ✓ Integration | ✓ E2E | Coverage: 95%
 * GEMS-TEST-FILE: privacyService.test.ts
 */
export function generateStudentCode(
  year: number,
  sequence: number,
  nameCode: string,
  subSequence: number
): string {
  // GEMS-CRITICAL: 年度必須在 100-999 範圍內
  if (year < 100 || year > 999) {
    throw new Error('Invalid year format: must be between 100 and 999')
  }
  
  // GEMS-CRITICAL: 序號必須在 1-99 範圍內
  if (sequence < 1 || sequence > 99) {
    throw new Error('Invalid sequence: must be between 1 and 99')
  }
  
  // GEMS-CRITICAL: 姓名碼必須是 6 位大寫字母
  if (!/^[A-Z]{6}$/.test(nameCode)) {
    throw new Error('Invalid name code: must be 6 uppercase letters')
  }
  
  // GEMS-CRITICAL: 子序號必須在 1-99 範圍內
  if (subSequence < 1 || subSequence > 99) {
    throw new Error('Invalid sub sequence: must be between 1 and 99')
  }
  
  // GEMS-CRITICAL: 格式化並組合字串
  const formattedYear = year.toString().padStart(3, '0')
  const formattedSeq = sequence.toString().padStart(2, '0')
  const formattedSubSeq = subSequence.toString().padStart(2, '0')
  
  return `${formattedYear}-${formattedSeq}-${nameCode}-${formattedSubSeq}`
}

/**
 * GEMS: validateStudentCode | P0 | ✓✓ | (code) → ValidationResult | Story-1.1 | 驗證學員代號格式
 * GEMS-FLOW: 檢查格式 → 解析組件 → 驗證範圍 → 返回結果
 * GEMS-DEPS: []
 * GEMS-TEST: ✓ Unit | ✓ Integration | ✓ E2E | Coverage: 95%
 * GEMS-TEST-FILE: privacyService.test.ts
 */
export function validateStudentCode(code: string): { valid: boolean; error?: string } {
  // GEMS-CRITICAL: 檢查基本格式
  const pattern = /^(\d{3})-(\d{2})-([A-Z]{6})-(\d{2})$/
  const match = code.match(pattern)
  
  if (!match) {
    return { valid: false, error: 'Invalid format: must be YYY-XX-XXXXXX-XX' }
  }
  
  const [, yearStr, seqStr, nameCode, subSeqStr] = match
  const year = parseInt(yearStr, 10)
  const sequence = parseInt(seqStr, 10)
  const subSequence = parseInt(subSeqStr, 10)
  
  // GEMS-CRITICAL: 驗證各組件範圍
  if (year < 100 || year > 999) {
    return { valid: false, error: 'Invalid year: must be between 100 and 999' }
  }
  
  if (sequence < 1 || sequence > 99) {
    return { valid: false, error: 'Invalid sequence: must be between 1 and 99' }
  }
  
  if (subSequence < 1 || subSequence > 99) {
    return { valid: false, error: 'Invalid sub sequence: must be between 1 and 99' }
  }
  
  return { valid: true }
}

/**
 * GEMS: parseStudentCode | P1 | ✓✓ | (code) → ParsedCode | Story-1.1 | 解析學員代號組件
 * GEMS-FLOW: 驗證格式 → 解析組件 → 返回結構化資料
 * GEMS-DEPS: [validateStudentCode]
 * GEMS-TEST: ✓ Unit | ✓ Integration | Coverage: 90%
 * GEMS-TEST-FILE: privacyService.test.ts
 */
export function parseStudentCode(code: string): {
  year: number
  sequence: number
  nameCode: string
  subSequence: number
} | null {
  const validation = validateStudentCode(code)
  if (!validation.valid) {
    return null
  }
  
  const pattern = /^(\d{3})-(\d{2})-([A-Z]{6})-(\d{2})$/
  const match = code.match(pattern)
  
  if (!match) {
    return null
  }
  
  const [, yearStr, seqStr, nameCode, subSeqStr] = match
  
  return {
    year: parseInt(yearStr, 10),
    sequence: parseInt(seqStr, 10),
    nameCode,
    subSequence: parseInt(subSeqStr, 10)
  }
}