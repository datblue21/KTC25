// API service for handling authentication

// Helper class for API errors
export class ApiError extends Error {
  status: number;

  constructor({ message, status }: { message: string; status: number }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  user?: {
    id: string;
    username: string;
    email?: string;
  };
  message?: string;
  success: boolean;
}

export interface ApiErrorInterface {
  message: string;
  status: number;
}

class ApiService {
  private baseUrl = 'https://server.aptech.io';

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('Attempting login with:', { username: credentials.username });
      
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('Response status:', response.status);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log('Non-JSON response:', text);
        data = { message: 'Server returned invalid response' };
      }

      console.log('Response data:', data);

      if (!response.ok) {
        throw new ApiError({
          message: data.message || `Login failed with status ${response.status}`,
          status: response.status,
        });
      }

      // Check if we have a token in the response
      if (!data.token && !data.access_token) {
        console.warn('No token in response:', data);
        throw new ApiError({
          message: 'Login successful but no token received',
          status: 200,
        });
      }

      return {
        ...data,
        token: data.token || data.access_token, // Handle different token field names
        success: true,
      };
    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ApiError({
          message: 'Network error. Please check your connection and try again.',
          status: 0,
        });
      }
      
      throw new ApiError({
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        status: 500,
      });
    }
  }

  // Save token to cookies
  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      // Save to localStorage for client-side access
      localStorage.setItem('auth_token', token);
      // Save to cookies for server-side access (middleware)
      document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=strict`;
    }
  }

  // Get token from localStorage or cookies
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      // Try localStorage first
      const localToken = localStorage.getItem('auth_token');
      if (localToken) return localToken;
      
      // Fallback to cookies
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => 
        cookie.trim().startsWith('auth_token=')
      );
      return tokenCookie ? tokenCookie.split('=')[1] : null;
    }
    return null;
  }

  // Remove token from localStorage and cookies
  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      // Remove cookie by setting expired date
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // Logout user
  logout(): void {
    this.removeToken();
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
