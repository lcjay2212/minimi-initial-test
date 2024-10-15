import localFont from "next/font/local";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

interface Company {
  id: number;
  name: string;
  address: string;
}

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const Home: FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const perPage: number = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number | null>(null);

  console.log(companies, loading, error);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true); // Start loading on each request
        const response = await fetch(
          `http://localhost:3000/api/companies?page=${currentPage}&limit=${perPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }
        const data = await response.json();
        setCompanies(data.data);
        setTotalPage(data.meta.totalPages);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [currentPage, perPage]);

  const handleNextPage = () => {
    if (currentPage < (totalPage ?? 1)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="sm:p-20">
      <div
        className={`${geistSans.variable} ${geistMono.variable} grid md:grid-cols-3 gap-4 sm:grid-cols-1 items-center justify-items-center min-h-screen py-4 px-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]`}
      >
        {companies?.map((item) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
            key={item.id}
          >
            <Image
              className="w-full"
              src="https://via.placeholder.com/400x200"
              alt="Placeholder Image"
              width={100}
              height={100}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-black">
                {item.name}
              </div>
              <div className="font-bold text-lg mb-2 text-black">
                {item.address}
              </div>
              <p className="text-gray-700 text-base">
                This is a brief description of the company. It provides useful
                information about the company&apos;s mission, goals, and
                services.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center space-x-4 mt-6">
        {/* Previous Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg transition duration-300 
          ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-400"
          }`}
        >
          Previous
        </button>

        {/* Page Indicator */}
        <span className="text-gray-700 font-bold">
          Page {currentPage} of {totalPage}
        </span>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPage}
          className={`px-4 py-2 bg-blue-500 text-white font-bold rounded-lg transition duration-300
          ${
            currentPage === totalPage
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
