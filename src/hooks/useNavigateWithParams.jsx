import { useNavigate, useSearchParams } from "react-router-dom";

export const useNavigateWithParams = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Create enhanced navigate function that preserves params
  const navigateWithParams = (to, options = {}) => {
    // If 'to' is a string (path only)
    if (typeof to === "string") {
      const currentParams = searchParams.toString();
      const separator = to.includes("?") ? "&" : "?";
      const newPath = currentParams ? `${to}${separator}${currentParams}` : to;
      return navigate(newPath, options);
    }

    // If 'to' is an object with pathname/search
    if (typeof to === "object") {
      const currentParams = new URLSearchParams(searchParams);
      const newParams = new URLSearchParams(to.search || "");

      // Merge params, with new params taking precedence
      for (const [key, value] of currentParams.entries()) {
        if (!newParams.has(key)) {
          newParams.append(key, value);
        }
      }

      return navigate(
        {
          ...to,
          search: newParams.toString(),
        },
        options
      );
    }

    // Fallback to normal navigate
    return navigate(to, options);
  };

  return navigateWithParams;
};
