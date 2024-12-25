import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X, Edit2, Type, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SignatureCanvasRef = SignatureCanvas & {
  clear: () => void;
  toDataURL: () => string;
};

interface SignatureFieldProps {
  onChange: (signatureData: string | null) => void;
  value: string | null;
  width: number;
  height: number;
  disabled?: boolean;
}

const SignatureField: React.FC<SignatureFieldProps> = ({
  onChange,
  value,
  width,
  height,
  disabled = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"draw" | "type" | "upload">("draw");
  const [inputValue, setInputValue] = useState(value || "");
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(
    null
  );
  const [isUploading, setIsUploading] = useState(false);
  const signatureCanvasRef = useRef<SignatureCanvasRef | null>(null);
  const { toast } = useToast();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setUploadedSignature(base64String);
          setIsUploading(false);
          toast({
            title: "Upload Successful",
            description: "Your signature has been uploaded successfully.",
            variant: "success",
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Upload failed:", error);
        setIsUploading(false);
        toast({
          title: "Upload Failed",
          description:
            "There was an error uploading your signature. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSave = () => {
    let signatureData = null;
    if (mode === "draw" && signatureCanvasRef.current) {
      signatureData = signatureCanvasRef.current.toDataURL();
    } else if (mode === "type") {
      signatureData = inputValue;
    } else if (mode === "upload") {
      signatureData = uploadedSignature;
    }

    if (signatureData) {
      onChange(signatureData);
    }
    setIsModalOpen(false);
  };

  const handleClear = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
    setInputValue("");
    setUploadedSignature(null);
  };

  const Modal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Signature</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsModalOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setMode("draw")}
            variant={mode === "draw" ? "default" : "outline"}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Draw
          </Button>
          <Button
            onClick={() => setMode("type")}
            variant={mode === "type" ? "default" : "outline"}
          >
            <Type className="h-4 w-4 mr-2" />
            Type
          </Button>
          <Button
            onClick={() => setMode("upload")}
            variant={mode === "upload" ? "default" : "outline"}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>

        <div className="mb-6">
          {mode === "draw" && (
            <div className="border rounded-lg p-4">
              <SignatureCanvas
                ref={signatureCanvasRef as React.Ref<SignatureCanvas>}
                canvasProps={{
                  style: {
                    width: "100%",
                    height: "200px",
                  },
                  className: "bg-white border rounded-md",
                }}
              />
            </div>
          )}

          {mode === "type" && (
            <div className="border rounded-lg p-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-3 border rounded-md text-3xl font-signature"
                placeholder="Type your signature"
                autoFocus
                style={{
                  lineHeight: "1.2",
                  minHeight: "80px",
                }}
              />
            </div>
          )}

          {mode === "upload" && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="w-full"
                disabled={isUploading}
              />
              {isUploading && (
                <p className="text-sm text-gray-500 mt-2">Uploading...</p>
              )}
              {uploadedSignature && (
                <div className="mt-4">
                  <Image
                    src={uploadedSignature}
                    alt="Uploaded Signature"
                    width={200}
                    height={100}
                    className="max-w-full h-auto"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClear} type="button">
            Clear
          </Button>
          <Button onClick={handleSave} type="button">
            Save
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        onClick={() => !disabled && setIsModalOpen(true)}
        className={`relative border rounded-md transition-colors ${
          disabled
            ? "bg-gray-100 border-gray-300 cursor-not-allowed"
            : "bg-sky-300/10 border-sky-300 hover:border-sky-500 cursor-pointer"
        }`}
        style={{ width: `100%`, height: `100%` }}
      >
        {value ? (
          <div
            className={`absolute inset-0 flex items-center justify-center p-4 ${
              disabled ? "opacity-50" : ""
            }`}
          >
            {value.startsWith("data:image") ? (
              <Image
                src={value}
                alt="Signature"
                width={width}
                height={height}
                className="object-contain"
              />
            ) : (
              <p className="text-center text-gray-800 font-signature text-3xl">
                {value}
              </p>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className={`text-sm ${
                disabled ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {disabled ? "Signature" : "Click to add signature"}
            </p>
          </div>
        )}
      </div>
      {isModalOpen && <Modal />}
    </>
  );
};

export default SignatureField;
