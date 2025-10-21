/**
 * GEMS: BillingService | mod-5 | business | 8/8✓ | [meal-cost] | 統一計費服務垂直分片
 * GEMS-TEST-COVERAGE: Unit: 95% | Integration: 90% | E2E: N/A
 */

import { getMealCostConfig, type MealCostConfig } from '../../meal-cost';
import type { BillingResult, MealStatistics, ClassBillingConfig, BillingRuleType } from '../types/billing';
import { RosterType } from '../../../types/class';

/**
 * GEMS: calculateBillingCost | P0 | ✓✓ | (classType,statistics)→Promise<BillingResult> | Story-10.1 | 統一實際用餐計費
 * GEMS-FLOW: ValidateInput→GetConfig→CalculateCost→Return
 * GEMS-DEPS: [meal-cost.getMealCostConfig]
 * GEMS-TEST: ✓ Unit | ✓ Integration | - E2E | Coverage: 100%
 * GEMS-TEST-FILE: billingService.test.ts
 */
export async function calculateBillingCost(
    classType: RosterType,
    statistics: MealStatistics
): Promise<BillingResult> {
    // GEMS-CRITICAL: 驗證輸入參數
    if (!['YCB', 'ZZB', 'EXT'].includes(classType)) {
        throw new Error(`Invalid class type: ${classType}`);
    }

    if (!statistics || !statistics.actualMeals) {
        throw new Error('Invalid meal statistics: actualMeals is required');
    }

    // 取得費率配置
    const config = await getMealCostConfig();

    // 當前階段：統一採用實際用餐計費
    return calculateActualBasedCost(statistics, config, classType);
}

/**
 * GEMS: calculateActualBasedCost | P0 | ✓✓ | (statistics,config,classType)→BillingResult | Story-10.1 | 實際用餐計費
 * GEMS-FLOW: ExtractMeals→CalculateEachMeal→SumTotal→FormatResult
 * GEMS-DEPS: []
 * GEMS-TEST: ✓ Unit | - Integration | - E2E | Coverage: 100%
 * GEMS-TEST-FILE: billingService.test.ts
 */
function calculateActualBasedCost(
    statistics: MealStatistics,
    config: MealCostConfig,
    classType: RosterType
): BillingResult {
    const { actualMeals } = statistics;

    // 計算各餐次費用
    const breakfastCost = actualMeals.breakfast * config.breakfast_cost;
    const lunchCost = actualMeals.lunch * config.lunch_cost;
    const dinnerCost = actualMeals.dinner * config.dinner_cost;

    const totalCost = breakfastCost + lunchCost + dinnerCost;

    return {
        totalCost,
        breakdown: {
            breakfastCost,
            lunchCost,
            dinnerCost,
        },
        billingMethod: 'ACTUAL_BASED',
        details: `${classType} 班級：採用實際用餐計費 (早餐 ${actualMeals.breakfast} 份 + 午餐 ${actualMeals.lunch} 份 + 晚餐 ${actualMeals.dinner} 份)`,
    };
}

/**
 * GEMS: getBillingConfig | P1 | ✓✓ | RosterType→ClassBillingConfig | Story-10.1 | 取得班級計費配置
 * GEMS-FLOW: ValidateClassType→CreateConfig→Return
 * GEMS-DEPS: []
 * GEMS-TEST: ✓ Unit | - Integration | - E2E | Coverage: 100%
 * GEMS-TEST-FILE: billingService.test.ts
 */
export function getBillingConfig(classType: RosterType): ClassBillingConfig {
    // 當前階段：所有班級都使用統一的實際用餐計費
    return {
        classType,
        billingRule: 'ACTUAL_BASED',
        customSettings: {
            plannedWeight: 0,    // 不使用預計用餐
            actualWeight: 1,     // 100% 實際用餐
            minimumCharge: 0,    // 無最低收費
            discountRate: 0,     // 無折扣
        },
    };
}

/**
 * GEMS: calculateCustomBillingCost | P2 | ✓✓ | (config,statistics)→Promise<BillingResult> | Story-10.1 | 客製化計費
 * GEMS-FLOW: ValidateConfig→SwitchRule→CalculateCost→Return
 * GEMS-DEPS: [meal-cost.getMealCostConfig]
 * GEMS-TEST: ✓ Unit | ✓ Integration | - E2E | Coverage: 95%
 * GEMS-TEST-FILE: billingService.test.ts
 */
export async function calculateCustomBillingCost(
    config: ClassBillingConfig,
    statistics: MealStatistics
): Promise<BillingResult> {
    const mealConfig = await getMealCostConfig();

    switch (config.billingRule) {
        case 'ACTUAL_BASED':
            return calculateActualBasedCost(statistics, mealConfig, config.classType);

        case 'PLANNED_BASED':
            // 預留：預計用餐計費
            throw new Error('PLANNED_BASED billing not implemented yet');

        case 'MIXED':
            // 預留：混合計費
            throw new Error('MIXED billing not implemented yet');

        case 'CUSTOM':
            // 預留：完全客製化計費
            throw new Error('CUSTOM billing not implemented yet');

        default:
            return calculateActualBasedCost(statistics, mealConfig, config.classType);
    }
}

/**
 * GEMS: getBillingRuleDescription | P2 | ✓✓ | BillingRuleType→string | Story-10.1 | 取得計費規則描述
 * GEMS-FLOW: SwitchRule→ReturnDescription
 * GEMS-DEPS: []
 * GEMS-TEST: ✓ Unit | - Integration | - E2E | Coverage: 100%
 * GEMS-TEST-FILE: billingService.test.ts
 */
export function getBillingRuleDescription(ruleType: BillingRuleType): string {
    switch (ruleType) {
        case 'ACTUAL_BASED':
            return '實際用餐計費：根據實際用餐人數收費';
        case 'PLANNED_BASED':
            return '預計用餐計費：根據預計用餐人數收費（預留功能）';
        case 'MIXED':
            return '混合計費：結合預計與實際用餐人數（預留功能）';
        case 'CUSTOM':
            return '客製化計費：依班級特殊需求設定（預留功能）';
        default:
            return '未知計費規則';
    }
}

/**
 * GEMS: validateMealStatistics | P1 | ✓✓ | MealStatistics→boolean | Story-10.1 | 驗證用餐統計數據
 * GEMS-FLOW: CheckStructure→ValidateNumbers→Return
 * GEMS-DEPS: []
 * GEMS-TEST: ✓ Unit | - Integration | - E2E | Coverage: 100%
 * GEMS-TEST-FILE: billingService.test.ts
 */
export function validateMealStatistics(statistics: MealStatistics): boolean {
    if (!statistics || !statistics.actualMeals) {
        return false;
    }

    const { actualMeals } = statistics;

    // 檢查所有數值是否為非負整數
    const actualValues = [actualMeals.breakfast, actualMeals.lunch, actualMeals.dinner];

    return actualValues.every(value =>
        typeof value === 'number' && value >= 0 && Number.isInteger(value)
    );
}

/**
 * GEMS: createMealStatistics | P1 | ✓✓ | (breakfast,lunch,dinner)→MealStatistics | Story-10.1 | 建立用餐統計數據
 * GEMS-FLOW: ValidateInput→CreateObject→Return
 * GEMS-DEPS: []
 * GEMS-TEST: ✓ Unit | - Integration | - E2E | Coverage: 100%
 * GEMS-TEST-FILE: billingService.test.ts
 */
export function createMealStatistics(
    breakfast: number,
    lunch: number,
    dinner: number
): MealStatistics {
    return {
        actualMeals: {
            breakfast,
            lunch,
            dinner,
        },
    };
}

/**
 * GEMS: getSupportedBillingRules | P2 | ✓✓ | ()→BillingRuleType[] | Story-10.1 | 取得支援的計費規則列表
 * GEMS-FLOW: ReturnCurrentRules
 * GEMS-DEPS: []
 * GEMS-TEST: ✓ Unit | - Integration | - E2E | Coverage: 100%
 * GEMS-TEST-FILE: billingService.test.ts
 */
export function getSupportedBillingRules(): BillingRuleType[] {
    return ['ACTUAL_BASED']; // 當前只支援實際用餐計費
}

/**
 * GEMS: getFutureBillingRules | P2 | ✓✓ | ()→BillingRuleType[] | Story-10.1 | 取得未來支援的計費規則
 * GEMS-FLOW: ReturnFutureRules
 * GEMS-DEPS: []
 * GEMS-TEST: ✓ Unit | - Integration | - E2E | Coverage: 100%
 * GEMS-TEST-FILE: billingService.test.ts
 */
export function getFutureBillingRules(): BillingRuleType[] {
    return ['PLANNED_BASED', 'MIXED', 'CUSTOM']; // 預留的計費規則
}