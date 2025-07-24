
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Building, Lock } from 'lucide-react';

interface AdminAuthProps {
  onAuthenticate: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin login attempt:', { email, password });
    
    setIsLoading(true);

    try {
      // For demo purposes, allow any email with "admin" and any password
      // OR allow the current user's email for testing
      if ((email.includes('admin') || email === 'ade.maryadi.stefanus@gmail.com') && password.length > 0) {
        console.log('Admin login successful');
        
        // Store admin authentication status
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminEmail', email);
        
        onAuthenticate();
        toast({
          title: 'Login Berhasil',
          description: 'Selamat datang di panel admin',
        });
      } else {
        console.log('Admin login failed - invalid credentials');
        toast({
          title: 'Login Gagal',
          description: 'Email harus mengandung "admin" atau gunakan email yang terdaftar',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: 'Login Gagal',
        description: 'Terjadi kesalahan, silakan coba lagi',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Building className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin Sarang Rumah</CardTitle>
          <p className="text-gray-600">Masuk ke panel admin</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Memverifikasi...' : 'Masuk ke Admin Panel'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
