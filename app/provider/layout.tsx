// app/provider/layout.tsx
import ProviderSiderbar from '@/components/providerSiderbar';
import React from 'react';

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <ProviderSiderbar />
      {/* 右侧主内容区域 */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
