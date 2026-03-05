
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { db, WorkerStats } from '@/lib/db';
import {
    ChevronLeft,
    Download,
    Share2,
    MapPin,
    ShieldCheck,
    Calendar,
    Building2,
    Fingerprint
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const WorkerIDCard: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [stats, setStats] = useState<WorkerStats | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setStats(db.getStats());
    }, []);

    const handleExport = async () => {
        if (!cardRef.current) return;

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 3, // High quality
                useCORS: true,
                backgroundColor: null
            });
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Center the card on the page
            const x = (pdfWidth - (pdfWidth * 0.8)) / 2;
            pdf.addImage(imgData, 'PNG', x, 20, pdfWidth * 0.8, pdfHeight * 0.8);
            pdf.save(`WorkerID_${stats?.id || 'Card'}.pdf`);
        } catch (error) {
            console.error('Export failed:', error);
        }
    };

    if (!stats) return null;

    return (
        <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center justify-center text-white">
            <div className="w-full max-w-md">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => navigate('/worker')}>
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-lg font-bold uppercase tracking-widest opacity-80">{t('id_card')}</h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.6 }}
                    className="perspective-1000"
                    ref={cardRef}
                >
                    <Card className="bg-white text-slate-900 overflow-hidden rounded-[2rem] shadow-2xl relative">
                        {/* Header / Brand */}
                        <div className="bg-primary p-6 flex justify-between items-center text-primary-foreground">
                            <div>
                                <h2 className="text-2xl font-black italic tracking-tighter">FieldGuard</h2>
                                <p className="text-[10px] font-bold tracking-[0.2em] opacity-80 uppercase">Worker Safety Protocol</p>
                            </div>
                            <ShieldCheck className="h-8 w-8 opacity-50" />
                        </div>

                        <CardContent className="p-8 space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="w-32 h-40 bg-slate-100 rounded-2xl overflow-hidden border-4 border-slate-50 flex-shrink-0">
                                    <img
                                        src={stats.photo}
                                        alt={stats.name}
                                        className="w-full h-full object-cover grayscale"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Worker Name</div>
                                        <div className="text-xl font-black leading-tight uppercase">{stats.name}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">FieldGuard ID</div>
                                        <div className="text-lg font-mono font-bold text-primary">{stats.id}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                        <Building2 className="h-3 w-3" /> Estate
                                    </div>
                                    <div className="font-bold text-sm uppercase">{stats.estate}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                        <Calendar className="h-3 w-3" /> Valid Since
                                    </div>
                                    <div className="font-bold text-sm">FEB 2024</div>
                                </div>
                            </div>

                            {/* Mock Barcode */}
                            <div className="pt-4 space-y-2">
                                <div className="h-16 w-full bg-[linear-gradient(90deg,transparent_0%,transparent_5%,#000_5%,#000_8%,transparent_8%,transparent_12%,#000_12%,#000_14%,transparent_14%,transparent_15%,#000_15%,#000_20%,transparent_20%,transparent_22%,#000_22%,#000_28%,transparent_28%,transparent_30%,#000_30%,#000_32%,transparent_32%,transparent_40%,#000_40%,#000_45%,transparent_45%,transparent_48%,#000_48%,#000_50%,transparent_50%,transparent_55%,#000_55%,#000_58%,transparent_58%,transparent_62%,#000_62%,#000_68%,transparent_68%,transparent_70%,#000_70%,#000_75%,transparent_75%,transparent_80%,#000_80%,#000_85%,transparent_85%,transparent_90%,#000_90%,#000_95%,transparent_95%)] opacity-80" />
                                <div className="text-center font-mono text-[10px] tracking-[0.5em] text-muted-foreground">
                                    * {stats.id.replace(/-/g, '')} *
                                </div>
                            </div>
                        </CardContent>

                        <div className="absolute top-[40%] right-[-10%] opacity-[0.03] rotate-12">
                            <ShieldCheck className="w-64 h-64" />
                        </div>
                    </Card>
                </motion.div>

                <div className="mt-12 grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-14 rounded-2xl border-white/20 hover:bg-white/10 text-white font-bold gap-2" onClick={handleExport}>
                        <Download className="h-5 w-5" /> Export
                    </Button>
                    <Button className="h-14 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold gap-2">
                        <Share2 className="h-5 w-5" /> Share
                    </Button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-xs">
                    <Fingerprint className="h-4 w-4" /> Securely generated via Blockchain-linked Identity
                </div>
            </div>
        </div>
    );
};

export default WorkerIDCard;
