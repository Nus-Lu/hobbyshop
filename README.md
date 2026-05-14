# HobbyShop｜前後台電商管理系統（React + Vite）

## 專案簡介

前後台分離的電商系統，使用 React + Vite 建立 SPA 架構，串接 Hexschool API，實作商品瀏覽、購物車、結帳與後台管理功能（商品、訂單、優惠券 CRUD），並部署至 GitHub Pages。

## 專案內容

前台包含商品列表、商品詳細頁、購物車與結帳流程  
後台提供商品、訂單與優惠券管理功能  

整體流程涵蓋從商品瀏覽到訂單成立的完整電商邏輯，並整合 API 驗證機制。

## 技術實作與架構設計

使用 React Function Component 與 Hooks 開發  
採用 Pages / Components / API 分層方式組織專案  
使用 Context API 管理 Loading 與訊息狀態  

## API 串接

使用 Axios 封裝 API  
透過 interceptor 自動帶入 Token  
實作商品、訂單、優惠券的 CRUD 操作  

## 路由

使用 React Router v6  
前台與後台 Layout 分離  
商品詳細頁使用動態路由（/product/:id）

## UI

使用 Bootstrap 5 搭配 SCSS  
實作 Modal（新增、編輯、檢視）  
分頁功能（Pagination）  
Loading 狀態控制  

## 部署

用 Vite 進行 production build  
部署至 GitHub Pages  

## 後續規劃

優化優惠券系統  
改善後台操作流程與 UI 體驗  
加入多語系切換（中英日文）

## 使用技術

React 18 / Vite / React Router / Axios / Bootstrap 5 / SCSS / GitHub Pages / Hexschool API
