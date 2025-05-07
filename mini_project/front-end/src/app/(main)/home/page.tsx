"use client";
import Certificate from "@/app/components/Certificate";
import { PDFViewer } from "@react-pdf/renderer";

// TODO: REMOVE THIS
{
  /* <PDFViewer width={125} height={100} showToolbar={false}>
          <Certificate
            name="Iva Thorsell-Arntsen"
            issueDate="June 4, 2022"
            startDate="May 1, 2022"
            endDate="June 3, 2022"
            score="94%"
            verifyUrl="https://verify.w3schools.com/1MN4G4N80S"
          />
        </PDFViewer> */
}

export default function HomePage() {
  return (
    <div className="flex-1 max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Learning Portal
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Welcome to your personalized learning experience. Access all programs
          to improve your skills.
        </p>
      </div>
    </div>
  );
}
