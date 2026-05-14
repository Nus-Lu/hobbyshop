# HobbyShop｜前後台電商管理系統（React + Vite）

## 專案簡介 (プロジェクト概要)

前後台分離的電商系統，使用 React + Vite 建立 SPA 架構，串接 Hexschool API，實作商品瀏覽、購物車、結帳與後台管理功能（商品、訂單、優惠券 CRUD），並部署至 GitHub Pages。

フロント・バックエンド分離のECシステム，React + ViteによるSPA構築，商品閲覧・カート・決済・管理機能の実装，GitHub Pagesへデプロイ

## Demo
👉 https://nus-lu.github.io/hobbyshop/

## 專案內容 (プロジェクト内容)

前台包含商品列表、商品詳細頁、購物車與結帳流程  
後台提供商品、訂單與優惠券管理功能  
整體流程涵蓋從商品瀏覽到訂單成立的完整電商邏輯，並整合 API 驗證機制。

商品一覧・商品詳細・カート・決済フロー
商品・注文・クーポン管理機能
品閲覧から注文成立までの一連のフロー
API認証機構の統合


## 技術實作與架構設計 (技術実装とアーキテクチャ設計)

使用 React Function Component 與 Hooks 開發  
採用 Pages / Components / API 分層方式組織專案  
使用 Context API 管理 Loading 與訊息狀態  

React関数コンポーネントとHooks
API / レイヤー構成設計
Context APIによる状態管理

## API 串接 (API連携)

使用 Axios 封裝 API  
透過 interceptor 自動帶入 Token  
實作商品、訂單、優惠券的 CRUD 操作  

AxiosによるAPIラップ
インターセプターでトークン自動付与
CRUD実装

## 路由(ルーティング)

使用 React Router 
前台與後台 Layout 分離  
商品詳細頁使用動態路由（/product/:id）

React Router 使用
レイアウト分離
動的ルーティング


## UI

使用 Bootstrap 5 搭配 SCSS  
實作 Modal（新增、編輯、檢視）  
分頁功能（Pagination）  
Loading 狀態控制  

Bootstrap 5 + SCSS styling / Bootstrap 5 + SCSS
モーダル・ページネーション・ローディング


## 部署(デプロイ)

用 Vite 進行 production build  
部署至 GitHub Pages  

Vite本番ビルド
GitHub Pagesへデプロイ

## 後續規劃(改善の予定)

優化優惠券系統  
改善後台操作流程與 UI 體驗  
加入多語系切換（中英日文）

クーポン機能改善
管理画面改善
多言語対応

## 使用技術

React 18 / Vite / React Router / Axios / Bootstrap 5 / SCSS / GitHub Pages / Hexschool API
