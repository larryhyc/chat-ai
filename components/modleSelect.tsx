import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useChangeModelStore } from '@/store/useChangeModle';

const providerList = [
  { provider: 'Google', models: ['Gemini-2.5Pro', 'Gemini-2.5Flash'] },
  { provider: 'Z-AI', models: ['GLM-4.6-Flash', 'GLM-5'] },
];

const ModelSelect = () => {
  const { model, setModel, setProvider } = useChangeModelStore();

  const handleModelChange = (value: string) => {
    setModel(value);
    const provider = providerList.find((p) => p.models.includes(value));
    if (provider) {
      setProvider(provider.provider);
    }
  };

  return (
    <Select defaultValue={model} onValueChange={handleModelChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="min-w-24">
        <SelectGroup>
          <SelectLabel>选择模型</SelectLabel>
          {providerList.map((provider) => {
            return (
              <SelectGroup key={provider.provider}>
                <SelectLabel>{provider.provider}</SelectLabel>
                {provider.models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectGroup>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ModelSelect;
