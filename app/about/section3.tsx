"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface TeamMember {
  id: number;
  title: string;
  designation: string;
  imageUrl: string;
}

const Section3: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/aboutUs/meetTheTeam");
        const data = await res.json();
        setTeam(data.data || []);
      } catch (err) {
        console.error("Failed to fetch team:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, []);

  if (loading) return <p className="text-center py-16">Loading team...</p>;

  return (
    <section className=" container mx-auto px-6 lg:px-20 relative z-10 mb-28 mt-28">
      <h2 className="text-3xl md:text-4xl text-center text-gray-800 mb-10">
        Meet the Team
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {team.map((member) => (
          <div
            key={member.id}
            className="flex flex-col gap-5 w-[280px] w-full mx-auto" 
          >
            <div className="w-full aspect-square relative">
              <Image
                src={member.imageUrl}
                alt={member.title}
                fill
                className="object-cover rounded-[24px] shadow-md"
                sizes="280px"
                priority
              />
            </div>

            <div className="w-full text-left">
              <h3 className="text-xl text-gray-800 mb-1">{member.title}</h3>
              <p className="text-gray-600 text-sm">{member.designation}</p>
            </div>
          </div>

        ))}
      </div>
    </section>


  );
};

export default Section3;
