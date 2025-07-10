import { useNavigate, useSearchParams } from "react-router-dom";

export const useNavigateWithParams = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Create enhanced navigate function that preserves params
  const navigateWithParams = (to, options = {}) => {
    // If 'to' is a string (path only)
    if (typeof to === "string") {
      const currentParams = new URLSearchParams(searchParams);
      const [path, queryString] = to.split("?");

      if (queryString) {
        const newParams = new URLSearchParams(queryString);

        // Merge params, with new params taking precedence (replacing existing ones)
        for (const [key, value] of newParams.entries()) {
          currentParams.set(key, value); // Use set() instead of append() to replace
        }

        const finalPath = `${path}?${currentParams.toString()}`;
        return navigate(finalPath, options);
      } else {
        // No query string in the new path, preserve current params
        const currentParamsString = currentParams.toString();
        const finalPath = currentParamsString
          ? `${path}?${currentParamsString}`
          : path;
        // return navigate(finalPath, options);
        navigate(finalPath, options);
        setTimeout(() => {
          window.location.reload();
        }, 0);
      }
      return navigateWithParams;
    }

    // If 'to' is an object with pathname/search
    if (typeof to === "object") {
      const currentParams = new URLSearchParams(searchParams);
      const newParams = new URLSearchParams(to.search || "");

      // Merge params, with new params taking precedence (replacing existing ones)
      for (const [key, value] of newParams.entries()) {
        currentParams.set(key, value); // Use set() instead of checking if exists
      }

      return navigate(
        {
          ...to,
          search: currentParams.toString(),
        },
        options
      );
    }

    // Fallback to normal navigate
    return navigate(to, options);
  };

  return navigateWithParams;
};
