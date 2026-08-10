'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { setCookie } from '@/lib/cookies';
import { toast } from 'sonner';

interface AIConfig {
  apiKey: string;
  baseUrl: string;
}

const OpenAIProviderKey = () => {
  const [formData, setFormData] = useState<AIConfig>({
    apiKey: '',
    baseUrl: '',
  });

  // 初始化表单：保持从 localStorage 恢复用户已填写的配置
  useEffect(() => {
    const saved = localStorage.getItem('OpenAI_config');
    if (saved) {
      try {
        queueMicrotask(() => {
          setFormData(JSON.parse(saved));
        });
      } catch (e) {
        console.error('解析本地配置失败:', e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const configStr = JSON.stringify(formData);

    if (!formData.apiKey || !formData.baseUrl) {
      toast.error('提供商配置不能为空');
      return;
    }

    // 保存一份到 localStorage 方便 UI 状态回显
    localStorage.setItem('OpenAI_config', configStr);

    setCookie('ai_config_openai', configStr, 30);

    toast.success('配置保存成功');
  };

  return (
    <Field>
      <FieldLabel className="text-foreground flex flex-col justify-between items-start">
        <Label>OpenAI</Label>
        <SheetDescription>
          在 OpenAI 或兼容 OpenAI 格式的开放平台获取 API 密钥
        </SheetDescription>
      </FieldLabel>
      <FieldLabel className="text-foreground flex flex-row justify-between items-start">
        <Label>API Key</Label>
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          获取 API Key
          <SquareArrowOutUpRight size={12} />
        </a>
      </FieldLabel>
      <Input
        type="password"
        value={formData.apiKey}
        name="apiKey"
        placeholder="sk-..."
        className="border-primary"
        onChange={handleChange}
      />
      <FieldLabel>
        <Label>请求地址</Label>
      </FieldLabel>
      <Input
        type="text"
        name="baseUrl"
        value={formData.baseUrl}
        className="border-primary"
        placeholder="https://openai.example.org/v1"
        onChange={handleChange}
      />
      <Button
        className="mt-4 w-full cursor-pointer"
        type="button"
        onClick={handleSave}
      >
        保存
      </Button>
    </Field>
  );
};

export default OpenAIProviderKey;
