"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SidebarPresetSelector } from "@/components/sidebar-preset-selector";
import { DynamicClientConfig } from "@/data/presets";
import { usePlaygroundState } from "@/hooks/use-playground-state";

const steps = [
  { number: 1, title: "Параметры заявки" },
  { number: 2, title: "Описание магазина" },
  { number: 3, title: "Образ клиента" },
];

const moods = [
  "Раздраженный",
  "Скептический",
  "Усталый",
  "Занятой",
  "Спокойный",
  "Нейтральный",
  "Заинтересованный",
  "Оптимистичный"
];

const callTypes = [
  "Холодный звонок",
  "Входящий звонок",
];

const callPurposes = [
  "Назначить встречу",
  "Перенаправить на ЛПР",
  "Назначить демо",
  "Консультация",
  "Сделать продажу",
];

const businessTypes = [
  "B2B",
  "B2C",
];

export function SalesSidebar() {
  const [currentStep, setCurrentStep] = useState(1);
  const { dispatch } = usePlaygroundState();
  const [dynamicConfig, setDynamicConfig] = useState<DynamicClientConfig>({
    language: "",
    mood: [],
    callType: "",
    clientIndustry: "",
    clientPosition: "",
    callPurpose: "",
    businessType: "",
    businessSphere: "",
    saleObject: "",
  });

  const updateInstructions = (newConfig: Partial<DynamicClientConfig>) => {
    const updatedConfig = { ...dynamicConfig, ...newConfig };
    setDynamicConfig(updatedConfig);

    const template = `Act as a person in the position of {clientPosition} working in {clientIndustry}. 
This is a {callType} call.
Respond showing the following mood and characteristics: {mood}.

Be realistic but challenging:
- Show the specified mood and characteristics consistently
- Be reluctant to engage in lengthy discussions
- Avoid immediate agreement or commitment
- Get shorter and more direct in responses if the conversation drags on

If the conversation goes off-topic or becomes unprofessional, interrupt to bring it back on track.`;

    const filledTemplate = template
      .replace('{clientPosition}', updatedConfig.clientPosition || '[Not Selected]')
      .replace('{clientIndustry}', updatedConfig.clientIndustry || '[Not Selected]')
      .replace('{callType}', updatedConfig.callType || '[Not Selected]')
      .replace('{mood}', updatedConfig.mood.join(', ') || '[Not Selected]');

    dispatch({ type: "SET_INSTRUCTIONS", payload: filledTemplate });
  };

  const handleMoodChange = (mood: string, checked: boolean) => {
    const newMoods = checked 
      ? [...dynamicConfig.mood, mood]
      : dynamicConfig.mood.filter(m => m !== mood);
    
    updateInstructions({ mood: newMoods });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Шаблон разговора</Label>
              <SidebarPresetSelector />
            </div>

            <div className="space-y-2">
              <Label>Цель звонка</Label>
              <Select onValueChange={(value) => updateInstructions({ callPurpose: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите цель" />
                </SelectTrigger>
                <SelectContent>
                  {callPurposes.map((purpose) => (
                    <SelectItem key={purpose} value={purpose}>
                      {purpose}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Тип звонка</Label>
              <Select onValueChange={(value) => updateInstructions({ callType: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  {callTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Сфера бизнеса</Label>
              <Select onValueChange={(value) => updateInstructions({ businessSphere: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите сферу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Розница</SelectItem>
                  <SelectItem value="wholesale">Опт</SelectItem>
                  <SelectItem value="service">Услуги</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Тип бизнеса</Label>
              <Select onValueChange={(value) => updateInstructions({ businessType: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Объект продажи</Label>
              <Input 
                placeholder="Введите объект продажи"
                onChange={(e) => updateInstructions({ saleObject: e.target.value })}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Настроение и характеристики клиента</Label>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <label key={mood} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={dynamicConfig.mood.includes(mood)}
                      onChange={(e) => handleMoodChange(mood, e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{mood}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Сфера деятельности клиента</Label>
              <Input 
                placeholder="Введите сферу деятельности"
                onChange={(e) => updateInstructions({ clientIndustry: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Должность клиента</Label>
              <Input 
                placeholder="Введите должность"
                onChange={(e) => updateInstructions({ clientPosition: e.target.value })}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-[300px] border-r bg-white h-full flex flex-col">
      {/* Steps Navigation */}
      <div className="p-4 border-b">
        <div className="flex items-start space-x-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1 transition-colors cursor-pointer
                    ${step.number <= currentStep ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                  onClick={() => setCurrentStep(step.number)}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`h-[2px] flex-1 mx-1 mt-3 transition-colors
                      ${step.number < currentStep ? 'bg-purple-600' : 'bg-gray-200'}`} 
                  />
                )}
              </div>
              <span 
                className={`text-xs mt-1 text-center transition-colors cursor-pointer
                  ${step.number === currentStep ? 'text-purple-600 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-purple-600' : 'text-gray-600'}`}
                onClick={() => setCurrentStep(step.number)}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="card" className="flex-1 flex flex-col">
        <TabsList className="w-full">
          <TabsTrigger value="card" className="flex-1">Карточка звонка</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">Аналитика</TabsTrigger>
        </TabsList>
        
        <TabsContent value="card" className="flex-1 flex flex-col">
          <div className="p-4 flex-1">
            {renderStepContent()}
          </div>
          
          <div className="p-4 border-t mt-auto">
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button 
                  onClick={handlePreviousStep}
                  variant="outline"
                  className="flex-1"
                >
                  <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                  Назад
                </Button>
              )}
              {currentStep < 3 && (
                <Button 
                  onClick={handleNextStep}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Далее
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="p-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Ключевые тги</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Входящий</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Результат диалога</h3>
              <div className="text-sm text-gray-600">
                <div className="flex justify-between mb-2">
                  <span>Общий балл</span>
                  <span className="font-medium">85/100</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Рекомендации</h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Следуйте скрипту</li>
                <li>Говорите четче</li>
                <li>Задавайте больше вопросов</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 