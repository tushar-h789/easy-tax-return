import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { numericFormatter } from "react-number-format";
import { FormField } from "@/types/tax-return-form";
import { IndividualTaxReturnFormInput } from "@/app/(site)/individual-tax-return/schema";
import { formatDate } from "date-fns";

type Image = {
  src: string;
};

// Helper function to format dates consistently
const formatDateForPDF = (dateValue: Date | string | null): string => {
  if (!dateValue) return "";

  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

  if (isNaN(date.getTime())) return ""; // Invalid date

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const generatePDF = async (
  images: Image[],
  formFields: FormField[],
  formData: IndividualTaxReturnFormInput
): Promise<void> => {
  const pdf = new jsPDF("p", "px", [595, 842]); // A4 size in pixels at 72 dpi

  const baseStyles = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    body {
      line-height: 1;
      font-family: Arial, sans-serif;
    }
    .signature-text {
      font-family: cursive;
      font-size: 16px;
      color: #000;
    }
    .date-field {
      font-family: Arial, sans-serif;
      font-size: 12px;
      color: #000;
    }
  `;

  try {
    for (let i = 0; i < images.length; i++) {
      const formContainer = document.createElement("div");
      formContainer.style.position = "relative";
      formContainer.style.width = "595px";
      formContainer.style.height = "842px";

      const containerId = `pdf-container-${i}`;
      formContainer.id = containerId;

      const imageContainer = document.createElement("div");
      imageContainer.style.position = "relative";
      imageContainer.style.width = "100%";
      imageContainer.style.height = "100%";

      const img = document.createElement("img");
      img.src = images[i].src;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      imageContainer.appendChild(img);

      const fieldsContainer = document.createElement("div");
      fieldsContainer.style.position = "absolute";
      fieldsContainer.style.top = "0";
      fieldsContainer.style.left = "0";
      fieldsContainer.style.width = "100%";
      fieldsContainer.style.height = "100%";

      formFields
        .filter(
          (field) =>
            field.imageIndex === i &&
            field.isVisible &&
            field.isShowInPDF !== false &&
            field.type !== "select"
        )
        .forEach(async (field) => {
          if (field.type === "date") {
            const dateValue = formData[
              field.name as keyof IndividualTaxReturnFormInput
            ] as Date | null;
            const formattedDate = formatDateForPDF(dateValue);
            const [day, month, year] = formattedDate
              ? formattedDate.split("/")
              : ["", "", ""];

            // Day field with separator
            const dayContainer = document.createElement("div");
            dayContainer.style.position = "absolute";
            dayContainer.style.left = `${field.dayPosition.x / 10}%`;
            dayContainer.style.top = `${field.dayPosition.y / 10}%`;
            dayContainer.style.width = `${field.dayPosition.width / 10}%`;
            dayContainer.style.height = `${field.dayPosition.height / 10}%`;
            dayContainer.style.display = "flex";
            dayContainer.style.alignItems = "center";

            const dayElement = document.createElement("span");
            dayElement.className = "date-field";
            dayElement.style.paddingLeft = "5px";
            dayElement.textContent = day || "DD";
            dayContainer.appendChild(dayElement);

            // First separator (/)
            const separator1 = document.createElement("div");
            separator1.style.position = "absolute";
            separator1.style.left = `${
              (field.dayPosition.x + field.dayPosition.width) / 10
            }%`;
            separator1.style.top = `${field.dayPosition.y / 10}%`;
            separator1.style.height = `${field.dayPosition.height / 10}%`;
            separator1.style.display = "flex";
            separator1.style.alignItems = "center";
            separator1.style.justifyContent = "center";
            separator1.style.paddingLeft = "2px";
            separator1.style.paddingRight = "2px";
            separator1.textContent = "/";

            // Month field with separator
            const monthContainer = document.createElement("div");
            monthContainer.style.position = "absolute";
            monthContainer.style.left = `${field.monthPosition.x / 10}%`;
            monthContainer.style.top = `${field.monthPosition.y / 10}%`;
            monthContainer.style.width = `${field.monthPosition.width / 10}%`;
            monthContainer.style.height = `${field.monthPosition.height / 10}%`;
            monthContainer.style.display = "flex";
            monthContainer.style.alignItems = "center";

            const monthElement = document.createElement("span");
            monthElement.className = "date-field";
            monthElement.style.paddingLeft = "5px";
            monthElement.textContent = month || "MM";
            monthContainer.appendChild(monthElement);

            // Second separator (/)
            const separator2 = document.createElement("div");
            separator2.style.position = "absolute";
            separator2.style.left = `${
              (field.monthPosition.x + field.monthPosition.width) / 10
            }%`;
            separator2.style.top = `${field.monthPosition.y / 10}%`;
            separator2.style.height = `${field.monthPosition.height / 10}%`;
            separator2.style.display = "flex";
            separator2.style.alignItems = "center";
            separator2.style.justifyContent = "center";
            separator2.style.paddingLeft = "2px";
            separator2.style.paddingRight = "2px";
            separator2.textContent = "/";

            // Year field
            const yearContainer = document.createElement("div");
            yearContainer.style.position = "absolute";
            yearContainer.style.left = `${field.yearPosition.x / 10}%`;
            yearContainer.style.top = `${field.yearPosition.y / 10}%`;
            yearContainer.style.width = `${field.yearPosition.width / 10}%`;
            yearContainer.style.height = `${field.yearPosition.height / 10}%`;
            yearContainer.style.display = "flex";
            yearContainer.style.alignItems = "center";

            const yearElement = document.createElement("span");
            yearElement.className = "date-field";
            yearElement.style.paddingLeft = "5px";
            yearElement.textContent = year || "YYYY";
            yearContainer.appendChild(yearElement);

            // Append all elements to the fields container
            fieldsContainer.appendChild(dayContainer);
            fieldsContainer.appendChild(separator1);
            fieldsContainer.appendChild(monthContainer);
            fieldsContainer.appendChild(separator2);
            fieldsContainer.appendChild(yearContainer);
          } else if (field.type === "signature") {
            const signatureContainer = document.createElement("div");
            signatureContainer.style.position = "absolute";
            signatureContainer.style.left = `${field.x / 10}%`;
            signatureContainer.style.top = `${field.y / 10}%`;
            signatureContainer.style.width = `${field.width / 10}%`;
            signatureContainer.style.height = `${field.height / 10}%`;
            signatureContainer.style.display = "flex";
            signatureContainer.style.alignItems = "center";
            signatureContainer.style.justifyContent = "center";

            const value = formData[
              field.name as keyof IndividualTaxReturnFormInput
            ] as string;

            if (value) {
              if (value.startsWith("data:image")) {
                const img = document.createElement("img");
                img.src = value;
                img.style.maxWidth = "100%";
                img.style.maxHeight = "100%";
                img.style.objectFit = "contain";
                signatureContainer.appendChild(img);
              } else {
                const signatureText = document.createElement("div");
                signatureText.className = "signature-text";
                signatureText.textContent = value;
                signatureText.style.width = "100%";
                signatureText.style.textAlign = "center";
                signatureContainer.appendChild(signatureText);
              }
            }

            fieldsContainer.appendChild(signatureContainer);
          } else if (field.type === "radio") {
            const value =
              formData[field.name as keyof IndividualTaxReturnFormInput];
            field.options?.forEach((option) => {
              const radioContainer = document.createElement("div");
              radioContainer.style.position = "absolute";
              radioContainer.style.left = `${option.x / 10}%`;
              radioContainer.style.top = `${option.y / 10}%`;
              radioContainer.style.width = `${option.width / 10}%`;
              radioContainer.style.height = `${option.height / 10}%`;
              radioContainer.style.display = "flex";
              radioContainer.style.alignItems = "center";
              radioContainer.style.justifyContent = "center";

              if (value === option.value) {
                const svg = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "svg"
                );
                svg.setAttribute("viewBox", "0 0 150 150");
                svg.style.width = "80%";
                svg.style.height = "80%";

                const path = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "path"
                );
                path.setAttribute(
                  "d",
                  "M39.323,124.635c-1.979-0.026-10.5-12.115-18.951-26.871L5,70.939l3.987-3.778c2.19-2.076,8.072-3.772,13.083-3.772h9.097 l4.576,13.658l4.577,13.665l36.4-37.755c20.019-20.764,43.139-41.175,51.394-45.353L143.106,0L112.84,32.579 C96.206,50.495,73.66,78.551,62.752,94.916C51.845,111.282,41.302,124.654,39.323,124.635z"
                );
                path.setAttribute("fill", "black");

                svg.appendChild(path);
                radioContainer.appendChild(svg);
              }

              fieldsContainer.appendChild(radioContainer);
            });
          } else {
            const fieldContainer = document.createElement("div");
            fieldContainer.style.position = "absolute";
            fieldContainer.style.left = `${field.x / 10}%`;
            fieldContainer.style.top = `${field.y / 10}%`;
            fieldContainer.style.width = `${field.width / 10}%`;
            fieldContainer.style.height = `${field.height / 10}%`;
            fieldContainer.style.display = "flex";
            fieldContainer.style.alignItems = "center";
            fieldContainer.style.justifyContent = "flex-start";
            fieldContainer.style.overflow = "hidden";

            const valueElement = document.createElement("span");
            valueElement.style.fontSize = "12px";
            valueElement.style.lineHeight = "1";
            valueElement.style.paddingLeft = "5px";
            valueElement.style.paddingRight = "5px";
            valueElement.style.whiteSpace = "nowrap";
            valueElement.style.overflow = "hidden";
            valueElement.style.textOverflow = "ellipsis";

            const value =
              formData[field.name as keyof IndividualTaxReturnFormInput];

            if (field.type === "number" && value) {
              valueElement.textContent = numericFormatter(value.toString(), {
                thousandSeparator: true,
                decimalScale: 2,
                fixedDecimalScale: true,
              });
            } else {
              valueElement.textContent = value?.toString() || "";
            }

            fieldContainer.appendChild(valueElement);
            fieldsContainer.appendChild(fieldContainer);
          }
        });

      imageContainer.appendChild(fieldsContainer);
      formContainer.appendChild(imageContainer);

      const styleElement = document.createElement("style");
      styleElement.textContent = baseStyles;
      formContainer.appendChild(styleElement);

      document.body.appendChild(formContainer);

      const canvas = await html2canvas(formContainer, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");

      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, "PNG", 0, 0, 595, 842);

      const containerToRemove = document.getElementById(containerId);
      if (containerToRemove && containerToRemove.parentNode) {
        containerToRemove.parentNode.removeChild(containerToRemove);
      }
    }

    pdf.save("filled_form.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    images.forEach((_, index) => {
      const containerToRemove = document.getElementById(
        `pdf-container-${index}`
      );
      if (containerToRemove && containerToRemove.parentNode) {
        containerToRemove.parentNode.removeChild(containerToRemove);
      }
    });
    throw error;
  }
};

interface InvoiceData {
  taxpayerName: string;
  invoiceId: string;
  tin: string;
  mobile: string;
  createdAt: Date;
}

interface TextFieldOptions {
  align?: "left" | "right" | "center";
  fontSize?: number;
}

interface Field {
  text: string;
  x: number;
  y: number;
  width: number;
  options?: TextFieldOptions;
}

export const generateInvoicePDF = async (
  invoiceImage: string,
  invoiceData: InvoiceData
): Promise<void> => {
  // Keep the same PDF and dimension setup
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [842, 595],
  });

  const MAX_WIDTH = 842;
  const MAX_HEIGHT = 595;
  const ASPECT_RATIO = 720 / 1280;

  let finalWidth = MAX_WIDTH;
  let finalHeight = MAX_WIDTH * ASPECT_RATIO;

  if (finalHeight > MAX_HEIGHT) {
    finalHeight = MAX_HEIGHT;
    finalWidth = MAX_HEIGHT / ASPECT_RATIO;
  }

  const xOffset = (MAX_WIDTH - finalWidth) / 2;
  const yOffset = (MAX_HEIGHT - finalHeight) / 2;

  // Updated base styles with larger default font size
  const baseStyles = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
    .invoice-text {
      font-size: 16px;
      color: #000;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
    }
  `;

  try {
    // Keep the same container setup
    const formContainer = document.createElement("div");
    formContainer.style.position = "relative";
    formContainer.style.width = `${finalWidth}px`;
    formContainer.style.height = `${finalHeight}px`;
    formContainer.id = "invoice-container";

    const imageContainer = document.createElement("div");
    imageContainer.style.position = "relative";
    imageContainer.style.width = "100%";
    imageContainer.style.height = "100%";
    imageContainer.style.overflow = "hidden";

    const img = document.createElement("img");
    img.src = invoiceImage;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    imageContainer.appendChild(img);

    const fieldsContainer = document.createElement("div");
    fieldsContainer.style.position = "absolute";
    fieldsContainer.style.top = "0";
    fieldsContainer.style.left = "0";
    fieldsContainer.style.width = "100%";
    fieldsContainer.style.height = "100%";

    const scaleX = finalWidth / 1280;
    const scaleY = finalHeight / 720;

    // Updated createTextField with larger minimum font size
    const createTextField = (
      text: string,
      originalX: number,
      originalY: number,
      width: number,
      options: TextFieldOptions = {}
    ) => {
      const field = document.createElement("p");
      field.className = "invoice-text";
      field.style.position = "absolute";

      const scaledX = originalX * scaleX;
      const scaledY = originalY * scaleY;
      const scaledWidth = width * scaleX;

      field.style.left = `${scaledX}px`;
      field.style.top = `${scaledY}px`;
      field.style.width = `${scaledWidth}px`;
      field.style.textAlign = options.align || "left";

      // Increased base font size and minimum size
      const baseFontSize = options.fontSize || 18;
      field.style.fontSize = `${Math.max(baseFontSize * scaleX, 14)}px`;

      field.textContent = text || "N/A";
      return field;
    };

    // Updated fields with larger font sizes
    const fields: Field[] = [
      {
        text: invoiceData.invoiceId,
        x: 180,
        y: 122,
        width: 200,
        options: { fontSize: 20 },
      },
      {
        text: invoiceData.taxpayerName,
        x: 180,
        y: 160,
        width: 300,
        options: { fontSize: 20 },
      },
      {
        text: invoiceData.tin,
        x: 180,
        y: 197,
        width: 200,
        options: { fontSize: 20 },
      },
      {
        text: invoiceData.mobile,
        x: 180,
        y: 237,
        width: 200,
        options: { fontSize: 20 },
      },
      {
        text: formatDate(invoiceData.createdAt, "dd/MM/yyyy"),
        x: 510,
        y: 122,
        width: 200,
        options: {
          align: "right" as const,
          fontSize: 20,
        },
      },
    ];

    // Keep the rest of the code the same
    fields.forEach((field) => {
      fieldsContainer.appendChild(
        createTextField(
          field.text,
          field.x,
          field.y,
          field.width,
          field.options
        )
      );
    });

    imageContainer.appendChild(fieldsContainer);
    formContainer.appendChild(imageContainer);

    const styleElement = document.createElement("style");
    styleElement.textContent = baseStyles;
    formContainer.appendChild(styleElement);

    document.body.appendChild(formContainer);

    // Increased scale for better quality
    const canvas = await html2canvas(formContainer, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: null,
      imageTimeout: 0,
    });

    const imgData = canvas.toDataURL("image/png");

    pdf.addImage(imgData, "PNG", xOffset, yOffset, finalWidth, finalHeight);

    pdf.save(`invoice-${invoiceData.invoiceId}.pdf`);

    // Clean up
    const containerToRemove = document.getElementById("invoice-container");
    if (containerToRemove && containerToRemove.parentNode) {
      containerToRemove.parentNode.removeChild(containerToRemove);
    }
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    const containerToRemove = document.getElementById("invoice-container");
    if (containerToRemove && containerToRemove.parentNode) {
      containerToRemove.parentNode.removeChild(containerToRemove);
    }
    throw error;
  }
};
