import localFont from "next/font/local";
import { FC, useEffect, useState } from "react";
import { Card, LoadingSpinner } from "../../components";
import { CreateCompanyForm } from "../../components/CreateCompanyForm";

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
  const perPage: number = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
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
        console.error((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [currentPage, perPage]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/companies/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete company");
      }

      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== id)
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  const handleCreate = async (newCompany: {
    name: string;
    address: string;
  }) => {
    try {
      const response = await fetch("http://localhost:3000/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompany),
      });

      if (!response.ok) {
        throw new Error("Failed to create company");
      }

      const createdCompany = await response.json();
      setCompanies((prevCompanies) => [...prevCompanies, createdCompany]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

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
      <CreateCompanyForm onCreate={handleCreate} />
      <div
        className={`${geistSans.variable} ${geistMono.variable} grid md:grid-cols-3 gap-4 sm:grid-cols-1 items-center justify-items-center  py-4 px-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]`}
      >
        {companies?.map((item) => (
          <Card
            id={item.id}
            name={item.name}
            address={item.address}
            key={item.id}
            onDelete={handleDelete}
          />
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
