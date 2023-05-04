# SpaceX Launch Records

## Online Demo

[SpaceX Launch Records](https://mediatek-frontend.vercel.app/)

## Run Locally

run and visit [http://localhost:3000](http://localhost:3000)

```bash
npm run dev
```

## React與Vue關鍵差異

| |React |Vue|
|-----|-----|--------|
|數據流|單向數據流，更新需使用setState|可雙向綁定，可直接修改數據|
|數據變動偵測|使用useEffect|使用watch|
|跨元件數據|使用context、redux|使用provide、inject或是store|
|畫面渲染|需使用useMemo來避免複雜運算的元件不必要的重複渲染|預設即是只重新渲染資料更新的區塊 |
|元件快取|使用memo、React.Fragment|使用keep-alive|
|計算結果快取|使用useCallback|使用computed|

總體來說React開發者需要加注意**資料更新的機制**，而Vue則更貼近傳統網頁開發模式，使用**模板語法**並搭配內建的指令就能快速開發。
兩者也都能輕易的將常用邏輯整理封裝成**Higher-Order Component**來達成程式碼重用的目的

## Restful Api使用

使用相同的URI並搭配對應的Http method來達成資源的操作。

## References

- [Apollo Docs](https://www.apollographql.com/docs/react/data/queries) - GraphQL
- [GraphQL 與 React Apollo](https://hackmd.io/@DpeZKxzJQCO2gwA98qj25w/By_dQ3nj8) - GraphQL
- [How to Fetch GraphQL Data in Next.js](https://hygraph.com/blog/nextjs-graphql) - GraphQL
- ChatGPT - React Hooks, React Table Sorting

