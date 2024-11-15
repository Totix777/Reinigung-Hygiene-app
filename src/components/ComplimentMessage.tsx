import React, { useEffect, useState } from 'react';
import { Heart, Star } from 'lucide-react';

const compliments = [
  "Fantastische Arbeit! Der Wohnbereich {floor} strahlt dank Ihnen.",
  "Wow, Sie sind ein echtes Reinigungstalent! {floor} ist perfekt sauber.",
  "Ihre Sorgfalt und Ihr Einsatz im {floor} sind wirklich beeindruckend!",
  "Großartige Leistung! Sie machen einen hervorragenden Job im {floor}.",
  "Danke für Ihre ausgezeichnete Arbeit im {floor}! Sie sind ein wahrer Profi.",
  "Beeindruckend! Ihre Genauigkeit macht den {floor} zu einem besseren Ort.",
  "Sie sind ein Vorbild für Qualität und Effizienz im {floor}!",
  "Ihre Arbeit macht den {floor} zu einem angenehmeren Ort.",
  "Erstklassige Leistung im {floor}! Sie können stolz auf sich sein.",
  "Ihre Hingabe zur Sauberkeit im {floor} ist beispielhaft!"
];

interface Props {
  show: boolean;
  floorName: string;
}

export default function ComplimentMessage({ show, floorName }: Props) {
  const [compliment, setCompliment] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)]
        .replace('{floor}', floorName);
      setCompliment(randomCompliment);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [show, floorName]);

  if (!isVisible) return null;

  return (
    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="bg-green-100 rounded-full p-2">
          <Star className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="text-green-700 font-medium mb-1">{compliment}</p>
          <p className="text-green-600 text-sm flex items-center gap-1">
            Mit lieben Grüßen,
            <Heart className="w-4 h-4 text-red-500 inline" />
            Benito Marconi
          </p>
        </div>
      </div>
    </div>
  );
}