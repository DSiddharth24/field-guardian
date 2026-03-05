
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { db, Weighment, InjuryReport } from '@/lib/db';
import {
    History as HistoryIcon,
    ChevronLeft,
    Scale,
    AlertCircle,
    CheckCircle2,
    Link as ChainIcon,
    Download,
    Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const WorkerHistory: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [weighments, setWeighments] = useState<Weighment[]>([]);
    const [reports, setReports] = useState<InjuryReport[]>([]);
    const historyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setWeighments(db.getWeighments());
        setReports(db.getInjuryReports());
    }, []);

    const handleDownloadPDF = async () => {
        if (!historyRef.current) return;

        try {
            const canvas = await html2canvas(historyRef.current, {
                scale: 2,
                useCORS: true,
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

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('WorkerHistory.pdf');
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 pb-12" ref={historyRef}>
            <div className="max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-6 pt-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/worker')}>
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-2xl font-black uppercase tracking-tight">{t('history')}</h1>
                </div>

                <div className="space-y-6">
                    {/* Section: Weighments */}
                    <section>
                        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                            <Scale className="h-4 w-4" /> {t('weighment_history')}
                        </h2>
                        <div className="space-y-3">
                            {weighments.map((w) => (
                                <Card key={w.id} className="border-none shadow-sm overflow-hidden">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-xl text-primary font-bold text-xs">
                                                {w.time}
                                            </div>
                                            <div>
                                                <div className="font-bold">{w.weight} KG</div>
                                                <div className="text-[10px] text-muted-foreground">{w.plot} • {w.supervisor}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {w.blockchainVerified && (
                                                <div className="bg-slate-100 p-1.5 rounded-full" title="Blockchain Verified">
                                                    <ChainIcon className="h-3 w-3 text-slate-500" />
                                                </div>
                                            )}
                                            <div className={`w-2 h-2 rounded-full ${w.synced ? 'bg-green-500' : 'bg-amber-500'}`} />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Section: Injury Reports */}
                    {reports.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-red-500" /> {t('injury_report')}
                            </h2>
                            <div className="space-y-3">
                                {reports.map((r) => (
                                    <Card key={r.id} className="border-none shadow-sm overflow-hidden">
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <div className="font-bold text-lg">{t(r.type)}</div>
                                                    <div className="text-[10px] text-muted-foreground font-mono">{r.refNumber}</div>
                                                </div>
                                                <Badge className={`${r.severity === 'severe' ? 'bg-red-500' :
                                                    r.severity === 'moderate' ? 'bg-orange-500' : 'bg-yellow-500'
                                                    }`}>
                                                    {t(r.severity)}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-end mt-4">
                                                <div className="text-xs text-muted-foreground">
                                                    {new Date(r.timestamp).toLocaleDateString()} at {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-primary">
                                                    {r.acknowledged ? <><CheckCircle2 className="h-3 w-3" /> ACKNOWLEDGED</> : <span className="text-amber-500">PENDING ACK</span>}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="pt-4 flex gap-3">
                        <Button variant="outline" className="flex-1 gap-2 rounded-2xl h-12 font-bold" onClick={handleDownloadPDF}>
                            <Download className="h-4 w-4" /> Download PDF
                        </Button>
                        <Button className="flex-1 gap-2 rounded-2xl h-12 font-bold bg-green-600 hover:bg-green-700">
                            <Share2 className="h-4 w-4" /> WhatsApp
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerHistory;
