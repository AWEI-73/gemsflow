#!/usr/bin/env node

/**
 * GEMS 迭代備份工具
 * 將根目錄的專案程式碼備份到指定迭代的 project 資料夾中
 * 用於迭代完成後保存該迭代的程式碼快照
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function copyRecursive(src, dest) {
    try {
        if (process.platform === 'win32') {
            execSync(`xcopy "${src}" "${dest}" /E /I /H /Y`, { stdio: 'inherit' });
        } else {
            execSync(`cp -r "${src}" "${dest}"`, { stdio: 'inherit' });
        }
    } catch (error) {
        console.error(`複製失敗: ${src} -> ${dest}`, error.message);
    }
}

function copyFile(src, dest) {
    try {
        if (process.platform === 'win32') {
            execSync(`copy "${src}" "${dest}"`, { stdio: 'inherit' });
        } else {
            execSync(`cp "${src}" "${dest}"`, { stdio: 'inherit' });
        }
    } catch (error) {
        console.error(`複製檔案失敗: ${src} -> ${dest}`, error.message);
    }
}

function backupIteration(iterationNumber) {
    const iterDir = `organized-workspace/iterations/iter-${iterationNumber.toString().padStart(2, '0')}`;
    const projectDir = `organized-workspace/project/iter-${iterationNumber.toString().padStart(2, '0')}`;

    // 確保目錄存在
    if (!fs.existsSync(iterDir)) {
        fs.mkdirSync(iterDir, { recursive: true });
        console.log(`建立迭代管理目錄: ${iterDir}`);
    }

    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
        console.log(`建立專案目錄: ${projectDir}`);
    }

    console.log(`開始備份迭代 ${iterationNumber} 的專案檔案...`);
    console.log('📁 從根目錄備份到 project 資料夾');

    // 備份主要資料夾
    const foldersToBackup = ['src', 'database'];
    foldersToBackup.forEach(folder => {
        if (fs.existsSync(folder)) {
            console.log(`複製資料夾: ${folder}`);
            copyRecursive(folder, `${projectDir}/${folder}`);
        }
    });

    // 備份重要檔案
    const filesToBackup = [
        'package.json',
        'package-lock.json',
        'vite.config.ts',
        'vitest.config.ts',
        'tsconfig.json',
        'tsconfig.node.json',
        'tailwind.config.js',
        'postcss.config.js',
        'index.html',
        '.env.example',
        'README.md'
    ];

    filesToBackup.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`備份檔案: ${file}`);
            copyFile(file, `${projectDir}/${file}`);
        }
    });

    console.log(`✅ 迭代 ${iterationNumber} 程式碼備份完成！`);
    console.log(`備份位置: ${projectDir}`);
    console.log('💡 提示：繼續在根目錄開發下一個迭代');
}

// 命令列參數處理
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('請提供迭代編號，例如: node backup-iteration.js 1');
    process.exit(1);
}

const iterationNumber = parseInt(args[0]);
if (isNaN(iterationNumber)) {
    console.error('迭代編號必須是數字');
    process.exit(1);
}

backupIteration(iterationNumber);