
import React from 'react';
import { Building, Users, Award, Heart, Target, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Tentang Sarang Rumah
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Misi kami adalah membantu setiap keluarga Indonesia menemukan rumah impian mereka dengan mudah dan terpercaya.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Cerita Kami
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Sarang Rumah lahir dari visi sederhana: membuat proses pencarian dan pembelian properti menjadi lebih mudah, transparan, dan menyenangkan untuk semua orang.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Dengan teknologi terdepan dan tim yang berpengalaman, kami menghubungkan ribuan keluarga dengan rumah impian mereka setiap harinya.
              </p>
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8">
                <Building className="h-32 w-32 text-blue-600 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-xl text-gray-600">
              Prinsip yang memandu setiap langkah perjalanan kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Kepercayaan</h3>
                <p className="text-gray-600">
                  Kami membangun kepercayaan melalui transparansi, kejujuran, dan komitmen untuk memberikan yang terbaik.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-full mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Inovasi</h3>
                <p className="text-gray-600">
                  Kami terus berinovasi dengan teknologi terbaru untuk memberikan pengalaman terbaik kepada pelanggan.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-full mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Keamanan</h3>
                <p className="text-gray-600">
                  Keamanan transaksi dan data pribadi pelanggan adalah prioritas utama dalam setiap layanan kami.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tim Kami
            </h2>
            <p className="text-xl text-gray-600">
              Dipimpin oleh profesional berpengalaman di bidang properti dan teknologi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Budi Santoso", role: "CEO & Founder", experience: "15 tahun pengalaman properti" },
              { name: "Sari Wijaya", role: "CTO", experience: "12 tahun pengalaman teknologi" },
              { name: "Ahmad Rahman", role: "Head of Sales", experience: "10 tahun pengalaman penjualan" }
            ].map((member, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Siap Menemukan Rumah Impian?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Bergabunglah dengan ribuan keluarga yang telah mempercayai kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                Lihat Properti
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
