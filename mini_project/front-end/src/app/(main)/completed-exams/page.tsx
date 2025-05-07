"use client";
import { useExamStore } from "@/app/store/exam.store";
import { FileText, SearchIcon, Download, LoaderCircle } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

export default function CompletedExams() {
  const { exams, fetchExams, isLoading, downloadCertificate, blob } =
    useExamStore();

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  useEffect(() => {
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "certificate.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  }, [blob]);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    //TODO: Hit API with search term
  };
  return (
    <div className="flex-1 max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Exams History</h1>
        <p className="text-lg text-white max-w-3xl mx-auto">
          View the results of all the exams you have completed along with the
          scores and other details.
        </p>
      </div>
      <form className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon
              className="w-5 h-5 text-gray-400"
              width={24}
              height={24}
            />
          </div>
          <input
            type="text"
            placeholder="Search by exam title... "
            onChange={onSearch}
            className="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </form>
      <div className="bg-gray-800 rounded-lg p-8 overflow-y-auto">
        {exams?.length === 0 ? (
          <>
            <FileText
              width={24}
              height={24}
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
            />
            <h3 className="text-xl font-medium text-white mb-2">
              No completed exams found
            </h3>
            <p className="text-gray-400">
              You haven't completed any exams yet. Go back to the home page to
              start an exam.
            </p>
            <button
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
            >
              Back to home
            </button>
          </>
        ) : (
          <table className="w-full text-white">
            {/* <thead>
              <tr>
                <th className="px-4 py-2">Exam</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead> */}
            <tbody>
              {exams?.map((exam) => (
                <tr key={exam.id}>
                  <td className="px-4 py-2">{exam.title}</td>
                  <td className="px-4 py-2">{exam.score}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-end space-x-4">
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        type="button"
                      >
                        View
                      </button>
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        type="button"
                        onClick={() => {
                          if (!isLoading) {
                            downloadCertificate(exam.id);
                          }
                        }}
                      >
                        {/* {isLoading ? (
                          <>
                            <LoaderCircle
                              width={24}
                              height={24}
                              className="w-5 h-5 mr-2 animate-spin"
                            />
                            Downloading
                          </>
                        ) : (
                          <>
                            <Download
                              width={24}
                              height={24}
                              className="w-5 h-5 mr-2"
                            />
                            Certificates
                          </>
                        )} */}
                        <Download
                          width={24}
                          height={24}
                          className="w-5 h-5 mr-2"
                        />
                        Certificates
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
