"use client";
import PhindojoText from "@/app/components/PhindojoText";
import { useExamStore } from "@/app/store/exam.store";
import React, { useEffect } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ id: string; userId: string }>;
}) {
  const { id, userId } = React.use(params);
  const { isValid, validateCertificate, isLoading } = useExamStore();

  useEffect(() => {
    validateCertificate(id, userId);
  }, [validateCertificate]);

  return (
    <div className="flex-1 max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">
          <PhindojoText className="inline" />
          Certificate
        </h1>
        <p className="text-lg text-white max-w-3xl mx-auto inline">
          This page verifies the authenticity of
        </p>{" "}
        <PhindojoText className="inline" />{" "}
        <p className="text-lg text-white max-w-3xl mx-auto inline">
          certifications
        </p>
      </div>
      <div
        className={`bg-gray-800 rounded-lg p-8 overflow-y-auto border-2 flex items-center justify-center ${
          isLoading
            ? "border-yellow-500"
            : isValid
            ? "border-green-500"
            : "border-red-500"
        }`}
      >
        {isLoading ? (
          <p className="text-2xl font-bold text-white">Loading...</p>
        ) : isValid ? (
          <p className="text-2xl font-bold text-white">
            This certificate is valid
          </p>
        ) : (
          <p className="text-2xl font-bold text-white">
            This certificate is invalid
          </p>
        )}
      </div>
    </div>
  );
}
