# GehaltProvider Refactoring

## Overview
The original `GehaltProvider.tsx` was a monolithic context provider with over 600 lines of code managing all salary-related state. This has been refactored into a more maintainable, modular architecture.

## Changes Made

### 1. Created Modular Context Providers
The large context has been split into focused, domain-specific providers:

- **`PersonalDataProvider`** - Personal information (age, children, tax class, work details)
- **`TaxDataProvider`** - Tax-related calculations and settings
- **`SocialInsuranceProvider`** - Health, care, pension, and unemployment insurance
- **`SalaryCalculationProvider`** - Salary calculations and additional benefits

### 2. Custom Hook for localStorage Management
Created `useLocalStorageState` hook that:
- Automatically persists state changes to localStorage
- Eliminates the massive useEffect dependency array
- Provides a clean, reusable pattern for state management

### 3. Backward Compatibility
- Maintained the original `useSalary` hook interface
- Added `useLegacySalary` hook that flattens all nested data for existing components
- No breaking changes to existing code

## Benefits

### Maintainability
- **Single Responsibility**: Each provider handles one domain
- **Smaller Files**: Easier to understand and modify
- **Clear Separation**: Related state is grouped logically

### Performance
- **Reduced Re-renders**: Components only re-render when their specific domain changes
- **Optimized Dependencies**: No more massive dependency arrays

### Developer Experience
- **Better IntelliSense**: Smaller interfaces are easier to navigate
- **Easier Testing**: Individual providers can be tested in isolation
- **Clearer Code**: Domain-specific hooks make intent clear

## Usage Examples

### New Modular Approach
```tsx
// Use specific domain hooks
const { alter, kinder, steuerklasse } = usePersonalData();
const { kirchensteuer, einkommenssteuer } = useTaxData();
const { krankenversicherung } = useSocialInsurance();
const { brutto, netto } = useSalaryCalculation();
```

### Legacy Compatibility
```tsx
// Still works exactly as before
const { alter, kirchensteuer, krankenversicherung, brutto } = useLegacySalary();
```

## File Structure
```
src/
├── contexts/
│   ├── GehaltProvider.tsx          # Main provider (orchestrates others)
│   ├── PersonalDataProvider.tsx    # Personal info context
│   ├── TaxDataProvider.tsx         # Tax calculations context
│   ├── SocialInsuranceProvider.tsx # Insurance context
│   └── SalaryCalculationProvider.tsx # Salary calculations context
└── hooks/
    └── useLocalStorageState.ts     # Reusable localStorage hook
```

## Migration Guide

### For New Components
Use the specific domain hooks for better performance and clarity:
```tsx
import { usePersonalData } from '@/contexts/PersonalDataProvider';
import { useTaxData } from '@/contexts/TaxDataProvider';
```

### For Existing Components
No changes required - continue using `useSalary()` or switch to `useLegacySalary()` for the exact same interface.

## Future Improvements
1. **Add computed values**: Move calculations into the providers
2. **Add validation**: Validate state changes at the provider level
3. **Add persistence strategies**: Support different storage backends
4. **Add state synchronization**: Sync related values automatically 