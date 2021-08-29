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
    title: 'Transfers',
    icon: 'swap-outline',
    children: [
      {
        title: 'OutgoingTransfers',
        link: '/app/transfer/outgoing-transfer',
      },
    
    ],
  },
  {
    title: 'Treasury',
    icon: 'archive-outline',
    link: '/app/treasury/treasury-action'
  },
  {
    title: 'Statements',
    icon: 'file-text-outline',
    children: [
      {
        title: 'ClientBalanceStatement',
        link: '/app/statement/client-balance-statement',
      },
      {
        title: 'CompanyBalanceStatement',
        link: '/app/statement/company-balance-statement',
      },
      {
        title: 'TreasuryBalanceStatement',
        link: '/app/statement/treasury-balance-statement',
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
  
];
