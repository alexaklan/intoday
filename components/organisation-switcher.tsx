'use client';

import { Building, Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Organisation } from '@/lib/types';

interface OrganisationSwitcherProps {
  organisations: Organisation[];
  selectedOrgId: string;
  onOrgChange: (orgId: string) => void;
}

export function OrganisationSwitcher({ 
  organisations, 
  selectedOrgId, 
  onOrgChange 
}: OrganisationSwitcherProps) {
  const selectedOrg = organisations.find(o => o.id === selectedOrgId);
  
  if (organisations.length <= 1) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-2">
      <Building className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedOrgId} onValueChange={onOrgChange}>
        <SelectTrigger className="w-[240px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {organisations.map(org => (
            <SelectItem key={org.id} value={org.id}>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                {org.name}
                {org.id === selectedOrgId && (
                  <Check className="h-4 w-4 ml-auto" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

