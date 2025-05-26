import { getLocalStorage } from '../src/utils/localStorage';

describe('getLocalStorage', () => {
  // Save the original localStorage
  const originalLocalStorage = global.localStorage;
  
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn(),
      length: 0,
      key: jest.fn(),
    };
    
    // @ts-ignore - Mocking localStorage
    global.localStorage = localStorageMock;
    
    // Mock window object
    Object.defineProperty(global, 'window', {
      value: {
        localStorage: localStorageMock,
      },
      writable: true,
    });
  });
  
  afterEach(() => {
    // Restore original localStorage
    global.localStorage = originalLocalStorage;
    
    // Clean up window mock
    // @ts-ignore - Cleaning up window mock
    delete global.window;
  });
  
  it('returns parsed value from localStorage when it exists', () => {
    // Setup mock to return a value
    localStorage.getItem.mockReturnValue(JSON.stringify({ test: 'value' }));
    
    const result = getLocalStorage('testKey', 'defaultValue');
    
    // Verify localStorage.getItem was called with the correct key
    expect(localStorage.getItem).toHaveBeenCalledWith('testKey');
    
    // Verify the result is the parsed value
    expect(result).toEqual({ test: 'value' });
  });
  
  it('returns default value when localStorage returns null', () => {
    // Setup mock to return null (key not found)
    localStorage.getItem.mockReturnValue(null);
    
    const defaultValue = { default: 'value' };
    const result = getLocalStorage('testKey', defaultValue);
    
    // Verify localStorage.getItem was called with the correct key
    expect(localStorage.getItem).toHaveBeenCalledWith('testKey');
    
    // Verify the result is the default value
    expect(result).toEqual(defaultValue);
  });
  
  it('returns default value when window is undefined', () => {
    // Remove window object to simulate server-side rendering
    // @ts-ignore - Removing window to simulate SSR
    delete global.window;
    
    const defaultValue = 'default';
    const result = getLocalStorage('testKey', defaultValue);
    
    // Verify the result is the default value
    expect(result).toEqual(defaultValue);
    
    // Verify localStorage.getItem was not called
    expect(localStorage.getItem).not.toHaveBeenCalled();
  });
});
