import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/app/home',
  },
  {
    title: 'Settings',
    icon: 'settings-outline',
    children: [
      {
        title: 'Countries',
        link: '/app/setting/country',
      },
      {
        title: 'Currencies',
        link: '/app/setting/currency',
      },
      {
        title: 'Companies',
        link: '/app/setting/company',
      },
      {
        title: 'Clients',
        link: '/app/setting/client',
      },
      {
        title: 'InitialBalance',
        link: '/app/setting/initial-balance',
      },
      {
        title: 'Commision',
        link: '/app/setting/commision',
      },
      {
        title: 'Expenses',
        link: '/app/setting/expense',
      },
      {
        title: 'Incomes',
        link: '/app/setting/income',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Users',
        link: '/app/security/user',
      },
      {
        title: 'Roles',
        link: '/app/security/role',
      }
    ],
  },
  //===========
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
