"use client";

import { Download } from "lucide-react";
import React, { useState } from "react";

export function FileManagement() {
  const [files] = useState([
    { version: '1.0.0', name: "Biblia-Pagbabawi.apk", url: "/apk/v1.apk" },
  ]);

  return (
    <div className="min-h-screen container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bible Recovery Tagalog Version</h1>
      <div className="bg-white rounded-lg shadow p-4">
        {files.map((file) => (
          <div
            key={file.version}
            className="flex items-center justify-between border-b py-3"
          >
            <span className="text-gray-800 font-bold pr-1">{file.name} - v{file.version}</span>
            <a
              href={file.url}
              download={file.name}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex gap-2"
            >
              <Download /> Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
