import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { IRoute } from '../admin/routes';

// 定义props的接口
interface CurrentLocationProps {
  routeconfigs: IRoute[];
}

const CurrentLocation: React.FC<CurrentLocationProps> = ({routeconfigs}) => {
  
  const location = useLocation();
  // 使用路由路径找到模块名称
  let routes: IRoute[] = []
  getRoutesFormPath(routes, routeconfigs, location.pathname);

  function getRoutesFormPath(routes: IRoute[], routeconfigs: IRoute[], path: string) {
    let leftPath = path;
    for (let route of routeconfigs) {
      let index = leftPath.indexOf(route.path);
      if (index != -1) {
        routes.push(route)
        if (route.children && route.children.length > 0) {
          leftPath = leftPath.replace(route.path, '');
          console.log('lefypath', leftPath)
          getRoutesFormPath(routes, route.children, leftPath);
        }
      }
    }
  }

  function itemRender(currentRoute: any, params: any, items: any, paths: any) {
    console.log(location)
    console.log(routes)
    let isLast = currentRoute?.path === items[items.length - 1]?.path;
    let isFirst = currentRoute?.path === items[0]?.path;
    console.log('CurrentLocation', currentRoute, params, items, paths)
    return isLast ? (<span>{currentRoute.name}</span>) :
      (isFirst ? (<span>{currentRoute.name}</span>) : (<Link to={`/${paths.join("/")}`}>{currentRoute.name}</Link>));
  }

  return <Breadcrumb itemRender={itemRender} items={routes} />;
};

export default CurrentLocation;
