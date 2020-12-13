import AsyncComponent from "./component/AsyncComponents/index.jsx";
export default [
  {
    name: "index",
    path: "/",
    exact: true,
    component: AsyncComponent(() =>
      import(/*webpackChunkName: "childDom"*/ "./pages/index/childDom.jsx")
    ),
  },
];
