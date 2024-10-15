import Image from "next/image";
import { FC } from "react";

export const Card: FC<{
  id: number;
  name: string;
  address: string;
  onDelete: (id: number) => void;
}> = ({ id, name, address, onDelete }) => {
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
      key={id}
    >
      <Image
        className="w-full"
        src="https://via.placeholder.com/400x200"
        alt="Placeholder Image"
        width={100}
        height={100}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{name}</div>
        <div className="font-bold text-lg mb-2 text-black">{address}</div>
        <p className="text-gray-700 text-base">
          This is a brief description of the company. It provides useful
          information about the company&apos;s mission, goals, and services.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
