import { NextApiRequest, NextApiResponse } from "next";

// Define TypeScript interfaces for company data
interface Company {
  id: number;
  name: string;
  address: string;
}

// In-memory company data (in real apps, this would come from a database)
let companies: Company[] = [
  { id: 1, name: "Tech Corp", address: "123 Tech Lane" },
  { id: 2, name: "Innovate LLC", address: "456 Innovate Road" },
  { id: 3, name: "Startup Hub", address: "789 Startup Avenue" },
  { id: 4, name: "Enterprise Inc", address: "101 Enterprise Blvd" },
  { id: 5, name: "Fintech Solutions", address: "202 Fintech Street" },
  { id: 6, name: "Tech Corp", address: "123 Tech Lane" },
  { id: 7, name: "Innovate LLC", address: "456 Innovate Road" },
  { id: 8, name: "Startup Hub", address: "789 Startup Avenue" },
  { id: 9, name: "Enterprise Inc", address: "101 Enterprise Blvd" },
  { id: 10, name: "Fintech Solutions", address: "202 Fintech Street" },
  { id: 11, name: "Enterprise Inc", address: "101 Enterprise Blvd" },
  { id: 12, name: "Fintech Solutions", address: "202 Fintech Street" },
  // ... add more companies as needed for testing
];

// API handler function
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    // GET: Fetch all companies
    case "GET": {
      // Parse query parameters for pagination (default to page 1 and 5 items per page)
      const { page = "1", limit = "6" } = req.query;
      const currentPage = parseInt(page as string, 10) || 1;
      const perPage = parseInt(limit as string, 10) || 6;

      // Calculate pagination values
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;

      const paginatedCompanies = companies.slice(startIndex, endIndex);
      const totalCompanies = companies.length;
      const totalPages = Math.ceil(totalCompanies / perPage);

      res.status(200).json({
        data: paginatedCompanies,
        meta: {
          currentPage,
          perPage,
          totalCompanies,
          totalPages,
        },
      });
      break;
    }
    // POST: Create a new company
    case "POST":
      const { name, address } = req.body as { name: string; address: string };
      if (!name || !address) {
        res.status(400).json({ error: "Name and Address are required" });
        return;
      }
      const newCompany: Company = { id: companies.length + 1, name, address };
      companies.push(newCompany);
      res.status(201).json(newCompany);
      break;

    // PUT: Update an existing company
    case "PUT":
      const { id, newName, newAddress } = req.body as {
        id: number;
        newName: string;
        newAddress: string;
      };
      const index = companies.findIndex((company) => company.id === id);
      if (index !== -1) {
        companies[index] = {
          ...companies[index],
          name: newName,
          address: newAddress,
        };
        res.status(200).json(companies[index]);
      } else {
        res.status(404).json({ error: "Company not found" });
      }
      break;

    // DELETE: Remove a company
    case "DELETE":
      const { deleteId } = req.body as { deleteId: number };
      companies = companies.filter((company) => company.id !== deleteId);
      res.status(200).json({ message: "Company deleted" });
      break;

    // Handle other methods
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
