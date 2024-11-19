"use client"; // Add this directive at the top

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageModal from "./components/ImageModal";

type MenuItem = {
  id: number;
  created_at: string;
  title: string;
  content: string;
  imageUrl: string;
  source: string;
};

const defaultData = [
  {
    id: 1,
    created_at: "",
    title: "이가네",
    content: "",
    imageUrl: "/ready.png",
    source: "https://www.instagram.com/iganepork",
  },
  {
    id: 2,
    created_at: "",
    title: "더식탁",
    content: "",
    imageUrl: "/ready.png",
    source: "https://www.instagram.com/the.siktak",
  },
  {
    id: 3,
    created_at: "",
    title: "동천한식뷔페",
    content: "",
    imageUrl: "/ready.png",
    source: "https://pf.kakao.com/_xgUVZn/posts",
  },
];

export default function Page() {
  const [menuData, setMenuData] = useState<MenuItem[]>(defaultData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // Fetch data on the client side
  useEffect(() => {
    async function fetchData() {
      //   const dev = "http://localhost:3001";
      const prod = "https://whattoeattoday-server.vercel.app";
      const res = await fetch(`${prod}/api/menu`);
      const data = await res.json();
      const menus: MenuItem[] | undefined | null = data.data;
      if (menus) {
        const filteredData = menuData.filter((menu) => {
          return !menus.find((m) => {
            return m.source === menu.source;
          });
        });
        const newData = [...menus, ...filteredData];
        setMenuData(newData);
      }
    }
    fetchData();
  }, []);

  const openModal = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentImage(null);
    setIsModalOpen(false);
  };

  // Get today's date
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col p-4 bg-white rounded-lg shadow">
        <h1 className="text-xl font-bold text-center">{formattedDate}</h1>
        <h1 className="text-2xl font-bold text-center mb-6">유타워 한식뷔페 메뉴</h1>
        <p className="text-sm text-center text-gray-400 mb-6">* 메뉴는 매일 오전 11시 05분 경 업데이트 됩니다.</p>

        {/* Container for horizontal layout */}
        <div className="flex flex-row space-x-4 overflow-x-auto">
          {menuData.map((item) => (
            <div key={item.id} className="flex-1 mb-4">
              <h2 className="text-xl font-semibold mb-2 text-center">{item.title}</h2>
              <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer  mb-4" onClick={() => item.imageUrl && openModal(item.imageUrl)}>
                {item.imageUrl ? <Image src={item.imageUrl} alt={`${item.source} 메뉴 이미지`} width={300} height={200} className="object-cover" /> : <p className="text-gray-500">준비중입니다.</p>}
              </div>
              <a href={item.source} className="text-blue-500 underline text-center block">
                메뉴 확인하기
              </a>
            </div>
          ))}
        </div>
        {currentImage && <ImageModal isOpen={isModalOpen} onOpenChange={closeModal} imageUrl={currentImage} altText="확대된 이미지" />}
      </div>
    </div>
  );
}
