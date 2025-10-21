#!/usr/bin/env node

/**
 * GEMS 工作區清理工具
 * 整理分散的專案檔案到適當的位置
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function moveToArchive(files, archiveDir) {
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const fileName = path.basename(file);
      const destPath = `${archiveDir}/${fileName}`;
      
      try {
        if (process.platform === 'win32') {
          execSync(`move "${file}" "${destPath}"`, { stdio: 'inherit' });
        } else {
          execSync(`mv "${file}" "${destPath}"`, { stdio: 'inherit' });
        }
        console.log(`移動: ${file} -> ${destPath}`);
      } catch (error) {
        console.error(`移動失敗: ${file}`, error.message);
      }
    }
  });
}

function cleanupWorkspace() {
  console.log('開始清理工作區...');
  
  // 建立歸檔目錄
  const archiveDir = 'organized-workspace/archive';
  
  // 移動測試相關檔案
  const testFiles = [
    'test-story-2.1.md',
    'test-story-4.1.md'
  ];
  
  console.log('整理測試檔案...');
  moveToArchive(testFiles, `${archiveDir}/test-docs`);
  
  // 移動資料庫修復檔案
  const dbFixFiles = [
    'DATABASE_FIX.md',
    'DATABASE_FIELD_MAPPING.md'
  ];
  
  console.log('整理資料庫文檔...');
  moveToArchive(dbFixFiles, `${archiveDir}/database-docs`);
  
  // 移動設定相關檔案
  const setupFiles = [
    'GEMS_TEMPLATE_SETUP.md',
    'SUPABASE_SETUP.md'
  ];
  
  console.log('整理設定文檔...');
  moveToArchive(setupFiles, `${archiveDir}/setup-docs`);
  
  // 移動覆蓋率報告
  if (fs.existsSync('coverage')) {
    try {
      if (process.platform === 'win32') {
        execSync(`move "coverage" "${archiveDir}/coverage"`, { stdio: 'inherit' });
      } else {
        execSync(`mv "coverage" "${archiveDir}/coverage"`, { stdio: 'inherit' });
      }
      console.log('移動覆蓋率報告到歸檔區');
    } catch (error) {
      console.error('移動覆蓋率報告失敗:', error.message);
    }
  }
  
  console.log('✅ 工作區清理完成！');
  console.log('檔案已整理到 organized-workspace/archive/');
}

cleanupWorkspace();