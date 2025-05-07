import Image from "next/image";
import PhindojoText from "./PhindojoText";
import { Lock, Terminal } from "lucide-react";
import BaseCard from "./BaseCard";
import { useAuthStore } from "../store/auth.store";
import { useRouter } from "next/navigation";

export interface WelcomeCardProps {
  className?: string;
}

export default function WelcomeCard({ className }: WelcomeCardProps) {
  const router = useRouter();
  const { token } = useAuthStore();
  const contentCard = [
    {
      icon: Terminal,
      title: "Test Your Knowledge",
      description: "Answer multiple-choice questions about concepts.",
    },
    {
      icon: Lock,
      title: "Learn from Explanations",
      description:
        "Get detailed explanations for each answer to improve your understanding.",
    },
  ];

  const onClickStartTraining = () => {
    if (!token) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  };

  return (
    <div className={className}>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <BaseCard>
          <div className="absolute -right-6 -top-6 bg-cyber/10 w-24 h-24 rounded-full blur-xl"></div>
          <div className="relative p-10">
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/phindojo-logo.png"
                alt={"Phindojo Icons"}
                className="w-16 h-16"
                width={64}
                height={64}
              />
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-center">
                Welcome to <PhindojoText className="inline" />
              </h1>
              <p className="text-gray-400 text-center">Training Platform</p>
            </div>
            <div className="space-y-6">
              {contentCard.map((item, index) => {
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-cyber/20 p-2 rounded-full">
                      <item.icon className="w-6 h-6" width={24} height={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-cyber hover:bg-cyber-dark text-white px-6 py-6 text-lg"
                type="button"
                onClick={onClickStartTraining}
              >
                Start Your Training
              </button>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  );
}
