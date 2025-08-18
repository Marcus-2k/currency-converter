import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { API_BASE_URL, API_KEY } from "./api.tokens";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = inject(API_BASE_URL);
  const apiKey = inject(API_KEY);

  if (!req.url.startsWith("/api/")) {
    return next(req);
  }

  const url = req.url.replace("/api", baseUrl);

  const params = req.params?.set("api_key", apiKey) ?? new URLSearchParams().set("api_key", apiKey);

  return next(req.clone({ url, params }));
};
