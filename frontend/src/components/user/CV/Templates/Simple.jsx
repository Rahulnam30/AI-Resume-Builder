import React from "react";

const Simple = () => {
  return (
    <div className="max-w-4xl resume-root space-y-6 mx-auto bg-white p-10 shadow-xl rounded-xl text-gray-800 leading-relaxed">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-wide">Alok Ranjan</h1>
        <p className="text-sm mt-1">
          BS (Hons) Computer Science & Data Analytics | IIT Patna
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-2 text-gray-600">
          <span>📞 +91-6202585952</span>
          <span>✉️ alok_2312res78@iitp.ac.in</span>
          <span>🌐 Portfolio</span>
          <span>🐙 GitHub</span>
          <span>🔗 LinkedIn</span>
        </div>
      </div>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b mb-2 pb-1">Education</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">
              B.Sc (Hons) Computer Science & Data Analytics — IIT Patna
            </span>
            <span>2025 – Present</span>
          </div>
          <p className="text-gray-600">CGPA: 8.19 (Current)</p>

          <div className="flex justify-between mt-2">
            <span className="font-medium">Senior Secondary (XII) — CBSE</span>
            <span>2022</span>
          </div>
          <p className="text-gray-600">84.2%</p>

          <div className="flex justify-between mt-2">
            <span className="font-medium">Secondary (X) — CBSE</span>
            <span>2020</span>
          </div>
          <p className="text-gray-600">76%</p>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b mb-2 pb-1">Projects</h2>

        <div className="mb-4">
          <div className="flex justify-between text-sm font-medium">
            <span>WallpaperBot — MERN Web App</span>
            <span>Jul 2025 – Present</span>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
            <li>
              Wallpaper platform with role-based access for owners and users.
            </li>
            <li>
              JWT + Firebase authentication with REST APIs using Node, Express,
              MongoDB.
            </li>
            <li>
              React, Redux, Tailwind frontend with Cloudinary + Multer uploads.
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm font-medium">
            <span>BotWears — MERN E-Commerce</span>
            <span>Nov 2025 – Present</span>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
            <li>Full-stack clothing store with Admin/User dashboards.</li>
            <li>Google login + JWT authentication with AI voice navigation.</li>
            <li>Search, filters, recommendations, and inventory management.</li>
          </ul>
        </div>

        <div>
          <div className="flex justify-between text-sm font-medium">
            <span>ALook — AI Image Enhancer</span>
            <span>Dec 2024 – Jan 2025</span>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
            <li>AI-powered photo enhancement using PicsArt API.</li>
            <li>
              React + Tailwind responsive frontend with instant HD output.
            </li>
          </ul>
        </div>
      </section>

      {/* Internships */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b mb-2 pb-1">
          Internships
        </h2>

        <div className="mb-4">
          <div className="flex justify-between text-sm font-medium">
            <span>Hybrid Integrated Internship Program — GUVI (HCL)</span>
            <span>Jun 2025 – Sep 2025</span>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
            <li>
              Hands-on industry-style projects in Python, ML, and Data Science.
            </li>
            <li>Worked with TensorFlow, scikit-learn, and MySQL.</li>
            <li>Completed multiple assignments and received certification.</li>
          </ul>
        </div>

        <div>
          <div className="flex justify-between text-sm font-medium">
            <span>Web Development Intern — ApexPlanet (AICTE Approved)</span>
            <span>Oct 2025 – Nov 2025</span>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
            <li>
              Built responsive layouts, forms, to-do app, image gallery, weather
              app.
            </li>
            <li>Developed a full portfolio website as final project.</li>
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b mb-2 pb-1">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-sm text-gray-700">
          <p>
            <span className="font-medium">Programming:</span> Python,
            JavaScript, SQL
          </p>
          <p>
            <span className="font-medium">Frameworks:</span> React, Next.js,
            Node.js, Express
          </p>
          <p>
            <span className="font-medium">Libraries:</span> Pandas, NumPy,
            scikit-learn, Redux Toolkit
          </p>
          <p>
            <span className="font-medium">Databases:</span> MongoDB, MySQL
          </p>
          <p>
            <span className="font-medium">Tools:</span> Git, Postman, PowerBI,
            VS Code, Google Colab
          </p>
          <p>
            <span className="font-medium">Web/App:</span> HTML, CSS, React
            Native
          </p>
        </div>
      </section>

      {/* Courses */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b mb-2 pb-1">
          Key Courses Taken
        </h2>
        <p className="text-sm text-gray-700">
          Data Mining, DBMS, Machine Learning, Data Science
        </p>
      </section>

      {/* POR */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b mb-2 pb-1">
          Positions of Responsibility
        </h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Member, Technology Club — IIT Patna</li>
          <li>
            Participated in workshops, quizzes, coding competitions, and tech
            events.
          </li>
        </ul>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-lg font-semibold border-b mb-2 pb-1">
          Certifications
        </h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>GeeksforGeeks — React Native Mobile App Development</li>
          <li>GUVI (HCL) — Data Science Certification</li>
        </ul>
      </section>
    </div>
  );
};

export default Simple;
