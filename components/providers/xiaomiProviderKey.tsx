import { Field, FieldLabel } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const XiaomiProviderKey = () => {
  return (
    <form>
      <Field>
        <FieldLabel className="text-foreground flex flex-col justify-between items-start">
          <Label>Xiaomi MIMO</Label>
          <SheetDescription>
            在 OpenAI 或兼容 OpenAI 格式的开放平台获取 API 密钥
          </SheetDescription>
        </FieldLabel>
        <FieldLabel className="text-foreground flex flex-row justify-between items-start">
          <Label>API Key</Label>
          <a
            href="https://platform.xiaomimimo.com/console/api-keys"
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
          placeholder="sk-..."
          className="border-primary"
        />
        <FieldLabel className="text-foreground flex flex-row justify-between items-start">
          <Label>模型名称</Label>
        </FieldLabel>
        <Input type="text" placeholder="模型名称" className="border-primary" />
        <Button type="submit" className="mt-4 w-full cursor-pointer">
          保存
        </Button>
      </Field>
    </form>
  );
};

export default XiaomiProviderKey;
