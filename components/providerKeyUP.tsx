import { Settings } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';

import { Button } from './ui/button';
import { FieldGroup, FieldSet } from './ui/field';
import OpenAIProviderKey from '@/components/providers/openaiProviderKey';
import XiaomiProviderKey from './providers/xiaomiProviderKey';

const ProviderKeyUp = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <Settings size={20} strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>AI服务提供商</SheetTitle>
          <SheetDescription>管理您的AI服务提供商密钥</SheetDescription>
        </SheetHeader>
        <FieldGroup>
          <FieldSet className="no-scrollbar overflow-y-auto flex flex-col gap-3 px-4">
            <OpenAIProviderKey />
          </FieldSet>
        </FieldGroup>
        <FieldGroup>
          <FieldSet className="no-scrollbar overflow-y-auto flex flex-col gap-3 px-4">
            <XiaomiProviderKey />
          </FieldSet>
        </FieldGroup>
        <FieldGroup>
          <FieldSet className="no-scrollbar overflow-y-auto flex flex-col gap-3 px-4">
            <XiaomiProviderKey />
          </FieldSet>
        </FieldGroup>
      </SheetContent>
    </Sheet>
  );
};

export default ProviderKeyUp;
