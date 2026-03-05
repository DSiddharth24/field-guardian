
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { db, WorkerStats, Weighment, Task } from '@/lib/db';
import {
    CheckCircle2,
    Clock,
    TrendingUp,
    MapPin,
    Shield,
    AlertCircle,
    PlusCircle,
    MessageSquare,
    CreditCard,
    History,
    ChevronRight,
    RefreshCw,
    User,
    Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WorkerDashboard: React.FC = () => {
    const { t, language, setLanguage } = useLanguage();
    const navigate = useNavigate();
    const [stats, setStats] = useState<WorkerStats | null>(null);
    const [weighments, setWeighments] = useState<Weighment[]>([]);
    const [task, setTask] = useState<Task | null>(null);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    useEffect(() => {
        setStats(db.getStats());
        setWeighments(db.getWeighments());
        setTask(db.getTask());
    }, []);

    if (!stats) return null;

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'kn', name: 'ಕನ್ನಡ' },
        { code: 'ta', name: 'தமிழ்' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'or', name: 'ଓଡ଼ିଆ' },
        { code: 'bn', name: 'বাংলা' },
    ] as const;

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Top Bar */}
            <div className="bg-white border-b sticky top-0 z-10 px-4 py-3">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                src={stats.photo}
                                alt={stats.name}
                                className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                            />
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${stats.isSynced ? 'bg-green-500' : 'bg-amber-500'}`} />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">{stats.name}</h1>
                            <p className="text-xs text-muted-foreground font-mono">{stats.id}</p>
                            <p className="text-xs font-medium text-primary uppercase">{stats.estate}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Globe className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {languages.map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.code}
                                        onClick={() => setLanguage(lang.code)}
                                        className={language === lang.code ? "bg-primary/10 font-bold" : ""}
                                    >
                                        {lang.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <div className="p-4 max-w-md mx-auto space-y-4">
                {/* Attendance Card */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="overflow-hidden border-none shadow-sm">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t('attendance')}</CardTitle>
                            <Badge variant={stats.attendancePresent ? "default" : "outline"} className={stats.attendancePresent ? "bg-green-500" : ""}>
                                {stats.attendancePresent ? t('present') : t('pending')}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                {stats.attendancePresent ? (
                                    <div className="bg-green-100 p-3 rounded-2xl">
                                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                                    </div>
                                ) : (
                                    <div className="bg-amber-100 p-3 rounded-2xl">
                                        <Clock className="h-8 w-8 text-amber-600" />
                                    </div>
                                )}
                                <div>
                                    <div className="text-2xl font-bold">{stats.attendancePresent ? stats.attendanceTime : t('pending')}</div>
                                    <div className="text-sm text-muted-foreground">
                                        <span className="font-bold text-primary">{stats.attendanceStreak}</span> {t('streak')}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                    <span>{t('maternity_goal')}</span>
                                    <span>{stats.maternityDays}/80</span>
                                </div>
                                <Progress value={(stats.maternityDays / 80) * 100} className="h-2 bg-slate-100" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Earnings Card */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="overflow-hidden border-none shadow-sm relative">
                        <div className="absolute top-0 right-0 p-4">
                            <TrendingUp className="text-green-500 h-6 w-6" />
                        </div>
                        <CardHeader className="pb-1">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t('earnings')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold mb-4">₹{stats.dailyEarnings}</div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="bg-slate-50 p-2 rounded-lg">
                                    <div className="text-muted-foreground text-xs">{t('harvest')}</div>
                                    <div className="font-bold">₹{stats.dailyEarnings - 50}</div>
                                </div>
                                <div className="bg-slate-50 p-2 rounded-lg">
                                    <div className="text-muted-foreground text-xs">{t('task_based')}</div>
                                    <div className="font-bold">₹50</div>
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full mt-4 text-xs h-8 text-primary" onClick={() => navigate('/worker/history')}>
                                {t('weighment_history')} <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Weekly Progress */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="border-none shadow-sm bg-primary text-primary-foreground">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">{t('weekly')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-3xl font-bold">₹{stats.weeklyEarnings}</div>
                                    <p className="text-xs opacity-80">Projected: ₹{stats.projectedWeekly}</p>
                                </div>
                                <div className="text-right">
                                    <Button variant="secondary" size="sm" className="text-xs h-7">
                                        View Slip
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Task Assignment */}
                {task && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="pb-2 border-b bg-slate-50/50">
                                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" /> {t('tasks')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <h3 className="font-bold text-lg">{task.type}</h3>
                                        <p className="text-sm text-primary font-medium">{task.plot}</p>
                                        <div className="flex gap-4 mt-2">
                                            <div className="text-xs">
                                                <span className="text-muted-foreground block">{t('target')}</span>
                                                <span className="font-bold">{task.target}</span>
                                            </div>
                                            <div className="text-xs">
                                                <span className="text-muted-foreground block">{t('rate')}</span>
                                                <span className="font-bold">₹{task.rate}/KG</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-20 h-20 rounded-lg bg-slate-200 overflow-hidden flex items-center justify-center text-[10px] text-muted-foreground border">
                                        MAP PREVIEW
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Rights Summary */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                <Shield className="h-4 w-4 text-primary" /> {t('rights')}
                            </CardTitle>
                            <Badge variant="outline" className="text-[10px]">VERIFIED</Badge>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between py-1 border-b border-slate-50">
                                <span className="text-sm">{t('maternity_eligibility')}</span>
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-slate-50">
                                <span className="text-sm">{t('migrant_passbook')}</span>
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <span className="text-sm">{t('displacement_allowance')}</span>
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Quick Action Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 safe-area-bottom">
                <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1 h-auto py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => navigate('/worker/injury-report')}
                    >
                        <div className="bg-red-100 p-2 rounded-xl">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-bold leading-tight">{t('injury')}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1 h-auto py-2 text-slate-600"
                        onClick={() => navigate('/worker/grievance')}
                    >
                        <div className="bg-slate-100 p-2 rounded-xl">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-bold leading-tight">{t('grievance')}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1 h-auto py-2 text-slate-600"
                        onClick={() => navigate('/worker/id')}
                    >
                        <div className="bg-slate-100 p-2 rounded-xl">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-bold leading-tight">{t('id_card')}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1 h-auto py-2 text-slate-600"
                        onClick={() => navigate('/worker/history')}
                    >
                        <div className="bg-slate-100 p-2 rounded-xl">
                            <History className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-bold leading-tight">{t('history')}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;
