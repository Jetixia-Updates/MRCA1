import { Car } from "lucide-react";
import { useLanguage } from "../contexts/language";

export function Logo() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444] to-[#1E40AF] blur-sm rounded-lg"></div>
        <div className="relative bg-gradient-to-br from-[#EF4444] to-[#1E40AF] p-2 rounded-lg">
          <Car className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-lg bg-gradient-to-r from-[#EF4444] to-[#1E40AF] bg-clip-text text-transparent">
          MAXIMUM
        </span>
        <span className="text-xs text-muted-foreground">{t('Rent a Car')}</span>
      </div>
    </div>
  );
}
