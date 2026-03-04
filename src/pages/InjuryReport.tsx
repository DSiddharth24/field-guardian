
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { db } from '@/lib/db';
import {
    Scissors,
    TrendingDown,
    FlaskConical,
    Wrench,
    Bug,
    HelpCircle,
    Camera,
    Mic,
    ArrowRight,
    ChevronLeft,
    CheckCircle2,
    MapPin,
    X,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type Stage = 1 | 2 | 3 | 'confirm';

const InjuryReport: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [stage, setStage] = useState<Stage>(1);
    const [injuryType, setInjuryType] = useState<string | null>(null);
    const [severity, setSeverity] = useState<'minor' | 'moderate' | 'severe' | null>(null);
    const [bodyParts, setBodyParts] = useState<string[]>([]);
    const [gps, setGps] = useState<{ lat: number, lng: number } | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [refNumber, setRefNumber] = useState<string | null>(null);

    // Capture GPS on mount
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGps({ lat: position.coords.latitude, lng: position.coords.longitude });
            }, (err) => {
                // Fallback to mock GPS
                setGps({ lat: 12.9716, lng: 77.5946 });
            });
        }
    }, []);

    const handleStage1 = (type: string) => {
        setInjuryType(type);
        setStage(2);
    };

    const handleStage2 = (sev: 'minor' | 'moderate' | 'severe') => {
        setSeverity(sev);
        setStage(3);
    };

    const handleSubmit = () => {
        if (!injuryType || !severity || !gps) return;

        const report = db.saveInjuryReport({
            type: injuryType,
            severity: severity,
            bodyParts: bodyParts.length > 0 ? bodyParts : ['Body'],
            timestamp: new Date().toISOString(),
            gps: gps,
        });

        setRefNumber(report.refNumber);
        setStage('confirm');
    };

    const toggleBodyPart = (part: string) => {
        setBodyParts(prev =>
            prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
        );
    };

    const renderStage1 = () => (
        <div className="grid grid-cols-2 gap-4">
            {[
                { id: 'cut_blade', icon: Scissors, color: 'bg-blue-50 text-blue-600' },
                { id: 'fall', icon: TrendingDown, color: 'bg-green-50 text-green-600' },
                { id: 'chemical', icon: FlaskConical, color: 'bg-purple-50 text-purple-600' },
                { id: 'machinery', icon: Wrench, color: 'bg-orange-50 text-orange-600' },
                { id: 'animal', icon: Bug, color: 'bg-yellow-50 text-yellow-600' },
                { id: 'other', icon: HelpCircle, color: 'bg-slate-50 text-slate-600' },
            ].map((item) => (
                <Button
                    key={item.id}
                    variant="ghost"
                    className="flex flex-col items-center gap-3 h-auto py-8 bg-white border shadow-sm rounded-3xl hover:bg-slate-50 active:scale-95 transition-all"
                    onClick={() => handleStage1(item.id)}
                >
                    <div className={`${item.color} p-4 rounded-2xl`}>
                        <item.icon className="h-10 w-10" />
                    </div>
                    <span className="font-bold text-lg">{t(item.id as any)}</span>
                </Button>
            ))}
        </div>
    );

    const renderStage2 = () => (
        <div className="space-y-8">
            <div className="relative mx-auto w-64 h-96 bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-300">
                <span className="text-slate-400 font-bold text-center px-4">BODY DIAGRAM<br />TAP AREAS</span>
                {/* Mock body parts as touchable overlay */}
                <div className="absolute inset-0 grid grid-rows-3 grid-cols-2 p-4 gap-4">
                    {['Head', 'Torso', 'Arm (L)', 'Arm (R)', 'Leg (L)', 'Leg (R)'].map(part => (
                        <div
                            key={part}
                            className={`rounded-xl flex items-center justify-center text-[10px] font-bold transition-all ${bodyParts.includes(part) ? 'bg-red-500 text-white' : 'bg-transparent text-slate-400'}`}
                            onClick={() => toggleBodyPart(part)}
                        >
                            {part}
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-center font-bold text-xl">{t('severity')}</h3>
                <div className="flex justify-center gap-6">
                    {(['minor', 'moderate', 'severe'] as const).map((sev) => (
                        <div key={sev} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-16 h-16 rounded-full border-4 transition-all cursor-pointer ${sev === 'minor' ? 'bg-yellow-400 border-yellow-200' :
                                    sev === 'moderate' ? 'bg-orange-500 border-orange-200' :
                                        'bg-red-600 border-red-200'
                                    } ${severity === sev ? 'scale-125 ring-4 ring-slate-200' : 'opacity-60'}`}
                                onClick={() => handleStage2(sev)}
                            />
                            <span className="text-xs font-bold uppercase">{t(sev)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {severity === 'severe' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 p-4 rounded-2xl border border-red-200 space-y-2">
                    <div className="flex items-center gap-2 text-red-600 font-bold">
                        <AlertCircle className="h-5 w-5" /> {t('emergency_contact')}
                    </div>
                    <div className="text-2xl font-black text-red-700">+91 98765 43210</div>
                    <p className="text-sm text-red-600">{t('nearest_hospital')}: Estate Clinic</p>
                </motion.div>
            )}
        </div>
    );

    const renderStage3 = () => (
        <div className="space-y-8">
            <div className="aspect-[4/5] bg-slate-900 rounded-3xl overflow-hidden relative flex items-center justify-center text-white">
                {isCapturing ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full border-4 border-white animate-pulse" />
                        <span className="font-bold">SAVING PHOTO...</span>
                    </div>
                ) : (
                    <Camera className="h-24 w-24 opacity-20" />
                )}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <Button
                        size="lg"
                        className="rounded-full w-16 h-16 bg-white hover:bg-slate-100 p-0"
                        onClick={() => {
                            setIsCapturing(true);
                            setTimeout(() => { setIsCapturing(false); handleSubmit(); }, 1000);
                        }}
                    >
                        <div className="w-12 h-12 rounded-full border-2 border-slate-900" />
                    </Button>
                </div>
            </div>

            <div className="flex gap-4">
                <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 h-16 rounded-2xl flex-col gap-1"
                    onClick={() => { }}
                >
                    <Mic className="h-5 w-5 text-primary" />
                    <span className="text-[10px] uppercase font-bold">Add Voice Note</span>
                </Button>
                <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1 h-16 rounded-2xl flex-col gap-1 text-slate-500"
                    onClick={handleSubmit}
                >
                    <X className="h-5 w-5" />
                    <span className="text-[10px] uppercase font-bold">{t('skip_photo')}</span>
                </Button>
            </div>

            <Button size="lg" className="w-full h-16 rounded-2xl text-xl font-bold bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
                {t('submit')}
            </Button>
        </div>
    );

    const renderConfirm = () => (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4"
            >
                <CheckCircle2 className="h-16 w-16 text-green-600" />
            </motion.div>
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-green-700">{t('confirm_save')}</h2>
                <p className="text-slate-500">{t('whatsapp_notice')}</p>
            </div>

            <div className="bg-white border rounded-3xl p-6 w-full max-w-xs space-y-3 shadow-sm">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{t('ref_number')}</div>
                <div className="text-xl font-mono font-black border-2 border-dashed border-primary/20 p-3 rounded-xl bg-primary/5">
                    {refNumber}
                </div>
                {gps && (
                    <div className="flex items-center justify-center gap-2 pt-2 text-xs text-primary font-bold">
                        <MapPin className="h-3 w-3" /> {gps.lat.toFixed(4)}, {gps.lng.toFixed(4)}
                    </div>
                )}
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
                        <Button variant="ghost" size="icon" onClick={() => stage === 1 ? navigate('/worker') : setStage((prev: any) => prev - 1)}>
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                    )}
                    <h1 className="text-2xl font-black uppercase tracking-tight flex-1 text-center">
                        {stage === 'confirm' ? '' : t('injury_report')}
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
                            {stage === 1 && <h2 className="text-3xl font-black mb-6">{t('what_happened')}</h2>}
                            {stage === 2 && <h2 className="text-3xl font-black mb-6">{t('where_body')}</h2>}
                        </div>

                        {stage === 1 && renderStage1()}
                        {stage === 2 && renderStage2()}
                        {stage === 3 && renderStage3()}
                        {stage === 'confirm' && renderConfirm()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InjuryReport;
