import { motion } from "framer-motion";
import { 
  Bell, 
  Calendar,
  CreditCard,
  Settings,
  User,
  ChevronRight,
  Search,
  Menu,
} from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";
import { BentoGrid } from "@/components/ui/bento-grid";
import { ProjectStatusCard } from "@/components/ui/project-status-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DesignSystemSection } from "./design-system/DesignSystemSection";
import { SidebarNewsCard } from "./design-system/SidebarNewsCard";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const mockNewsItems = [
  {
    title: "New property listed in Dubai Marina",
    date: "Today",
    category: "Property Update",
    priority: "high" as const,
  },
  {
    title: "Market analysis report available",
    date: "Yesterday",
    category: "Market Update",
    priority: "medium" as const,
  },
  {
    title: "Maintenance scheduled",
    date: "2 days ago",
    category: "Maintenance",
    priority: "low" as const,
  },
];

const DesignSystemDemo = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Original Bento Grid Section */}
      <DesignSystemSection 
        title="Bento Grid Layout" 
        description="Flexible grid layout for displaying content in an engaging way."
      >
        <BentoGrid>
          <StandardCard
            icon={CreditCard}
            title="Financial Overview"
            description="Track your financial metrics and performance"
          />
          <StandardCard
            icon={Calendar}
            title="Calendar"
            description="Schedule and manage appointments"
          />
          <ProjectStatusCard
            title="Project Status"
            status="In Progress"
            progress={75}
          />
        </BentoGrid>
      </DesignSystemSection>

      {/* Original Button Section */}
      <DesignSystemSection 
        title="Buttons" 
        description="Various button styles and states for different actions."
      >
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </DesignSystemSection>

      {/* Original Card Section */}
      <DesignSystemSection 
        title="Cards" 
        description="Container components for organizing content."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content and details</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Feature Card</CardTitle>
              <CardDescription>Highlighted feature description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Feature details and benefits</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Learn More</Button>
            </CardFooter>
          </Card>
        </div>
      </DesignSystemSection>

      {/* Information Cards Section (New) */}
      <DesignSystemSection 
        title="Information Cards" 
        description="Use these cards to display important updates and notifications to users."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
              <StandardCard
                icon={CreditCard}
                title="Financial Overview"
                description="Track your financial metrics and performance"
                className="glass-card"
              />
              <StandardCard
                icon={Calendar}
                title="Upcoming Events"
                description="View your scheduled appointments"
                className="glass-card"
              />
            </BentoGrid>
          </div>
          <div className="md:col-span-1">
            <SidebarNewsCard items={mockNewsItems} />
          </div>
        </div>
      </DesignSystemSection>

      {/* Date Selection Section */}
      <DesignSystemSection 
        title="Date Selection" 
        description="Date pickers for selecting single dates or date ranges."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Single Date Selection</h3>
            <CalendarComponent mode="single" className="rounded-md border" />
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <h3 className="text-lg font-medium mb-4">Usage Guidelines</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Use for selecting specific dates for reports or scheduling</li>
              <li>Enable date range selection for period-based analysis</li>
              <li>Consider adding time selection for precise scheduling</li>
              <li>Implement date validation and restrictions as needed</li>
            </ul>
          </div>
        </div>
      </DesignSystemSection>

      {/* Navigation Elements Section */}
      <DesignSystemSection 
        title="Navigation Elements" 
        description="Components for user navigation and interaction."
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
            <Menu className="h-5 w-5 text-gray-600" />
            <Search className="h-5 w-5 text-gray-600" />
            <Bell className="h-5 w-5 text-gray-600" />
            <User className="h-5 w-5 text-gray-600" />
            <Settings className="h-5 w-5 text-gray-600" />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="font-medium">Menu Item Example</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </DesignSystemSection>

      {/* Animations Section */}
      <DesignSystemSection 
        title="Animations" 
        description="Animation examples and guidelines for consistent motion design."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="p-4 bg-white rounded-lg border"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-medium mb-2">Hover Scale</h3>
            <p className="text-sm text-gray-600">Subtle scale animation on hover for interactive elements</p>
          </motion.div>
          
          <motion.div 
            className="p-4 bg-white rounded-lg border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-medium mb-2">Fade In</h3>
            <p className="text-sm text-gray-600">Smooth fade in animation for content appearance</p>
          </motion.div>

          <motion.div 
            className="p-4 bg-white rounded-lg border"
            animate={{ 
              scale: [1, 1.02, 1],
              transition: { 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" 
              }
            }}
          >
            <h3 className="font-medium mb-2">Pulse</h3>
            <p className="text-sm text-gray-600">Continuous pulse animation for attention-grabbing elements</p>
          </motion.div>
        </div>
      </DesignSystemSection>
    </div>
  );
};

export default DesignSystemDemo;