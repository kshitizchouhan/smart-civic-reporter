import { Card, CardContent } from "@/components/ui/card";
import { Bot, Building2, Search, BarChart3, CameraIcon, ShieldCheck, HeartHandshake } from "lucide-react";

const features = [
    {
        icon: Bot,
        title: "AI-based Detection",
        description: "Smart image recognition automatically categorizes and prioritizes civic issues.",
        linear: "from-indigo-500 to-purple-500",
    },
    {
        icon: Building2,
        title: "Direct Authority Routing",
        description: "Issues are automatically routed to the relevant municipal departments.",
        linear: "from-sky-500 to-cyan-500",
    },
    {
        icon: Search,
        title: "Full Transparency",
        description: "Track every issue from report to resolution with complete visibility.",
        linear: "from-emerald-500 to-teal-500",
    },
    {
        icon: BarChart3,
        title: "Data for Better Cities",
        description: "Analytics and insights help authorities make data-driven decisions.",
        linear: "from-amber-500 to-orange-500",
    },
];

const workflow = [
    {
        icon: CameraIcon,
        title: "Upload Photo",
        description: "AI detects the civic issue automatically from the image.",
        linear: "from-indigo-500 to-purple-500",
    },
    {
        icon: ShieldCheck,
        title: "Auto-Routed",
        description: "Sent directly to the correct department admin",
        linear: "from-sky-500 to-cyan-500",
    },
    {
        icon: HeartHandshake,
        title: "Track Status",
        description: "Pending → In Progress → Resolved.",
        linear: "from-emerald-500 to-teal-500",
    }
];

export function WhyCivicFix() {
    return (
        <div>
            {/* how it works */}
            <section className="py-20 px-20 relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />

                <div className="container mx-auto relative">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="bg-linear-to-r from-blue-500  to-emerald-400 bg-clip-text text-transparent">
                                How it Works
                            </span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            See the process how the public gets satisfied
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {workflow.map((workflow, index) => (
                            <Card
                                key={index}
                                className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden"
                            >
                                <CardContent className="p-6 text-center">
                                    {/* Icon with linear background */}
                                    <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${workflow.linear} mb-5 shadow-lg`}>
                                        <workflow.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                                        {workflow.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {workflow.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* why civic fix */}
            <section className="py-20 px-20 relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />

                <div className="container mx-auto relative">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="bg-linear-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
                                Why CivicFix?
                            </span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Building smarter cities through technology and transparency.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden"
                            >
                                <CardContent className="p-6 text-center">
                                    {/* Icon with linear background */}
                                    <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${feature.linear} mb-5 shadow-lg`}>
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
