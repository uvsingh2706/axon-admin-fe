import { Button } from "../component/ui/button";
import { LeftArrowIcon } from "../assets/icons";
import { Input } from "../component/ui/input";
import { Checkbox } from "../component/ui/checkbox";
import { Label } from "../component/ui/label";
import { Skeleton } from "../component/ui/skeleton";
import { Spinner } from "../component/ui/spinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../component/ui/tabs";
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
// import { Table } from "@/component/ui/table";

import { DynamicForm } from "../component/form/DynamicForm";
import * as z from "zod";

const clientFormSchema = z.object({
  image: z.any().optional(),
  name: z.string().min(1, "Name is required"),
  mobileNumber: z.string().min(10, "Mobile number is required"),
  emailId: z.string().email("Invalid email address"),
  subscriptionPlan: z.string().optional(),
  chargingStation: z.string().min(1, "Charging station is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});




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
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Inputs</h2>
            <div className="flex-1 h-[2px] bg-border/60"></div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl border border-primary/20 border-dashed shadow-xs overflow-x-auto">
            <table className="w-full text-left min-w-[700px] border-separate border-spacing-y-8">
              <thead>
                <tr className="text-muted-foreground text-sm">
                  <th className="w-[100px] font-medium pb-4">State</th>
                  <th className="w-1/2 px-4 font-semibold text-primary">Input Field</th>
                  <th className="w-1/2 px-4 font-semibold text-foreground">Verification Code</th>
                </tr>
              </thead>
              <tbody className="align-top">

                {/* DEFAULT */}
                <tr>
                  <td className="pt-8 font-medium text-sm text-foreground">Default</td>
                  <td className="px-4">
                    <Input label="Email" required placeholder="Enter Email Address" />
                  </td>
                  <td className="px-4">
                    <Input type="otp" label="Verification Code" required length={6} />
                  </td>
                </tr>

                {/* ACTIVE */}
                <tr>
                  <td className="pt-8 font-medium text-sm text-foreground">Active</td>
                  <td className="px-4">
                    <Input label="Email" required defaultValue="Enter Email" className="border-primary" />
                  </td>
                  <td className="px-4">
                    <Input type="otp" label="Verification Code" required length={6} value={["3", "3", "3", "3", "3", ""]} />
                  </td>
                </tr>

                {/* FILLED */}
                <tr>
                  <td className="pt-8 font-medium text-sm text-foreground">Filled</td>
                  <td className="px-4">
                    <Input label="Email" required defaultValue="Enter Email Address" />
                  </td>
                  <td className="px-4">
                    <Input type="otp" label="Verification Code" required length={6} value={["3", "3", "3", "3", "3", "3"]} />
                  </td>
                </tr>

                {/* DISABLE */}
                <tr>
                  <td className="pt-8 font-medium text-sm text-foreground">Disable</td>
                  <td className="px-4">
                    <Input label="Email" required disabled placeholder="Input Text" />
                  </td>
                  <td className="px-4">
                    <Input type="otp" label="Verification Code" required disabled length={6} value={["3", "3", "3", "3", "3", "3"]} />
                  </td>
                </tr>

                {/* ERROR */}
                <tr>
                  <td className="pt-8 font-medium text-sm text-foreground">Error</td>
                  <td className="px-4">
                    <Input label="Email" required error errorMessage="Invalid Email ID. Please enter Valid Email ID." defaultValue="Navneet_123" />
                  </td>
                  <td className="px-4">
                    <Input type="otp" label="Verification Code" required error errorMessage="Invalid OTP." length={6} value={["3", "3", "3", "3", "3", "3"]} />
                  </td>
                </tr>

              </tbody>
            </table>
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
        {/* <section>
          <Table/>
        </section> */}

        {/* Dynamic Form Showcase */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dynamic Form</h2>
            <div className="flex-1 h-[2px] bg-border/60"></div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl border border-border shadow-xs">
            <DynamicForm<z.infer<typeof clientFormSchema>>
              schema={clientFormSchema}
              onSubmit={(data) => console.log("Form Submitted:", data)}
              sections={[
                {
                  title: "General Details",
                  gridCols: 2,
                  fields: [
                    {
                      name: "image",
                      type: "image",
                      colSpan: 2, // span across full width so it's centered
                    },
                    {
                      name: "name",
                      label: "Name *",
                      type: "text",
                      placeholder: "Enter client name",
                    },
                    {
                      name: "mobileNumber",
                      label: "Mobile Number *",
                      type: "phone",
                    },
                    {
                      name: "emailId",
                      label: "Email ID *",
                      type: "email",
                      placeholder: "Enter client email id",
                    },
                  ],
                },
                {
                  title: "Assign Subscription Plan & Charging Stations",
                  gridCols: 2,
                  fields: [
                    {
                      name: "subscriptionPlan",
                      label: "Select Subscription Plan",
                      type: "select",
                      placeholder: "Select Subscription Plan",
                      options: [
                        { label: "Basic", value: "basic" },
                        { label: "Premium", value: "premium" },
                      ]
                    },
                    {
                      name: "chargingStation",
                      label: "Select Charging Station *",
                      type: "select",
                      placeholder: "Select Charging Station",
                      options: [
                        { label: "Station A", value: "station_a" },
                        { label: "Station B", value: "station_b" },
                      ]
                    },
                    {
                      name: "startDate",
                      label: "Start Date",
                      type: "date",
                      placeholder: "dd/mm/yy",
                    },
                    {
                      name: "endDate",
                      label: "End Date",
                      type: "date",
                      placeholder: "dd/mm/yy",
                    },
                  ],
                },
              ]}
              submitLabel="Save Details"
            />
          </div>
        </section>

        {/* Spinner */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Spinner</h2>
            <div className="flex-1 h-[2px] bg-border/60"></div>
          </div>

          <div className="bg-surface/10 p-8 md:p-10 rounded-2xl border border-border shadow-xs">
            <div className="flex flex-col items-center justify-center space-y-10">
              <div className="flex items-center space-x-8">
                <Spinner className="size-6" />
                <Spinner className="size-8" />
                <Spinner className="size-10" />
                <Spinner className="size-12" />
              </div>

              {/* Demo: Overriding color inside Buttons */}
              <div className="w-full flex items-center justify-center space-x-6 border-t pt-10">
                <Button variant="primary">
                  <Spinner data-icon="inline-start" className="text-white size-5 mr-2" />
                  Saving Changes...
                </Button>

                <Button variant="secondary" disabled>
                  <Spinner data-icon="inline-start" className="size-5 mr-2" />
                  Processing...
                </Button>

                <Button variant="tertiary">
                  <Spinner data-icon="inline-start" className="text-(--color-primary) size-5 mr-2" />
                  Authenticating
                </Button>

              </div>
            </div>
          </div>
        </section>

        {/* Tabs Showcase */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Tabs</h2>
            <div className="flex-1 h-[2px] bg-border/60"></div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl border border-border shadow-xs">

            <Tabs defaultValue="tab1" className="w-full max-w-md">

              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>

              <TabsContent value="tab1">
                <div className="p-4 border rounded-lg">
                  This is Tab 1 Content
                </div>
              </TabsContent>

              <TabsContent value="tab2">
                <div className="p-4 border rounded-lg">
                  This is Tab 2 Content
                </div>
              </TabsContent>

              <TabsContent value="tab3">
                <div className="p-4 border rounded-lg">
                  This is Tab 3 Content
                </div>
              </TabsContent>

            </Tabs>

          </div>
        </section>

      </div>
    </div>


  );
}




