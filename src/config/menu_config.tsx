import {
  HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

export interface menuInter {
  title: string;
  key: string;
  icon: JSX.Element;
  path: string;
  children?: menuInter[];
}

export const menuArr: menuInter[] = [
  {
    title: '首页',
    key: 'home',
    icon: <HomeOutlined />,
    path: '/admin/home',
  },
  {
    title: '商品',
    key: 'prod_about',
    icon: <AppstoreOutlined />,
    path: '',
    children: [
      // 子菜单列表
      {
        title: '分类管理',
        key: 'category',
        icon: <UnorderedListOutlined />,
        path: '/admin/prod_about/category',
      },
      {
        title: '商品管理',
        key: 'product',
        icon: <ToolOutlined />,
        path: '/admin/prod_about/product',
      },
    ],
  },

  {
    title: '用户管理',
    key: 'user',
    icon: <UserOutlined />,
    path: '/admin/user',
  },
  {
    title: '角色管理',
    key: 'role',
    icon: <SafetyCertificateOutlined />,
    path: '/admin/role',
  },

  {
    title: '图形图表',
    key: 'charts',
    icon: <AreaChartOutlined />,
    path: '',
    children: [
      {
        title: '柱形图',
        key: 'bar',
        icon: <BarChartOutlined />,
        path: '/admin/charts/bar',
      },
      {
        title: '折线图',
        key: 'line',
        icon: <LineChartOutlined />,
        path: '/admin/charts/line',
      },
      {
        title: '饼图',
        key: 'pie',
        icon: <PieChartOutlined />,
        path: '/admin/charts/pie',
      },
    ],
  },
];
