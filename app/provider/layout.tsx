// app/provider/layout.tsx
import React from 'react';

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* 二级侧边栏 */}
      <aside className="w-64 border-r bg-sidebar p-4 flex flex-col gap-4 shrink-0">
        <div className="flex-1 overflow-y-auto space-y-1">
          <div className="text-xs font-semibold text-muted-foreground px-2 py-1">
            AI提供商列表
          </div>
          <div className="w-full text-left px-3 py-2 rounded-lg bg-accent text-accent-foreground text-sm flex items-center gap-2">
            <span>LobeHub</span>
          </div>
          <div className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent/50 text-sm flex items-center gap-2">
            <span>Anthropic</span>
          </div>
          <div className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent/50 text-sm flex items-center gap-2">
            <span>Google</span>
          </div>
        </div>
      </aside>

      {/* 右侧主内容区域 */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
