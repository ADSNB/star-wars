"use client";

import { useState, useEffect } from "react";

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
}

export default function StarshipsPage() {
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchStarshipsData = async () => {
    const allStarships: Starship[] = [];
    const manufacturerSet = new Set<string>();
    let nextPage = process.env.NEXT_STARWARS_API_URL;

    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();

      data.results.forEach((ship: Starship) => {
        allStarships.push(ship);
        ship.manufacturer.split(",").forEach((m) => manufacturerSet.add(m.trim()));
      });

      nextPage = data.next;
    }

    // Sort starships by name
    const sortedStarships = allStarships.sort((a, b) => a.name.localeCompare(b.name));

    setStarships(sortedStarships);
    setManufacturers(Array.from(manufacturerSet).sort());
    setLoading(false);
  };

  useEffect(() => {
    fetchStarshipsData();
  }, []);

  const displayedStarships = selectedManufacturer ? starships.filter((ship) => ship.manufacturer.includes(selectedManufacturer)) : starships;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Star Wars Starships List</h1>

      {loading ? (
        <div className="text-center text-xl">Loading starships data...</div>
      ) : (
        <div>
          <select value={selectedManufacturer} onChange={(e) => setSelectedManufacturer(e.target.value)} className="w-full max-w-md p-2 mb-6 border border-gray-300 rounded-md shadow-sm">
            <option value="">All Manufacturers</option>
            {manufacturers.map((manufacturer) => (
              <option key={manufacturer} value={manufacturer}>
                {manufacturer}
              </option>
            ))}
          </select>

          <div className="overflow-x-auto">
            <table className="max-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Model</th>
                  <th className="border p-2">Manufacturer</th>
                  <th className="border p-2">Crew</th>
                  <th className="border p-2">Passengers</th>
                  <th className="border p-2">Cargo Capacity</th>
                </tr>
              </thead>
              <tbody>
                {displayedStarships.map((ship, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2">{ship.name}</td>
                    <td className="border p-2">{ship.model}</td>
                    <td className="border p-2">{ship.manufacturer}</td>
                    <td className="border p-2">{ship.crew}</td>
                    <td className="border p-2">{ship.passengers}</td>
                    <td className="border p-2">{ship.cargo_capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
