import React, { useState } from 'react';
import { useData } from '../context/DataContext';

interface AdminLoginViewProps {
  onSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onSuccess, onNavigateHome }) => {
  const { loginAdmin } = useData();
  const [email, setEmail] = useState('admin@banlgarghor.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await loginAdmin(email, password);
    setLoading(false);
    if (res.success) {
      onSuccess();
    } else {
      setError(res.error || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleQuickDemo = async () => {
    setEmail('admin@banlgarghor.com');
    setPassword('admin123');
    setLoading(true);
    const res = await loginAdmin('admin@banlgarghor.com', 'admin123');
    setLoading(false);
    if (res.success) onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#141312] text-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B39366] font-medium block">
            Executive Portal
          </span>
          <h1 className="text-3xl font-serif text-white">
            Banlgar Ghor Remodeling
          </h1>
          <p className="text-xs text-[#A99F94]">
            Content Management System & Lead Operations
          </p>
        </div>

        <div className="bg-[#252220] border border-[#3D3834] p-8 space-y-6">
          {error && (
            <div className="p-3 bg-[#3A1D1A] border border-[#6E2B25] text-xs text-[#F5B5AE]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-[#D3C9BD] uppercase tracking-wider block text-[10px]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#141312] border border-[#3D3834] p-3 text-white focus:outline-none focus:border-[#B39366]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#D3C9BD] uppercase tracking-wider block text-[10px]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#141312] border border-[#3D3834] p-3 text-white focus:outline-none focus:border-[#B39366]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FAF8F5] text-[#141312] hover:bg-[#EAE4DC] py-3 uppercase tracking-widest font-medium transition-all"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="pt-2 border-t border-[#3D3834] text-center space-y-3">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-xs text-[#B39366] hover:underline uppercase tracking-wider block w-full py-1 font-medium"
            >
              ⚡ Quick Fill & Sign In as Super Admin
            </button>
            <div className="text-[11px] text-[#8A8177]">
              Default Demo Account: admin@banlgarghor.com / admin123
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onNavigateHome}
            className="text-xs text-[#A99F94] hover:text-white underline uppercase tracking-wider"
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
