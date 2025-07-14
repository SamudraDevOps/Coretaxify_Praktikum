import { useNavigate, useSearchParams } from "react-router-dom";

export const useNavigateWithParams = () => {
  const [searchParams] = useSearchParams();

  const navigateWithParams = (to, options = {}) => {
    // If 'to' is a string (path only)
    if (typeof to === "string") {
      const currentParams = new URLSearchParams(searchParams);
      const [path, queryString] = to.split("?");

      if (queryString) {
        const newParams = new URLSearchParams(queryString);

        for (const [key, value] of newParams.entries()) {
          currentParams.set(key, value);
        }

        const finalPath = `${path}?${currentParams.toString()}`;
        // Direct navigation with reload - no flash
        window.location.href = finalPath;
        return;
      } else {
        const currentParamsString = currentParams.toString();
        const finalPath = currentParamsString
          ? `${path}?${currentParamsString}`
          : path;
        // Direct navigation with reload - no flash
        window.location.href = finalPath;
        return;
      }
    }

    // If 'to' is an object with pathname/search
    if (typeof to === "object") {
      const currentParams = new URLSearchParams(searchParams);
      const newParams = new URLSearchParams(to.search || "");

      for (const [key, value] of newParams.entries()) {
        currentParams.set(key, value);
      }

      const finalPath = `${to.pathname || ""}?${currentParams.toString()}`;
      // Direct navigation with reload - no flash
      window.location.href = finalPath;
      return;
    }

    // Fallback
    window.location.reload();
  };

  return navigateWithParams;
};
