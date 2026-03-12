import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { Activity, Wifi, WifiOff, AlertCircle } from 'lucide-react';

// --- CONFIGURATION ---

interface PredictionResult {
  diagnosis: string;
  severity: 'High' | 'Medium' | 'Low';
  recommendation: string;
}

const SymptomChecker: React.FC = () => {
  const { t } = useApp();
  // Final 38 optimized features for rural-friendly processing
  const symptomList: string[] = [
    "muscle_pain", "itching", "dark_urine", "high_fever", "mild_fever",
    "chest_pain", "fatigue", "vomiting", "nausea", "joint_pain",
    "pus_filled_pimples", "blackheads", "yellow_crust_ooze", "skin_peeling", "silver_like_dusting",
    "weight_gain", "lethargy", "puffy_face_and_eyes", "prominent_veins_on_calf",
    "sweating", "abdominal_pain", "diarrhoea", "headache", "loss_of_appetite",
    "breathlessness", "yellowing_of_eyes", "chills", "malaise", "phlegm",
    "dizziness", "back_pain", "continuous_sneezing", "stomach_pain",
    "burning_micturition", "cough", "skin_rash", "family_history", "altered_sensorium"
  ];

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  // --- OFFLINE DATABASE LOGIC  ---
  const openHealthDB = () => {
    return new Promise<IDBDatabase>((resolve) => {
      const request = indexedDB.open("NabhaHealthRecords", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("consultations", { keyPath: "id", autoIncrement: true });
      request.onsuccess = () => resolve(request.result);
    });
  };

  const saveOffline = async (res: PredictionResult) => {
    const db = await openHealthDB();
    const tx = db.transaction("consultations", "readwrite");
    tx.objectStore("consultations").add({ ...res, timestamp: Date.now() });
  };

  // --- SYNC LOGIC [cite: 13, 63] ---
  useEffect(() => {
    const handleStatus = () => setIsOnline(window.navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);

    if (isOnline) syncToCloud();

    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, [isOnline]);

  const syncToCloud = async () => {
    const db = await openHealthDB();
    const records: any = await new Promise(res => {
      const req = db.transaction("consultations").objectStore("consultations").getAll();
      req.onsuccess = () => res(req.result);
    });

    if (records.length > 0) {
      const { error } = await supabase.from('health_records').insert(records);
      if (!error) {
        db.transaction("consultations", "readwrite").objectStore("consultations").clear();
        console.log("Nabha rural records synced to cloud.");
      }
    }
  };

  // --- PREDICTION LOGIC [cite: 19, 74, 76] ---
  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) return alert("Please select at least one symptom.");
    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selected_symptoms: selectedSymptoms }),
      });

      const data = await response.json();
      setResult(data);
      await saveOffline(data); // Always save locally first for rural reliability 
    } catch (err: any) {
      console.error("Prediction Error:", err);
      // If it's literally a fetch failure (TypeError) when online, the backend is likely down or unreachable
      if (err instanceof TypeError) {
        alert("Failed to connect to the backend server. Is it running on " + (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000') + "?");
      } else {
        alert("An error occurred: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (severity: string) => {
    switch(severity) {
      case 'High': return 'border-emergency/50 bg-emergency/10 text-emergency';
      case 'Medium': return 'border-warning/50 bg-warning/10 text-warning';
      case 'Low': return 'border-success/50 bg-success/10 text-success';
      default: return 'border-primary/50 bg-primary/10 text-primary';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-10">
        
        {/* Sync Status Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center p-3 rounded-lg mb-8 border ${isOnline ? 'bg-success/10 border-success/20 text-success-foreground' : 'bg-destructive/10 border-destructive/20 text-destructive-foreground'}`}
        >
          {isOnline ? <Wifi className="w-5 h-5 mr-3 text-success" /> : <WifiOff className="w-5 h-5 mr-3 text-destructive" />}
          <span className="font-medium text-sm text-foreground">
            {isOnline ? "Online: Connected to Nabha Hospital Network" : "Offline: Village Mode Enabled (Data will sync later)"}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                AI Symptom Checker
              </h1>
              <p className="text-muted-foreground mt-1 text-base leading-relaxed">
                Select what you are experiencing to get a preliminary diagnosis and advice.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card-healthcare p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-semibold text-lg mb-4 text-foreground">Select Symptoms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {symptomList.map((s, i) => (
              <label 
                key={s} 
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${selectedSymptoms.includes(s) ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent/50'} text-sm font-medium`}
              >
                <input 
                  type="checkbox" 
                  className="w-4 h-4 mr-3 accent-primary rounded cursor-pointer"
                  checked={selectedSymptoms.includes(s)}
                  onChange={() => setSelectedSymptoms(prev =>
                    prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
                  )} 
                /> 
                <span className="capitalize text-foreground/80">{s.replace(/_/g, ' ')}</span>
              </label>
            ))}
          </div>
        </motion.div>

        <motion.button 
          onClick={handlePredict} 
          disabled={loading || selectedSymptoms.length === 0} 
          className={`w-full p-4 rounded-xl font-bold text-white text-lg transition-all shadow-md ${loading || selectedSymptoms.length === 0 ? 'bg-muted-foreground cursor-not-allowed opacity-70' : 'bg-primary hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1'}`}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Consulting AI Doctor...' : 'Analyze My Symptoms'}
        </motion.button>

        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`mt-8 p-6 rounded-2xl border-l-8 ${getUrgencyColor(result.severity)} shadow-sm bg-card`}
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 mt-1 shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  <span className="text-muted-foreground font-medium text-lg mr-2">Possible Condition:</span>
                  {result.diagnosis}
                </h3>
                
                <div className="flex items-center mt-4 mb-4">
                  <span className="bg-background px-3 py-1 rounded-full text-sm font-bold border opacity-90 inline-block">
                    URGENCY: {result.severity.toUpperCase()}
                  </span>
                </div>
                
                <div className="bg-background rounded-lg p-4 border mt-2 opacity-90">
                  <p className="font-semibold text-sm uppercase mb-1 tracking-wider text-muted-foreground">Doctor's Instruction</p>
                  <p className="text-foreground text-lg">{result.recommendation}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SymptomChecker;