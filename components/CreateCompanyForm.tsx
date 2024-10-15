import { FC, useState } from "react";

export const CreateCompanyForm: FC<{
  onCreate: (company: { name: string; address: string }) => void;
}> = ({ onCreate }) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  return (
    <form onSubmit={() => onCreate({ name, address })}>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Address</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2  text-black"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </div>
    </form>
  );
};
