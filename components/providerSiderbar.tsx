'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    lebel: 'OpenAI',
    href: '/provider/openaiprovider',
  },
  { lebel: 'ZAI', href: '/provider/zaiprovider' },
  { lebel: 'Xiaomi', href: '/provider/xiaomiprovider' },
  { lebel: 'DeepSeek', href: '/provider/deepseekprovider' },
];

const ProviderSiderbar = () => {
  const pathname = usePathname();

  return (
    <>
      {/* 二级侧边栏 */}
      <aside className="w-64 border-r bg-sidebar p-4 flex flex-col gap-4 shrink-0">
        <nav className="flex-1 overflow-y-auto space-y-1">
          <div className="text-xs font-semibold text-muted-foreground px-2 py-1">
            AI提供商列表
          </div>
          {navItems.map((item, key) => (
            <Link
              key={key}
              href={item.href}
              className={`block rounded-md px-2 py-1 text-sm font-medium ${
                pathname === item.href
                  ? 'bg-primary text-accent-foreground'
                  : 'text-muted-foreground hover:bg-primary/50 hover:text-accent-foreground'
              }`}
            >
              {item.lebel}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default ProviderSiderbar;
