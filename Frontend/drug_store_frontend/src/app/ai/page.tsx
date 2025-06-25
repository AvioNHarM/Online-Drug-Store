"use client";

import React, { useState, useMemo } from "react";
import { Search, Activity, ChevronRight, Loader2 } from "lucide-react";
import { AIApiResponse } from "../../../lib/types/ai";
import { createDiagnosisPayload, submitDiagnosis } from "../../../lib/api/ai";
import Navbar from "../../../lib/components/navbar";
import Footer from "../../../lib/components/footer";

const symptoms = [
  "anxiety and nervousness",
  "depression",
  "shortness of breath",
  "depressive or psychotic symptoms",
  "sharp chest pain",
  "dizziness",
  "insomnia",
  "abnormal involuntary movements",
  "chest tightness",
  "palpitations",
  "irregular heartbeat",
  "breathing fast",
  "hoarse voice",
  "sore throat",
  "difficulty speaking",
  "cough",
  "nasal congestion",
  "throat swelling",
  "diminished hearing",
  "lump in throat",
  "throat feels tight",
  "difficulty in swallowing",
  "skin swelling",
  "retention of urine",
  "groin mass",
  "leg pain",
  "hip pain",
  "suprapubic pain",
  "blood in stool",
  "lack of growth",
  "emotional symptoms",
  "elbow weakness",
  "back weakness",
  "pus in sputum",
  "symptoms of the scrotum and testes",
  "swelling of scrotum",
  "pain in testicles",
  "flatulence",
  "pus draining from ear",
  "jaundice",
  "mass in scrotum",
  "white discharge from eye",
  "irritable infant",
  "abusing alcohol",
  "fainting",
  "hostile behavior",
  "drug abuse",
  "sharp abdominal pain",
  "feeling ill",
  "vomiting",
  "headache",
  "nausea",
  "diarrhea",
  "vaginal itching",
  "vaginal dryness",
  "painful urination",
  "involuntary urination",
  "pain during intercourse",
  "frequent urination",
  "lower abdominal pain",
  "vaginal discharge",
  "blood in urine",
  "hot flashes",
  "intermenstrual bleeding",
  "hand or finger pain",
  "wrist pain",
  "hand or finger swelling",
  "arm pain",
  "wrist swelling",
  "arm stiffness or tightness",
  "arm swelling",
  "hand or finger stiffness or tightness",
  "wrist stiffness or tightness",
  "lip swelling",
  "toothache",
  "abnormal appearing skin",
  "skin lesion",
  "acne or pimples",
  "dry lips",
  "facial pain",
  "mouth ulcer",
  "skin growth",
  "eye deviation",
  "diminished vision",
  "double vision",
  "cross-eyed",
  "symptoms of eye",
  "pain in eye",
  "eye moves abnormally",
  "abnormal movement of eyelid",
  "foreign body sensation in eye",
  "irregular appearing scalp",
  "swollen lymph nodes",
  "back pain",
  "neck pain",
  "low back pain",
  "pain of the anus",
  "pain during pregnancy",
  "pelvic pain",
  "impotence",
  "infant spitting up",
  "vomiting blood",
  "regurgitation",
  "burning abdominal pain",
  "restlessness",
  "symptoms of infants",
  "wheezing",
  "peripheral edema",
  "neck mass",
  "ear pain",
  "jaw swelling",
  "mouth dryness",
  "neck swelling",
  "knee pain",
  "foot or toe pain",
  "bowlegged or knock-kneed",
  "ankle pain",
  "bones are painful",
  "knee weakness",
  "elbow pain",
  "knee swelling",
  "skin moles",
  "knee lump or mass",
  "weight gain",
  "problems with movement",
  "knee stiffness or tightness",
  "leg swelling",
  "foot or toe swelling",
  "heartburn",
  "smoking problems",
  "muscle pain",
  "infant feeding problem",
  "recent weight loss",
  "problems with shape or size of breast",
  "underweight",
  "difficulty eating",
  "scanty menstrual flow",
  "vaginal pain",
  "vaginal redness",
  "vulvar irritation",
  "weakness",
  "decreased heart rate",
  "increased heart rate",
  "bleeding or discharge from nipple",
  "ringing in ear",
  "plugged feeling in ear",
  "itchy ear(s)",
  "frontal headache",
  "fluid in ear",
  "neck stiffness or tightness",
  "spots or clouds in vision",
  "eye redness",
  "lacrimation",
  "itchiness of eye",
  "blindness",
  "eye burns or stings",
  "itchy eyelid",
  "feeling cold",
  "decreased appetite",
  "excessive appetite",
  "excessive anger",
  "loss of sensation",
  "focal weakness",
  "slurring words",
  "symptoms of the face",
  "disturbance of memory",
  "paresthesia",
  "side pain",
  "fever",
  "shoulder pain",
  "shoulder stiffness or tightness",
  "shoulder weakness",
  "arm cramps or spasms",
  "shoulder swelling",
  "tongue lesions",
  "leg cramps or spasms",
  "abnormal appearing tongue",
  "ache all over",
  "lower body pain",
  "problems during pregnancy",
  "spotting or bleeding during pregnancy",
  "cramps and spasms",
  "upper abdominal pain",
  "stomach bloating",
  "changes in stool appearance",
  "unusual color or odor to urine",
  "kidney mass",
  "swollen abdomen",
  "symptoms of prostate",
  "leg stiffness or tightness",
  "difficulty breathing",
  "rib pain",
  "joint pain",
  "muscle stiffness or tightness",
  "pallor",
  "hand or finger lump or mass",
  "chills",
  "groin pain",
  "fatigue",
  "abdominal distention",
  "regurgitation.1",
  "symptoms of the kidneys",
  "melena",
  "flushing",
  "coughing up sputum",
  "seizures",
  "delusions or hallucinations",
  "shoulder cramps or spasms",
  "joint stiffness or tightness",
  "pain or soreness of breast",
  "excessive urination at night",
  "bleeding from eye",
  "rectal bleeding",
  "constipation",
  "temper problems",
  "coryza",
  "wrist weakness",
  "eye strain",
  "hemoptysis",
  "lymphedema",
  "skin on leg or foot looks infected",
  "allergic reaction",
  "congestion in chest",
  "muscle swelling",
  "pus in urine",
  "abnormal size or shape of ear",
  "low back weakness",
  "sleepiness",
  "apnea",
  "abnormal breathing sounds",
  "excessive growth",
  "elbow cramps or spasms",
  "feeling hot and cold",
  "blood clots during menstrual periods",
  "absence of menstruation",
  "pulling at ears",
  "gum pain",
  "redness in ear",
  "fluid retention",
  "flu-like syndrome",
  "sinus congestion",
  "painful sinuses",
  "fears and phobias",
  "recent pregnancy",
  "uterine contractions",
  "burning chest pain",
  "back cramps or spasms",
  "stiffness all over",
  "muscle cramps, contractures, or spasms",
  "low back cramps or spasms",
  "back mass or lump",
  "nosebleed",
  "long menstrual periods",
  "heavy menstrual flow",
  "unpredictable menstruation",
  "painful menstruation",
  "infertility",
  "frequent menstruation",
  "sweating",
  "mass on eyelid",
  "swollen eye",
  "eyelid swelling",
  "eyelid lesion or rash",
  "unwanted hair",
  "symptoms of bladder",
  "irregular appearing nails",
  "itching of skin",
  "hurts to breath",
  "nailbiting",
  "skin dryness, peeling, scaliness, or roughness",
  "skin on arm or hand looks infected",
  "skin irritation",
  "itchy scalp",
  "hip swelling",
  "incontinence of stool",
  "foot or toe cramps or spasms",
  "warts",
  "bumps on penis",
  "too little hair",
  "foot or toe lump or mass",
  "skin rash",
  "mass or swelling around the anus",
  "low back swelling",
  "ankle swelling",
  "hip lump or mass",
  "drainage in throat",
  "dry or flaky scalp",
  "premenstrual tension or irritability",
  "feeling hot",
  "feet turned in",
  "foot or toe stiffness or tightness",
  "pelvic pressure",
  "elbow swelling",
  "elbow stiffness or tightness",
  "early or late onset of menopause",
  "mass on ear",
  "bleeding from ear",
  "hand or finger weakness",
  "low self-esteem",
  "throat irritation",
  "itching of the anus",
  "swollen or red tonsils",
  "irregular belly button",
  "swollen tongue",
  "lip sore",
  "vulvar sore",
  "hip stiffness or tightness",
  "mouth pain",
  "arm weakness",
  "leg lump or mass",
  "disturbance of smell or taste",
  "discharge in stools",
  "penis pain",
  "loss of sex drive",
  "obsessions and compulsions",
  "antisocial behavior",
  "neck cramps or spasms",
  "pupils unequal",
  "poor circulation",
  "thirst",
  "sleepwalking",
  "skin oiliness",
  "sneezing",
  "bladder mass",
  "knee cramps or spasms",
  "premature ejaculation",
  "leg weakness",
  "posture problems",
  "bleeding in mouth",
  "tongue bleeding",
  "change in skin mole size or color",
  "penis redness",
  "penile discharge",
  "shoulder lump or mass",
  "polyuria",
  "cloudy eye",
  "hysterical behavior",
  "arm lump or mass",
  "nightmares",
  "bleeding gums",
  "pain in gums",
  "bedwetting",
  "diaper rash",
  "lump or mass of breast",
  "vaginal bleeding after menopause",
  "infrequent menstruation",
  "mass on vulva",
  "jaw pain",
  "itching of scrotum",
  "postpartum problems of the breast",
  "eyelid retracted",
  "hesitancy",
  "elbow lump or mass",
  "muscle weakness",
  "throat redness",
  "joint swelling",
  "tongue pain",
  "redness in or around nose",
  "wrinkles on skin",
  "foot or toe weakness",
  "hand or finger cramps or spasms",
  "back stiffness or tightness",
  "wrist lump or mass",
  "skin pain",
  "low back stiffness or tightness",
  "low urine output",
  "skin on head or neck looks infected",
  "stuttering or stammering",
  "problems with orgasm",
  "nose deformity",
  "lump over jaw",
  "sore in nose",
  "hip weakness",
  "back swelling",
  "ankle stiffness or tightness",
  "ankle weakness",
  "neck weakness",
];

export default function SymptomSearch(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<AIApiResponse | null>(null);

  const filteredSymptoms = useMemo<string[]>(() => {
    if (!searchTerm.trim()) return symptoms.slice(0, 12);

    const filtered = symptoms.filter((symptom) =>
      symptom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.slice(0, 12);
  }, [searchTerm]);

  const toggleSymptom = (symptom: string): void => {
    const newSelected = new Set(selectedSymptoms);
    if (newSelected.has(symptom)) {
      newSelected.delete(symptom);
    } else {
      newSelected.add(symptom);
    }
    setSelectedSymptoms(newSelected);
  };

  const handleDiagnosis = async (): Promise<void> => {
    setIsLoading(true);
    setApiResponse(null);

    const payload = createDiagnosisPayload(symptoms, selectedSymptoms);

    try {
      const result = await submitDiagnosis(payload);
      setApiResponse(result);
    } catch (error) {
      console.error("Error during diagnosis:", error);
      setApiResponse({
        status: "error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Highlight search term in symptom text
  const highlightText = (text: string, highlight: string): React.ReactNode => {
    if (!highlight.trim()) return text;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} className="bg-yellow-300 text-gray-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-white from-red-50 via-white to-red-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <svg
                className="text-red-600"
                fill="currentColor"
                height="36"
                viewBox="0 0 24 24"
                width="36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"></path>
              </svg>
              <h1 className="text-red-700 text-4xl font-bold leading-tight tracking-tight">
                Search Symptoms
              </h1>
            </div>
          </div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Search and select your symptoms to get a medical assessment. Select
            up to 12 symptoms that match your condition.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search symptoms (e.g., headache, chest pain, fatigue...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-700 shadow-sm"
            />
          </div>
          {searchTerm && (
            <p className="text-center text-sm text-gray-500 mt-2">
              Showing {filteredSymptoms.length} symptoms matching "{searchTerm}"
            </p>
          )}
        </div>

        {selectedSymptoms.size > 0 && (
          <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">
              Selected Symptoms ({selectedSymptoms.size})
            </h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedSymptoms).map((symptom) => (
                <span
                  key={symptom}
                  className="px-3 py-1 bg-[var(--primary-color)] text-white text-sm rounded-full cursor-pointer hover:bg-red-700 transition-colors"
                  onClick={() => toggleSymptom(symptom)}
                >
                  {symptom} ×
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Available Symptoms
            <span className="text-sm font-normal text-gray-500 ml-2">
              (Click to select/deselect)
            </span>
          </h2>

          {filteredSymptoms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No symptoms found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSymptoms.map((symptom) => (
                <div
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedSymptoms.has(symptom)
                      ? "bg-[var(--primary-color)] text-white border-red-600 shadow-lg"
                      : "bg-white border-gray-200 hover:border-red-300 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {highlightText(symptom, searchTerm)}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        selectedSymptoms.has(symptom) ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mb-8">
          <button
            onClick={handleDiagnosis}
            disabled={selectedSymptoms.size === 0 || isLoading}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg ${
              selectedSymptoms.size === 0 || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 hover:shadow-xl transform hover:scale-105"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                Processing Diagnosis...
              </>
            ) : (
              `Get Diagnosis (${selectedSymptoms.size} symptoms selected)`
            )}
          </button>
        </div>

        {apiResponse && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Diagnosis Results
            </h3>
            {apiResponse.status === "demo" ? (
              <div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 font-medium">
                    {apiResponse.message}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Payload sent to API:
                  </p>
                  <pre className="text-xs text-gray-700 overflow-x-auto">
                    {JSON.stringify(apiResponse.payload, null, 2).slice(0, 500)}
                    ...
                  </pre>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-green-800">
                  Diagnosis completed successfully!
                </p>
                <pre className="text-sm text-gray-700 mt-2">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
