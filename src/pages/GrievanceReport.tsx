
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { db, GrievanceType } from '@/lib/db';
import {
    Banknote,
    ShieldAlert,
    UserX,
    Waves,
    Hammer,
    HelpCircle,
    ChevronLeft,
    CheckCircle2,
    MessageSquare,
    Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GrievanceReport: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [stage, setStage] = useState<1 | 2 | 'confirm'>(1);
    const [grievanceType, setGrievanceType] = useState<GrievanceType | null>(null);
    const [description, setDescription] = useState('');
    const [refNumber, setRefNumber] = useState<string | null>(null);

    const handleTypeSelect = (type: GrievanceType) => {
        setGrievanceType(type);
        setStage(2);
    };

    const handleSubmit = () => {
        if (!grievanceType) return;

        const report = db.saveGrievance({
            type: grievanceType,
            description: description || 'No additional description provided.',
            timestamp: new Date().toISOString(),
        });

        setRefNumber(report.refNumber);
        setStage('confirm');
    };

    const renderStage1 = () => (
        <div className="grid grid-cols-2 gap-4">
            {[
                { id: 'pay' as const, icon: Banknote, color: 'bg-green-50 text-green-600' },
                { id: 'safety' as const, icon: ShieldAlert, color: 'bg-red-50 text-red-600' },
                { id: 'harassment' as const, icon: UserX, color: 'bg-purple-50 text-purple-600' },
                { id: 'facilities' as const, icon: Waves, color: 'bg-blue-50 text-blue-600' },
                { id: 'tools' as const, icon: Hammer, color: 'bg-orange-50 text-orange-600' },
                { id: 'other' as const, icon: HelpCircle, color: 'bg-slate-50 text-slate-600' },
            ].map((item) => (
                <Button
                    key={item.id}
                    variant="ghost"
                    className="flex flex-col items-center gap-3 h-auto py-8 bg-white border shadow-sm rounded-3xl hover:bg-slate-50 active:scale-95 transition-all text-center leading-tight"
                    onClick={() => handleTypeSelect(item.id)}
                >
                    <div className={`${item.color} p-4 rounded-2xl`}>
                        <item.icon className="h-10 w-10" />
                    </div>
                    <span className="font-bold text-sm h-10 flex items-center">{t(item.id)}</span>
                </Button>
            ))}
        </div>
    );

    const renderStage2 = () => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary border-b pb-4">
                    <MessageSquare className="h-6 w-6" />
                    <span className="font-bold text-lg">{t(grievanceType!)}</span>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t('grievance_description')}</label>
                    <Textarea
                        placeholder="..."
                        className="min-h-[150px] rounded-2xl border-slate-200 focus:ring-primary"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-2xl text-[10px] text-slate-500 font-medium text-center italic">
                {t('anonymous_notice')}
            </div>

            <Button size="lg" className="w-full h-16 rounded-2xl text-xl font-bold bg-primary hover:bg-primary/90 gap-3" onClick={handleSubmit}>
                <Send className="h-6 w-6" /> {t('submit_grievance')}
            </Button>
        </div>
    );

    const renderConfirm = () => (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4"
            >
                <CheckCircle2 className="h-16 w-16 text-primary" />
            </motion.div>
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-primary">{t('grievance_saved')}</h2>
                <p className="text-slate-500">{t('whatsapp_notice')}</p>
            </div>

            <div className="bg-white border rounded-3xl p-6 w-full max-w-xs space-y-3 shadow-sm">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{t('ref_number')}</div>
                <div className="text-xl font-mono font-black border-2 border-dashed border-primary/20 p-3 rounded-xl bg-primary/5">
                    {refNumber}
                </div>
            </div>

            <Button size="lg" variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold" onClick={() => navigate('/worker')}>
                Back to Dashboard
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 p-4 pb-12 overflow-x-hidden">
            <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-8 pt-4">
                    {stage !== 'confirm' && (
                        <Button variant="ghost" size="icon" onClick={() => {
                            if (stage === 1) navigate('/worker');
                            else if (stage === 2) setStage(1);
                        }}>
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                    )}
                    <h1 className="text-2xl font-black uppercase tracking-tight flex-1 text-center">
                        {stage === 'confirm' ? '' : t('grievance')}
                    </h1>
                    {stage !== 'confirm' && <div className="w-10" />}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={stage}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-6">
                            {stage === 1 && <h2 className="text-3xl font-black mb-6">{t('grievance_type')}</h2>}
                        </div>

                        {stage === 1 && renderStage1()}
                        {stage === 2 && renderStage2()}
                        {stage === 'confirm' && renderConfirm()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GrievanceReport;
