import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import { Menu, Home, BarChart2, Settings, X } from "lucide-react";
import { Navigate, useNavigate } from 'react-router-dom';

const barData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 7000 },
];

const pieData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  { name: "Product D", value: 200 },
];

const COLORS = ["#ff6600", "#ffcc00", "#ff3300", "#ff9900"];

export default function Dashboard() {
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={`flex h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Sidebar */}
      <div className="w-64 bg-orange-600 text-white p-5 flex flex-col space-y-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Button variant="ghost" className="flex items-center space-x-2" onClick={() => setPage("home")}>
            <Home /> <span>Home</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2" onClick={() => setPage("analytics")}>
            <BarChart2 /> <span>Analytics</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2" onClick={() => setShowSettings(true)}>
            <Settings /> <span>Settings</span>
          </Button>
        </nav>
      </div>
      
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Settings</h2>
              <button onClick={() => setShowSettings(false)}><X /></button>
            </div>
            <Button onClick={() => setDarkMode(!darkMode)} className="w-full bg-orange-600 text-white">
              Toggle {darkMode ? "Light" : "Dark"} Mode
            </Button>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 space-y-6">
        {/* Navbar */}
        <div className="flex justify-center items-center bg-black text-white p-4 rounded-lg">
          <button><Menu className="text-white" /></button>
          <h1 className="text-lg font-semibold">Dashboard Overview</h1>
        </div>
        
        {page === "home" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-orange-100 p-4">
              <CardContent>
                <h2 className="text-lg font-semibold">Total Sales</h2>
                <p className="text-xl font-bold">$45,000</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-100 p-4">
              <CardContent>
                <h2 className="text-lg font-semibold">Users</h2>
                <p className="text-xl font-bold">1,200</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-100 p-4">
              <CardContent>
                <h2 className="text-lg font-semibold">New Orders</h2>
                <p className="text-xl font-bold">320</p>
              </CardContent>
            </Card>
          </div>
        )}

        {page === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold col-span-2">Sales Analytics</h2>
            
            {/* Pie Chart */}
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#ff6600" dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Line Chart */}
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={barData}>
                  <XAxis dataKey="name" stroke="#000" />
                  <YAxis stroke="#000" />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#ff6600" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Area Chart */}
            <div className="col-span-2">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={barData}>
                  <XAxis dataKey="name" stroke="#000" />
                  <YAxis stroke="#000" />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#ff6600" fill="#ffcc00" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}