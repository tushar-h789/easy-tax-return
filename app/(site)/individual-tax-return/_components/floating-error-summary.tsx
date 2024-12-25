import React from "react";
import { useFormContext } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { useTaxReturnForm } from "@/hooks/use-tax-return-form";

const FloatingErrorSummary = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const { formFields } = useTaxReturnForm();

  // Group errors by page
  const errorsByPage = Object.entries(errors).reduce(
    (acc, [fieldName, error]) => {
      const field = formFields.find((f) => f.name === fieldName);
      if (field) {
        const pageNumber = field.imageIndex + 1;
        if (!acc[pageNumber]) {
          acc[pageNumber] = [];
        }
        acc[pageNumber].push({
          field: fieldName,
          message: (error?.message as string) || "This field is required",
        });
      }
      return acc;
    },
    {} as Record<number, Array<{ field: string; message: string }>>
  );

  const totalErrors = Object.values(errorsByPage).reduce(
    (sum, pageErrors) => sum + pageErrors.length,
    0
  );

  if (Object.keys(errorsByPage).length === 0) return null;

  const errorPages = Object.keys(errorsByPage).join(", ");

  return (
    <div className="w-full border-b border-red-200 bg-red-50">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">
              {totalErrors} {totalErrors === 1 ? "error" : "errors"} on{" "}
              {Object.keys(errorsByPage).length === 1 ? "page" : "pages"}{" "}
              {errorPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingErrorSummary;
