import { createMocks } from "node-mocks-http";
import handler from "../companies";

const mockCompanyData = {
  name: "New Company",
  address: "New Address",
};

describe("/api/companies", () => {
  it("should return a list of companies on GET", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    console.log(JSON.parse(res._getData()));

    expect(res._getStatusCode()).toBe(200);
    const { data } = JSON.parse(res._getData());
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(0);
  });

  it("should create a new company on POST", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: mockCompanyData,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.company.name).toBe(mockCompanyData.name);
    expect(data.company.address).toBe(mockCompanyData.address);
  });

  it("should return 400 for POST with missing data", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { name: "" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(false);
    expect(data.message).toBe("Name and address are required.");
  });
});
