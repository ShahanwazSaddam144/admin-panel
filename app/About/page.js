import React from "react";
import {
  Github,
  Network,
  Workflow,
  FileText,
  Users,
  Bell,
  BarChart3,
  Briefcase,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="bg-transparent">
        <header className="flex flex-col min-h-screen justify-center items-center px-4 md:px-10">
          <h1 className="text-4xl sm:text-5xl md:text-[50px] text-gray-900 font-extrabold text-center">
            Client & Developer
            <span className="ml-2 sm:ml-3 text-blue-600 block sm:inline">
              Collaboration Platform
            </span>
          </h1>
          <p className="text-center w-full sm:w-4/5 md:w-3/5 text-gray-700 font-semibold mt-5 text-sm sm:text-base md:text-lg">
            A single-platform collaboration tool that replaced fragmented
            email/chat processes and automated progress reporting — improving
            transparency and reducing manual status updates.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-5">
            <a
              href="https://github.com/ShahanwazSaddam144/admin-panel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="mt-10 bg-blue-600 px-6 py-2 hover:bg-blue-700 text-white
                           rounded-[5px] font-medium cursor-pointer flex items-center gap-2"
              >
                <Github size={18} />
                View Repo
              </button>
            </a>

            <Link href="#main-features">
              <button
                className="mt-10 bg-blue-600 px-6 py-2 hover:bg-blue-700 text-white
                           rounded-[5px] font-medium cursor-pointer flex items-center gap-2"
              >
                Explore More
              </button>
            </Link>
          </div>
        </header>
      </section>

      {/* Main Points */}
      <section className="mt-20 px-4" id="main-features">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Role Card */}
          <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600">
              <Briefcase size={24} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">Role</h2>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                Full-Stack Engineer — owned end-to-end design and implementation
                of client & developer workflows, GitHub integration, and CI/CD
                automation.
              </p>
            </div>
          </div>

          {/* Constraints Card */}
          <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 text-gray-700">
              <CheckCircle size={24} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Constraints
              </h2>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                MVP in 8 weeks, role-based access, secure logins,
                enterprise-grade data isolation, limited budget for external
                integrations.
              </p>
            </div>
          </div>
        </div>

        {/* Problem and Approach */}
        <div className="mt-6 w-full flex justify-center">
          <div className="w-full bg-white border border-gray-200 rounded-lg px-6 py-4">
            <div className="flex items-start gap-4">
              <Network className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Problem</h2>
                <p className="mt-1 text-gray-600 text-sm leading-relaxed">
                  Clients and developers relied on email, chat, and spreadsheets
                  to track work, which caused missed updates, unclear ownership,
                  and frequent status-check requests.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full flex justify-center">
          <div className="w-full bg-white border border-gray-200 rounded-lg px-6 py-4">
            <div className="flex items-start gap-4">
              <Workflow className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Approach
                </h2>
                <ul className="mt-1 text-gray-600 text-sm leading-relaxed list-disc">
                  <li>
                    Interviewed 5 users (clients & developers) to understand
                    real pain points and workflow bottlenecks.
                  </li>
                  <li>
                    Mapped user journeys for three key personas: client,
                    manager, developer, to visualize interactions and
                    responsibilities.
                  </li>
                  <li>
                    Used AI tools to rapidly prototype UI and workflows,
                    enabling quick validation of core concepts before
                    development.
                  </li>
                  <li>
                    Planned and prioritized the MVP: quotes, messaging, progress
                    tracking, GitHub integration — focusing on automating the
                    most painful manual steps first.
                  </li>
                  <li>
                    Executed 1-week sprints with early pilot feedback from
                    users, iterating quickly to refine functionality and UX.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mt-15">
        <h1 className="text-center font-bold text-gray-900 text-[35px]">
          Key Features
        </h1>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {/* Feature 1 */}
          <div className="w-[280px] bg-white border border-gray-200 rounded-lg p-5">
            <header className="flex gap-4 items-center mb-2">
              <Workflow size={22} className="text-blue-600" />
              <h2 className="font-semibold text-gray-900">Quote Requests</h2>
            </header>
            <p className="text-gray-600 text-sm leading-relaxed">
              Quickly create and send quote requests to streamline client
              approvals and save time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="w-[280px] bg-white border border-gray-200 rounded-lg p-5">
            <header className="flex gap-4 items-center mb-2">
              <FileText size={22} className="text-blue-600" />
              <h2 className="font-semibold text-gray-900">Project Tracking</h2>
            </header>
            <p className="text-gray-600 text-sm leading-relaxed">
              Keep all your projects organized with clear timelines, milestones,
              and progress updates.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="w-[280px] bg-white border border-gray-200 rounded-lg p-5">
            <header className="flex gap-4 items-center mb-2">
              <Users size={22} className="text-blue-600" />
              <h2 className="font-semibold text-gray-900">Team Collaboration</h2>
            </header>
            <p className="text-gray-600 text-sm leading-relaxed">
              Collaborate seamlessly with team members and clients in one shared
              workspace.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="w-[280px] bg-white border border-gray-200 rounded-lg p-5">
            <header className="flex gap-4 items-center mb-2">
              <Bell size={22} className="text-blue-600" />
              <h2 className="font-semibold text-gray-900">
                Real-Time Notifications
              </h2>
            </header>
            <p className="text-gray-600 text-sm leading-relaxed">
              Stay updated instantly with notifications for important tasks and
              messages.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="w-[280px] bg-white border border-gray-200 rounded-lg p-5">
            <header className="flex gap-4 items-center mb-2">
              <BarChart3 size={22} className="text-blue-600" />
              <h2 className="font-semibold text-gray-900">Progress Insights</h2>
            </header>
            <p className="text-gray-600 text-sm leading-relaxed">
              Gain actionable insights from charts and analytics to improve
              project efficiency.
            </p>
          </div>
        </div>

        {/* Results */}
        <section className="mt-15">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Card 1: Outcome / Results */}
            <div className="w-full sm:w-[450px] bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <BarChart3 size={22} className="text-blue-600" />
                Outcome / Results
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm leading-relaxed">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Clients reported clearer visibility and fewer status meetings
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Developers stopped manual update emails
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Single source of truth for all project activity
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Automated GitHub progress reduced manual reporting work
                </li>
              </ul>
            </div>

            {/* Card 2: Lessons Learned */}
            <div className="w-full sm:w-[450px] bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Lightbulb size={22} className="text-yellow-500" />
                Lessons Learned
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm leading-relaxed">
                <li className="flex items-center gap-2">
                  <Lightbulb size={16} className="text-yellow-500" />
                  Start with one core workflow and automate the worst manual step first
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb size={16} className="text-yellow-500" />
                  Push heavy integrations (webhook processing) to background workers
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb size={16} className="text-yellow-500" />
                  Distinguish client-view vs developer-view to reduce noise
                </li>
              </ul>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
};

export default About;
