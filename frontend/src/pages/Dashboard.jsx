import React from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Utensils, Bus, BookOpen, Ticket } from 'lucide-react';

const StatCard = ({ title, value, subValue, change, positive }) => (
    <Card className="p-6 relative overflow-hidden group hover:border-[#F59E0B]/30 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${positive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {change}
            </span>
        </div>
        <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-gray-500">{subValue}</p>
        </div>
    </Card>
);

const TransactionItem = ({ icon: Icon, title, date, amount }) => (
    <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-xl hover:bg-[#252525] transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#2A2A2A] text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-black transition-colors">
                <Icon size={20} />
            </div>
            <div>
                <h4 className="font-medium text-white">{title}</h4>
                <p className="text-xs text-gray-500">{date}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-medium text-[#c0e0c0]">{amount}</p>
            <p className="text-xs text-gray-500">Today</p>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="flex min-h-screen bg-black">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white mb-1">
                            Good evening, {user?.name.split(' ')[0]}
                        </h1>
                        <p className="text-gray-400">Here's your portfolio overview for today.</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center text-black font-bold text-lg">
                        {user?.name.split(' ').map(n => n[0]).join('')}
                    </div>
                </header>

                <div className="grid grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Spent" value="₱2,450" subValue="₱2,847,392" change="+10%" positive={false} />
                    <StatCard title="Remaining Budget" value="₱2,450" subValue="-10% from last month" change="-5%" positive={true} />
                    <StatCard title="Daily Average" value="₱1,550" subValue="₱120" change="-5%" positive={true} />
                    <StatCard title="Monthly Allowance" value="₱4,000" subValue="-5% from last year" change="-5%" positive={true} />
                </div>

                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-serif font-bold text-white">Recent Transactions</h2>
                            <button className="text-[#F59E0B] text-sm hover:underline">View All</button>
                        </div>

                        <div className="space-y-3">
                            <TransactionItem icon={Utensils} title="Lunch at Canteen" date="Today, 10:23 PM" amount="₱65" />
                            <TransactionItem icon={Bus} title="Jeepney Fare" date="Today" amount="₱13" />
                            <TransactionItem icon={BookOpen} title="Notebook & Pens" date="Today" amount="₱150" />
                            <TransactionItem icon={Ticket} title="Movie Ticket" date="Feb 15, 2024" amount="₱180" />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <Card className="h-full flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <h2 className="text-xl font-serif font-bold text-white mb-4">Budget Goal</h2>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                Unlock advanced monthly analysis and investment settings here members.
                            </p>
                            <Button variant="secondary" className="bg-white text-black hover:bg-gray-200 mt-auto">
                                Set Budget
                            </Button>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
