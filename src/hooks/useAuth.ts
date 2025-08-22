import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  requestOTP,
  registerUser,
  loginUser,
  getUserProfile,
  RequestOTPRequest,
  RegisterRequest,
  LoginRequest,
} from "../api/auth";

// Hook for requesting OTP
export const useRequestOTP = () => {
  return useMutation({
    mutationFn: (data: RequestOTPRequest) => requestOTP(data),
    onError: (error) => {
      console.error("OTP request failed:", error);
    },
  });
};

// Hook for user registration
export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => registerUser(data),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};

// Hook for user login
export const useLoginUser = (
  onError?: (error: any) => void,
  onSuccess?: (data: any) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
      // Call custom success callback if provided
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // Call custom error callback if provided
      if (onError) {
        onError(error);
      }
    },
  });
};

// Hook for fetching user profile
export const useUserProfile = () => {
  const isClient = typeof window !== "undefined";
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: isClient && !!localStorage.getItem("authToken"), // Only fetch if user is authenticated and on client
  });
};
