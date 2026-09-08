"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Code, 
  Calendar, 
  Github, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Brain, 
  Sparkles, 
  Trophy, 
  GraduationCap, 
  Send,
  Mic,
  MicOff
} from "lucide-react";

export default function RamVerse() {
  const [activeTab, setActiveTab] = useState("all");
  const [commandInput, setCommandInput] = useState("");

  // Voice Controller States
  const [listening, setListening] = useState(false);
  const [statusText, setStatusText] = useState("");

  // Sample State Management
  const [tasks, setTasks] = useState([
    { id: 1, title: "Python End-Term Re-Exam Prep", category: "LPU", dueDate: "Today 5:00 PM", priority: "High", completed: false },
    { id: 2, title: "Data Science Assignment Submission", category: "IITM", dueDate: "Tomorrow", priority: "High", completed: false },
    { id: 3, title: "Solve 3 Dynamic Programming Problems", category: "Coding", dueDate: "Today 9:00 PM", priority: "Medium", completed: true },
    { id: 4, title: "Review Open PRs on GitHub", category: "Projects", dueDate: "Today", priority: "Low", completed: false }
  ]);

  const [dsaProblems, setDsaProblems] = useState([
    { id: 1, title: "Binary Tree Zigzag Level Order", topic: "Trees", difficulty: "Medium", nextRevision: "In 2 days" },
    { id: 2, title: "Coin Change (DP)", topic: "Dynamic Programming", difficulty: "Hard", nextRevision: "Today" },
  ]);

  const contests = [
    { name: "Codeforces Round 950 (Div. 2)", platform: "Codeforces", time: "Tomorrow 8:05 PM" },
    { name: "LeetCode Weekly Contest 400", platform: "LeetCode", time: "Sunday 8:00 AM" }
  ];

  // Local Python Agent Call
  const handleVoiceAction = async (command) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "system_control", target: command }),
      });
      const data = await res.json();
      setStatusText(`Agent: ${data.message}`);
    } catch (err) {
      setStatusText("Error connecting to local Python agent. Is agent.py running?");
    }
  };

  // Voice Action Listener Handler
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser does not support Speech Recognition. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
      setStatusText("Listening for system command...");
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setStatusText(`Command Received: "${transcript}"`);
      setListening(false);
      
      // Execute System/Laptop Action via Upgraded Agent
      await handleVoiceAction(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
      setStatusText("Voice recognition error.");
    };

    recognition.start();
  };

  // AI Command Parser Handler
  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const newTask = {
      id: Date.now(),
      title: commandInput,
      category: commandInput.toLowerCase().includes("iitm") ? "IITM" : commandInput.toLowerCase().includes("lpu") ? "LPU" : "Coding",
      dueDate: "Scheduled",
      priority: "Medium",
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setCommandInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = activeTab === "all" ? tasks : tasks.filter(t => t.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
            RV
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              RamVerse OS
            </h1>
            <p className="text-xs text-slate-400">Dual-Degree & Career Acceleration Engine</p>
          </div>
        </div>

        {/* Global Stats Bar */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-300">LPU + IITM Active</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">Streak: 12 Days</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI Bar, Voice Agent & Primary Trackers (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Integrated System Voice Control Widget */}
          <div className="bg-slate-800/50 border border-indigo-500/30 rounded-2xl p-4 shadow-xl backdrop-blur flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={startListening}
                className={`p-3 rounded-xl font-semibold flex items-center gap-2 transition ${
                  listening ? "bg-red-500 animate-pulse text-white shadow-lg shadow-red-500/40" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                }`}
              >
                {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span className="text-sm">{listening ? "Listening..." : "Voice Action"}</span>
              </button>
              <p className="text-xs text-slate-400">
                {statusText || "Click to voice control system (e.g. 'Volume up', 'Take screenshot', 'Lock PC')"}
              </p>
            </div>
            <span className="text-[10px] bg-slate-900 border border-slate-700 text-indigo-300 px-2.5 py-1 rounded-full font-mono">
              Agent: 127.0.0.1:8000
            </span>
          </div>

          {/* AI Command Input */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 shadow-xl backdrop-blur">
            <form onSubmit={handleCommandSubmit} className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              <input 
                type="text" 
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="Type command e.g., 'Remind me to submit IITM assignment at 6 PM'..."
                className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-500 text-sm"
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl transition">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Academic & Task Management */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" /> Task & Academic Routines
              </h2>
              {/* Filter Tabs */}
              <div className="flex gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800 text-xs">
                {["all", "LPU", "IITM", "Coding", "Projects"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition ${
                      activeTab === tab ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Task List */}
            <div className="flex flex-col gap-3">
              {filteredTasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer ${
                    task.completed 
                      ? "bg-slate-900/40 border-slate-800/80 opacity-60" 
                      : "bg-slate-800/50 border-slate-700/50 hover:border-indigo-500/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${task.completed ? "text-emerald-400" : "text-slate-500"}`} />
                    <div>
                      <p className={`text-sm font-medium ${task.completed ? "line-through text-slate-400" : "text-slate-200"}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {task.category}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    task.priority === "High" ? "text-rose-400 bg-rose-500/10" : "text-amber-400 bg-amber-500/10"
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DSA Spaced Repetition Tracker */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-purple-400" /> DSA Spaced Repetition Logger
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dsaProblems.map((prob) => (
                <div key={prob.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-slate-200">{prob.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {prob.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Topic: {prob.topic}</p>
                  <div className="mt-3 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Revision:</span>
                    <span className="text-indigo-400 font-medium">{prob.nextRevision}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Widgets, GitHub, & Contests (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Contests & Hackathons Alert Widget */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h2 className="font-semibold text-md flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-amber-400" /> Upcoming Contests
            </h2>
            <div className="flex flex-col gap-3">
              {contests.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-medium text-slate-200">{c.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{c.platform}</p>
                  </div>
                  <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-1 rounded font-medium">
                    {c.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Live Sync Widget */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h2 className="font-semibold text-md flex items-center gap-2 mb-4">
              <Github className="w-4 h-4 text-emerald-400" /> Dev & GitHub Stats
            </h2>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Daily Commits:</span>
                <span className="font-bold text-emerald-400">5 Commits</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Open Pull Requests:</span>
                <span className="font-bold text-indigo-400">2 Active</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-500 h-1.5 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
