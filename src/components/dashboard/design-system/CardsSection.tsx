import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DesignSystemSection } from "./DesignSystemSection";

export const CardsSection = () => {
  return (
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
  );
};