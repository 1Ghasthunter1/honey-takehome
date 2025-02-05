import { Subheading } from "@/common/elements/heading";
import { SidebarBody, SidebarHeader } from "@/common/elements/sidebar";
import { SidebarLayout } from "@/common/elements/sidebar-layout";

function Sidebar() {
  return (
    <SidebarBody>
      <SidebarHeader>
        <Subheading>Honey TH</Subheading>
      </SidebarHeader>
    </SidebarBody>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarLayout navbar={<div>nav</div>} sidebar={<Sidebar />}>
      {children}
    </SidebarLayout>
  );
}
