import AllBookings from '../components/admin_dashboard/AllBookings'
import Shop from '../components/admin_dashboard/Shop'
import ShopDashboard from '../components/admin_dashboard/ShopDashboard'
import React, { useState } from 'react'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings')

  const tabs = [
    { id: 'bookings', name: 'Customer Bookings', icon: '' },
    { id: 'shop', name: 'Shop Management', icon: '' },
    { id: 'dashboard', name: 'Shop Dashboard', icon: '' }
  ]

  const renderContent = () => {
    switch(activeTab) {
      case 'bookings':
        return <AllBookings />
      case 'shop':
        return <Shop />
      case 'dashboard':
        return <ShopDashboard />
      default:
        return <AllBookings />
    }
  }

  return (
    <div className="min-h-screen p-4" style={{ background: 'linear-gradient(155deg, #efe5da 0%, #f7f1ea 55%, #e5d8c8 100%)' }}>
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-[#dbcab8] text-center rounded-2xl p-6 mb-6 brand-shadow">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your bookings, barbers, and shop dashboard</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 border border-[#dbcab8]">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#6f4e37] border-b-2 border-[#6f4e37] bg-[#f7efe6]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#dbcab8]">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

