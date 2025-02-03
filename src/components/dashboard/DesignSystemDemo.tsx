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
  Clock,
  GitBranch,
  Github,
  MessageSquare,
  Star,
  Users,
  CheckCircle2
} from "lucide-react";
import { StandardCard } from "@/components/ui/standard-card";
import { BentoGrid } from "@/components/ui/bento-grid";
import { ProjectStatusCard } from "@/components/ui/project-status-card";
import { Badge } from "@/components/ui/badge";

const DesignSystemDemo = () => {
  const mockProjectData = {
    title: "Design System",
    progress: 75,
    dueDate: "Dec 31, 2024",
    contributors: [
      { name: "Alice", image: "/placeholder.svg" },
      { name: "Bob", image: "/placeholder.svg" },
      { name: "Charlie", image: "/placeholder.svg" }
    ],
    tasks: [
      { title: "Setup Components", completed: true },
      { title: "Documentation", completed: false },
      { title: "Testing", completed: false }
    ],
    githubStars: 128,
    openIssues: 5
  };

  return (
    <div className="p-8 space-y-8">
      {/* Typography Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold font-bricolage">Typography Examples</h2>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-bricolage">Heading 1 - Bricolage Bold</h1>
          <h2 className="text-3xl font-semibold font-bricolage">Heading 2 - Bricolage Semibold</h2>
          <h3 className="text-2xl font-medium font-bricolage">Heading 3 - Bricolage Medium</h3>
          <p className="text-base font-inter">Body Text - Inter Regular. This is how normal text looks in our application.</p>
          <p className="text-sm text-gray-600 font-inter">Small Text - Inter Regular. Used for secondary information.</p>
        </div>
      </section>

      {/* Color Palette */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold font-bricolage">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-20 bg-primary rounded-lg"></div>
            <p className="text-sm font-medium">Primary Blue</p>
            <p className="text-xs text-gray-600">#8394CA</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-secondary rounded-lg"></div>
            <p className="text-sm font-medium">Secondary Purple</p>
            <p className="text-xs text-gray-600">#DFD5EA</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-gradient-to-br from-primary to-primary-light rounded-lg"></div>
            <p className="text-sm font-medium">Primary Gradient</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-gradient-to-br from-secondary to-secondary-light rounded-lg"></div>
            <p className="text-sm font-medium">Secondary Gradient</p>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold font-bricolage">Bento Grid Layout</h2>
        <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-4">
          <StandardCard
            icon={CreditCard}
            title="Financial Overview"
            description="Track your financial metrics and performance"
            className="glass-card md:col-span-2 row-span-1"
          />
          <StandardCard
            icon={Calendar}
            title="Upcoming Events"
            description="View your scheduled appointments"
            className="glass-card"
          />
          <StandardCard
            icon={Bell}
            title="Notifications"
            description="Stay updated with latest alerts"
            className="glass-card md:col-span-1 row-span-1"
          />
          <StandardCard
            icon={User}
            title="Team Members"
            description="Manage your team and permissions"
            className="glass-card md:col-span-2"
          />
        </BentoGrid>
      </section>

      {/* Expandable Card Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold font-bricolage">Expandable Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ProjectStatusCard {...mockProjectData} />
            <div className="p-4 bg-secondary/10 rounded-lg">
              <h3 className="font-medium mb-2">Usage Guidelines</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Use for complex content that needs progressive disclosure</li>
                <li>Ideal for project status, task details, and nested information</li>
                <li>Include clear visual indicators for expandable state</li>
                <li>Maintain consistent animation timing across the application</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-medium mb-2">Component Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Smooth height animation using Framer Motion</li>
                <li>Progress indicator with color states</li>
                <li>Contributor avatars with tooltips</li>
                <li>Responsive layout and touch-friendly</li>
                <li>Status badges and icon integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold font-bricolage">Card Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StandardCard
            icon={CreditCard}
            title="Glass Card"
            description="A card with glass morphism effect and subtle hover animation."
            className="glass-card"
          />
          <StandardCard
            icon={Calendar}
            title="Gradient Card"
            description="A card with gradient background and hover effect."
            className="bg-gradient-to-br from-primary/10 to-transparent"
          />
          <StandardCard
            icon={Bell}
            title="Solid Card"
            description="A simple solid background card with shadow."
            className="bg-white shadow-md"
          />
        </div>
      </section>

      {/* Buttons Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold font-bricolage">Button Styles</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-secondary text-gray-700 rounded-lg hover:bg-secondary-dark transition-colors">
            Secondary Button
          </button>
          <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
            Outline Button
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg hover:opacity-90 transition-opacity">
            Gradient Button
          </button>
        </div>
      </section>

      {/* Navigation Elements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold font-bricolage">Navigation Elements</h2>
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
      </section>

      {/* Form Elements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold font-bricolage">Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Input Field</label>
              <input
                type="text"
                placeholder="Enter some text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Select Field</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Checkbox</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Radio Buttons</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="radio-group"
                    className="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">Option 1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="radio-group"
                    className="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">Option 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemDemo;
