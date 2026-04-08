import { Button } from "../component/ui/button";
import { LeftArrowIcon } from "../assets/icons";
import { Input } from "../component/ui/input";
import { Checkbox } from "../component/ui/checkbox";
import { Label } from "../component/ui/label";
import { Skeleton } from "../component/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../component/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../component/ui/pagination";

export default function ComponentsShowcase() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-6xl mx-auto p-10 md:p-14 space-y-16 pb-24 text-foreground">
        
        {/* Instructional Banner Section */}
        <div className="bg-primary/10 border-l-[6px] border-primary p-6 md:p-8 rounded-xl shadow-sm">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">🛠️ Central UI Component Repository</h1>
          <p className="text-foreground/80 md:text-lg leading-relaxed max-w-4xl">
            <strong>Note for Developers:</strong> This page is strictly for developer use. Please add every reusable component that you are creating for other developers to this page. Maintaining a strict visual dictionary here ensures a much better development experience, eliminates code duplication, and vastly improves the scalability of our product!
          </p>
        </div>

        {/* Buttons */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Buttons</h2>
            <div className="flex-1 h-[2px] bg-border/60"></div>
          </div>
          
          <div className="bg-surface/10 p-8 md:p-10 rounded-2xl border border-border shadow-xs space-y-10">
            
            {/* Primary Button States */}
            <div>
              <Label className="mb-4 block text-muted-foreground font-semibold uppercase tracking-widest text-xs">Primary Variant</Label>
              <div className="flex flex-wrap gap-5 items-center">
                <Button variant="primary">Primary Default</Button>
                <Button variant="primary" isIcon={<LeftArrowIcon />}>Primary Icon</Button>
                <Button variant="primary" disabled>Primary Disabled</Button>
              </div>
            </div>

            {/* Secondary Button States */}
            <div>
              <Label className="mb-4 block text-muted-foreground font-semibold uppercase tracking-widest text-xs">Secondary Variant</Label>
              <div className="flex flex-wrap gap-5 items-center">
                <Button variant="secondary">Secondary Default</Button>
                <Button variant="secondary" isIcon={<LeftArrowIcon />}>Secondary Icon</Button>
                <Button variant="secondary" disabled>Secondary Disabled</Button>
              </div>
            </div>

            {/* Tertiary Button States */}
            <div>
              <Label className="mb-4 block text-muted-foreground font-semibold uppercase tracking-widest text-xs">Tertiary Variant</Label>
              <div className="flex flex-wrap gap-5 items-center">
                <Button variant="tertiary">Tertiary Default</Button>
                <Button variant="tertiary" isIcon={<LeftArrowIcon />}>Tertiary Icon</Button>
                <Button variant="tertiary" disabled>Tertiary Disabled</Button>
              </div>
            </div>
            
            {/* Updated Sizes list matching the rem definitions */}
            <div>
              <Label className="mb-4 block text-muted-foreground font-semibold uppercase tracking-widest text-xs">Sizes</Label>
              <div className="flex flex-wrap gap-5 items-center">
                <Button variant="primary" size="sm">Small (sm)</Button>
                <Button variant="primary" size="md">Medium (md)</Button>
                <Button variant="primary" size="lg">Large (lg)</Button>
                <Button variant="primary" size="xl">Extra Large (xl)</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Inputs & Forms</h2>
            <div className="flex-1 h-[2px] bg-border/60"></div>
          </div>
          
          <div className="bg-surface/10 p-8 md:p-10 rounded-2xl border border-border shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <Label htmlFor="email" className="font-semibold text-base">Email address</Label>
                <Input id="email" type="email" placeholder="e.g. admin@axon-ev.com" className="bg-white" />
              </div>

              <div className="space-y-4">
                <Label htmlFor="disabled" className="font-semibold text-base">Disabled Input</Label>
                <Input id="disabled" disabled placeholder="Disabled field..." className="bg-surface/50" />
              </div>
            </div>
          </div>
        </section>

        {/* Selection & Toggles */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Selection & Toggles</h2>
            <div className="flex-1 h-[2px] bg-border/60"></div>
          </div>

          <div className="bg-surface/10 p-8 md:p-10 rounded-2xl border border-border shadow-xs flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <Label className="mb-5 block text-muted-foreground font-semibold uppercase tracking-widest text-xs">Checkbox</Label>
              <div className="flex items-center space-x-4 bg-white p-5 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="font-semibold text-base cursor-pointer">
                  Accept terms and conditions
                </Label>
              </div>
            </div>

            <div className="flex-1">
              <Label className="mb-5 block text-muted-foreground font-semibold uppercase tracking-widest text-xs">Dropdown</Label>
              <Select>
                <SelectTrigger className="bg-white py-6">
                  <SelectValue placeholder="Theme Selection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light Mode</SelectItem>
                  <SelectItem value="dark">Dark Mode</SelectItem>
                  <SelectItem value="system">System Settings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Loaders */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Loaders & Skeletons</h2>
            <div className="flex-1 h-[2px] bg-border/60"></div>
          </div>

          <div className="bg-surface/10 p-8 md:p-10 rounded-2xl border border-border shadow-xs">
            <div className="flex items-center space-x-8">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-[300px]" />
                <Skeleton className="h-5 w-[200px]" />
              </div>
            </div>
          </div>
        </section>

        {/* Pagination */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Pagination</h2>
            <div className="flex-1 h-[2px] bg-border/60"></div>
          </div>

          <div className="bg-surface/10 p-8 md:p-10 rounded-2xl border border-border shadow-xs flex justify-center py-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>

      </div>
    </div>
  );
}
